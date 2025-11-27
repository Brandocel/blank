import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import LogoSvgRaw from "../../assets/Footer/Blank_Logo.svg?raw";

type Props = { onDone?: () => void };

/* =========================
   🔧 CONFIGURACIÓN SPLASH
   ========================= */

// Modo calibración (barras rojas, sin animaciones de salida)
const DEV_MODE = false;

// 📐 Tamaño del logo
// 👉 Ajusta SOLO estos 4 valores para controlar el tamaño del logo
const LOGO_WIDTH_DESKTOP_VW = 360;      // ancho en vw para desktop
const LOGO_WIDTH_DESKTOP_MAX_PX = 600; // límite máximo en px para desktop

const LOGO_WIDTH_MOBILE_VW = 27.5;        // ancho en vw para móvil
const LOGO_WIDTH_MOBILE_MAX_PX = 150;   // límite máximo en px para móvil

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
const LOGO_DELAY = 650;
const ZOOM_STRETCH_DURATION = 1200;
const HOLD_AT_MAX = 0; // Set to 0 so explosion happens immediately after zoom completes
const LINES_DROP_DURATION = 450;

// 📱 breakpoint para móvil
const MOBILE_BREAKPOINT = 768;

// 🎯 Foco de zoom del logo
const LOGO_TRANSFORM_ORIGIN = "50% 50%";

export default function Splash({ onDone }: Props) {
  const [visible, setVisible] = useState(true);
  const [showLines, setShowLines] = useState(false);
  const [dropLines, setDropLines] = useState(false);
  const [explodePieces, setExplodePieces] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [slicesMove, setSlicesMove] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const useGlow = !isMobile && !prefersReducedMotion;

  // Detectar si estamos en móvil o desktop
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    // detecta preferencia de usuario para reducir movimiento
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMQ = (e: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(!!("matches" in e ? e.matches : (e as MediaQueryList).matches));
    };
    onMQ(mq);
    mq.addEventListener?.("change", onMQ as any);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      mq.removeEventListener?.("change", onMQ as any);
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(
      () => setShowLines(true),
      LOGO_DELAY + ZOOM_STRETCH_DURATION + 450
    );

    if (!DEV_MODE) {
      const t2 = setTimeout(
        () => setDropLines(true),
        LOGO_DELAY + ZOOM_STRETCH_DURATION + HOLD_AT_MAX
      );

      const t3 = setTimeout(
        () => {
          setExplodePieces(true);
          // tras el crossfade, iniciar desplazamiento de slices
          setTimeout(() => setSlicesMove(true), 260);
        },
        LOGO_DELAY + ZOOM_STRETCH_DURATION + HOLD_AT_MAX
      );

      const t4 = setTimeout(
        () => setFadeOut(true),
        LOGO_DELAY + ZOOM_STRETCH_DURATION + HOLD_AT_MAX + LINES_DROP_DURATION + 200
      );

      const t5 = setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, LOGO_DELAY + ZOOM_STRETCH_DURATION + HOLD_AT_MAX + LINES_DROP_DURATION + 600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
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
          100% {
            transform: translate(-50%, -50%) scale(24, 8.6);
          }
        }

        /* 👇 siempre respetamos el -50% en X, y solo movemos Y */
        @keyframes splash-line-drop {
          0%   { transform: translate(-50%, 0); }
          100% { transform: translate(-50%, 110vh); }
        }

        /* Piezas: movimiento hacia arriba/abajo y desvanecer */
        @keyframes splash-piece-up {
          0% { transform: translate(-50%, 0); opacity: 1; }
          50% { opacity: .85; }
          100% { transform: translate(-50%, -120vh); opacity: 0; }
        }
        @keyframes splash-piece-down {
          0% { transform: translate(-50%, 0); opacity: 1; }
          50% { opacity: .85; }
          100% { transform: translate(-50%, 120vh); opacity: 0; }
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
          animation: `splash-zoom-stretch ${ZOOM_STRETCH_DURATION}ms cubic-bezier(0.7, 0, 0.84, 0) 800ms forwards`,
          opacity: DEV_MODE ? 1 : showLines ? 0 : 1,
          transition: DEV_MODE ? "none" : "opacity 200ms ease",
        }}
        dangerouslySetInnerHTML={{ __html: LogoSvgRaw }}
      />

      {/* FRANJAS / PIEZAS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: showLines ? 1 : 0,
          transition: "none",
          contain: "paint",
        }}
      >
        {(() => {
          const centerY = 50 + centerOffsetVH;
          const topCenter = centerY - gapTopVH;
          const bottomCenter = centerY + gapBottomVH;
          const left = 50;

          // Paleta en escala de grises
          const palette = [
            "#ffffff",
            "#f0f0f0",
            "#e0e0e0",
            "#d0d0d0",
            "#c0c0c0",
            "#b0b0b0",
            "#a0a0a0",
            "#909090",
            "#808080",
            "#707070",
            "#606060",
            "#505050",
          ];

          // Slices horizontales: mismo ancho que la franja, dividimos su grosor en secciones
          const makeSlices = (
            center: number,
            thicknessVH: number,
            count: number
          ) => {
            const slices: ReactElement[] = [];
            const sliceHeightVH = thicknessVH / count;
            for (let i = 0; i < count; i++) {
              const yOffsetVH = -thicknessVH / 2 + i * sliceHeightVH;
              const color = palette[Math.floor(Math.random() * palette.length)];
              const dirUp = Math.random() < 0.5;
              const dur = prefersReducedMotion ? 800 : 1400 + Math.floor(Math.random() * 1000); // un poco más corto pero suave
              const delay = prefersReducedMotion ? 0 : Math.floor(Math.random() * 300);
              const blur = DEV_MODE ? 0 : (useGlow ? (prefersReducedMotion ? 2 : 4 + Math.floor(Math.random() * 5)) : 0);
              slices.push(
                <div
                  key={`s-${center}-${i}`}
                  style={{
                    position: "absolute",
                    left: `${left}%`,
                    top: `${center + yOffsetVH}vh`,
                    width: `${barWidthVW}vw`,
                    height: `${sliceHeightVH}vh`,
                    transform: "translate3d(-50%, 0, 0)",
                    background: DEV_MODE ? "rgba(255,0,0,0.45)" : color,
                    boxShadow: DEV_MODE || !useGlow
                      ? "none"
                      : `0 0 ${blur}px ${color}, 0 0 ${blur * 2}px ${color}55, 0 2px 6px rgba(0,0,0,0.28)`,
                    borderRadius: "999px",
                    opacity: 1,
                    willChange: slicesMove ? "transform, opacity" : undefined,
                    animation: explodePieces && slicesMove
                      ? `${dirUp ? "splash-piece-up" : "splash-piece-down"} ${dur}ms cubic-bezier(.22,.61,.36,1) ${delay}ms forwards`
                      : "none",
                  }}
                />
              );
            }
            return slices;
          };

          return (
            <>
              {/* superior: crossfade de barra a slices */}
              {/* slices siempre presentes con fade-in */}
              {makeSlices(topCenter, barThicknessTopVH, isMobile ? 10 : 16).map((el, idx) => (
                <div key={`top-swrap-${idx}`} style={{ position: "absolute", opacity: explodePieces ? 1 : 0, transition: "opacity 260ms ease" }}>
                  {el}
                </div>
              ))}
              {/* barra con fade-out cuando explodePieces */}
              <div
                style={{
                  position: "absolute",
                  width: `${barWidthVW}vw`,
                  left: `${left}%`,
                  top: `${topCenter - barThicknessTopVH / 2}vh`,
                  height: `${barThicknessTopVH}vh`,
                  transform: "translate(-50%, 0)",
                  background: DEV_MODE ? "rgba(255, 0, 0, 0.45)" : "#fff",
                  borderRadius: "999px",
                  boxShadow: DEV_MODE ? "none" : "0 0 12px rgba(0,0,0,0.6)",
                  opacity: explodePieces ? 0 : 1,
                  transition: "opacity 260ms ease",
                  animation:
                    !DEV_MODE && dropLines && !explodePieces
                      ? `splash-line-drop ${LINES_DROP_DURATION}ms cubic-bezier(.3,.7,0,1) 0ms forwards`
                      : "none",
                }}
              />

              {/* central: crossfade de barra a slices */}
              {makeSlices(centerY, barThicknessCenterVH, isMobile ? 12 : 18).map((el, idx) => (
                <div key={`mid-swrap-${idx}`} style={{ position: "absolute", opacity: explodePieces ? 1 : 0, transition: "opacity 260ms ease" }}>
                  {el}
                </div>
              ))}
              <div
                style={{
                  position: "absolute",
                  width: `${barWidthVW}vw`,
                  left: `${left}%`,
                  top: `${centerY - barThicknessCenterVH / 2}vh`,
                  height: `${barThicknessCenterVH}vh`,
                  transform: "translate(-50%, 0)",
                  background: DEV_MODE ? "rgba(255, 0, 0, 0.45)" : "#fff",
                  borderRadius: "999px",
                  boxShadow: DEV_MODE ? "none" : "0 0 12px rgba(0,0,0,0.6)",
                  opacity: explodePieces ? 0 : 1,
                  transition: "opacity 260ms ease",
                  animation:
                    !DEV_MODE && dropLines && !explodePieces
                      ? `splash-line-drop ${LINES_DROP_DURATION}ms cubic-bezier(.3,.7,0,1) 120ms forwards`
                      : "none",
                }}
              />

              {/* inferior: crossfade de barra a slices */}
              {makeSlices(bottomCenter, barThicknessBottomVH, isMobile ? 10 : 16).map((el, idx) => (
                <div key={`bot-swrap-${idx}`} style={{ position: "absolute", opacity: explodePieces ? 1 : 0, transition: "opacity 260ms ease" }}>
                  {el}
                </div>
              ))}
              <div
                style={{
                  position: "absolute",
                  width: `${barWidthVW}vw`,
                  left: `${left}%`,
                  top: `${bottomCenter - barThicknessBottomVH / 2}vh`,
                  height: `${barThicknessBottomVH}vh`,
                  transform: "translate(-50%, 0)",
                  background: DEV_MODE ? "rgba(255, 0, 0, 0.45)" : "#fff",
                  borderRadius: "999px",
                  boxShadow: DEV_MODE ? "none" : "0 0 12px rgba(0,0,0,0.6)",
                  opacity: explodePieces ? 0 : 1,
                  transition: "opacity 260ms ease",
                  animation:
                    !DEV_MODE && dropLines && !explodePieces
                      ? `splash-line-drop ${LINES_DROP_DURATION}ms cubic-bezier(.3,.7,0,1) 240ms forwards`
                      : "none",
                }}
              />
            </>
          );
        })()}
      </div>
    </div>
  );
}
