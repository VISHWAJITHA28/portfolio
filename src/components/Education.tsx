import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCertificate } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const coursework = [
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Computer Vision",
    "Natural Language Processing",
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Operating Systems",
];

const certifications = [
    "Salesforce AI Agents",
    "Agentic Workflows",
];

function Education() {
    return (
    <div className="container" id="education">
        <div className="skills-container">
            <h1>Education</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faGraduationCap} size="3x"/>
                    <h3>B.Tech, Computer Science (AI &amp; ML)</h3>
                    <p>
                        Kakatiya Institute of Science and Technology &middot; 2022 to 2026
                        <br/><br/>
                        A degree specialised in artificial intelligence and machine learning
                        rather than general computer science, which is why the projects here
                        lean toward models and pipelines rather than web applications.
                    </p>
                    <div className="flex-chips">
                        <span className="chip-title">Coursework:</span>
                        {coursework.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faCertificate} size="3x"/>
                    <h3>Certified AgentForce Specialist</h3>
                    <p>
                        Salesforce &middot; August 2025
                        <br/><br/>
                        Certification in building and deploying AI agents: designing the
                        actions an agent can take, grounding it in real data, and setting the
                        boundaries of what it is allowed to decide on its own.
                    </p>
                    <div className="flex-chips">
                        <span className="chip-title">Covers:</span>
                        {certifications.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Education;
