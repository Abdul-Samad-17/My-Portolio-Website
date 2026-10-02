import React from "react";
import Head from "next/head";
import { Card, Button, Badge, Pill, StatCounter, CyclingText } from "@/components/ui";

export default function UiKitPage() {
  return (
    <>
      <Head>
        <title>UI Kit Showcase — Abdul Samad Portfolio</title>
      </Head>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Shared UI Primitives <span className="text-accent">Showcase</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Validation page for Card, Button, Badge, and Pill primitives across breakpoints and themes.
          </p>
        </div>

        {/* 1. Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-semibold text-foreground border-b border-border pb-2">
            1. Buttons
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" shape="rounded">
              Primary Rounded
            </Button>
            <Button variant="primary" shape="pill">
              Primary Pill CTA
            </Button>
            <Button variant="secondary" shape="pill">
              Secondary Outline Pill
            </Button>
            <Button variant="ghost">
              Ghost Button
            </Button>
            <Button variant="primary" disabled shape="pill">
              Disabled Button
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large CTA Button</Button>
          </div>
        </section>

        {/* 2. Badges & Pills */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-semibold text-foreground border-b border-border pb-2">
            2. Badges &amp; Pills
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="status">Available for new opportunities</Badge>
            <Badge variant="live">LIVE</Badge>
            <Badge variant="category">AGENTIC AI</Badge>
            <Badge variant="category">RAG &amp; KG</Badge>
          </div>
          <div className="flex flex-wrap gap-2.5 items-center">
            <Pill>Next.js 15</Pill>
            <Pill>TypeScript</Pill>
            <Pill>Tailwind CSS</Pill>
            <Pill>Framer Motion</Pill>
            <Pill active>Active Filter Pill</Pill>
            <Pill>Extremely Long Tech Tag That Should Wrap Gracefully On 320px Mobile Screens Without Breaking Layout</Pill>
          </div>
        </section>

        {/* 3. Cards */}
        <section className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-foreground border-b border-border pb-2">
            3. Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <Badge variant="category">DEFAULT CARD</Badge>
              <h3 className="text-xl font-heading font-bold text-foreground mt-2">
                Default Section Glass Card
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                With rounded-2xl border, backdrop blur, and subtle inner ring glow.
              </p>
            </Card>

            <Card variant="compact">
              <div className="flex items-center justify-between">
                <Badge variant="live">LIVE</Badge>
                <Badge variant="category">COMPACT CARD</Badge>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mt-3">
                Project Grid Compact Card
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                With hover lift and shadow accent glow.
              </p>
            </Card>

            <Card variant="recessed" className="md:col-span-2">
              <Badge variant="category">RECESSED CARD</Badge>
              <h3 className="text-lg font-heading font-semibold text-foreground mt-2">
                Recessed Sub-Section Container
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Uses surface-card-muted token for secondary contrast nesting.
              </p>
            </Card>
          </div>
        </section>

        {/* 4. StatCounter & CyclingText */}
        <section className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-foreground border-b border-border pb-2">
            4. Stat Counters &amp; Cycling Text (FlipWords)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-border bg-surface-card">
            <StatCounter value={12} suffix="+" label="Production AI Agents" />
            <StatCounter value={99} suffix="%" label="Benchmark Accuracy" />
            <StatCounter value={4} label="MCP Servers Deployed" />
            <StatCounter value={500} suffix="K+" label="Tokens Processed / Day" />
          </div>

          <div className="p-6 rounded-2xl border border-border bg-surface-card">
            <p className="text-lg font-heading font-medium text-foreground">
              Building next-generation solutions for{" "}
              <CyclingText
                words={["Agentic Workflows", "Generative AI", "Knowledge Graphs", "Autonomous Systems"]}
              />
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
