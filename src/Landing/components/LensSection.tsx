import { useLanguage } from "../../common/i18n/LanguageContext";
import lensJson from "../../common/i18n/lens.json";
import { useEffect, useRef, useState } from "react";

import img1 from "../../assets/Lens/img3.png";
import img2 from "../../assets/Lens/img4.png";
import img3 from "../../assets/Lens/img5.png";
import img4 from "../../assets/Lens/img6.png";

export default function LensSection() {
  const { language } = useLanguage();
  const t = lensJson[language];
  const images = [img1, img2, img3, img4];

  // ⭐ Igual que Differentiators
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // ⭐ Animación SOLO al entrar en viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 0",

      }}
    >
      {/* TÍTULO */}
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(15px, 2.1vw, 40px)",
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
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(18px, 1.7vw, 32px)",
          textAlign: "center",
          marginBottom: "clamp(30px, 5vw, 90px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.15s",
        }}
      >
        {t.subtitle}
      </p>

      {/* GRID escalable */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: "0.62",
            transformOrigin: "top center",
            width: "fit-content",
          }}
        >
          <div
            id="lens-grid"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(20px, 4vw, 72px)",
              padding: "0 clamp(10px, 2vw, 80px)",
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
                  width: "clamp(240px, 20vw, 385px)",
                  minWidth: "240px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.9s ease ${0.25 + index * 0.2}s`,
                }}
              >
                {/* TÍTULO */}
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(16px, 1.4vw, 26px)",
                    lineHeight: "130%",
                    marginBottom: "clamp(8px, 1vw, 16px)",
                    whiteSpace: "pre-line",
                    color: "#000",
                  }}
                >
                  {item.title}
                </h3>

                {/* IMAGEN (MISMA ANIMACIÓN QUE DIFFERENTIATORS) */}
                <img
                  src={images[index]}
                  alt={item.title}
                  style={{
                    width: "100%",
                    aspectRatio: "385.62 / 685.7",
                    objectFit: "cover",
                    display: "block",
                    transition: "all 0.4s ease",
                    maxHeight: "65vh",
                    filter: "grayscale(100%)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.filter = "grayscale(0%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "grayscale(100%)";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
