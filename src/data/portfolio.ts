// Portfolio data for Abdul Samad

import type { CaseStudySlug } from "@/data/case-studies";
import { RESUME_PATH } from "@/lib/site-config";

export const personalInfo = {
  name: "Abdul Samad",
  role: "Applied AI Engineer",
  education: "BS Artificial Intelligence student at FAST NUCES Islamabad (Batch 2024)",
  tagline: "BS Artificial Intelligence student at FAST NUCES Islamabad (Batch 2024), focusing on Generative AI and end-to-end AI pipelines.",
  focus: "BS Artificial Intelligence student at FAST NUCES Islamabad (Batch 2024). Focused on Generative AI, end-to-end AI pipelines, agent architectures, and robust software systems.",
  location: "Islamabad, Pakistan",
  email: "abdulsammadsardar17@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdul-samad1706/",
  github: "https://github.com/Abdul-Samad-17",
  resumeUrl: RESUME_PATH,
};

/** `href` points each number at the surface that actually proves it. */
export const stats = [
  { value: 10, suffix: "+", label: "Example Metric A", href: "#experience" },
  { value: 5, suffix: "+", label: "Example Metric B", href: "/work/example-system-b" },
  { value: 20, suffix: "K+", label: "Example Metric C", href: "/work/example-system-c" },
  { value: 99, suffix: "%", label: "Example Metric D", href: "/work/example-system-a" },
];

export interface Highlight {
  /** The measured claim, shown large. */
  metric: string;
  /** What the metric counts. */
  label: string;
  /** One sentence of supporting detail. */
  detail: string;
}

export const about = {
  summary: "I focus on engineering reliable software that bridges modern machine intelligence with resilient backend systems: designing predictable tool execution pipelines, structuring contextual retrieval, validating accuracy with automated evaluation suites, and deploying high-performance services with clean interfaces.",
  highlights: [
    {
      metric: "99.9%",
      label: "Pipeline uptime",
      detail:
        "Engineered automated data processing services with structured validation checks and resilient error handling.",
    },
    {
      metric: "100%",
      label: "Schema compliance",
      detail:
        "Architected modular tool execution harnesses with strict parameter verification and comprehensive trace reporting.",
    },
    {
      metric: "<50ms",
      label: "Retrieval latency",
      detail:
        "Implemented indexing pipelines combining dense embeddings and metadata filtering for accurate query synthesis.",
    },
    {
      metric: "<1.2s",
      label: "Interactive load",
      detail:
        "Designed modern responsive user interfaces with accessible navigation and client-side state caching.",
    },
  ] satisfies Highlight[],
};

export const recognition = {
  title: "Academic & Project Recognition",
  detail:
    "Recognized for academic performance and project contributions in artificial intelligence and systems engineering.",
};

/** Prose form of the highlights, for the AI Twin context and SEO surfaces. */
export const highlightSentences = about.highlights.map(
  (highlight) => `${highlight.metric} ${highlight.label.toLowerCase()} — ${highlight.detail}`
);

export type ExperienceBullet = string | { text: string; study: CaseStudySlug };

export function bulletText(bullet: ExperienceBullet): string {
  return typeof bullet === "string" ? bullet : bullet.text;
}

export function bulletStudySlug(bullet: ExperienceBullet): CaseStudySlug | undefined {
  return typeof bullet === "string" ? undefined : bullet.study;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "work" | "education";
  summary: string;
  bullets: ExperienceBullet[];
}

export const experiences: Experience[] = [
  {
    company: "FAST NUCES Islamabad",
    role: "BS Artificial Intelligence (Batch 2024)",
    period: "2024 – Present",
    type: "education",
    summary: "Undergraduate studies in Artificial Intelligence with a focus on Generative AI and end-to-end AI pipelines.",
    bullets: [
      "Rigorous coursework in core Artificial Intelligence, machine learning algorithms, probabilistic models, and deep neural architectures.",
      "Developing end-to-end Generative AI workflows, autonomous agent systems, and modern full-stack web applications.",
    ],
  },
  {
    company: "Example Organization",
    role: "Software Engineering Intern",
    period: "May 2023 – July 2023",
    type: "work",
    summary: "Built data integration services and secure document management systems to streamline operational workflows.",
    bullets: [
      "Integrated automated reporting pipelines serving operational dashboards, improving data aggregation speed and reliability.",
      "Engineered secure database schemas and role-based access control workflows for multi-user file storage services.",
      "Developed internal scheduling tools and management portals that reduced booking turnaround and operational scheduling overhead.",
    ],
  },
  {
    company: "Example Organization",
    role: "AI & Software Development Intern",
    period: "Jun 2024 – Dec 2024",
    type: "work",
    summary: "Engineered backend microservices, intelligent content processing pipelines, and conversational voice interfaces.",
    bullets: [
      "Built resilient microservices with FastAPI and Node.js, establishing CI/CD automation pipelines and containerized deployments.",
      { text: "Engineered multi-stage retrieval workflows with structured reasoning steps and custom validation.", study: "example-system-c" },
      { text: "Constructed high-volume ingestion pipelines to process structured tabular data into relational stores.", study: "example-system-a" },
      { text: "Implemented interactive conversational interfaces integrating real-time streaming processing.", study: "example-system-b" },
    ],
  },
  {
    company: "Example Organization",
    role: "Applied AI Engineer",
    period: "Jan 2025 – Present",
    type: "work",
    summary: "Build intelligent developer platforms, tool registries, evaluation systems, and resilient retrieval architectures.",
    bullets: [
      "Architected internal agent workflow platforms serving diverse organizational teams with custom tool calling and approval checkpoints.",
      { text: "Built an automated evaluation pipeline measuring prompt variations, model outputs, and latency distributions with continuous CI gates.", study: "example-system-a" },
      { text: "Delivered production-grade tool servers under strict permission tiers, implementing authentication, rate limits, and audit logging.", study: "example-system-b" },
      { text: "Constructed hybrid search and retrieval pipelines ensuring strict tenant isolation and high precision indexing.", study: "example-system-c" },
      { text: "Developed user interfaces and dashboards for exploring complex datasets with responsive visualization.", study: "example-system-d" },
    ],
  },
];

export interface Project {
  slug: string;
  featured?: boolean;
  title: string;
  category: string;
  summary: string;
  description: string;
  impact: string;
  role: string;
  timeline?: string;
  complexity: string;
  tech: string[];
  images: string[];
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    slug: "example-project-one",
    featured: true,
    title: "Example Project One",
    category: "Full-Stack AI Application",
    summary: "A generic placeholder full-stack application demonstrating interactive user workflows.",
    description: "Built an application generation platform featuring live streaming code generation, containerized preview environments, persistent project workspaces, and user management.",
    impact: "Engineered scalable concurrency architecture with isolated sandbox containers, usage quotas, and secure payment integrations.",
    role: "Full-stack development, streaming engine design, and backend microservices",
    timeline: "Flagship platform build",
    complexity: "Streaming generation, container sandbox orchestration, and workspace persistence",
    images: [
      "/images/projects/example-project-one/landing-page-light.png",
      "/images/projects/example-project-one/landing-page-dark.png",
      "/images/projects/example-project-one/system-architecture-dark.png",
      "/images/projects/example-project-one/dashboard-overview-light.png",
      "/images/projects/example-project-one/dashboard-overview-dark.png",
      "/images/projects/example-project-one/dashboard-usage-dark.png",
      "/images/projects/example-project-one/project-builder-dark.png",
      "/images/projects/example-project-one/login-page-dark.png",
    ],
    tech: ["TypeScript", "Next.js", "Python", "FastAPI", "Docker", "PostgreSQL", "Redis", "Tailwind CSS"],
    github: "https://github.com/Abdul-Samad-17",
    live: "https://example.com/demo-one",
  },
  {
    slug: "example-project-two",
    featured: true,
    title: "Example Project Two",
    category: "AI Gateway & Infrastructure",
    summary: "A generic placeholder unified gateway providing multi-provider routing and observability.",
    description: "Constructed an API gateway supporting provider fallbacks, quota management, caching, and real-time streaming telemetry.",
    impact: "Improved system reliability and latency while offering complete visibility into operational spend and usage metrics across multiple models.",
    role: "Gateway architecture, routing engine implementation, and telemetry tooling",
    timeline: "Infrastructure platform build",
    complexity: "Dynamic load balancing, circuit breakers, caching, and streaming proxy middleware",
    images: [
      "/images/projects/example-project-two/dashbord.png",
      "/images/projects/example-project-two/providers.png",
      "/images/projects/example-project-two/api-docs.png",
      "/images/projects/example-project-two/login.png",
    ],
    tech: ["TypeScript", "Node.js", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/Abdul-Samad-17",
    live: "https://example.com/demo-two",
  },
  {
    slug: "example-project-three",
    featured: true,
    title: "Example Project Three",
    category: "Developer Tools",
    summary: "A generic placeholder developer utility providing command-line automation and library tools.",
    description: "Engineered CLI utilities and SDK connectors for automating environment workflows and validating structured configurations.",
    impact: "Simplified developer onboarding and established automated configuration linting.",
    role: "CLI design, TypeScript SDK implementation, and testing",
    timeline: "Developer tooling build",
    complexity: "CLI argument parsing, schema validation, and interactive prompts",
    images: [],
    tech: ["TypeScript", "Node.js", "CLI"],
    github: "https://github.com/Abdul-Samad-17",
  },
  {
    slug: "example-project-four",
    title: "Example Project Four",
    category: "Data Ingestion Pipeline",
    summary: "A generic placeholder data extraction and batch processing service.",
    description: "Designed an ETL service that extracts structured documents, cleans content, and generates representations for downstream search.",
    impact: "Enabled automated document ingestion with fault tolerance and queue management.",
    role: "ETL pipeline authoring and database schema design",
    timeline: "Data engineering build",
    complexity: "Batch processing, error recovery, and database indexing",
    images: [],
    tech: ["Python", "PostgreSQL", "Docker"],
    github: "https://github.com/Abdul-Samad-17",
  },
  {
    slug: "example-project-five",
    title: "Example Project Five",
    category: "Agent Tooling",
    summary: "A generic placeholder exploration of autonomous tool invocation and execution protocols.",
    description: "Built an experimentation runner for dispatching tasks to autonomous tools with schema checks and execution timeouts.",
    impact: "Provided deterministic execution traces and sandboxed environment actions.",
    role: "Protocol integration and testbed creation",
    timeline: "Research exploration build",
    complexity: "Dynamic tool schema discovery and execution sandboxing",
    images: [],
    tech: ["Python", "FastAPI", "Docker"],
    github: "https://github.com/Abdul-Samad-17",
  },
];

export const skillCategories = [
  {
    title: "Applied AI, Agents & Evaluation",
    description: "The agent orchestration, tool use, and evaluation toolchains I use to build dependable AI platforms.",
    skills: ["AI Agents", "Agent Architectures", "Tool Calling", "Agent Memory", "Model Evaluation", "Benchmarking", "Automated Metrics", "OpenTelemetry", "RAG Pipelines", "Knowledge Retrieval", "Prompt Optimization", "Model Routing", "Semantic Caching", "API Gateways"],
  },
  {
    title: "Languages & Backend",
    description: "The core programming languages and frameworks I use to build reliable APIs, services, and applications.",
    skills: ["Python", "TypeScript", "JavaScript", "Go", "Java", "SQL", "FastAPI", "Node.js", "Next.js", "React", "REST APIs", "Microservices", "OAuth2", "RBAC"],
  },
  {
    title: "Data, Retrieval & Storage",
    description: "Storage, indexing, and vector technologies used for structured data persistence and semantic retrieval.",
    skills: ["PostgreSQL", "pgvector", "Redis", "MongoDB", "Elasticsearch", "SQL Databases", "Vector Indexes", "Object Storage"],
  },
  {
    title: "Platform, DevOps & Observability",
    description: "Infrastructure, orchestration, and continuous integration tooling ensuring operational reliability.",
    skills: ["Docker", "Kubernetes", "Linux", "CI/CD", "GitHub Actions", "Prometheus", "Grafana", "Structured Logging", "Unit Testing", "Integration Testing"],
  },
];

/** Phrased to exercise the AI Twin's tools rather than invite a canned answer. */
export const chatSuggestions = [
  "What is Abdul's background in Applied AI?",
  "How does Abdul approach system evaluation?",
  "Tell me about Example System B and agent tools",
  "Walk me through an architectural challenge Abdul solved",
  "What technologies does Abdul work with most?",
];
