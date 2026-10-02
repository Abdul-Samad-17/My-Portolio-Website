import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { cn } from "@/utility/cn";

export interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
}

export function StatCounter({
  value,
  suffix = "",
  label,
  className,
  duration = 1.2, // 1200ms per Part B duration-counter token
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    shouldReduceMotion ? value : 0
  );
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1], // ease-standard
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, shouldReduceMotion, duration]);

  return (
    <div
      ref={ref}
      className={cn("flex flex-col select-none", className)}
      aria-live="off"
    >
      {/* Accessible screen reader text - always displays the final full value immediately */}
      <span className="sr-only">
        {value}
        {suffix} {label}
      </span>

      {/* Visual animated counter */}
      <div className="flex items-baseline gap-0.5" aria-hidden="true">
        <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
          {displayValue}
        </span>
        {suffix && (
          <span className="text-2xl sm:text-3xl font-heading font-bold text-accent">
            {suffix}
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1 leading-snug">
        {label}
      </p>
    </div>
  );
}

export default StatCounter;
