import { useState, useEffect } from "react";
import { useInView } from "../../About/hooks/useInView";
import ChapterHeader from "../../About/components/ChapterHeader";
import info1 from "../../../assets/images/photos/designs/designs infographics/LIFE RULES-01.png";
import info2 from "../../../assets/images/photos/designs/designs infographics/features-01.png";
import info3 from "../../../assets/images/photos/designs/designs infographics/أصبوحة-21.jpg";
import info4 from "../../../assets/images/photos/designs/designs infographics/اصبوحة-10.jpg";
import info5 from "../../../assets/images/photos/designs/designs infographics/الجهاد بالمال.webp";
import info6 from "../../../assets/images/photos/designs/designs infographics/خلف المقود.webp";
import info7 from "../../../assets/images/photos/designs/designs infographics/صلاة الروح 2-01.webp";
import info8 from "../../../assets/images/photos/designs/designs infographics/عصب الوجود.webp";
import info9 from "../../../assets/images/photos/designs/designs infographics/فلسطين-01.webp";
import info10 from "../../../assets/images/photos/designs/designs infographics/مراقبة 1-1-1-01.webp";
import info11 from "../../../assets/images/photos/designs/designs infographics/هندسة النصر.webp";

const INFOGRAPHICS = [
  { id: 1, title: "LIFE RULES", src: info1, badge: "INFOGRAPHIC #01" },
  { id: 2, title: "FEATURES", src: info2, badge: "INFOGRAPHIC #02" },
  { id: 3, title: "OSBOUHA 21", src: info3, badge: "INFOGRAPHIC #03" },
  { id: 4, title: "OSBOUHA 10", src: info4, badge: "INFOGRAPHIC #04" },
  { id: 5, title: "FINANCIAL JIHAD", src: info5, badge: "INFOGRAPHIC #05" },
  { id: 6, title: "BEHIND THE WHEEL", src: info6, badge: "INFOGRAPHIC #06" },
  { id: 7, title: "PRAYER OF THE SOUL", src: info7, badge: "INFOGRAPHIC #07" },
  { id: 8, title: "NERVE OF EXISTENCE", src: info8, badge: "INFOGRAPHIC #08" },
  { id: 9, title: "PALESTINE", src: info9, badge: "INFOGRAPHIC #09" },
  { id: 10, title: "SURVEILLANCE", src: info10, badge: "INFOGRAPHIC #10" },
  { id: 11, title: "ENGINEERING OF VICTORY", src: info11, badge: "INFOGRAPHIC #11" },
];

export default function InfographicGallery() {
  const { ref, inView } = useInView(0.1);
  const [activeItem, setActiveItem] = useState<typeof INFOGRAPHICS[number] | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    if (activeItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  return (
    <section className="border-b-4 border-black bg-[#fffdf0] overflow-hidden" ref={ref}>
      <ChapterHeader
        chapter="CH.03"
        overline="INFOGRAPHICS & POSTER PANELS"
        title="THE VISUAL CHRONICLES!"
        titleId="designs-infographics-title"
        inView={inView}
        accent="var(--ink-pink)"
        ink="#000"
      />

      <div className="p-6 md:p-10 lg:p-14 max-w-[1600px] mx-auto">
        {/* High-Impact 2-Column Masonry Grid — Pure Poster Focus */}
        <div className="columns-1 md:columns-2 lg:columns-2 gap-8 lg:gap-12 space-y-8 lg:space-y-12">
          {INFOGRAPHICS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveItem(item); }}
              title="Click to inspect poster in high resolution"
              className="break-inside-avoid border border-black/10 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 group cursor-pointer overflow-hidden p-3 sm:p-4"
              style={{
                animation: inView
                  ? `panel-slam 0.55s cubic-bezier(0.22,1,0.36,1) ${0.08 + index * 0.05}s both`
                  : "none",
              }}
            >
              {/* High-Res Native Aspect Ratio Poster Image Container */}
              <div className="bg-white overflow-hidden relative rounded-2xl">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto block group-hover:scale-[1.015] transition-transform duration-300 rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none rounded-2xl">
                  <span className="opacity-0 group-hover:opacity-100 font-comic text-lg text-white bg-black/85 px-4 py-2 rounded-xl shadow-lg transition-opacity uppercase tracking-wider font-bold">
                    🔍 CLICK TO ENLARGE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More on Behance CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://www.behance.net/shefaalhindi"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-comic text-2xl lg:text-3xl text-white border-3 md:border-4 border-black bg-[var(--ink-purple)] shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-[10px_10px_0_#000] transition-all rounded-xl uppercase font-bold group cursor-pointer"
            style={{
              animation: inView
                ? "kaboom 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both"
                : "none",
            }}
          >
            <span>SEE MORE ON BEHANCE</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* High-Res Modal Overlay */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[9990] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} preview`}
        >
          <div
            className="relative max-w-[92vw] max-h-[92vh] bg-white border-2 border-black/20 shadow-2xl p-4 sm:p-6 rounded-3xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute -top-4 -right-4 bg-yellow-300 text-black border-2 border-black font-comic font-bold text-lg px-4 py-1.5 shadow-lg hover:bg-white active:translate-y-0.5 transition-all z-20 rounded-xl"
              aria-label="Close high resolution preview"
            >
              CLOSE ×
            </button>
            <img
              src={activeItem.src}
              alt={activeItem.title}
              className="max-h-[82vh] max-w-[85vw] object-contain block rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
