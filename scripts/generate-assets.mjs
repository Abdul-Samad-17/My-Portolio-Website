import sharp from "sharp";
import fs from "node:fs";

const SOURCE_LOGO = "reference/screenshots/logo-transparent.png";

async function generateAssets() {
  console.log("Generating brand assets from:", SOURCE_LOGO);

  // 0. Copy source logo to src/assets/logo.png (1024x1024) and generate src/assets/logo-512.png
  await sharp(SOURCE_LOGO)
    .resize(1024, 1024)
    .png()
    .toFile("src/assets/logo.png");
  console.log("✓ Created src/assets/logo.png (1024x1024)");

  await sharp(SOURCE_LOGO)
    .resize(512, 512)
    .png()
    .toFile("src/assets/logo-512.png");
  console.log("✓ Created src/assets/logo-512.png (512x512)");

  // 1. Favicon PNGs
  await sharp(SOURCE_LOGO)
    .resize(16, 16)
    .png()
    .toFile("public/favicon-16x16.png");

  await sharp(SOURCE_LOGO)
    .resize(32, 32)
    .png()
    .toFile("public/favicon-32x32.png");

  await sharp(SOURCE_LOGO)
    .resize(48, 48)
    .png()
    .toFile("public/favicon-48x48.png");
  console.log("✓ Created public/favicon-16x16.png, 32x32, 48x48");

  // 2. Favicon.ico with 16, 32, 48 embedded PNGs
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of icoSizes) {
    const buf = await sharp(SOURCE_LOGO)
      .resize(s, s)
      .png()
      .toBuffer();
    pngBuffers.push({ size: s, buffer: buf });
  }

  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon
  header.writeUInt16LE(count, 4);

  let currentOffset = 6 + count * 16;
  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size, 0);
    entry.writeUInt8(item.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(item.buffer.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    entries.push(entry);
    currentOffset += item.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buffer)]);
  fs.writeFileSync("public/favicon.ico", icoBuffer);
  console.log("✓ Created public/favicon.ico (16, 32, 48)");

  // 3. Apple Touch Icon (180x180, dark brand background with ~12% padding)
  // 180 * 0.12 = 21.6 -> padding 22px on each side -> inner logo 136x136
  const appleLogoSize = 136;
  const appleLogoBuf = await sharp(SOURCE_LOGO)
    .resize(appleLogoSize, appleLogoSize)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 9, g: 14, b: 26, alpha: 1 }, // #090e1a
    },
  })
    .composite([
      {
        input: appleLogoBuf,
        top: Math.round((180 - appleLogoSize) / 2),
        left: Math.round((180 - appleLogoSize) / 2),
      },
    ])
    .png()
    .toFile("public/apple-touch-icon.png");
  console.log("✓ Created public/apple-touch-icon.png (180x180 with 12% padding on brand dark background)");

  // 4. PWA 192 and 512 icons
  await sharp(SOURCE_LOGO)
    .resize(192, 192)
    .png()
    .toFile("public/icon-192.png");

  await sharp(SOURCE_LOGO)
    .resize(512, 512)
    .png()
    .toFile("public/icon-512.png");
  console.log("✓ Created public/icon-192.png and public/icon-512.png");

  // 5. Manifest.json
  const manifest = {
    name: "Abdul Samad — AI/ML Engineer",
    short_name: "Abdul Samad",
    description: "Portfolio of Abdul Samad, AI/ML Engineer building ML pipelines, robotics, and full-stack AI products.",
    start_url: "/",
    display: "standalone",
    background_color: "#090e1a",
    theme_color: "#090e1a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
  fs.writeFileSync("public/manifest.json", JSON.stringify(manifest, null, 2));
  console.log("✓ Created public/manifest.json");

  // 6. OG Image (1200x630)
  // Requirement: "1200x630, sharp: center the logo on the dark #090e1a background with a subtle radial glow behind it"
  const ogLogoSize = 360;
  const ogLogoBuf = await sharp(SOURCE_LOGO)
    .resize(ogLogoSize, ogLogoSize)
    .png()
    .toBuffer();

  const svgGlowOverlay = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#29d7b9" stop-opacity="0.30"/>
          <stop offset="45%" stop-color="#29d7b9" stop-opacity="0.12"/>
          <stop offset="75%" stop-color="#3b82f6" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#090e1a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="#090e1a"/>
      <circle cx="600" cy="315" r="420" fill="url(#centerGlow)"/>
    </svg>
  `;

  await sharp(Buffer.from(svgGlowOverlay))
    .composite([
      {
        input: ogLogoBuf,
        top: Math.round((630 - ogLogoSize) / 2),
        left: Math.round((1200 - ogLogoSize) / 2),
      },
    ])
    .png({ quality: 95 })
    .toFile("public/og-image.png");
  console.log("✓ Created public/og-image.png (1200x630 centered with radial glow)");
}

generateAssets().catch(console.error);
