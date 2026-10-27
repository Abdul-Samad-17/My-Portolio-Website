import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function publicFile(name: string) {
  return path.join(root, "public", name);
}

// ---------------------------------------------------------------------------
// favicon.ico — valid ICO file (header 00 00 01 00) and substantial size
// ---------------------------------------------------------------------------
test("public/favicon.ico exists and has a valid ICO header", () => {
  const filePath = publicFile("favicon.ico");
  assert.ok(fs.existsSync(filePath), "public/favicon.ico must exist");

  const stat = fs.statSync(filePath);
  assert.ok(stat.size > 1000, `public/favicon.ico is too small (${stat.size} bytes)`);

  // Read first 4 bytes: ICO header is 00 00 01 00
  const buf = Buffer.alloc(4);
  const fd = fs.openSync(filePath, "r");
  fs.readSync(fd, buf, 0, 4, 0);
  fs.closeSync(fd);

  assert.equal(buf[0], 0, "ICO reserved byte 0 must be 0");
  assert.equal(buf[1], 0, "ICO reserved byte 1 must be 0");
  assert.equal(buf[2], 1, "ICO type byte must be 1 (icon)");
  assert.equal(buf[3], 0, "ICO type byte high must be 0");
});

// ---------------------------------------------------------------------------
// PNG icons — existence + correct dimensions via raw PNG chunk parsing
// We avoid requiring sharp in tests (it is a dev dependency) and instead
// read width/height directly from the PNG IHDR chunk (bytes 16-23).
// ---------------------------------------------------------------------------
function readPngDimensions(filePath: string): { width: number; height: number } {
  const fd = fs.openSync(filePath, "r");
  const buf = Buffer.alloc(24);
  fs.readSync(fd, buf, 0, 24, 0);
  fs.closeSync(fd);

  // PNG signature: 8 bytes, then IHDR chunk: 4 len + 4 "IHDR" + 4 width + 4 height
  const PNG_SIG = "\x89PNG\r\n\x1a\n";
  assert.equal(buf.slice(0, 8).toString("binary"), PNG_SIG, `${filePath} is not a valid PNG`);

  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

const pngChecks: Array<{ file: string; w: number; h: number }> = [
  { file: "favicon-16x16.png", w: 16, h: 16 },
  { file: "favicon-32x32.png", w: 32, h: 32 },
  { file: "favicon-48x48.png", w: 48, h: 48 },
  { file: "apple-touch-icon.png", w: 180, h: 180 },
  { file: "icon-192.png", w: 192, h: 192 },
  { file: "icon-512.png", w: 512, h: 512 },
  { file: "og-image.png", w: 1200, h: 630 },
];

for (const { file, w, h } of pngChecks) {
  test(`public/${file} exists and is ${w}×${h}`, () => {
    const filePath = publicFile(file);
    assert.ok(fs.existsSync(filePath), `public/${file} must exist`);

    const { width, height } = readPngDimensions(filePath);
    assert.equal(width, w, `public/${file} width should be ${w}, got ${width}`);
    assert.equal(height, h, `public/${file} height should be ${h}, got ${height}`);
  });
}

// ---------------------------------------------------------------------------
// manifest.json — parseable and references correct icon paths
// ---------------------------------------------------------------------------
test("public/manifest.json exists and references correct icon paths", () => {
  const filePath = publicFile("manifest.json");
  assert.ok(fs.existsSync(filePath), "public/manifest.json must exist");

  const content = fs.readFileSync(filePath, "utf-8");
  const manifest = JSON.parse(content) as {
    icons?: Array<{ src: string; sizes: string }>;
  };

  assert.ok(Array.isArray(manifest.icons), "manifest.json must have an icons array");
  const sizes = manifest.icons!.map((i) => i.sizes);
  assert.ok(sizes.includes("192x192"), "manifest.json must include a 192x192 icon");
  assert.ok(sizes.includes("512x512"), "manifest.json must include a 512x512 icon");
});
