import { useInView } from "../hooks/useInView";

const langs = [
  { name: "Arabic",  level: "Native",                bars: 5, tag: "مرحباً"   },
  { name: "English", level: "B2 — Upper Intermediate", bars: 4, tag: "Hello!"  },
  { name: "Turkish", level: "A2 — Elementary",         bars: 2, tag: "Merhaba!"},
  { name: "Italian", level: "A1 — Beginner",            bars: 1, tag: "Ciao!"  },
];

const activities = [
  {
    org: "GDSC", full: "Google Developer Student Clubs", role: "Active Member",
    desc: "Workshops, tech talks, and community-driven development projects.",
  },
  {
    org: "Shoman", full: "Abdul Hameed Shoman Foundation", role: "Volunteer",
    desc: "Cultural and scientific community events and programs.",
  },
  {
    org: "Osboha 180°", full: "Youth Development Program", role: "Volunteer",
    desc: "Personal development sessions and leadership workshops for youth.",
  },
];

export default function Languages() {
  const { ref: hRef, inView: hIn } = useInView();
  const { ref: lRef, inView: lIn } = useInView();
  const { ref: rRef, inView: rIn } = useInView();

  return (
    <section className="border-b-4 border-black">

      <div ref={hRef} className="border-b-4 border-black grid grid-cols-[auto_1fr] items-stretch"
        style={{ animation: hIn ? "wipe-in 0.5s ease-out both" : "none" }}>
        <div className="text-white font-comic text-5xl px-10 py-6 border-r-4 border-black tracking-wide"
          style={{ backgroundColor: "var(--ink-purple)" }}>
          CH.04
        </div>
        <div className="flex items-center px-10">
          <h2 className="font-comic text-5xl lg:text-7xl tracking-wide text-black"
            style={{ animation: hIn ? "slam-left 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>
            ALLIANCES
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Languages */}
        <div ref={lRef} className="border-b-4 lg:border-b-0 lg:border-r-4 border-black p-10 lg:p-14 bg-white"
          style={{ animation: lIn ? "slam-left 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>
          <div className="font-comic text-5xl text-black mb-8">LANGUAGES<br className="xl:hidden" /> SPOKEN</div>

          <div className="space-y-5">
            {langs.map(({ name, level, bars, tag }, i) => (
              <div key={name}
                className="border-4 border-black p-5 bg-white hover-lift cursor-default"
                style={{
                  boxShadow: "5px 5px 0 #000",
                  animation: lIn ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.08}s both` : "none",
                }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-comic text-3xl">{name}</span>
                    <span className="font-bb ml-3 text-sm font-bold uppercase tracking-wider text-black/45">{level}</span>
                  </div>
                  <span className="font-marker text-xl text-black/50">{tag}</span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j}
                      className="h-4 flex-1 border-2 border-black transition-colors"
                      style={{ backgroundColor: j < bars ? (["var(--ink-purple)", "var(--ink-blue)", "var(--ink-pink)"][j % 3]) : "#fff" }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteering */}
        <div ref={rRef} className="bg-black text-white p-10 lg:p-14 relative overflow-hidden"
          style={{ animation: rIn ? "slam-right 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>
          <div className="absolute inset-0 halftone opacity-[0.07] pointer-events-none" />
          <div className="relative z-10">
            <div className="font-comic text-5xl text-white mb-8">
              SIDE<span className="block xl:inline xl:ml-3">QUESTS</span>
            </div>
            <div className="font-comic text-white/40 text-xl tracking-[0.2em] uppercase mb-6">
              Leadership & Volunteering
            </div>

            <div className="space-y-5">
              {activities.map(({ org, full, role, desc }, i) => (
                <div key={org}
                  className="p-6 hover:bg-white/5 transition-colors hover-lift cursor-default"
                  style={{
                    border: "3px solid rgba(255,255,255,0.25)",
                    animation: rIn ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.1}s both` : "none",
                  }}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="font-comic text-3xl text-white">{org}</div>
                      <div className="font-bb text-sm font-bold text-white/45 uppercase tracking-wider">{full}</div>
                    </div>
                    <span className="border-2 border-white/40 text-white/60 font-comic text-base px-3 py-1 flex-shrink-0">
                      {role}
                    </span>
                  </div>
                  <p className="font-bb text-white/70 text-base leading-relaxed mt-2">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-8">
              <svg viewBox="0 0 100 50" width="90" height="45">
                <path d="M8 40 Q40 5 85 20" stroke="white" strokeWidth="3" fill="none"
                  strokeLinecap="round" strokeDasharray="7 3" />
                <polygon points="85,12 78,26 92,24" fill="white" />
              </svg>
              <span className="font-marker text-xl text-white/55">community first!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
