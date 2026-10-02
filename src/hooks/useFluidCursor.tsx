/**
 * useFluidCursor hook — [CLONE] mechanism.
 *
 * Manages the CursorTrail lifecycle: instantiation, mouse-move binding,
 * resize handling, theme-change color refresh, and cleanup.
 */

import { useEffect, useRef } from "react";
import { CursorTrail } from "@/utility/cursor-trail";

export function useFluidCursor(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const trailRef = useRef<CursorTrail | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const trail = new CursorTrail(canvas);
    trailRef.current = trail;
    trail.start();

    const handleMouseMove = (e: MouseEvent) => {
      trail.onMouseMove(e.clientX, e.clientY);
    };

    const handleResize = () => {
      trail.resize();
    };

    // [BUILD] Refresh colors when theme changes (class swap on <html>)
    const observer = new MutationObserver(() => {
      trail.refreshColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      trail.destroy();
      trailRef.current = null;
    };
  }, [canvasRef]);
}
