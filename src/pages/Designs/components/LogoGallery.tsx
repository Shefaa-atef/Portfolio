import { useState, useEffect, useRef } from "react";
import { useInView } from "../../About/hooks/useInView";
import ChapterHeader from "../../About/components/ChapterHeader";

import logo1 from "../../../assets/images/photos/designs/logos/logo 1.png";
import logo2 from "../../../assets/images/photos/designs/logos/logo 2.png";
import logo3 from "../../../assets/images/photos/designs/logos/logo 3.png";
import logo4 from "../../../assets/images/photos/designs/logos/logo 4.png";
import logo5 from "../../../assets/images/photos/designs/logos/logo 5.png";
import logo6 from "../../../assets/images/photos/designs/logos/logo 6.png";

const LOGOS = [
  { id: 1, title: "BRAND MARK #01", src: logo1, badge: "LOGO #01" },
  { id: 2, title: "BRAND MARK #02", src: logo2, badge: "LOGO #02" },
  { id: 3, title: "BRAND MARK #03", src: logo3, badge: "LOGO #03" },
  { id: 4, title: "BRAND MARK #04", src: logo4, badge: "LOGO #04" },
  { id: 5, title: "BRAND MARK #05", src: logo5, badge: "LOGO #05" },
  { id: 6, title: "BRAND MARK #06", src: logo6, badge: "LOGO #06" },
];

export default function LogoGallery() {
  const { ref, inView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<typeof LOGOS[number] | null>(null);

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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -560 : 560;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="border-b-4 border-black bg-[#f2fafc] pb-12 w-full overflow-hidden" ref={ref}>
      <ChapterHeader
        chapter="CH.02"
        overline="LOGOS & BRAND IDENTITIES"
        title="THE HERO MARKS & EMBLEMS!"
        titleId="designs-logos-title"
        inView={inView}
        accent="var(--ink-blue)"
        ink="#fff"
      />

      {/* Full-width container */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 space-y-4 mt-6">
        {/* Navigation Buttons */}
        <div className="flex justify-end items-center mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="font-comic text-base sm:text-lg px-5 py-2 bg-white text-black border-3 border-black shadow-[4px_4px_0_#000] hover:bg-[#ffcc00] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-y-0.5 transition-all uppercase font-bold cursor-pointer rounded-md"
              aria-label="Scroll logos left"
            >
              ◄ PREV
            </button>
            <button
              onClick={() => scroll("right")}
              className="font-comic text-base sm:text-lg px-5 py-2 bg-white text-black border-3 border-black shadow-[4px_4px_0_#000] hover:bg-[#ffcc00] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-y-0.5 transition-all uppercase font-bold cursor-pointer rounded-md"
              aria-label="Scroll logos right"
            >
              NEXT ►
            </button>
          </div>
        </div>

        {/* Frameless Big Logo Showcase Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-10 overflow-x-hidden pb-6 pt-2 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {LOGOS.map((logo, index) => (
            <div
              key={logo.id}
              onClick={() => setActiveItem(logo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveItem(logo); }}
              title="Click to inspect logo mark in high resolution"
              className="w-[320px] sm:w-[440px] md:w-[540px] lg:w-[600px] flex-shrink-0 snap-start bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-between cursor-pointer p-6 sm:p-8"
              style={{
                animation: inView
                  ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${0.08 + index * 0.07}s both`
                  : "none",
              }}
            >
              {/* Pure Image Container — Photo focus */}
              <div className="bg-white flex items-center justify-center aspect-square w-full overflow-hidden relative rounded-2xl">
                <img
                  src={logo.src}
                  alt={logo.title}
                  className="w-full h-full block object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none rounded-2xl">
                  <span className="opacity-0 group-hover:opacity-100 font-comic text-base text-white bg-black/85 px-4 py-2 rounded-xl shadow-lg transition-opacity uppercase tracking-wider font-bold">
                    🔍 CLICK TO ENLARGE
                  </span>
                </div>
              </div>
            </div>
          ))}
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
