import React, { useEffect, useRef } from "react";
import '../assets/styles/Background.scss';

/**
 * Animated constellation background.
 *
 * Nodes drift, and any two within range are joined by a line whose opacity
 * falls off with distance. The pointer pulls nearby nodes toward it, so the
 * field reacts rather than just looping.
 *
 * Performance notes, because a full-screen canvas is easy to get wrong:
 *   - node count scales with viewport area and is capped, so a 4K monitor
 *     does not end up running an O(n^2) join over 400 nodes
 *   - the loop stops entirely when the tab is hidden
 *   - honours prefers-reduced-motion by drawing one static frame
 *   - backing store is sized to devicePixelRatio so lines stay crisp
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DIST = 132;      // px within which two nodes are joined
const POINTER_DIST = 170;   // px within which the pointer influences a node

function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999 };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // One node per ~13k px^2, clamped. Density stays constant across screen
      // sizes without the join loop exploding on a large display.
      const count = Math.min(110, Math.max(34, Math.round((w * h) / 13000)));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.7 + 0.9,
      }));
    };

    const frame = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;

          // Pull toward the pointer, gently, falling off with distance.
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < POINTER_DIST && d > 0.5) {
            const pull = (1 - d / POINTER_DIST) * 0.035;
            n.x += dx * pull;
            n.y += dy * pull;
          }

          // Wrap rather than bounce: bouncing makes the edges read as walls.
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167, 139, 250, 0.72)";
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;

          // Fade the line out as the pair separates, so links appear and
          // vanish smoothly instead of popping at the threshold.
          const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.42;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139, 122, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      setup();
    };
    const onVisibility = () => {
      // A background animating in a tab nobody is looking at is pure waste.
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };

    setup();
    frame();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="bg-ambient" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-canvas" />
      <span className="bg-orb bg-orb--violet" />
      <span className="bg-orb bg-orb--indigo" />
      <span className="bg-orb bg-orb--teal" />
    </div>
  );
}

export default Background;
