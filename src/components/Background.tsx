import React from "react";
import '../assets/styles/Background.scss';

/**
 * Ambient background.
 *
 * Pure CSS: four blurred orbs drifting on long, mismatched cycles, over a fine
 * grid that pans slowly. No canvas and no JavaScript, so it costs nothing on a
 * mid-range phone and cannot jank the scroll.
 *
 * The cycles are deliberately prime-ish and unequal (23s, 31s, 37s, 29s) so the
 * composition never visibly repeats. Matching durations would sync up and the
 * whole thing would start to pulse.
 */
function Background() {
  return (
    <div className="bg-ambient" aria-hidden="true">
      <div className="bg-grid" />
      <span className="bg-orb bg-orb--violet" />
      <span className="bg-orb bg-orb--indigo" />
      <span className="bg-orb bg-orb--teal" />
      <span className="bg-orb bg-orb--magenta" />
      <div className="bg-vignette" />
    </div>
  );
}

export default Background;
