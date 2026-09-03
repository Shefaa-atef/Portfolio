import { useInView } from "../hooks/useInView";
import Starburst from "./Starburst";
import contactPhoto from "../../../src/assets/images/photos/about/6_about.png";

export default function Contact() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="relative overflow-hidden" ref={ref}>

      {/* Full-bleed photo */}
      <div className="relative">
        <img
          src={contactPhoto}
          alt="Dual monitors workspace"
          className="photo-bw w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
          style={{ height: 480, objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 halftone opacity-[0.1] pointer-events-none" />

        {/* "TO BE CONTINUED" */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <div className="font-comic text-white/30 text-2xl tracking-[0.4em] uppercase mb-4"
            style={{ animation: inView ? "wipe-in 0.6s ease-out 0.1s both" : "none" }}>
            — Final Page —
          </div>
          {["TO BE", "CONTINUED..."].map((word, wi) => (
            <div key={word}
              className="font-comic text-white leading-none"
              style={{
                fontSize: "clamp(60px, 14vw, 160px)",
                WebkitTextStroke: "3px white",
                animation: inView ? `letter-drop 0.65s cubic-bezier(0.22,1,0.36,1) ${0.2 + wi * 0.15}s both` : "none",
              }}>
              {word}
            </div>
          ))}
        </div>

        {/* Corner starbursts — staggered kaboom */}
        {[
          { label: "WOW!", pos: "top-6 left-6",   delay: 0.5 },
          { label: "POW!", pos: "top-6 right-6",  delay: 0.6 },
          { label: "ZAP!", pos: "bottom-6 left-6 hidden sm:flex",  delay: 0.7 },
          { label: "YES!", pos: "bottom-6 right-6 hidden sm:flex", delay: 0.8 },
        ].map(({ label, pos, delay }) => (
          <div key={label}
            className={`absolute z-10 flex items-center justify-center ${pos}`}
            style={{ animation: inView ? `kaboom 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : "none" }}>
            <div className="burst-idle float-anim">
              <Starburst label={label} size={105} dark />
            </div>
          </div>
        ))}
      </div>

      {/* CTA bar */}
      <div className="bg-black border-t-4 border-b-4 border-black px-8 py-10 text-center">
        <div
          className="font-comic text-white leading-tight mb-10"
          style={{
            fontSize: "clamp(36px, 7vw, 84px)",
            animation: inView ? "panel-slam 0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both" : "none",
          }}>
          LET'S BUILD<br />SOMETHING COOL.
        </div>

        <div className="flex items-center justify-center gap-3 mb-10"
          style={{ animation: inView ? "wipe-in 0.5s ease-out 0.7s both" : "none" }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i}
              className={`rounded-full bg-white ${i === 4 ? "w-5 h-5" : "w-3 h-3 opacity-40"}`}
              style={{ backgroundColor: i === 4 ? "var(--ink-purple)" : i % 2 ? "var(--ink-blue)" : "var(--ink-pink)" }} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/shefa-atef/" },
            { label: "GitHub",   href: "https://github.com/Shefaa-atef" },
            { label: "Behance",  href: "https://www.behance.net/shefaalhindi" },
            { label: "Email",    href: "mailto:shefaalhendi@gmail.com" },
          ].map(({ label, href }, i) => (
            <a key={label} href={href}
              className="border-4 border-white text-white px-8 py-4 font-comic text-2xl tracking-widest hover:bg-white hover:text-black transition-colors hover-lift"
              style={{
                boxShadow: "6px 6px 0 rgba(255,255,255,0.3)",
                animation: inView ? `kaboom 0.5s cubic-bezier(0.22,1,0.36,1) ${0.75 + i * 0.08}s both` : "none",
              }}>
              {label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t-4 border-black bg-white px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-comic text-black text-xl tracking-widest">SHEFA' ATEF — PORTFOLIO CV — ISSUE #01</span>
        <div className="flex gap-2 items-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-3 h-3 rounded-full"
              style={{ backgroundColor: ["var(--ink-pink)", "var(--ink-purple)", "var(--ink-blue)"][i] }} />
          ))}
        </div>
        <span className="font-comic text-black/50 text-xl tracking-widest">2025 — 2026</span>
      </div>
    </section>
  );
}
