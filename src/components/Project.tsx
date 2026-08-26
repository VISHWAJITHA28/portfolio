import React from "react";
import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://www.ve-lyra.com/" target="_blank" rel="noreferrer"><img src={mock07} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.ve-lyra.com/" target="_blank" rel="noreferrer"><h2>Ve Lyra Healthcare Platform</h2></a>
                <p>My current work: a multi-tenant hospital operating system running in production. Four role-based portals for patients, doctors, administrators and pharmacy teams, all reading from one shared FHIR R4 record. I built the schema-per-tenant isolation that keeps hospitals separate at the database level, per-module JWT authentication, an agentic clinical research assistant that answers only from PubMed, FDA, NIH and WHO with citations, and a DICOM diagnostic tool that cut clinician scan-review time by 85%. Source is private.</p>
            </div>
            <div className="project">
                <a href="https://github.com/VISHWAJITHA28/Drug_discovery" target="_blank" rel="noreferrer"><img src={mock01} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/VISHWAJITHA28/Drug_discovery" target="_blank" rel="noreferrer"><h2>AI Drug Discovery</h2></a>
                <p>Ten specialised agents run as a LangGraph state machine, narrowing thousands of compounds down to ten candidate leads. The reinforcement loop exits early when rewards plateau, and molecular dynamics is opt-in because it is the most expensive stage by a wide margin. Built with LangGraph, PyTorch, RDKit and FastAPI.</p>
            </div>
            <div className="project">
                <a href="https://github.com/VISHWAJITHA28/diagnostic-decision-support" target="_blank" rel="noreferrer"><img src={mock02} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/VISHWAJITHA28/diagnostic-decision-support" target="_blank" rel="noreferrer"><h2>Diagnostic Decision Support</h2></a>
                <p>Multi-agent clinical decision support with chest X-ray analysis, ICD-10 coded differentials, and PubMed-cited evidence retrieved through a hybrid FAISS and BM25 index. The safety agent runs as a separate process so it can veto an output the diagnosis agent was confident about.</p>
            </div>
            <div className="project">
                <a href="https://github.com/VISHWAJITHA28/medresearch-agent" target="_blank" rel="noreferrer"><img src={mock03} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/VISHWAJITHA28/medresearch-agent" target="_blank" rel="noreferrer"><h2>MedResearch Agent</h2></a>
                <p>Upload medical papers and get plain-language summaries, an evidence-quality score, and a synthesis comparing findings across several at once. The chatbot answers only from the uploaded documents and cites them, rather than filling gaps from whatever the model already believes.</p>
            </div>
            <div className="project">
                <a href="https://github.com/VISHWAJITHA28/fitness-plan-generator" target="_blank" rel="noreferrer"><img src={mock04} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/VISHWAJITHA28/fitness-plan-generator" target="_blank" rel="noreferrer"><h2>Fitness Plan Generator</h2></a>
                <p>Personalised training plans that adapt to health conditions such as arthritis, asthma and diabetes, not just to fitness goals, with workout logging, meal nutrition and weight tracking on a charted dashboard. Built with Flask, SQLite, React and Chart.js.</p>
            </div>
            <div className="project">
                <a href="https://github.com/VISHWAJITHA28/Credit_Score" target="_blank" rel="noreferrer"><img src={mock05} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/VISHWAJITHA28/Credit_Score" target="_blank" rel="noreferrer"><h2>DeFi Credit Scoring</h2></a>
                <p>A machine learning scoring engine that assigns a credit score from 0 to 1000 to DeFi wallets based on Aave V2 transaction history, evaluated across six behavioural dimensions including repayment patterns and liquidation rate.</p>
            </div>
            <div className="project">
                <a href="https://github.com/VISHWAJITHA28/Wallet_Risk_Scoring" target="_blank" rel="noreferrer"><img src={mock06} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/VISHWAJITHA28/Wallet_Risk_Scoring" target="_blank" rel="noreferrer"><h2>Wallet Risk Scoring</h2></a>
                <p>Risk scoring for Ethereum wallets based on Compound V2 lending activity, pulled from The Graph subgraph and normalised to a 0 to 1000 scale using repayment rates, liquidation counts and asset diversity.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;
