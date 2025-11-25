import React, { useEffect, useState } from "react";
import Logo from "../../assets/Navar/Logo.svg";
import { FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";
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
  const [activeKey, setActiveKey] = useState<string>("inicio");

  const handleAnchorClick = (href: string, key: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
    setActiveKey(key);
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
              const isRouteActive = location.pathname === link.href;
              const isActive = activeKey === link.key || isRouteActive;
              return (
                <Link
                  key={link.key}
                  to={link.href}
                  onClick={() => setActiveKey(link.key)}
                  className="no-underline font-[Montserrat,sans-serif]"
                  style={{
                    color: "#222",
                    fontSize: "clamp(14px,1vw,20px)",
                    letterSpacing: 0.5,
                    borderBottom: isActive ? "2px solid #222" : "none",
                    paddingBottom: isActive ? 2 : 0,
                    fontWeight: 400,
                    transition: "border-bottom 0.2s",
                    display: "inline-block",
                  }}
                >
                  {t[link.key as keyof typeof t]}
                </Link>
              );
            } else {
              const isActive = activeKey === link.key;
              return (
                <a
                  key={link.key}
                  href={link.href}
                  className="no-underline font-[Montserrat,sans-serif]"
                  style={{
                    color: "#222",
                    fontSize: "clamp(14px,1vw,20px)",
                    letterSpacing: 0.5,
                    borderBottom: isActive ? "2px solid #222" : "none",
                    paddingBottom: isActive ? 2 : 0,
                    fontWeight: 400,
                    transition: "border-bottom 0.2s",
                    display: "inline-block",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick(link.href, link.key);
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

        {/* Botón menú (mobile) - hamburguesa/X */}
        <button
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden flex flex-col items-center justify-center bg-transparent border-none cursor-pointer p-2 z-[310]"
        >
          <span
            className={`
              block w-6 h-[2px] bg-[#222] rounded-sm
              transition-transform duration-300 ease-out
              ${isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}
            `}
          />
          <span
            className={`
              block w-6 h-[2px] bg-[#222] rounded-sm my-[4px]
              transition-opacity duration-300 ease-out
              ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}
            `}
          />
          <span
            className={`
              block w-6 h-[2px] bg-[#222] rounded-sm
              transition-transform duration-300 ease-out
              ${isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}
            `}
          />
        </button>
      </div>

      {/* Menú móvil lateral */}
      <div
        onClick={() => isMobileMenuOpen && toggleMobileMenu()}
        className={`
          fixed md:hidden left-0 right-0 bottom-0 
          bg-[rgba(0,0,0,0.25)] z-[250] flex justify-end
          transition-opacity duration-300 ease-out
          top-[clamp(56px,6vw,172px)]
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            m-0 ml-auto w-[min(320px,80vw)] bg-white 
            shadow-[-4px_0_12px_rgba(0,0,0,0.15)]
            py-6 px-6 flex flex-col justify-between items-center
            h-full transform transition-transform duration-300 ease-out relative
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Links centrados */}
          <div className="flex flex-col gap-[30px] w-full mt-10 items-center">
            {navLinksKeys.map((link) => {
              const isActive =
                activeKey === link.key ||
                (link.key === "careers" && location.pathname === link.href);

              if (link.key === "careers") {
                return (
                  <Link
                    key={link.key}
                    to={link.href}
                    onClick={() => {
                      setActiveKey(link.key);
                      setIsMobileMenuOpen(false);
                    }}
                    className="no-underline font-[Montserrat,sans-serif] text-center"
                    style={{
                      color: "#222",
                      fontSize: 16,
                      letterSpacing: 0.5,
                      borderBottom: isActive ? "2px solid #222" : "none",
                      paddingBottom: isActive ? 4 : 0,
                      fontWeight: 400,
                      display: "inline-block", // subrayado solo del texto
                    }}
                  >
                    {t[link.key as keyof typeof t]}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={link.key}
                    onClick={() => handleAnchorClick(link.href, link.key)}
                    className="bg-transparent border-none p-0 cursor-pointer font-[Montserrat,sans-serif] text-center"
                    style={{
                      color: "#222",
                      fontSize: 16,
                      letterSpacing: 0.5,
                      borderBottom: isActive ? "2px solid #222" : "none",
                      paddingBottom: isActive ? 4 : 0,
                      fontWeight: 400,
                      display: "inline-block", // subrayado solo del texto
                    }}
                  >
                    {t[link.key as keyof typeof t]}
                  </button>
                );
              }
            })}
          </div>

          {/* Redes + idioma centrados abajo */}
          <div className="w-full flex flex-col items-center gap-6 mb-4 mt-8">
            <div className="flex gap-4 items-center">
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

            <div className="flex items-center gap-[6px]">
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
      </div>
    </nav>
  );
};

export default Navbar;
