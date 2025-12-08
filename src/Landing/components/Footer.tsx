import React from "react";
import Logo from "../../assets/Footer/Logoalt.svg";
import { FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";
import footerData from "../../common/i18n/footer.json";
import { useLanguage } from "../../common/i18n/LanguageContext";
import { Link } from "react-router-dom";

const footerLinksKeys = [
  { key: "inicio", href: "/" },
  { key: "videos", href: "/videos" },
  { key: "nosotros", href: "/nosotros" },
  { key: "contacto", href: "/contacto" },
  { key: "careers", href: "/careers" },
];

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = footerData[language]?.footer;

  return (
    <footer className="w-full">
      {/* Bloque negro principal */}
      <div
        className={`
          w-full mx-auto bg-[#111] text-white 
          flex flex-col items-center 
          md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-[clamp(24px,6vw,120px)]
          py:[60px]                       /* móvil: 60px arriba y abajo */
          md:pt-[clamp(32px,4vw,120px)]   /* desktop: tus valores clamp */
          md:pb-[clamp(32px,4vw,120px)]
        `}
        style={{
          maxWidth: 1920,
          paddingLeft: "clamp(32px, 4vw, 80px)",
          paddingRight: "clamp(32px, 4vw, 80px)",
          paddingTop: "clamp(40px, 8vw, 80px)",
          paddingBottom: "clamp(40px, 8vw, 80px)",
          minHeight: "clamp(220px, 30vw, 563px)",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "clamp(14px, 1vw, 24px)",
          gap: "clamp(32px, 4vw, 64px)",
        }}
      >
        {/* Columna izquierda: logo y redes */}
        <div
          className="
            flex flex-col items-center text-center 
            md:items-start md:text-left
          "
          style={{ gap: "clamp(16px, 2vw, 29px)" }}
          
          /* grid: columna izquierda */
          
          
        >
          <img
            src={Logo}
            alt="Blank Logo"
            style={{
              width: "clamp(120px, 12vw, 207px)",
              height: "clamp(20px, 2vw, 34px)",
            }}
          />
          <div className="flex gap-[18px]">
            <a
              href="https://www.instagram.com/blank.agency_/"
              aria-label="Instagram"
              style={{ color: "#fff" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                style={{
                  width: "clamp(18px,2vw,30px)",
                  height: "clamp(18px,2vw,30px)",
                }}
              />
            </a>
            <a
              href="https://www.facebook.com/people/Blank-Agency/61558392456966/"
              aria-label="Facebook"
              style={{ color: "#fff" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                style={{
                  width: "clamp(18px,2vw,30px)",
                  height: "clamp(18px,2vw,30px)",
                }}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/blank-agency-cancun"
              aria-label="LinkedIn"
              style={{ color: "#fff" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                style={{
                  width: "clamp(18px,2vw,30px)",
                  height: "clamp(18px,2vw,30px)",
                }}
              />
            </a>
          </div>
        </div>

        {/* Columna centro: botón y contacto */}
           <div className="flex flex-col items-center mt-8 md:mt-0 md:min-w-[320px] md:max-w-[560px] md:mx-auto"
             /* grid: columna central auto, queda centrada por el template */
           >
          <button
            style={{
              background: "#fff",
              color: "#111",
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(14px, 1vw, 24px)",
              padding: "6px 14px",
              border: "none",
              marginBottom: 12,
              marginTop: 8,
              cursor: "pointer",
              letterSpacing: 0.2,
              textDecoration: "underline",
              width: "auto",
              display: "inline-block",
            }}
          >
            {t.button}
          </button>
          <div
            className="text-center"
            style={{ fontSize: "clamp(13px, 1vw, 18px)", marginBottom: 2 }}
          >
            {t.email}
          </div>
          <div
            className="text-center"
            style={{ fontSize: "clamp(13px, 1vw, 18px)" }}
          >
            {t.phone}
          </div>
        </div>

        {/* Columna derecha: links */}
        <div
          className="
            flex flex-col items-center text-center 
            mt-8 md:mt-0 
            md:items-end md:text-right
          "
          style={{ gap: 0 }}
          
          /* grid: columna derecha */
          
        >
          {footerLinksKeys.map((link) => (
            <Link
              key={link.key}
              to={link.href}
              style={{
                color: "#fff",
                textDecoration: "underline",
                fontSize: "clamp(14px, 1vw, 24px)",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: 2,
                fontWeight: 400,
                fontStyle: "normal",
                lineHeight: 1.4,
              }}
            >
              {t.links[link.key as keyof typeof t.links]}
            </Link>
          ))}
        </div>
      </div>

      {/* Franja blanca inferior */}
      <div
        className={`
          w-full mx-auto bg-[#fff] text-[#111] 
          flex flex-col-reverse items-center justify-center gap-2 
          md:flex-row md:justify-between md:items-center
          py-[14px]          /* móvil: 14px arriba y abajo */
          md:py-0            /* desktop: vuelve a minHeight + alineado original */
        `}
        style={{
          maxWidth: 1920,
          fontSize: 12,
          minHeight: "clamp(40px, 4vw, 63px)",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {/* Copyright (abajo en mobile por flex-col-reverse) */}
        <div className="text-center md:text-left">{t.copyright}</div>

        {/* Links legales */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-[18px]">
          <a href="#" className="underline" style={{ color: "#111" }}>
            {t.privacy}
          </a>
          <a href="#" className="underline" style={{ color: "#111" }}>
            {t.terms}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
