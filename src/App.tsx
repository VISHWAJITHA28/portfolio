import React, {useState, useEffect} from "react";
import {
  Main,
  Motion,
  Statement,
  About,
  Timeline,
  Education,
  TechMarquee,
  Project,
  Contact,
  Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <FadeIn transitionDuration={700}>
            <Main/>
            <Statement/>
            <About/>
            <TechMarquee/>
            <Project/>
            <Timeline/>
            <Education/>
            <Contact/>
        </FadeIn>
        <Footer />
        <Motion/>
    </div>
    );
}

export default App;