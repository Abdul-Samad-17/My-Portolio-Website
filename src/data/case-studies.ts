// Generic placeholder case studies for Abdul Samad's portfolio.

export type CaseStudyKind = "system" | "product";

export type CaseStudyTheme =
  | "agents"
  | "retrieval"
  | "platform"
  | "products";

export interface CaseStudyDecision {
  choice: string;
  why: string;
  rejected?: string[];
}

export interface CaseStudyResult {
  metric: string;
  label: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
  points?: string[];
}

export interface CaseStudy {
  slug: string;
  kind: CaseStudyKind;
  theme: CaseStudyTheme;
  featured?: boolean;
  title: string;
  employer: string;
  period: string;
  oneLiner: string;
  summary: string;
  problem: string;
  constraints: string[];
  diagram?: "eval" | "mcp" | "kgrag" | "docs" | "gateway" | "generic" | null;
  diagramCaption?: string;
  decisions: CaseStudyDecision[];
  sections: CaseStudySection[];
  stack: string[];
  ownership: string;
  results: CaseStudyResult[];
  tags: string[];
  aliases: string[];
}

export type CaseStudySlug =
  | "example-system-a"
  | "example-system-b"
  | "example-system-c"
  | "example-system-d";

export const CASE_STUDY_SLUGS: CaseStudySlug[] = [
  "example-system-a",
  "example-system-b",
  "example-system-c",
  "example-system-d",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "example-system-a",
    kind: "system",
    theme: "platform",
    featured: true,
    title: "Example System A",
    employer: "Example Organization",
    period: "2026",
    oneLiner: "A generic placeholder case study illustrating automated platform reliability and data processing workflows.",
    summary: "This is a generic placeholder case study demonstrating platform architecture patterns, data processing workflows, and reliability engineering across distributed pipelines.",
    problem: "Demonstrating how platform reliability is architected, monitored, and evaluated under structured engineering constraints with measurable quality benchmarks.",
    constraints: [
      "Must operate within defined memory and compute budgets across continuous execution runs.",
      "Must provide clear logging and deterministic telemetry for all incoming pipeline payloads.",
      "Architecture must follow modular engineering practices with decoupled services and queues.",
    ],
    diagram: "generic",
    diagramCaption: "Architecture diagram showing ingestion, pipeline processing, and storage components.",
    decisions: [
      {
        choice: "Modular service architecture",
        why: "Separates ingestion workflows from background computation tasks to prevent processing bottlenecks.",
        rejected: ["Monolithic tightly coupled service designs without clear boundaries."],
      },
      {
        choice: "Automated verification checks",
        why: "Prevents invalid payload ingestion before persisting to storage through deterministic validation rules.",
        rejected: ["Ad-hoc manual verification loops after data persistence."],
      },
      {
        choice: "Asynchronous processing queues",
        why: "Buffers burst traffic spikes while guaranteeing ordered execution and resilient recovery.",
        rejected: ["Direct synchronous pipeline execution under unbuffered concurrency."],
      },
    ],
    sections: [
      {
        heading: "Architecture Overview",
        body: "The service ingests structured data payloads, processes requests through asynchronous queues, and updates persistent stores with verified telemetry.",
        points: ["Stateless processing nodes", "Structured logging", "Standardized error handling"],
      },
    ],
    stack: ["TypeScript", "Python", "Go", "PostgreSQL", "Docker"],
    ownership: "Responsible for core service architecture, pipeline integration, and automated test suite design.",
    results: [
      { metric: "99.9%", label: "Pipeline uptime under continuous load" },
      { metric: "<100ms", label: "Average latency across processing stages" },
      { metric: "Zero", label: "Data loss during simulated failovers" },
    ],
    tags: ["Platform", "Architecture", "Engineering", "Go", "AI", "ML", "RAG"],
    aliases: ["example-system-a", "system-a", "platform-demo", "system a", "platform architecture"],
  },
  {
    slug: "example-system-b",
    kind: "system",
    theme: "agents",
    featured: true,
    title: "Example System B",
    employer: "Example Organization",
    period: "2026",
    oneLiner: "A generic placeholder case study demonstrating modular agent tool integration and task execution.",
    summary: "This is a generic placeholder case study demonstrating agent architecture, tool routing, parameter validation, and auditable action traces.",
    problem: "Illustrating systematic tool invocation and structured state transitions in automated task systems with verifiable execution boundaries.",
    constraints: [
      "Tool calls must strictly validate parameter types before execution to prevent runtime failures.",
      "Execution state must remain auditable with full execution traces and deterministic logs.",
      "Must handle provider timeouts gracefully without causing hung threads or unhandled exceptions.",
    ],
    diagram: "generic",
    diagramCaption: "Workflow diagram illustrating tool resolution, execution, and state persistence.",
    decisions: [
      {
        choice: "Explicit tool schema validation",
        why: "Ensures agents do not execute corrupted or malformed commands by rejecting invalid inputs upfront.",
        rejected: ["Unchecked arbitrary execution based solely on model output strings."],
      },
      {
        choice: "Stateless tool runner with central trace store",
        why: "Provides isolated tool evaluation without shared memory side effects or hidden dependencies.",
        rejected: ["Stateful monolithic execution runners with shared in-memory context."],
      },
      {
        choice: "Deterministic execution boundaries",
        why: "Restricts autonomous agents to allow-listed operations with explicit parameter checks.",
        rejected: ["Unrestricted environment access without verification gates."],
      },
    ],
    sections: [
      {
        heading: "Agent Execution Loop",
        body: "The orchestrator evaluates incoming tasks, determines required tools, validates arguments, and executes actions with timeout protection and structured logging.",
        points: ["Schema-based tool calling", "Audit trails", "Graceful fallback mechanisms"],
      },
    ],
    stack: ["TypeScript", "Python", "FastAPI", "PostgreSQL", "Docker"],
    ownership: "Responsible for tool execution harness, schema validation layer, and integration testing suites.",
    results: [
      { metric: "100%", label: "Schema compliance for dispatched calls" },
      { metric: "Zero", label: "Unvalidated executions permitted by runtime" },
      { metric: "<200ms", label: "Dispatch overhead for local tool runners" },
    ],
    tags: ["Agents", "Tooling", "Automation", "AI"],
    aliases: ["example-system-b", "system-b", "agent-demo", "system b", "agent architecture"],
  },
  {
    slug: "example-system-c",
    kind: "system",
    theme: "retrieval",
    featured: true,
    title: "Example System C",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "A generic placeholder case study illustrating indexed data retrieval and contextual grounding.",
    summary: "This is a generic placeholder case study illustrating indexing workflows, vector retrieval, semantic chunking, and context ranking pipelines.",
    problem: "Providing relevant and accurate context grounding across indexed documentation and data sources under tight response budgets.",
    constraints: [
      "Must maintain low retrieval latency under high query concurrency across multiple document collections.",
      "Index updates must reflect upstream changes incrementally without full table rebuilding.",
      "Retrieval results must include origin attribution and provenance data for verification.",
    ],
    diagram: "generic",
    diagramCaption: "Indexing and retrieval pipeline diagram from source documents to scored contexts.",
    decisions: [
      {
        choice: "Hybrid dense and sparse indexing",
        why: "Balances semantic similarity matches with exact keyword searches across diverse queries.",
        rejected: ["Relying exclusively on keyword matching without semantic understanding."],
      },
      {
        choice: "Deterministic chunking boundaries",
        why: "Maintains semantic coherence within retrieved passage windows rather than arbitrary splits.",
        rejected: ["Arbitrary fixed character splitting that breaks sentence integrity."],
      },
      {
        choice: "Context provenance tagging",
        why: "Enables tracing generated responses directly back to source documents for factual grounding.",
        rejected: ["Opaque context injection without source document tracking."],
      },
    ],
    sections: [
      {
        heading: "Retrieval Architecture",
        body: "Documents are parsed, chunked with semantic boundaries, indexed into vector storage, and queried using hybrid retrieval scoring algorithms.",
        points: ["Semantic chunking", "Hybrid scoring", "Context provenance tracking"],
      },
    ],
    stack: ["Python", "TypeScript", "PostgreSQL", "Docker"],
    ownership: "Designed ingestion pipeline, chunking heuristics, and retrieval benchmarking harness implementations.",
    results: [
      { metric: "<50ms", label: "P95 query retrieval across all indices" },
      { metric: "High", label: "Context relevance benchmarked on golden test set" },
      { metric: "100%", label: "Document attribution coverage on responses" },
    ],
    tags: ["Retrieval", "Search", "Data", "RAG", "AI"],
    aliases: ["example-system-c", "system-c", "retrieval-demo", "system c", "retrieval architecture"],
  },
  {
    slug: "example-system-d",
    kind: "product",
    theme: "products",
    featured: false,
    title: "Example System D",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "A generic placeholder case study illustrating a full-stack user application and product workflow.",
    summary: "This is a generic placeholder case study demonstrating full-stack web application architecture, UI design, client caching, and data synchronization.",
    problem: "Creating an intuitive interface for exploring complex datasets with responsive visualization and reliable state management.",
    constraints: [
      "Must provide responsive UI interactions across desktop, tablet, and mobile viewports.",
      "Application state must remain synchronized across client views without visual flickering.",
      "Accessible navigation and high-contrast readable design meeting WCAG standards.",
    ],
    diagram: "generic",
    diagramCaption: "User interface workflow and backend API synchronization diagram.",
    decisions: [
      {
        choice: "Component-driven design system",
        why: "Enables consistent UI components and accessibility compliance across application views.",
        rejected: ["Ad-hoc styling across individual views leading to visual inconsistencies."],
      },
      {
        choice: "Optimistic client updates with rollback",
        why: "Improves perceived UI responsiveness during user interactions while ensuring consistency.",
        rejected: ["Blocking user interactions on network round-trips for every state update."],
      },
      {
        choice: "Accessible semantic HTML foundation",
        why: "Guarantees screen reader navigation and keyboard accessibility across interactive elements.",
        rejected: ["Div-soup interactive controls without ARIA labels or keyboard listeners."],
      },
    ],
    sections: [
      {
        heading: "Application Design",
        body: "The application features a modern responsive interface, client-side caching, and secure backend integration for data exploration workflows.",
        points: ["Responsive layouts", "Accessible controls", "Real-time state synchronization"],
      },
    ],
    stack: ["TypeScript", "Python", "PostgreSQL", "Next.js"],
    ownership: "Built frontend user interface, API endpoints, database models, and accessibility audits.",
    results: [
      { metric: "100%", label: "Accessibility compliance across all audit passes" },
      { metric: "<1.2s", label: "Initial page load time on standard mobile devices" },
      { metric: "Zero", label: "State synchronization errors in integration suite" },
    ],
    tags: ["Product", "UI/UX", "Full-Stack", "AI"],
    aliases: ["example-system-d", "system-d", "product-demo", "system d", "product application"],
  },
];

export const CASE_STUDY_THEMES: { id: CaseStudyTheme; label: string; blurb: string }[] = [
  {
    id: "agents",
    label: "Agent systems",
    blurb: "Agents with modular tools, verified context, and automated evaluation.",
  },
  {
    id: "retrieval",
    label: "Retrieval & context",
    blurb: "Grounding responses in structured knowledge that is scoped and reliable.",
  },
  {
    id: "platform",
    label: "Platform & reliability",
    blurb: "The infrastructure services run on, and the architectures ensuring high uptime.",
  },
  {
    id: "products",
    label: "AI products",
    blurb: "End-to-end applications where machine intelligence delivers human-centered value.",
  },
];

export const caseStudiesByTheme = CASE_STUDY_THEMES.map((theme) => ({
  ...theme,
  studies: caseStudies.filter((study) => study.theme === theme.id),
})).filter((group) => group.studies.length > 0);

export const caseStudyBySlug = new Map<string, CaseStudy>(
  caseStudies.map((study) => [study.slug, study])
);

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
export const systemCaseStudies = caseStudies.filter((study) => study.kind === "system");
export const productCaseStudies = caseStudies.filter((study) => study.kind === "product");

export function getCaseStudyPath(slug: string): string {
  return `/work/${slug}`;
}

export function getAdjacentCaseStudies(currentSlug: string): {
  previous: CaseStudy | null;
  next: CaseStudy | null;
} {
  const currentIndex = caseStudies.findIndex((study) => study.slug === currentSlug);
  if (currentIndex === -1) return { previous: null, next: null };

  const previous = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return { previous, next };
}
