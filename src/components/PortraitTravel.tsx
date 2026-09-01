import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the portrait turn from scroll position.
 *
 * The script only ever writes two custom properties — --turn and --lit — and
 * Portrait3D.scss decides what those mean for the face, the edge, the specular
 * band and the cast shadow. Keeping the physics in CSS and the timing in JS is
 * what stops this becoming a pile of hard-coded transforms that have to be
 * kept in sync by hand.
 *
 * --lit is derived from the ABSOLUTE turn, so the surface dims the same amount
 * whichever way it rotates. Driving it from the signed angle would light one
 * direction and shadow the other.
 */
function PortraitTravel() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.querySelector<HTMLElement>(".p3d--hero");
    const about = document.querySelector<HTMLElement>(".p3d--about");
    if (!hero || !about) return;

    const setLit = (el: HTMLElement, deg: number) =>
      el.style.setProperty("--lit", String(Math.min(1, Math.abs(deg) / 90)));

    const ctx = gsap.context(() => {
      // ── hero: turns away and grows toward the viewer ─────────────────
      const heroTurn = { deg: 0 };
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })
        .to(heroTurn, {
          deg: -78,
          ease: "none",
          onUpdate: () => {
            hero.style.setProperty("--turn", `${heroTurn.deg}deg`);
            setLit(hero, heroTurn.deg);
          },
        }, 0)
        // Growing as it turns is what reads as the object approaching rather
        // than merely spinning in place.
        .to(hero, { scale: 1.5, ease: "none" }, 0)
        .to(hero, { autoAlpha: 0, ease: "none", duration: 0.1 }, 0.9);

      // ── about: turns in to meet it ───────────────────────────────────
      const aboutTurn = { deg: 82 };
      gsap.to(aboutTurn, {
        deg: 0,
        ease: "none",
        onUpdate: () => {
          about.style.setProperty("--turn", `${aboutTurn.deg}deg`);
          setLit(about, aboutTurn.deg);
        },
        scrollTrigger: {
          trigger: ".about",
          // Starts while About is still below the fold, so the halves overlap
          // and the handover happens mid-turn where both are near edge-on.
          start: "top bottom",
          end: "center center",
          scrub: 0.6,
        },
      });

      // Set the opening state immediately, or the About card sits flat until
      // the first scroll event fires.
      about.style.setProperty("--turn", "82deg");
      setLit(about, 82);
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => ctx.revert();
  }, []);

  return null;
}

export default PortraitTravel;
