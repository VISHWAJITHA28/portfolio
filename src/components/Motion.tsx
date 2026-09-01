import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../assets/styles/Motion.scss';

gsap.registerPlugin(ScrollTrigger);

/**
 * The motion layer.
 *
 * THE NUMBERS HERE ARE MEASURED, NOT CHOSEN
 *     Read out of the reference's own markup: every reveal is opacity 0 -> 1
 *     with a translateY of 10px or 20px, eased on cubic-bezier(.44, 0, .56, 1).
 *     That is the entire vocabulary.
 *
 *     An earlier version of this file used 40-60% translations, clip-path
 *     uncovers and scrubbed parallax. All of it was wrong, and wrong in a
 *     specific way: big motion draws attention to the motion. The reference
 *     feels expensive because the movement is small enough that you notice the
 *     content arriving rather than the animation playing.
 *
 * SO: 10px, 20px, and nothing else.
 */

// The reference's easing, verbatim. Symmetric ease-in-out — it accelerates and
// decelerates equally, which is why it reads as calm rather than snappy.
const EASE = "cubic-bezier(0.44, 0, 0.56, 1)";
const DUR = 0.7;

function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.classList.add("no-gsap");
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Lenis takes over scrolling, so ScrollTrigger must be told about every
    // frame or its triggers fire against a stale scroll position. Driving
    // Lenis from GSAP's ticker rather than its own loop keeps the two on one
    // clock; two clocks is what causes the drift usually blamed on GSAP.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -70 });
    };
    document.addEventListener("click", onAnchor);

    const ctx = gsap.context(() => {
      // ── 20px for anything that leads a section ──────────────────────
      gsap.utils.toArray<HTMLElement>(
        "#projects h1, #history h1, #education h1, #contact h1, " +
        ".marquee-head h2, .statement-head, .mn-slug"
      ).forEach((el) => {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: DUR, ease: EASE,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
      });

      // ── 10px for everything that follows ────────────────────────────
      gsap.utils.toArray<HTMLElement>(
        // Deliberately NOT .pdeck-card or .case-panel: both carry their own
        // transform (pile depth, unfold) and a GSAP inline transform would
        // overwrite it. Their containers get the reveal instead.
        ".pdeck-index-btn, .hist-row .case, #education .skill, " +
        "#contact .contact-link, .statement-body, .about-right p, " +
        "#contact .contact_wrapper > p, .marquee-eyebrow, " +
        ".hist-lede, .pdeck-lede"
      ).forEach((el, i) => {
        gsap.fromTo(el,
          { y: 10, opacity: 0 },
          {
            y: 0, opacity: 1, duration: DUR, ease: EASE,
            // A short stagger within a group, so a grid does not snap in as
            // one block. Capped at three so a long list never crawls.
            delay: (i % 3) * 0.06,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
      });

      // ── the hero, on load ───────────────────────────────────────────
      // Played on mount rather than on scroll: it is already in view, and
      // waiting for a scroll event would leave the first screen blank.
      gsap.timeline({ defaults: { ease: EASE, duration: DUR } })
        .fromTo(".hero .pill", { y: -10, opacity: 0 }, { y: 0, opacity: 1 })
        // Lines arrive in reading order, which is what makes a two-line
        // headline read as a sentence rather than as a logo appearing.
        .fromTo(".hero-line", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.09 }, 0.06)
        .fromTo(".hero-bg", { opacity: 0 }, { opacity: 1 }, 0)
        .fromTo(".hero-corners", { y: 10, opacity: 0 }, { y: 0, opacity: 1 }, 0.3);
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return null;
}

export default Motion;
