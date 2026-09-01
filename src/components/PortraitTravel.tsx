import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The hero-to-about portrait turn.
 *
 * WHAT IT LOOKS LIKE
 *     Scrolling out of the hero, the small graded portrait rotates away on its
 *     Y axis until it is nearly edge-on — a thin sliver — and the larger colour
 *     portrait in About rotates in from the other side to meet it. Read as one
 *     move, the picture appears to turn from dark and small to colour and
 *     large.
 *
 * WHY TWO ELEMENTS AND NOT ONE
 *     One element travelling between two layouts means animating position
 *     across a document flow change, which needs FLIP and breaks the moment
 *     either section reflows. Two elements handing over at the edge-on frame
 *     costs nothing: at 85 degrees both are only a few pixels wide, so the
 *     swap is genuinely invisible. The illusion is in the shared axis and the
 *     matched timing, not in it being the same node.
 *
 * WHY SCRUBBED AND NOT PLAYED
 *     The turn is tied to scroll position, so the reader drives it. Played on
 *     entry it would fire once, usually before it is fully in view, and never
 *     reverse when scrolling back up.
 */
function PortraitTravel() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.querySelector<HTMLElement>(".hero-portrait");
    const about = document.querySelector<HTMLElement>(".about-portrait");
    if (!hero || !about) return;

    const ctx = gsap.context(() => {
      // ── the hero copy turns away ─────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      })
        // Growing while it turns is what sells it as one object coming toward
        // you rather than two pictures swapping.
        .to(hero, {
          rotateY: -85,
          scale: 1.55,
          xPercent: -4,
          ease: "none",
        }, 0)
        // The grade lifts on the way round, so the colour arrives with the
        // rotation rather than as a separate change.
        .to(hero, {
          filter: "grayscale(0.15) contrast(1.1) brightness(0.9)",
          ease: "none",
        }, 0)
        // Only at the very end, once it is nearly edge-on and a few pixels
        // wide, so the cut cannot be seen.
        .to(hero, { autoAlpha: 0, ease: "none", duration: 0.12 }, 0.88);

      // ── the about copy turns in ──────────────────────────────────────
      gsap.fromTo(about,
        { rotateY: 88, scale: 0.82, transformOrigin: "50% 50%" },
        {
          rotateY: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".about",
            // Begins while About is still below the fold, so the two halves
            // overlap and the handover lands in the middle of the turn.
            start: "top bottom",
            end: "center center",
            scrub: 0.5,
          },
        });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => ctx.revert();
  }, []);

  return null;
}

export default PortraitTravel;
