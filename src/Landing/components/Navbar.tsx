import React from "react";
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
    instagram: <FaInstagram style={{ width: 'clamp(18px,2vw,24px)', height: 'clamp(18px,2vw,24px)' }} />,
    facebook: <FaFacebookF style={{ width: 'clamp(18px,2vw,24px)', height: 'clamp(18px,2vw,24px)' }} />,
    linkedin: <FaLinkedin style={{ width: 'clamp(18px,2vw,24px)', height: 'clamp(18px,2vw,24px)' }} />,
};

const Navbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const t = navarData[language]?.nav;
    const location = useLocation();
    return (
        <nav
            style={{
                width: "100%",
                background: "#fff",
                borderBottom: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
                minHeight: "clamp(56px, 6vw, 172px)",
                padding: 0,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 1920,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "0 auto",
                    padding: "0 clamp(10px, 2vw, 32px)",
                    minHeight: "inherit",
                    gap: "clamp(8px, 2vw, 32px)",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={Logo} alt="Blank Logo" style={{ height: 38 }} />
                </div>
                {/* Nav Links */}
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 32px)" }}>
                    {navLinksKeys.map((link) => {
                        if (link.key === "careers") {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link
                                    key={link.key}
                                    to={link.href}
                                    style={{
                                        color: "#222",
                                        fontSize: "clamp(14px, 1vw, 20px)",
                                        letterSpacing: 0.5,
                                        textDecoration: "none",
                                        borderBottom: isActive ? "2px solid #222" : "none",
                                        paddingBottom: isActive ? 2 : 0,
                                        fontWeight: 400,
                                        transition: "border-bottom 0.2s",
                                        fontFamily: 'Montserrat, sans-serif',
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
                                    style={{
                                        color: "#222",
                                        fontSize: "clamp(14px, 1vw, 20px)",
                                        letterSpacing: 0.5,
                                        textDecoration: "none",
                                        borderBottom: "none",
                                        fontWeight: 400,
                                        transition: "border-bottom 0.2s",
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                    onClick={e => {
                                        e.preventDefault();
                                        const el = document.getElementById(link.href.replace('#', ''));
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.location.href = '/' + link.href;
                                        }
                                    }}
                                >
                                    {t[link.key as keyof typeof t]}
                                </a>
                            );
                        }
                    })}
                </div>
                {/* Social & Language */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 90 }}>
                    <div style={{ display: "flex", gap: "clamp(8px, 1.5vw, 24px)", justifyContent: "center", alignItems: "center" }}>
                        {socialLinks.map((s) => (
                            <a
                                key={s.key}
                                href={s.href}
                                aria-label={t[s.key as keyof typeof t]}
                                style={{ color: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {iconSvg[s.icon as keyof typeof iconSvg]}
                            </a>
                        ))}
                    </div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                        <button
                            onClick={() => setLanguage('es')}
                            style={{
                                fontSize: "clamp(12px, 0.8vw, 16px)",
                                color: language === 'es' ? "#222" : "#888",
                                fontWeight: 400,
                                letterSpacing: 0.1,
                                fontFamily: 'Montserrat, sans-serif',
                                background: 'none',
                                border: 'none',
                                borderBottom: language === 'es' ? '2px solid #222' : 'none',
                                cursor: 'pointer',
                                padding: 0,
                                marginRight: 4,
                            }}
                            aria-label="Cambiar a español"
                        >
                            Español
                        </button>
                        <span style={{ color: '#888', fontSize: "clamp(14px, 1vw, 16px)" }}>/</span>
                        <button
                            onClick={() => setLanguage('en')}
                            style={{
                                fontSize: "clamp(12px, 0.8vw, 16px)",
                                color: language === 'en' ? "#222" : "#888",
                                fontWeight: 400,
                                letterSpacing: 0.1,
                                fontFamily: 'Montserrat, sans-serif',
                                background: 'none',
                                border: 'none',
                                borderBottom: language === 'en' ? '2px solid #222' : 'none',
                                cursor: 'pointer',
                                padding: 0,
                                marginLeft: 4,
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

