import { useInView } from "../hooks/useInView";
import developerPhoto from "../../../assets/images/photos/about/3_about.webp";
import designerPhoto from "../../../assets/images/photos/about/4_about.webp";
import ChapterHeader from "./ChapterHeader";

type JobProps = {
  issue: string;
  role: string;
  sub: string;
  company: string;
  period: string;
  type: string;
  bullets: string[];
  photo: string;
  photoAlt: string;
  accent: string;
  delay?: number;
};

function JobCard({
  issue,
  role,
  sub,
  company,
  period,
  type,
  bullets,
  photo,
  photoAlt,
  accent,
  delay = 0,
}: JobProps) {
  const { ref, inView } = useInView(0.12);

  return (
    <article
      ref={ref}
      className="about-job"
      style={{
        "--job-accent": accent,
        animation: inView ? `panel-slam 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : "none",
      } as React.CSSProperties}
    >
      <div className="about-job__visual">
        <img src={photo} alt={photoAlt} />
        <span className="about-job__issue">{issue}</span>
        <span className="about-job__type">{type}</span>
      </div>

      <div className="about-job__body">
        <div className="about-job__meta">
          <strong>{company}</strong>
          <span>{period}</span>
        </div>

        <h3>{role}<span>{sub}</span></h3>

        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>
              <span aria-hidden="true">↗</span>
              <p>{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section className="about-experience" aria-labelledby="about-experience-title">
      <div ref={ref}>
        <ChapterHeader
          chapter="CH.02"
          overline="Jobs / quests / plot twists"
          title="The origin story."
          titleId="about-experience-title"
          inView={inView}
          accent="var(--ink-pink)"
          ink="#000"
        />
      </div>

      <div className="about-experience__grid">
        <JobCard
          issue="02.A"
          role="Flutter"
          sub="Developer"
          company="Quark Software"
          period="2024 — Present"
          type="Full-time"
          photo={developerPhoto}
          photoAlt="Developer workspace"
          accent="var(--ink-blue)"
          bullets={[
            "Built production Flutter apps with MVVM architecture and Provider state management.",
            "Integrated REST APIs via Dio with robust error handling and offline-first patterns.",
            "Delivered pixel-perfect, accessible mobile UIs from Figma specs.",
            "Owned full feature lifecycle — planning, implementation, testing, and deployment.",
          ]}
        />

        <JobCard
          issue="02.B"
          role="UI/UX"
          sub="& Graphic Designer"
          company="Independent"
          period="2022 — Present"
          type="Freelance"
          photo={designerPhoto}
          photoAlt="Designer working on a laptop"
          accent="var(--ink-pink)"
          delay={0.08}
          bullets={[
            "Designed end-to-end product experiences for mobile and web clients.",
            "Produced brand identities, design systems, and marketing materials.",
            "Led user research, wireframing, and high-fidelity prototyping for client products.",
            "Delivered print-ready and digital assets in Photoshop, InDesign, and Premiere.",
          ]}
        />
      </div>
    </section>
  );
}
