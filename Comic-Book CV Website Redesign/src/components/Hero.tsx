import { useEffect, useState } from "react";
import Starburst from "./Starburst";
import heroPhoto from "../../../src/assets/images/photos/about/1_about.png";

export default function Hero() {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="border-b-4 border-black">

      {/* ── TOP BAR ── */}
      <div
        className="border-b-4 border-black flex items-center justify-between px-8 py-3"
        style={{ backgroundColor: "var(--ink-purple)",
          animation: go ? "wipe-in 0.5s ease-out both" : "none" }}>
        <span className="font-comic text-white text-2xl tracking-[0.25em]">PORTFOLIO COMICS — ISSUE #01</span>
        <span className="font-comic text-white/50 text-xl tracking-widest">2025 — 2026</span>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] min-h-[90vh]">

        {/* LEFT — text */}
        <div className="flex flex-col justify-between p-10 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">

          {/* Role chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["UI/UX Designer", "Flutter Dev", "React Dev", "Prompt Engineer"].map((r, i) => (
              <span key={r}
                className="font-bb text-lg px-4 py-1 tracking-wider text-white hover-rumble cursor-default"
                style={{
                  border: "3px solid #000",
                  backgroundColor: ["var(--ink-purple)", "var(--ink-blue)", "var(--ink-pink)", "#000"][i],
                  color: i === 2 ? "#000" : "#fff",
                  boxShadow: "5px 5px 0 #000",
                  animation: go ? `kaboom 0.55s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.08}s both` : "none",
                }}>
                {r}
              </span>
            ))}
          </div>

          {/* Name — giant */}
          <div className="flex-1 flex flex-col justify-center my-6">
            <div className="flex flex-col xl:flex-row xl:items-baseline xl:gap-[0.18em]">
              {["SHEFA'", "ATEF"].map((word, wi) => (
                <h1 key={word}
                  className="font-comic leading-none text-black"
                  style={{
                    fontSize: "clamp(72px, 12vw, 140px)",
                    lineHeight: 0.92,
                    animation: go ? `letter-drop 0.6s cubic-bezier(0.22,1,0.36,1) ${0.05 + wi * 0.12}s both` : "none",
                  }}>
                  {word}
                </h1>
              ))}
            </div>

            {/* Divider */}
            <div className="flex gap-2 items-center my-8"
              style={{ animation: go ? "wipe-in 0.6s ease-out 0.4s both" : "none" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={`h-3 flex-1 ${i % 2 === 0 ? "bg-black" : "bg-white border-2 border-black"}`} />
              ))}
            </div>

            {/* Intro */}
            <p className="text-xl lg:text-2xl leading-relaxed font-medium text-black max-w-lg border-l-[5px] pl-6"
              style={{
                borderColor: "var(--ink-purple)",
                animation: go ? "slam-left 0.55s cubic-bezier(0.22,1,0.36,1) 0.45s both" : "none",
              }}>
              I combine design intuition, full-stack development, and AI-powered workflows to ship products that look sharp and actually work — from first wireframe to production.
            </p>

            {/* Speech bubble */}
            <div className="mt-12 inline-block"
              style={{ animation: go ? "panel-slam 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both" : "none" }}>
              <div className="bubble shadow-ink-lg px-7 py-5 max-w-md hover-lift-purple hover-lift">
                <p className="font-comic text-3xl lg:text-4xl leading-tight tracking-wide">
                  "I DESIGN IT.<br />I CODE IT.<br />I SHIP IT."
                </p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-4 mt-16">
            {[
              { label: "↗ LinkedIn", href: "https://www.linkedin.com/in/shefa-atef/" },
              { label: "↗ GitHub",   href: "https://github.com/Shefaa-atef" },
              { label: "↗ Behance",  href: "https://www.behance.net/shefaalhindi" },
              { label: "↗ Email",    href: "mailto:shefaalhendi@gmail.com" },
            ].map(({ label, href }, i) => (
              <a key={label} href={href}
                className="border-[3px] border-black px-6 py-3 font-comic text-xl tracking-widest hover:bg-black hover:text-white transition-colors shadow-ink hover-lift"
                style={{ animation: go ? `kaboom 0.5s cubic-bezier(0.22,1,0.36,1) ${0.6 + i * 0.07}s both` : "none" }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="relative overflow-hidden bg-black min-h-[60vh] lg:min-h-0">
          <img
            src={heroPhoto}
            alt="Developer at work"
            className="photo-bw w-full h-full object-cover absolute inset-0"
            style={{ animation: go ? "slam-right 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}
          />
          <div className="absolute inset-0 halftone opacity-[0.07] pointer-events-none" />

          {/* Starburst — floats + pulses */}
          <div className="absolute top-6 right-6 z-20 float-anim burst-idle"
            style={{ animation: go
              ? "kaboom 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both, burst-pulse 3s ease-in-out 1.3s infinite"
              : "none" }}>
            <Starburst label="HIRE" sub="ME!" size={110} purple />
          </div>

          {/* Bottom caption bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t-4 border-white/30 px-6 py-4 z-10">
            <p className="font-comic text-white text-2xl tracking-widest">UI/UX · FLUTTER · REACT · AI</p>
          </div>
        </div>
      </div>
    </section>
  );
}
