import { useLanguage } from "../../common/i18n/LanguageContext";
import brandSeparatorJson from "../../common/i18n/brandSeparator.json";

export default function BrandSeparatorSection() {
  const { language } = useLanguage();
  const t = brandSeparatorJson[language];

  return (
    <section
      style={{
        width: "100%",
        background: "#141313",
        color: "#FBFBFB",

        /* Altura exacta de Figma, pero adaptable */
        minHeight: "clamp(120px, 14vw, 193px)",

        display: "flex",                                                                                                                                                                                                                                                                                                                                           
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        padding: "clamp(20px, 4vw, 40px) 0",
        textAlign: "center"
      }}
    >
      {/* TÍTULO 40px → escalable */}
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(22px, 2.4vw, 40px)",
          lineHeight: "130%",
          marginBottom: "clamp(6px, 1vw, 14px)",
          letterSpacing: "0.5px"
        }}
      >
        {t.title}
      </h2>

      {/* SUBTÍTULO 32px → escalable */}
      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(16px, 1.8vw, 32px)",
          lineHeight: "130%",
          color: "#FBFBFB",
          maxWidth: "600px"
        }}
      >
        {t.subtitle}
      </p>
    </section>
  );
}
