import { useEffect, useRef, useState } from "react";
import splashVideo from "../../assets/splash.mp4";

type Props = { onDone?: () => void };

const VIDEO_TIMEOUT_MS = 7000;

export default function Splash({ onDone }: Props) {
  return <VideoSplash onDone={onDone} />;
}

function VideoSplash({ onDone }: Props) {
  const [done, setDone] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setDone(true);
    onDone?.();
  };

  // ⏳ Timeout de seguridad por si el onEnded no dispara
  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(finish, VIDEO_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [done]);

  // 🚀 Pre-carga del video + reproducir en cuanto esté listo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      if (!isReady) {
        setIsReady(true);
      }

      // Intentar reproducir cuando el navegador ya tiene suficiente buffer
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Si el autoplay se bloquea, no rompemos nada
        });
      }
    };

    const handleError = () => {
      // Si algo falla, no bloqueamos la app
      setIsReady(true);
    };

    // Pedimos que lo precargue,
    // y forzamos el inicio de la descarga.
    video.preload = "auto";
    video.addEventListener("canplaythrough", handleReady);
    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("error", handleError);
    video.load();

    return () => {
      video.removeEventListener("canplaythrough", handleReady);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("error", handleError);
    };
  }, [isReady]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <video
        ref={videoRef}
        // lo lanzamos por JS cuando está listo
        muted
        playsInline
        preload="auto"
        className={`splash-video max-w-full max-h-full object-contain pointer-events-none transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        onEnded={finish}
        controls={false}
        aria-hidden
        style={{
          backfaceVisibility: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <source src={splashVideo} type="video/mp4" />
      </video>
    </div>
  );
}
