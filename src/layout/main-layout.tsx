import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import ScrollProgressBar from "@/components/layout/scroll-progress-bar";
import CommandPalette from "@/components/command-palette/command-palette";
import FloatingChatButton from "@/components/chat/floating-chat-button";

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
    <div className="relative flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Ambient background glows matching reference visual depth */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[15%] -left-[10%] h-[60vw] w-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute top-[25%] -right-[15%] h-[55vw] w-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-[#8a63d2]/10 blur-[140px]" />
        <div className="absolute top-[70%] -left-[10%] h-[50vw] w-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-accent/10 blur-[130px]" />
      </div>

      {/* Fixed Global Elements */}
      <ScrollProgressBar />
      <FluidCursor />
      <WelcomeScreen />
      <CommandPalette />
      <FloatingChatButton />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 w-full relative z-10">{children}</main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
