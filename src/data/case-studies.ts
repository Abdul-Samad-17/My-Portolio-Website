// Real case studies for Abdul Samad's portfolio.
// Sourced from reference/content-brief.md (Abdul's CV, public GitHub, and project READMEs).

export type CaseStudyKind = "system" | "product";

export type CaseStudyTheme =
  | "pipelines"
  | "robotics"
  | "agents"
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
  constraints?: string[];
  diagram?: "eval" | "mcp" | "kgrag" | "docs" | "gateway" | "generic" | null;
  diagramCaption?: string;
  decisions?: CaseStudyDecision[];
  sections: CaseStudySection[];
  stack: string[];
  ownership: string;
  results: CaseStudyResult[];
  tags: string[];
  aliases: string[];
}

export type CaseStudySlug =
  | "content-refresh-pipeline"
  | "assistive-navigation"
  | "daftar"
  | "capital-play";

export const CASE_STUDY_SLUGS: CaseStudySlug[] = [
  "content-refresh-pipeline",
  "assistive-navigation",
  "daftar",
  "capital-play",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "content-refresh-pipeline",
    kind: "system",
    theme: "pipelines",
    featured: true,
    title: "Content-Refresh Scoring Pipeline",
    employer: "FlyRank",
    period: "Jul 2026 – Aug 2026",
    oneLiner: "Machine learning pipeline ranking content decay risk across warehouse-scale datasets using DuckDB and Random Forest.",
    summary: "Built and validated an end-to-end ML scoring pipeline at FlyRank to rank content pages by decline risk. Designed analytical DuckDB queries across warehouse-scale data, engineered decay features, conducted leakage audits, and trained Random Forest models validated with client-holdout splits.",
    problem: "Rank content pages by decline risk across a data warehouse containing tens of millions of rows, identifying pages that require content refreshes before organic traffic decay occurs.",
    constraints: [
      "Must execute efficiently over warehouse tables containing tens of millions of rows without memory exhaustion.",
      "Must guarantee zero target leakage between historical content features and future performance labels.",
      "Pipeline outputs must be validated on client-holdout splits to ensure generalization across unobserved domains.",
    ],
    diagram: null,
    decisions: [
      {
        choice: "DuckDB for analytical querying and feature calculation",
        why: "Allowed vectorized SQL processing directly over columnar warehouse data with minimal memory footprint and fast aggregations.",
        rejected: ["Pure Python in-memory pandas loops that failed to scale over tens of millions of records."],
      },
      {
        choice: "Independent leakage-audit process with holdout validation",
        why: "Identified and removed a label-derived feature that was artificially inflating cross-validation metrics, ensuring true generalization.",
        rejected: ["Standard random train/test splits that allowed temporal and domain information leakage."],
      },
      {
        choice: "Random Forest ranking model over heuristic baselines",
        why: "Captured non-linear feature interactions between content age, velocity, and decay metrics to achieve 3x precision improvement.",
        rejected: ["Linear regression and static threshold heuristics that failed to rank high-risk pages effectively."],
      },
    ],
    sections: [
      {
        heading: "Approach",
        body: "Designed DuckDB analytical pipelines to ingest and process tens of millions of warehouse records. Executed feature engineering focused on content decline velocity, conducted a rigorous data leakage audit, corrected label-derived artifacts, and validated performance through client-holdout testing against historical baselines.",
        points: [
          "Vectorized feature computation using DuckDB over warehouse datasets",
          "Feature engineering and leakage audit isolating label contamination",
          "Client-holdout validation testing against historical production baselines",
          "Random Forest modeling delivering 0.74 precision@50",
        ],
      },
    ],
    stack: ["Python", "scikit-learn", "pandas", "DuckDB", "Random Forest"],
    ownership: "Independently designed the feature engineering and leakage-audit process, and found and corrected a label-derived feature.",
    results: [
      { metric: "0.74", label: "Precision@50 on client-holdout validation" },
      { metric: "3x", label: "Improvement over historical baseline heuristic" },
      { metric: "10M+", label: "Warehouse records processed efficiently with DuckDB" },
    ],
    tags: ["Machine Learning", "DuckDB", "Feature Engineering", "Python", "Pipelines"],
    aliases: ["content-refresh-pipeline", "flyrank", "flyrank-scoring-pipeline", "scoring-pipeline", "decay-pipeline"],
  },
  {
    slug: "assistive-navigation",
    kind: "system",
    theme: "robotics",
    featured: true,
    title: "AI Assistive Navigation System",
    employer: "FAST NUCES",
    period: "Oct 2025 – Present",
    oneLiner: "Assistive robotics system combining 360-degree LiDAR-camera sensor fusion, YOLOv8, and ROS2 for visually impaired users.",
    summary: "Engineered an edge-deployed assistive navigation system for visually impaired users. Fuses 360-degree RPLIDAR spatial distance data with real-time YOLOv8 object detection and DeepSORT tracking on an ESP32 and Raspberry Pi 4 running ROS2, outputting low-latency directional spatial audio.",
    problem: "Safe, independent mobility and obstacle avoidance for visually impaired users in complex, dynamic indoor and outdoor environments without relying on cellular cloud connectivity.",
    constraints: [
      "Must run on low-power edge hardware (Raspberry Pi 4 and ESP32) within a wearable power budget.",
      "End-to-end audio feedback latency must remain strictly under 200 ms for immediate collision avoidance.",
      "Must operate reliably across dynamic lighting conditions and varied indoor/outdoor environments.",
    ],
    diagram: null,
    decisions: [
      {
        choice: "360-degree LiDAR and camera sensor fusion",
        why: "Combined millimeter-accurate RPLIDAR distance mapping with camera object classification to cut collision risk by 70%.",
        rejected: ["Camera-only depth estimation which degraded severely in low-light environments and lacked full 360° awareness."],
      },
      {
        choice: "ROS2 middleware on edge hardware",
        why: "Provided real-time publish-subscribe node architecture for sensor streams with deterministic scheduling between Pi 4 and ESP32.",
        rejected: ["Monolithic Python scripts that introduced thread blocking and uncoordinated sensor polling."],
      },
      {
        choice: "YOLOv8 coupled with DeepSORT tracking",
        why: "Delivered 92% object re-identification accuracy to continuously track moving obstacles and pedestrians across sequential frames.",
        rejected: ["Single-frame object detection without tracking, which caused audio alert jitter on temporary occlusions."],
      },
    ],
    sections: [
      {
        heading: "Approach",
        body: "Integrated an RPLIDAR unit and wide-angle camera with an ESP32 micro-controller and Raspberry Pi 4 running ROS2. Deployed lightweight YOLOv8 models for object detection and DeepSORT for multi-object tracking, fusing spatial depth coordinates with classified labels to generate intuitive spatial audio cues under 200 ms.",
        points: [
          "360-degree LiDAR-camera fusion cutting collision risk by 70%",
          "YOLOv8 and DeepSORT achieving 92% re-identification accuracy",
          "Deterministic ROS2 edge communication between Raspberry Pi 4 and ESP32",
          "Spatial audio feedback delivered in under 200 ms",
        ],
      },
    ],
    stack: ["YOLOv8", "DeepSORT", "ROS2", "Sensor Fusion", "RPLIDAR", "ESP32", "Raspberry Pi 4", "Python", "C++"],
    ownership: "Lead developer on computer vision tracking, LiDAR-camera sensor fusion, and ROS2 messaging nodes.",
    results: [
      { metric: "92%", label: "Re-identification accuracy with DeepSORT" },
      { metric: "70%", label: "Collision risk reduction via 360° LiDAR-camera fusion" },
      { metric: "<200ms", label: "End-to-end audio feedback latency" },
      { metric: "60%", label: "Improvement in independent user mobility" },
    ],
    tags: ["Robotics", "Computer Vision", "ROS2", "LiDAR", "Sensor Fusion", "Edge AI"],
    aliases: ["assistive-navigation", "ai-assistive-navigation", "lidar-navigation", "robotics-navigation", "vision-navigation"],
  },
  {
    slug: "daftar",
    kind: "system",
    theme: "agents",
    featured: true,
    title: "Daftar: Workplace Simulation",
    employer: "AICON'26 Build With AI",
    period: "2026",
    oneLiner: "Multi-agent workplace simulation where fresh graduates complete a 'first shift' with an AI team grading six workplace skills.",
    summary: "Built at AICON'26 Build With AI by team nexora. Immerses fresh graduates in a simulated 'first shift' with an AI-generated team (CEO, manager, senior, peer, client) with private knowledge contexts. Features hidden browser tests, an automated QA bot filing bug reports, and an AI evaluator that scores six workplace competencies quoting the graduate's own messages.",
    problem: "Fresh engineering graduates face steep workplace culture and communication shocks without realistic environments to practice conflict resolution, task prioritization, and cross-functional team interactions.",
    constraints: [
      "Persona agents must maintain strict private knowledge boundaries without leaking hidden scenario facts.",
      "Interactive responses must stream quickly within conversational turn limits on Vercel serverless functions.",
      "Evaluation grading must be objective, reproducible, and directly grounded in exact quotes from user messages.",
    ],
    diagram: null,
    decisions: [
      {
        choice: "Multi-agent persona architecture with private knowledge",
        why: "Gave each persona (CEO, manager, senior engineer, peer, client) distinct goals and isolated knowledge, creating realistic team dynamics.",
        rejected: ["Single monolithic system prompt acting as all team members, which suffered from persona blending and context leaks."],
      },
      {
        choice: "Browser-executed hidden tests and QA bug bot",
        why: "Injected unexpected real-time workplace events (such as QA filing bugs during client calls) to test realistic prioritization under pressure.",
        rejected: ["Static multiple-choice questionnaires and scripted decision trees."],
      },
      {
        choice: "Quotation-grounded rubric evaluation",
        why: "Ensured the final assessment of six core workplace skills referenced specific verbatim statements by the user for constructive feedback.",
        rejected: ["Subjective numerical scores without verifiable textual evidence."],
      },
    ],
    sections: [
      {
        heading: "Approach",
        body: "Architected a multi-agent simulation using Google Gemini and Next.js deployed on Vercel. Engineered separate persona prompts with scoped memory, built an asynchronous task engine that runs hidden browser checks, and implemented an evaluation pipeline that generates granular scores across six competencies with supporting evidence.",
        points: [
          "5 distinct AI personas (CEO, Manager, Senior, Peer, Client) with private knowledge",
          "Hidden tests running in the browser with automated QA bug filing",
          "Automated evaluation across 6 core workplace skills citing user messages",
          "Real-time streaming multi-turn chat built with Next.js and Gemini on Vercel",
        ],
      },
    ],
    stack: ["Gemini", "Next.js", "TypeScript", "Vercel", "Tailwind CSS"],
    ownership: "Built by Abdul Samad with team nexora.",
    results: [
      { metric: "6", label: "Core workplace skills evaluated and scored" },
      { metric: "5", label: "Distinct AI personas with private knowledge" },
      { metric: "100%", label: "Evaluation backed by verifiable message quotation" },
    ],
    tags: ["Multi-Agent", "Gemini", "Next.js", "AI Simulation", "LLM Evaluation"],
    aliases: ["daftar", "trydaftar", "workplace-simulation", "nexora", "team-nexora"],
  },
  {
    slug: "capital-play",
    kind: "product",
    theme: "products",
    featured: false,
    title: "Capital Play",
    employer: "Personal Project",
    period: "2025",
    oneLiner: "Sports ground booking platform with multi-role dashboards, automated slot engines, dynamic promotions, and live messaging.",
    summary: "Full-stack sports venue booking platform built with React, Node.js, Express, MySQL, and Socket.io. Features 3 dedicated role dashboards (Player, Owner, Admin), real-time slot reservation, in-app messaging, a background 'Ghost Engine' that generates and releases slots, and a recursive promotion engine.",
    problem: "Sports ground owners and players in urban areas struggle with manual venue coordination, frequent booking conflicts, delayed reservations, and low sports facility utilization.",
    constraints: [
      "Slot availability must synchronize in real time across concurrent users to eliminate double-booking.",
      "System must automatically manage unconfirmed reservation timeouts without manual owner intervention.",
      "Architecture must support 3 distinct permission tiers (Player, Owner, Admin) with role-based access control.",
    ],
    diagram: null,
    decisions: [
      {
        choice: "Background Ghost Engine for slot lifecycle management",
        why: "Automated recurring slot generation and time-bounded holds, releasing unconfirmed slots back to the public pool automatically.",
        rejected: ["Manual venue owner approval flows that caused delayed confirmations and idle ground slots."],
      },
      {
        choice: "Socket.io for real-time slot state and messaging",
        why: "Delivered instantaneous UI updates when slots are selected, preventing reservation race conditions between concurrent players.",
        rejected: ["Periodic HTTP polling which introduced latency windows where duplicate bookings could occur."],
      },
      {
        choice: "Recursive promotion engine",
        why: "Allowed owners to define cascading discounts and dynamic pricing structures to drive utilization during off-peak hours.",
        rejected: ["Static fixed-rate pricing models that failed to improve low utilization."],
      },
    ],
    sections: [
      {
        heading: "Approach",
        body: "Engineered a scalable full-stack web application with React and Node.js/Express backed by MySQL. Implemented Socket.io for bi-directional live communication, built 3 role-tailored dashboards, implemented JWT authentication with RBAC, and created background automated workers for slot scheduling and dynamic promotions.",
        points: [
          "3 role-tailored dashboards for Players, Owners, and Administrators",
          "Background Ghost Engine managing automated slot availability and timeouts",
          "Real-time concurrent slot locking and in-app messaging via Socket.io",
          "Recursive promotion engine providing dynamic venue pricing",
        ],
      },
    ],
    stack: ["React", "Express", "Node.js", "MySQL", "Socket.io", "Tailwind CSS"],
    ownership: "Full-stack developer responsible for architecture, real-time socket communications, database design, and promotion engines.",
    results: [
      { metric: "50%", label: "More efficient booking management for owners" },
      { metric: "3x", label: "Increase in sports ground utilization" },
      { metric: "5x", label: "Faster booking turnaround for players" },
    ],
    tags: ["Full-Stack", "React", "Node.js", "MySQL", "Socket.io", "Real-Time"],
    aliases: ["capital-play", "sports-booking", "ghost-engine", "venue-booking", "ground-booking"],
  },
];

export const CASE_STUDY_THEMES: { id: CaseStudyTheme; label: string; blurb: string }[] = [
  {
    id: "pipelines",
    label: "ML Pipelines",
    blurb: "High-throughput predictive feature engineering and model scoring pipelines.",
  },
  {
    id: "robotics",
    label: "Computer Vision & Robotics",
    blurb: "Real-time edge tracking, sensor fusion, and assistive robotics architectures.",
  },
  {
    id: "agents",
    label: "Agent Systems",
    blurb: "Multi-agent persona simulations with automated evaluation and browser testing.",
  },
  {
    id: "products",
    label: "Full-Stack Products",
    blurb: "Production full-stack platforms with real-time state synchronization and automated engines.",
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
