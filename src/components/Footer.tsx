import React from "react";
import '../assets/styles/Footer.scss'

/**
 * The footer, as a closing frame rather than a strip of small print.
 *
 * WHY IT INVERTS
 *     Going to near-black here is what makes the page feel like it ENDS. A
 *     cream footer just runs out; a dark one shuts the door.
 *
 *     No pill nav down here. The hero has one; repeating it in the footer put
 *     the name on screen twice within a scroll of the contact column that
 *     already carries it, and read as a duplicate rather than a bookend.
 *
 * THE WATERMARK
 *     The name set enormous along the bottom edge and deliberately clipped.
 *     The clipping is the point: a name that fits reads as a heading, a name
 *     running off the frame reads as a mark. It is aria-hidden, since it only
 *     repeats what the pill above already says.
 */

const QUICK = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  return (
    <footer className="foot">
      <div className="mn-wrap foot-grid">

        {/* Deliberately NOT "from prototype to production" — that is the
            Statement section's line, and repeating it verbatim here made the
            footer read as a duplicate rather than a close. This one turns the
            same idea outward: an invitation, sitting right beside the contact
            column it is meant to send you to. */}
        <h2 className="foot-statement">
          Let&rsquo;s build AI<br />
          that grows<br />
          with you.
        </h2>

        <div className="foot-col">
          <p className="foot-col-title">/Quick links</p>
          <ul className="foot-links">
            {QUICK.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="foot-col">
          <p className="foot-col-title">/Contact</p>
          <a className="foot-mail" href="mailto:byruvishwajitha@gmail.com">
            byruvishwajitha@gmail.com
          </a>
          <div className="foot-social">
            <a href="https://github.com/VISHWAJITHA28" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/vishwajithabyru28/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

      </div>

      <div className="foot-mark" aria-hidden="true">VISHWAJITHA</div>
    </footer>
  );
}

export default Footer;
