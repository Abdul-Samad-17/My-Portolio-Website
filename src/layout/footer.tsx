import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import siteMetadata from "@/data/siteMetaData.mjs";
import { navigationRoutes } from "@/data/navigationRoutes";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Filter routes for footer nav (About, Experience, Work, Skills, Contact)
  const footerRoutes = navigationRoutes.filter(
    (route) => route.href !== "#ai-twin"
  );

  return (
    <footer className="mt-20">
      <div className="rounded-t-2xl border-t border-border bg-muted/20 shadow-md ring-1 ring-zinc-200 backdrop-blur-lg dark:ring-accent/50">
        <div className="max-w-7xl mx-auto px-6 py-10 sm:px-14 md:px-20">
          {/* Top Row: Brand & Nav Links */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Logo + Name */}
            <Link
              href="/"
              className="flex items-center gap-2.5 font-heading text-lg font-bold group"
            >
              <div className="h-8 w-8 rounded-lg overflow-hidden border border-accent/30 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo/logo.png"
                  alt="Abdul Samad Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-foreground group-hover:text-accent transition-colors">
                {siteMetadata.author}
              </span>
            </Link>

            {/* Nav links */}
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
              aria-label="Footer Navigation"
            >
              {footerRoutes.map((route) => (
                <a
                  key={route.href}
                  href={route.href}
                  className="inline-flex items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
                >
                  {route.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Middle Row: Open to roles & Download Resume */}
          <div className="my-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-y border-border/60">
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              {siteMetadata.openToRoles}
            </p>
            <a
              href="/resume.pdf"
              download
              aria-disabled="true"
              title="Resume coming soon"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground opacity-50 cursor-not-allowed pointer-events-none hover:bg-accent-light transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <FileText className="h-4 w-4" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Bottom Bar: Copyright & Socials */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-2">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              &copy; {currentYear} {siteMetadata.author}. Built with Next.js &amp; Tailwind.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Email */}
              <a
                href={siteMetadata.email}
                aria-label="Send email"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-accent-foreground hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="h-5 w-5" />
              </a>

              {/* LinkedIn */}
              <a
                href={siteMetadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-accent-foreground hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              {/* GitHub */}
              <a
                href={siteMetadata.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-accent-foreground hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
