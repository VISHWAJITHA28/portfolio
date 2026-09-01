import React from "react";
import PillNav from './PillNav';
import Mark from './Mark';
import byru from '../assets/images/byru.jpg';
import '../assets/styles/Hero.scss';

/**
 * The hero.
 *
 * THE COMPOSITION
 *     A two-line uppercase headline at near-full bleed over a monochrome
 *     portrait that fills the whole frame. The overlap is the whole idea: it
 *     makes the type and the person one image instead of a headline sitting
 *     above a photo, and it is what stops a huge headline reading as a
 *     banner.
 *
 *     The portrait used to be a card that turned on scroll. It is the ground
 *     now - no card, no rotation, nothing to drive.
 *
 *     Everything else is placed at the corners — pill nav top centre, the year
 *     bottom left, the slug bottom right — so the middle of the frame is left
 *     entirely to the overlap.
 */
function Main() {
  return (
    <header className="hero" id="top">

      {/* The portrait IS the ground here, not an object sitting on it. Full
          bleed, monochrome, masked into the cream at every edge so it has no
          border of its own - the page simply becomes the photograph in the
          middle of the frame and comes back out again. */}
      <div className="hero-bg" aria-hidden="true">
        <img src={byru} alt="" />
      </div>

      <PillNav id="hero" />

      <div className="hero-stage">
        {/* The star, as a solid object with an iridescent bevel rather than a
            flat glyph. See Mark.tsx. */}
        <Mark shape="star" className="hero-star" />

        <h1 className="hero-title">
          <span className="hero-line">AI</span>
          <span className="hero-line">Engineer</span>
        </h1>
      </div>

      <div className="hero-corners">
        <span className="hero-year">&copy;2026</span>

        {/* Answers the star across the frame, in place of the caption that
            used to sit here. */}
        <Mark shape="bolt" className="hero-bolt" />

      </div>

    </header>
  );
}

export default Main;
