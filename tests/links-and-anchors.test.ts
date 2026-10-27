import test from "node:test";
import assert from "node:assert/strict";
import { stats, projects, personalInfo } from "@/data/portfolio";
import { caseStudies, CASE_STUDY_SLUGS, getCaseStudyPath } from "@/data/case-studies";
import { RESUME_PATH } from "@/lib/site-config";

// Valid section anchors present on the homepage
const VALID_SECTION_ANCHORS = new Set([
  "#about",
  "#experience",
  "#work",
  "#projects",
  "#skills",
  "#ai-twin",
  "#contact",
  "#hero",
  "#main-content",
]);

// Valid routes in the Next.js app
const VALID_ROUTES = new Set([
  "/",
  "/work",
  RESUME_PATH,
  ...caseStudies.map((s) => `/work/${s.slug}`),
  ...caseStudies.map((s) => getCaseStudyPath(s.slug)),
]);

test("all stats hrefs resolve to valid anchors, routes, or HTTPS URLs", () => {
  for (const stat of stats) {
    if (!stat.href) continue;

    if (stat.href.startsWith("#")) {
      assert.ok(
        VALID_SECTION_ANCHORS.has(stat.href),
        `Stat "${stat.label}" has invalid anchor: ${stat.href}`
      );
    } else if (stat.href.startsWith("/")) {
      assert.ok(
        VALID_ROUTES.has(stat.href),
        `Stat "${stat.label}" has invalid route: ${stat.href}`
      );
    } else {
      assert.doesNotThrow(() => {
        const u = new URL(stat.href);
        assert.equal(u.protocol, "https:", `Stat "${stat.label}" URL must be HTTPS`);
      }, `Stat "${stat.label}" has malformed external URL: ${stat.href}`);
    }
  }
});

test("all project links in portfolio.ts are well-formed HTTPS URLs", () => {
  for (const project of projects) {
    if (project.github) {
      assert.doesNotThrow(() => {
        const u = new URL(project.github!);
        assert.equal(u.protocol, "https:", `Project "${project.title}" github URL must be HTTPS`);
        assert.notEqual(u.hostname, "example.com", `Project "${project.title}" github cannot be example.com`);
      }, `Project "${project.title}" has invalid github URL: ${project.github}`);
    }

    if (project.live) {
      assert.doesNotThrow(() => {
        const u = new URL(project.live!);
        assert.equal(u.protocol, "https:", `Project "${project.title}" live URL must be HTTPS`);
        assert.notEqual(u.hostname, "example.com", `Project "${project.title}" live cannot be example.com`);
      }, `Project "${project.title}" has invalid live URL: ${project.live}`);
    }
  }
});

test("all personal social links are well-formed HTTPS URLs", () => {
  for (const [key, url] of [
    ["linkedin", personalInfo.linkedin],
    ["github", personalInfo.github],
  ]) {
    assert.doesNotThrow(() => {
      const u = new URL(url);
      assert.equal(u.protocol, "https:", `personalInfo.${key} must be HTTPS`);
      assert.notEqual(u.hostname, "example.com", `personalInfo.${key} cannot be example.com`);
    }, `personalInfo.${key} has invalid URL: ${url}`);
  }
});

test("all case study slugs and navigation links resolve correctly", () => {
  for (const study of caseStudies) {
    const route = getCaseStudyPath(study.slug);
    assert.ok(VALID_ROUTES.has(route), `Case study route ${route} must be valid`);
    assert.ok(
      CASE_STUDY_SLUGS.includes(study.slug as CaseStudySlug),
      `Slug "${study.slug}" must be in CASE_STUDY_SLUGS`
    );
  }
});
