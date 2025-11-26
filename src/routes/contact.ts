// src/routes/contact.ts
import { Router, type Request, type Response } from "express";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

const router = Router();

// (Si ya tienes app.use(express.json()) en server.ts, este middleware no es necesario,
// pero lo dejamos como no-op para que no estorbe)
router.use((_req, _res, next) => {
  next();
});

router.post(
  "/contact",
  async (req: Request, res: Response): Promise<void> => {
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      captchaToken,
    } = req.body;

    // 🔐 Validación rápida en backend
    if (!captchaToken) {
      res.status(400).json({
        success: false,
        message: "Captcha requerido",
      });
      return;
    }

    if (!firstName || !lastName || !email || !phone || !message) {
      res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
      return;
    }

    try {
      /* ===========================
         1. Validar reCAPTCHA
      ============================ */

      const secretKey = process.env.RECAPTCHA_SECRET_KEY;

      if (!secretKey) {
        console.error("❌ Falta RECAPTCHA_SECRET_KEY en .env");
        res.status(500).json({
          success: false,
          message: "Configuración del captcha incompleta",
        });
        return;
      }

      const googleRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${secretKey}&response=${captchaToken}`,
        }
      );

      const captchaData = (await googleRes.json()) as any;
      console.log("✅ CAPTCHA DATA:", captchaData);

      if (!captchaData.success) {
        res.status(400).json({
          success: false,
          message: "Captcha inválido",
          detail: captchaData,
        });
        return;
      }

      /* ===========================
         2. Validar configuración SMTP
      ============================ */

      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpHost || !smtpUser || !smtpPass) {
        console.error("❌ Faltan variables SMTP en .env", {
          smtpHost,
          smtpUser,
          hasPass: !!smtpPass,
        });
        res.status(500).json({
          success: false,
          message:
            "Configuración SMTP incompleta. Revisa SMTP_HOST, SMTP_USER y SMTP_PASS.",
        });
        return;
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Verificar conexión con el servidor SMTP (útil para debug)
      try {
        await transporter.verify();
        console.log("✅ SMTP listo para enviar correos");
      } catch (verifyError) {
        console.error("❌ Error al verificar SMTP:", verifyError);
        const msg =
          verifyError instanceof Error ? verifyError.message : String(verifyError);
        res.status(500).json({
          success: false,
          message: "No se pudo conectar al servidor de correo (SMTP).",
          detail: msg,
        });
        return;
      }

      /* ===========================
         3. Construir y enviar el correo
      ============================ */

      const to =
        process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || undefined;
      const cc = process.env.CONTACT_CC_EMAIL || "";

      if (!to) {
        console.error(
          "❌ No hay CONTACT_TO_EMAIL ni SMTP_USER configurados en .env"
        );
        res.status(500).json({
          success: false,
          message: "No hay correo de destino configurado",
        });
        return;
      }

      const mailOptions = {
        from: `"Formulario Web" <${smtpUser}>`,
        to,
        cc: cc || undefined,
        subject: `Nuevo mensaje de contacto de ${firstName} ${lastName}`,
        text: `
Nombre: ${firstName} ${lastName}
Email: ${email}
Teléfono: ${phone}

Mensaje:
${message}
        `,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${String(message || "").replace(/\n/g, "<br>")}</p>
        `,
      };

      console.log("📧 Enviando correo a:", { to, cc });

      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        message: "Mensaje enviado correctamente",
      });
    } catch (error: any) {
      // ⛔ Aquí atrapamos cualquier error inesperado
      console.error("❌ Error en /contact:", error);
      const msg =
        error instanceof Error ? error.message : JSON.stringify(error);

      res.status(500).json({
        success: false,
        message: "Error interno al enviar el mensaje",
        detail: msg, // 👈 esto lo vas a ver en el front (Network tab)
      });
    }
  }
);

export default router;
