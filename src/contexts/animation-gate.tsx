import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useReducedMotion } from "framer-motion";

interface AnimationGateContextType {
  isAnimationAllowed: boolean;
  canAnimate: boolean;
  setIsAnimationAllowed: (allowed: boolean) => void;
  allowAnimation: () => void;
  blockAnimation: () => void;
}

const AnimationGateContext = createContext<AnimationGateContextType>({
  isAnimationAllowed: true,
  canAnimate: true,
  setIsAnimationAllowed: () => {},
  allowAnimation: () => {},
  blockAnimation: () => {},
});

export const AnimationGateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isAnimationAllowed, setIsAnimationAllowed] = useState<boolean>(true);

  // If user prefers reduced motion, always allow animations immediately
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsAnimationAllowed(true);
    }
  }, [shouldReduceMotion]);

  const allowAnimation = useCallback(() => {
    setIsAnimationAllowed(true);
  }, []);

  const blockAnimation = useCallback(() => {
    if (!shouldReduceMotion) {
      setIsAnimationAllowed(false);
    }
  }, [shouldReduceMotion]);

  const value = {
    isAnimationAllowed: shouldReduceMotion ? true : isAnimationAllowed,
    canAnimate: shouldReduceMotion ? true : isAnimationAllowed,
    setIsAnimationAllowed,
    allowAnimation,
    blockAnimation,
  };

  return (
    <AnimationGateContext.Provider value={value}>
      {children}
    </AnimationGateContext.Provider>
  );
};

export const useAnimationGate = () => useContext(AnimationGateContext);

export default AnimationGateContext;
