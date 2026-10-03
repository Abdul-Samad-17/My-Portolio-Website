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
      densityDissipation: 1.6, // Slow, graceful dissipation — holds persistent shape as it fades
      velocityDissipation: 4.5, // High velocity damping — prevents churning/shredding into separated wisps
      pressure: 0.8,
      pressureIterations: 20,
      curl: 0.3, // Low curl — prevents tearing dye into powder/wisps, keeping a cohesive wave
      splatRadius: 0.34, // Generous width for a full, present fluid body
      splatForce: 1100, // Soft forward impulse — doesn't shear the fluid envelope
      bloom: true,
      bloomIterations: 8,
      bloomIntensity: 0.20, // Subtle neon sheen without noisy speckles
      shading: false, // Disabled harsh 3D normal-map to eliminate powdery/granular artifacts
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
