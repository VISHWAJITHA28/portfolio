import React, { useEffect, useRef, useState } from "react";
import '../assets/styles/PillNav.scss';

/**
 * The pill, and the menu behind its three dots.
 *
 * Shared by the hero and the footer so the page opens and closes on the same
 * device, with `tone` switching it for the dark ground rather than duplicating
 * the markup.
 *
 * A dropdown is easy to build and easy to get wrong. This one covers the four
 * things people actually hit:
 *   - Escape closes it and returns focus to the button, so a keyboard user is
 *     not stranded inside a closed menu
 *   - a click anywhere outside closes it
 *   - the links leave the tab order while closed, so Tab does not walk through
 *     invisible items
 *   - aria-expanded is on the button, so a screen reader is told the state
 *     rather than left to guess
 */

const SECTIONS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#history" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function PillNav({ tone = "light", id }: { tone?: "light" | "dark"; id: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const menuId = `${id}-menu`;

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      btn.current?.focus();
    };
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div className={`pill pill--${tone}${open ? " is-open" : ""}`} ref={wrap}>
      <div className="pill-bar">
        <span className="pill-name">Vishwajitha</span>
        <button
          type="button"
          className="pill-btn"
          ref={btn}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="pill-dots" aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>
      </div>

      <div className="pill-menu" id={menuId} role="menu" aria-hidden={!open}>
        {SECTIONS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            role="menuitem"
            className="pill-item"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default PillNav;
