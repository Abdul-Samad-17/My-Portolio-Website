// TODO(real data): Replace placeholder case studies with Abdul Samad's verified project deep-dives, decisions, and system architectures.

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
  | "llm-evaluation-platform"
  | "governed-mcp-registry"
  | "code-intelligence-gateway"
  | "knowledge-graph-rag"
  | "documentation-automation"
  | "sentinel-test-agent"
  | "bi-platform"
  | "quill"
  | "omni-gateway"
  | "codeforge"
  | "fantasy-gpt"
  | "aiko"
  | "serenify";

export const CASE_STUDY_SLUGS: CaseStudySlug[] = [
  "llm-evaluation-platform",
  "governed-mcp-registry",
  "code-intelligence-gateway",
  "knowledge-graph-rag",
  "documentation-automation",
  "sentinel-test-agent",
  "bi-platform",
  "quill",
  "omni-gateway",
  "codeforge",
  "fantasy-gpt",
  "aiko",
  "serenify",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "llm-evaluation-platform",
    kind: "system",
    theme: "platform",
    featured: true,
    title: "LLM Evaluation Platform",
    employer: "Example Organization",
    period: "2026",
    oneLiner: "An automated evaluation pipeline that continuously scores prompt changes, models, and retrieval pipelines on accuracy, latency, and cost.",
    summary: "Production AI systems require objective measurement rather than manual assertions. I built a continuous evaluation harness that measures outputs against curated golden datasets, applying deterministic checks, statistical metrics, and automated judge heuristics before deployment.",
    problem: "When iterative modifications were applied to prompts, models, and tool definitions, there was no systematic automated benchmark to verify whether system quality improved or degraded. Engineering decisions required empirical verification to prevent regressions and quantify trade-offs.",
    constraints: [
      "Must integrate cleanly into existing CI/CD automation pipelines without requiring dedicated proprietary SaaS tooling.",
      "Must support dual evaluation modalities: fast deterministic assertion checks and deeper statistical heuristic scoring.",
      "Cost overhead of automated evaluation runs had to remain minimal to allow routine pre-merge execution.",
      "Scoring criteria needed to be transparent and reproducible across local and remote pipeline environments.",
    ],
    diagram: "generic",
    diagramCaption: "Continuous evaluation harness workflow scoring pipeline iterations against curated baselines and verification metrics.",
    decisions: [
      {
        choice: "Tiered scoring ladder from free assertions to model heuristics",
        why: "Running full model-based evaluations on every commit is cost-prohibitive. Starting with zero-cost regex and deterministic schema checks filters out obvious regressions immediately.",
        rejected: ["Running expensive model-graded evaluations on every single raw commit."],
      },
      {
        choice: "Automated golden dataset extraction from validated logs",
        why: "Manually authoring test fixtures creates stale synthetic data. Extracting anonymized, human-verified query-response pairs provides grounded real-world evaluation coverage.",
        rejected: ["Relying exclusively on purely synthetic test datasets."],
      },
      {
        choice: "CI quality gates enforcing threshold pass rates",
        why: "Without programmatic enforcement, evaluation benchmarks become informational reports that teams ignore under shipping deadlines.",
        rejected: ["Advisory-only metrics dashboards without automated build blocking."],
      },
    ],
    sections: [
      {
        heading: "Evaluation Pipeline Architecture",
        body: "The test harness ingests candidate prompt variations and tool schemas, dispatches batches across target providers, and computes deterministic metrics alongside semantic similarity scores.",
        points: [
          "Deterministic verification checking structural conformity, JSON schema adherence, and mandatory entity inclusion.",
          "Semantic consistency scoring comparing embeddings against canonical answers.",
          "Automated latency and token consumption tracking across test runs.",
        ],
      },
    ],
    stack: ["Python", "FastAPI", "OpenTelemetry", "PostgreSQL", "Docker", "Pytest"],
    ownership: "Designed and implemented the core evaluation framework, metric computation routines, and CI/CD integration.",
    results: [
      { metric: "100%", label: "Test coverage on critical paths" },
      { metric: "4x", label: "Faster regression discovery" },
      { metric: "<2%", label: "Scoring variance across runs" },
      { metric: "Zero", label: "Uncaught formatting breakages" },
    ],
    tags: ["Evaluation", "Testing", "Observability", "Quality Gates"],
    aliases: ["eval", "evaluation", "benchmarks", "testing", "metrics"],
  },
  {
    slug: "governed-mcp-registry",
    kind: "system",
    theme: "agents",
    featured: true,
    title: "Governed MCP Tool Registry",
    employer: "Example Organization",
    period: "2026",
    oneLiner: "A unified enterprise registry for Model Context Protocol servers featuring role-based access control, auditing, and rate limits.",
    summary: "As agent tool ecosystems expand, unmonitored tool calls present security and compliance liabilities. I developed a governed tool proxy that enforces explicit permissions, authentication, schema validation, and complete audit logging on all tool invocations.",
    problem: "Autonomous agents required programmatic access to diverse backend services, but granting direct credentials risked unintended actions, privilege escalation, and lack of attribution across multi-tenant environments.",
    constraints: [
      "Strict zero-trust security boundary between model execution environments and operational databases.",
      "Sub-millisecond validation latency for high-frequency tool invocation loops.",
      "Granular permission scopes allowing read-only inspection versus state-modifying executions.",
    ],
    diagram: "generic",
    diagramCaption: "Governed MCP proxy intercepting, authenticating, and logging tool execution requests and security policies.",
    decisions: [
      {
        choice: "Stateless authorization proxy intercepting JSON-RPC messages",
        why: "Decoupling authorization logic from individual tool server implementations guarantees uniform security policies across all tools without repeating code.",
        rejected: ["Embedding bespoke authentication inside each individual tool implementation."],
      },
      {
        choice: "Explicit permission tiers with dry-run capabilities",
        why: "Allowing agents to verify permission availability before invoking high-impact operations prevents abrupt execution failures mid-task.",
        rejected: ["Implicit permissions that only fail during execution time."],
      },
      {
        choice: "Cryptographically signed audit event streams",
        why: "Every state-mutating operation must record caller identity, input arguments, and execution outcomes for forensic compliance.",
        rejected: ["Ephemeral console logging without tamper-evident audit trails."],
      },
    ],
    sections: [
      {
        heading: "Security & Governance Mechanisms",
        body: "The registry acts as an intelligent intermediary, verifying API keys, evaluating role-based policies, sanitizing arguments against JSON schemas, and routing calls to isolated worker backends.",
      },
    ],
    stack: ["Go", "TypeScript", "MCP Protocol", "Redis", "PostgreSQL", "Docker"],
    ownership: "Sole author of the proxy architecture, RBAC policy engine, and MCP communication adapters.",
    results: [
      { metric: "6+", label: "Governed tool servers deployed" },
      { metric: "100%", label: "Attribution on mutation calls" },
      { metric: "<5ms", label: "Proxy authorization overhead" },
      { metric: "Zero", label: "Unauthorized privilege leaks" },
    ],
    tags: ["MCP", "Security", "Tool Calling", "RBAC", "Governance"],
    aliases: ["mcp", "registry", "tools", "governance", "security"],
  },
  {
    slug: "code-intelligence-gateway",
    kind: "system",
    theme: "platform",
    featured: true,
    title: "Code Intelligence API Gateway",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "A resilient multi-provider AI proxy providing intelligent failover, semantic caching, and granular spend tracking.",
    summary: "Managing enterprise model traffic requires high availability, cost efficiency, and provider redundancy. I implemented a centralized proxy gateway that decouples upstream LLM providers, caches repetitive queries, and prevents downtime via automatic failover.",
    problem: "Applications were tightly coupled to individual provider endpoints, making them vulnerable to upstream outages, rate-limit throttling, and unpredictable cost spikes with zero unified observability.",
    constraints: [
      "Strict streaming response compatibility for real-time developer interfaces.",
      "High-throughput concurrency handling thousands of simultaneous connections without memory ballooning.",
      "Zero disruption to client applications through drop-in OpenAI API compatibility.",
    ],
    diagram: "generic",
    diagramCaption: "Gateway request lifecycle with semantic caching, provider failover routing, and telemetry capture.",
    decisions: [
      {
        choice: "Streaming pass-through proxy with non-blocking metric collection",
        why: "Buffering full streaming responses destroys user interactivity. Processing telemetry asynchronously preserves low time-to-first-token while capturing metrics.",
        rejected: ["Buffering streaming chunks synchronously before forwarding to clients."],
      },
      {
        choice: "Two-layer caching combining exact hash and semantic vector match",
        why: "Exact hashes provide instantaneous zero-compute responses for identical queries, while semantic similarity handles slight variations in repetitive requests.",
        rejected: ["Relying exclusively on expensive semantic distance vector lookups."],
      },
      {
        choice: "Adaptive health-checked circuit breakers",
        why: "Automatically rerouting traffic when a provider degrades guarantees uninterrupted service availability during upstream incidents.",
        rejected: ["Manual operator intervention during provider outages."],
      },
    ],
    sections: [
      {
        heading: "Traffic Routing & Optimization",
        body: "The gateway inspects incoming requests, queries the cache layer, checks provider availability, applies load balancing across healthy endpoints, and streams tokens directly to the caller.",
      },
    ],
    stack: ["Go", "Gin", "Redis", "PostgreSQL", "OpenTelemetry", "Docker"],
    ownership: "Architected the routing engine, circuit breaker implementation, and cache subsystem.",
    results: [
      { metric: "99.95%", label: "Uptime across provider outages" },
      { metric: "45%", label: "Cost reduction via caching" },
      { metric: "<15ms", label: "Gateway routing latency" },
      { metric: "Zero", label: "Downtime during failovers" },
    ],
    tags: ["Gateway", "Proxy", "Load Balancing", "Caching", "Infra"],
    aliases: ["gateway", "proxy", "routing", "failover", "caching"],
  },
  {
    slug: "knowledge-graph-rag",
    kind: "system",
    theme: "retrieval",
    featured: false,
    title: "Knowledge Graph RAG Architecture",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "A hybrid retrieval engine combining relational graph structures with dense vector embeddings for grounded multi-hop reasoning.",
    summary: "Standard vector retrieval struggles with complex multi-entity relationships and organizational boundaries. I designed a hybrid retrieval architecture that pairs knowledge graph traversals with vector similarity search for grounded contextual answers.",
    problem: "Pure vector similarity frequently surfaced semantically similar but factually disconnected fragments, leading to hallucinations when answering multi-step questions spanning interconnected organizational domains.",
    constraints: [
      "Rigid multi-tenant data boundaries preventing any cross-tenant information bleed.",
      "Sub-second end-to-end retrieval and ranking budgets across large entity graphs.",
      "Incremental graph update capability as source documents evolve.",
    ],
    diagram: "generic",
    diagramCaption: "Hybrid graph and vector search pipeline synthesizing context for complex multi-hop queries.",
    decisions: [
      {
        choice: "Hybrid retrieval merging vector candidates with graph neighborhood walks",
        why: "Vectors identify relevant seed entities accurately, while graph relations discover connected structural dependencies that semantic embeddings miss entirely.",
        rejected: ["Using flat vector search without relational topology."],
      },
      {
        choice: "Pre-filtered tenant boundary enforcement at query compilation time",
        why: "Injecting tenancy filters directly into graph traversal queries prevents unauthorized nodes from ever entering intermediate search spaces.",
        rejected: ["Post-filtering multi-tenant results after completing global graph traversals."],
      },
      {
        choice: "Dynamic context window packing based on relevance confidence",
        why: "Feeding raw graph dumps exhausts context budgets. Ranking and trimming candidate subgraphs prioritizes high-confidence nodes while reducing token consumption.",
        rejected: ["Unbounded serialization of complete subgraphs into prompt context."],
      },
    ],
    sections: [
      {
        heading: "Hybrid Context Assembly",
        body: "Queries undergo entity extraction to identify anchor concepts, followed by parallel vector similarity search and graph relation traversal, combining topological and semantic signals into ranked context.",
      },
    ],
    stack: ["Python", "FastAPI", "Neo4j", "PostgreSQL", "pgvector", "Docker"],
    ownership: "Designed graph schema, hybrid ranking algorithms, and tenant-scoped retrieval APIs.",
    results: [
      { metric: "50K+", label: "Indexed graph entities" },
      { metric: "92%", label: "Precision on complex queries" },
      { metric: "35%", label: "Reduction in context token usage" },
      { metric: "100%", label: "Tenant boundary isolation" },
    ],
    tags: ["GraphRAG", "Knowledge Graph", "RAG", "Retrieval", "Neo4j"],
    aliases: ["kgrag", "graphrag", "knowledge graph", "rag", "retrieval"],
  },
  {
    slug: "documentation-automation",
    kind: "system",
    theme: "agents",
    featured: false,
    title: "Automated Technical Documentation Engine",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "An event-driven pipeline that automatically drafts, reviews, and updates engineering documentation from code changes.",
    summary: "Keeping developer documentation accurate across rapid feature iterations is challenging. I built an automated pipeline that detects code changes, extracts structural API definitions, and generates pull requests with updated documentation for human review.",
    problem: "Fast-paced product releases routinely outpaced technical documentation, leading to developer confusion, broken integration references, and redundant engineering support tickets.",
    constraints: [
      "Must operate entirely within existing Git pull-request review workflows.",
      "Generated documentation must follow strictly enforced style guides and terminology glossaries.",
      "Every automated modification must require explicit engineering peer review prior to merging.",
    ],
    diagram: "generic",
    diagramCaption: "Automated documentation synchronization from Git events to published documentation portals.",
    decisions: [
      {
        choice: "Git-based pull request automation rather than direct wiki mutations",
        why: "Submitting documentation changes as standard pull requests keeps modifications reviewable, version-controlled, and testable within familiar review channels.",
        rejected: ["Direct automated writes to production documentation wikis."],
      },
      {
        choice: "AST parsing of code interfaces for deterministic signature extraction",
        why: "Extracting function signatures and type definitions via abstract syntax trees guarantees 100% technical accuracy, leaving only prose explanations to the model.",
        rejected: ["Relying on models to guess API parameters and types from raw text diffs."],
      },
      {
        choice: "Markdown-first templating compatible with static site generators",
        why: "Emitting clean Markdown files ensures compatibility with modern documentation generators without platform lock-in.",
        rejected: ["Proprietary rich-text binary storage formats."],
      },
    ],
    sections: [
      {
        heading: "Automation Workflow Lifecycle",
        body: "Webhook listeners trigger on release merges, analyze changed files, extract interface deltas, generate cohesive explanatory updates, and open pull requests against the documentation repository.",
      },
    ],
    stack: ["TypeScript", "Node.js", "GitHub Actions", "Markdown", "AST Parsers"],
    ownership: "Implemented the change detector, AST extraction utilities, and GitHub workflow actions.",
    results: [
      { metric: "80%", label: "Reduction in documentation lag" },
      { metric: "100%", label: "API signature accuracy" },
      { metric: "50+", label: "Automated documentation PRs" },
      { metric: "3x", label: "Faster developer onboarding" },
    ],
    tags: ["Documentation", "Automation", "Developer Tools", "CI/CD"],
    aliases: ["documentation", "docs", "automation", "quill", "github"],
  },
  {
    slug: "sentinel-test-agent",
    kind: "system",
    theme: "agents",
    featured: false,
    title: "Autonomous Integration Test Agent",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "An intelligent testing agent that synthesizes edge-case integration scenarios and validates API boundary conditions.",
    summary: "Manual integration testing often overlooks complex boundary interactions. I built an autonomous test generation agent that reads OpenAPI specifications, simulates adverse client behavior, and identifies unhandled edge cases.",
    problem: "Microservices exposed APIs that satisfied happy-path unit tests but frequently encountered unhandled exceptions when confronted with unusual payload structures or unexpected sequence ordering.",
    constraints: [
      "Must execute tests safely in isolated sandbox environments without affecting shared state.",
      "Generated test cases must be exportable as standard reproducible test scripts.",
      "Must adhere strictly to rate limits to avoid overwhelming test infrastructure.",
    ],
    diagram: "generic",
    diagramCaption: "Autonomous test generation and execution cycle identifying unexpected API edge case errors.",
    decisions: [
      {
        choice: "OpenAPI schema-driven fuzzing combined with semantic edge-case synthesis",
        why: "Using schemas guarantees structurally valid requests while language models hypothesize realistic semantic edge cases that fuzzers fail to formulate.",
        rejected: ["Pure random string fuzzing with no API structural awareness."],
      },
      {
        choice: "Automatic generation of standard executable test code",
        why: "Developers need reproducible artifacts they can run locally, debug with breakpoints, and add permanently to their regression suites.",
        rejected: ["Opaque black-box test runs with non-reproducible web reports."],
      },
      {
        choice: "Isolated test database containers spun up per run",
        why: "Ensuring clean database fixtures prevents state pollution across concurrent test scenarios.",
        rejected: ["Shared persistent staging databases with dirty state."],
      },
    ],
    sections: [
      {
        heading: "Execution & Synthesis Loop",
        body: "The agent parses OpenAPI definitions, formulates boundary conditions, executes test queries against staging containers, analyzes response codes and bodies, and flags unexpected error behaviors.",
      },
    ],
    stack: ["Python", "FastAPI", "Docker", "Pytest", "OpenAPI", "PostgreSQL"],
    ownership: "Designed scenario synthesis algorithms, execution runners, and error categorization logic.",
    results: [
      { metric: "40+", label: "Edge-case defects uncovered" },
      { metric: "95%", label: "Schema coverage across endpoints" },
      { metric: "100%", label: "Reproducible code output" },
      { metric: "<10min", label: "Full test suite execution" },
    ],
    tags: ["Testing", "Agents", "Quality Assurance", "Edge Cases"],
    aliases: ["sentinel", "test agent", "qa", "integration testing", "automation"],
  },
  {
    slug: "bi-platform",
    kind: "system",
    theme: "retrieval",
    featured: false,
    title: "Natural Language Analytics Engine",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "A text-to-SQL analytics system translating plain English inquiries into validated, performant SQL queries.",
    summary: "Empowering non-technical stakeholders to query complex data requires accurate semantic translation. I developed an analytics copilot that translates natural language inquiries into safe, optimized SQL queries with automated schema introspection.",
    problem: "Business analysts spent considerable time crafting repetitive SQL queries for stakeholders, creating operational bottlenecks and slowing decision cycles across the organization.",
    constraints: [
      "Strict read-only execution guarantees with complete prevention of SQL injection.",
      "Query execution timeouts preventing database lockups from unoptimized queries.",
      "Clear explanation of query logic so users can verify analytical intent.",
    ],
    diagram: "generic",
    diagramCaption: "Text-to-SQL semantic translation, validation, and safe query execution pipeline.",
    decisions: [
      {
        choice: "AST validation of generated SQL before execution",
        why: "Parsing generated SQL into abstract syntax trees ensures queries contain only allowed SELECT statements, blocking dangerous data-modification clauses completely.",
        rejected: ["Executing model-generated SQL text directly without syntactic parsing."],
      },
      {
        choice: "Dynamic schema pruning based on query intent",
        why: "Passing massive database schemas exceeds context limits and confuses model reasoning. Injecting only relevant table schemas ensures higher query accuracy.",
        rejected: ["Dumping hundreds of raw database table definitions into every prompt."],
      },
      {
        choice: "Automatic query plan explainability checks",
        why: "Inspecting query execution plans before execution catches accidental full-table scans on billion-row tables before they degrade database performance.",
        rejected: ["Blind execution of generated queries without cost estimation."],
      },
    ],
    sections: [
      {
        heading: "Query Synthesis & Safety",
        body: "User questions trigger schema retrieval, SQL generation, AST validation, execution against read-replicas, and tabular result formatting with visual charts.",
      },
    ],
    stack: ["Python", "PostgreSQL", "SQLAlchemy", "FastAPI", "React", "Recharts"],
    ownership: "Built the SQL generation prompt architecture, AST validation layer, and frontend charting components.",
    results: [
      { metric: "94%", label: "First-pass query accuracy" },
      { metric: "100%", label: "Prevention of destructive queries" },
      { metric: "<3s", label: "Average query generation turnaround" },
      { metric: "5x", label: "Faster report delivery" },
    ],
    tags: ["Analytics", "SQL", "Text to SQL", "Business Intelligence"],
    aliases: ["bi", "analytics", "sql", "text to sql", "database"],
  },
  {
    slug: "quill",
    kind: "product",
    theme: "products",
    featured: false,
    title: "Quill: Collaborative Documentation Studio",
    employer: "Example Organization",
    period: "2025",
    oneLiner: "A focused desktop editor providing seamless Markdown editing, Git-backed versioning, and AI-assisted drafting.",
    summary: "Technical writers and engineers require distraction-free environments to author and review software documentation. I built Quill, a lightweight desktop and web application designed for fast documentation workflows with built-in AI editing assistants.",
    problem: "Writing technical documentation was fragmented between browser wikis and complex code editors, making it difficult for teams to maintain cohesive formatting and collaborate smoothly.",
    constraints: [
      "Instant startup time and responsive editing performance with zero input latency.",
      "Offline-first architecture allowing authoring without constant network connectivity.",
      "Direct integration with Git repositories for seamless pull request authoring.",
    ],
    diagram: "generic",
    diagramCaption: "Quill architecture combining local filesystem storage with Git synchronization features.",
    decisions: [
      {
        choice: "Local filesystem storage with Git-backed version tracking",
        why: "Treating Markdown files on disk as the single source of truth provides privacy, offline speed, and seamless compatibility with version control systems.",
        rejected: ["Storing documents exclusively in cloud databases."],
      },
      {
        choice: "Modular extension system for AI drafting tools",
        why: "Decoupling editing core from AI assistance tools allows writers to use the editor purely as a fast Markdown tool or leverage AI features as needed.",
        rejected: ["Hardcoding intrusive AI suggestions into the core text editor."],
      },
      {
        choice: "Unified live preview split view with synchronized scrolling",
        why: "Real-time preview synchronized to the cursor line gives writers instant visual feedback on formatting, tables, and code snippets.",
        rejected: ["Separate edit and preview tabs requiring manual toggling."],
      },
    ],
    sections: [
      {
        heading: "Editor Capabilities",
        body: "Quill features syntax highlighting, table formatters, Git branch worktree switching, automated spell-checking, and contextual AI suggestions for technical clarity.",
      },
    ],
    stack: ["TypeScript", "React", "Electron", "Tailwind CSS", "Node.js"],
    ownership: "Designed application architecture, editor state machine, and Git integration layer.",
    results: [
      { metric: "60fps", label: "Smooth editor responsiveness" },
      { metric: "100%", label: "Offline functionality" },
      { metric: "40%", label: "Faster documentation drafting" },
      { metric: "Zero", label: "Document formatting desyncs" },
    ],
    tags: ["Editor", "Desktop", "Markdown", "Developer Experience"],
    aliases: ["quill", "editor", "markdown", "writing", "studio"],
  },
  {
    slug: "omni-gateway",
    kind: "product",
    theme: "platform",
    featured: false,
    title: "OmniGateway: Distributed Proxy Layer",
    employer: "Independent Project",
    period: "2024",
    oneLiner: "An open-source, high-throughput AI API proxy offering provider abstraction, semantic caching, and metrics logging.",
    summary: "Modern AI applications require reliable infrastructure that abstracts upstream provider idiosyncrasies. I created an open-source proxy service supporting load balancing, circuit breakers, semantic caching, and unified request tracing.",
    problem: "Developers integrating multiple model providers faced inconsistent API schemas, unpredictable downtime, and redundant token costs when testing and deploying applications.",
    constraints: [
      "Drop-in compatibility with standard OpenAI API SDKs.",
      "Minimal latency overhead added to the request path.",
      "Lightweight resource consumption runnable on affordable single-node servers.",
    ],
    diagram: "generic",
    diagramCaption: "High-performance proxy architecture handling upstream provider abstraction and caching.",
    decisions: [
      {
        choice: "Compiled language backend (Go) for concurrency and efficiency",
        why: "Go's lightweight goroutines handle thousands of concurrent streaming connections with minimal memory footprint compared to interpreted runtimes.",
        rejected: ["Building the proxy core on Python or Node.js."],
      },
      {
        choice: "Redis-backed tiered caching strategy",
        why: "Using Redis provides sub-millisecond retrieval of cached responses, dramatically reducing token expenditures on repetitive developer queries.",
        rejected: ["In-memory local caching that cannot scale across distributed instances."],
      },
      {
        choice: "Normalized error handling across upstream providers",
        why: "Translating proprietary vendor error formats into uniform HTTP status codes simplifies client-side error handling.",
        rejected: ["Passing raw proprietary vendor error payloads through to clients."],
      },
    ],
    sections: [
      {
        heading: "Core Architecture & Performance",
        body: "The proxy handles incoming requests, checks Redis cache keys, routes requests through healthy connection pools, and streams chunks back while recording telemetry in background threads.",
      },
    ],
    stack: ["Go", "Gin", "Redis", "PostgreSQL", "Docker", "OpenTelemetry"],
    ownership: "Sole designer and developer of the proxy application and accompanying documentation.",
    results: [
      { metric: "<10ms", label: "Internal proxy latency overhead" },
      { metric: "50%", label: "Reduction in repetitive token spend" },
      { metric: "99.9%", label: "API request delivery rate" },
      { metric: "5K+", label: "Concurrent connections handled" },
    ],
    tags: ["Go", "Proxy", "Open Source", "Infra", "Gateway"],
    aliases: ["proxy", "api proxy", "gateway", "omni proxy", "open source"],
  },
  {
    slug: "codeforge",
    kind: "product",
    theme: "products",
    featured: false,
    title: "CodeForge: Autonomous Web Builder",
    employer: "Independent Project",
    period: "2024",
    oneLiner: "A full-stack SaaS platform that converts natural language specifications into interactive, running web applications.",
    summary: "Building complete web applications from prompts requires more than simple text generation: it demands workspace isolation, file persistence, preview hosting, and real-time streaming interfaces. I engineered an end-to-end platform making web application generation interactive and dependable.",
    problem: "Most code generation interfaces output raw code blocks that users must manually copy, configure, install, and execute, creating significant friction between generation and viewing.",
    constraints: [
      "Must safely isolate user code execution environments from the host platform.",
      "Must stream code generation progress token-by-token for interactive feedback.",
      "Must provide immediate browser preview capabilities without manual deployments.",
    ],
    diagram: "generic",
    diagramCaption: "End-to-end application generation, sandbox provisioning, and real-time preview lifecycle.",
    decisions: [
      {
        choice: "Isolated container preview environments per user workspace",
        why: "Container isolation ensures that generated code cannot access host resources or interfere with adjacent tenant processes.",
        rejected: ["Running client code directly on shared host web servers."],
      },
      {
        choice: "Server-Sent Events (SSE) for granular real-time progress updates",
        why: "SSE provides reliable one-way streaming over standard HTTP connections, cleanly reporting file creation and code generation events.",
        rejected: ["Complex bidirectional WebSockets where simple streaming suffices."],
      },
      {
        choice: "Modular project structure with persistent object storage",
        why: "Storing generated project files in object storage decouples workspace state from temporary preview containers, ensuring data durability.",
        rejected: ["Relying exclusively on container ephemeral storage disks."],
      },
    ],
    sections: [
      {
        heading: "System Architecture",
        body: "The platform orchestrates prompt breakdown, iterative code synthesis, file tree creation, containerized preview launches, and real-time client streaming.",
      },
    ],
    stack: ["TypeScript", "Next.js", "Python", "FastAPI", "Docker", "Redis", "Tailwind CSS"],
    ownership: "Architected and built the complete platform including backend services, preview orchestration, and frontend workspace.",
    results: [
      { metric: "<20s", label: "From prompt to running preview" },
      { metric: "100%", label: "Container environment isolation" },
      { metric: "60fps", label: "Responsive workspace interface" },
      { metric: "500+", label: "Generated web applications" },
    ],
    tags: ["SaaS", "Full-Stack", "Docker", "Code Generation", "Platform"],
    aliases: ["codeforge", "appbuilder", "builder", "codegen", "web builder"],
  },
  {
    slug: "fantasy-gpt",
    kind: "product",
    theme: "products",
    featured: false,
    title: "InsightAI: Sports Intelligence Engine",
    employer: "Example Organization",
    period: "2024",
    oneLiner: "A multi-stage retrieval and analytical reasoning engine answering complex, data-intensive sports queries.",
    summary: "Answering complex statistical queries across sports domains requires structured multi-stage reasoning. I developed an intelligent reasoning engine that analyzes complex tabular records, computes comparative analytics, and delivers clear conversational answers.",
    problem: "Sports data is rich but complex. Fans and analysts struggled to uncover deep relational statistics without manually querying multiple databases and cross-referencing historical records.",
    constraints: [
      "Must deliver accurate numerical answers without mathematical or statistical hallucinations.",
      "Sub-two-second response times for live query interactions during matches.",
      "Must explain the derivation steps behind statistical conclusions.",
    ],
    diagram: "generic",
    diagramCaption: "Multi-stage retrieval and analytical query processing pipeline and metrics computation.",
    decisions: [
      {
        choice: "Structured SQL generation over analytical relational databases",
        why: "Translating natural questions into validated SQL executes exact calculations on real data rather than asking models to do mental arithmetic.",
        rejected: ["Asking language models to calculate mathematical figures directly."],
      },
      {
        choice: "Automated schema mapping and entity normalization",
        why: "Normalizing team names, player aliases, and tournament codes before query compilation prevents syntax errors and semantic mismatch.",
        rejected: ["Passing colloquial sports terms directly into database queries."],
      },
      {
        choice: "Automated output validation checks against raw database results",
        why: "Comparing generated narrative summaries against raw SQL query result sets ensures figures cited in the response match database truth.",
        rejected: ["Unchecked narrative generation based on memory."],
      },
    ],
    sections: [
      {
        heading: "Analytics & Reasoning Engine",
        body: "The engine receives natural language queries, resolves entity ambiguities, executes structured SQL against analytics stores, validates numerical figures, and synthesizes clear narrative reports.",
      },
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "Redis"],
    ownership: "Designed and implemented the semantic retrieval pipeline, SQL synthesis module, and validation checkers.",
    results: [
      { metric: "96%", label: "Accuracy on complex statistical queries" },
      { metric: "<1.5s", label: "Turnaround on complex lookups" },
      { metric: "Zero", label: "Arithmetic computation errors" },
      { metric: "10K+", label: "Analyzed statistical records" },
    ],
    tags: ["Sports AI", "Analytics", "SQL", "Reasoning", "FastAPI"],
    aliases: ["insightai", "fantasy", "sports ai", "cricket", "analytics"],
  },
  {
    slug: "aiko",
    kind: "product",
    theme: "products",
    featured: false,
    title: "Aiko: Conversational Voice Companion",
    employer: "Example Organization",
    period: "2024",
    oneLiner: "A real-time voice-interactive companion offering live event commentary and personalized audience engagement.",
    summary: "Creating engaging live-event companions requires low-latency speech pipelines and adaptive conversational personalities. I contributed to the development of Aiko, a voice-based companion that delivers personalized event updates and real-time interactive banter.",
    problem: "Traditional broadcast commentary is one-way and generic, unable to answer specific viewer questions or personalize context to individual fan interests during live events.",
    constraints: [
      "Ultra-low latency audio processing for natural conversational pacing.",
      "Strict persona maintenance without drifting into robotic or inappropriate responses.",
      "Contextual awareness of live game states and rapidly changing scores.",
    ],
    diagram: "generic",
    diagramCaption: "Low-latency voice processing and contextual response pipeline with persona steering.",
    decisions: [
      {
        choice: "Streaming speech-to-text pipeline with early intent classification",
        why: "Classifying user intent while audio is still streaming allows context retrieval to begin before the speaker finishes their sentence, cutting latency.",
        rejected: ["Waiting for full audio recording completion before initiating transcription."],
      },
      {
        choice: "Dynamic persona prompt framing with safety filters",
        why: "Injecting persona instructions and safety guardrails into system prompts keeps voice interactions lively while preventing offensive outputs.",
        rejected: ["Unconstrained model prompting without personality bounds."],
      },
      {
        choice: "WebSocket-based bidirectional streaming audio architecture",
        why: "Bi-directional WebSockets allow natural interruptions and smooth audio streaming without HTTP request connection overhead.",
        rejected: ["Polling HTTP endpoints with audio file blobs."],
      },
    ],
    sections: [
      {
        heading: "Voice Interaction Architecture",
        body: "The pipeline continuously processes incoming audio streams, generates rapid transcriptions, incorporates real-time match state, and streams synthesized speech back to the listener.",
      },
    ],
    stack: ["Python", "FastAPI", "WebSockets", "Azure Speech", "Docker", "Redis"],
    ownership: "Contributed to voice streaming workflows, real-time match state integration, and personalization logic.",
    results: [
      { metric: "<800ms", label: "Speech-to-speech turnaround" },
      { metric: "98%", label: "Persona consistency across sessions" },
      { metric: "15+", label: "Supported language variations" },
      { metric: "4.8/5", label: "User engagement rating" },
    ],
    tags: ["Voice AI", "Conversational", "Streaming", "WebSockets", "Azure"],
    aliases: ["aiko", "voice", "companion", "speech", "commentary"],
  },
  {
    slug: "serenify",
    kind: "product",
    theme: "products",
    featured: false,
    title: "Serenify: Mindful Wellness Platform",
    employer: "Independent Project",
    period: "2024",
    oneLiner: "A thoughtful mental wellness companion offering supportive guidance, mood tracking, and reflective journaling.",
    summary: "Digital wellness applications must balance supportive conversational interfaces with strict user privacy and thoughtful UX. I created Serenify to offer a supportive space for personal journaling, mood tracking, and mindful reflections.",
    problem: "Most conversational AI products feel sterile and clinical, lacking the empathy, visual warmth, and privacy guardrails necessary for personal wellness reflection.",
    constraints: [
      "Zero retention of sensitive mental wellness conversations for model training.",
      "Clear, empathetic boundaries that never mimic licensed medical advice.",
      "Calming, accessible user interface optimized for stress-free interaction.",
    ],
    diagram: "generic",
    diagramCaption: "Privacy-focused architecture for personal wellness guidance and reflective journaling.",
    decisions: [
      {
        choice: "Client-side encryption of reflective journal entries",
        why: "Encrypting private reflections before persisting them ensures that sensitive personal thoughts remain strictly confidential to the user.",
        rejected: ["Storing plaintext personal reflections in unencrypted database tables."],
      },
      {
        choice: "Strict medical disclaimer guardrails with crisis resource referrals",
        why: "AI companions must never provide clinical diagnosis. Detecting crisis indicators and immediately presenting verified professional resources protects user safety.",
        rejected: ["Allowing unconstrained medical advice or diagnostic simulations."],
      },
      {
        choice: "Accessible, high-contrast, calming design system",
        why: "A wellness product must reduce cognitive load through smooth transitions, readable typography, and warm, soothing color palettes.",
        rejected: ["Aggressive notifications and high-stress gamification loops."],
      },
    ],
    sections: [
      {
        heading: "Product Experience & Safety",
        body: "Serenify offers guided breathing exercises, interactive journaling prompts, reflective mood visualizations, and supportive conversational exchanges backed by strict privacy controls.",
      },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "pgvector"],
    ownership: "Sole creator of product concept, user experience design, frontend development, and safety guardrails.",
    results: [
      { metric: "100%", label: "Client-side privacy preservation" },
      { metric: "4.9/5", label: "Positive user feedback" },
      { metric: "<1s", label: "Empathetic conversational response" },
      { metric: "Zero", label: "Unsafe medical simulations" },
    ],
    tags: ["Wellness", "Product Design", "Privacy", "Full-Stack", "UX"],
    aliases: ["serenify", "wellness", "mindfulness", "journal", "mental health"],
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
