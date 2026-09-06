import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import "./SocialMediaGallery.css";
import { useInView } from "../../About/hooks/useInView";
import ChapterHeader from "../../About/components/ChapterHeader";

// Alphapet 27 Celebration Series
import alpha1 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-01.webp";
import alpha2 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-02.webp";
import alpha3 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-03.webp";
import alpha4 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-04.webp";
import alpha5 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-05.webp";
import alpha6 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-06.webp";
import alpha7 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-07.webp";
import alpha8 from "../../../assets/images/photos/designs/social media posts/alphapet/27 celebration-08.webp";

// GDCS Community
import gdcs1 from "../../../assets/images/photos/designs/social media posts/gdcs/DevOps English-01.webp";
import gdcs2 from "../../../assets/images/photos/designs/social media posts/gdcs/sponsors-01.webp";
import gdcs3 from "../../../assets/images/photos/designs/social media posts/gdcs/انضم للفريق-01.webp";

// Jordanian Volunteer Program
import vol1 from "../../../assets/images/photos/designs/social media posts/برنامج التطوع الأردني/1-01.webp";
import vol2 from "../../../assets/images/photos/designs/social media posts/برنامج التطوع الأردني/TRAVEL-01.webp";
import vol3 from "../../../assets/images/photos/designs/social media posts/برنامج التطوع الأردني/اعلان 2-01.png";
import vol4 from "../../../assets/images/photos/designs/social media posts/برنامج التطوع الأردني/الحل-01.png";
import vol5 from "../../../assets/images/photos/designs/social media posts/برنامج التطوع الأردني/ضيوف الحوار 1-01.webp";
import vol6 from "../../../assets/images/photos/designs/social media posts/برنامج التطوع الأردني/فورم.webp";

const PACKS = [
  {
    id: "alphapet",
    name: "Alphapet",
    subtitle: "27 Celebration Series",
    description: "A vibrant social campaign celebrating milestone brand moments.",
    color: "#e999cf",
    images: [alpha1, alpha2, alpha3, alpha4, alpha5, alpha6, alpha7, alpha8],
  },
  {
    id: "volunteers",
    name: "Jordanian Volunteer Program",
    subtitle: "Community & Volunteering",
    description: "Bold impact graphics empowering community voices and youth initiatives.",
    color: "#ffcc00",
    images: [vol1, vol2, vol3, vol4, vol5, vol6],
  },
  {
    id: "gdsc",
    name: "GDSC",
    subtitle: "Developer Community",
    description: "Tech event announcements and developer community spotlights.",
    color: "#75c6e3",
    images: [gdcs1, gdcs2, gdcs3],
  },
];

export default function SocialMediaGallery() {
  const { ref, inView } = useInView(0.1);
  const [activePackIndex, setActivePackIndex] = useState<number>(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  const activePack = PACKS[activePackIndex];

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewSrc(null);
    };
    if (previewSrc) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewSrc]);

  const handlePackChange = (index: number) => {
    setActivePackIndex(index);
    setActivePhotoIndex(0);
    if (rail.current) {
      rail.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="engagement-packs" className="engagement-section border-b-4 border-black bg-[#fbf4fc] w-full" ref={ref} aria-labelledby="designs-social-title">
      <ChapterHeader
        chapter="CH.04"
        overline="SOCIAL MEDIA POSTS & CAMPAIGNS"
        title="THE ENGAGEMENT PACKS!"
        titleId="designs-social-title"
        inView={inView}
        accent="var(--ink-purple)"
        ink="#fff"
      />

      <div className="engagement-container max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 py-8">
        {/* Pack Selector Tabs */}
        <div className="engagement-tabs" role="tablist" aria-label="Select campaign pack">
          {PACKS.map((pack, idx) => {
            const isActive = activePackIndex === idx;
            return (
              <button
                key={pack.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handlePackChange(idx)}
                className={`engagement-tab${isActive ? " is-active" : ""}`}
                style={{ "--tab-color": pack.color } as CSSProperties}
              >
                <span className="engagement-tab__num">0{idx + 1}</span>
                <span className="engagement-tab__name">{pack.name}</span>
                <span className="engagement-tab__count">({pack.images.length})</span>
              </button>
            );
          })}
        </div>

        {/* Central Interactive Campaign Studio */}
        <div className="engagement-studio" style={{ "--pack-color": activePack.color } as CSSProperties}>
          {/* Left: Taller Interactive Phone Mockup */}
          <div className="engagement-phone">
            <div className="engagement-phone__speaker" aria-hidden="true" />
            <div className="engagement-phone__profile">
              <span className="engagement-phone__avatar" aria-hidden="true">{activePack.name[0]}</span>
              <div className="engagement-phone__meta">
                <strong>{activePack.name}</strong>
                <span>{activePack.subtitle}</span>
              </div>
              <span className="engagement-phone__more" aria-hidden="true">•••</span>
            </div>

            <button
              className="engagement-phone__cover"
              type="button"
              onClick={() => setPreviewSrc(activePack.images[activePhotoIndex])}
              aria-label={`Open ${activePack.name} artwork ${activePhotoIndex + 1}`}
              title="Click to view full screen artwork"
            >
              <img
                key={`${activePack.id}-${activePhotoIndex}`}
                src={activePack.images[activePhotoIndex]}
                alt={`${activePack.name} campaign artwork ${activePhotoIndex + 1}`}
                className="animate-fade-in"
              />
            </button>

            <div className="engagement-phone__actions" aria-hidden="true">
              <span>♡</span>
              <span>➤</span>
              <span className="ml-auto">⌑</span>
            </div>
            <div className="engagement-phone__home" aria-hidden="true" />
          </div>

          {/* Right: Active Pack Rail & Info */}
          <div className="engagement-details">
            <header className="engagement-details__header">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <span className="engagement-details__badge">PACK 0{activePackIndex + 1}</span>
                <h2>{activePack.name}</h2>
              </div>
              <p className="engagement-details__desc">{activePack.description}</p>
            </header>

            {/* Artwork Stream */}
            <div className="engagement-details__stream">
              <div className="engagement-details__rail-header">
                <span>SELECT POST TO PREVIEW IN PHONE</span>
                <span className="engagement-details__counter">
                  {String(activePhotoIndex + 1).padStart(2, "0")} / {String(activePack.images.length).padStart(2, "0")} POSTS
                </span>
              </div>

              <div className="engagement-rail" ref={rail} tabIndex={0} role="region" aria-label={`${activePack.name} post rail`}>
                {activePack.images.map((src, i) => (
                  <button
                    className={`engagement-post${activePhotoIndex === i ? " is-active" : ""}`}
                    key={src}
                    type="button"
                    onMouseEnter={() => setActivePhotoIndex(i)}
                    onClick={() => {
                      setActivePhotoIndex(i);
                      setPreviewSrc(src);
                    }}
                    aria-label={`Select ${activePack.name} artwork ${i + 1}`}
                  >
                    <span className="engagement-post__badge">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <img src={src} alt={`${activePack.name} post ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* React High-Res Modal Overlay (Sitting cleanly under custom cursor) */}
      {previewSrc && (
        <div
          className="fixed inset-0 z-[9990] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setPreviewSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activePack.name} artwork preview`}
        >
          <div
            className="relative max-w-[92vw] max-h-[92vh] bg-white border-4 border-black shadow-[12px_12px_0_#000] p-3 sm:p-5 rounded-sm flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewSrc(null)}
              className="absolute -top-4 -right-4 bg-yellow-300 text-black border-3 border-black font-comic font-bold text-lg px-4 py-1.5 shadow-[4px_4px_0_#000] hover:bg-white active:translate-y-0.5 transition-all z-20"
              aria-label="Close artwork preview"
            >
              CLOSE ×
            </button>
            <img
              src={previewSrc}
              alt="Campaign artwork preview"
              className="max-h-[82vh] max-w-[85vw] object-contain block rounded-sm"
            />
          </div>
        </div>
      )}
    </section>
  );
}
