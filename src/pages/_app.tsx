import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Sora } from "next/font/google";
import dynamic from "next/dynamic";

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
      <FluidCursor />
      <Component {...pageProps} />
    </div>
  );
}
