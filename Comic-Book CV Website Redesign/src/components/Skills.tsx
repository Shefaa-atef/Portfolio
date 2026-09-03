import { useInView } from "../hooks/useInView";
import skillsPhoto from "../../../src/assets/images/photos/about/2_about.png";

const groups = [
  { title: "MOBILE",   skills: ["Flutter", "Dart", "Provider", "MVVM", "Dio"],                   dark: true  },
  { title: "WEB",      skills: ["React", "JavaScript", "HTML", "CSS"],                            dark: false },
  { title: "DESIGN",   skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],               dark: false },
  { title: "BACKEND",  skills: ["Firebase", "Supabase", "SQL"],                                   dark: true  },
  { title: "CODE",     skills: ["Java", "Python", "C++", "SQL"],                                  dark: false },
  { title: "AI",       skills: ["Prompt Engineering", "AI-assisted Dev", "LLMs", "Workflows"],    dark: true  },
  { title: "CREATIVE", skills: ["Illustrator", "Photoshop", "Premiere Pro", "InDesign"],          dark: false },
];

export default function Skills() {
  const { ref, inView } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.05);

  return (
    <section className="border-b-4 border-black" ref={ref}>

      {/* Chapter header */}
      <div className="border-b-4 border-black grid grid-cols-[auto_1fr] items-stretch"
        style={{ animation: inView ? "wipe-in 0.5s ease-out both" : "none" }}>
        <div className="text-white font-comic text-5xl px-10 py-6 border-r-4 border-black tracking-wide"
          style={{ backgroundColor: "var(--ink-purple)" }}>
          CH.01
        </div>
        <div className="flex items-center px-10">
          <h2 className="font-comic text-5xl lg:text-7xl tracking-wide text-black"
            style={{ animation: inView ? "slam-left 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>
            THE ARSENAL
          </h2>
        </div>
      </div>

      {/* Photo + intro */}
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] border-b-4 border-black">
        <div className="relative overflow-hidden min-h-[320px] border-b-4 lg:border-b-0 lg:border-r-4 border-black"
          style={{ animation: inView ? "slam-left 0.55s cubic-bezier(0.22,1,0.36,1) 0.15s both" : "none" }}>
          <img
            src={skillsPhoto}
            alt="Comic book pages"
            className="photo-bw w-full h-full object-cover"
          />
          <div className="absolute inset-0 halftone opacity-[0.06] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 bg-black px-6 py-4 border-t-4 border-black">
            <p className="font-comic text-white text-2xl tracking-widest">7 SKILL SETS · ALL MASTERED</p>
          </div>
        </div>

        <div className="p-10 flex flex-col justify-center bg-white"
          style={{ animation: inView ? "slam-right 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none" }}>
          <p className="font-comic text-4xl lg:text-5xl text-black leading-tight mb-4">
            EVERY TOOL.<br />EVERY STACK.<br />ONE DEVELOPER.
          </p>
          <svg viewBox="0 0 200 60" width="180" height="55" className="opacity-70 mt-4">
            <path d="M10 30 Q80 10 170 30" stroke="#000" strokeWidth="3" fill="none"
              strokeLinecap="round" strokeDasharray="8 4" />
            <polygon points="170,22 162,38 178,36" fill="#000" />
          </svg>
          <span className="font-marker text-xl text-black/60 -mt-2">...seriously all of them</span>
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" ref={gridRef}>
        {groups.map((g, i) => (
          <div key={g.title}
            className={`border-r-4 border-b-4 border-black p-8 relative overflow-hidden hover-lift
              ${g.dark ? "bg-black text-white" : "bg-white text-black"}
              ${i === groups.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            style={{ animation: gridIn ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s both` : "none" }}>
            {g.dark && <div className="absolute inset-0 halftone opacity-[0.06] pointer-events-none" />}
            <div className={`font-comic text-4xl mb-5 ${g.dark ? "text-white" : "text-black"}`}>{g.title}</div>
            <div className="flex flex-wrap gap-2 relative z-10">
              {g.skills.map(s => (
                <span key={s}
                  className={`font-bb tag-zap text-sm font-bold uppercase tracking-wider px-3 py-1.5 border-2
                    ${g.dark ? "border-white text-white" : "border-black text-black"}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="border-r-4 border-b-4 border-black bg-white flex items-center justify-center p-6"
          style={{ animation: gridIn ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${groups.length * 0.07}s both` : "none" }}>
          <div className="text-center float-anim-slow">
            <div className="font-comic text-7xl leading-none text-black">+</div>
            <div className="font-comic text-2xl text-black/40 mt-2">GROWING</div>
          </div>
        </div>
      </div>
    </section>
  );
}
