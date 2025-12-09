// src/Landing/page/Inicio.tsx
import React, { useEffect, Suspense } from "react";
import HeroModule from "../components/HeroModule";
import { useLanguage } from "../../common/i18n/LanguageContext";

// Lazy sections
const FeatureSection = React.lazy(
  () => import("../components/DifferentiatorsSection")
);
const BrandSeparatorSection = React.lazy(
  () => import("../components/BrandSeparatorSection")
);
const LensSection = React.lazy(() => import("../components/LensSection"));
const VideoSection = React.lazy(() => import("../components/VideoSection"));
const ContactSection = React.lazy(() => import("../components/ContactSection"));

function LazyBelowTheFold() {
  return (
    <Suspense fallback={null}>
      <section id="nosotros">
        <FeatureSection />
        <BrandSeparatorSection />
        <LensSection />
      </section>

      <section id="videos">
        <VideoSection />
      </section>

      <section id="contacto">
        <ContactSection />
      </section>
    </Suspense>
  );
}

export default function Inicio() {
  useLanguage();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* 🟢 Above the fold: solo el héroe */}
      <section id="inicio">
        <HeroModule />
      </section>

      {/* 🟡 Below the fold: secciones que se cargan después */}
      <LazyBelowTheFold />
    </div>
  );
}
