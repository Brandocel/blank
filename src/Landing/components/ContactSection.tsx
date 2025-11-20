import { useLanguage } from "../../common/i18n/LanguageContext";
import contactJson from "../../common/i18n/contact.json";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import contactImg from "../../assets/Contact/contact.png";

export default function ContactSection() {
  const { language } = useLanguage();
  const t = contactJson[language];

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Detecta si la pantalla es exactamente 1920×1080 para forzar medidas Figma
  const isDesktop1920 =
    window.innerWidth >= 1920 && window.innerHeight >= 1080;

  // ⭐ Animación SOLO al entrar
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        maxWidth: "1920px",
        margin: "0 auto",
        background: "#fff",
        color: "#141313",
        padding: "8rem 0",
      }}
    >
      {/* TÍTULO */}
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(26px, 3vw, 40px)",
          lineHeight: "49px",
          color: "#000",
          textAlign: "left",
          marginBottom: "2rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          padding: "0 clamp(20px, 4vw, 80px)",
        }}
      >
        {t.title}
      </h2>

      {/* CONTENEDOR FLEX */}
      <div
        style={{
          display: "flex",
          gap: "140px",
          padding: "0 clamp(20px, 4vw, 80px)",
          alignItems: "stretch",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* FORMULARIO */}
        <form
          style={{
            flex: 1,
            maxWidth: isDesktop1920 ? "874px" : "650px",
            height: isDesktop1920 ? "744px" : "auto",
            display: "flex",
            flexDirection: "column",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s ease 0.2s",
            flexShrink: 0,
          }}
        >
          {/* Fila 1 */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem" }}>
            <Input label={t.fields.firstName} required />
            <Input label={t.fields.lastName} required />
          </div>

          {/* Fila 2 */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem" }}>
            <Input label={t.fields.email} required />
            <Input label={t.fields.phone} required />
          </div>

          {/* Mensaje */}
          <div style={{ marginBottom: "1.2rem" }}>
            <Input label={t.fields.message} textarea required />
          </div>

          {/* ⭐ RECAPTCHA REAL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              style={{
                transform: "scale(1)",
                transformOrigin: "left top",
              }}
            />
          </div>

          {/* BOTÓN */}
          <button
            style={{
              width: "100%",
              background: "#141313",
              color: "#fff",
              padding: "14px 0",
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              marginTop: "auto",
            }}
          >
            {t.button}
          </button>
        </form>

        {/* COLUMNA DERECHA */}
        <div
          style={{
            flex: 1,
            maxWidth: isDesktop1920 ? "810px" : "100%",
            height: isDesktop1920 ? "744px" : "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s ease 0.4s",
            flexShrink: 0,
          }}
        >
          {/* DATOS */}
          <div
            style={{
              display: "flex",
              gap: "140px",
              marginBottom: "53px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(18px, 2vw, 24px)",
                  lineHeight: "29px",
                }}
              >
                {t.contact.emailLabel}
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  lineHeight: "24px",
                }}
              >
                {t.contact.emailValue}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(18px, 2vw, 24px)",
                  lineHeight: "29px",
                }}
              >
                {t.contact.phoneLabel}
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  lineHeight: "24px",
                }}
              >
                {t.contact.phoneValue}
              </div>
            </div>
          </div>

          {/* IMAGEN */}
          <img
            src={contactImg}
            alt="Contact"
            style={{
              width: "100%",
              height: isDesktop1920 ? "633px" : "auto",
              maxWidth: "810px",
              objectFit: "cover",
              aspectRatio: "810 / 633",
              display: "block",
              marginTop: "7px",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ⭐ INPUT COMPONENT */
function Input({ label, required, textarea }: any) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(16px, 2vw, 24px)",
          marginBottom: "8px",
        }}
      >
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>

      {textarea ? (
        <textarea
          style={{
            width: "100%",
            height: "clamp(140px, 10vw, 198px)",
            border: "2px solid #ccc",
            padding: "clamp(10px, 0.8vw, 14px)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(14px, 1.3vw, 18px)",
            lineHeight: "24px",
            resize: "none",
            outline: "none",
          }}
        ></textarea>
      ) : (
        <input
          type="text"
          style={{
            width: "100%",
            height: "clamp(60px, 4vw, 72px)",
            border: "2px solid #ccc",
            padding: "clamp(10px, 0.8vw, 14px)",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(14px, 1.3vw, 18px)",
            outline: "none",
          }}
        />
      )}
    </div>
  );
}
