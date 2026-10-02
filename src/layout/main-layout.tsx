import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import ScrollProgressBar from "@/components/layout/scroll-progress-bar";
import CommandPalette from "@/components/command-palette/command-palette";

const FluidCursor = dynamic(() => import("@/components/fluid-cursor"), {
  ssr: false,
});

const WelcomeScreen = dynamic(() => import("@/components/welcome-screen"), {
  ssr: false,
});

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Fixed Global Elements */}
      <ScrollProgressBar />
      <FluidCursor />
      <WelcomeScreen />
      <CommandPalette />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
