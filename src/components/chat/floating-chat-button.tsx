import React from "react";
import { MessageSquare } from "lucide-react";

export default function FloatingChatButton() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-ai-twin"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Talk to AI Twin"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
    >
      <MessageSquare className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
}
