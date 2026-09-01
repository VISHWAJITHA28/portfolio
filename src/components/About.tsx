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
                    I take things from <span className="about-highlight">development to
                    deployment</span>. Most of my work has been in healthcare AI, but that is
                    where the problems found me, not the limit of what I want to build.
                </p>
                <p>
                    I do it because I like making things I wished already existed.
                </p>
            </div>
        </div>
    </div>
    );
}

export default About;
