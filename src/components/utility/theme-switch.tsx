import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitchProps {
  className?: string;
  iconClassName?: string;
}

export default function ThemeSwitch({
  className = "p-2 rounded-full text-muted-foreground hover:text-accent transition-colors flex items-center justify-center",
  iconClassName = "h-5 w-5 md:h-4 md:w-4",
}: ThemeSwitchProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`${className} opacity-0 pointer-events-none`}
        aria-hidden="true"
      >
        <span className={iconClassName} />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
    >
      {isDark ? (
        <Sun className={iconClassName} />
      ) : (
        <Moon className={iconClassName} />
      )}
    </button>
  );
}
