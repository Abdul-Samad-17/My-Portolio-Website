import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import ThemeSwitch from "@/components/utility/theme-switch";
import MenuButton from "@/components/utility/menu-button";
import MobileMenu from "@/components/utility/mobile-menu";
import { navigationRoutes } from "@/data/navigationRoutes";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "experience",
      "work",
      "built-and-shipped",
      "skills",
      "ai-twin",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header className="sticky top-0 z-40 mt-0 px-6 py-4 sm:mt-2 sm:px-14 sm:py-5 md:px-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Header Row: Logo + Hamburger */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-bold"
          >
            <span className="font-heading text-xl font-bold">
              <span className="text-foreground">A</span>
              <span className="text-accent">S</span>
            </span>
            <span className="text-foreground">Abdul Samad</span>
          </Link>
          <MenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>

        {/* Desktop Floating Glass Pill Nav */}
        <nav
          className="hidden md:flex flex-grow items-center justify-between gap-3 rounded-full px-4 py-2 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur-xl dark:ring-accent/30 bg-background/70 dark:bg-background/50"
          aria-label="Main Navigation"
        >
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-base font-bold pl-2 pr-2 hover:opacity-85 transition-opacity"
          >
            <span className="font-heading text-lg font-bold">
              <span className="text-foreground">A</span>
              <span className="text-accent">S</span>
            </span>
            <span className="text-foreground whitespace-nowrap">
              Abdul Samad
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navigationRoutes.map((route) => {
              const sectionId = route.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={route.href}
                  href={route.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent font-semibold text-accent-foreground shadow-md shadow-accent/25"
                      : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                  }`}
                >
                  {route.title}
                </a>
              );
            })}
          </div>

          {/* Right Controls: ⌘K, ThemeSwitch, Resume */}
          <div className="flex items-center gap-2.5 pr-1">
            {/* ⌘K Trigger Chip */}
            <button
              type="button"
              aria-label="Open command palette search"
              onClick={openPalette}
              className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="font-mono text-[10px] bg-background/60 px-1 py-0.5 rounded border border-border">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeSwitch
              className="p-1.5 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
              iconClassName="h-4 w-4"
            />

            {/* Resume button */}
            <a
              href="/resume.pdf"
              download
              aria-disabled="true"
              title="Resume coming soon"
              className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground opacity-50 cursor-not-allowed pointer-events-none hover:bg-accent-light transition-colors"
            >
              Resume
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onOpenPalette={openPalette}
      />
    </header>
  );
}
