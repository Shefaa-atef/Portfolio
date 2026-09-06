import { useInView } from "../../About/hooks/useInView";
import ChapterHeader from "../../About/components/ChapterHeader";

const PARTNERS = [
  {
    issue: "ISSUE #01",
    tag: "VOLUNTEER CORPS",
    english: "Jordanian Volunteer Program",
    arabic: "برنامج التطوع الأردني",
    color: "#189bd5",
    textColor: "#ffffff",
    rotate: "rotate-[-1.8deg]",
  },
  {
    issue: "ISSUE #02",
    tag: "READING ALLIANCE",
    english: "Osbouha 180",
    arabic: "أصبوحة 180",
    color: "#74128f",
    textColor: "#ffffff",
    rotate: "rotate-[1.5deg]",
  },
  {
    issue: "ISSUE #03",
    tag: "PATRIOTIC GUILD",
    english: "Eltazem Le Yamer Al-Watan",
    arabic: "التزم ليعمر الوطن",
    color: "#e999cf",
    textColor: "#050405",
    rotate: "rotate-[-1.2deg]",
  },
  {
    issue: "ISSUE #04",
    tag: "VISIONARY CREW",
    english: "The Dreamers",
    arabic: "الحالمون",
    color: "#ffcc00",
    textColor: "#050405",
    rotate: "rotate-[2deg]",
  },
  {
    issue: "ISSUE #05",
    tag: "DEV SQUAD",
    english: "Google Developer Student Clubs",
    subEnglish: "(GDSC)",
    arabic: "نادي جوجل للطلبة المطورين",
    color: "#159fc5",
    textColor: "#ffffff",
    rotate: "rotate-[-1.5deg]",
  },
];

export default function CollaborationsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="organizations" className="border-b-4 border-black bg-[#fffdf0] text-black overflow-hidden relative" ref={ref}>
      <ChapterHeader
        chapter="CH.06"
        overline="ORGANIZATIONS & PARTNERS"
        title="THE SQUAD ALLIANCE LEAGUE!"
        titleId="designs-collaborations-title"
        inView={inView}
        accent="#ffcc00"
        ink="#000"
      />

      <div className="p-6 md:p-10 lg:p-14 max-w-7xl mx-auto">
        {/* Creative Comic Badges Grid with Centered Bottom Row */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {PARTNERS.map((p, i) => (
            <div
              key={p.english}
              className={`w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] p-6 border-4 border-black bg-white shadow-[8px_8px_0_#000] flex flex-col justify-between transition-all duration-200 ${p.rotate} hover:rotate-0 hover:-translate-y-2 hover:shadow-[12px_12px_0_#000] relative overflow-hidden group`}
              style={{
                animation: inView
                  ? `panel-slam 0.55s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.08}s both`
                  : "none",
              }}
            >
              {/* Comic Halftone Pattern Accent */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1.2px, transparent 1.3px)",
                  backgroundSize: "8px 8px",
                }}
              />

              {/* Comic Card Header Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-3 border-black">
                  <span
                    className="font-comic text-xs font-bold px-3 py-1 border-2 border-black uppercase tracking-wider shadow-[2px_2px_0_#000]"
                    style={{ backgroundColor: p.color, color: p.textColor }}
                  >
                    {p.tag}
                  </span>
                  <span className="font-comic text-xs text-gray-800 tracking-widest font-bold">
                    {p.issue}
                  </span>
                </div>

                {/* English Name - Bold Comic Display */}
                <h3 className="font-comic text-2xl lg:text-3xl text-black leading-none mb-4 uppercase tracking-tight group-hover:text-[var(--ink-purple)] transition-colors">
                  {p.english}
                  {p.subEnglish && (
                    <span className="block text-xl text-[var(--ink-blue)] mt-1">
                      {p.subEnglish}
                    </span>
                  )}
                </h3>
              </div>

              {/* Arabic Name - Speech Bubble Stamp */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-400 flex justify-end">
                <div className="inline-block px-4 py-2 border-2 border-black bg-[#fff3a1] shadow-[3px_3px_0_#000] rounded-sm transform rotate-[-1deg]">
                  <span className="font-bold text-lg text-black block font-sans" dir="rtl">
                    {p.arabic}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
