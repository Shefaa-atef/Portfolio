import { useInView } from "../hooks/useInView";
import educationPhoto from "../../../src/assets/images/photos/about/5_about.png";

const courses = [
  "Algorithms & Data Structures",
  "Object-Oriented Programming",
  "Database Systems",
  "Software Engineering",
  "Computer Networks",
  "Operating Systems",
  "Artificial Intelligence",
  "Human-Computer Interaction",
];

export default function Education() {
  const { ref: hRef, inView: hIn } = useInView();
  const { ref: lRef, inView: lIn } = useInView();
  const { ref: rRef, inView: rIn } = useInView();

  return (
    <section className="border-b-4 border-black">

      <div ref={hRef} className="border-b-4 border-black grid grid-cols-[auto_1fr] items-stretch"
        style={{ animation: hIn ? "wipe-in 0.5s ease-out both" : "none" }}>
        <div className="text-white font-comic text-5xl px-10 py-6 border-r-4 border-black tracking-wide"
          style={{ backgroundColor: "var(--ink-blue)" }}>
          CH.03
        </div>
        <div className="flex items-center px-10">
          <h2 className="font-comic text-5xl lg:text-7xl tracking-wide text-black"
            style={{ animation: hIn ? "slam-left 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>
            THE TRAINING ARC
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left */}
        <div ref={lRef} className="border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col"
          style={{ animation: lIn ? "slam-left 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>

          <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
            <img
              src={educationPhoto}
              alt="Books and study"
              className="photo-bw w-full h-full object-cover absolute inset-0 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 halftone opacity-[0.07] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 border-t-4 border-black bg-black px-8 py-4">
              <p className="font-comic text-white text-3xl tracking-widest">HASHEMITE UNIVERSITY</p>
            </div>
          </div>

          <div className="p-10 bg-white flex-1 flex flex-col justify-center">
            <div className="font-comic text-5xl lg:text-6xl text-black mb-1 leading-tight">
              B.Sc. Computer<br className="xl:hidden" /> Science
            </div>
            <div className="font-comic text-2xl text-black/50 mb-8 tracking-wider">2020 — 2024</div>

            <div className="grid grid-cols-3 gap-0 border-4 border-black shadow-ink-xl">
              {[
                { val: "3.87", sub: "GPA / 4.00", i: 0 },
                { val: "#1",   sub: "In Class",   i: 1 },
                { val: "HON.", sub: "Distinction", i: 2 },
              ].map(({ val, sub, i }) => (
                <div key={sub}
                  className="p-5 text-center border-r-4 last:border-r-0 border-black hover-lift transition-all"
                  style={{ backgroundColor: i === 1 ? "var(--ink-purple)" : "#fff", color: i === 1 ? "#fff" : "#000" }}>
                  <div className="font-comic text-5xl leading-none">{val}</div>
                  <div className="text-xs font-bold uppercase tracking-widest mt-1 opacity-60">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div ref={rRef} className="bg-black text-white p-10 lg:p-14 relative overflow-hidden"
          style={{ animation: rIn ? "slam-right 0.55s cubic-bezier(0.22,1,0.36,1) 0.15s both" : "none" }}>
          <div className="absolute inset-0 halftone opacity-[0.08] pointer-events-none" />
          <div className="relative z-10">
            <div className="font-comic text-white/40 text-xl tracking-[0.25em] uppercase mb-3">Relevant Coursework</div>
            <div className="font-comic text-5xl text-white mb-8">SKILLS<br className="xl:hidden" /> UNLOCKED:</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.map((c, i) => (
                <div key={i}
                  className="flex items-center gap-4 border-2 border-white/25 px-4 py-3 hover:border-white hover:bg-white/10 transition-colors hover-lift cursor-default"
                  style={{ animation: rIn ? `panel-slam 0.45s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.06}s both` : "none" }}>
                  <span className="font-comic text-white/40 text-lg w-7 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-bb text-white text-base font-medium">{c}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 border-4 border-white rounded-3xl px-6 py-4 inline-block relative hover-lift"
              style={{ animation: rIn ? "kaboom 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s both" : "none" }}>
              <p className="font-comic text-2xl text-white">"THE THEORY BEHIND THE CODE."</p>
              <div className="absolute -bottom-5 left-8 flex gap-1">
                {[6, 4, 3].map((s, i) => (
                  <div key={i} className="rounded-full bg-white" style={{ width: s, height: s }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
