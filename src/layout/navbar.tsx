import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Download } from "lucide-react";
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
        rootMargin: "-20% 0px -60% 0px",
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
    <header className="sticky top-0 z-40 px-6 py-4 sm:px-10 md:px-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Name (visible on all viewports) */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
        >
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-lg overflow-hidden border border-accent/30 shadow-md shadow-accent/15 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo/logo.png"
              alt="Abdul Samad Logo"
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            Abdul Samad
          </span>
        </Link>

        {/* Desktop: Floating Pill Nav (Right-aligned, compact, matching reference screenshot) */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full px-3.5 py-1.5 border border-zinc-200/80 dark:border-white/10 bg-background/80 dark:bg-[#0c181d]/85 backdrop-blur-xl shadow-lg ring-1 ring-zinc-200/50 dark:ring-white/5"
          aria-label="Main Navigation"
        >
          {/* Nav links */}
          <div className="flex items-center gap-0.5">
            {navigationRoutes.map((route) => {
              const sectionId = route.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={route.href}
                  href={route.href}
                  className={`px-3 py-1 text-xs lg:text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-accent font-semibold bg-accent/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {route.title}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-border/60 mx-1.5" />

          {/* Controls: ⌘K, ThemeSwitch, Resume */}
          <div className="flex items-center gap-2">
            {/* ⌘K Trigger Chip */}
            <button
              type="button"
              aria-label="Open command palette search"
              onClick={openPalette}
              className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Search className="h-3 w-3" />
              <kbd className="font-mono text-[10px] bg-background/60 px-1 py-0.2 rounded border border-border">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeSwitch
              className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              iconClassName="h-3.5 w-3.5"
            />

            {/* Resume button matching reference pill */}
            <a
              href="/resume.pdf"
              download
              aria-disabled="true"
              title="Resume coming soon"
              className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-accent-foreground opacity-75 transition-all"
            >
              <Download className="h-3 w-3" />
              <span>Resume</span>
            </a>
          </div>
        </nav>

        {/* Mobile: Hamburger Button */}
        <div className="flex md:hidden items-center">
          <MenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
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
