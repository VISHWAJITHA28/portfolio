import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../assets/styles/Motion.scss';

gsap.registerPlugin(ScrollTrigger);

/**
 * The motion layer: inertial scrolling, plus every scroll-driven reveal.
 *
 * WHY SMOOTH SCROLL IS THE FIRST THING
 *     It is the single change that most alters how a site feels, and it is why
 *     Framer and Webflow sites read as "designed" while the same layout in
 *     plain HTML reads as a document. A native scroll jumps by discrete wheel
 *     deltas; an inertial one carries momentum and eases out, so every
 *     scroll-linked animation underneath it also moves continuously instead of
 *     stepping. Without it, scrubbed animations look juddery no matter how
 *     well they are written.
 *
 * WHY LENIS AND SCROLLTRIGGER MUST BE MARRIED
 *     Lenis takes over scrolling, so ScrollTrigger stops being told when the
 *     page moves and every trigger fires at the wrong moment. The two have to
 *     be joined explicitly: Lenis reports each frame to ScrollTrigger, and
 *     GSAP's ticker drives Lenis rather than Lenis running its own loop. Two
 *     independent loops is the usual cause of the drift people blame on
 *     ScrollTrigger.
 */
function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.classList.add("no-gsap");
      return;
    }

    // ── inertial scroll ────────────────────────────────────────────────
    const lenis = new Lenis({
      // ~1.05s to settle. Long enough to feel like weight, short enough that
      // it never feels like the page is ignoring you.
      duration: 1.05,
      // Exponential ease-out: fast off the mark, long tail.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Touch devices already have native momentum; doubling it feels broken.
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors have to go through Lenis, or the browser's own jump
    // fights the momentum and lands in the wrong place.
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

    // ── reveals ────────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      // Headings rise.
      gsap.utils.toArray<HTMLElement>(
        "#projects h1, #history h1, #education h1, #contact h1, .marquee-head h2"
      ).forEach((el) => {
        gsap.fromTo(el,
          { yPercent: 40, opacity: 0 },
          {
            yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
      });

      // Project images uncover rather than fade. A clip reveal reads as
      // something being shown; opacity reads as something loading.
      gsap.utils.toArray<HTMLElement>(".project").forEach((card, i) => {
        const img = card.querySelector("img");
        if (img) {
          gsap.fromTo(img,
            { clipPath: "inset(0% 0% 100% 0%)", scale: 1.12 },
            {
              clipPath: "inset(0% 0% 0% 0%)", scale: 1,
              duration: 1.25, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            });
        }
        gsap.fromTo(card.querySelectorAll("h2, p"),
          { y: 26, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: "power2.out",
            stagger: 0.08, delay: 0.15,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
      });

      // Cards settle in sequence.
      gsap.utils.toArray<HTMLElement>(
        "#education .skill, #contact .contact-link, .vertical-timeline-element"
      ).forEach((el, i) => {
        gsap.fromTo(el,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.95, ease: "power3.out",
            delay: (i % 3) * 0.07,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
      });

      // Hero recedes as you leave it: two rates, so it has depth.
      const heroTitle = document.querySelector(".hero-title");
      const heroFoot = document.querySelector(".hero-foot");
      if (heroTitle) {
        gsap.to(heroTitle, {
          yPercent: 24, opacity: 0.15, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      }
      if (heroFoot) {
        gsap.to(heroFoot, {
          yPercent: 60, opacity: 0, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      }
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
