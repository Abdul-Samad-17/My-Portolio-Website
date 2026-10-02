import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAnimationGate } from "@/contexts/animation-gate";

interface PageTransitionAnimationProps {
  children: React.ReactNode;
}

export default function PageTransitionAnimation({
  children,
}: PageTransitionAnimationProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { allowAnimation, blockAnimation } = useAnimationGate();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      allowAnimation();
    }
  }, [allowAnimation]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      const targetPath = url.split("?")[0].split("#")[0];
      const currentPath = router.asPath.split("?")[0].split("#")[0];

      if (targetPath !== currentPath) {
        blockAnimation();
      }
    };

    const handleRouteChangeError = () => {
      allowAnimation();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.asPath, router.events, blockAnimation, allowAnimation]);

  const transitionVariants = {
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0.8,
        },
    animate: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0 } }
      : {
          clipPath: "circle(150% at 50% 50%)",
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1], // ease-standard
          },
        },
    exit: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0 } }
      : {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0.8,
          transition: {
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1], // ease-snappy
          },
        },
  };

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        if (typeof window !== "undefined") {
          window.scrollTo(0, 0);
        }
      }}
    >
      <motion.div
        key={router.pathname}
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onAnimationComplete={() => {
          allowAnimation();
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
