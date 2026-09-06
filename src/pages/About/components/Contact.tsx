import { useInView } from "../hooks/useInView";
import contactPhoto from "../../../assets/images/photos/about/6_about.webp";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shefa-atef/" },
  { label: "GitHub", href: "https://github.com/Shefaa-atef" },
  { label: "Behance", href: "https://www.behance.net/shefaalhindi" },
];

export default function Contact() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="about-finale" ref={ref} aria-labelledby="about-finale-title">
      <div className="about-finale__hero">
        <img src={contactPhoto} alt="Dual monitors workspace" />
        <div className="about-finale__wash" aria-hidden="true" />
        <div className="about-finale__content">
          <span className="about-finale__kicker"
            style={{ animation: inView ? "wipe-in 0.55s ease-out both" : "none" }}>
            One last panel
          </span>

          <h2 id="about-finale-title"
            style={{ animation: inView ? "slam-left 0.65s cubic-bezier(0.22,1,0.36,1) 0.12s both" : "none" }}>
            <span>Have a bold idea?</span>
            <span>Let&apos;s make it real.</span>
          </h2>

          <a className="about-finale__email" href="mailto:shefaalhendi@gmail.com"
            style={{ animation: inView ? "kaboom 0.5s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none" }}>
            <span>Start a project</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="about-finale__footer">
        <span className="about-finale__signature">SHEFA&apos; ATEF</span>
        <nav aria-label="Contact links">
          {links.map(({ label, href }) => (
            <a key={label} href={href}>{label}<span aria-hidden="true">↗</span></a>
          ))}
        </nav>
        <span className="about-finale__issue">Portfolio · 2026</span>
      </div>
    </section>
  );
}
