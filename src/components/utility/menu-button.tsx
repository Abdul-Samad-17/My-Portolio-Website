import React from "react";
import { Menu, X } from "lucide-react";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export default function MenuButton({
  isOpen,
  onClick,
  className = "",
  ariaLabel = "Toggle navigation menu",
}: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className={`flex items-center justify-center p-2 rounded-full text-foreground hover:text-accent hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}
