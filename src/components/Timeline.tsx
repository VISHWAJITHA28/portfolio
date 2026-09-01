import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Timeline.scss';

/**
 * Career history as three briefcases that open.
 *
 * WHAT WAS WRONG WITH THE OLD ONE
 *     A stock vertical timeline: three white boxes down a rule, each holding
 *     a paragraph. Everything worth reading — 85%, 98%, 40+ classes, 30
 *     seconds — was buried mid-sentence, and the component brought its own
 *     stylesheet that fought the rest of the page.
 *
 * WHAT REPLACED IT
 *     1. THE CASES OPEN. Hovering one swings its lid back and the contents
 *        unfold underneath. The briefcase icon was already the section's
 *        motif; this makes it do something instead of sitting there.
 *
 *     2. THE NUMBERS COME OUT OF THE PROSE and become chips. They are the
 *        strongest thing in the copy and they were invisible in a paragraph.
 *
 *     3. THERE IS A RAIL. Three boxes in a row are three jobs; a rail with
 *        ticks under them is a career. It runs oldest to newest left to
 *        right, so the most recent role lands under the "Now" end.
 *
 * THEY ALL CLOSE, AND THE PANEL COSTS NO SPACE
 *     Nothing is open until you point at one, and moving the pointer off the
 *     row shuts them again.
 *
 *     The obvious way to do that leaves a hole: reserve the panel's height so
 *     the page does not jump, and you are left with a gap under the cases
 *     whenever they are closed. Collapsing the gap instead makes every open
 *     and close drag the rest of the page up and down under the cursor.
 *
 *     So the panel takes NO space at all. Its stage is zero-height and the
 *     panel overlays what follows, like any popover. No gap closed, no shift
 *     open. The panel is opaque for exactly that reason - it has the section
 *     below showing through it otherwise.
 *
 * IT IS A TABLIST, NOT A ROW OF BUTTONS
 *     Exactly one of a set is selected and each controls its own panel, which
 *     is the tab pattern — so it carries tab semantics and answers the arrow
 *     keys, and hover is only an extra on top for pointer devices.
 */

type Role = {
  id: string;
  company: string;
  role: string;
  when: string;
  body: string;
  /** Pulled out of the prose. These are what people actually scan for. */
  chips: string[];
  current?: boolean;
};

// Oldest first: the rail reads left to right, so "now" belongs on the right.
const ROLES: Role[] = [
  {
    id: "sdk",
    company: "SDK Technologies",
    role: "Machine Learning Intern",
    when: "Jan — Jun 2025",
    body: "A MobileNetV2 and TensorFlow Lite vision system recognising produce on the device itself, with OpenCV pipelines handling preprocessing and inference in real time.",
    chips: ["98% accuracy", "40+ classes", "On-device inference"],
  },
  {
    id: "abhyasana",
    company: "Abhyasana Technologies",
    role: "System Infrastructure Automation Intern",
    when: "May — Jul 2025",
    body: "Server-client architecture, web server configuration and load balancing, with cloud deployment and scaling strategies for enterprise applications.",
    chips: ["Load balancing", "Cloud deployment", "Scaling strategy"],
  },
  {
    id: "velyra",
    company: "Ve Lyra Labs",
    role: "Generative AI Intern",
    when: "Mar 2026 — present",
    body: "Building an enterprise healthcare AI platform, now scaling into a multi-tenant B2B service: an electronic health record, a diagnostic imaging tool, an agentic clinical research assistant and hospital intelligence dashboards.",
    chips: ["85% less review time", "Cited answers in ~30s", "90% accuracy"],
    current: true,
  },
];

function Timeline() {
  const [open, setOpen] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys are expected of anything carrying tab semantics, and they are
  // the only way to reach the other panels without a pointer.
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(null); return; }
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const from = open ?? (step > 0 ? -1 : 0);
    const next = (from + step + ROLES.length) % ROLES.length;
    setOpen(next);
    tabs.current[next]?.focus();
  };

  // Only on devices that actually hover. On touch, mouseleave fires after a
  // tap and would close the panel the tap just opened.
  const onLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) setOpen(null);
  };

  // Tab away from the row and it closes too, so the keyboard behaves the same
  // way the pointer does. relatedTarget is where focus is GOING; if that is
  // still inside the row, this is just movement between the cases.
  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
  };

  return (
    <section className="hist" id="history">
      <div className="mn-wrap">

        <p className="mn-slug">Where I have worked</p>
        <h1>Career History</h1>
        <p className="hist-lede">
          Three roles, all of them AI that had to survive outside a notebook.
          Open one.
        </p>

        <div
          className="hist-row"
          role="tablist"
          aria-label="Career history"
          onKeyDown={onKey}
          onMouseLeave={onLeave}
          onBlur={onBlur}
        >
          {ROLES.map((r, i) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              id={`case-tab-${r.id}`}
              aria-selected={i === open}
              aria-controls={`case-panel-${r.id}`}
              // Roving tabindex: one stop for the whole set, then arrow keys
              // move within it. Three separate tab stops for what is really
              // one control is the usual way this pattern goes wrong.
              tabIndex={open === null ? (i === 0 ? 0 : -1) : (i === open ? 0 : -1)}
              ref={(el) => { tabs.current[i] = el; }}
              className={`case${i === open ? " is-open" : ""}`}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
            >
              <span className="case-obj" aria-hidden="true">
                <span className="case-handle" />
                {/* Hinges at its top edge and swings back. */}
                <span className="case-lid">
                  <FontAwesomeIcon icon={faBriefcase} />
                </span>
                <span className="case-shell" />
              </span>

              <span className="case-label">
                <span className="case-co">
                  {r.company}
                  {r.current && <span className="case-now">Now</span>}
                </span>
                <span className="case-when">{r.when}</span>
              </span>

              <span className="case-tick" aria-hidden="true" />
            </button>
          ))}

          {/* Drawn once behind the whole row, so it is a continuous line
              rather than three segments with the grid gaps punched through. */}
          <span className="hist-rail" aria-hidden="true" />
        </div>

        {/* Fixed-height stage. Each panel gets its own grid cell in a single
            row so they stack, and only the open one is painted — swapping
            between them never moves anything else on the page. */}
        {/* Zero-height stage: the panels are laid out in its grid columns so
            each lines up under its own case, but the stage itself takes no
            space, so they overlay what follows instead of reserving a gap for
            it. No gap when closed, no page shift when opening. */}
        <div className="hist-panels">
          {ROLES.map((r, i) => (
            <div
              key={r.id}
              id={`case-panel-${r.id}`}
              role="tabpanel"
              aria-labelledby={`case-tab-${r.id}`}
              className={`case-panel${i === open ? " is-open" : ""}`}
            >
              <p className="case-panel-when">{r.when}</p>
              <h3 className="case-panel-role">{r.role}</h3>
              <p className="case-panel-co">{r.company}</p>
              <p className="case-panel-body">{r.body}</p>
              <ul className="case-chips">
                {r.chips.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Timeline;
