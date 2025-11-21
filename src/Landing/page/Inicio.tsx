// src/Landing/page/Inicio.tsx
import HeroModule from "../components/HeroModule";
import { useLanguage } from "../../common/i18n/LanguageContext";
import FeatureSection from "../components/DifferentiatorsSection";
import BrandSeparatorSection from "../components/BrandSeparatorSection";
import LensSection from "../components/LensSection";
import VideoSection from "../components/VideoSection";
import ContactSection from "../components/ContactSection";

export default function Inicio() {
  useLanguage();




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
