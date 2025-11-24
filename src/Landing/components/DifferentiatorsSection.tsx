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

    const xPercent = (x / width) * 100;
    let transitionMultiplier =
      xPercent < 50 ? ((xPercent - 50) * -1) / 50 : (xPercent - 50) / 50;

    const baseSpeed = 1.4;
    const speed = baseSpeed - (baseSpeed * 0.4) * transitionMultiplier;

    const maxRadius = Math.sqrt(width * width + height * height);

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
            <circle
              ref={circleRef}
              r={0}
              cx={0}
              cy={0}
              fill="white"
              opacity={0}
            />
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
  // por si en algún idioma hay más ítems que imágenes
  const items = (t.items as any[]).slice(0, images.length);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Animación activada SOLO cuando se ve la sección
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-[#141313] py-[8rem]"
    >
      {/* HEADER (título + subtítulo) */}
      <div className="mx-auto w-full max-w-[1440px] px-8 lg:px-16 flex flex-col items-center">
        <h2
          className={`
            font-['Montserrat']
            font-bold
            text-center
            text-[26px] md:text-[30px] lg:text-[34px]
            leading-[1.3]
            tracking-[0.03em]
            transition-all duration-700
            ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
          `}
        >
          {t.title}
        </h2>

        <p
          className={`
            mt-2
            max-w-[720px]
            font-['Montserrat']
            text-[18px] md:text-[20px]
            leading-[1.3]
            text-center
            transition-all duration-700 delay-150
            ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
          `}
        >
          {t.subtitle}
        </p>
      </div>

      {/* CARDS */}
      <div className="mt-10 mx-auto w-full max-w-[1440px] px-8 lg:px-16">
        <div
          className="
            flex
            flex-col
            items-center
            gap-10
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {items.map((item, index) => (
            <div
              key={`${language}-${index}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.9s ease ${0.25 + index * 0.2}s`,
              }}
              className="
                flex
                w-full
                max-w-[573px]
                flex-col
                items-center
                text-center
              "
            >
              <h3
                className="
                  mb-4
                  font-['Montserrat']
                  font-bold
                  text-[14px] md:text-[16px] lg:text-[18px]
                  leading-[1.3]
                  text-center
                  text-[#141313]
                "
              >
                {item.title}
              </h3>

              <RevealMaskImage src={images[index]} alt={item.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
