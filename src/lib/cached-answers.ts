import { normalizeText } from "@/lib/ai-twin";

export interface CachedAnswer {
  question: string;
  answer: string;
  suggestions: string[];
}

export const CACHED_ANSWERS: Record<string, CachedAnswer> = {
  background: {
    question: "What is Abdul's background in Applied AI?",
    answer:
      "Abdul Samad is an **Applied AI Engineer** currently pursuing a **BS in Artificial Intelligence** at **FAST NUCES, Islamabad** (Batch 2024).\n\n" +
      "His technical focus centers on:\n" +
      "- **Autonomous Agent Workflows**: Designing agent tool harnesses and structured execution pipelines.\n" +
      "- **Model Evaluation Harnesses**: Building automated evaluation suites, synthetic test datasets, and scoring frameworks.\n" +
      "- **Full-Stack AI Engineering**: Productionizing AI systems with Next.js, FastAPI, relational databases, and low-latency inference providers.\n\n" +
      "You can [browse his work](#work), [view the case studies](/work), or [download his resume](/resume.pdf).",
    suggestions: [
      "How does Abdul approach system evaluation?",
      "What technologies does Abdul work with most?",
      "Which project should I open first?",
      "Tell me about Example System B and agent tools",
    ],
  },
  evaluation: {
    question: "How does Abdul approach system evaluation?",
    answer:
      "Abdul approaches AI system evaluation through **empirical, deterministic measurement** rather than subjective impressions.\n\n" +
      "Key methodologies include:\n" +
      "- **Tiered Evaluation Ladders**: Starting with fast deterministic schema checks before running statistical heuristics.\n" +
      "- **Golden Datasets & Regression Suites**: Running regression tests across model version upgrades to catch subtle reasoning regressions.\n" +
      "- **Multi-Dimensional Metrics**: Measuring semantic accuracy, latency percentiles (p50/p95), and token economics side-by-side.\n\n" +
      "You can read the full [Example System A case study](/work/example-system-a) for architectural details.",
    suggestions: [
      "Tell me about Example System B and agent tools",
      "Walk me through an architectural challenge Abdul solved",
      "What technologies does Abdul work with most?",
      "Which project should I open first?",
    ],
  },
  agent_tools: {
    question: "Tell me about Example System B and agent tools",
    answer:
      "Abdul built **Example System B** to provide standardized, safe tool execution for autonomous AI agents.\n\n" +
      "Key features:\n" +
      "- **Runtime Schema Validation**: Enforces JSON Schema parameters with runtime validation before executing tools.\n" +
      "- **Execution Tracing & Rate Limiting**: Token-bucket rate limiting per agent session to prevent upstream throttling.\n" +
      "- **Sandboxed Action Runners**: Isolates external API interactions and logs structured request traces for observability.\n\n" +
      "Explore the full breakdown in the [Example System B case study](/work/example-system-b).",
    suggestions: [
      "How does Abdul approach system evaluation?",
      "Walk me through an architectural challenge Abdul solved",
      "What is Abdul's background in Applied AI?",
      "Which project should I open first?",
    ],
  },
  architecture: {
    question: "Walk me through an architectural challenge Abdul solved",
    answer:
      "A core architectural challenge Abdul solved was building a **Unified Gateway & Data Processing Pipeline** to handle upstream provider downtime and rate limits.\n\n" +
      "Architectural highlights:\n" +
      "- **Failover & Circuit Breaking**: Automatically reroutes degraded upstream model calls to backup providers with zero client downtime.\n" +
      "- **Deterministic Caching**: Caches equivalent queries to reduce repetitive inference costs and cut response latencies.\n" +
      "- **Normalized Stream Handling**: Normalizes token-by-token streaming events across heterogeneous provider interfaces.\n\n" +
      "Review the architectural decisions in the [Example System A case study](/work/example-system-a) or view [all case studies](/work).",
    suggestions: [
      "How does Abdul approach system evaluation?",
      "Tell me about Example System B and agent tools",
      "What technologies does Abdul work with most?",
      "Which project should I open first?",
    ],
  },
  technologies: {
    question: "What technologies does Abdul work with most?",
    answer:
      "Abdul's primary technical stack spans modern AI engineering and full-stack development:\n\n" +
      "- **AI & ML**: Python, PyTorch, LangChain, Hugging Face, Groq, OpenAI API, Anthropic API.\n" +
      "- **Databases & Vector Search**: PostgreSQL, pgvector, Redis, MongoDB.\n" +
      "- **Full-Stack & Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS.\n" +
      "- **Infrastructure & DevOps**: Docker, Linux, GitHub Actions, Prometheus, Structured Tracing.\n\n" +
      "You can inspect his competencies in the [Skills section](#skills) or browse [featured projects](#work).",
    suggestions: [
      "What is Abdul's background in Applied AI?",
      "Which project should I open first?",
      "Could you share your LinkedIn?",
      "How can I contact Abdul Samad?",
    ],
  },
  projects: {
    question: "Which project should I open first?",
    answer:
      "Featured personal projects showcasing Abdul's engineering breadth:\n\n" +
      "1. **[Example Project One](#project-example-project-one)**: A full-stack AI web application with live preview sandboxes and streaming responses.\n" +
      "2. **[Example Project Two](#project-example-project-two)**: A high-performance proxy gateway for unified multi-provider routing and telemetry.\n" +
      "3. **[Example Project Three](#project-example-project-three)**: Reusable developer CLI utilities and SDK connectors.\n\n" +
      "Explore the live previews and GitHub repositories in the [Work section](#work).",
    suggestions: [
      "What technologies does Abdul work with most?",
      "Tell me about Example System B and agent tools",
      "How can I contact Abdul Samad?",
      "Where can I find your resume?",
    ],
  },
  education: {
    question: "What is your educational background?",
    answer:
      "Abdul Samad is pursuing a **BS in Artificial Intelligence** at **FAST NUCES, Islamabad** (Batch 2024), where he has been enrolled since 2024.\n\n" +
      "His academic studies emphasize core machine learning, deep neural architectures, probabilistic systems, and mathematical foundations for AI engineering.",
    suggestions: [
      "What is Abdul's background in Applied AI?",
      "What technologies does Abdul work with most?",
      "Which project should I open first?",
      "Where can I find your resume?",
    ],
  },
  contact: {
    question: "How can I contact Abdul Samad?",
    answer:
      "You can contact Abdul Samad directly via:\n\n" +
      "- **Email**: [abdulsammadsardar17@gmail.com](mailto:abdulsammadsardar17@gmail.com)\n" +
      "- **LinkedIn**: [linkedin.com/in/abdul-samad1706](https://www.linkedin.com/in/abdul-samad1706/)\n" +
      "- **GitHub**: [github.com/Abdul-Samad-17](https://github.com/Abdul-Samad-17)\n" +
      "- **Contact Form**: You can also send a direct inquiry through the [Contact section](#contact).",
    suggestions: [
      "Could you share your LinkedIn?",
      "Can I see your GitHub?",
      "Where can I find your resume?",
      "What is Abdul's background in Applied AI?",
    ],
  },
  linkedin: {
    question: "Could you share your LinkedIn?",
    answer:
      "Abdul's LinkedIn profile is [linkedin.com/in/abdul-samad1706](https://www.linkedin.com/in/abdul-samad1706/).\n\n" +
      "Feel free to connect or reach out regarding Applied AI engineering roles and collaborations.",
    suggestions: [
      "Can I see your GitHub?",
      "How can I contact Abdul Samad?",
      "Where can I find your resume?",
      "What is Abdul's background in Applied AI?",
    ],
  },
  github: {
    question: "Can I see your GitHub?",
    answer:
      "Abdul's open-source projects and code repositories are hosted at [github.com/Abdul-Samad-17](https://github.com/Abdul-Samad-17).\n\n" +
      "You can explore his project repositories, system architectures, and implementations there.",
    suggestions: [
      "Which project should I open first?",
      "Could you share your LinkedIn?",
      "What technologies does Abdul work with most?",
      "How can I contact Abdul Samad?",
    ],
  },
  resume: {
    question: "Where can I find your resume?",
    answer:
      "You can view and download Abdul Samad's resume directly at [/resume.pdf](/resume.pdf).\n\n" +
      "It provides a detailed breakdown of his education at FAST NUCES, engineering internships, and technical competencies.",
    suggestions: [
      "What is Abdul's background in Applied AI?",
      "How can I contact Abdul Samad?",
      "Could you share your LinkedIn?",
      "Which project should I open first?",
    ],
  },
};

/**
 * Keyword-based lookup to match suggestion chips and common introductory inquiries
 * to pre-written cached answers.
 */
export function getCachedChipAnswer(message: string): CachedAnswer | null {
  const normalized = normalizeText(message);

  if (
    normalized.includes("background in applied ai") ||
    normalized.includes("applied ai background") ||
    normalized.includes("tell me about abdul") ||
    normalized.includes("who is abdul")
  ) {
    return CACHED_ANSWERS.background;
  }

  if (
    normalized.includes("approach system evaluation") ||
    normalized.includes("how do you evaluate") ||
    normalized.includes("evaluation methodology")
  ) {
    return CACHED_ANSWERS.evaluation;
  }

  if (
    normalized.includes("example system b") ||
    normalized.includes("agent tools") ||
    normalized.includes("agent tool") ||
    normalized.includes("agent system architecture")
  ) {
    return CACHED_ANSWERS.agent_tools;
  }

  if (
    normalized.includes("architectural challenge") ||
    normalized.includes("complex architectural") ||
    normalized.includes("complex architecture")
  ) {
    return CACHED_ANSWERS.architecture;
  }

  if (
    normalized.includes("technologies does abdul work with") ||
    normalized.includes("technologies do you work with") ||
    normalized.includes("what is your tech stack") ||
    normalized.includes("primary tech stack") ||
    normalized.includes("what technologies")
  ) {
    return CACHED_ANSWERS.technologies;
  }

  if (
    normalized.includes("project should i open first") ||
    normalized.includes("featured projects") ||
    normalized.includes("show me your projects")
  ) {
    return CACHED_ANSWERS.projects;
  }

  if (
    normalized.includes("educational background") ||
    normalized.includes("where did you study") ||
    normalized.includes("fast nuces")
  ) {
    return CACHED_ANSWERS.education;
  }

  if (
    normalized.includes("how can i contact") ||
    normalized.includes("best way to reach") ||
    normalized.includes("contact details")
  ) {
    return CACHED_ANSWERS.contact;
  }

  if (normalized.includes("linkedin") || normalized.includes("profile link")) {
    return CACHED_ANSWERS.linkedin;
  }

  if (normalized.includes("github") || normalized.includes("source code repo")) {
    return CACHED_ANSWERS.github;
  }

  if (normalized.includes("resume") || normalized.includes("download cv") || normalized.includes("curriculum vitae")) {
    return CACHED_ANSWERS.resume;
  }

  return null;
}
