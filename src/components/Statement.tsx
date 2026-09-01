import React from "react";
import '../assets/styles/Statement.scss';

/**
 * The statement.
 *
 * Reveal is handled centrally in Motion.tsx, matching the reference: the
 * headline moves 20px, the paragraph 10px, both once. An earlier version split
 * this into individual words on a scrubbed timeline — that was my invention,
 * not something the reference does, and it drew attention to the effect
 * instead of the sentence.
 */
function Statement() {
  return (
    <section className="statement" id="statement">
      <div className="mn-wrap">
        <p className="mn-slug statement-slug">What I do</p>

        <h2 className="mn-huge statement-head">
          From prototype<br />to production.
        </h2>

        <p className="statement-body">
          AI systems built to run in the real world, not just in a notebook.
          Agentic pipelines, retrieval that cites its sources, and models that
          say what they do not know, shipped with the infrastructure to keep
          them running.
        </p>
      </div>
    </section>
  );
}

export default Statement;
