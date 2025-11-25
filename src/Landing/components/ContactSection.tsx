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

  // FORM STATE
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [captchaOK, setCaptchaOK] = useState(false);

  // Validate field
  const validateField = (field: string, value: string) => {
    let error = "";

    if (!value.trim()) error = "Required";
    else if (field === "email" && !/\S+@\S+\.\S+/.test(value))
      error = "Invalid email";

    setErrors((prev: any) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const isFormValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    /\S+@\S+\.\S+/.test(form.email.trim()) &&
    form.phone.trim() &&
    form.message.trim() &&
    captchaOK;

  // Animación
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

  // Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Formulario enviado:", form);
  };

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
      {/* TITLE */}
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

      {/* MAIN FLEX LAYOUT */}
      <div
        className="flex flex-col md:flex-row items-stretch"
        style={{
          gap: "clamp(40px, 6vw, 140px)",
          padding: "0 clamp(20px, 4vw, 80px)",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1"
          style={{
            maxWidth: "874px",
            height: "auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s ease 0.2s",
            flexShrink: 0,
          }}
        >
          {/* Fila 1 */}
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <Input
              label={t.fields.firstName}
              required
              value={form.firstName}
              onChange={(v: string) => handleChange("firstName", v)}
              error={errors.firstName}
            />
            <Input
              label={t.fields.lastName}
              required
              value={form.lastName}
              onChange={(v: string) => handleChange("lastName", v)}
              error={errors.lastName}
            />
          </div>

          {/* Fila 2 */}
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <Input
              label={t.fields.email}
              required
              value={form.email}
              onChange={(v: string) => handleChange("email", v)}
              error={errors.email}
            />
            <Input
              label={t.fields.phone}
              required
              value={form.phone}
              onChange={(v: string) => handleChange("phone", v)}
              error={errors.phone}
            />
          </div>

          {/* Mensaje */}
          <div className="mb-5">
            <Input
              label={t.fields.message}
              textarea
              required
              value={form.message}
              onChange={(v: string) => handleChange("message", v)}
              error={errors.message}
            />
          </div>

          {/* RECAPTCHA */}
          <div className="flex items-center mb-[15px] md:mb-0">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(token) => setCaptchaOK(!!token)}
              onExpired={() => setCaptchaOK(false)}
              onErrored={() => setCaptchaOK(false)}
            />
          </div>

          {/* BOTÓN */}
          <button
            disabled={!isFormValid}
            style={{
              width: "100%",
              background: !isFormValid ? "#888" : "#141313",
              color: "#fff",
              padding: "14px 0",
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
              cursor: isFormValid ? "pointer" : "not-allowed",
              marginTop: "auto",
            }}
          >
            {t.button}
          </button>
        </form>

        {/* COLUMNA DERECHA */}
        <div
          className="flex flex-col flex-1"
          style={{
            maxWidth: "810px",
            height: "auto",
            justifyContent: "flex-start",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s ease 0.4s",
            flexShrink: 0,
          }}
        >
          {/* DATOS */}
          <div
            className="
              flex flex-col gap-5 mb-8
              md:flex-row md:justify-between md:gap-[140px] md:mb-[53px]
            "
            style={{
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

          {/* IMG - oculta en mobile, visible en md+ */}
          <img
            src={contactImg}
            alt="Contact"
            className="hidden md:block"
            style={{
              width: "100%",
              maxWidth: "810px",
              height: "auto",
              objectFit: "cover",
              aspectRatio: "810 / 633",
              marginTop: "7px",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* INPUT */
function Input({ label, required, textarea, value, onChange, error }: any) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(16px, 2vw, 24px)",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          whiteSpace: "nowrap",
        }}
      >
        <span>{label}</span>
        {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

      {error && (
        <span style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
          {error}
        </span>
      )}
    </div>
  );
}
