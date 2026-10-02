/**
 * FluidCursor — [CLONE] mount wrapper + [BUILD] reduced-motion + touch gate.
 *
 * This component is dynamically imported with { ssr: false } in _app.tsx.
 * It gates the cursor trail behind:
 *   1. useReducedMotion() — skip for accessibility
 *   2. (hover: hover) media query — skip on touch-primary devices
 */

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import CursorTrailCanvas from "@/components/cursor-trail-canvas";

export default function FluidCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    // Only mount trail on devices with a fine pointer (mouse/trackpad)
    const mq = window.matchMedia("(hover: hover)");
    setHasHover(mq.matches);

    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion || !hasHover) {
    return null;
  }

  return <CursorTrailCanvas />;
}
