// Portfolio data for Abdul Samad

import type { CaseStudySlug } from "@/data/case-studies";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/site-config";

export const personalInfo = {
  name: "Abdul Samad",
  role: "AI/ML Engineer",
  education: "BS Artificial Intelligence student at FAST NUCES Islamabad (Batch 2024)",
  tagline: "BS Artificial Intelligence student at FAST NUCES Islamabad, building ML pipelines, computer-vision robotics and full-stack AI products.",
  focus: "BS Artificial Intelligence student at FAST NUCES Islamabad, building ML pipelines, computer-vision robotics and full-stack AI products.",
  location: "Islamabad, Pakistan",
  email: "abdulsammadsardar17@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdul-samad1706",
  github: "https://github.com/Abdul-Samad-17",
  resumeUrl: RESUME_PATH,
  resumeFilename: RESUME_FILENAME,
};

/** `href` points each number at the surface that actually proves it. */
export const stats = [
  { value: 15, suffix: "", label: "Public repositories", href: "https://github.com/Abdul-Samad-17" },
  { value: 10, suffix: "+", label: "AI projects completed", href: "#work" },
  { value: 25, suffix: "+", label: "Hackathon participants led", href: "#about" },
  { value: 0.74, suffix: "", label: "Precision@50 (3x baseline)", href: "/work/content-refresh-pipeline" },
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
  summary: "BS Artificial Intelligence student at FAST NUCES Islamabad, building ML pipelines, computer-vision robotics, and full-stack AI products. Experienced in predictive scoring models, real-time edge computer vision, multi-agent simulation environments, and scalable full-stack platforms.",
  highlights: [
    {
      metric: "0.74",
      label: "Precision@50",
      detail:
        "Validated content-refresh scoring pipeline with Random Forest on DuckDB, achieving a 3x gain over baseline with client-holdout verification.",
    },
    {
      metric: "25+",
      label: "Hackathon participants led",
      detail:
        "Organizing Officer for NASCON'25 AI Hackathon at FAST NUCES with 2+ partner companies and 200% reach growth.",
    },
    {
      metric: "5",
      label: "Anthropic Academy certifications",
      detail:
        "Certified in AI Fluency, Claude Platform, Claude Code, Model Context Protocol (MCP), and Claude Cowork.",
    },
    {
      metric: "15",
      label: "Public repositories",
      detail:
        "Actively shipping open-source ML pipelines, robotics packages, full-stack web applications, and systems projects on GitHub.",
    },
  ] satisfies Highlight[],
};

export const recognition = {
  title: "AI Hackathon Organizing Officer, NASCON'25",
  detail:
    "FAST NUCES, Apr – May 2025. Led a 25+ participant industry hackathon with 2+ partner companies, driving 200% growth in event reach.",
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
    company: "FlyRank",
    role: "Machine Learning Engineering Intern",
    period: "Jul 2026 – Aug 2026",
    type: "work",
    summary: "Built and validated a predictive content-refresh scoring pipeline over large-scale warehouse data.",
    bullets: [
      { text: "Built and validated a content-refresh scoring pipeline (Python, scikit-learn, pandas, DuckDB) achieving 0.74 precision@50 with Random Forest, a 3x improvement over baseline validated by client-holdout testing.", study: "content-refresh-pipeline" },
      { text: "Independently designed the feature engineering and leakage-audit process, finding and correcting a label-derived feature.", study: "content-refresh-pipeline" },
    ],
  },
  {
    company: "NASCON'25, FAST NUCES",
    role: "AI Hackathon Organizing Officer",
    period: "Apr 2025 – May 2025",
    type: "work",
    summary: "Led organizing operations for the flagship university AI hackathon.",
    bullets: [
      "Led a 25+ participant industry hackathon with 2+ partner companies.",
      "Achieved 200% growth in event reach and participant engagement.",
    ],
  },
  {
    company: "FAST NUCES Islamabad",
    role: "B.S. Artificial Intelligence",
    period: "Aug 2024 – 2028",
    type: "education",
    summary: "Undergraduate degree in Artificial Intelligence (CGPA: 3.12) covering algorithms, machine learning, computer vision, and systems.",
    bullets: [
      "CGPA: 3.12 / 4.00",
      "Coursework: Data Structures & Algorithms, Artificial Intelligence, Operating Systems, Linear Algebra, Probability and Statistics, SQL, Machine Learning, Analysis of Algorithms.",
      "Certified across 5 Anthropic Academy programs: AI Fluency, Claude Platform, Claude Code, Model Context Protocol (MCP), and Claude Cowork.",
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
    slug: "daftar",
    featured: true,
    title: "Daftar",
    category: "Multi-Agent Workplace Simulation",
    summary: "Multi-agent workplace simulation where a fresh graduate works a first shift alongside AI colleagues with private knowledge.",
    description: "Built at AICON'26 Build With AI by team nexora. A fresh graduate does a 'first shift' with an AI-generated team (CEO, manager, senior, peer, client), each with private knowledge. Hidden tests run in the browser, a QA bot files bugs, and an AI reviewer grades six workplace skills quoting the graduate's own messages.",
    impact: "Automated objective grading across six workplace skills with real-time browser-based testing and personalized feedback.",
    role: "Built by Abdul Samad",
    timeline: "AICON'26 Build With AI",
    complexity: "Multi-agent persona coordination, hidden browser testing, AI evaluation quoting user transcripts",
    images: ["/images/projects/daftar/placeholder.png"],
    tech: ["Gemini", "Next.js", "Vercel", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Abdul-Samad-17/daftar",
    live: "https://trydaftar.vercel.app",
  },
  {
    slug: "capital-play",
    featured: true,
    title: "Capital Play",
    category: "Full-Stack Venue Booking Platform",
    summary: "Sports ground booking platform with multi-role dashboards, automated slot engine, dynamic promotions, and live messaging.",
    description: "Full-stack sports venue booking platform built with React, Node.js, Express, MySQL, and Socket.io. Features 3 dedicated role dashboards (Player, Owner, Admin), real-time slot reservation, in-app messaging, a background 'Ghost Engine' that generates and releases slots, and a recursive promotion engine.",
    impact: "Owners manage bookings 50% more efficiently, ground utilization increased by 3x, and player bookings are 5x faster.",
    role: "Full-stack developer",
    timeline: "Personal project",
    complexity: "Background Ghost Engine for slot lifecycles, real-time Socket.io concurrency locking, recursive promotions",
    images: ["/images/projects/capital-play/placeholder.png"],
    tech: ["React", "Node.js", "Express", "MySQL", "Socket.io", "Tailwind CSS"],
    github: "https://github.com/Abdul-Samad-17/Capital_Play",
  },
  {
    slug: "rideflow",
    featured: false,
    title: "RideFlow",
    category: "Full-Stack Ride Hailing Platform",
    summary: "Full-stack ride hailing service featuring atomic wallet transactions, stored procedures, triggers, and live Google Maps tracking.",
    description: "Full-stack ride hailing platform with a MySQL relational backend utilizing stored procedures, triggers, views, and atomic wallet payments, coupled with interactive Google Maps driver and rider routing.",
    impact: "Guarantees atomic ACID wallet transactions and optimized spatial query routing for passenger-driver matching.",
    role: "Database & full-stack developer",
    timeline: "DB Systems Lab Project",
    complexity: "Atomic wallet transactions, stored procedures, triggers, views, Google Maps API",
    images: ["/images/projects/rideflow/placeholder.png"],
    tech: ["React", "Node.js", "Express", "MySQL", "Google Maps API", "Tailwind CSS"],
    github: "https://github.com/Abdul-Samad-17/Ride-Flow",
  },
  {
    slug: "ai-ml-automation-tools",
    title: "AI-ML-Automation-Tools",
    category: "Applied AI & Automation",
    summary: "Suite of 5 AI automation tools: FAQ chatbot, email classifier, document QA, RAG chatbot, and FastAPI workflow automation.",
    description: "Modular collection of 5 end-to-end AI utilities covering document Q&A, intent classification, retrieval-augmented generation (RAG), and FastAPI webhook automation pipelines.",
    impact: "Demonstrates production workflows connecting language models with structured document parsers and automated API triggers.",
    role: "AI developer",
    timeline: "Independent AI suite",
    complexity: "Document ingestion, embeddings, RAG pipelines, FastAPI integration",
    images: [],
    tech: ["Python", "FastAPI", "RAG", "LLMs", "LangChain"],
    github: "https://github.com/Abdul-Samad-17/AI-ML-Automation-Tools",
  },
  {
    slug: "cinegraphx",
    title: "CineGraphX",
    category: "Systems & Graph Algorithms",
    summary: "Zero-STL C++ movie recommendation and search engine over 5,000 IMDb movies using custom AVL trees and graph structures.",
    description: "Engineered a zero-STL C++ graph and tree database over 5,000 IMDb movies. Implemented custom AVL trees, adjacency lists, and graph traversal algorithms to achieve 5x faster search than linear scanning.",
    impact: "Achieved 5x faster search query response compared to linear scan baseline with zero STL dependencies.",
    role: "Systems developer",
    timeline: "Systems project",
    complexity: "Zero-STL custom memory management, self-balancing AVL trees, custom graph traversal",
    images: [],
    tech: ["C++", "Data Structures", "Algorithms", "Graph Theory"],
    github: "https://github.com/Abdul-Samad-17/CineGraphX",
  },
  {
    slug: "flyrank-internship",
    title: "FlyRank-Internship",
    category: "ML Pipelines & Scoring",
    summary: "Content-refresh scoring pipeline repository and documentation evaluating decline risk using DuckDB and Random Forest.",
    description: "Complete machine learning pipeline and research evaluation for ranking content decline risk. Employs DuckDB warehouse queries, feature engineering, leakage prevention, and client-holdout validation.",
    impact: "0.74 precision@50, achieving a 3x improvement over baseline.",
    role: "Machine Learning Engineering Intern",
    timeline: "FlyRank Internship",
    complexity: "DuckDB warehouse processing, feature leakage audit, client-holdout validation",
    images: [],
    tech: ["Python", "scikit-learn", "pandas", "DuckDB"],
    github: "https://github.com/Abdul-Samad-17/FlyRank-Internship",
    live: "https://abdul-samad-17.github.io/FlyRank-Internship/",
  },
  {
    slug: "gridlock-rush",
    title: "GridLock Rush",
    category: "Low-Level Systems",
    summary: "Interactive 2D traffic navigation game written in pure x86 Assembly language.",
    description: "Developed a low-level 2D game using pure x86 Assembly with direct video memory rendering, interrupt handling, and custom collision mechanics.",
    impact: "Demonstrates bare-metal hardware control, register optimization, and BIOS interrupt handling.",
    role: "Systems developer",
    timeline: "Assembly project",
    complexity: "Direct video memory manipulation, BIOS interrupts, x86 assembly optimizations",
    images: [],
    tech: ["x86 Assembly", "DOSBox", "Low-Level Systems"],
    github: "https://github.com/Abdul-Samad-17/GridLock-Rush",
  },
];

export const skillCategories = [
  {
    title: "AI / ML",
    description: "Machine learning pipelines, predictive scoring, computer vision, deep learning, and analytical modeling.",
    skills: ["Python", "PyTorch", "scikit-learn", "YOLOv8", "OpenCV", "NumPy", "Pandas", "Seaborn", "CLIP"],
  },
  {
    title: "Web",
    description: "Full-stack web applications, real-time socket communications, backend APIs, and modern frontends.",
    skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "Socket.io", "Tailwind CSS", "Next.js"],
  },
  {
    title: "Robotics and CV",
    description: "Edge robotics, multi-object tracking, LiDAR sensor fusion, and low-level embedded systems.",
    skills: ["ROS2", "sensor fusion", "DeepSORT", "Gazebo", "RPLIDAR", "C++", "Assembly"],
  },
  {
    title: "Tools and databases",
    description: "Relational and analytical databases, version control, API testing, and deployment platforms.",
    skills: ["Git", "GitHub", "Postman", "Vercel", "MySQL", "PostgreSQL", "DuckDB"],
  },
];

/** Phrased to exercise the AI Twin's tools rather than invite a canned answer. */
export const chatSuggestions = [
  "What has he built?",
  "What is Abdul's background in AI/ML?",
  "Tell me about the FlyRank content-refresh pipeline",
  "How does the AI Assistive Navigation System work?",
  "What technologies does Abdul work with most?",
];
