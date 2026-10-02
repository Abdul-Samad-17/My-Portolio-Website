import React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/utility/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "status" | "category" | "live";
  className?: string;
  children?: React.ReactNode;
}

export function Badge({
  variant = "status",
  className,
  children,
  ...props
}: BadgeProps) {
  if (variant === "status") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent select-none",
          className
        )}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent motion-safe:animate-pulse" />
        </span>
        {children || "Available for new opportunities"}
      </span>
    );
  }

  if (variant === "live") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent select-none",
          className
        )}
        {...props}
      >
        <ExternalLink className="h-3 w-3" />
        {children || "LIVE"}
      </span>
    );
  }

  // variant === "category"
  return (
    <span
      className={cn(
        "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
