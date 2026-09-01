import React from "react";
import byru from '../assets/images/byru.jpg';
import '../assets/styles/About.scss';

/**
 * The section after the hero.
 *
 * THE LAYOUT
 *     Three columns, and deliberately unbalanced. "Hey!" sits at the top of
 *     the left column with the short bold line at its foot, the portrait holds
 *     the centre, and the longer copy runs down the right. The two text
 *     columns start at different heights, which is what makes it read as a
 *     composed spread rather than three boxes in a row.
 *
 *     The empty space in the left column is doing work. Filling it would
 *     square the layout up and lose the asymmetry that makes it look designed.
 */
function About() {
  return (
    <section className="about" id="about">
      <div className="mn-wrap about-grid">

        <div className="about-left">
          <h2 className="about-hey">Hey!</h2>
          <p className="about-short">
            I&rsquo;m Vishwajitha, an AI engineer based in Hyderabad, currently
            building healthcare AI at Ve Lyra Labs.
          </p>
        </div>

        <div className="about-portrait">
          <img src={byru} alt="Byru Vishwajitha" />
        </div>

        <div className="about-right">
          <p>
            I build agentic systems, retrieval that cites its sources, and
            computer vision models — then take them the whole way to production,
            including the pipelines that keep them running.
          </p>
          <p>
            Most of my work has been in healthcare, where being wrong actually
            matters. That is where the problems found me, not the limit of what
            I want to build.
          </p>
          <a className="about-cta" href="#projects">
            See the work
            <span className="about-cta-arrow" aria-hidden="true">&#8599;</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default About;
