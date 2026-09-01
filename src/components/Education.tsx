import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCertificate } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Education.scss';

function Education() {
    return (
    <div className="container" id="education">
        <div className="skills-container">
            <h1>Education</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faGraduationCap} size="3x"/>
                    <h3>B.Tech, Computer Science (AI &amp; ML)</h3>
                    <p>Kakatiya Institute of Science and Technology &middot; 2022 to 2026</p>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faCertificate} size="3x"/>
                    <h3>Certified AgentForce Specialist</h3>
                    <p>Salesforce &middot; August 2025</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Education;
