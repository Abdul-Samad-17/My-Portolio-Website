import React from "react";
import { cn } from "@/utility/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact" | "recessed";
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const base =
    "relative overflow-hidden border border-border backdrop-blur-lg transition-all duration-300";

  const variants = {
    default:
      "rounded-2xl bg-surface-card shadow-lg ring-1 ring-zinc-200/50 dark:ring-accent/20 p-6 sm:p-8 md:p-12",
    compact:
      "rounded-lg border-accent/20 shadow-md hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 p-4 sm:p-6",
    recessed:
      "rounded-2xl bg-surface-card-muted p-6 sm:p-8",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
