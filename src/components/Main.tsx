import React from "react";
import byru from '../assets/images/byru.jpg';
import PillNav from './PillNav';
import '../assets/styles/Hero.scss';

/**
 * The hero.
 *
 * THE COMPOSITION
 *     A two-line uppercase headline at near-full bleed, with the portrait
 *     layered BEHIND it so the second line runs across the photo. That overlap
 *     is the whole idea: it makes the type and the person one image instead of
 *     a headline sitting above a photo, and it is what stops a huge headline
 *     reading as a banner.
 *
 *     Everything else is placed at the corners — pill nav top centre, the year
 *     bottom left, the slug bottom right — so the middle of the frame is left
 *     entirely to the overlap.
 */
function Main() {
  return (
    <header className="hero" id="top">

      <PillNav id="hero" />

      <div className="hero-stage">
        {/* A drawn four-point star, the reference's one decorative mark. */}
        <svg className="hero-star" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 0 C54 32 68 46 100 50 C68 54 54 68 50 100 C46 68 32 54 0 50 C32 46 46 32 50 0 Z" />
        </svg>

        {/* Behind the headline on purpose — see the note above. */}
        <div className="hero-portrait">
          <img src={byru} alt="Byru Vishwajitha" />
        </div>

        <h1 className="hero-title">
          <span className="hero-line">AI</span>
          <span className="hero-line">Engineer</span>
        </h1>
      </div>

      <div className="hero-corners">
        <span className="hero-year">&copy;2026</span>
        <span className="hero-since">/BUILDING SINCE 2022</span>
      </div>

    </header>
  );
}

export default Main;
