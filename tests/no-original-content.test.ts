import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const DENYLIST = [
  "Governed MCP",
  "MCP Tool Registry",
  "LLM Evaluation Platform",
  "Knowledge Graph RAG",
  "Code Intelligence",
  "LiteLLM",
  "Agentic Office",
  "Quill",
  "Aiko",
  "InsightAI",
  "Serenify",
  "CodeForge",
  "OmniGateway",
  "NeuralCanvas",
  "Resume Optimizer",
  "Resume Fit",
  "kappa",
  "76 KB",
  "ArmorCode",
  "Central Electricity",
  "AI Ninja",
  "Gurugram",
  "Nikunj",
  "Khitha",
  "Codenex",
];

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

test("no original-author content or banned keywords appear in src, public, or tests", () => {
  const root = process.cwd();
  const dirsToScan = [
    path.join(root, "src"),
    path.join(root, "public"),
    path.join(root, "tests"),
  ];

  const allFiles = dirsToScan.flatMap(getFiles);
  const violations: { file: string; term: string }[] = [];

  for (const filePath of allFiles) {
    // Exclude this test file itself so its own denylist definition doesn't match
    if (path.basename(filePath) === "no-original-content.test.ts") {
      continue;
    }

    const relPath = path.relative(root, filePath).replace(/\\/g, "/");
    const ext = path.extname(filePath).toLowerCase();

    // For binary media, check only file path
    if ([".png", ".jpg", ".jpeg", ".ico", ".pdf", ".mp4", ".webp"].includes(ext)) {
      for (const term of DENYLIST) {
        if (relPath.toLowerCase().includes(term.toLowerCase())) {
          violations.push({ file: relPath, term });
        }
      }
      continue;
    }

    const content = fs.readFileSync(filePath, "utf-8");
    for (const term of DENYLIST) {
      if (
        content.toLowerCase().includes(term.toLowerCase()) ||
        relPath.toLowerCase().includes(term.toLowerCase())
      ) {
        violations.push({ file: relPath, term });
      }
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Found original author content in repository files: ${JSON.stringify(violations, null, 2)}`
  );
});
