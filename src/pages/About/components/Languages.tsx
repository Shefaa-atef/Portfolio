import { useInView } from "../hooks/useInView";
import ChapterHeader from "./ChapterHeader";

const languages = [
  { name: "Arabic", level: "Native", tag: "مرحباً" },
  { name: "English", level: "B2 · Upper Intermediate", tag: "Hello!" },
  { name: "Turkish", level: "A2 · Elementary", tag: "Merhaba!" },
  { name: "Italian", level: "A1 · Beginner", tag: "Ciao!" },
];

const activities = [
  {
    org: "GDSC",
    full: "Google Developer Student Clubs",
    role: "Active Member",
    desc: "Joined workshops, tech talks, and community-driven development projects.",
  },
  {
    org: "Shoman",
    full: "Abdul Hameed Shoman Foundation",
    role: "Volunteer",
    desc: "Supported cultural and scientific community events and programs.",
  },
  {
    org: "Osboha 180°",
    full: "Youth Development Program",
    role: "Volunteer",
    desc: "Contributed to personal-development and youth leadership activities.",
  },
  {
    org: "Jordanian Volunteer Program",
    full: "National Volunteer Community",
    role: "Promotion Team Member",
    desc: "Helped promote volunteer opportunities and outreach campaigns.",
  },
  {
    org: "Iltazim",
    full: "Commit to Build the Nation Initiative",
    role: "Administrator & Designer",
    desc: "Managed initiative operations and designed visual content for community campaigns.",
  },
];

export default function Languages() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="about-alliances" ref={ref} aria-labelledby="about-languages-title">
      <ChapterHeader
        chapter="CH.04"
        overline="Languages / people / side quests"
        title="The alliances."
        titleId="about-languages-title"
        inView={inView}
      />

      <div className="about-alliances__languages">
        <div className="about-alliances__section-title">
          <span>Communication powers</span>
          <h3>Languages spoken</h3>
        </div>

        <div className="about-alliances__language-grid">
          {languages.map(({ name, level, tag }, index) => (
            <article key={name} className="about-language"
              style={{ animation: inView ? `panel-slam 0.45s cubic-bezier(0.22,1,0.36,1) ${0.08 + index * 0.06}s both` : "none" }}>
              <span className="about-language__number">0{index + 1}</span>
              <span className="about-language__greeting">{tag}</span>
              <h4>{name}</h4>
              <p>{level}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="about-alliances__quests">
        <div className="about-alliances__section-title about-alliances__section-title--dark">
          <span>Community first, cape optional</span>
          <h3>Side quests</h3>
        </div>

        <div className="about-alliances__quest-grid">
          {activities.map(({ org, full, role, desc }, index) => (
            <article key={org} className="about-quest"
              style={{ animation: inView ? `panel-slam 0.5s cubic-bezier(0.22,1,0.36,1) ${0.2 + index * 0.07}s both` : "none" }}>
              <div className="about-quest__topline">
                <span>Quest {String(index + 1).padStart(2, "0")}</span>
                <strong>{role}</strong>
              </div>
              <h4>{org}</h4>
              <span className="about-quest__full">{full}</span>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
