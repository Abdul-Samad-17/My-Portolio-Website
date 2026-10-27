import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/site-config";
import { personalInfo } from "@/data/portfolio";

test("public/resume.pdf exists and is a valid non-empty PDF", () => {
  const root = process.cwd();
  const resumeFilePath = path.join(root, "public", "resume.pdf");

  assert.ok(fs.existsSync(resumeFilePath), "public/resume.pdf must exist");
  const stats = fs.statSync(resumeFilePath);
  assert.ok(stats.isFile(), "public/resume.pdf must be a file");
  assert.ok(stats.size > 10000, `public/resume.pdf must be substantial in size (was ${stats.size} bytes)`);

  const header = Buffer.alloc(5);
  const fd = fs.openSync(resumeFilePath, "r");
  fs.readSync(fd, header, 0, 5, 0);
  fs.closeSync(fd);
  assert.equal(header.toString("ascii"), "%PDF-", "public/resume.pdf must start with %PDF- header");
});

test("RESUME_PATH and RESUME_FILENAME are correctly configured", () => {
  assert.equal(RESUME_PATH, "/resume.pdf");
  assert.equal(RESUME_FILENAME, "Abdul_Samad_Resume.pdf");
  assert.equal(personalInfo.resumeUrl, RESUME_PATH);
  assert.equal(personalInfo.resumeFilename, RESUME_FILENAME);
});

test("all resume links across src and public resolve to RESUME_PATH", () => {
  const root = process.cwd();
  const dirs = [path.join(root, "src"), path.join(root, "public")];

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

  const allFiles = dirs.flatMap(getFiles);
  const invalidResumeRefs: { file: string; match: string }[] = [];

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (![".ts", ".tsx", ".js", ".jsx", ".json", ".txt", ".md"].includes(ext)) {
      continue;
    }

    const content = fs.readFileSync(file, "utf-8");
    const relPath = path.relative(root, file).replace(/\\/g, "/");

    // Check for any href or path that references resume or cv as a target
    const regex = /(?:href|url|path|src)\s*[:=]\s*["'`]([^"'`]*?(?:resume|cv)[^"'`]*?)["'`]/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const val = match[1];
      // Skip query parameters or anchor words like #cv or generic descriptors
      if (val.includes("curriculum vitae") || val.includes("download cv") || val.startsWith("#")) {
        continue;
      }
      // If it looks like a path or URL for resume, ensure it resolves to /resume.pdf
      if (val.includes(".pdf") || val.startsWith("/") || val.startsWith("http")) {
        if (!val.endsWith("/resume.pdf") && val !== "/resume.pdf" && !val.includes("personalInfo.resumeUrl")) {
          invalidResumeRefs.push({ file: relPath, match: val });
        }
      }
    }
  }

  assert.deepEqual(
    invalidResumeRefs,
    [],
    `Found invalid resume references pointing somewhere other than /resume.pdf: ${JSON.stringify(invalidResumeRefs, null, 2)}`
  );
});
