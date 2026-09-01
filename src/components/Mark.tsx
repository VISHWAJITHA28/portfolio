import React, { useId } from "react";
import '../assets/styles/Mark.scss';

/**
 * The two decorative marks: a four-point star and a lightning bolt.
 *
 * WHAT MAKES THEM READ AS OBJECTS
 *     Not the silhouette — a flat black star is just a glyph. It is the BEVEL:
 *     an offset copy of the same path behind the face, filled with an
 *     iridescent gradient, so the mark looks like a thick piece of something
 *     catching the light along one side. Three layers do it:
 *
 *       edge   the same path, nudged down-left and fattened by a stroke, in
 *              the gradient. This is the cut side of the material.
 *       face   the black top surface.
 *       glint  a hairline of white along the upper-left, where the light is.
 *
 *     Every path is stroked in its own fill with round joins. That rounds the
 *     tips without needing a second, hand-rounded path — a sharp-cornered star
 *     looks printed, a round-tipped one looks moulded.
 *
 * WHY THE GRADIENT ID IS GENERATED
 *     Two of these render on the hero at once. A hard-coded id would appear
 *     twice in the document, and the second one silently loses: browsers
 *     resolve url(#id) to the first match, so both marks would take whichever
 *     gradient happened to be first in the DOM.
 */

const PATHS = {
  // Fat arms, shallow concave sides. A thinner star reads as a sparkle
  // decoration; this one has enough body to look like an object.
  star: "M50 3 C55 28 72 45 97 50 C72 55 55 72 50 97 C45 72 28 55 3 50 C28 45 45 28 50 3 Z",
  bolt: "M63 4 L23 55 L45 55 L37 96 L79 43 L55 43 Z",
};

type MarkProps = {
  shape: "star" | "bolt";
  className?: string;
};

function Mark({ shape, className = "" }: MarkProps) {
  const uid = useId().replace(/:/g, "");
  const grad = `mark-edge-${uid}`;
  const d = PATHS[shape];

  return (
    <svg
      className={`mark mark--${shape} ${className}`.trim()}
      viewBox="0 0 100 100"
      // The bevel sits outside the 100x100 box; without this it is clipped.
      overflow="visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grad} x1="6%" y1="4%" x2="94%" y2="96%">
          <stop offset="0%" stopColor="#b06cf5" />
          <stop offset="20%" stopColor="#5b5bf0" />
          <stop offset="40%" stopColor="#2fd0e8" />
          <stop offset="56%" stopColor="#f4f6fb" />
          <stop offset="72%" stopColor="#8fb6f7" />
          <stop offset="100%" stopColor="#7130e0" />
        </linearGradient>
      </defs>

      {/* The cut side of the material. */}
      <path
        className="mark-edge"
        d={d}
        fill={`url(#${grad})`}
        stroke={`url(#${grad})`}
      />

      {/* The top surface. */}
      <path className="mark-face" d={d} />

      {/* Where the light lands. Clipped to the face by the same path, so it
          runs along the inside of the silhouette rather than round it. */}
      <path className="mark-glint" d={d} />
    </svg>
  );
}

export default Mark;
