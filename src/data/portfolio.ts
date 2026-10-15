// TODO(real data): Replace placeholder portfolio data with Abdul Samad's verified experience, projects, metrics, and details.

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
  { value: 12, suffix: "+", label: "Production Deployments", href: "#experience" },
  { value: 6, suffix: "+", label: "Agentic Workflows", href: "/work/governed-mcp-registry" },
  { value: 50, suffix: "K+", label: "Requests Handled", href: "/work/knowledge-graph-rag" },
  { value: 8, suffix: "", label: "AI Benchmarks Evaluated", href: "/work/llm-evaluation-platform" },
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
      metric: "8",
      label: "AI pipelines evaluated",
      detail:
        "Engineered automated evaluation harnesses scoring prompt variations, model outputs, and retrieval pipelines against baseline datasets with deterministic and statistical metrics.",
    },
    {
      metric: "6+",
      label: "Modular agent toolkits",
      detail:
        "Architected modular protocol connectors and tool servers with permission checks, rate limiting, structured error handling, and end-to-end telemetry.",
    },
    {
      metric: "50K+",
      label: "Queries served reliably",
      detail:
        "Implemented high-throughput retrieval pipelines combining dense embeddings and structured metadata indexing for robust question-answering systems.",
    },
    {
      metric: "40%",
      label: "Latency reduction",
      detail:
        "Optimized backend request routing, streaming responses, and intelligent caching strategies across distributed API gateways.",
    },
    {
      metric: "Core",
      label: "Platform memory store",
      detail:
        "Constructed context-persistence systems supporting conversational memory, session management, and structured recall across multi-step execution flows.",
    },
  ] satisfies Highlight[],
};

export const recognition = {
  title: "Engineering Excellence Recognition",
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
      { text: "Engineered multi-stage retrieval workflows with structured reasoning steps, custom validation, and automated evaluation suites.", study: "fantasy-gpt" },
      { text: "Constructed high-volume ETL ingestion pipelines to process structured tabular data into relational analytical stores.", study: "fantasy-gpt" },
      { text: "Implemented interactive conversational interfaces integrating real-time streaming audio processing and contextual prompt templates.", study: "aiko" },
      { text: "Built personalized content synthesis algorithms tailoring real-time updates and highlights according to user preference profiles.", study: "aiko" },
    ],
  },
  {
    company: "Example Organization",
    role: "Applied AI Engineer",
    period: "Jan 2025 – Present",
    type: "work",
    summary: "Build intelligent developer platforms, governed tool registries, evaluation systems, and resilient retrieval architectures.",
    bullets: [
      "Architected internal agent workflow platforms serving diverse organizational teams with custom tool calling and approval checkpoints.",
      { text: "Built an automated evaluation pipeline measuring prompt variations, model outputs, and latency distributions with continuous CI gates.", study: "llm-evaluation-platform" },
      { text: "Delivered production-grade tool servers under strict permission tiers, implementing authentication, rate limits, and audit logging.", study: "governed-mcp-registry" },
      { text: "Managed model routing proxies with spend budgeting, failure fallbacks, semantic caching, and granular usage tracing.", study: "code-intelligence-gateway" },
      { text: "Constructed hybrid knowledge-graph and vector retrieval pipelines ensuring strict tenant isolation and high precision indexing.", study: "knowledge-graph-rag" },
      { text: "Developed high-speed code search services over multi-repository systems with automated daily indexing and resilient client timeouts.", study: "governed-mcp-registry" },
      { text: "Built end-to-end technical documentation synchronization workflows triggered by issue tracking transitions with review interfaces.", study: "documentation-automation" },
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
    slug: "codeforge",
    featured: true,
    title: "CodeForge: AI App Builder",
    category: "Full-Stack AI SaaS",
    summary: "An AI-powered full-stack application builder turning natural language specifications into interactive React applications.",
    description: "Built an intelligent application generation platform featuring live streaming code generation, containerized preview environments, persistent project workspaces, and subscription tier management.",
    impact: "Engineered scalable concurrency architecture with isolated preview sandbox containers, usage quotas, and secure payment integrations.",
    role: "System architecture, streaming engine design, backend microservices, and frontend workspace",
    timeline: "Flagship platform build",
    complexity: "Streaming generation, container sandbox orchestration, workspace persistence, and auth integration",
    images: [
      "/images/projects/codeforge/landing-page-light.png",
      "/images/projects/codeforge/landing-page-dark.png",
      "/images/projects/codeforge/system-architecture-dark.png",
      "/images/projects/codeforge/dashboard-overview-light.png",
      "/images/projects/codeforge/dashboard-overview-dark.png",
      "/images/projects/codeforge/dashboard-usage-dark.png",
      "/images/projects/codeforge/project-builder-dark.png",
      "/images/projects/codeforge/login-page-dark.png",
    ],
    tech: ["TypeScript", "Next.js", "Python", "FastAPI", "Docker", "PostgreSQL", "Redis", "Tailwind CSS"],
    github: "https://github.com/Abdul-Samad-17",
  },
  {
    slug: "omni-gateway",
    featured: true,
    title: "OmniGateway: AI Proxy",
    category: "AI Gateway & Infra",
    summary: "A unified AI gateway providing multi-provider routing, load balancing, and observability under a standard API surface.",
    description: "Constructed a high-throughput API gateway supporting provider fallbacks, quota management, semantic Redis caching, and real-time streaming telemetry.",
    impact: "Improved system reliability and latency while offering complete visibility into operational spend and usage metrics across multiple models.",
    role: "Gateway architecture, routing engine implementation, and telemetry tooling",
    timeline: "Infra-focused platform build",
    complexity: "Dynamic load balancing, circuit breakers, semantic caching, and streaming proxy middleware",
    images: [
      "/images/projects/omni-gateway/dashbord.png",
      "/images/projects/omni-gateway/providers.png",
      "/images/projects/omni-gateway/api-docs.png",
      "/images/projects/omni-gateway/login.png",
    ],
    tech: ["Go", "Gin", "Redis", "PostgreSQL", "OpenTelemetry", "Docker"],
    github: "https://github.com/Abdul-Samad-17",
  },
  {
    slug: "serenify",
    featured: true,
    title: "Serenify: Mindful Assistant",
    category: "Full-Stack AI Product",
    summary: "A mindful wellness platform integrating empathetic conversational guidance, mood journaling, and personalized reflections.",
    description: "Developed a comprehensive personal wellness application combining context-aware conversational AI, reflective journaling prompts, privacy-centric analytics, and adaptive recommendations.",
    impact: "Created an engaging, thoughtful user experience with privacy-first data handling and intuitive interface interactions.",
    role: "Product conceptualization, UX development, and conversational AI workflow design",
    timeline: "Full product build",
    complexity: "State management, adaptive conversational contexts, privacy filtering, and vector personalization",
    images: [
      "/images/projects/serenify/landing-page-light.png",
      "/images/projects/serenify/dashboard-light.png",
      "/images/projects/serenify/chat-light.png",
      "/images/projects/serenify/activities-light.png",
      "/images/projects/serenify/profile-light.png",
      "/images/projects/serenify/crisis-help-light.png",
      "/images/projects/serenify/login-page-light.png",
      "/images/projects/serenify/dashboard-streak-dark.png",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "Vector Index"],
    github: "https://github.com/Abdul-Samad-17",
  },
  {
    slug: "resume-optimizer",
    title: "Resume Optimizer Pro",
    category: "AI Productivity Tool",
    summary: "An intelligent resume optimization tool providing granular ATS keyword analysis and actionable refinement feedback.",
    description: "Designed and built an automated resume analysis assistant featuring structured scoring heuristics, role-specific keyword extraction, and contextual suggestions.",
    impact: "Demonstrated effective workflow design for iterative content improvement with clear visual feedback.",
    role: "Frontend interface, analysis prompt engineering, and parsing utilities",
    timeline: "Focused productivity tool build",
    complexity: "Document parsing, structured prompt pipelines, and iterative scoring analytics",
    images: [
      "/images/projects/resumefit/landing-page-light.png",
      "/images/projects/resumefit/landing-page-dark.png",
      "/images/projects/resumefit/job-description-dark.png",
      "/images/projects/resumefit/api-key-entry-light.png",
      "/images/projects/resumefit/api-key-entry-dark.png",
      "/images/projects/resumefit/upload-resume-empty-dark.png",
      "/images/projects/resumefit/upload-resume-filled-dark.png",
    ],
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Zod", "Recharts"],
    github: "https://github.com/Abdul-Samad-17",
  },
  {
    slug: "neural-canvas",
    title: "NeuralCanvas: Image Suite",
    category: "Creative AI Tool",
    summary: "A focused creative studio application designed for prompt-driven image generation, asset variation, and manipulation.",
    description: "Built a modern creative workspace application wrapping multimodal image generation APIs with user galleries, prompt history, and asset categorization.",
    impact: "Delivered a clean, distraction-free creative studio experience with fast rendering previews.",
    role: "Full-stack application development and UI design",
    timeline: "Creative tool exploration",
    complexity: "Multimodal asset handling, gallery state persistence, and responsive image workflows",
    images: [
      "/images/projects/neural-canvas/login-page-dark.png",
      "/images/projects/neural-canvas/generation-workspace-dark.png",
    ],
    tech: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Abdul-Samad-17",
  },
  {
    slug: "llama-mcp-streamlit",
    title: "AgentToolbox: MCP Runner",
    category: "LLM Tooling & Agents",
    summary: "An experimental exploration of the Model Context Protocol powering real-time tool execution from open-weight models.",
    description: "Engineered an interactive assistant connecting open-weights models with local MCP tool servers to perform autonomous environment actions and API queries.",
    impact: "Provided hands-on validation of protocol capabilities, tool dispatch ergonomics, and structured error handling.",
    role: "Protocol integration, execution pipeline scripting, and interactive testbed design",
    timeline: "Research & exploration build",
    complexity: "Dynamic tool schema discovery, structured response parsing, and stateful interaction cycles",
    images: [
      "/images/projects/llama-mcp-streamlit/configuration-dark.png",
      "/images/projects/llama-mcp-streamlit/tools-list-dark.png",
    ],
    tech: ["Python", "FastAPI", "MCP", "Docker", "Streamlit"],
    github: "https://github.com/Abdul-Samad-17",
  },
];

export const skillCategories = [
  {
    title: "Applied AI, Agents & Evaluation",
    description: "The agent orchestration, tool use, and evaluation toolchains I use to build dependable AI platforms.",
    skills: ["AI Agents", "Agentic Systems", "Model Context Protocol (MCP)", "Tool Calling", "Agent Memory", "LLM Evaluation", "Benchmarking", "Automated Metrics", "OpenTelemetry", "RAG Pipelines", "Knowledge Retrieval", "Prompt Optimization", "Model Routing", "Semantic Caching", "API Gateways"],
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
  "Tell me about the MCP registry and agent tools",
  "Walk me through a complex architectural problem Abdul solved",
  "What technologies does Abdul work with most?",
];
