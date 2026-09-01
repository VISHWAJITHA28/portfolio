import React, { useState } from "react";
import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import '../assets/styles/Project.scss';

/**
 * Projects as flip cards.
 *
 * WHY A FLIP RATHER THAN A LINK
 *     A grid of cards that each open a new tab makes people choose before they
 *     know what they are choosing. Flipping puts the detail on the back, so the
 *     grid stays scannable and the depth is one gesture away.
 *
 * WHY IT IS NOT HOVER-ONLY
 *     Hover does not exist on a phone and cannot be reached by keyboard. Each
 *     card is a real <button>, so it flips on click, on tap and on Enter, with
 *     hover as an extra on pointer devices. aria-pressed tells a screen reader
 *     which face is showing.
 */

type Project = {
  img: string;
  name: string;
  kind: string;
  body: string;
  stack: string[];
  href: string;
};

const PROJECTS: Project[] = [
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

function Card({ p }: { p: Project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`pcard${flipped ? " is-flipped" : ""}`}>
      <div className="pcard-inner">

        {/* front */}
        <button
          type="button"
          className="pcard-face pcard-front"
          aria-pressed={flipped}
          aria-label={`${p.name}. Show details.`}
          onClick={() => setFlipped(true)}
        >
          <span className="pcard-media">
            <img src={p.img} alt="" />
          </span>
          <span className="pcard-front-text">
            <span className="pcard-kind">{p.kind}</span>
            <span className="pcard-name">{p.name}</span>
          </span>
          <span className="pcard-hint" aria-hidden="true">Details</span>
        </button>

        {/* back */}
        <div className="pcard-face pcard-back">
          <span className="pcard-kind">{p.kind}</span>
          <h3 className="pcard-name">{p.name}</h3>
          <p className="pcard-body">{p.body}</p>

          <ul className="pcard-stack">
            {p.stack.map((s) => <li key={s}>{s}</li>)}
          </ul>

          <div className="pcard-actions">
            <a
              className="pcard-open"
              href={p.href}
              target="_blank"
              rel="noreferrer"
              // The back is only reachable once flipped, so its controls must
              // leave the tab order until then or keyboard users land on a
              // link they cannot see.
              tabIndex={flipped ? 0 : -1}
            >
              Open <span aria-hidden="true">&rarr;</span>
            </a>
            <button
              type="button"
              className="pcard-close"
              onClick={() => setFlipped(false)}
              tabIndex={flipped ? 0 : -1}
            >
              Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Project() {
  return (
    <section className="projects-container" id="projects">
      {/* What the glass frosts. Without something coloured behind them the
          panels have nothing to refract and read as flat grey boxes. */}
      <div className="pfield" aria-hidden="true">
        <span className="pfield-blob pfield-blob--a" />
        <span className="pfield-blob pfield-blob--b" />
        <span className="pfield-blob pfield-blob--c" />
      </div>

      <div className="mn-wrap">
        <p className="mn-slug">Selected work</p>
        <h1>Projects</h1>

        <div className="pgrid">
          {PROJECTS.map((p) => <Card key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  );
}

export default Project;
