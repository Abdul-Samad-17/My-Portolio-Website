/**
 * useFluidCursor hook — [CLONE] mechanism.
 *
 * Manages the Navier-Stokes FluidSimulation lifecycle:
 * Instantiation, dynamic theme color observer, and cleanup.
 */

import { useEffect, useRef } from "react";
import { FluidSimulation } from "@/utility/fluid-simulation";

export function useFluidCursor(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const simRef = useRef<FluidSimulation | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sim = new FluidSimulation(canvas, {
      simResolution: 128,
      dyeResolution: 1024,
      densityDissipation: 2.4,   // Shorter span (~1.5s) — fluid fades at its position
      velocityDissipation: 2.2,  // Fluid stays in its own place until disturbed
      pressure: 0.8,
      pressureIterations: 20,
      curl: 24,                  // Smooth liquid swirls, not powder
      splatRadius: 0.35,         // Defined circular head
      splatForce: 5500,          // Balanced impulse
      bloom: true,               // Soft luminous sheen
      bloomIterations: 6,
      bloomIntensity: 0.20,      // Soft, gentle light — not shiny or blinding
      bloomThreshold: 0.65,
      bloomSoftKnee: 0.7,
      shading: true,             // 3D fluid depth
    });
    simRef.current = sim;

    // Refresh colors when theme changes (light/dark class toggle on <html>)
    const observer = new MutationObserver(() => {
      sim.updateColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      sim.destroy();
      simRef.current = null;
    };
  }, [canvasRef]);
}
