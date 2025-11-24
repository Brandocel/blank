import { useRef, useState } from "react";
import { useLanguage, type Language } from "../../common/i18n/LanguageContext";
import videoJson from "../../common/i18n/video.json";
import weddingVideo from "../../assets/Video/¿Qué nos hace humanos_.mp4";

type VideoCopy = {
  titleLines: string[];
  description: string;
};

const videoCopy = videoJson as Record<Language, VideoCopy>;

export default function VideoSection() {
  const { language } = useLanguage();
  const { titleLines, description } = videoCopy[language];

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isEnglish = language === "en";

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    videoRef.current.muted = false;
    setIsPlaying(true);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      videoRef.current.muted = false;
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#141313] text-white py-[8rem]">
      {/* CONTENEDOR GENERAL */}
      <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 md:px-8 lg:px-16">
        {/* =================== COPY SUPERIOR (TÍTULO) =================== */}
        <div
          className="
            mb-8
            grid
            md:mb-10
            md:grid-cols-2
            md:items-center
          "
        >
          {/* TÍTULO */}
          <div className="flex justify-center md:justify-end">
            <h2
              className={`
                max-w-[652px]
                font-['Montserrat']
                font-bold
                uppercase
                text-center md:text-right
                ${
                  isEnglish
                    ? "text-[24px] md:text-[28px] lg:text-[30px]"
                    : "text-[28px] md:text-[30px] lg:text-[32px]"
                }
                leading-[1.2]
                ${isEnglish ? "tracking-[0.16em]" : "tracking-[0.20em]"}
              `}
            >
              {titleLines.map((line, index) => (
                <span key={`${language}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* DESCRIPCIÓN SOLO DESKTOP/TABLET (arriba del video) */}
          <div className="hidden md:flex md:justify-start md:pl-4">
            {isEnglish ? (
              <p
                className="
                  max-w-[540px]
                  font-['Montserrat']
                  text-[18px] md:text-[20px] lg:text-[22px]
                  leading-[1.4]
                  text-left
                "
              >
                {description.replace(/\n/g, " ")}
              </p>
            ) : (
              <p
                className="
                  max-w-[540px]
                  font-['Montserrat']
                  text-[16px] md:text-[18px] lg:text-[20px]
                  leading-[1.2]
                  text-left
                  whitespace-pre-line
                "
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* =================== VIDEO =================== */}
        <div className="flex-1">
          <div
            className="
              relative
              w-full
              overflow-hidden
              border-t border-neutral-800
              bg-black
              aspect-[9/12] md:aspect-[16/9]
            "
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              preload="metadata"
              onEnded={handleEnded}
              onClick={handleVideoClick}
            >
              <source src={weddingVideo} type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>

            {/* Overlay + botón play cuando no está reproduciendo */}
            {!isPlaying && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-black/35" />
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <span
                    className="
                      relative inline-flex h-16 w-16 items-center justify-center
                      rounded-full
                      border border-white/80
                      bg-white/5
                      backdrop-blur-sm
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  >
                    <span
                      className="
                        ml-1 inline-block
                        border-l-[18px] border-l-white
                        border-y-[10px] border-y-transparent
                      "
                    />
                  </span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* =================== DESCRIPCIÓN MOBILE (debajo del video) =================== */}
        <div className="mt-6 md:hidden">
          {isEnglish ? (
            <p
              className="
                mx-auto
                max-w-[540px]
                text-center
                font-['Montserrat']
                text-[16px]
                leading-[1.4]
              "
            >
              {description.replace(/\n/g, " ")}
            </p>
          ) : (
            <p
              className="
                mx-auto
                max-w-[540px]
                text-center
                font-['Montserrat']
                text-[16px]
                leading-[1.3]
                whitespace-pre-line
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
