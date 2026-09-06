import { useEffect, useState } from "react";
import Starburst from "./Starburst";
import heroPhoto from "../../../assets/images/photos/about/1_about.webp";
import cvPdf from "../../../assets/Shefa_Alhendi_CV_2026.pdf";

export default function Hero() {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 80); return () => clearTimeout(t); }, []);

  const handleDownloadPdf = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    fetch(cvPdf)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Shefa_Alhendi_CV_2026.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        window.open(cvPdf, "_blank");
      });
  };

  return (
    <section className="border-b-4 border-black">

      {/* ── TOP BAR ── */}
      <div
        className="border-b-4 border-black flex flex-wrap items-center justify-between pl-6 sm:pl-8 pr-[130px] sm:pr-[170px] py-3 gap-3"
        style={{
          backgroundColor: "var(--ink-purple)",
          animation: go ? "wipe-in 0.5s ease-out both" : "none",
        }}
      >
        <span className="font-comic text-white text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.25em]">
          PORTFOLIO COMICS — ISSUE #01
        </span>
        <div className="flex items-center gap-4">
          <span className="font-comic text-white/60 text-lg hidden sm:inline tracking-widest">
            2025 — 2026
          </span>
          <a
            href={cvPdf}
            download="Shefa_Alhendi_CV_2026.pdf"
            onClick={handleDownloadPdf}
            className="font-bb text-base px-3.5 py-1.5 bg-[#ffcc00] text-black border-2 border-black shadow-[3px_3px_0_#000] hover:translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#000] transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider font-bold"
            title="Download Official CV (PDF)"
          >
            <span>📄 RESUME (PDF)</span>
            <span className="text-xs font-black">↓</span>
          </a>
        </div>
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

            <div className="about-hero__name-rule"
              style={{ animation: go ? "wipe-in 0.6s ease-out 0.4s both" : "none" }}
              aria-hidden="true">
              <span />
            </div>

            <div className="about-hero__story"
              style={{ animation: go ? "panel-slam 0.6s cubic-bezier(0.22,1,0.36,1) 0.45s both" : "none" }}>
              <div className="about-hero__brief">
                <span className="about-hero__eyebrow">The short version</span>
                <p>
                  I blend <strong>design intuition</strong>, full-stack development, and AI-powered workflows to turn early ideas into polished products that look sharp and work beautifully.
                </p>
              </div>

              <blockquote className="about-hero__manifesto" aria-label="I design it. I code it. I ship it.">
                {["I design it.", "I code it.", "I ship it."].map((line, i) => (
                  <span key={line}>
                    <small>0{i + 1}</small>
                    {line}
                  </span>
                ))}
              </blockquote>

              <nav className="about-hero__socials" aria-label="Social links">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/shefa-atef/" },
                  { label: "GitHub", href: "https://github.com/Shefaa-atef" },
                  { label: "Behance", href: "https://www.behance.net/shefaalhindi" },
                  { label: "Email", href: "mailto:shefaalhendi@gmail.com" },
                ].map(({ label, href }, i) => (
                  <a key={label} href={href}
                    style={{ animation: go ? `wipe-in 0.45s ease-out ${0.7 + i * 0.06}s both` : "none" }}>
                    <span>{label}</span>
                    <span className="about-hero__social-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </nav>
            </div>
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
