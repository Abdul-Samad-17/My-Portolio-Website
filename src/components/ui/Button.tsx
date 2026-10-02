import React, { forwardRef } from "react";
import { cn } from "@/utility/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  shape?: "pill" | "rounded";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      shape = "rounded",
      size = "md",
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-colors select-none " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
      "disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
      primary:
        "bg-accent text-accent-foreground hover:bg-accent-light active:bg-accent-dark",
      secondary:
        "border border-accent/40 bg-transparent text-accent hover:bg-accent/10 active:bg-accent/20",
      ghost:
        "bg-transparent text-foreground hover:text-accent hover:bg-accent/5 active:bg-accent/10",
    };

    const shapes = {
      pill: "rounded-full",
      rounded: "rounded-lg",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm sm:text-base gap-2",
      lg: "px-6 py-3 text-base sm:text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          base,
          variants[variant],
          shapes[shape],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
