import { useEffect, useState, useRef } from "react";
import LogoSvgRaw from "../../assets/Footer/Blank_Logo.svg?raw";

type Props = { delayMs?: number; onDone?: () => void };

// Splash con animación de encuadre 100% React + responsive con Tailwind
export default function Splash({ onDone }: Props) {
  const [lineStep, setLineStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showRec, setShowRec] = useState(false);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"frame" | "logo" | "done">("frame");

  // Tamaños base del frame (solo para el viewBox)
  const frameW = 460;
  const frameH = 176;
  const len = 48;

  const lines = [
    // Esquina superior izquierda
    { x1: 0, y1: 0, x2: len, y2: 0 },
    { x1: 0, y1: 0, x2: 0, y2: len },
    // Esquina superior derecha
    { x1: frameW, y1: 0, x2: frameW - len, y2: 0 },
    { x1: frameW, y1: 0, x2: frameW, y2: len },
    // Esquina inferior izquierda
    { x1: 0, y1: frameH, x2: len, y2: frameH },
    { x1: 0, y1: frameH, x2: 0, y2: frameH - len },
    // Esquina inferior derecha
    { x1: frameW, y1: frameH, x2: frameW - len, y2: frameH },
    { x1: frameW, y1: frameH, x2: frameW, y2: frameH - len },
  ];

  // Centramos el logo dentro del frame usando porcentajes
  const logoWidthPct = 60;        // el logo ocupa el 60% del ancho del frame
  const logoHeightPct = 40;       // y ~40% del alto
  const logoOffsetXPct = (100 - logoWidthPct) / 2; // centrado horizontal
  const logoOffsetYPct = (100 - logoHeightPct) / 2; // centrado vertical

  // Animación secuencial de líneas
  useEffect(() => {
    let timeout: any;
    if (phase === "frame" && lineStep < lines.length) {
      timeout = setTimeout(() => setLineStep((s) => s + 1), 90);
    } else if (phase === "frame" && lineStep === lines.length) {
      setTimeout(() => setShowRec(true), 120);
      setTimeout(() => setShowLogo(true), 420);
      setTimeout(() => setPhase("logo"), 950);
    }
    return () => clearTimeout(timeout);
  }, [phase, lineStep, lines.length]);

  // Animación de viaje al header
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "logo") return;
    let cancelled = false;

    const run = async () => {
      await new Promise((r) => setTimeout(r, 10));

      const wrap = logoWrapRef.current;
      if (!wrap) return;

      const svg = wrap.querySelector("svg");
      if (!svg) return;

      const target = document.getElementById("header-logo-slot");
      if (target) {
        const srcRect = svg.getBoundingClientRect();
        const dstRect = target.getBoundingClientRect();

        const srcCx = srcRect.left + srcRect.width / 2;
        const srcCy = srcRect.top + srcRect.height / 2;
        const dstCx = dstRect.left + dstRect.width / 2;
        const dstCy = dstRect.top + dstRect.height / 2;

        const dx = dstCx - srcCx;
        const dy = dstCy - srcCy;
        const scale = dstRect.height / srcRect.height;

        const travel = wrap
          .animate(
            [
              { transform: "translate(0px,0px) scale(1)" },
              { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
            ],
            {
              duration: 650,
              easing: "cubic-bezier(.2,.7,0,1)",
              fill: "forwards",
            }
          )
          .finished.catch(() => {});

        const backdrop = wrap.closest(
          ".splash-backdrop"
        ) as HTMLDivElement | null;

        if (backdrop) {
          backdrop
            .animate(
              [
                { backgroundColor: "rgba(0,0,0,1)" },
                { backgroundColor: "rgba(0,0,0,0)" },
              ],
              {
                duration: 550,
                easing: "linear",
                fill: "forwards",
                delay: 150,
              }
            )
            .finished.catch(() => {});
        }

        await travel;
      }

      const headerSlot = document.getElementById("header-logo-slot");
      if (headerSlot) headerSlot.style.opacity = "1";

      if (!cancelled) {
        setVisible(false);
        setPhase("done");
        onDone?.();
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [phase, onDone]);

  if (!visible || phase === "done") return null;

  return (
    <div
      className="splash-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-black px-4"
      aria-hidden
    >
      {/* Contenedor responsivo: en móvil NO se corta nada */}
      <div className="w-full max-w-[420px] sm:max-w-[520px]">
        <div
          ref={logoWrapRef}
          className="relative w-full aspect-[460/176] flex items-center justify-center will-change-transform pointer-events-none select-none"
          style={{
            filter: "drop-shadow(0 0 16px rgba(255,255,255,.12))",
          }}
        >
          {/* Frame de cámara */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${frameW} ${frameH}`}
            className="absolute inset-0 z-[2] pointer-events-none"
          >
            {lines.slice(0, lineStep).map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="#fff"
                strokeWidth={3.5}
                strokeLinecap="butt"
                style={{
                  opacity: 1,
                  transition: "all 0.3s cubic-bezier(.7,0,.3,1)",
                }}
              />
            ))}

            {showRec && (
              <circle
                cx={frameW - 28}
                cy={28}
                r={11}
                fill="#e53935"
                stroke="#fff"
                strokeWidth={2.5}
                style={{
                  filter: "drop-shadow(0 0 8px #e53935cc)",
                  transition: "opacity 0.3s cubic-bezier(.7,0,.3,1)",
                }}
              />
            )}
          </svg>

          {/* Logo centrado dentro del frame */}
          <div
            className="flex items-center justify-center"
            style={{
              position: "absolute",
              left: `${logoOffsetXPct}%`,
              top: `${logoOffsetYPct}%`,
              width: `${logoWidthPct}%`,
              height: `${logoHeightPct}%`,
              opacity: showLogo ? 1 : 0,
              transition: "opacity 0.4s cubic-bezier(.7,0,.3,1)",
              zIndex: 3,
            }}
            dangerouslySetInnerHTML={{ __html: LogoSvgRaw }}
          />
        </div>
      </div>
    </div>
  );
}
