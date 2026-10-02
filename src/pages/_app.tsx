import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Sora } from "next/font/google";
import dynamic from "next/dynamic";
import { AnimationGateProvider } from "@/contexts/animation-gate";
import PageTransitionAnimation from "@/components/page-transition-animation";

const FluidCursor = dynamic(() => import("@/components/fluid-cursor"), {
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
    <div className={`${inter.variable} ${sora.variable} font-sans`}>
      <AnimationGateProvider>
        <FluidCursor />
        <PageTransitionAnimation>
          <Component {...pageProps} />
        </PageTransitionAnimation>
      </AnimationGateProvider>
    </div>
  );
}
