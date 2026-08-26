import React from "react";
import '../assets/styles/About.scss';

function About() {
    return (
    <div className="container" id="about">
        <div className="about-container">
            <h1>About Me</h1>
            <div className="about-body">
                <p className="about-lead">
                    Hi, Vishwajitha here.
                </p>
                <p>
                    I build AI systems and take them the whole way, from <span className="about-highlight">development
                    to deployment</span>, from <span className="about-highlight">prototype to production</span>. That
                    last stretch is the part I care about most. A model in a notebook and a model serving
                    real users are two very different things, and the distance between them is where most
                    projects quietly stop.
                </p>
                <p>
                    Most of my work so far has been in healthcare, building clinical tools where being wrong
                    actually matters. An assistant that must not invent a citation. A record that must not
                    cross a hospital boundary. Working under constraints that strict has taught me more about
                    engineering than any project where a wrong answer was merely inconvenient.
                </p>
                <p>
                    That does not mean healthcare is the only place I want to work. It is simply where the
                    problems found me first. Agentic pipelines, retrieval that cites its sources, computer
                    vision, and the infrastructure to run all of it, none of that is specific to medicine.
                    It travels. Finance, research, logistics, climate, anywhere a decision has to be made
                    from messy data and defended afterwards. I am actively looking to work across more of
                    those fields, not fewer.
                </p>
                <p>
                    If you are building something in a domain I have not touched yet, I would treat that as a
                    reason to talk rather than a reason not to.
                </p>
            </div>
        </div>
    </div>
    );
}

export default About;
