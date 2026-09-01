import React from "react";
import '../assets/styles/TechMarquee.scss';

/**
 * Three rows of technologies, scrolling in alternating directions.
 *
 * WHY ALTERNATING
 *     Rows moving the same way read as one block sliding. Reversing every
 *     other row creates counter-motion at each boundary, which is what makes
 *     the section feel like a mechanism rather than a banner.
 *
 * HOW THE LOOP IS SEAMLESS
 *     Each row renders its items TWICE and the track translates by exactly
 *     -50%. At the end of the cycle the second copy sits precisely where the
 *     first began, so the reset is invisible. This is why the duplicate is
 *     required rather than wasteful — without it the row would visibly jump.
 *
 *     The duplicate is aria-hidden, so a screen reader hears each technology
 *     once.
 *
 * SPEED
 *     Rows run at different durations. Identical speeds would let the rows
 *     stay in step with each other and the counter-motion would stop reading.
 */

type Row = { items: string[]; reverse: boolean; seconds: number };

const ROWS: Row[] = [
  {
    // The core: language, framework, database, deployment.
    items: ["Python", "FastAPI", "PostgreSQL", "Docker", "Azure"],
    reverse: false,
    seconds: 34,
  },
  {
    // The models.
    items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV"],
    reverse: true,
    seconds: 28,
  },
  {
    // The agentic layer.
    items: ["LangGraph", "LangChain", "RAG", "Gemini"],
    reverse: false,
    seconds: 31,
  },
];

function Track({ items, reverse, seconds }: Row) {
  return (
    <div className="marquee-row">
      <div
        className={`marquee-track${reverse ? " marquee-track--reverse" : ""}`}
        style={{ animationDuration: `${seconds}s` }}
      >
        {items.map((t) => (
          <span className="marquee-pill" key={t}>{t}</span>
        ))}
        {items.map((t) => (
          <span className="marquee-pill" key={`b-${t}`} aria-hidden="true">{t}</span>
        ))}
        {/* Four copies, not two. With only four or five items a single repeat
            does not span a wide viewport, so a gap appears before the loop
            point. The animation still translates -50%, which now lands on the
            third copy — identical to the first, so the seam stays invisible. */}
        {items.map((t) => (
          <span className="marquee-pill" key={`c-${t}`} aria-hidden="true">{t}</span>
        ))}
        {items.map((t) => (
          <span className="marquee-pill" key={`d-${t}`} aria-hidden="true">{t}</span>
        ))}
      </div>
    </div>
  );
}

function TechMarquee() {
  return (
    <section className="marquee-section" id="stack">
      <div className="marquee-head">
        <p className="marquee-eyebrow">The stack</p>
        <h2>Things I reach for</h2>
      </div>

      <div className="marquee-rows">
        {ROWS.map((row, i) => <Track key={i} {...row} />)}
      </div>
    </section>
  );
}

export default TechMarquee;
