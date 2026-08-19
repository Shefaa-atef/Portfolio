export function drawWebLine(ctx, points, alpha) {
  if (points.length < 2 || alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = '#ddeeff';
  ctx.lineWidth = 1.1;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = 'rgba(160,210,255,0.7)';
  ctx.shadowBlur = 5;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i].x + points[i + 1].x) / 2;
    const my = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.stroke();
  ctx.restore();
}

export function drawWebAnchor(ctx, x, y) {
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = '#ddeeff';
  ctx.lineWidth = 0.7;
  ctx.shadowColor = 'rgba(160,210,255,0.5)';
  ctx.shadowBlur = 4;

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * 12, y + Math.sin(a) * 12);
    ctx.stroke();
  }
  for (const r of [4, 8, 12]) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawSpiderCursor(ctx, x, y) {
  ctx.save();
  ctx.shadowColor = 'rgba(160,210,255,0.9)';
  ctx.shadowBlur = 10;

  ctx.fillStyle = 'rgba(235,245,255,0.95)';
  // Abdomen
  ctx.beginPath();
  ctx.ellipse(x, y + 3, 3.5, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  // Cephalothorax
  ctx.beginPath();
  ctx.ellipse(x, y - 3, 3, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = 'rgba(100,170,255,1)';
  ctx.beginPath();
  ctx.arc(x - 1.2, y - 3.5, 0.9, 0, Math.PI * 2);
  ctx.arc(x + 1.2, y - 3.5, 0.9, 0, Math.PI * 2);
  ctx.fill();

  // 8 legs (4 per side), with a bent knee midpoint
  ctx.strokeStyle = 'rgba(235,245,255,0.85)';
  ctx.lineWidth = 0.9;
  ctx.lineCap = 'round';

  const legs = [
    { bx: -3, by: -3, ex: -13, ey: -9 },
    { bx: -3.5, by: -1, ex: -13, ey: -1 },
    { bx: -3.5, by: 1, ex: -12, ey: 5 },
    { bx: -3, by: 3, ex: -11, ey: 10 },
    { bx: 3, by: -3, ex: 13, ey: -9 },
    { bx: 3.5, by: -1, ex: 13, ey: -1 },
    { bx: 3.5, by: 1, ex: 12, ey: 5 },
    { bx: 3, by: 3, ex: 11, ey: 10 },
  ];

  for (const { bx, by, ex, ey } of legs) {
    const fx = x + bx, fy = y + by;
    const tx = x + ex, ty = y + ey;
    const kx = (fx + tx) / 2;
    const ky = (fy + ty) / 2 - 4; // knee bends upward
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.quadraticCurveTo(kx, ky, tx, ty);
    ctx.stroke();
  }

  ctx.restore();
}
