import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLanguage, type Language } from "../../common/i18n/LanguageContext";
import { SafeImg } from "../../common/components/SafeImg";

import photo1 from "../../assets/Hero/bicicleta-color.webp?url";
import photo2 from "../../assets/Hero/platillo-comida.webp?url";
import photo3 from "../../assets/Hero/entrada-color.webp?url";
import photo4real from "../../assets/Hero/mujer-color.webp?url";

// LOGOS DE MARCAS
import openfilmsLogo from "../../assets/Logos/openfilms.svg";
import karavanaLogo from "../../assets/Logos/karavana.svg";
import okkoLogo from "../../assets/Logos/okko.svg";
import neroliLogo from "../../assets/Logos/neroli.svg";
import garageLogo from "../../assets/Logos/garage.svg";
import oumaLogo from "../../assets/Logos/download.svg";

import heroJson from "../../common/i18n/hero.json";

const photos = [photo1, photo2, photo3, photo4real];
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
  isFirst: boolean;
};

function HeroPhoto({ src, maskId, isFirst }: HeroPhotoProps) {
  const figureRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    // sólo reaccionar en desktop
    if (window.innerWidth < 1024) return;

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
      {/* Imagen base en escala de grises usando SafeImg */}
      <SafeImg
        src={src}
        alt="Hero"
        loading={isFirst ? "eager" : "lazy"} // sólo la primera es prioritaria
        className="
          h-full w-full
          object-cover object-center
          filter grayscale contrast-[1.25]
          transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
          group-hover:scale-[1.06]
        "
      />

      {/* Máscara de color usando pattern para no duplicar descargas */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* máscara animada */}
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

          {/* pattern que usa la misma imagen */}
          <pattern
            id={`pattern-${maskId}`}
            patternUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <image
              href={src}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              crossOrigin="anonymous"
            />
          </pattern>
        </defs>

        {/* rectángulo que pinta el color respetando la máscara */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#pattern-${maskId})`}
          mask={`url(#${maskId})`}
        />
      </svg>

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

  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [showAllDesktopPhotos, setShowAllDesktopPhotos] = useState(false);

  // ✅ Sólo esperamos a que cargue la PRIMER imagen del hero
  useEffect(() => {
    let mounted = true;
    const first = photos[0];

    const img = new Image();
    img.src = first;

    if (img.complete) {
      if (mounted) setHeroReady(true);
    } else {
      img.onload = () => {
        if (mounted) setHeroReady(true);
      };
      img.onerror = () => {
        if (mounted) setHeroReady(true); // aunque falle, no bloqueamos la UI
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Slider automático mobile
  useEffect(() => {
    if (!heroReady) return;

    const interval = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [heroReady]);

  // Cinta infinita desktop (solo desktop)
  useEffect(() => {
    if (!heroTrackRef.current || !heroReady) return;

    if (window.innerWidth < 1024) {
      // en móvil no corremos GSAP
      return;
    }

    // después de 3s mostramos todas las fotos (las demás se cargan en segundo plano)
    const timeout = setTimeout(() => {
      setShowAllDesktopPhotos(true);
    }, 3000);

    const tween = gsap.fromTo(
      heroTrackRef.current,
      { xPercent: 0 },
      {
        xPercent: -50,
        duration: 45,
        repeat: -1,
        ease: "none",
      }
    );

    heroTweenRef.current = tween;

    return () => {
      clearTimeout(timeout);
      tween.kill();
    };
  }, [heroReady]);

  const handleHeroMouseEnter = () => {
    if (window.innerWidth < 1024) return;
    heroTweenRef.current?.pause();
  };

  const handleHeroMouseLeave = () => {
    if (window.innerWidth < 1024) return;
    heroTweenRef.current?.play();
  };

  // ✅ Mobile: sólo una imagen en pantalla
  const activeMobilePhoto = photos[currentMobileIndex];

  // ✅ Desktop: primeras 4 al inicio, luego todas
  const initialDesktopPhotos = loopPhotos.slice(0, 4);
  const desktopPhotos = showAllDesktopPhotos ? loopPhotos : initialDesktopPhotos;

  return (
    <section className="w-full bg-white text-slate-900">
      {/* COPY DEL HERO */}
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-6 sm:pb-8 md:pt-10 md:pb-16 text-center">
        <p
          className="
            hero-tagline
            whitespace-pre-line
            uppercase
            text-black
            leading-tight
            text-[16px]
            sm:text-[18px]
            md:text-[22px]
            lg:text-[26px]
          "
        >
          “{tagline}”
        </p>
      </div>

      {/* HERO FOTOS MOBILE */}
      <div className="w-full md:hidden">
        <div
          className="
            relative
            w-full
            h-[50vh]
            sm:h-[54vh]
            max-h-[640px]
            overflow-hidden
            bg-black
          "
        >
          <SafeImg
            src={activeMobilePhoto}
            alt={`Hero mobile ${currentMobileIndex + 1}`}
            loading={currentMobileIndex === 0 ? "eager" : "lazy"}
            className="
              h-full w-full
              object-cover object-center
              transition-opacity duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
            "
          />

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentMobileIndex(idx)}
                className={`
                  h-2.5 w-2.5 rounded-full
                  border border-white/60
                  transition-all duration-300
                  ${
                    idx === currentMobileIndex
                      ? "bg-white scale-110"
                      : "bg-white/20"
                  }
                `}
                aria-label={`Ir a la foto ${idx + 1}`}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* HERO FOTOS DESKTOP */}
      <div className="w-full hidden md:block">
        <div
          className={`
            relative
            w-full
            h-[68vh] md:h-[72vh] lg:h-[76vh]
            max-h-[900px]
            overflow-hidden
            bg-black
            ${heroReady ? "opacity-100" : "opacity-0"}
            transition-opacity duration-500
          `}
          onMouseEnter={handleHeroMouseEnter}
          onMouseLeave={handleHeroMouseLeave}
        >
          <div ref={heroTrackRef} className="hero-track flex h-full">
            {desktopPhotos.map((src, idx) => (
              <HeroPhoto
                key={idx}
                src={src}
                maskId={`hero-mask-${idx}`}
                isFirst={idx === 0}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/40 to-transparent" />
        </div>
      </div>

      {/* CARRUSEL DE MARCAS */}
      <div className="w-full bg-black border-t border-neutral-800 py-4 sm:py-5 md:py-6">
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
