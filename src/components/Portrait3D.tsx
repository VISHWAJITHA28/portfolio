import React from "react";
import byru from '../assets/images/byru.jpg';
import '../assets/styles/Portrait3D.scss';

/**
 * The portrait as an actual object rather than a rotated rectangle.
 *
 * WHAT MAKES A ROTATION READ AS 3D
 *     Three things, and a plain rotateY has none of them:
 *
 *     1. THICKNESS. A real card has an edge. Turn a zero-depth plane and at
 *        90 degrees it vanishes completely, which is the tell. Here a side
 *        face sits at translateZ so there is always something to see.
 *
 *     2. LIGHT THAT MOVES. A surface turning away from a fixed light gets
 *        darker. The shade layer's opacity is driven from the rotation, so
 *        the face dims as it turns and recovers as it comes back.
 *
 *     3. A SHADOW THAT TRACKS. Cast shadows shift and soften as an object
 *        turns. A static box-shadow pins the card flat to the page no matter
 *        what the transform says.
 *
 *     Perspective is deliberately short (900px, not 1400): the nearer the
 *     vanishing point, the stronger the foreshortening, and foreshortening is
 *     what the eye reads as depth.
 */
function Portrait3D({ variant }: { variant: "hero" | "about" }) {
  return (
    <div className={`p3d p3d--${variant}`}>
      <div className="p3d-card">
        <div className="p3d-face">
          <img src={byru} alt="Byru Vishwajitha" />
          {/* Light falloff across the face, strengthened by GSAP as it turns. */}
          <span className="p3d-shade" aria-hidden="true" />
          {/* A narrow specular band, so the surface reads as something with a
              finish rather than as printed paper. */}
          <span className="p3d-sheen" aria-hidden="true" />
        </div>

        {/* The card's edge. Pushed out on Z so it is genuinely beside the
            face in space, not drawn next to it. */}
        <div className="p3d-edge" aria-hidden="true" />
      </div>

      {/* Cast shadow, on its own plane below the card. */}
      <div className="p3d-shadow" aria-hidden="true" />
    </div>
  );
}

export default Portrait3D;
