import React from "react";
import '../assets/styles/Workspace.scss';

/**
 * The About section's image: a workspace, drawn as line art.
 *
 * WHY SVG AND NOT A RENDERED PNG
 *     This is a line drawing, and line drawings are the one thing rasters are
 *     worst at — a 2px stroke either softens or aliases at every size other
 *     than the one it was rendered for. As paths it is sharp at any width, it
 *     weighs a few kilobytes, and the stroke colour comes from the page's own
 *     ink token instead of being baked into pixels.
 *
 * HOW IT READS AS DRAWN RATHER THAN DIAGRAMMED
 *     Three things:
 *
 *     1. ONE STROKE WIDTH, round caps and joins throughout. Varying the
 *        weight to show hierarchy is what makes an illustration look like a
 *        technical diagram.
 *
 *     2. NOTHING IS QUITE SQUARE. Every edge is a couple of units off true.
 *        Perfectly level shelves and exactly vertical legs are the tell.
 *
 *     3. SHAPES ARE FILLED WITH THE GROUND, not left transparent, so a thing
 *        in front actually hides what is behind it. Outline-only art lets the
 *        desk run straight through the chair.
 */

function Workspace() {
  return (
    <svg
      className="wsp"
      viewBox="0 0 600 600"
      role="img"
      aria-label="Line drawing of a desk with a monitor, keyboard, lamp, chair, shelves of books and plants"
    >
      {/* Painted first and filled, so everything drawn later sits on top. */}
      <g className="wsp-fill">

        {/* ── wall: top floating shelf ── */}
        <path d="M186 104 L360 101 L361 116 L187 118 Z" />
        {/* small pot, left */}
        <path d="M203 82 L233 81 L229 104 L207 104 Z" />
        {/* tall pot, middle */}
        <path d="M258 88 L288 87 L285 103 L262 104 Z" />
        {/* framed picture, right */}
        <path d="M313 57 L353 56 L354 102 L314 103 Z" />

        {/* ── wall: left bookshelf ── */}
        <path d="M76 167 L268 164 L269 179 L77 181 Z" />
        {/* ── wall: right bookshelf ── */}
        <path d="M368 157 L553 154 L554 169 L369 171 Z" />

        {/* ── the desk ── */}
        {/* Top, as a shallow trapezoid: the front edge is longer than the
            back one, which is the whole of the perspective here. */}
        <path d="M31 351 L576 348 L586 378 L20 380 Z" />
        {/* left legs */}
        <path d="M96 379 L110 379 L112 533 L98 532 Z" />
        <path d="M133 379 L145 379 L147 508 L135 507 Z" />
        {/* drawer unit, right */}
        <path d="M470 379 L576 377 L578 541 L472 540 Z" />

        {/* ── monitor ── */}
        <path d="M232 221 L379 218 L381 318 L234 320 Z" />
        <path d="M298 320 L314 320 L316 337 L296 337 Z" />
        <path d="M270 337 L342 336 L344 349 L268 350 Z" />

        {/* ── on the desk ── */}
        {/* keyboard */}
        <path d="M237 338 L341 336 L350 357 L228 358 Z" />
        {/* mouse */}
        <path d="M357 338 Q374 337 375 346 Q376 355 366 356 Q356 356 355 347 Z" />
        {/* open notebook */}
        <path d="M166 341 L231 338 L236 366 L170 368 Z" />
        {/* desk calendar, as a tent */}
        <path d="M92 304 L154 301 L160 347 L86 349 Z" />
        {/* pen cup */}
        <path d="M175 308 L201 307 L198 345 L179 345 Z" />
        {/* little pot */}
        <path d="M388 298 L414 297 L411 323 L392 323 Z" />
        {/* stack of books */}
        <path d="M392 328 L462 326 L463 349 L393 350 Z" />
        {/* vase, far left */}
        <path d="M60 302 L95 300 L91 348 L66 349 Z" />

        {/* ── desk lamp ── */}
        <path d="M478 340 Q508 334 538 341 Q509 350 478 340 Z" />
        <path d="M428 194 L484 191 L472 228 L440 229 Z" />

        {/* ── chair ── */}
        <path d="M239 381 Q238 372 250 372 L338 370 Q350 370 349 381 L351 455 Q351 464 340 464 L248 466 Q237 466 237 456 Z" />
        <path d="M231 462 L355 459 Q364 459 363 469 L361 481 Q361 490 350 490 L236 492 Q225 492 226 482 L227 470 Q227 462 231 462 Z" />

        {/* ── bin ── */}
        <path d="M25 437 L92 435 L84 521 L34 522 Z" />

        {/* ── pinned to the wall ── */}
        <path d="M446 253 L508 251 L510 322 L448 324 Z" />
        <path d="M133 228 L169 226 L171 252 L135 254 Z" />
        <path d="M178 253 L214 251 L216 277 L180 279 Z" />
        <path d="M370 216 L406 214 L408 240 L372 242 Z" />
        <path d="M398 256 L434 254 L436 280 L400 282 Z" />
        <path d="M368 284 L404 282 L406 308 L370 310 Z" />
      </g>

      {/* ── everything above here again as outline, plus all the detail that
             needs no fill of its own ── */}
      <g className="wsp-line">

        {/* shelves */}
        <path d="M186 104 L360 101 L361 116 L187 118 Z" />
        <path d="M76 167 L268 164 L269 179 L77 181 Z" />
        <path d="M368 157 L553 154 L554 169 L369 171 Z" />

        {/* left shelf: books, one leaning */}
        <path d="M97 131 L109 130 L111 166 L99 167 Z" />
        <path d="M113 128 L124 127 L126 166 L115 166 Z" />
        <path d="M129 133 L139 132 L141 165 L131 166 Z" />
        <path d="M145 126 L157 125 L159 165 L147 165 Z" />
        <path d="M162 132 L172 131 L174 165 L164 165 Z" />
        <path d="M177 129 L189 128 L191 164 L179 165 Z" />
        <path d="M194 134 L204 133 L206 164 L196 164 Z" />
        <path d="M210 127 L222 126 L224 164 L212 164 Z" />
        <path d="M227 133 L237 132 L239 163 L229 164 Z" />
        {/* the leaning one, which is what stops a shelf looking like a chart */}
        <path d="M244 133 L254 137 L243 163 L233 160 Z" />

        {/* right shelf: books */}
        <path d="M388 128 L398 132 L387 156 L378 153 Z" />
        <path d="M402 122 L414 121 L416 156 L404 156 Z" />
        <path d="M419 127 L429 126 L431 155 L421 156 Z" />
        <path d="M435 120 L447 119 L449 155 L437 155 Z" />
        <path d="M452 126 L462 125 L464 155 L454 155 Z" />
        <path d="M468 121 L480 120 L482 154 L470 155 Z" />
        <path d="M485 127 L495 126 L497 154 L487 154 Z" />
        <path d="M501 122 L513 121 L515 154 L503 154 Z" />
        <path d="M518 128 L528 127 L530 153 L520 154 Z" />

        {/* top shelf: pots and their planting */}
        <path d="M203 82 L233 81 L229 104 L207 104 Z" />
        <path d="M201 82 L235 81" />
        <path d="M218 80 Q214 66 205 60" />
        <path d="M218 80 Q220 64 229 57" />
        <path d="M218 80 Q218 68 218 62" />

        <path d="M258 88 L288 87 L285 103 L262 104 Z" />
        <path d="M256 88 L290 87" />
        <path d="M273 86 Q266 62 254 48" />
        <path d="M273 86 Q277 60 290 46" />
        <path d="M273 86 Q272 62 271 44" />
        <path d="M273 86 Q262 66 250 60" />
        <path d="M273 86 Q285 66 296 61" />

        {/* framed picture: a horizon and a sun, which is all a frame this size
            can carry */}
        <path d="M313 57 L353 56 L354 102 L314 103 Z" />
        <path d="M318 88 Q328 74 336 84 Q342 90 349 86" />
        <circle cx="341" cy="69" r="5" />

        {/* ── the desk ── */}
        <path d="M31 351 L576 348 L586 378 L20 380 Z" />
        {/* the fold between top and front edge */}
        <path d="M31 351 L576 348" />
        <path d="M96 379 L110 379 L112 533 L98 532 Z" />
        <path d="M133 379 L145 379 L147 508 L135 507 Z" />

        {/* drawers */}
        <path d="M470 379 L576 377 L578 541 L472 540 Z" />
        <path d="M474 428 L577 426" />
        <path d="M475 480 L578 478" />
        <path d="M508 402 Q524 399 540 402" />
        <path d="M509 453 Q525 450 541 453" />
        <path d="M510 505 Q526 502 542 505" />

        {/* ── monitor ── */}
        <path d="M232 221 L379 218 L381 318 L234 320 Z" />
        <path d="M243 231 L369 229 L370 300 L244 302 Z" />
        <path d="M298 320 L314 320 L316 337 L296 337 Z" />
        <path d="M270 337 L342 336 L344 349 L268 350 Z" />
        {/* the little indicator, bottom bezel */}
        <path d="M298 310 L316 309" />

        {/* ── keyboard ── */}
        <path d="M237 338 L341 336 L350 357 L228 358 Z" />
        <path d="M245 342 L336 341" />
        <path d="M243 347 L339 346" />
        <path d="M240 352 L342 351" />

        {/* mouse */}
        <path d="M357 338 Q374 337 375 346 Q376 355 366 356 Q356 356 355 347 Z" />
        <path d="M365 338 L366 347" />

        {/* open notebook: gutter plus ruled lines */}
        <path d="M166 341 L231 338 L236 366 L170 368 Z" />
        <path d="M199 339 L204 367" />
        <path d="M174 348 L195 347" />
        <path d="M175 355 L196 354" />
        <path d="M208 347 L229 346" />
        <path d="M209 354 L230 353" />

        {/* desk calendar: spiral binding and a couple of ruled lines */}
        <path d="M92 304 L154 301 L160 347 L86 349 Z" />
        <path d="M124 302 L128 348" />
        <path d="M97 300 Q99 294 101 300" />
        <path d="M108 300 Q110 294 112 300" />
        <path d="M119 299 Q121 293 123 299" />
        <path d="M130 299 Q132 293 134 299" />
        <path d="M141 298 Q143 292 145 298" />
        <path d="M98 316 L118 315" />
        <path d="M99 326 L119 325" />
        <path d="M133 315 L153 314" />
        <path d="M134 325 L154 324" />

        {/* pen cup, with three pens at different heights */}
        <path d="M175 308 L201 307 L198 345 L179 345 Z" />
        <path d="M173 308 L203 307" />
        <path d="M181 307 L179 284" />
        <path d="M188 307 L189 276" />
        <path d="M195 307 L199 288" />

        {/* the little pot */}
        <path d="M388 298 L414 297 L411 323 L392 323 Z" />
        <path d="M386 298 L416 297" />
        <path d="M401 296 Q396 284 388 280" />
        <path d="M401 296 Q406 284 414 281" />
        <path d="M401 296 Q401 284 401 277" />

        {/* stack of books, three of them */}
        <path d="M392 328 L462 326 L463 349 L393 350 Z" />
        <path d="M393 336 L463 334" />
        <path d="M393 343 L463 341" />

        {/* vase and its leaves */}
        <path d="M60 302 L95 300 L91 348 L66 349 Z" />
        <path d="M58 302 L97 300" />
        <path d="M78 299 Q70 268 52 246" />
        <path d="M78 299 Q86 266 104 244" />
        <path d="M78 299 Q76 266 74 240" />
        <path d="M78 299 Q64 276 44 266" />
        <path d="M78 299 Q92 276 112 268" />
        <path d="M78 299 Q84 272 96 252" />

        {/* ── desk lamp: base, upright, elbow, shade ── */}
        <path d="M478 340 Q508 334 538 341 Q509 350 478 340 Z" />
        <path d="M505 338 L508 262" />
        <path d="M508 262 L462 210" />
        <path d="M428 194 L484 191 L472 228 L440 229 Z" />
        <path d="M440 229 L472 228" />
        <circle cx="508" cy="262" r="4" />

        {/* ── chair ── */}
        <path d="M239 381 Q238 372 250 372 L338 370 Q350 370 349 381 L351 455 Q351 464 340 464 L248 466 Q237 466 237 456 Z" />
        {/* the seam up the back, which is what makes it a chair back and not a
            rounded rectangle */}
        <path d="M294 371 L296 465" />
        <path d="M231 462 L355 459 Q364 459 363 469 L361 481 Q361 490 350 490 L236 492 Q225 492 226 482 L227 470 Q227 462 231 462 Z" />
        {/* post */}
        <path d="M287 490 L289 514" />
        <path d="M299 490 L301 514" />
        {/* spokes */}
        <path d="M294 514 L248 534" />
        <path d="M294 514 L272 543" />
        <path d="M294 514 L316 543" />
        <path d="M294 514 L340 533" />
        {/* castors */}
        <circle cx="245" cy="539" r="6" />
        <circle cx="270" cy="548" r="6" />
        <circle cx="318" cy="548" r="6" />
        <circle cx="343" cy="538" r="6" />

        {/* ── bin, with paper in it ── */}
        <path d="M25 437 L92 435 L84 521 L34 522 Z" />
        <path d="M23 437 L94 435" />
        <circle cx="44" cy="450" r="8" />
        <circle cx="61" cy="446" r="9" />
        <circle cx="77" cy="452" r="7" />

        {/* ── to-do list ── */}
        <path d="M446 253 L508 251 L510 322 L448 324 Z" />
        <path d="M454 266 L494 265" />
        <path d="M456 279 L462 278 L463 285 L457 286 Z" />
        <path d="M468 281 L500 280" />
        <path d="M457 293 L463 292 L464 299 L458 300 Z" />
        <path d="M469 295 L501 294" />
        <path d="M458 307 L464 306 L465 313 L459 314 Z" />
        <path d="M470 309 L502 308" />
        {/* its pin */}
        <path d="M472 245 L482 244 L483 253 L473 254 Z" />

        {/* ── sticky notes, each on its own little clip ── */}
        <g>
          <path d="M133 228 L169 226 L171 252 L135 254 Z" />
          <path d="M145 219 L155 218 L156 227 L146 228 Z" />
          <path d="M139 238 L163 237" />
        </g>
        <g>
          <path d="M178 253 L214 251 L216 277 L180 279 Z" />
          <path d="M190 244 L200 243 L201 252 L191 253 Z" />
          <path d="M184 263 L208 262" />
        </g>
        <g>
          <path d="M370 216 L406 214 L408 240 L372 242 Z" />
          <path d="M382 207 L392 206 L393 215 L383 216 Z" />
          <path d="M376 226 L400 225" />
        </g>
        <g>
          <path d="M398 256 L434 254 L436 280 L400 282 Z" />
          <path d="M410 247 L420 246 L421 255 L411 256 Z" />
          <path d="M404 266 L428 265" />
        </g>
        <g>
          <path d="M368 284 L404 282 L406 308 L370 310 Z" />
          <path d="M380 275 L390 274 L391 283 L381 284 Z" />
          <path d="M374 294 L398 293" />
        </g>
      </g>
    </svg>
  );
}

export default Workspace;
