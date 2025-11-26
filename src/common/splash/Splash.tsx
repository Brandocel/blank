import { useEffect, useState } from "react";
import LogoSvgRaw from "../../assets/Footer/Blank_Logo.svg?raw";

type Props = { onDone?: () => void };

// 🔧 MODO CALIBRACIÓN
const DEV_MODE = false;

// 🎚️ AJUSTES DE LAS FRANJAS (ANCHO)
const BAR_WIDTH_VW = 200; // largo de cada franja (en vw)

// 🎚️ ALTURA INDIVIDUAL
const BAR_THICKNESS_TOP_VH = 10.1;     // grosor franja superior
const BAR_THICKNESS_CENTER_VH = 9; // grosor franja central
const BAR_THICKNESS_BOTTOM_VH = 10;  // grosor franja inferior

// posición vertical (basado en 100% del alto de la pantalla)
const CENTER_OFFSET_VH = -6; // desplaza la franja central respecto a 50vh (+ baja, - sube)
const GAP_TOP_VH = 16;       // distancia desde la franja central hacia ARRIBA
const GAP_BOTTOM_VH = 18.4;      // distancia desde la franja central hacia ABAJO

// ⏱ tiempos
const ZOOM_STRETCH_DURATION = 1800;
const HOLD_AT_MAX = 600;
const LINES_DROP_DURATION = 700;

export default function Splash({ onDone }: Props) {
  const [visible, setVisible] = useState(true);
  const [showLines, setShowLines] = useState(false);
  const [dropLines, setDropLines] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
      `}</style>

      {/* LOGO: zoom + stretch */}
      <div
        className="absolute left-1/2 top-1/2 select-none pointer-events-none"
        style={{
          width: "min(72vw, 660px)",
          transform: "translate(-50%, -50%) scale(1)",
          transformOrigin: "78% 57%", // apunta a la "a"
          filter: "drop-shadow(0 0 10px rgba(255,255,255,.15))",
          animation: `splash-zoom-stretch ${ZOOM_STRETCH_DURATION}ms linear forwards`,
          opacity: DEV_MODE ? 1 : showLines ? 0 : 1,
          transition: DEV_MODE ? "none" : "opacity 200ms ease",
        }}
        dangerouslySetInnerHTML={{ __html: LogoSvgRaw }}
      />

      {/* FRANJAS: el contenedor SIEMPRE usa el 100% de alto (inset-0) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: showLines ? 1 : 0,
          transition: "none",
        }}
      >
        {(() => {
          const centerY = 50 + CENTER_OFFSET_VH; // centro en vh
          const topCenter = centerY - GAP_TOP_VH;
          const bottomCenter = centerY + GAP_BOTTOM_VH;
          const left = 50;

          const baseBarStyle = (
            center: number,
            thicknessVH: number,
            delayMs: number
          ) => ({
            position: "absolute" as const,
            width: `${BAR_WIDTH_VW}vw`,
            left: `${left}%`,
            // colocamos TOP como centro - mitad del grosor
            top: `${center - thicknessVH / 2}vh`,
            height: `${thicknessVH}vh`,
            transform: "translate(-50%, 0)",
            background: DEV_MODE
              ? "rgba(255, 0, 0, 0.45)" // 🔴 rojo transparente en DEV
              : "#fff", // blanco en modo normal
            borderRadius: "999px",
            boxShadow: DEV_MODE
              ? "0 0 0 rgba(0,0,0,0.0)" // sin sombra en dev para ver el borde real
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
                  BAR_THICKNESS_TOP_VH,
                  0
                )}
              />
              {/* barra central */}
              <div
                style={baseBarStyle(
                  centerY,
                  BAR_THICKNESS_CENTER_VH,
                  120
                )}
              />
              {/* barra inferior */}
              <div
                style={baseBarStyle(
                  bottomCenter,
                  BAR_THICKNESS_BOTTOM_VH,
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
