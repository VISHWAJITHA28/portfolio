import React from "react";
import '../assets/styles/Hero.scss';

/**
 * The hero.
 *
 * The whole first screen is one headline. No portrait, no card, no gradient —
 * the reference this follows earns its impact by giving type the entire frame
 * and letting the space around it carry the weight. Anything else placed here
 * competes with the only line a visitor actually needs to read.
 */
function Main() {
  return (
    <header className="hero" id="top">
      <div className="mn-wrap">
        <div className="hero-meta">
          <p className="mn-label">Building since 2022</p>
          <p className="mn-label hero-meta-right">Hyderabad, India</p>
        </div>

        <h1 className="mn-display hero-title">
          AI<br />
          Engineer
        </h1>

        <div className="hero-foot">
          <p className="mn-lede">
            I take things from development to deployment. Agentic systems,
            retrieval that cites its sources, and computer vision, built to run
            in production rather than in a notebook.
          </p>

          <div className="hero-actions">
            <a className="mn-btn" href="#projects">
              View work <span aria-hidden="true">&rarr;</span>
            </a>
            <a className="mn-btn mn-btn--ghost" href="mailto:byruvishwajitha@gmail.com">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Main;
