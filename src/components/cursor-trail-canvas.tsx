/**
 * CursorTrailCanvas — [CLONE] pattern.
 *
 * Full-screen fixed canvas that renders the fluid cursor trail.
 * Sits behind all interactive content (pointer-events-none, z-30).
 */

import { useRef } from "react";
import { useFluidCursor } from "@/hooks/useFluidCursor";

export default function CursorTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFluidCursor(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
    />
  );
}
