import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCertificate } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Education.scss';

/**
 * Education, and certifications underneath it.
 *
 * WHY THEY ARE NOT THE SAME GRID
 *     They were, and it read wrong: a four-year degree and a one-day exam
 *     sitting in two equal cells under one heading claimed they were the same
 *     kind of thing. A certification is a footnote to an education, so it goes
 *     below it as a ruled list — the shape says "and also" rather than "as
 *     well as".
 *
 *     It is a list, not a single row, because there will be more of them.
 */

const CERTS = [
  {
    name: "Certified AgentForce Specialist",
    issuer: "Salesforce",
    when: "August 2025",
  },
];

function Education() {
  return (
    <section className="container" id="education">
      <div className="skills-container">
        <h1>Education</h1>

        <div className="skills-grid">
          <div className="skill">
            <FontAwesomeIcon icon={faGraduationCap} size="3x" />
            <h3>B.Tech, Computer Science (AI &amp; ML)</h3>
            <p>Kakatiya Institute of Science and Technology &middot; 2022 to 2026</p>
          </div>
        </div>

        <div className="certs">
          <p className="certs-title">Certifications</p>
          <ul className="certs-list">
            {CERTS.map((c) => (
              <li className="cert" key={c.name}>
                <FontAwesomeIcon className="cert-icon" icon={faCertificate} />
                <span className="cert-name">{c.name}</span>
                <span className="cert-meta">
                  {c.issuer} &middot; {c.when}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Education;
