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
      "- **Autonomous Agent Workflows**: Designing agent tool harnesses and MCP-governed execution pipelines.\n" +
      "- **Model Evaluation Harnesses**: Building automated evaluation suites, synthetic test datasets, and LLM-as-a-judge scoring frameworks.\n" +
      "- **Full-Stack AI Engineering**: Productionizing AI systems with Next.js, FastAPI, Vector databases, and low-latency inference providers.\n\n" +
      "You can [browse his work](#work), [view the case studies](/work), or [download his resume](/resume.pdf).",
    suggestions: [
      "How does Abdul approach system evaluation?",
      "What technologies does Abdul work with most?",
      "Which project should I open first?",
      "Tell me about the MCP registry and agent tools",
    ],
  },
  evaluation: {
    question: "How does Abdul approach system evaluation?",
    answer:
      "Abdul approaches AI system evaluation through **empirical, deterministic measurement** rather than subjective impressions.\n\n" +
      "Key methodologies include:\n" +
      "- **LLM-as-a-Judge with Kappa Calibration**: Validating judge models against human annotations, requiring agreement thresholds (κ ≥ 0.7) before deployment.\n" +
      "- **Golden Datasets & Regression Suites**: Running regression tests across model version upgrades to catch subtle reasoning regressions.\n" +
      "- **Multi-Dimensional Metrics**: Measuring semantic accuracy, latency percentiles (p50/p95), and token economics side-by-side.\n\n" +
      "You can read the full [LLM Evaluation Platform case study](/work/llm-evaluation-platform) for architectural details.",
    suggestions: [
      "Tell me about the MCP registry and agent tools",
      "Walk me through a complex architectural problem Abdul solved",
      "What technologies does Abdul work with most?",
      "Which build best shows your style?",
    ],
  },
  mcp_tools: {
    question: "Tell me about the MCP registry and agent tools",
    answer:
      "Abdul built a **Governed MCP Tool Registry** implementing the Model Context Protocol (MCP) to provide standardized, safe tool execution for autonomous AI agents.\n\n" +
      "Key features:\n" +
      "- **Runtime Schema Validation**: Enforces JSON Schema parameters with runtime validation before executing tools.\n" +
      "- **Tenant Isolation & Rate Limiting**: Token-bucket rate limiting per agent session to prevent upstream throttling.\n" +
      "- **Execution Sandboxing**: Isolates external API interactions and logs structured request traces for observability.\n\n" +
      "Explore the full breakdown in the [Governed MCP Tool Registry case study](/work/governed-mcp-registry).",
    suggestions: [
      "How does Abdul approach system evaluation?",
      "Walk me through a complex architectural problem Abdul solved",
      "What is Abdul's background in Applied AI?",
      "Which project should I open first?",
    ],
  },
  architecture: {
    question: "Walk me through a complex architectural problem Abdul solved",
    answer:
      "A core architectural challenge Abdul solved was building a **Unified AI Proxy Gateway** to handle upstream provider downtime and rate limits.\n\n" +
      "Architectural highlights:\n" +
      "- **Failover & Circuit Breaking**: Automatically reroutes degraded upstream model calls to backup providers with zero client downtime.\n" +
      "- **Semantic Caching**: Caches semantically equivalent queries to reduce repetitive LLM inference costs and cut response latencies.\n" +
      "- **Normalized Stream Handling**: Normalizes token-by-token streaming events across heterogeneous provider interfaces.\n\n" +
      "Review the architectural decisions in the [Code Intelligence Gateway case study](/work/code-intelligence-gateway) or view [all case studies](/work).",
    suggestions: [
      "How does Abdul approach system evaluation?",
      "Tell me about the MCP registry and agent tools",
      "What technologies does Abdul work with most?",
      "Which project should I open first?",
    ],
  },
  technologies: {
    question: "What technologies does Abdul work with most?",
    answer:
      "Abdul's primary technical stack spans modern AI engineering and full-stack development:\n\n" +
      "- **AI & ML**: Python, PyTorch, LangChain, LlamaIndex, Hugging Face, Groq, OpenAI API, Anthropic API, vLLM.\n" +
      "- **Databases & Vector Search**: PostgreSQL, Redis, Qdrant, Pinecone, ChromaDB.\n" +
      "- **Full-Stack & Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion.\n" +
      "- **Infrastructure & DevOps**: Docker, Linux, GitHub Actions, Prometheus, Structured Tracing.\n\n" +
      "You can inspect his competencies in the [Skills section](#skills) or browse [featured projects](#work).",
    suggestions: [
      "What is Abdul's background in Applied AI?",
      "Which project should I open first?",
      "Could you share your LinkedIn?",
      "What's the best way to reach you?",
    ],
  },
  projects: {
    question: "Which project should I open first?",
    answer:
      "Two standout projects best showcase Abdul's engineering breadth:\n\n" +
      "1. **[CodeForge](#project-codeforge)**: An enterprise-grade AI coding workspace and scaffold generator featuring automated AST refactoring and structured agent loops.\n" +
      "2. **[Serenify](#project-serenify)**: An interactive AI-assisted mental wellness platform with real-time sentiment analysis, crisis detection guards, and adaptive micro-interventions.\n" +
      "3. **[Omni-Gateway](#project-omni-gateway)**: High-performance proxy gateway for unified multi-provider routing and semantic caching.\n\n" +
      "Explore the live previews and GitHub repositories in the [Work section](#work).",
    suggestions: [
      "What technologies does Abdul work with most?",
      "Tell me about the MCP registry and agent tools",
      "How does Abdul approach system evaluation?",
      "Could you share your LinkedIn?",
    ],
  },
  education: {
    question: "What is Abdul Samad's educational background?",
    answer:
      "Abdul Samad is pursuing a **BS in Artificial Intelligence** at **FAST NUCES, Islamabad** (Batch 2024), where he has been enrolled since 2024.\n\n" +
      "His academic studies and technical training emphasize:\n" +
      "- Core AI algorithms, machine learning theory, probabilistic modeling, and deep neural architectures.\n" +
      "- End-to-end generative AI pipelines and autonomous multi-agent systems.\n" +
      "- Applied software engineering and production systems design.\n\n" +
      "He received the **Engineering Excellence Recognition** for top academic performance and technical contributions. You can [download his resume](/resume.pdf) or check his [LinkedIn profile](https://www.linkedin.com/in/abdul-samad1706/).",
    suggestions: [
      "What is Abdul's background in Applied AI?",
      "What technologies does Abdul work with most?",
      "Which project should I open first?",
      "What's the best way to reach you?",
    ],
  },
  contact: {
    question: "Could you share your LinkedIn?",
    answer:
      "You can connect with Abdul Samad directly via:\n\n" +
      "- **LinkedIn**: [linkedin.com/in/abdul-samad1706/](https://www.linkedin.com/in/abdul-samad1706/)\n" +
      "- **GitHub**: [github.com/Abdul-Samad-17](https://github.com/Abdul-Samad-17)\n" +
      "- **Email**: [abdulsammadsardar17@gmail.com](mailto:abdulsammadsardar17@gmail.com)\n" +
      "- **Direct Form**: Send a message directly via the [Contact Form](#contact) on this page.",
    suggestions: [
      "What is Abdul's background in Applied AI?",
      "Which project should I open first?",
      "What technologies does Abdul work with most?",
      "How does Abdul approach system evaluation?",
    ],
  },
};

const queryKeywordsMap: Array<{ keywords: string[]; key: string }> = [
  {
    keywords: ["background in applied ai", "abdul background in applied ai", "abdul samad background in applied ai"],
    key: "background",
  },
  {
    keywords: ["approach system evaluation", "abdul approach system evaluation", "approach to evaluation"],
    key: "evaluation",
  },
  {
    keywords: ["mcp registry and agent tools", "tell me about the mcp registry", "mcp registry and tools"],
    key: "mcp_tools",
  },
  {
    keywords: ["complex architectural problem", "architectural problem abdul solved", "complex architectural problem abdul"],
    key: "architecture",
  },
  {
    keywords: ["technologies does abdul work with most", "technologies abdul works with most", "what technologies does abdul work with"],
    key: "technologies",
  },
  {
    keywords: ["which project should i open first", "which build best shows your style", "project should i open first"],
    key: "projects",
  },
  {
    keywords: ["abdul samad educational background", "educational background of abdul samad", "what is abdul samad educational background"],
    key: "education",
  },
  {
    keywords: ["could you share your linkedin", "share your linkedin", "share abdul linkedin"],
    key: "contact",
  },
];

export function getCachedChipAnswer(query: string): CachedAnswer | null {
  const normalized = normalizeText(query);
  if (!normalized) return null;

  // Direct exact/phrase match against defined chip questions
  for (const entry of Object.values(CACHED_ANSWERS)) {
    if (normalizeText(entry.question) === normalized) {
      return entry;
    }
  }

  // Keyword phrase matching
  for (const mapping of queryKeywordsMap) {
    if (mapping.keywords.some((kw) => normalized.includes(normalizeText(kw)))) {
      return CACHED_ANSWERS[mapping.key] ?? null;
    }
  }

  return null;
}
