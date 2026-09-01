import { useEffect } from "react";
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
    // The theme toggle that used to live in the nav is gone; nothing calls it
    // any more. The state and its handler went with it - CI builds treat an
    // unused binding as an error, so dead code here is not free.
    //
    // The class stays 'dark-mode' because that is what this rendered before,
    // and a handful of rules in TechMarquee.scss and Education.scss still key
    // off it. Nothing about the page changes.

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
    <div className="main-container dark-mode">
        <FadeIn transitionDuration={700}>
            <Main/>
            <About/>
            <Statement/>
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