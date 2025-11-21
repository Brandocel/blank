import React, { useRef, useEffect } from "react";
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
// Duplicamos para cinta infinita
const loopPhotos = [...photos, ...photos];

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
  maskId: string;
};

function HeroPhoto({ src, maskId }: HeroPhotoProps) {
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
        basis-1/4
        shrink-0
        grow-0
        overflow-hidden
        will-change-transform
      "
    >
      {/* Capa base en blanco y negro */}
      <img
        src={src}
        alt="Hero"
        className="
          h-full w-full
          object-cover object-center
          filter grayscale contrast-[1.25]
          transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
          group-hover:scale-[1.06]   /* zoom suave en la imagen */
        "
      />

      {/* Capa en color dentro de un SVG con máscara circular */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id={maskId}>
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
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* Overlay suave */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-black/20
          transition-opacity duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
          group-hover:opacity-0
        "
      />
    </figure>
  );
}

export default function HeroModule() {
  const { language } = useLanguage();
  const { tagline } = heroDictionary[language];

  const heroTrackRef = useRef<HTMLDivElement | null>(null);
  const heroTweenRef = useRef<gsap.core.Tween | null>(null);

  // Animación automática del hero (cinta infinita, suave, en contra de los logos)
  useEffect(() => {
    if (!heroTrackRef.current) return;

    const tween = gsap.fromTo(
      heroTrackRef.current,
      { xPercent: 0 },
      {
        // Logos se mueven a la derecha, hero hacia la izquierda
        xPercent: -50,
        duration: 45,
        repeat: -1,
        ease: "none",
      }
    );

    heroTweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  const handleHeroMouseEnter = () => {
    heroTweenRef.current?.pause();
  };

  const handleHeroMouseLeave = () => {
    heroTweenRef.current?.play();
  };

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
            relative
            w-full
            h-[68vh] md:h-[72vh] lg:h-[76vh]
            max-h-[900px]
            overflow-hidden
            bg-black
          "
          onMouseEnter={handleHeroMouseEnter}
          onMouseLeave={handleHeroMouseLeave}
        >
          {/* Track que se mueve */}
          <div ref={heroTrackRef} className="hero-track flex h-full">
            {loopPhotos.map((src, idx) => (
              <HeroPhoto key={idx} src={src} maskId={`hero-mask-${idx}`} />
            ))}
          </div>

          {/* Degradados fijos en los extremos */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/40 to-transparent" />
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
