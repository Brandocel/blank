import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../common/i18n/LanguageContext";
import lensJson from "../../common/i18n/lens.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/pagination";

import clip1 from "../../assets/Lens/BLANK 02.mov";
import clip2 from "../../assets/Lens/BLANK 0202.mov";
import clip3 from "../../assets/Lens/Blank 0101.mov";
import clip4 from "../../assets/Lens/Blank 4.mp4";

export default function LensSection() {
  const { language } = useLanguage();
  const t = lensJson[language];

  const videos = [clip1, clip2, clip3, clip4];

  // Usamos solo tantos items como videos tengamos
  const items = (t.items as any[]).slice(0, videos.length);

  // Overlay “toca para reproducir” en mobile
  const [clicked, setClicked] = useState<boolean[]>(
    new Array(videos.length).fill(false)
  );

  // Cuando cambia el idioma, reseteamos los “clicked”
  useEffect(() => {
    setClicked(new Array(videos.length).fill(false));
  }, [language]);

  // Animación al entrar en viewport
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-[#141313] py-[8rem]"
    >
      <div className="flex w-full flex-col">
        {/* ====================== HEADER ====================== */}
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-16">
          <div className="flex flex-col items-center">
            {/* TITLE */}
            <h2
              className={`
                font-['Montserrat']
                font-bold
                text-center
                uppercase
                text-[20px] md:text-[22px] lg:text-[24px]
                leading-[1.3]
                tracking-normal
                transition-all duration-700
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
            >
              {t.title}
            </h2>

            {/* SUBTITLE */}
            <p
              className={`
                mt-1
                max-w-[720px]
                font-['Montserrat']
                text-[16px] md:text-[18px]
                leading-[1.3]
                text-center
                transition-all duration-700 delay-150
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
            >
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* ===================== MOBILE (SWIPER) ===================== */}
        <div className="mt-6 block md:hidden">
          <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-16">
            <Swiper
              key={language}                 // 👈 fuerza a recrear Swiper al cambiar idioma
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
                const vs = swiper.slides.map((s) =>
                  s.querySelector("video")
                ) as (HTMLVideoElement | null)[];
                vs.forEach((v, i) => {
                  if (!v) return;
                  if (i === swiper.activeIndex) return;
                  v.pause();
                });
              }}
            >
              {items.map((item, index) => (
                <SwiperSlide key={`${language}-${index}`}>
                  <div className="flex flex-col items-center text-center">
                    {/* VIDEO MOBILE – clic para play/pause, en loop */}
                    <div className="relative w-[90vw] max-w-[360px] h-[75vh] max-h-[560px] overflow-hidden">
                      {!clicked[index] && (
                        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] animate-pulse">
                          <div className="text-[52px] opacity-90">▶</div>
                          <p className="mt-2 text-[14px] font-medium">
                            Toca para reproducir
                          </p>
                        </div>
                      )}

                      <video
                        src={videos[index]}
                        muted
                        playsInline
                        preload="metadata"
                        loop
                        disablePictureInPicture
                        controlsList="nodownload nofullscreen noremoteplayback"
                        className="h-full w-full object-cover"
                        onClick={(e) => {
                          const video = e.currentTarget;

                          if (video.paused) {
                            video.play();
                          } else {
                            video.pause();
                          }

                          setClicked((prev) => {
                            if (prev[index]) return prev;
                            const updated = [...prev];
                            updated[index] = true;
                            return updated;
                          });
                        }}
                      />
                    </div>

                    {/* TITLE MOBILE ABAJO DEL VIDEO */}
                    <h3
                      className="
                        mt-4 mb-5
                        font-['Montserrat']
                        text-[14px]
                        md:text-[16px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                      "
                    >
                      {item.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ===================== DESKTOP / TABLET ===================== */}
        <div className="mt-12 hidden md:block">
          <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-16">
            <div className="grid w-full grid-cols-4 gap-6 lg:gap-10">
              {items.map((item, index) => (
                <div
                  key={`${language}-${index}`}
                  className={`
                    flex flex-col items-center text-center
                    w-full
                    transition-all duration-700
                    ${
                      visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }
                  `}
                  style={{
                    transitionDelay: `${250 + index * 200}ms`,
                  }}
                >
                  <h3
                    className="
                      mb-3
                      font-['Montserrat']
                      text-[16px] md:text-[18px] lg:text-[20px]
                      font-bold
                      leading-[1.3]
                      whitespace-pre-line
                      text-black
                    "
                  >
                    {item.title}
                  </h3>

                  <video
                    src={videos[index]}
                    muted
                    playsInline
                    preload="metadata"
                    loop
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    className="
                      w-full
                      max-h-[50vh]
                      aspect-[9/16]
                      object-cover
                      transition-all duration-300
                      grayscale
                    "
                    onMouseEnter={(e) => {
                      const v = e.currentTarget;
                      v.play();
                      v.style.transform = "scale(1.05)";
                      v.style.filter = "grayscale(0%)";
                    }}
                    onMouseLeave={(e) => {
                      const v = e.currentTarget;
                      v.pause();
                      v.style.transform = "scale(1)";
                      v.style.filter = "grayscale(100%)";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
