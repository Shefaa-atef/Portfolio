import { useState, useRef, useEffect } from "react";
import { useInView } from "../../About/hooks/useInView";
import ChapterHeader from "../../About/components/ChapterHeader";

import art1 from "../../../assets/images/photos/designs/DIGITAL ART/hijab hacker-01.png";
import art2 from "../../../assets/images/photos/designs/DIGITAL ART/hijabi girl 1-01.png";
import art3 from "../../../assets/images/photos/designs/DIGITAL ART/جو غائم 2-01.png";
import art4 from "../../../assets/images/photos/designs/DIGITAL ART/5-01.png";

const VECTOR_ARTS = [
  { id: "art-1", title: "HIJABI HACKER", src: art1 },
  { id: "art-2", title: "HIJABI CHARACTER", src: art2 },
  { id: "art-3", title: "CLOUDY WEATHER", src: art3 },
  { id: "art-4", title: "VECTOR ILLUST #05", src: art4 },
];

export default function VectorArtGallery() {
  const { ref, inView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<typeof VECTOR_ARTS[number] | null>(null);

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
      const scrollAmount = direction === "left" ? -660 : 660;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="border-b-4 border-black bg-[#fdf2f7] overflow-hidden relative pb-12 w-full" ref={ref}>
      <ChapterHeader
        chapter="CH.05"
        overline="DIGITAL VECTOR ART & ILLUSTRATIONS"
        title="THE VECTOR REALM!"
        titleId="designs-vector-title"
        inView={inView}
        accent="var(--ink-pink)"
        ink="#000"
      />

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 space-y-4 mt-6">
        {/* Navigation Controls */}
        <div className="flex justify-end items-center mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="font-comic text-base sm:text-lg px-5 py-2 bg-white text-black border-3 border-black shadow-[4px_4px_0_#000] hover:bg-[#ffcc00] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-y-0.5 transition-all uppercase font-bold cursor-pointer rounded-md"
              aria-label="Scroll vector art left"
            >
              ◄ PREV
            </button>
            <button
              onClick={() => scroll("right")}
              className="font-comic text-base sm:text-lg px-5 py-2 bg-white text-black border-3 border-black shadow-[4px_4px_0_#000] hover:bg-[#ffcc00] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-y-0.5 transition-all uppercase font-bold cursor-pointer rounded-md"
              aria-label="Scroll vector art right"
            >
              NEXT ►
            </button>
          </div>
        </div>

        {/* Frameless 1-Row Extra Large Artwork Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-10 overflow-x-hidden pb-6 pt-2 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {VECTOR_ARTS.map((art, index) => (
            <div
              key={art.id}
              onClick={() => setActiveItem(art)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveItem(art); }}
              title="Click to inspect vector artwork in high resolution"
              className="w-[340px] sm:w-[480px] md:w-[620px] lg:w-[720px] flex-shrink-0 snap-start bg-white rounded-3xl border border-black/10 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 group flex flex-col justify-between cursor-pointer p-6 sm:p-8"
              style={{
                animation: inView
                  ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${0.08 + index * 0.08}s both`
                  : "none",
              }}
            >
              {/* High-Impact Extra Large Photo Container — Pure Artwork Focus */}
              <div className="bg-white flex items-center justify-center min-h-[380px] sm:min-h-[500px] overflow-hidden relative rounded-2xl">
                <img
                  src={art.src}
                  alt={art.title}
                  className="w-full h-auto max-h-[660px] block object-contain group-hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none rounded-2xl">
                  <span className="opacity-0 group-hover:opacity-100 font-comic text-lg text-white bg-black/85 px-4 py-2 rounded-xl shadow-lg transition-opacity uppercase tracking-wider font-bold">
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
