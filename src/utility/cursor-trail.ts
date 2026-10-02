/**
 * Cursor trail utility — [CLONE] mechanism + [BUILD] two-color extension.
 *
 * Draws a fluid smoke/trail effect on a full-screen canvas following the mouse.
 * Colors are resolved at runtime from CSS custom properties (--accent and
 * --cursor-trail-secondary) so the trail automatically updates with the theme.
 */

export interface TrailPoint {
  x: number;
  y: number;
  dx: number;
  dy: number;
  age: number;
  size: number;
}

/**
 * [BUILD] Resolve an HSL CSS custom property to an { r, g, b } object.
 * The CSS variable stores raw HSL triplets like "183 65% 35%" (no hsl() wrapper),
 * so we parse manually.
 */
export function resolveHslVar(varName: string): { r: number; g: number; b: number } {
  if (typeof window === "undefined") return { r: 0, g: 0, b: 0 };

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  if (!raw) return { r: 0, g: 0, b: 0 };

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

const MAX_TRAIL_POINTS = 50;
const POINT_LIFETIME = 40;

export class CursorTrail {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private points: TrailPoint[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private animationId: number | null = null;
  private color1 = { r: 31, g: 141, b: 147 }; // accent fallback
  private color2 = { r: 138, g: 99, b: 210 }; // secondary fallback

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.resize();
    this.refreshColors();
  }

  /** [BUILD] Re-read both CSS-variable colors (call on theme change). */
  refreshColors(): void {
    this.color1 = resolveHslVar("--accent");
    this.color2 = resolveHslVar("--cursor-trail-secondary");
  }

  resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onMouseMove(x: number, y: number): void {
    const dx = x - this.mouseX;
    const dy = y - this.mouseY;
    this.mouseX = x;
    this.mouseY = y;

    if (this.points.length < MAX_TRAIL_POINTS) {
      this.points.push({
        x,
        y,
        dx: dx * 0.15,
        dy: dy * 0.15,
        age: 0,
        size: Math.min(Math.sqrt(dx * dx + dy * dy) * 0.4, 12),
      });
    }
  }

  start(): void {
    const draw = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.points = this.points.filter((p) => p.age < POINT_LIFETIME);

      for (const point of this.points) {
        point.age++;
        point.x += point.dx;
        point.y += point.dy;
        point.dx *= 0.96;
        point.dy *= 0.96;

        const progress = point.age / POINT_LIFETIME;
        const alpha = 1 - progress;
        const size = point.size * (1 - progress * 0.5);

        // [BUILD] Blend between color1 (accent) and color2 (secondary) based on progress
        const r = Math.round(
          this.color1.r + (this.color2.r - this.color1.r) * progress
        );
        const g = Math.round(
          this.color1.g + (this.color2.g - this.color1.g) * progress
        );
        const b = Math.round(
          this.color1.b + (this.color2.b - this.color1.b) * progress
        );

        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
        this.ctx.fill();
      }

      this.animationId = requestAnimationFrame(draw);
    };

    this.animationId = requestAnimationFrame(draw);
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.points = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  destroy(): void {
    this.stop();
  }
}
