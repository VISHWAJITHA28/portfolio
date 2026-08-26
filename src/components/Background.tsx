import React, { useEffect, useRef } from "react";
import '../assets/styles/Background.scss';

/**
 * Moving wave background.
 *
 * Five stacked sine waves, each a filled band with its own wavelength, speed
 * and phase. Because no two share a period, the crests drift in and out of
 * alignment and the surface never visibly repeats. Matching periods would
 * make the whole thing pulse in lockstep, which reads as a loop rather than
 * as water.
 *
 * Performance:
 *   - one canvas, one rAF loop, no DOM work per frame
 *   - the loop stops when the tab is hidden
 *   - a single static frame under prefers-reduced-motion
 *   - the backing store is sized to devicePixelRatio so edges stay clean
 */

type Wave = {
  amp: number;      // crest height in px
  len: number;      // wavelength in px
  speed: number;    // horizontal travel per frame
  y: number;        // resting height, as a fraction of canvas height
  phase: number;
  fill: string;
};

const WAVES: Wave[] = [
  { amp: 34, len: 520, speed: 0.28, y: 0.58, phase: 0.0, fill: "rgba(109, 74, 202, 0.30)" },
  { amp: 26, len: 380, speed: 0.42, y: 0.64, phase: 1.7, fill: "rgba(80, 0, 202, 0.26)" },
  { amp: 42, len: 700, speed: 0.19, y: 0.70, phase: 3.1, fill: "rgba(139, 92, 246, 0.22)" },
  { amp: 22, len: 300, speed: 0.55, y: 0.76, phase: 4.6, fill: "rgba(45, 178, 194, 0.16)" },
  { amp: 30, len: 460, speed: 0.33, y: 0.83, phase: 2.2, fill: "rgba(190, 70, 180, 0.14)" },
];

function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // The hero keeps its own backdrop. The waves only arrive once the first
  // screen has scrolled away, so the landing view stays quiet.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let ticking = false;
    const apply = () => {
      const vh = window.innerHeight;
      const t = Math.min(1, Math.max(0, (window.scrollY - vh * 0.45) / (vh * 0.5)));
      wrap.style.opacity = String(t);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let t = 0;
    let w = 0;
    let h = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const wave of WAVES) {
        const base = h * wave.y;

        ctx.beginPath();
        ctx.moveTo(0, h);

        // Step in 6px increments rather than per-pixel. At this amplitude the
        // difference is invisible and it cuts the work by a factor of six.
        for (let x = 0; x <= w; x += 6) {
          const y =
            base +
            Math.sin((x / wave.len) * Math.PI * 2 + wave.phase + t * wave.speed * 0.05) * wave.amp +
            // A second, slower term at a different wavelength keeps the crest
            // line from looking like a textbook sine.
            Math.sin((x / (wave.len * 0.43)) * Math.PI * 2 + t * wave.speed * 0.03) * (wave.amp * 0.32);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wave.fill;
        ctx.fill();
      }

      if (!reduced) t += 1;
      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      setup();
      frame();
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };

    setup();
    frame();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="bg-ambient" aria-hidden="true" ref={wrapRef}>
      <canvas ref={canvasRef} className="bg-canvas" />
      <span className="bg-orb bg-orb--violet" />
      <span className="bg-orb bg-orb--indigo" />
    </div>
  );
}

export default Background;
