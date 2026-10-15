import { caseStudies, getCaseStudyPath } from "@/data/case-studies";
import { about, personalInfo } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site-config";

const siteUrl = SITE_URL;
export const ogLocale = "en_PK";

export const siteConfig = {
  siteUrl,
  homeUrl: `${siteUrl}/`,
  resumeUrl: `${siteUrl}${personalInfo.resumeUrl}`,
  updatedAt: "2026-09-06T00:00:00.000Z",
  siteName: "Abdul Samad Portfolio",
  title: `${personalInfo.name} — Applied AI Engineer`,
  description: personalInfo.tagline,
  author: personalInfo.name,
  creator: personalInfo.name,
  email: personalInfo.email,
  github: personalInfo.github,
  linkedin: personalInfo.linkedin,
  locale: "en-PK",
  ogLocale,
  ogImage: "/og-image.png",
  keywords: [
    "Abdul Samad",
    "Applied AI Engineer",
    "Full-Stack Engineer",
    "Backend Engineer",
    "AI Engineer",
    "Platform Engineer",
    "Software Engineer",
    "GenAI Products",
    "Backend Systems",
    "Full-Stack Platform Engineering",
    "API Design",
    "REST APIs",
    "Distributed Systems",
    "AI Observability",
    "AI Governance",
    "AI Gateways",
    "Multi-Agent Systems",
    "Agentic AI",
    "AI Automation",
    "TypeScript",
    "Node.js",
    "Python",
    "Machine Learning",
    "LLM Evaluation",
    "RAG",
    "Full-Stack Development",
  ],
  geo: {
    region: "PK",
    placename: "Islamabad, Pakistan",
    latitude: 33.6844,
    longitude: 73.0479,
    position: "33.6844;73.0479",
    icbm: "33.6844, 73.0479",
  },
  sameAs: [personalInfo.github, personalInfo.linkedin],
  aboutSummary: about.summary,
} as const;

export const caseStudyPages = caseStudies.map((study) => `${siteUrl}${getCaseStudyPath(study.slug)}`);

/** Home first, then each case study. Consumed by sitemap.ts. */
export const canonicalPages = [siteConfig.homeUrl, `${siteConfig.siteUrl}/work`, ...caseStudyPages];
