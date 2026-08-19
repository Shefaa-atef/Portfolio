const N = 14;
const GRAVITY = 0.5;
const DAMPING = 0.96;
const ITERATIONS = 10;
const FADE_FRAMES = 80;

export function createWeb(cx, cy, ax, ay) {
  const dx = ax - cx, dy = ay - cy;
  const d = Math.hypot(dx, dy);
  const points = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const x = cx + dx * t, y = cy + dy * t;
    return { x, y, px: x, py: y };
  });
  return { points, anchorX: ax, anchorY: ay, segLen: Math.max(d / N, 1), attached: true, alpha: 1, age: 0 };
}

export function updateAttachedWeb(web, cx, cy) {
  const { points, anchorX: ax, anchorY: ay } = web;
  const dx = ax - cx, dy = ay - cy;
  const d = Math.hypot(dx, dy);
  web.segLen = Math.max(d / N, 1);
  const sag = Math.min(d * 0.14, 55);

  points[0].x = points[0].px = cx;
  points[0].y = points[0].py = cy;
  points[N].x = points[N].px = ax;
  points[N].y = points[N].py = ay;

  for (let i = 1; i < N; i++) {
    const t = i / N;
    const tx = cx + dx * t;
    const ty = cy + dy * t + Math.sin(t * Math.PI) * sag;
    points[i].x += (tx - points[i].x) * 0.28;
    points[i].y += (ty - points[i].y) * 0.28;
    points[i].px = points[i].x;
    points[i].py = points[i].y;
  }
}

export function updateFallingWeb(web) {
  web.age++;
  web.alpha = Math.max(0, 1 - web.age / FADE_FRAMES);
  const { points, segLen } = web;

  for (const p of points) {
    const vx = (p.x - p.px) * DAMPING;
    const vy = (p.y - p.py) * DAMPING;
    p.px = p.x; p.py = p.y;
    p.x += vx; p.y += vy + GRAVITY;
  }

  for (let k = 0; k < ITERATIONS; k++) {
    for (let i = 0; i < N; i++) {
      const a = points[i], b = points[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.001;
      const c = (d - segLen) / d * 0.5;
      a.x += dx * c; a.y += dy * c;
      b.x -= dx * c; b.y -= dy * c;
    }
  }
}

export function detachWeb(web, vx, vy) {
  const p = web.points[0];
  p.px = p.x - vx * 3;
  p.py = p.y - vy * 3;
  web.attached = false;
}
