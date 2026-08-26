import React, { useEffect, useRef } from "react";
import '../assets/styles/HeroWave.scss';

/**
 * The hero ribbon, animated.
 *
 * Replaces the template's static bg-dark.png with the same shape drawn live:
 * a stack of thin sine curves whose phase and amplitude step slightly from one
 * line to the next. Where the lines bunch they read as a solid edge, where
 * they fan out they read as a gradient. That interference is what makes it a
 * ribbon rather than a pile of curves, and it is why the lines are stroked
 * individually instead of the band being filled.
 *
 * Performance:
 *   - 54 curves sampled every 8px, one rAF loop, no DOM work per frame
 *   - stops when the tab is hidden
 *   - draws one static frame under prefers-reduced-motion
 *   - backing store sized to devicePixelRatio so the hairlines stay crisp
 */

const LINES = 54;
const STEP = 8;          // px between samples along each curve
const PHASE_STEP = 0.055; // phase offset between adjacent lines

function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let grad: CanvasGradient | null = null;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Left to right: magenta into violet into indigo, matching the ribbon
      // the template shipped.
      grad = ctx.createLinearGradient(0, h, w, 0);
      grad.addColorStop(0, "#e11ec4");
      grad.addColorStop(0.35, "#a21ce0");
      grad.addColorStop(0.7, "#6d28d9");
      grad.addColorStop(1, "#4c1d95");
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      if (grad) ctx.strokeStyle = grad;
      ctx.lineWidth = 1;

      const cy = h * 0.56;

      for (let i = 0; i < LINES; i++) {
        // Lines further through the stack sit slightly lower and swing a
        // little wider, which is what opens the band out on the right.
        const spread = i / (LINES - 1);
        const amp = h * (0.16 + spread * 0.13);
        const phase = t * 0.011 + i * PHASE_STEP;
        const yBase = cy + (spread - 0.5) * h * 0.1;

        ctx.globalAlpha = 0.16 + 0.5 * (1 - Math.abs(spread - 0.5) * 2) * 0.9;
        ctx.beginPath();

        for (let x = 0; x <= w; x += STEP) {
          const u = x / w;

          // Envelope pinches the ribbon near the left third and opens it out
          // toward both ends, so it reads as a twisting band rather than a
          // constant-height wave.
          const envelope = 0.35 + 0.65 * Math.abs(Math.sin(u * Math.PI * 0.92 + 0.35));

          const y =
            yBase +
            Math.sin(u * Math.PI * 2 * 1.15 + phase) * amp * envelope +
            Math.sin(u * Math.PI * 2 * 0.47 - phase * 0.6) * amp * 0.28;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;

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

  return <canvas ref={canvasRef} className="hero-wave" aria-hidden="true" />;
}

export default HeroWave;
