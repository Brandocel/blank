import React, { useEffect, useState } from "react";
import Logo from "../../assets/Navar/Logo.svg";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedin,
} from "react-icons/fa";
import navarData from "../../common/i18n/navar.json";
import { useLanguage } from "../../common/i18n/LanguageContext";
import { Link, useLocation } from "react-router-dom";

const navLinksKeys = [
  { key: "inicio", href: "#inicio" },
  { key: "videos", href: "#videos" },
  { key: "nosotros", href: "#nosotros" },
  { key: "contacto", href: "#contacto" },
  { key: "careers", href: "/careers" },
];

const socialLinks = [
  { icon: "instagram", href: "#", key: "instagram" },
  { icon: "facebook", href: "#", key: "facebook" },
  { icon: "linkedin", href: "#", key: "linkedin" },
];

const iconSvg = {
  instagram: (
    <FaInstagram
      style={{ width: "clamp(18px,2vw,24px)", height: "clamp(18px,2vw,24px)" }}
    />
  ),
  facebook: (
    <FaFacebookF
      style={{ width: "clamp(18px,2vw,24px)", height: "clamp(18px,2vw,24px)" }}
    />
  ),
  linkedin: (
    <FaLinkedin
      style={{ width: "clamp(18px,2vw,24px)", height: "clamp(18px,2vw,24px)" }}
    />
  ),
};

const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = navarData[language]?.nav;
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAnchorClick = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="w-full bg-white border-b border-[#f5f5f5] flex flex-col items-center justify-center sticky top-0 z-[300] font-[inherit] min-h-[clamp(56px,6vw,172px)]">
      <div className="w-full max-w-[1920px] flex items-center justify-between mx-auto px-[clamp(10px,2vw,32px)] min-h-[clamp(56px,6vw,172px)] gap-[clamp(8px,2vw,32px)]">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Blank Logo" className="h-[28px] md:h-[38px]" />
        </div>

        {/* Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-[clamp(8px,2vw,32px)]">
          {navLinksKeys.map((link) => {
            if (link.key === "careers") {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.key}
                  to={link.href}
                  className="no-underline font-[Montserrat,sans-serif]"
                  style={{
                    color: "#222",
                    fontSize: "clamp(14px,1vw,20px)",
                    letterSpacing: 0.5,
                    borderBottom: isActive ? "2px solid #222" : "none",
                    paddingBottom: isActive ? 2 : 0,
                    fontWeight: 400,
                    transition: "border-bottom 0.2s",
                  }}
                >
                  {t[link.key as keyof typeof t]}
                </Link>
              );
            } else {
              return (
                <a
                  key={link.key}
                  href={link.href}
                  className="no-underline font-[Montserrat,sans-serif]"
                  style={{
                    color: "#222",
                    fontSize: "clamp(14px,1vw,20px)",
                    letterSpacing: 0.5,
                    borderBottom: "none",
                    fontWeight: 400,
                    transition: "border-bottom 0.2s",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick(link.href);
                  }}
                >
                  {t[link.key as keyof typeof t]}
                </a>
              );
            }
          })}
        </div>

        {/* Social & Language (desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center min-w-[90px]">
          <div className="flex gap-[clamp(8px,1.5vw,24px)] items-center justify-center">
            {socialLinks.map((s) => (
              <a
                key={s.key}
                href={s.href}
                aria-label={t[s.key as keyof typeof t]}
                className="flex items-center justify-center text-[#111]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {iconSvg[s.icon as keyof typeof iconSvg]}
              </a>
            ))}
          </div>
          <div className="mt-[6px] flex gap-[6px]">
            <button
              onClick={() => setLanguage("es")}
              className="bg-none border-none px-0 mr-1 font-[Montserrat,sans-serif]"
              style={{
                fontSize: "clamp(12px,0.8vw,16px)",
                color: language === "es" ? "#222" : "#888",
                fontWeight: 400,
                letterSpacing: 0.1,
                borderBottom: language === "es" ? "2px solid #222" : "none",
                cursor: "pointer",
              }}
              aria-label="Cambiar a español"
            >
              Español
            </button>
            <span
              style={{
                color: "#888",
                fontSize: "clamp(14px,1vw,16px)",
              }}
            >
              /
            </span>
            <button
              onClick={() => setLanguage("en")}
              className="bg-none border-none px-0 ml-1 font-[Montserrat,sans-serif]"
              style={{
                fontSize: "clamp(12px,0.8vw,16px)",
                color: language === "en" ? "#222" : "#888",
                fontWeight: 400,
                letterSpacing: 0.1,
                borderBottom: language === "en" ? "2px solid #222" : "none",
                cursor: "pointer",
              }}
              aria-label="Switch to English"
            >
              English
            </button>
          </div>
        </div>

        {/* Botón menú (mobile) - solo muestra hamburguesa */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Abrir menú"
          className={`${isMobileMenuOpen ? 'hidden' : 'flex'} md:hidden flex-col items-center justify-center bg-none border-none cursor-pointer p-2`}
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              background: '#222',
              marginBottom: 5,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              background: '#222',
              marginBottom: 5,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              background: '#222',
            }}
          />
        </button>
      </div>

      {/* Menú móvil tipo drawer lateral con animación (solo mobile) */}
      <div
        onClick={() => isMobileMenuOpen && toggleMobileMenu()}
        className={`fixed md:hidden left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.25)] z-[250] flex justify-end transition-opacity duration-200 ease-out
        top-[clamp(56px,6vw,172px)]
        ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Panel del menú */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`m-[12px] mr-[clamp(10px,4vw,24px)] ml-auto w-[min(320px,80vw)] bg-white shadow-[-4px_0_12px_rgba(0,0,0,0.15)] 
          py-4 flex flex-col justify-center items-center max-h-[calc(100vh-360px)] overflow-y-auto transform transition-transform duration-200 ease-out relative
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Botón cerrar X dentro del drawer */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Cerrar menú"
            className="absolute top-4 right-4 flex flex-col items-center justify-center bg-none border-none cursor-pointer p-2"
          >
            <span
              style={{
                display: 'block',
                width: 20,
                height: 1,
                background: '#222',
                transform: 'rotate(45deg)',
                position: 'absolute',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 20,
                height: 1,
                background: '#222',
                transform: 'rotate(-45deg)',
                position: 'absolute',
              }}
            />
          </button>
          {/* Links */}
          <div className="flex flex-col gap-[30px]">
            {navLinksKeys.map((link) => {
              if (link.key === "careers") {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.key}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="no-underline font-[Montserrat,sans-serif]"
                    style={{
                      color: "#222",
                      fontSize: 15,
                      borderBottom: isActive ? "2px solid #222" : "none",
                      paddingBottom: 4,
                      fontWeight: 400,
                    }}
                  >
                    {t[link.key as keyof typeof t]}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={link.key}
                    onClick={() => handleAnchorClick(link.href)}
                    className="text-left bg-transparent border-none p-0 cursor-pointer font-[Montserrat,sans-serif]"
                    style={{
                      color: "#222",
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    {t[link.key as keyof typeof t]}
                  </button>
                );
              }
            })}
          </div>

          {/* Redes */}
          <div className="flex gap-4 mt-10 items-center">
            {socialLinks.map((s) => (
              <a
                key={s.key}
                href={s.href}
                aria-label={t[s.key as keyof typeof t]}
                className="flex items-center justify-center text-[#111]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {iconSvg[s.icon as keyof typeof iconSvg]}
              </a>
            ))}
          </div>

          {/* Idioma */}
          <div className=" flex items-center gap-[6px]">
            <button
              onClick={() => setLanguage("es")}
              className="bg-none border-none px-0 mr-1 font-[Montserrat,sans-serif]"
              style={{
                fontSize: 14,
                color: language === "es" ? "#222" : "#888",
                fontWeight: 400,
                letterSpacing: 0.1,
                borderBottom: language === "es" ? "2px solid #222" : "none",
                cursor: "pointer",
              }}
              aria-label="Cambiar a español"
            >
              Español
            </button>
            <span className="text-[#888] text-[14px]">/</span>
            <button
              onClick={() => setLanguage("en")}
              className="bg-none border-none px-0 ml-1 font-[Montserrat,sans-serif]"
              style={{
                fontSize: 14,
                color: language === "en" ? "#222" : "#888",
                fontWeight: 400,
                letterSpacing: 0.1,
                borderBottom: language === "en" ? "2px solid #222" : "none",
                cursor: "pointer",
              }}
              aria-label="Switch to English"
            >
              English
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
