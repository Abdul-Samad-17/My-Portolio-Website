/**
 * Cursor trail utility — Fluid smoke ribbon effect.
 *
 * Renders a continuous, smooth, glowing fluid ribbon that follows the cursor
 * and tapers organically like luminous smoke.
 *
 * Dynamically resolves two CSS variables:
 *  - Primary: --accent (Teal)
 *  - Secondary: --cursor-trail-secondary (Violet)
 */

export interface Point {
  x: number;
  y: number;
  time: number;
}

export function resolveHslVar(varName: string): { r: number; g: number; b: number } {
  if (typeof window === "undefined") return { r: 32, g: 141, b: 147 };

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  if (!raw) return { r: 32, g: 141, b: 147 };

  const parts = raw.split(/\s+/);
  const h = parseFloat(parts[0]) || 0;
  const s = (parseFloat(parts[1]) || 0) / 100;
  const l = (parseFloat(parts[2]) || 0) / 100;

  return hslToRgb(h, s, l);
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h / 360;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

const TRAIL_LIFETIME = 450; // ms
const MAX_WIDTH = 12; // px at the cursor head

export class CursorTrail {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private points: Point[] = [];
  private animationId: number | null = null;
  private lastX = 0;
  private lastY = 0;
  private color1 = { r: 32, g: 141, b: 147 }; // accent (teal)
  private color2 = { r: 138, g: 99, b: 210 }; // secondary (violet)

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.resize();
    this.refreshColors();
  }

  refreshColors(): void {
    this.color1 = resolveHslVar("--accent");
    this.color2 = resolveHslVar("--cursor-trail-secondary");
  }

  resize(): void {
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(dpr, dpr);
  }

  onMouseMove(x: number, y: number): void {
    const now = performance.now();
    const dx = x - this.lastX;
    const dy = y - this.lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // If mouse moved a significant distance, interpolate intermediate points for silky smoothness
    if (dist > 6 && this.lastX !== 0 && this.lastY !== 0) {
      const steps = Math.min(Math.floor(dist / 4), 6);
      for (let i = 1; i <= steps; i++) {
        const factor = i / (steps + 1);
        this.points.unshift({
          x: this.lastX + dx * factor,
          y: this.lastY + dy * factor,
          time: now,
        });
      }
    }

    this.points.unshift({ x, y, time: now });
    this.lastX = x;
    this.lastY = y;

    // Cap point buffer
    if (this.points.length > 50) {
      this.points.length = 50;
    }
  }

  start(): void {
    const draw = () => {
      const now = performance.now();
      const dpr = window.devicePixelRatio || 1;
      this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);

      // Prune expired points
      this.points = this.points.filter((p) => now - p.time < TRAIL_LIFETIME);

      if (this.points.length >= 3) {
        this.drawFluidRibbon(now);
      }

      this.animationId = requestAnimationFrame(draw);
    };

    this.animationId = requestAnimationFrame(draw);
  }

  private drawFluidRibbon(now: number): void {
    const pts = this.points;
    const count = pts.length;
    if (count < 3) return;

    // Calculate normal offsets for ribbon geometry
    const leftRail: { x: number; y: number }[] = [];
    const rightRail: { x: number; y: number }[] = [];

    for (let i = 0; i < count; i++) {
      const p = pts[i];
      const age = now - p.time;
      const progress = Math.min(1, Math.max(0, age / TRAIL_LIFETIME));
      const width = MAX_WIDTH * Math.pow(1 - progress, 1.4);

      // Calculate tangent
      let dx = 0;
      let dy = 0;
      if (i === 0) {
        dx = pts[0].x - pts[1].x;
        dy = pts[0].y - pts[1].y;
      } else if (i === count - 1) {
        dx = pts[i - 1].x - pts[i].x;
        dy = pts[i - 1].y - pts[i].y;
      } else {
        dx = pts[i - 1].x - pts[i + 1].x;
        dy = pts[i - 1].y - pts[i + 1].y;
      }

      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      // Normal vector perpendicular to trajectory
      const nx = -dy / len;
      const ny = dx / len;

      leftRail.push({
        x: p.x + nx * width,
        y: p.y + ny * width,
      });
      rightRail.push({
        x: p.x - nx * width,
        y: p.y - ny * width,
      });
    }

    // Create dynamic gradient from head (accent teal) to tail (secondary violet)
    const head = pts[0];
    const tail = pts[count - 1];
    const grad = this.ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);

    const c1 = this.color1;
    const c2 = this.color2;

    grad.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.75)`);
    grad.addColorStop(0.4, `rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.45)`);
    grad.addColorStop(0.75, `rgba(${c2.r}, ${c2.g}, ${c2.b}, 0.25)`);
    grad.addColorStop(1, `rgba(${c2.r}, ${c2.g}, ${c2.b}, 0)`);

    // Render smooth continuous ribbon polygon
    this.ctx.save();
    this.ctx.beginPath();

    // Start at head of left rail
    this.ctx.moveTo(leftRail[0].x, leftRail[0].y);

    // Quadratic curve down the left rail
    for (let i = 0; i < leftRail.length - 1; i++) {
      const xc = (leftRail[i].x + leftRail[i + 1].x) / 2;
      const yc = (leftRail[i].y + leftRail[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(leftRail[i].x, leftRail[i].y, xc, yc);
    }
    this.ctx.lineTo(leftRail[leftRail.length - 1].x, leftRail[leftRail.length - 1].y);

    // Rounded tip at the tail
    const lastP = pts[count - 1];
    this.ctx.quadraticCurveTo(lastP.x, lastP.y, rightRail[rightRail.length - 1].x, rightRail[rightRail.length - 1].y);

    // Quadratic curve back up the right rail
    for (let i = rightRail.length - 1; i > 0; i--) {
      const xc = (rightRail[i].x + rightRail[i - 1].x) / 2;
      const yc = (rightRail[i].y + rightRail[i - 1].y) / 2;
      this.ctx.quadraticCurveTo(rightRail[i].x, rightRail[i].y, xc, yc);
    }
    this.ctx.lineTo(rightRail[0].x, rightRail[0].y);

    // Rounded tip at the head
    this.ctx.quadraticCurveTo(pts[0].x, pts[0].y, leftRail[0].x, leftRail[0].y);

    this.ctx.closePath();
    this.ctx.fillStyle = grad;
    this.ctx.shadowColor = `rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.5)`;
    this.ctx.shadowBlur = 14;
    this.ctx.fill();

    // Draw an ultra-fine glowing core line through the spine of the ribbon
    this.ctx.beginPath();
    this.ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
    }
    this.ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    this.ctx.restore();
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.points = [];
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);
  }

  destroy(): void {
    this.stop();
  }
}
