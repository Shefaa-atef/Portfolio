type ChapterHeaderProps = {
  chapter: string;
  overline: string;
  title: string;
  titleId: string;
  inView: boolean;
  accent?: string;
  ink?: string;
};

export default function ChapterHeader({
  chapter,
  overline,
  title,
  titleId,
  inView,
  accent = "var(--ink-purple)",
  ink = "#fff",
}: ChapterHeaderProps) {
  return (
    <header
      className="about-chapter"
      style={{
        animation: inView ? "wipe-in 0.55s ease-out both" : "none",
        "--chapter-accent": accent,
        "--chapter-ink": ink,
      } as React.CSSProperties}
    >
      <span className="about-chapter__number">{chapter}</span>
      <div className="about-chapter__copy">
        <span className="about-chapter__overline">{overline}</span>
        <h2 id={titleId}>{title}</h2>
      </div>
    </header>
  );
}
