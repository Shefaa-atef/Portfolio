import { useInView } from "../hooks/useInView";
import developerPhoto from "../../../src/assets/images/photos/about/3_about.png";
import designerPhoto from "../../../src/assets/images/photos/about/4_about.png";

function Job({
  chapter, side, role, sub, company, period, type, bullets, dark, photo, photoAlt, delay = 0,
}: {
  chapter: string; side: "left" | "right"; role: string; sub?: string;
  company: string; period: string; type: string;
  bullets: string[]; dark: boolean; photo: string; photoAlt: string; delay?: number;
}) {
  const { ref, inView } = useInView();

  const textBlock = (
    <div className={`${dark ? "bg-black text-white" : "bg-white text-black"} p-10 lg:p-14 relative overflow-hidden border-b-4 lg:border-b-0 ${side === "left" ? "lg:border-r-4" : "lg:border-l-4"} border-black`}
      style={{ animation: inView ? `slam-left 0.55s cubic-bezier(0.22,1,0.36,1) ${delay + 0.1}s both` : "none" }}>
      {dark && <div className="absolute inset-0 halftone opacity-[0.07] pointer-events-none" />}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className={`font-comic text-xl tracking-[0.2em] ${dark ? "text-white/40" : "text-black/40"}`}>{chapter}</span>
          <span className={`border-2 font-comic text-lg px-3 py-1 ${dark ? "border-white/40 text-white/60" : "border-black/40 text-black/60"}`}>{type}</span>
        </div>

        <h3 className={`font-comic leading-none mb-2 ${dark ? "text-white" : "text-black"}`}
          style={{ fontSize: "clamp(48px,7vw,84px)" }}>
          {role}
        </h3>
        {sub && <h4 className={`font-comic text-4xl leading-none mb-4 ${dark ? "text-white/50" : "text-black/40"}`}>{sub}</h4>}
        <div className={`font-comic text-2xl mb-6 tracking-wider ${dark ? "text-white/55" : "text-black/50"}`}>@ {company}</div>

        <div className="inline-block font-comic text-2xl px-6 py-2 mb-8 hover-lift"
          style={{
            border: `3px solid ${dark ? "#fff" : "#000"}`,
            boxShadow: dark ? "6px 6px 0 rgba(255,255,255,0.35)" : "6px 6px 0 #000",
          }}>
          {period}
        </div>

        <ul className="space-y-4">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="mt-2 w-3 h-3 flex-shrink-0"
                style={{ backgroundColor: ["var(--ink-purple)", "var(--ink-blue)", "var(--ink-pink)"][i % 3] }} />
              <span className={`font-bb text-lg leading-relaxed ${dark ? "text-white/85" : "text-black/80"}`}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const photoBlock = (
    <div className="relative overflow-hidden min-h-[400px]"
      style={{ animation: inView ? `slam-right 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : "none" }}>
      <img src={photo} alt={photoAlt}
        className="photo-bw w-full h-full object-cover absolute inset-0 transition-transform duration-700 hover:scale-105" />
      <div className="absolute inset-0 halftone opacity-[0.06] pointer-events-none" />
      {/* Action word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ animation: inView ? `action-pop 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + 0.3}s both` : "none", opacity: 0 }}>
        <span className="font-comic text-[120px] leading-none text-white/20 select-none">
          {dark ? "POW!" : "ZAP!"}
        </span>
      </div>
      <div className={`absolute top-6 ${side === "left" ? "right-6" : "left-6"} border-[3px] px-5 py-3 hover-lift`}
        style={dark
          ? { border: "3px solid #fff", backgroundColor: "#000", color: "#fff" }
          : { border: "3px solid #000", backgroundColor: "#fff", color: "#000" }}>
        <p className="font-comic text-xl leading-tight">{company.split(" ")[0]}<br />{company.split(" ").slice(1).join(" ")}</p>
      </div>
    </div>
  );

  return (
    <div ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-[1fr_480px] border-b-4 border-black`}>
      {side === "left" ? <>{textBlock}{photoBlock}</> : <>{photoBlock}{textBlock}</>}
    </div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section className="border-b-4 border-black">
      <div ref={ref} className="border-b-4 border-black grid grid-cols-[auto_1fr] items-stretch"
        style={{ animation: inView ? "wipe-in 0.5s ease-out both" : "none" }}>
        <div className="text-white font-comic text-5xl px-10 py-6 border-r-4 border-black tracking-wide"
          style={{ backgroundColor: "var(--ink-pink)", color: "#000" }}>
          CH.02
        </div>
        <div className="flex items-center px-10">
          <h2 className="font-comic text-5xl lg:text-7xl tracking-wide text-black"
            style={{ animation: inView ? "slam-left 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none" }}>
            THE ORIGIN STORY
          </h2>
        </div>
      </div>

      <Job
        chapter="CHAPTER 02 — A" side="left"
        role="Flutter" sub="Developer"
        company="Quark Software" period="2024 — PRESENT" type="Full-time" dark
        photo={developerPhoto}
        photoAlt="Developer workspace"
        bullets={[
          "Built production Flutter apps with MVVM architecture and Provider state management.",
          "Integrated REST APIs via Dio with robust error handling and offline-first patterns.",
          "Delivered pixel-perfect, accessible mobile UIs from Figma specs.",
          "Owned full feature lifecycle — planning, implementation, testing, and deployment.",
        ]}
      />
      <Job
        chapter="CHAPTER 02 — B" side="right"
        role="UI/UX" sub="& Graphic Designer"
        company="Independent" period="2022 — PRESENT" type="Freelance" dark={false}
        photo={designerPhoto}
        photoAlt="Person working on laptop"
        delay={0.05}
        bullets={[
          "Designed end-to-end product experiences for mobile and web clients.",
          "Produced brand identities, design systems, and marketing materials.",
          "Led user research, wireframing, and high-fidelity prototyping for client products.",
          "Delivered print-ready and digital assets in Photoshop, InDesign, and Premiere.",
        ]}
      />
    </section>
  );
}
