import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Sora } from "next/font/google";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { AnimationGateProvider } from "@/contexts/animation-gate";
import PageTransitionAnimation from "@/components/page-transition-animation";

const FluidCursor = dynamic(() => import("@/components/fluid-cursor"), {
  ssr: false,
});

const WelcomeScreen = dynamic(() => import("@/components/welcome-screen"), {
  ssr: false,
});

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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className={`${inter.variable} ${sora.variable} font-sans min-h-screen bg-background text-foreground`}>
        <AnimationGateProvider>
          <FluidCursor />
          <WelcomeScreen />
          <PageTransitionAnimation>
            <Component {...pageProps} />
          </PageTransitionAnimation>
        </AnimationGateProvider>
      </div>
    </ThemeProvider>
  );
}
