import { useEffect, useState, useRef } from "react";
import LogoSvgRaw from "../../assets/Footer/Blank_Logo.svg?raw";


type Props = { delayMs?: number; onDone?: () => void };



// Splash con animación de encuadre 100% React
export default function Splash({ onDone }: Props) {
  const [lineStep, setLineStep] = useState(0); // cuántas líneas mostrar
  const [showLogo, setShowLogo] = useState(false);
  const [showRec, setShowRec] = useState(false);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'frame'|'logo'|'done'>('frame');
  const logoW = 340;
  const logoH = 80;
  // Nuevo marco más grande
  const framePadX = 60;
  const framePadY = 48;
  const frameW = logoW + framePadX * 2;
  const frameH = logoH + framePadY * 2;
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

  // Animación secuencial de líneas
  useEffect(() => {
    let timeout: any;
    if (phase === 'frame' && lineStep < lines.length) {
      timeout = setTimeout(() => setLineStep(s => s + 1), 90);
    } else if (phase === 'frame' && lineStep === lines.length) {
      // Mostrar punto REC tras las líneas
      setTimeout(() => setShowRec(true), 120);
      // Mostrar logo después del REC
      setTimeout(() => setShowLogo(true), 420);
      setTimeout(() => setPhase('logo'), 950);
    }
    return () => clearTimeout(timeout);
  }, [phase, lineStep, lines.length]);

  // Animación de viaje al header (igual que antes)
  const logoWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (phase !== 'logo') return;
    let cancelled = false;
    const run = async () => {
      // Esperar un frame para que el logo sea visible
      await new Promise(r => setTimeout(r, 10));
      const wrap = logoWrapRef.current;
      if (!wrap) return;
      const svg = wrap.querySelector('svg');
      if (!svg) return;
      const target = document.getElementById('header-logo-slot');
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
        const travel = wrap.animate([
          { transform: 'translate(0px,0px) scale(1)' },
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        ], { duration: 650, easing: 'cubic-bezier(.2,.7,0,1)', fill: 'forwards' }).finished.catch(() => {});
        const backdrop = wrap.parentElement as HTMLDivElement;
        const fade = backdrop.animate(
          [{ backgroundColor: 'rgba(0,0,0,1)' }, { backgroundColor: 'rgba(0,0,0,0)' }],
          { duration: 550, easing: 'linear', fill: 'forwards', delay: 150 }
        ).finished.catch(() => {});
        await Promise.all([travel, fade]);
      }
      const headerSlot = document.getElementById('header-logo-slot');
      if (headerSlot) headerSlot.style.opacity = '1';
      if (!cancelled) {
        setVisible(false);
        setPhase('done');
        onDone?.();
      }
    };
    run();
    return () => { cancelled = true; };
  }, [phase, onDone]);

  if (!visible || phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'black' }}
      aria-hidden
    >
      <div
        ref={logoWrapRef}
        className="will-change-transform"
        style={{
          filter: 'drop-shadow(0 0 16px rgba(255,255,255,.12))',
          pointerEvents: 'none',
          userSelect: 'none',
          width: frameW,
          height: frameH,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* SVG de líneas de encuadre y punto REC */}
        <svg
          width={frameW}
          height={frameH}
          style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none' }}
        >
          {/* Líneas de encuadre */}
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
              style={{ opacity: 1, transition: 'all 0.3s cubic-bezier(.7,0,.3,1)' }}
            />
          ))}
          {/* Punto rojo REC */}
          {showRec && (
            <circle
              cx={frameW - 28}
              cy={28}
              r={11}
              fill="#e53935"
              stroke="#fff"
              strokeWidth={2.5}
              style={{ filter: 'drop-shadow(0 0 8px #e53935cc)', transition: 'opacity 0.3s cubic-bezier(.7,0,.3,1)' }}
            />
          )}
        </svg>
        {/* Logo SVG */}
        <div
          style={{
            width: logoW,
            height: logoH,
            opacity: showLogo ? 1 : 0,
            transition: 'opacity 0.4s cubic-bezier(.7,0,.3,1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: framePadX,
            top: framePadY,
            zIndex: 3,
          }}
          dangerouslySetInnerHTML={{ __html: LogoSvgRaw }}
        />
      </div>
    </div>
  );
}


  
