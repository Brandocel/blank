import { useEffect, useState } from "react";
import LogoSvgRaw from "../../assets/Footer/Blank_Logo.svg?raw";

type Props = { onDone?: () => void };

/* =========================
   🔧 CONFIGURACIÓN SPLASH
   ========================= */

// Modo calibración (barras rojas, sin animaciones de salida)
const DEV_MODE = false;

// 📐 Tamaño del logo
// 👉 Ajusta SOLO estos 4 valores para controlar el tamaño del logo
const LOGO_WIDTH_DESKTOP_VW = 720;      // ancho en vw para desktop
const LOGO_WIDTH_DESKTOP_MAX_PX = 1200; // límite máximo en px para desktop

const LOGO_WIDTH_MOBILE_VW = 55;        // ancho en vw para móvil
const LOGO_WIDTH_MOBILE_MAX_PX = 300;   // límite máximo en px para móvil

// 🎚️ Ajustes de FRANJAS DESKTOP (tal como los tienes ahora)
const BAR_WIDTH_DESKTOP_VW = 200;          // largo de cada franja (en vw)
const BAR_THICKNESS_TOP_DESKTOP_VH = 10.8; // grosor franja superior
const BAR_THICKNESS_CENTER_DESKTOP_VH = 10;// grosor franja central
const BAR_THICKNESS_BOTTOM_DESKTOP_VH = 10;// grosor franja inferior
const CENTER_OFFSET_DESKTOP_VH = 1.8;      // centro respecto a 50vh
const GAP_TOP_DESKTOP_VH = 18;             // distancia del centro hacia ARRIBA
const GAP_BOTTOM_DESKTOP_VH = 20;          // distancia del centro hacia ABAJO

// 🎚️ Ajustes de FRANJAS MOBILE (más delgadas y centradas)
// 👉 Ajusta estos valores si quieres afinarlas más en móvil
const BAR_WIDTH_MOBILE_VW = 200;
const BAR_THICKNESS_TOP_MOBILE_VH = 2.5;
const BAR_THICKNESS_CENTER_MOBILE_VH = 2;
const BAR_THICKNESS_BOTTOM_MOBILE_VH = 2.5;
const CENTER_OFFSET_MOBILE_VH = 0.4;    // 50vh exacto
const GAP_TOP_MOBILE_VH = 3.6;         // menos separación hacia arriba
const GAP_BOTTOM_MOBILE_VH = 4.2;      // menos separación hacia abajo

// ⏱ tiempos
const ZOOM_STRETCH_DURATION = 1800;
const HOLD_AT_MAX = 600;
const LINES_DROP_DURATION = 700;

// 📱 breakpoint para móvil
const MOBILE_BREAKPOINT = 768;

// 🎯 Foco de zoom del logo
const LOGO_TRANSFORM_ORIGIN = "50% 50%";

export default function Splash({ onDone }: Props) {
  const [visible, setVisible] = useState(true);
  const [showLines, setShowLines] = useState(false);
  const [dropLines, setDropLines] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil o desktop
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(
      () => setShowLines(true),
      ZOOM_STRETCH_DURATION - 200
    );

    if (!DEV_MODE) {
      const t2 = setTimeout(
        () => setDropLines(true),
        ZOOM_STRETCH_DURATION + HOLD_AT_MAX
      );

      const t3 = setTimeout(
        () => setFadeOut(true),
        ZOOM_STRETCH_DURATION + HOLD_AT_MAX + LINES_DROP_DURATION - 200
      );

      const t4 = setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, ZOOM_STRETCH_DURATION + HOLD_AT_MAX + LINES_DROP_DURATION + 600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }

    // DEV_MODE: solo zoom + barras estáticas
    return () => {
      clearTimeout(t1);
    };
  }, [onDone]);

  if (!visible) return null;

  // 🔀 Valores derivados según sea desktop o móvil
  const barWidthVW = isMobile ? BAR_WIDTH_MOBILE_VW : BAR_WIDTH_DESKTOP_VW;
  const centerOffsetVH = isMobile
    ? CENTER_OFFSET_MOBILE_VH
    : CENTER_OFFSET_DESKTOP_VH;
  const gapTopVH = isMobile ? GAP_TOP_MOBILE_VH : GAP_TOP_DESKTOP_VH;
  const gapBottomVH = isMobile ? GAP_BOTTOM_MOBILE_VH : GAP_BOTTOM_DESKTOP_VH;

  const barThicknessTopVH = isMobile
    ? BAR_THICKNESS_TOP_MOBILE_VH
    : BAR_THICKNESS_TOP_DESKTOP_VH;
  const barThicknessCenterVH = isMobile
    ? BAR_THICKNESS_CENTER_MOBILE_VH
    : BAR_THICKNESS_CENTER_DESKTOP_VH;
  const barThicknessBottomVH = isMobile
    ? BAR_THICKNESS_BOTTOM_MOBILE_VH
    : BAR_THICKNESS_BOTTOM_DESKTOP_VH;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background: "#000",
        opacity: fadeOut ? 0 : 1,
        transition: DEV_MODE ? "none" : "opacity 600ms ease",
      }}
      aria-hidden
    >
      <style>{`
        @keyframes splash-zoom-stretch {
          0% {
            transform: translate(-50%, -50%) scale(1, 1);
          }
          35% {
            transform: translate(-50%, -50%) scale(3.2, 3.2);
          }
          60% {
            transform: translate(-50%, -50%) scale(6.2, 4.6);
          }
          100% {
            transform: translate(-50%, -50%) scale(12, 4.3);
          }
        }

        /* 👇 siempre respetamos el -50% en X, y solo movemos Y */
        @keyframes splash-line-drop {
          0%   { transform: translate(-50%, 0); }
          100% { transform: translate(-50%, 110vh); }
        }

        /* Hacer que el <svg> se adapte al ancho del contenedor */
        .splash-logo svg {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>

      {/* LOGO: zoom + stretch */}
      <div
        className="splash-logo absolute left-1/2 top-1/2 select-none pointer-events-none"
        style={{
          width: isMobile
            ? `min(${LOGO_WIDTH_MOBILE_VW}vw, ${LOGO_WIDTH_MOBILE_MAX_PX}px)`
            : `min(${LOGO_WIDTH_DESKTOP_VW}vw, ${LOGO_WIDTH_DESKTOP_MAX_PX}px)`,
          transform: "translate(-50%, -50%) scale(1)",
          transformOrigin: LOGO_TRANSFORM_ORIGIN,
          filter: "drop-shadow(0 0 10px rgba(255,255,255,.15))",
          animation: `splash-zoom-stretch ${ZOOM_STRETCH_DURATION}ms linear forwards`,
          opacity: DEV_MODE ? 1 : showLines ? 0 : 1,
          transition: DEV_MODE ? "none" : "opacity 200ms ease",
        }}
        dangerouslySetInnerHTML={{ __html: LogoSvgRaw }}
      />

      {/* FRANJAS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: showLines ? 1 : 0,
          transition: "none",
        }}
      >
        {(() => {
          const centerY = 50 + centerOffsetVH;
          const topCenter = centerY - gapTopVH;
          const bottomCenter = centerY + gapBottomVH;
          const left = 50;

          const baseBarStyle = (
            center: number,
            thicknessVH: number,
            delayMs: number
          ) => ({
            position: "absolute" as const,
            width: `${barWidthVW}vw`,
            left: `${left}%`,
            top: `${center - thicknessVH / 2}vh`,
            height: `${thicknessVH}vh`,
            transform: "translate(-50%, 0)",
            background: DEV_MODE
              ? "rgba(255, 0, 0, 0.45)" // barras rojas en dev
              : "#fff",
            borderRadius: "999px",
            boxShadow: DEV_MODE
              ? "0 0 0 rgba(0,0,0,0.0)"
              : "0 0 12px rgba(0,0,0,0.6)",
            animation:
              !DEV_MODE && dropLines
                ? `splash-line-drop ${LINES_DROP_DURATION}ms cubic-bezier(.3,.7,0,1) ${delayMs}ms forwards`
                : "none",
          });

          return (
            <>
              {/* barra superior */}
              <div
                style={baseBarStyle(
                  topCenter,
                  barThicknessTopVH,
                  0
                )}
              />
              {/* barra central */}
              <div
                style={baseBarStyle(
                  centerY,
                  barThicknessCenterVH,
                  120
                )}
              />
              {/* barra inferior */}
              <div
                style={baseBarStyle(
                  bottomCenter,
                  barThicknessBottomVH,
                  240
                )}
              />
            </>
          );
        })()}
      </div>
    </div>
  );
}
