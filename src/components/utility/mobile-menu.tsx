import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, FileText, X } from "lucide-react";
import ThemeSwitch from "@/components/utility/theme-switch";
import { navigationRoutes } from "@/data/navigationRoutes";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onOpenPalette?: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onOpenPalette,
}: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -20 },
    open: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        },
  };

  const handlePaletteClick = () => {
    onClose();
    if (onOpenPalette) {
      onOpenPalette();
    } else {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu-overlay"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-2xl md:hidden overflow-y-auto px-6 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Header row inside menu */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2 font-heading text-lg font-bold"
            >
              <span className="font-heading text-xl font-bold">
                <span className="text-foreground">A</span>
                <span className="text-accent">S</span>
              </span>
              <span className="text-foreground">Abdul Samad</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeSwitch
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                iconClassName="h-5 w-5"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col py-8 space-y-3">
            {navigationRoutes.map((route) => {
              const sectionId = route.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={route.href}
                  href={route.href}
                  onClick={onClose}
                  className={`text-2xl font-heading font-medium px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold shadow-lg shadow-accent/25"
                      : "text-muted-foreground hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  {route.title}
                </a>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
            {/* ⌘K trigger button */}
            <button
              type="button"
              onClick={handlePaletteClick}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-muted-foreground hover:text-accent transition-colors"
            >
              <span className="flex items-center gap-3 text-sm">
                <Search className="h-4 w-4" /> Search or ask...
              </span>
              <kbd className="font-mono text-xs bg-muted px-2 py-0.5 rounded border border-border">
                ⌘K
              </kbd>
            </button>

            {/* Resume button */}
            <a
              href="/resume.pdf"
              download
              aria-disabled="true"
              title="Resume coming soon"
              className="flex items-center justify-center gap-2 w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground opacity-50 cursor-not-allowed pointer-events-none"
            >
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
