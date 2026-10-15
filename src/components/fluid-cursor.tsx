/**
 * FluidCursor — [CLONE] mount wrapper + [BUILD] reduced-motion gate.
 *
 * Dynamically imported with { ssr: false } in _app.tsx.
 * Respects prefers-reduced-motion for accessibility while ensuring
 * the WebGL simulation mounts reliably across all devices.
 */

import { useReducedMotion } from "framer-motion";
import CursorTrailCanvas from "@/components/cursor-trail-canvas";

export default function FluidCursor() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return <CursorTrailCanvas />;
}
