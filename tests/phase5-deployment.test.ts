import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { projects, experiences, stats } from "@/data/portfolio";
import { caseStudies } from "@/data/case-studies";
import { getAiModel, AI_MODEL } from "@/lib/ai-config";
import { SITE_URL } from "@/lib/site-config";

test("Capital Play has no live link and keeps valid source repository", () => {
  const capitalPlay = projects.find((p) => p.slug === "capital-play");
  assert.ok(capitalPlay, "Capital Play project must exist");
  assert.equal(capitalPlay.live, undefined, "Capital Play live link must be removed pending DB migration");
  assert.ok(capitalPlay.github.startsWith("https://github.com/"), "Capital Play must retain GitHub source");
});

test("RideFlow is not featured and has no live link (Source only)", () => {
  const rideFlow = projects.find((p) => p.slug === "rideflow");
  assert.ok(rideFlow, "RideFlow project must exist");
  assert.equal(rideFlow.featured, false, "RideFlow must not be featured (moved to Also built)");
  assert.equal(rideFlow.live, undefined, "RideFlow live link must be removed pending DB migration");
  assert.ok(rideFlow.github.startsWith("https://github.com/"), "RideFlow must retain GitHub source");
});

test("Daftar has role 'Built by Abdul Samad'", () => {
  const daftar = projects.find((p) => p.slug === "daftar");
  assert.ok(daftar, "Daftar project must exist");
  assert.equal(daftar.role, "Built by Abdul Samad");

  const daftarStudy = caseStudies.find((s) => s.slug === "daftar");
  assert.ok(daftarStudy, "Daftar case study must exist");
  assert.ok(
    daftarStudy.ownership.includes("Built by Abdul Samad"),
    `Daftar case study ownership must state Built by Abdul Samad (got: ${daftarStudy.ownership})`
  );
});

test("FAST NUCES education entry includes CGPA 3.12, but hero stats do not", () => {
  const education = experiences.find((e) => e.type === "education");
  assert.ok(education, "Education entry must exist");
  assert.ok(
    education.summary.includes("3.12") || education.bullets.some((b) => (typeof b === "string" ? b : b.text).includes("3.12")),
    "Education entry must include CGPA 3.12"
  );

  // Hero stats must not mention CGPA
  for (const stat of stats) {
    assert.doesNotMatch(stat.label, /cgpa/i, "Hero stats must not contain CGPA");
  }
});

test("FlyRank internship dates are Jul 2026 – Aug 2026", () => {
  const flyrank = experiences.find((e) => e.company === "FlyRank");
  assert.ok(flyrank, "FlyRank experience must exist");
  assert.equal(flyrank.period, "Jul 2026 – Aug 2026");

  const flyrankStudy = caseStudies.find((s) => s.slug === "content-refresh-pipeline");
  assert.ok(flyrankStudy, "FlyRank case study must exist");
  assert.equal(flyrankStudy.period, "Jul 2026 – Aug 2026");
});

test("AI model is configurable via environment variable", () => {
  const originalEnv = process.env.AI_MODEL;
  try {
    delete process.env.AI_MODEL;
    assert.equal(getAiModel(), AI_MODEL, "getAiModel should return default when env is unset");

    process.env.AI_MODEL = "llama-3.3-70b-versatile";
    assert.equal(getAiModel(), "llama-3.3-70b-versatile", "getAiModel should return overridden model from env");
  } finally {
    if (originalEnv !== undefined) {
      process.env.AI_MODEL = originalEnv;
    } else {
      delete process.env.AI_MODEL;
    }
  }
});

test("DEPLOY.md exists with required sections and env var table", () => {
  const deployPath = path.join(process.cwd(), "DEPLOY.md");
  assert.ok(fs.existsSync(deployPath), "DEPLOY.md must exist in root");

  const content = fs.readFileSync(deployPath, "utf-8");
  assert.ok(content.includes("Vercel Import Steps"), "DEPLOY.md must document Vercel import");
  assert.ok(content.includes("Environment Variables"), "DEPLOY.md must document env vars");
  assert.ok(content.includes("LLM_API_KEY"), "DEPLOY.md must list LLM_API_KEY");
  assert.ok(content.includes("AI_MODEL"), "DEPLOY.md must list AI_MODEL");
  assert.ok(content.includes("RESEND_API_KEY"), "DEPLOY.md must list RESEND_API_KEY");
  assert.ok(content.includes("Post-Deployment Verification Checklist"), "DEPLOY.md must contain post-deploy checklist");
});

test("SITE_URL configuration supports environment variables", () => {
  assert.ok(SITE_URL.startsWith("http"), "SITE_URL must be a valid URL string");
});
