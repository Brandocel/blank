import { useEffect, useRef, useState } from "react";
import LogoBlack from "../../assets/Footer/Blank_Logo.svg";

type Props = { delayMs?: number; onDone?: () => void };

export default function Splash({ delayMs = 0, onDone }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      if (delayMs) await sleep(delayMs);

      const wrap = wrapRef.current;
      if (!wrap) return;

      const logoWrapper = wrap.querySelector<HTMLElement>(".splash-logo");
      const slices = Array.from(
        wrap.querySelectorAll<HTMLDivElement>(".loader__slice")
      );

      if (!logoWrapper) return;

      // Estado inicial del logo (ya viene igual desde el JSX)
      logoWrapper.style.opacity = "0";
      logoWrapper.style.transform = "translateY(150%)";

      // Estado inicial de los bloques
      slices.forEach((slice) => {
        slice.style.transform = "translateY(0%)";
      });

      // 1) Logo entra desde abajo
      await logoWrapper
        .animate(
          [
            { transform: "translateY(150%)", opacity: 0 },
            { transform: "translateY(0%)", opacity: 1 },
          ],
          {
            duration: 450,
            easing: "cubic-bezier(.2,.7,0,1)",
            fill: "forwards",
          }
        )
        .finished.catch(() => {});
      if (cancelled) return;

      // Pausa para que se vea bien el logo
      await sleep(900);
      if (cancelled) return;

      // 2) Logo se va hacia abajo
      await logoWrapper
        .animate(
          [
            { transform: "translateY(0%)", opacity: 1 },
            { transform: "translateY(150%)", opacity: 0 },
          ],
          {
            duration: 450,
            easing: "cubic-bezier(.2,.7,0,1)",
            fill: "forwards",
          }
        )
        .finished.catch(() => {});
      if (cancelled) return;

      // 3) Bloques bajan
      const sliceAnim = Promise.all(
        slices.map((slice, i) =>
          slice
            .animate(
              [
                { transform: "translateY(0%)" },
                { transform: "translateY(100%)" },
              ],
              {
                duration: 900,
                delay: i * 140,
                easing: "cubic-bezier(.2,.7,0,1)",
                fill: "forwards",
              }
            )
            .finished.catch(() => {})
        )
      );

      // Hero title (si lo tienes)
      const heroSpan = document.querySelector<HTMLElement>(
        ".hero__title span"
      );
      let heroAnim: Promise<unknown> | null = null;
      if (heroSpan) {
        heroSpan.style.display = "inline-block";
        heroSpan.style.transform = "translateY(-100%)";
        heroSpan.style.opacity = "0";

        heroAnim = heroSpan
          .animate(
            [
              { transform: "translateY(-100%)", opacity: 0 },
              { transform: "translateY(0%)", opacity: 1 },
            ],
            {
              duration: 650,
              delay: 250,
              easing: "cubic-bezier(.2,.7,0,1)",
              fill: "forwards",
            }
          )
          .finished.catch(() => {});
      }

      await Promise.all([sliceAnim, heroAnim || Promise.resolve()]);
      if (cancelled) return;

      setVisible(false);
      onDone?.();
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [delayMs, onDone]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        // Transparente para que se vea la landing detrás
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <div
        ref={wrapRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Logo central sin recuadro */}
        <div
          className="splash-logo z-[2]"
          style={{ opacity: 0, transform: "translateY(150%)" }}
        >
          <img
            src={LogoBlack}
            alt="Black Logo"
            className="h-14 w-auto block"
          />
        </div>

        {/* Bloques / slices */}
        <div
          className="loader__slice absolute top-0 left-0 h-full"
          style={{ width: "33.34vw", backgroundColor: "#1d1d1d" }}
        />
        <div
          className="loader__slice absolute top-0 h-full"
          style={{
            left: "33.34vw",
            width: "33.34vw",
            backgroundColor: "#1d1d1d",
          }}
        />
        <div
          className="loader__slice absolute top-0 h-full"
          style={{
            left: "66.68vw",
            width: "33.34vw",
            backgroundColor: "#1d1d1d",
          }}
        />
      </div>
    </div>
  );
}
