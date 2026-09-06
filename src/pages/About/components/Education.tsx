import { useInView } from "../hooks/useInView";
import educationPhoto from "../../../assets/images/photos/about/5_about.webp";
import ChapterHeader from "./ChapterHeader";

const courses = [
  "Algorithms & Data Structures",
  "Object-Oriented Programming",
  "Database Systems",
  "Software Engineering",
  "Computer Networks",
  "Operating Systems",
  "Artificial Intelligence",
  "Human-Computer Interaction",
];

const stats = [
  { value: "3.87", label: "GPA / 4.00" },
  { value: "#1", label: "In class" },
  { value: "HON.", label: "Distinction" },
];

export default function Education() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="about-education" ref={ref} aria-labelledby="about-education-title">
      <ChapterHeader
        chapter="CH.03"
        overline="Degree / grind / glow-up"
        title="The training arc."
        titleId="about-education-title"
        inView={inView}
        accent="var(--ink-blue)"
        ink="#000"
      />

      <div className="about-education__layout">
        <figure className="about-education__art"
          style={{ animation: inView ? "slam-left 0.65s cubic-bezier(0.22,1,0.36,1) 0.08s both" : "none" }}>
          <img src={educationPhoto} alt="Comic illustration of a university journey from first year to graduation" />
          <figcaption>
            <span>Complete university arc</span>
            <strong>2022 → 2026</strong>
          </figcaption>
        </figure>

        <div className="about-education__dossier"
          style={{ animation: inView ? "slam-right 0.65s cubic-bezier(0.22,1,0.36,1) 0.14s both" : "none" }}>
          <span className="about-education__stamp">Mission complete</span>
          <p className="about-education__school">Hashemite University</p>
          <h3>B.Sc. Computer Science</h3>
          <p className="about-education__years">2022 — 2026</p>

          <div className="about-education__stats">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="about-education__courses">
            <div className="about-education__courses-heading">
              <span>Relevant coursework</span>
              <strong>Skills unlocked</strong>
            </div>
            <ol>
              {courses.map((course, index) => (
                <li key={course}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {course}
                </li>
              ))}
            </ol>
          </div>

          <p className="about-education__note">Theory learned. Deadlines defeated.</p>
        </div>
      </div>
    </section>
  );
}
