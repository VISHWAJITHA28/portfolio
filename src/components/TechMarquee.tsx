import React from "react";
import '../assets/styles/TechMarquee.scss';

/**
 * Two rows of technologies, scrolling in opposite directions.
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
 * THE REPEAT
 *     An infinite scroll cannot exist without a duplicate. The only question
 *     is whether the duplicate is on screen at the same moment as the
 *     original, and that is a race between the width of ONE copy and the
 *     visible width of the row.
 *
 *     WIDTH, not item count, is what settles it. These thirteen include some
 *     long labels, so both rows now run well past the mask window and the
 *     seam stays off screen on any normal display. If the list is ever cut
 *     back to short words again, the levers are pill size and the mask fades
 *     - adding rows does nothing.
 *
 * SPEED IS TIED TO LENGTH
 *     A longer track covering the same distance in the same time moves
 *     faster, so the second row is given proportionally longer to travel.
 *     Equal durations would have it visibly outrunning the first.
 */

type Row = { items: string[]; reverse: boolean; seconds: number };

const ROWS: Row[] = [
  // Split by width as much as by subject: a row has to be wide enough to hide
  // its own duplicate, so the long labels are spread across both rows rather
  // than piled into the AI one.
  {
    items: [
      "Python", "FastAPI", "PostgreSQL",
      "Docker", "Azure", "LLM Integration",
    ],
    reverse: false,
    seconds: 44,
  },
  {
    items: [
      "Gen AI", "Agentic Workflows", "LangGraph", "LangChain",
      "Prompt Engineering", "RAG", "Gemini",
    ],
    reverse: true,
    seconds: 52,
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
