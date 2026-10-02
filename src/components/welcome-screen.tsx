import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { ChevronDown } from "lucide-react";

const STORAGE_KEY = "has_seen_welcome";

const TAGLINES = [
  "Applied AI Engineer",
  "Generative AI & Agentic Pipelines",
  "BS Artificial Intelligence • FAST NUCES",
  "Welcome to My Digital Workspace",
];

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [particlesInit, setParticlesInit] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Check first-visit state in localStorage
  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        setIsVisible(true);
      }
    } catch {
      // In private browsing or storage disabled, default to not blocking
      setIsVisible(false);
    }
  }, []);

  // Detect mobile screen for particle count tuning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize tsparticles engine
  useEffect(() => {
    if (!isVisible) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, [isVisible]);

  // Rotate taglines every 2.5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Dismiss handler
  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
  }, []);

  // Event listeners for dismiss (scroll, touch, keydown)
  useEffect(() => {
    if (!isVisible) return;

    const handleWheel = () => dismiss();
    const handleTouchMove = () => dismiss();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" ||
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "ArrowDown"
      ) {
        dismiss();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, dismiss]);

  // Particles config
  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      fullScreen: { enable: false },
      particles: {
        number: {
          value: isMobile ? 20 : 50,
          density: { enable: true },
        },
        color: {
          value: ["#208D93", "#56A5A9", "#38bdf8"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.15, max: 0.5 },
          animation: {
            enable: !shouldReduceMotion,
            speed: 0.8,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3.5 },
        },
        move: {
          enable: !shouldReduceMotion,
          speed: 0.9,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
        links: {
          enable: !shouldReduceMotion,
          distance: isMobile ? 90 : 120,
          color: "#208D93",
          opacity: 0.18,
          width: 1,
        },
      },
      detectRetina: true,
    }),
    [isMobile, shouldReduceMotion]
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={dismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md cursor-pointer select-none overflow-hidden"
          role="dialog"
          aria-label="Welcome screen"
          aria-modal="true"
        >
          {/* Background particles */}
          {particlesInit && (
            <div className="absolute inset-0 pointer-events-none">
              <Particles
                id="welcome-particles"
                options={particlesOptions}
                className="w-full h-full"
              />
            </div>
          )}

          {/* Ambient gradient blobs */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Content container */}
          <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
            {/* Status pill */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>Abdul Samad &bull; Portfolio</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-foreground mb-4"
            >
              Innovating with <span className="text-gradient">Intelligent AI</span>
            </motion.h1>

            {/* Rotating tagline */}
            <div className="h-8 sm:h-10 flex items-center justify-center mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIndex}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8 }
                  }
                  transition={{ duration: 0.35 }}
                  className="text-base sm:text-lg font-medium text-muted-foreground"
                >
                  {TAGLINES[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Dismiss prompt */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-2 text-xs text-muted-foreground/80 hover:text-accent transition-colors"
            >
              <span>Scroll, tap, or press any key to enter</span>
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, 5, 0],
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-4 h-4 text-accent" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
