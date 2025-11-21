import React, { useRef } from "react";
import { gsap } from "gsap";
import { useLanguage, type Language } from "../../common/i18n/LanguageContext";

import photo1 from "../../assets/Hero/BicicletaColor.png";
import photo2 from "../../assets/Hero/PlatiloComida.png";
import photo3 from "../../assets/Hero/EntradaColor.jpg";
import photo4real from "../../assets/Hero/MuejerColor.jpg";

// LOGOS DE MARCAS
import openfilmsLogo from "../../assets/Logos/openfilms.svg";
import karavanaLogo from "../../assets/Logos/karavana.svg";
import okkoLogo from "../../assets/Logos/okko.svg";
import neroliLogo from "../../assets/Logos/neroli.svg";
import garageLogo from "../../assets/Logos/garage.svg";
import oumaLogo from "../../assets/Logos/download.svg";

import heroJson from "../../common/i18n/hero.json";

const photos = [photo1, photo2, photo3, photo4real];

type BrandLogo = {
  src: string;
  alt: string;
};

const brandLogos: BrandLogo[] = [
  { src: openfilmsLogo, alt: "Openfilms" },
  { src: karavanaLogo, alt: "Karavana" },
  { src: okkoLogo, alt: "OKKO" },
  { src: neroliLogo, alt: "Neroli" },
  { src: garageLogo, alt: "Garage" },
  { src: oumaLogo, alt: "Ouma" },
];

type HeroCopy = {
  tagline: string;
  clients: string[];
};

const heroDictionary = heroJson as Record<Language, HeroCopy>;

type HeroPhotoProps = {
  src: string;
  index: number;
};

function HeroPhoto({ src, index }: HeroPhotoProps) {
  const figureRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!figureRef.current || !circleRef.current) return;

    const rect = figureRef.current.getBoundingClientRect();
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
      attr: {
        r: 0,
        cx: x,
        cy: y,
      },
    });

    gsap.to(circleRef.current, {
      duration: speed,
      ease: "power2.out",
      attr: {
        r: maxRadius,
      },
    });
  };

  const handleMouseLeave = () => {
    if (!circleRef.current) return;

    gsap.killTweensOf(circleRef.current);

    gsap.to(circleRef.current, {
      duration: 0.6,
      ease: "power2.inOut",
      attr: { r: 0 },
      opacity: 0,
    });
  };

  return (
    <figure
      ref={figureRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        hero-figure
        group
        relative
        h-full
        flex-1
        overflow-hidden
        transition-[flex] duration-500 ease-out
        hover:flex-[1.5]
        md:hover:flex-[1.7]
      "
    >
      {/* Capa base en blanco y negro */}
      <img
        src={src}
        alt={`Hero ${index + 1}`}
        className="
          h-full w-full
          object-cover object-center   /* centrado: recorta arriba y abajo por igual */
          filter grayscale contrast-[1.25]
        "
      />

      {/* Capa en color dentro de un SVG con máscara circular */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"  /* centrado también en el SVG */
      >
        <defs>
          <mask id={`hero-mask-${index}`}>
            <rect width="100%" height="100%" fill="black" />
            <circle
              ref={circleRef}
              className="mask-circle"
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
          preserveAspectRatio="xMidYMid slice"  /* mismo centrado que la capa base */
          mask={`url(#hero-mask-${index})`}
        />
      </svg>

      {/* Overlay suave */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-black/20
          transition-opacity duration-700
          group-hover:opacity-0
        "
      />

      {/* Degradados extremos */}
      {index === 0 && (
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-r from-black via-black/10 to-black/0
          "
        />
      )}
      {index === photos.length - 1 && (
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-l from-black via-black/10 to-black/0
          "
        />
      )}
    </figure>
  );
}

export default function HeroModule() {
  const { language } = useLanguage();
  const { tagline } = heroDictionary[language];

  return (
    <section className="w-full bg-white text-slate-900">
      {/* COPY DEL HERO */}
      <div className="mx-auto max-w-6xl px-4 pt-30 pb-20 text-center">
        <p
          className="
            hero-tagline
            whitespace-pre-line
            uppercase
            text-black
          "
        >
          “{tagline}”
        </p>
      </div>

      {/* HERO FOTOS */}
      <div className="w-full">
        <div
          className="
            w-full
            h-[68vh] md:h-[72vh] lg:h-[76vh]
            max-h-[900px]
            overflow-hidden
            bg-black
          "
        >
          <div className="flex w-full h-full">
            {photos.map((src, idx) => (
              <HeroPhoto key={idx} src={src} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* CARRUSEL DE MARCAS */}
      <div className="w-full bg-black border-t border-neutral-800 py-6 sm:py-8">
        <div className="brands-slider">
          <div className="brands-track">
            {[...brandLogos, ...brandLogos].map((brand, idx) => (
              <div key={`${brand.alt}-${idx}`} className="brands-slide">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="brands-logo-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
