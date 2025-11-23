import { useLanguage } from "../../common/i18n/LanguageContext";
import differentiatorsJson from "../../common/i18n/differentiators.json";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import img1 from "../../assets/Differentiators/img.jpg";
import img2 from "../../assets/Differentiators/img1.jpg";
import img3 from "../../assets/Differentiators/img2.jpg";


function RevealMaskImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !circleRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Velocidad dinámica del Hero
    const xPercent = (x / width) * 100;
    let transitionMultiplier =
      xPercent < 50 ? ((xPercent - 50) * -1) / 50 : (xPercent - 50) / 50;

    const baseSpeed = 1.4;
    const speed = baseSpeed - (baseSpeed * 0.4) * transitionMultiplier;

    const maxRadius = Math.sqrt(width * width + height * height);

    // Animación del círculo
    gsap.killTweensOf(circleRef.current);

    gsap.set(circleRef.current, {
      opacity: 1,
      attr: { r: 0, cx: x, cy: y },
    });

    gsap.to(circleRef.current, {
      duration: speed,
      ease: "power2.out",
      attr: { r: maxRadius },
    });

    // Glow externo
    gsap.to(containerRef.current, {
      boxShadow: "0 0 35px rgba(255,255,255,0.28)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!circleRef.current || !containerRef.current) return;

    gsap.killTweensOf(circleRef.current);

    gsap.to(circleRef.current, {
      duration: 0.6,
      ease: "power2.inOut",
      attr: { r: 0 },
      opacity: 0,
    });

    // Quitar glow
    gsap.to(containerRef.current, {
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "min(573px, 100%)",
        aspectRatio: "573 / 346",
        overflow: "hidden",
        transition: "box-shadow .4s ease",
      }}
    >
      {/* Capa base en blanco y negro */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%) brightness(0.8)",
          transition:
            "transform .8s cubic-bezier(.22,.61,.36,1), filter .8s ease, blur .8s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.filter =
            "grayscale(0%) brightness(1) blur(2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter =
            "grayscale(100%) brightness(0.8) blur(0px)";
        }}
      />

      {/* Imagen color con máscara circular */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id={`mask-${alt.replace(/\s/g, "")}`}>
            <rect width="100%" height="100%" fill="black" />
            <circle ref={circleRef} r={0} cx={0} cy={0} fill="white" opacity={0} />
          </mask>
        </defs>

        <image
          href={src}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#mask-${alt.replace(/\s/g, "")})`}
        />
      </svg>
    </div>
  );
}




export default function DifferentiatorsSection() {
  const { language } = useLanguage();
  const t = differentiatorsJson[language];
  const images = [img1, img2, img3];

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // 🎯 Animación activada SOLO cuando se ve la sección
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Se activa solo una vez
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        maxWidth: "1920px",
        margin: "0 auto",
        background: "#fff",
        color: "#141313",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 0",
      }}
    >
      {/* TÍTULO */}
      <h2
        style={{
          fontFamily:
            "Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(26px, 2.6vw, 40px)",
          lineHeight: "130%",
          letterSpacing: "0.5px",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        {t.title}
      </h2>

      {/* SUBTÍTULO */}
      <p
        style={{
          fontFamily:
            "Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(18px, 1.7vw, 32px)",
          lineHeight: "130%",
          textAlign: "center",
          marginTop: "clamp(4px, 0.6vw, 8px)",
          marginBottom: "clamp(40px, 7.135vw, 137px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.15s",
        }}
      >
        {t.subtitle}
      </p>

      {/* CARDS */}
<div
  style={{
    display: "flex",
    flexDirection: window.innerWidth >= 1024 ? "row" : "column",
    justifyContent: window.innerWidth >= 1024 ? "space-between" : "center",
    alignItems: "center",
    gap: window.innerWidth >= 1024 ? "20px" : "25px",
    width: "100%",
    padding: "0 clamp(20px, 4vw, 80px)",
  }}
>

        {t.items.map((item, index) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "573px",
              width: "100%",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: `all 0.9s ease ${0.25 + index * 0.2}s`,
            }}
          >
            {/* TÍTULO */}
            <h3
              style={{
                fontFamily:
                  "Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(12px, 1.4vw, 26px)",
                lineHeight: "130%",
                textAlign: "center",
                color: "#141313",
                marginBottom: "clamp(10px, 1vw, 20px)",
                maxWidth: "573px",
              }}
            >
              {item.title}
            </h3>

            {/* ⭐ AQUÍ VA LA ANIMACIÓN FINAL */}
            <RevealMaskImage src={images[index]} alt={item.title} />
          </div>

        ))}
      </div>
    </section>
  );  
}
