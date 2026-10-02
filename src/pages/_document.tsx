import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0c1214" />
      </Head>
      <body className="bg-background text-foreground antialiased selection:bg-accent/25 selection:text-accent">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
