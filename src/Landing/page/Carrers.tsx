import { MdCloudUpload } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

import React from "react";
import bgCareers from "../../assets/Carrers/carrers.png";
import { useLanguage } from "../../common/i18n/LanguageContext";
import careersDict from "../../common/i18n/careers.json";
import Splash from "../../common/splash/Splash";

const Careers: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: string) => (careersDict as any)[language][key] || key;

  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  const [attachedFile, setAttachedFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    portfolio: "",
  });
  const [touched, setTouched] = React.useState<{ [k: string]: boolean }>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 3 * 1024 * 1024) {
      setFileError("El archivo supera el máximo de 3MB");
      setAttachedFile(null);
    } else {
      setFileError(null);
      setAttachedFile(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isRequiredMissing =
    !form.name || !form.lastname || !form.email || !form.phone || !attachedFile;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, lastname: true, email: true, phone: true });
    if (isRequiredMissing) {
      setSubmitError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setSubmitError(null);
    // Aquí iría el envío real del formulario
  };

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;

  return (
    <section className="w-full min-h-screen bg-[#fafafa]">
      {/* Imagen de fondo */}
      <div
        className="w-full bg-cover bg-center mb-[clamp(24px,4vw,48px)]"
        style={{
          height: "clamp(180px, 32vw, 360px)",
          backgroundImage: `url(${bgCareers})`,
        }}
      />

      {/* Contenido principal */}
      <div
        className="mx-auto"
        style={{
          maxWidth: 1920,
          padding: "clamp(16px, 3vw, 48px)",
        }}
      >
        {/* Título y subtítulo */}
        <div style={{ marginBottom: "clamp(12px, 2vw, 24px)" }}>
          <h1
            style={{
              fontWeight: 700,
              fontSize: "clamp(22px, 2.5vw, 38px)",
              margin: 0,
              letterSpacing: 0.2,
              display: "inline-block",
              color: "#111",
            }}
          >
            {(() => {
              const title = t("title");
              const dashIdx = title.indexOf("—");
              if (dashIdx === -1) return title;
              return (
                <>
                  {title.slice(0, dashIdx)}
                  <span style={{ color: "#868686", fontWeight: 700 }}>
                    {title.slice(dashIdx)}
                  </span>
                </>
              );
            })()}
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 18px)",
              margin: "clamp(8px, 1vw, 16px) 0 0 0",
              color: "#111",
              fontWeight: 400,
              maxWidth: 900,
            }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Formulario y adjunto */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row flex-wrap w-full"
          style={{
            gap: "clamp(32px, 7vw, 140px)",
          }}
        >
          {/* Columna izquierda: formulario */}
          <div
            className="flex flex-col flex-1 min-w-[320px]"
            style={{ gap: "clamp(12px, 1.5vw, 24px)" }}
          >
            {/* Nombre / Apellido */}
            <div
              className="flex flex-col md:flex-row"
              style={{ gap: "clamp(12px, 1vw, 20px)" }}
            >
              <div className="flex flex-col flex-1 gap-[4px]">
                <label
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(13px, 1vw, 16px)",
                    color: "#111",
                  }}
                >
                  {t("name")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{
                    padding: "clamp(8px, 1vw, 14px)",
                    fontSize: "clamp(13px, 1vw, 16px)",
                    border:
                      touched.name && !form.name
                        ? "1.5px solid red"
                        : "1px solid #111",
                    borderRadius: 0,
                    color: "#111",
                  }}
                />
                {touched.name && !form.name && (
                  <span style={{ color: "red", fontSize: 12 }}>
                    Obligatorio
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-1 gap-[4px] mt-3 md:mt-0">
                <label
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(13px, 1vw, 16px)",
                    color: "#111",
                  }}
                >
                  {t("lastname")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="lastname"
                  value={form.lastname}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{
                    padding: "clamp(8px, 1vw, 14px)",
                    fontSize: "clamp(13px, 1vw, 16px)",
                    border:
                      touched.lastname && !form.lastname
                        ? "1.5px solid red"
                        : "1px solid #111",
                    borderRadius: 0,
                    color: "#111",
                  }}
                />
                {touched.lastname && !form.lastname && (
                  <span style={{ color: "red", fontSize: 12 }}>
                    Obligatorio
                  </span>
                )}
              </div>
            </div>

            {/* Email / Phone */}
            <div
              className="flex flex-col md:flex-row"
              style={{ gap: "clamp(12px, 1vw, 20px)" }}
            >
              <div className="flex flex-col flex-1 gap-[4px]">
                <label
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(13px, 1vw, 16px)",
                    color: "#111",
                  }}
                >
                  {t("email")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{
                    padding: "clamp(8px, 1vw, 14px)",
                    fontSize: "clamp(13px, 1vw, 16px)",
                    border:
                      touched.email && !form.email
                        ? "1.5px solid red"
                        : "1px solid #111",
                    borderRadius: 0,
                    color: "#111",
                  }}
                />
                {touched.email && !form.email && (
                  <span style={{ color: "red", fontSize: 12 }}>
                    Obligatorio
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-1 gap-[4px] mt-3 md:mt-0">
                <label
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(13px, 1vw, 16px)",
                    color: "#111",
                  }}
                >
                  {t("phone")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{
                    padding: "clamp(8px, 1vw, 14px)",
                    fontSize: "clamp(13px, 1vw, 16px)",
                    border:
                      touched.phone && !form.phone
                        ? "1.5px solid red"
                        : "1px solid #111",
                    borderRadius: 0,
                    color: "#111",
                  }}
                />
                {touched.phone && !form.phone && (
                  <span style={{ color: "red", fontSize: 12 }}>
                    Obligatorio
                  </span>
                )}
              </div>
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-[4px] flex-1">
              <label
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(13px, 1vw, 16px)",
                  color: "#111",
                }}
              >
                {t("message")}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                style={{
                  padding: "clamp(8px, 1vw, 14px)",
                  fontSize: "clamp(13px, 1vw, 16px)",
                  border: "1px solid #111",
                  borderRadius: 0,
                  minHeight: 160,
                  height: "100%",
                  resize: "vertical",
                  color: "#111",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Columna derecha: adjunto y captcha */}
          <div
            className="flex flex-col flex-1 min-w-[320px]"
            style={{ gap: "clamp(12px, 1.5vw, 24px)" }}
          >
            {/* Adjunto */}
            <div className="flex flex-col gap-[4px]">
              <label
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(13px, 1vw, 16px)",
                  color: "#111",
                }}
              >
                {t("attach")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="flex flex-col items-center justify-center text-center cursor-pointer"
                style={{
                  background: "#EAEAEA",
                  minHeight: "clamp(120px, 20vw, 160px)",
                  padding: "clamp(16px, 2vw, 32px)",
                  color: "#A6A6A6",
                  fontSize: "clamp(13px, 1vw, 15px)",
                  position: "relative",
                }}
                onClick={() =>
                  document.getElementById("file-input-careers")?.click()
                }
              >
                <input
                  id="file-input-careers"
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png,.ppt,.pptx,.xls,.xlsx,.txt"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <MdCloudUpload
                  style={{
                    fontSize: "clamp(32px, 4vw, 48px)",
                    color: "#A6A6A6",
                    marginBottom: 8,
                  }}
                />
                {attachedFile ? (
                  <>
                    <span style={{ color: "#111", fontWeight: 600 }}>
                      {attachedFile.name}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(11px, 0.8vw, 13px)",
                        color: "#888",
                        marginTop: 4,
                      }}
                    >
                      {(attachedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </>
                ) : (
                  <>
                    {t("drop")}
                    <br />
                    <span
                      style={{
                        fontSize: "clamp(11px, 0.8vw, 13px)",
                        color: "#A6A6A6",
                      }}
                    >
                      {t("maxsize")}
                    </span>
                  </>
                )}
                {fileError && (
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginTop: 6,
                    }}
                  >
                    {fileError}
                  </span>
                )}
              </div>
            </div>

            {/* Portfolio + reCAPTCHA */}
            <div
              className="flex flex-col md:flex-row items-stretch md:items-center"
              style={{ gap: "clamp(8px, 1vw, 16px)" }}
            >
              <div className="flex flex-col flex-1 gap-[4px]">
                <label
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(13px, 1vw, 16px)",
                    color: "#111",
                  }}
                >
                  {t("portfolio")}
                </label>
                <input
                  name="portfolio"
                  value={form.portfolio}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full md:w-[clamp(220px,20vw,420px)] box-border"
                  style={{
                    padding: "clamp(8px, 1vw, 14px)",
                    fontSize: "clamp(13px, 1vw, 16px)",
                    border: "1px solid #111",
                    borderRadius: 0,
                    color: "#111",
                  }}
                />
              </div>

              {/* reCAPTCHA */}
              <div
                className="flex justify-center md:justify-center"
                style={{
                  minWidth: "clamp(120px, 12vw, 200px)",
                  minHeight: "clamp(32px, 3vw, 60px)",
                  width: "100%",
                  padding: "0 clamp(8px, 2vw, 24px)",
                  marginLeft: "clamp(8px, 1vw, 20px)",
                }}
              >
                <div className="flex justify-center">
                  <ReCAPTCHA
                    key={language}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                    theme="light"
                    hl={language}
                  />
                </div>
              </div>
            </div>

            {/* Botón enviar */}
            <button
              type="submit"
              className="self-stretch md:self-start font-[Montserrat,sans-serif]"
              style={{
                background: captchaValue ? "#111" : "#888",
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(15px, 1.2vw, 20px)",
                padding:
                  "clamp(10px, 1vw, 18px) clamp(32px, 4vw, 64px)",
                border: "none",
                borderRadius: 4,
                marginTop: "clamp(8px, 1vw, 24px)",
                cursor: captchaValue ? "pointer" : "not-allowed",
                letterSpacing: 0.2,
                opacity: captchaValue ? 1 : 0.6,
                transition: "background 0.2s, opacity 0.2s",
              }}
              disabled={!captchaValue}
            >
              {t("send")}
            </button>

            {submitError && (
              <div style={{ color: "red", marginTop: 8 }}>
                {submitError}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Careers;
