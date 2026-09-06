import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import SpiderCursor from '../../animations/cursor/spider/SpiderCursor'
import InvertedSelection from '../../components/common/InvertedSelection'
import '../../pages/About/AboutPage.css'
import './Projects.css'

export default function Projects() {
  return (
    <div className="projects-page min-h-full bg-[#faf7f0] text-black">
      <SpiderCursor />
      <InvertedSelection />

      {/* Return to home button */}
      <a
        className="cv-return"
        href={import.meta.env.BASE_URL}
        aria-label="Return to the main portfolio"
      >
        <span className="cv-return__arrow" aria-hidden="true">←</span>
        <span>Back</span>
      </a>

      <main>
        {/* Top Header Bar */}
        <div
          className="border-b-4 border-black flex flex-wrap items-center justify-between pl-6 sm:pl-8 pr-[130px] sm:pr-[170px] py-3 gap-3"
          style={{ backgroundColor: "var(--ink-purple)" }}
        >
          <span className="font-comic text-white text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.25em]">
            PORTFOLIO COMICS — ISSUE #03: PROJECTS
          </span>
          <span className="font-comic text-white/50 text-lg hidden sm:inline tracking-widest">
            2025 — 2026
          </span>
        </div>

        {/* Hero Section */}
        <header className="projects-hero">
          <div className="projects-hero__eyebrow">Shefa Atef / Selected work</div>
          <h1>Ideas into <span>action!</span></h1>
          <div className="projects-hero__bottom">
            <p>Useful apps. Thoughtful interfaces. A little comic-book energy.</p>
            <div className="projects-hero__note">Move cursor over artwork! ✦</div>
          </div>
          <nav aria-label="Jump to project">
            {projects.map((project, index) => (
              <a key={project.id} href={`#${project.id}`}>
                <span>0{index + 1}</span> {project.name} <span aria-hidden="true">↘</span>
              </a>
            ))}
          </nav>
        </header>

        {/* Projects List */}
        <section className="projects-list" aria-label="Selected projects">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>

        {/* Footer */}
        <footer className="projects-footer">
          <span>Next chapter?</span>
          <h2>Let’s build something.</h2>
          <a href="mailto:shefaalhendi@gmail.com">Get in touch ↗</a>
          <a href={`${import.meta.env.BASE_URL}designs/`}>Explore my designs →</a>
        </footer>
      </main>
    </div>
  )
}
