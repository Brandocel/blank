// src/Landing/page/Inicio.tsx

import HeroModule from "../components/HeroModule";
import { useLanguage } from "../../common/i18n/LanguageContext";
import FeatureSection from "../components/DifferentiatorsSection";
import BrandSeparatorSection from "../components/BrandSeparatorSection";
import LensSection from "../components/LensSection";
import VideoSection from "../components/VideoSection";
import ContactSection from "../components/ContactSection";
import { useEffect } from "react";

export default function Inicio() {
  useLanguage();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // pequeño delay para asegurar que el DOM esté listo
      }
    }
  }, []);

  return (
    <div className="">
      <section id="inicio">
        <HeroModule />
      </section>
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
    </div>
  );
}
