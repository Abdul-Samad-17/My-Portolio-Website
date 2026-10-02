import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Sora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { AnimationGateProvider } from "@/contexts/animation-gate";
import PageTransitionAnimation from "@/components/page-transition-animation";
import MainLayout from "@/layout/main-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className={`${inter.variable} ${sora.variable} font-sans min-h-screen bg-background text-foreground`}
      >
        <AnimationGateProvider>
          <MainLayout>
            <PageTransitionAnimation>
              <Component {...pageProps} />
            </PageTransitionAnimation>
          </MainLayout>
          <Analytics />
        </AnimationGateProvider>
      </div>
    </ThemeProvider>
  );
}
