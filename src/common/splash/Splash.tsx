import { useEffect, useRef, useState } from "react";
import LogoSvgRaw from "../../assets/Footer/Blank_Logo.svg?raw";

type Props = { delayMs?: number; onDone?: () => void };

export default function Splash({ delayMs = 0, onDone }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (delayMs) await new Promise(r => setTimeout(r, delayMs));
      const wrap = wrapRef.current;
      if (!wrap) return;

      // Inyecta el SVG y toma referencia
      wrap.innerHTML = LogoSvgRaw;
      const svg = wrap.querySelector("svg") as SVGSVGElement | null;
      if (!svg) return;

      // Tamaño y prevención de recortes
      svg.setAttribute("width", "340");
      svg.setAttribute("height", "80");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      (svg.style as any).overflow = "visible";
      (svg.style as any).display = "block";


      // Selecciona todos los elementos relevantes para animar
      const elements = Array.from(svg.querySelectorAll("path, rect, circle, ellipse, polygon, polyline, line"));

      // 1) Estado inicial: SOLO contorno blanco (relleno transparente)
      elements.forEach(el => {
        el.removeAttribute("style");
        el.removeAttribute("class");
        el.removeAttribute("fill");
        el.setAttribute("fill", "transparent");
        el.setAttribute("stroke", "#fff");
        el.setAttribute("stroke-width", "2");
        el.setAttribute("stroke-linecap", "round");
        el.setAttribute("stroke-linejoin", "round");

        // getTotalLength solo existe en path, line, polyline, polygon, circle, ellipse
        let len = 400;
        try {
          if (typeof (el as any).getTotalLength === "function") {
            len = (el as any).getTotalLength();
          }
        } catch {}
        (el as any).style.strokeDasharray = String(len);
        (el as any).style.strokeDashoffset = String(len);
      });

      // 2) Animación de dibujo (stagger suave)
      await Promise.all(
        elements.map((el, i) =>
          el.animate(
            [{ strokeDashoffset: (el as any).style.strokeDasharray }, { strokeDashoffset: "0" }],
            {
              duration: 900,
              delay: i * 60,
              easing: "cubic-bezier(.2,.7,0,1)",
              fill: "forwards",
            }
          ).finished.catch(() => {})
        )
      );
      if (cancelled) return;

      // 3) Transición a LOGO RELLENO (blanco sólido) + desvanecer contorno
      elements.forEach(el => el.setAttribute("fill", "#fff"));
      await Promise.all(
        elements.map(el =>
          el.animate(
            [
              { fillOpacity: 0, strokeOpacity: 1 },
              { fillOpacity: 1, strokeOpacity: 0 },
            ],
            { duration: 280, easing: "ease-out", fill: "forwards" }
          ).finished.catch(() => {})
        )
      );
      if (cancelled) return;

      // 4) Viajar al logo del header
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
            { duration: 650, easing: "cubic-bezier(.2,.7,0,1)", fill: "forwards" }
          )
          .finished.catch(() => {});
        const backdrop = wrap.parentElement as HTMLDivElement;
        const fade = backdrop
          .animate(
            [{ backgroundColor: "rgba(0,0,0,1)" }, { backgroundColor: "rgba(0,0,0,0)" }],
            { duration: 550, easing: "linear", fill: "forwards", delay: 150 }
          )
          .finished.catch(() => {});
        await Promise.all([travel, fade]);
      }

      const headerSlot = document.getElementById("header-logo-slot");
      if (headerSlot) headerSlot.style.opacity = "1";

      if (!cancelled) {
        setVisible(false);
        onDone?.();
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [delayMs, onDone]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "black" }}
      aria-hidden
    >
      <div
        ref={wrapRef}
        className="will-change-transform"
        style={{
          filter: "drop-shadow(0 0 16px rgba(255,255,255,.12))",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
