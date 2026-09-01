import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../assets/styles/Statement.scss';

gsap.registerPlugin(ScrollTrigger);

/**
 * The statement: a large line, then a paragraph that arrives word by word.
 *
 * WHY SPLIT BY WORD AND NOT BY LINE
 *     A line fading in is a fade. Words arriving in sequence read as someone
 *     speaking, and it makes the reader's eye travel the sentence at the pace
 *     the sentence should be read at. The reference does exactly this, which
 *     is why its markup has every word in its own element.
 *
 * WHY EACH WORD IS TWO ELEMENTS
 *     The outer span clips (overflow: hidden), the inner one moves. So the
 *     word rises from behind its own baseline rather than fading in place.
 *     One element cannot do both.
 */

const HEADLINE = ["From", "prototype", "to", "production."];

const PARAGRAPH =
  "AI systems built to run in the real world, not just in a notebook. " +
  "Agentic pipelines, retrieval that cites its sources, and models that say " +
  "what they do not know, shipped with the infrastructure to keep them alive.";

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span className={`mn-word ${className ?? ""}`}><span>{w}</span></span>{" "}
        </React.Fragment>
      ))}
    </>
  );
}

function Statement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("no-gsap");
      return;
    }

    const ctx = gsap.context(() => {
      // The headline arrives as a unit, fast, with a tight stagger.
      gsap.to(el.querySelectorAll(".statement-head .mn-word > span"), {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });

      // The paragraph is scrubbed against scroll position rather than played
      // on entry: the reader controls the pace, which is what makes it feel
      // like reading rather than watching an animation.
      gsap.to(el.querySelectorAll(".statement-body .mn-word > span"), {
        y: 0,
        ease: "none",
        stagger: 0.35,
        scrollTrigger: {
          trigger: el.querySelector(".statement-body"),
          start: "top 82%",
          end: "bottom 62%",
          scrub: 0.6,
        },
      });
    }, el);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => ctx.revert();
  }, []);

  return (
    <section className="statement" id="statement" ref={root}>
      <div className="mn-wrap">
        <p className="mn-slug statement-slug">What I do</p>

        <h2 className="mn-huge statement-head">
          <Words text={HEADLINE.join(" ")} />
        </h2>

        <p className="statement-body">
          <Words text={PARAGRAPH} />
        </p>
      </div>
    </section>
  );
}

export default Statement;
