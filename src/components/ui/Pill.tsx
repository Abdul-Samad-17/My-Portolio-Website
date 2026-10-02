import React from "react";
import { cn } from "@/utility/cn";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Pill({ active = false, className, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors select-none",
        active
          ? "border-accent bg-accent text-accent-foreground font-semibold shadow-md shadow-accent/25"
          : "border-accent/20 bg-accent/10 text-accent hover:bg-accent/15",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Pill;
