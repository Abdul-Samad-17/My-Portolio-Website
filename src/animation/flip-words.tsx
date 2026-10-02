import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utility/cn";

export interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords = ({
  words,
  duration = 2000,
  className,
}: FlipWordsProps) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        key={currentWord}
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 10,
              }
        }
        animate={
          shouldReduceMotion
            ? { opacity: 1, transition: { duration: 0 } }
            : {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                },
              }
        }
        exit={
          shouldReduceMotion
            ? { opacity: 0, transition: { duration: 0 } }
            : {
                opacity: 0,
                y: -30,
                x: 20,
                filter: "blur(6px)",
                scale: 1.1,
                position: "absolute",
              }
        }
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className={cn(
          "z-10 inline-block relative text-left text-accent font-semibold",
          className
        )}
      >
        {shouldReduceMotion ? (
          <span>{currentWord}</span>
        ) : (
          currentWord.split(" ").map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: wordIndex * 0.2,
                duration: 0.3,
              }}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: wordIndex * 0.2 + letterIndex * 0.04,
                    duration: 0.2,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))
        )}
      </motion.span>
    </AnimatePresence>
  );
};

export const CyclingText = FlipWords;
export default FlipWords;
