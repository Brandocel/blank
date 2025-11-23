import { useLanguage } from "../../common/i18n/LanguageContext";
import lensJson from "../../common/i18n/lens.json";
import { useEffect, useRef, useState } from "react";

// Swiper SOLO para mobile
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

// ⭐ Videos
import clip1 from "../../assets/Lens/BLANK 02.mov";
import clip2 from "../../assets/Lens/BLANK 0202.mov";
import clip3 from "../../assets/Lens/Blank 0101.mov";
import clip4 from "../../assets/Lens/Blank 4.mp4";

export default function LensSection() {
  const { language } = useLanguage();
  const t = lensJson[language];
  const videos = [clip1, clip2, clip3, clip4];
  const [clicked, setClicked] = useState<boolean[]>([false, false, false, false]);


  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil
useEffect(() => {
  const ua = navigator.userAgent.toLowerCase();
  const isMobileDevice =
    /iphone|ipad|android|mobile|touch|tablet/.test(ua) ||
    window.innerWidth <= 768;

  setIsMobile(isMobileDevice);
}, []);


  // Animación título/sub
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
      {/* TITLE */}
      <h2
        style={{
          fontFamily: "Montserrat",
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

      {/* SUBTITLE */}
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: 400,
          fontSize: "clamp(18px, 1.7vw, 32px)",
          textAlign: "center",
          marginBottom: "clamp(20px, 3vw, 70px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.15s",
        }}
      >
        {t.subtitle}
      </p>

      {/* ========================================== */}
      {/*               MOBILE VERSION              */}
      {/* ========================================== */}
      {isMobile && (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          style={{
            width: "100%",
            maxWidth: "420px",
            margin: "0 auto",
          }}
          onSlideChange={(swiper) => {
  const videos = swiper.slides.map(s => s.querySelector("video"));
  videos.forEach((v) => v && v.pause());
}}

        >
          {t.items.map((item, index) => (
            <SwiperSlide key={item.title}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* VIDEO — mobile ajustado */}
<div style={{ position: "relative" }}>
  {/* OVERLAY — aparece antes de darle clic */}
  {!clicked[index] && (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 5,
        color: "#fff",
        textShadow: "0px 2px 8px rgba(0,0,0,0.5)",
        animation: "pulse 1.8s infinite",
      }}
    >
      <div
        style={{
          fontSize: "52px",
          opacity: 0.9,
        }}
      >
        ▶
      </div>
      <p
        style={{
          fontSize: "14px",
          marginTop: "6px",
          fontWeight: 500,
        }}
      >
        Toca para reproducir
      </p>
    </div>
  )}

  {/* VIDEO MOBILE */}
  <video
    src={videos[index]}
    muted
    playsInline
    preload="metadata"
    disablePictureInPicture
    controlsList="nodownload nofullscreen noremoteplayback"
    style={{
      width: "90vw",
      maxWidth: "360px",
      height: "65vh",
      maxHeight: "480px",
      objectFit: "cover",
      borderRadius: "8px",
      display: "block",
      margin: "0 auto",
    }}
    onClick={(e) => {
      const video = e.currentTarget;
      video.currentTime = video.currentTime; // iOS fix
      video.play();

      // ocultar overlay solo para ese video
      setClicked((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
    }}
  />
</div>


                {/* TITLE */}
                <h3
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: "18px",
                    marginTop: "14px",
                    marginBottom: "18px",
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* ========================================== */}
      {/*               DESKTOP VERSION              */}
      {/* ========================================== */}
      {!isMobile && (
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ transformOrigin: "top center", width: "fit-content" }}>
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
                  <h3
                    style={{
                      fontFamily: "Montserrat",
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

                  <video
                    src={videos[index]}
                    muted
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    style={{
                      width: "100%",
                      aspectRatio: "385.62 / 685.7",
                      objectFit: "cover",
                      display: "block",
                      transition: "all 0.4s ease",
                      maxHeight: "55vh",
                      filter: "grayscale(100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.play();
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.filter = "grayscale(0%)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "grayscale(100%)";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
