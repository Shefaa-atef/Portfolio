import { useEffect, useState } from "react";
import "../../../sections/Projects/Projects.css";

const CHAPTER_NAV = [
  { id: "designs-toolkit-title", label: "TOOLKIT", num: "01" },
  { id: "designs-logos-title", label: "LOGOS", num: "02" },
  { id: "designs-infographics-title", label: "INFOGRAPHICS", num: "03" },
  { id: "engagement-packs", label: "CAMPAIGNS", num: "04" },
  { id: "designs-vector-title", label: "VECTOR ART", num: "05" },
  { id: "organizations", label: "SQUAD", num: "06" },
];

export default function DesignsHero() {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full overflow-hidden">
      {/* ── TOP BAR (EXACT MATCH TO PROJECTS PAGE) ── */}
      <div
        className="border-b-4 border-black flex flex-wrap items-center justify-between pl-6 sm:pl-8 pr-[130px] sm:pr-[170px] py-3 gap-3"
        style={{
          backgroundColor: "var(--ink-purple)",
          animation: go ? "wipe-in 0.5s ease-out both" : "none",
        }}
      >
        <span className="font-comic text-white text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.25em]">
          PORTFOLIO COMICS — ISSUE #02: DESIGNS
        </span>
        <span className="font-comic text-white/50 text-lg hidden sm:inline tracking-widest">
          2025 — 2026
        </span>
      </div>

      {/* ── HERO SECTION WITH CHAPTER NAV (EXACT MATCH TO PROJECTS PAGE) ── */}
      <header className="projects-hero">
        <div className="px-[max(6vw,24px)] pt-2 pb-8">
          <div
            className="projects-hero__eyebrow"
            style={{
              animation: go
                ? "letter-drop 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both"
                : "none",
            }}
          >
            Shefa Atef / Visual Showcase
          </div>

          <h1
            style={{
              animation: go
                ? "letter-drop 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both"
                : "none",
            }}
          >
            Creative <span>Designs!</span>
          </h1>

          <div
            className="projects-hero__bottom"
            style={{
              animation: go
                ? "panel-slam 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s both"
                : "none",
            }}
          >
            <p>Logos, infographics, social media campaigns, vector illustrations & brand identities.</p>
            <div className="projects-hero__note">Select any artwork to inspect! ✦</div>
          </div>
        </div>

        {/* ── CHAPTER NAV BAR (EXACT MATCH TO PROJECTS PAGE NAV) ── */}
        <nav
          aria-label="Jump to chapter"
          className="lg:!grid-cols-6"
          style={{
            animation: go ? "wipe-in 0.5s ease-out 0.45s both" : "none",
          }}
        >
          {CHAPTER_NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <span>{item.num}</span> {item.label} <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
      </header>
    </section>
  );
}

