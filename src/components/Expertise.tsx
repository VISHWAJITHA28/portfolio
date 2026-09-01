import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Expertise.scss';

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faDiagramProject} size="3x"/>
                    <h3>Agentic AI &amp; RAG</h3>
                    <p>I build multi-agent pipelines where each stage has one job and the graph decides what runs next. My retrieval systems are built so every answer can be traced back to the document it came from, and a hallucinated citation is caught before anyone reads it.</p>                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>Machine Learning &amp; Vision</h3>
                    <p>Imaging and prediction models that run where they are needed. Chest X-ray analysis for clinical decision support, on-device inference tuned small enough to work without a server, and cheminformatics models for molecular screening.</p>                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>From Development to Deployment</h3>
                    <p>The part most portfolios skip. I take systems the whole way: multi-tenant database isolation, role-aware authentication, containers, CI/CD pipelines on Azure, and the security review that finds the endpoint nobody checked.</p>                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
