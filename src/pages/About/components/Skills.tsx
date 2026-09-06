import { useState } from "react";
import { useInView } from "../hooks/useInView";
import ChapterHeader from "./ChapterHeader";

import skillsFeaturePhoto from "../../../assets/images/photos/about/2_about.webp";
import mobilePhoto from "../../../assets/images/photos/about/phone.webp";
import webPhoto from "../../../assets/images/photos/about/web.webp";
import designPhoto from "../../../assets/images/photos/about/creative.webp";
import backendPhoto from "../../../assets/images/photos/about/backend.webp";
import codePhoto from "../../../assets/images/photos/about/code.webp";
import aiPhoto from "../../../assets/images/photos/about/ai.webp";
import creativePhoto from "../../../assets/images/photos/about/creative.webp";

const groups = [
  { title: "Mobile", photo: mobilePhoto, skills: ["Flutter", "Dart", "Provider", "MVVM", "Dio"] },
  { title: "Web", photo: webPhoto, skills: ["React", "JavaScript", "HTML", "CSS"] },
  { title: "Design", photo: designPhoto, skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"] },
  { title: "Backend", photo: backendPhoto, skills: ["Firebase", "Supabase", "SQL"] },
  { title: "Code", photo: codePhoto, skills: ["Java", "Python", "C++", "SQL"] },
  { title: "AI", photo: aiPhoto, skills: ["Prompt Engineering", "AI-assisted Dev", "LLMs", "Workflows"] },
  { title: "Creative", photo: creativePhoto, skills: ["Illustrator", "Photoshop", "Premiere Pro", "InDesign"] },
];

export default function Skills() {
  const { ref, inView } = useInView(0.08);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="about-skills" ref={ref} aria-labelledby="about-skills-title">
      <ChapterHeader
        chapter="CH.01"
        overline="Tools / tricks / power-ups"
        title="The arsenal."
        titleId="about-skills-title"
        inView={inView}
      />

      <div className="about-skills__feature">
        {/* Static Feature Photo (Never changes on hover) */}
        <figure style={{ animation: inView ? "slam-left 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>
          <img
            src={skillsFeaturePhoto}
            alt="Comic book pages - Design, Code, Ship"
            className="w-full h-full object-cover"
          />
          <figcaption className="z-20">Design → Code → Ship</figcaption>
        </figure>

        <div className="about-skills__statement"
          style={{ animation: inView ? "slam-right 0.6s cubic-bezier(0.22,1,0.36,1) 0.18s both" : "none" }}>
          <span>07 disciplines</span>
          <p>I design the plan, code the thing, and teach the robots to help—without dropping the plot.</p>
          <div aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>

      <div className="about-skills__directory" onMouseLeave={() => setHoveredIndex(null)}>
        {groups.map(({ title, photo, skills }, index) => (
          <article
            key={title}
            className={`about-skills__row cursor-pointer relative transition-colors duration-150 ${index === hoveredIndex ? "bg-black text-white" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            style={{ animation: inView ? `panel-slam 0.45s cubic-bezier(0.22,1,0.36,1) ${0.18 + index * 0.055}s both` : "none" }}
          >
            <span className="about-skills__number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <ul>
              {skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>

            {/* Floating Comic Photo Card Popup on Hover (Right Side) */}
            {hoveredIndex === index && (
              <div
                className="hidden lg:flex flex-col absolute right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none border-4 border-black bg-white shadow-[12px_12px_0_#000] rotate-[1.5deg] overflow-hidden w-80 h-52 lg:w-[380px] lg:h-[240px] transition-opacity duration-150 ease-out"
              >
                <div className="bg-[var(--ink-purple)] px-4 py-1.5 border-b-3 border-black flex justify-between items-center text-white">
                  <span className="font-comic text-sm uppercase tracking-wider font-bold">{title}</span>
                  <span className="text-xs font-bold font-sans bg-[#ffcc00] text-black px-2 py-0.5 border border-black rounded uppercase font-bold">
                    DISCIPLINE 0{index + 1}
                  </span>
                </div>
                <div className="flex-1 overflow-hidden bg-black relative">
                  <img
                    src={photo}
                    alt={title}
                    className="w-full h-full object-cover photo-bw"
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
