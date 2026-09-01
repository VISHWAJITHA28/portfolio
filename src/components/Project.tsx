import React, { useCallback, useRef, useState } from "react";
import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import '../assets/styles/Project.scss';

/**
 * Projects as a deck of cards.
 *
 * WHY A DECK RATHER THAN A GRID
 *     A grid asks you to choose before you know what you are choosing, and
 *     seven equal tiles give no signal about where to start. A deck hands you
 *     one at a time at a size where the whole card can be read — cover, what
 *     it is, what it does, what it is built with — so nothing is hidden on a
 *     back face and there is nothing to hunt for.
 *
 * THE THROW
 *     Clicking sends the top card off through one of eight exits: four
 *     corners, four sides, picked at random and never the same one twice
 *     running. Randomising it is the point. A card that always leaves stage
 *     right reads as a carousel, which is the one thing a deck is not.
 *
 * WHY THE CARD IS NOT A BUTTON
 *     It contains a link, and an interactive element nested inside another is
 *     invalid and unreachable by keyboard. Instead a transparent button fills
 *     the card beneath the content, so a click anywhere throws it while the
 *     Open link, which sits above that button, still behaves like a link.
 *
 * CYCLING, NOT DISCARDING
 *     A thrown card goes to the bottom of the pile rather than being spent, so
 *     the deck never empties and nothing becomes unreachable. It reappears
 *     with its transition suppressed for one frame — otherwise it would fly
 *     back across the screen to reach its new place instead of just being
 *     there.
 */

type Work = {
  img: string;
  name: string;
  kind: string;
  body: string;
  stack: string[];
  href: string;
};

const PROJECTS: Work[] = [
  {
    img: mock07,
    name: "Ve Lyra",
    kind: "Healthcare platform",
    body: "A multi-tenant hospital operating system in production. Four role-based portals over one shared FHIR R4 record, with schema-per-tenant isolation and per-module JWT auth.",
    stack: ["FastAPI", "PostgreSQL", "Azure", "Next.js"],
    href: "https://www.ve-lyra.com/",
  },
  {
    img: mock01,
    name: "Drug Discovery",
    kind: "Agentic pipeline",
    body: "Ten agents as a LangGraph state machine, narrowing thousands of compounds to ten candidate leads. The RL loop stops itself once rewards plateau.",
    stack: ["LangGraph", "PyTorch", "RDKit"],
    href: "https://github.com/VISHWAJITHA28/Drug_discovery",
  },
  {
    img: mock02,
    name: "Diagnostic Support",
    kind: "Clinical AI",
    body: "Chest X-ray analysis with ICD-10 differentials and PubMed-cited evidence through a hybrid FAISS and BM25 index. A separate safety agent can veto any output.",
    stack: ["FastAPI", "LLaMA-3", "FAISS"],
    href: "https://github.com/VISHWAJITHA28/diagnostic-decision-support",
  },
  {
    img: mock03,
    name: "MedResearch",
    kind: "Retrieval agent",
    body: "Summaries, evidence scoring and synthesis across several medical papers at once. Answers only from what you uploaded, and cites it.",
    stack: ["FastAPI", "Gemini", "ChromaDB"],
    href: "https://github.com/VISHWAJITHA28/medresearch-agent",
  },
  {
    img: mock04,
    name: "Fitness Plans",
    kind: "Adaptive training",
    body: "Training plans that adapt to health conditions like arthritis, asthma and diabetes, not only to goals, with nutrition and weight tracking.",
    stack: ["Flask", "React", "Chart.js"],
    href: "https://github.com/VISHWAJITHA28/fitness-plan-generator",
  },
  {
    img: mock05,
    name: "Credit Scoring",
    kind: "ML on DeFi data",
    body: "A credit score from 0 to 1000 for DeFi wallets, from Aave V2 transaction history across six behavioural dimensions.",
    stack: ["scikit-learn", "pandas"],
    href: "https://github.com/VISHWAJITHA28/Credit_Score",
  },
  {
    img: mock06,
    name: "Wallet Risk",
    kind: "On-chain scoring",
    body: "Risk scoring for Ethereum wallets from Compound V2 lending activity, pulled from The Graph and normalised to 0–1000.",
    stack: ["Python", "The Graph"],
    href: "https://github.com/VISHWAJITHA28/Wallet_Risk_Scoring",
  },
];

/** The eight exits. Each is a class in Project.scss carrying its own throw. */
const EXITS = ["tl", "tr", "bl", "br", "lt", "rt", "up", "dn"];

/** How long a throw runs. Must match the transition duration in the SCSS. */
const THROW_MS = 640;

/** How many cards are drawn behind the top one. Below this the pile hides. */
const DEPTH = 3;

function Project() {
  // Indices into PROJECTS, front to back. Throwing rotates this array.
  const [order, setOrder] = useState(() => PROJECTS.map((_, i) => i));
  const [thrown, setThrown] = useState<{ index: number; exit: string } | null>(null);
  // The card that has just landed at the back, held for one frame with its
  // transition off so it does not animate across the page to get there.
  const [snapping, setSnapping] = useState<number | null>(null);
  const lastExit = useRef("");
  const busy = useRef(false);

  const pickExit = () => {
    let exit = lastExit.current;
    while (exit === lastExit.current) {
      exit = EXITS[Math.floor(Math.random() * EXITS.length)];
    }
    lastExit.current = exit;
    return exit;
  };

  /** Bring `target` to the front, throwing whatever is on top now. */
  // `order` is a dependency rather than being read through a state updater:
  // side effects inside an updater run twice under StrictMode, which would
  // schedule the throw twice and leave the deck a card out of step.
  const dealTo = useCallback((target: number) => {
    if (busy.current) return;
    const top = order[0];
    if (target === top) return;
    busy.current = true;

    const settle = () => {
      const at = order.indexOf(target);
      setOrder([...order.slice(at), ...order.slice(0, at)]);
      setThrown(null);
      setSnapping(top);
      // Two frames: one for React to paint the card at its new depth with the
      // transition suppressed, the next to hand the transition back.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setSnapping(null);
          busy.current = false;
        }),
      );
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }
    setThrown({ index: top, exit: pickExit() });
    window.setTimeout(settle, THROW_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const topIndex = order[0];

  return (
    <section className="projects-container" id="projects">
      {/* What the glass frosts. Without something coloured behind them the
          panels have nothing to refract and read as flat grey boxes. */}
      <div className="pfield" aria-hidden="true">
        <span className="pfield-blob pfield-blob--a" />
        <span className="pfield-blob pfield-blob--b" />
        <span className="pfield-blob pfield-blob--c" />
      </div>

      <div className="mn-wrap pdeck-layout">

        <div className="pdeck-side">
          <p className="mn-slug">Selected work</p>
          <h1>Projects</h1>
          <p className="pdeck-lede">
            Click a card to throw it. Seven in the deck, and it never runs out.
          </p>

          {/* Doubles as a contents page and as navigation, so nothing in the
              deck sits more than one click away. */}
          <ol className="pdeck-index">
            {PROJECTS.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  className={`pdeck-index-btn${i === topIndex ? " is-current" : ""}`}
                  onClick={() => dealTo(i)}
                  aria-current={i === topIndex ? "true" : undefined}
                >
                  <span className="pdeck-index-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pdeck-index-name">{p.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="pdeck">
          {PROJECTS.map((p, i) => {
            const depth = order.indexOf(i);
            const isTop = depth === 0;
            const flying = thrown?.index === i;

            const cls = [
              "pdeck-card",
              depth > DEPTH && !flying ? "is-buried" : "",
              flying ? `is-thrown to-${thrown!.exit}` : "",
              snapping === i ? "is-snapping" : "",
            ].filter(Boolean).join(" ");

            return (
              <article
                key={p.name}
                className={cls}
                style={{
                  // Read by the stylesheet to place the card in the pile.
                  "--i": Math.min(depth, DEPTH + 1),
                  "--tilt": `${(depth % 2 ? 1 : -1) * Math.min(depth, DEPTH) * 1.5}deg`,
                } as React.CSSProperties}
                aria-hidden={!isTop}
              >
                {/* Fills the card beneath the content, so a click anywhere
                    throws it. The Open link sits above and still wins. */}
                <button
                  type="button"
                  className="pdeck-throw"
                  onClick={() => dealTo(order[1 % order.length])}
                  tabIndex={isTop ? 0 : -1}
                  aria-label={`Throw ${p.name} and deal the next project`}
                />

                <div className="pdeck-media">
                  <img src={p.img} alt="" />
                  <span className="pdeck-count">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="pdeck-text">
                  <span className="pdeck-kind">{p.kind}</span>
                  <h3 className="pdeck-name">{p.name}</h3>
                  <p className="pdeck-body">{p.body}</p>

                  <ul className="pdeck-stack">
                    {p.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>

                  <a
                    className="pdeck-open"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    // Buried cards must leave the tab order, or keyboard users
                    // land on links they cannot see.
                    tabIndex={isTop ? 0 : -1}
                  >
                    Open <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Project;
