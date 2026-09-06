interface Props { label: string; sub?: string; size?: number; dark?: boolean; purple?: boolean; }

export default function Starburst({ label, sub, size = 100, dark = false, purple = false }: Props) {
  const n = 18, cx = size / 2, cy = size / 2;
  const outer = size / 2 - 2;
  const inner = outer * 0.68;
  const pts = Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI / n) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");

  const bg   = purple ? "var(--ink-purple)" : dark ? "#fff" : "#000";
  const text = purple ? "#fff"    : dark ? "#000" : "#fff";

  return (
    <div className="relative inline-flex items-center justify-center select-none"
      style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="absolute inset-0">
        <polygon points={pts} fill={bg} />
      </svg>
      <div className="relative z-10 text-center leading-none px-2">
        <div className="font-comic leading-none" style={{ color: text, fontSize: size * 0.2 }}>{label}</div>
        {sub && <div className="font-comic leading-none" style={{ color: text, fontSize: size * 0.16 }}>{sub}</div>}
      </div>
    </div>
  );
}
