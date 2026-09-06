import { useInView } from "../hooks/useInView";
import ChapterHeader from "./ChapterHeader";

const AWARDS = [
  {
    title: "First Place — Nahnu Youth Innovation Hackathon",
    track: "Water Conservation Track",
    year: "2026",
    badge: "1st PLACE WINNER",
    color: "#ffcc00",
    textColor: "#000",
    desc: "Won 1st place in a national hackathon for water/waste management; led product ideation, UI/UX, and development.",
  },
  {
    title: "Top 5 — Samsung Solve for Tomorrow",
    track: "National Innovation Challenge",
    year: "2019",
    badge: "TOP 5 FINALIST",
    color: "var(--ink-purple)",
    textColor: "#fff",
    desc: "Finalist for designing and developing a technology-based plant-health solution.",
  },
  {
    title: "Top 10 — Zarqa Green Projects Hackathon / IRADA",
    track: "Eco-Tech Innovation (138 Entries)",
    year: "2024",
    badge: "TOP 10 FINALIST",
    color: "var(--ink-blue)",
    textColor: "#fff",
    desc: "Selected among the top 10 of 138 entries for designing an eco-focused app promoting sustainable habits via digital engagement.",
  },
];

const TRAINING = [
  {
    title: "Artificial Intelligence",
    provider: "Samsung Innovation Campus",
    tag: "AI & ML INTENSIVE",
    color: "var(--ink-pink)",
  },
  {
    title: "Flutter & Dart",
    provider: "Academind / Udemy",
    tag: "MOBILE DEV ARCHITECTURE",
    color: "var(--ink-blue)",
  },
  {
    title: "Python Training",
    provider: "STEAM Center & ZINC",
    tag: "CORE PROGRAMMING & DATA",
    color: "#ffcc00",
  },
];

export default function AwardsAndTraining() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="about-awards border-b-4 border-black bg-[#fdfaf5] text-black overflow-hidden" ref={ref} aria-labelledby="about-awards-title">
      <ChapterHeader
        chapter="CH.05"
        overline="HACKATHONS & TRAINING"
        title="TROPHIES & POWER-UPS!"
        titleId="about-awards-title"
        inView={inView}
        accent="#ffcc00"
        ink="#000"
      />

      {/* Awards Section - Full-width edge-to-edge background */}
      <div className="w-full bg-white border-b-4 border-black">
        <div className="p-6 md:p-10 lg:p-14 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-comic text-xs text-[var(--ink-purple)] uppercase tracking-widest block font-bold mb-1">
                NATIONAL COMPETITIONS & HACKATHONS
              </span>
              <h3 className="font-comic text-3xl lg:text-4xl text-black uppercase leading-tight">
                AWARDS & RECOGNITIONS
              </h3>
            </div>
            <span className="hidden sm:inline-block font-comic text-xl px-4 py-1.5 border-2 border-black bg-[#ffcc00] shadow-[3px_3px_0_#000] rotate-[-2deg]">
              3 TROPHIES UNLOCKED 🏆
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {AWARDS.map((award, index) => (
              <div
                key={award.title}
                className="p-6 border-4 border-black bg-[#faf8f5] shadow-[8px_8px_0_#000] flex flex-col justify-between hover:-translate-y-2 hover:shadow-[12px_12px_0_#000] transition-all relative overflow-hidden group"
                style={{
                  animation: inView
                    ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s both`
                    : "none",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-3 border-black">
                    <span
                      className="font-comic text-xs font-bold px-3 py-1 border-2 border-black uppercase tracking-wider shadow-[2px_2px_0_#000]"
                      style={{ backgroundColor: award.color, color: award.textColor }}
                    >
                      {award.badge}
                    </span>
                    <span className="font-comic text-sm font-bold text-black border-b-2 border-black">
                      {award.year}
                    </span>
                  </div>

                  <h4 className="font-comic text-2xl text-black leading-none mb-2 uppercase group-hover:text-[var(--ink-purple)] transition-colors">
                    {award.title}
                  </h4>
                  <span className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-4 font-sans">
                    {award.track}
                  </span>

                  <p className="font-sans text-sm text-gray-700 leading-relaxed font-semibold">
                    ● {award.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Section - Full-width edge-to-edge background */}
      <div className="w-full bg-[#16121f] text-white">
        <div className="p-6 md:p-10 lg:p-14 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-comic text-xs text-[var(--ink-pink)] uppercase tracking-widest block font-bold mb-1">
                SKILL CERTIFICATIONS & COURSES
              </span>
              <h3 className="font-comic text-3xl lg:text-4xl text-white uppercase leading-tight">
                SPECIALIZED TRAINING
              </h3>
            </div>
            <span className="hidden sm:inline-block font-comic text-xl px-4 py-1.5 border-2 border-white bg-[var(--ink-purple)] text-white shadow-[3px_3px_0_#fff] rotate-[2deg]">
              POWER-UPS LOADED ⚡
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TRAINING.map((item, index) => (
              <div
                key={item.title}
                className="p-6 border-4 border-white bg-black shadow-[8px_8px_0_var(--ink-purple)] flex flex-col justify-between hover:-translate-y-2 hover:shadow-[12px_12px_0_var(--ink-pink)] transition-all relative overflow-hidden group"
                style={{
                  animation: inView
                    ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${0.25 + index * 0.08}s both`
                    : "none",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-gray-700">
                    <span
                      className="font-comic text-xs font-bold px-3 py-1 border border-white uppercase tracking-wider text-black"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.tag}
                    </span>
                    <span className="font-comic text-xs text-gray-400 uppercase tracking-widest font-bold">
                      PROGRAM 0{index + 1}
                    </span>
                  </div>

                  <h4 className="font-comic text-2xl text-white leading-none mb-3 uppercase group-hover:text-[#ffcc00] transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-sans text-xs font-bold text-[var(--ink-pink)] uppercase tracking-wider">
                      INSTITUTION:
                    </span>
                    <span className="font-sans text-sm font-semibold text-gray-300">
                      {item.provider}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
