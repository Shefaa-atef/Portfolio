import { useEffect } from "react";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Languages from "./components/Languages";
import AwardsAndTraining from "./components/AwardsAndTraining";
import Contact from "./components/Contact";
import SpiderCursor from "../../animations/cursor/spider/SpiderCursor.jsx";
import InvertedSelection from "../../components/common/InvertedSelection.jsx";
import "./AboutPage.css";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <SpiderCursor />
      <InvertedSelection />

      <a
        className="cv-return"
        href="/"
        aria-label="Return to the main portfolio"
      >
        <span className="cv-return__arrow" aria-hidden="true">←</span>
        <span>Back</span>
      </a>

      <div className="min-h-full bg-white text-black">
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Languages />
        <AwardsAndTraining />
        <Contact />
      </div>
    </>
  );
}
