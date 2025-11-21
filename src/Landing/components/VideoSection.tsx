import { useRef, useState } from "react";
import { useLanguage, type Language } from "../../common/i18n/LanguageContext";
import videoJson from "../../common/i18n/video.json";

// Ajusta el nombre/ruta si tu archivo se llama distinto
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
      {/* contenedor vertical para que el video pueda crecer */}
      <div className="flex h-full w-full flex-col">
        {/* COPY SUPERIOR */}
        <div className="mx-auto w-full max-w-[1440px] px-8 lg:px-16">
          <div className="mb-12 grid items-start gap-10 md:grid-cols-2">
            {/* TÍTULO – bloque hacia la izquierda, 3 líneas fijas */}
            <div className="flex justify-center md:justify-end">
              <h2
                className="
                  max-w-[652px]
                  font-['Montserrat']
                  font-bold
                  uppercase
                  text-center md:text-right
                  text-[32px] md:text-[28px]
                  leading-[1.3]
                  tracking-[0.18em]
                "
              >
                {titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* DESCRIPCIÓN – centrada y con ancho controlado */}
            <div className="flex justify-center md:justify-start md:pl-8">
              <p
                className="
                  max-w-[540px]
                  font-['Montserrat']
                  text-[18px] md:text-[21px]
                  leading-[1.4]
                  text-center md:text-left
                  whitespace-pre-line
                "
              >
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* VIDEO ocupa el resto de la pantalla */}
        <div className="mt-6 flex-1">
          <div className="mx-auto h-full w-full max-w-[1440px] px-8 lg:px-16">
            <div
              className="
                relative
                h-full
                w-full
                overflow-hidden
                border-t border-neutral-800
                bg-black
              "
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                preload="metadata"
                onEnded={handleEnded}
                onClick={handleVideoClick}   // 👈 click en el video = play/pause
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
        </div>
      </div>
    </section>
  );
}
