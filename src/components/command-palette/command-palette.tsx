import React, { useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import {
  Search,
  FileText,
  Layers,
  ArrowRight,
  ExternalLink,
  Mail,
  Linkedin,
  Github,
  Sparkles,
  Download,
} from "lucide-react";
import siteMetadata from "@/data/siteMetaData.mjs";
import { navigationRoutes } from "@/data/navigationRoutes";

interface CaseStudyItem {
  id: string;
  title: string;
  category: string;
  href: string;
}

interface ProjectItem {
  id: string;
  title: string;
  category?: string;
  isLive?: boolean;
  href: string;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "cs-1",
    title: "DeskSide: Autonomous Desktop Agent",
    category: "AGENTIC AI",
    href: "#work",
  },
  {
    id: "cs-2",
    title: "PUBG Mobile Esports Analytics Pipeline",
    category: "DATA & ANALYTICS",
    href: "#work",
  },
  {
    id: "cs-3",
    title: "Multimodal RAG with Graph Grounding",
    category: "RAG & KG",
    href: "#work",
  },
];

const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "DeskSide Agent System",
    isLive: true,
    href: "#work",
  },
  {
    id: "proj-2",
    title: "Esports Analytics Tooling",
    category: "ANALYTICS",
    href: "#work",
  },
  {
    id: "proj-3",
    title: "AI Twin Agent & Tool Pipeline",
    isLive: true,
    href: "#ai-twin",
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Keyboard shortcut listener (Cmd/Ctrl + K) & custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const target = e.target as HTMLElement;
        const isInput =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable;

        if (!isInput) {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  const handleSelect = useCallback((href: string) => {
    setIsOpen(false);
    setSearch("");

    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = href;
      }
    } else if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (href.startsWith("mailto:")) {
      window.location.href = href;
    } else {
      window.location.href = href;
    }
  }, []);

  const handleAskTwin = useCallback(() => {
    const question = search.trim();
    setIsOpen(false);
    setSearch("");
    window.dispatchEvent(
      new CustomEvent("open-ai-twin", {
        detail: { seedQuestion: question },
      })
    );
  }, [search]);

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      label="Global Command Palette"
      overlayClassName="fixed inset-0 z-50 bg-background/80 backdrop-blur-md transition-all"
      contentClassName="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 outline-none"
    >
      <div className="w-full rounded-2xl border border-border bg-surface-card shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Row */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search, or ask a question..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded border border-border bg-muted/50 text-muted-foreground hover:text-foreground"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <Command.List className="overflow-y-auto max-h-[380px] p-2 space-y-2">
          {/* Empty state: Fallback to Ask AI Twin */}
          <Command.Empty className="p-3 text-center">
            <div
              role="button"
              tabIndex={0}
              onClick={handleAskTwin}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleAskTwin();
              }}
              className="group flex items-center justify-between gap-3 p-3.5 rounded-xl border border-accent/20 bg-accent/5 hover:bg-accent/15 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-accent shrink-0" />
                <span className="text-sm text-foreground">
                  Ask the AI Twin:{" "}
                  <span className="font-semibold text-accent">
                    &ldquo;{search}&rdquo;
                  </span>
                </span>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-accent flex items-center gap-1 font-mono">
                ↵ Ask
              </span>
            </div>
          </Command.Empty>

          {/* Group 1: Case Studies */}
          <Command.Group
            heading="CASE STUDIES"
            className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            {CASE_STUDIES.map((item) => (
              <Command.Item
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground data-[selected=true]:bg-accent/15 data-[selected=true]:text-foreground data-[selected=true]:font-medium outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-accent shrink-0" />
                  <span>{item.title}</span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.category}
                </span>
              </Command.Item>
            ))}
          </Command.Group>

          {/* Group 2: Projects */}
          <Command.Group
            heading="PROJECTS"
            className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            {PROJECTS.map((proj) => (
              <Command.Item
                key={proj.id}
                value={proj.title}
                onSelect={() => handleSelect(proj.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground data-[selected=true]:bg-accent/15 data-[selected=true]:text-foreground data-[selected=true]:font-medium outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4 text-accent shrink-0" />
                  <span>{proj.title}</span>
                </div>
                {proj.isLive ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
                    <ExternalLink className="h-3 w-3" /> LIVE
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {proj.category}
                  </span>
                )}
              </Command.Item>
            ))}
          </Command.Group>

          {/* Group 3: Go To */}
          <Command.Group
            heading="GO TO"
            className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            {navigationRoutes.map((route) => (
              <Command.Item
                key={route.href}
                value={`Go to ${route.title}`}
                onSelect={() => handleSelect(route.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground data-[selected=true]:bg-accent/15 data-[selected=true]:text-foreground data-[selected=true]:font-medium outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                  <span>{route.title}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {route.href}
                </span>
              </Command.Item>
            ))}
          </Command.Group>

          {/* Group 4: Links */}
          <Command.Group
            heading="LINKS"
            className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            <Command.Item
              value="Download Resume CV PDF"
              onSelect={() => handleSelect("/resume.pdf")}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground data-[selected=true]:bg-accent/15 data-[selected=true]:text-foreground data-[selected=true]:font-medium outline-none"
            >
              <div className="flex items-center gap-2.5">
                <Download className="h-4 w-4 text-accent shrink-0" />
                <span>Download Resume</span>
              </div>
              <span className="text-xs text-muted-foreground">PDF</span>
            </Command.Item>

            <Command.Item
              value="Send Email contact message"
              onSelect={() => handleSelect(siteMetadata.email)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground data-[selected=true]:bg-accent/15 data-[selected=true]:text-foreground data-[selected=true]:font-medium outline-none"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span>Email</span>
              </div>
              <span className="text-xs text-muted-foreground">Email link</span>
            </Command.Item>

            <Command.Item
              value="GitHub profile repositories code"
              onSelect={() => handleSelect(siteMetadata.github)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground data-[selected=true]:bg-accent/15 data-[selected=true]:text-foreground data-[selected=true]:font-medium outline-none"
            >
              <div className="flex items-center gap-2.5">
                <Github className="h-4 w-4 text-accent shrink-0" />
                <span>GitHub</span>
              </div>
              <span className="text-xs text-muted-foreground">GitHub profile</span>
            </Command.Item>

            <Command.Item
              value="LinkedIn profile career experience"
              onSelect={() => handleSelect(siteMetadata.linkedin)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground data-[selected=true]:bg-accent/15 data-[selected=true]:text-foreground data-[selected=true]:font-medium outline-none"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="h-4 w-4 text-accent shrink-0" />
                <span>LinkedIn</span>
              </div>
              <span className="text-xs text-muted-foreground">LinkedIn profile</span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        {/* Footer Bar */}
        <div className="border-t border-border px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border text-[10px]">
                ↑↓
              </kbd>{" "}
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border text-[10px]">
                ↵
              </kbd>{" "}
              select
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border text-[10px]">
                esc
              </kbd>{" "}
              close
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-accent font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">type to ask the twin</span>
            <span className="sm:hidden">ask twin</span>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
}
