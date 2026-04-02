/**
 * Renders ```math ... ``` blocks in README*.source.md files to PNG under assets/math/eq-{hash}.png
 * and writes the matching .md output.
 * Example: README.source.md becomes README.md; README-practice.source.md becomes README-practice.md
 * Pass --day01 (or MATH_RENDER_DAY01=1) to only process README sources under the Day01 directory tree.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import katex from "katex";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const MATH_DIR = path.join(repoRoot, "assets", "math");
const KATEX_CSS =
  "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";

const MATH_FENCE = /^```math\s*\n([\s\S]*?)\n```/gm;

const BATCH_SIZE = 60;

function hashTex(tex) {
  return crypto.createHash("sha256").update(tex).digest("hex").slice(0, 16);
}

function renderKatexHtml(tex) {
  return katex.renderToString(tex, {
    displayMode: true,
    throwOnError: false,
    trust: true,
    strict: "ignore",
  });
}

function posixRel(fromDir, toFile) {
  return path.relative(fromDir, toFile).split(path.sep).join("/");
}

async function screenshotBatch(texSlice, outPathsSlice, idOffset) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    deviceScaleFactor: 2,
    viewport: { width: 1400, height: 1200 },
  });

  const bodies = texSlice
    .map((tex, i) => {
      let html;
      try {
        html = renderKatexHtml(tex);
      } catch (e) {
        html = "<span style=\"color:#b00\">" + String(e.message) + "</span>";
      }
      const id = idOffset + i;
      return (
        "<div id=\"box-" +
        id +
        "\" style=\"display:inline-block;margin:0;padding:8px;background:#fff;\">" +
        html +
        "</div>"
      );
    })
    .join("\n");

  const html =
    "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"" +
    KATEX_CSS +
    "\"></head><body style=\"margin:0;background:white;\">" +
    bodies +
    "</body></html>";

  await page.setContent(html, { waitUntil: "networkidle" });

  for (let i = 0; i < texSlice.length; i++) {
    const id = idOffset + i;
    const el = page.locator("#box-" + id);
    await el.waitFor({ state: "visible" });
    const box = await el.boundingBox();
    if (!box) {
      throw new Error("No bounding box for equation index " + id);
    }
    const pad = 6;
    await page.screenshot({
      path: outPathsSlice[i],
      clip: {
        x: Math.max(0, box.x - pad),
        y: Math.max(0, box.y - pad),
        width: box.width + 2 * pad,
        height: box.height + 2 * pad,
      },
    });
  }

  await browser.close();
}

async function renderAllPngs(texHashesInOrder, uniqueTexByHash) {
  fs.mkdirSync(MATH_DIR, { recursive: true });
  const texList = texHashesInOrder.map((h) => uniqueTexByHash.get(h));
  const outPaths = texHashesInOrder.map((h) =>
    path.join(MATH_DIR, "eq-" + h + ".png")
  );

  console.log(
    "Rendering " + texList.length + " unique equation(s) to assets/math/…"
  );

  for (let start = 0; start < texList.length; start += BATCH_SIZE) {
    const end = Math.min(start + BATCH_SIZE, texList.length);
    const slice = texList.slice(start, end);
    const pathsSlice = outPaths.slice(start, end);
    await screenshotBatch(slice, pathsSlice, start);
  }
}

function processOneSource(sourceAbs) {
  const md = fs.readFileSync(sourceAbs, "utf8");
  const re = new RegExp(MATH_FENCE.source, MATH_FENCE.flags);
  const matches = [...md.matchAll(re)];

  const outAbs = sourceAbs.replace(/\.source\.md$/i, ".md");
  if (outAbs === sourceAbs) {
    console.warn("Skip (not *.source.md):", sourceAbs);
    return;
  }

  if (matches.length === 0) {
    const banner =
      "<!-- Generated from " +
      posixRel(repoRoot, sourceAbs) +
      " by tools/render-math.mjs — do not edit by hand. -->\n\n";
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, banner + md, "utf8");
    console.log("No math blocks; copied:", posixRel(repoRoot, outAbs));
    return;
  }

  let result = "";
  let lastIndex = 0;
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(md)) !== null) {
    result += md.slice(lastIndex, m.index);
    const tex = m[1].trim();
    const h = hashTex(tex);
    const pngAbs = path.join(MATH_DIR, "eq-" + h + ".png");
    const rel = posixRel(path.dirname(outAbs), pngAbs);
    result += "![display math](" + rel + ")\n";
    lastIndex = m.index + m[0].length;
  }
  result += md.slice(lastIndex);

  const banner =
    "<!-- Generated from " +
    posixRel(repoRoot, sourceAbs) +
    " by tools/render-math.mjs — do not edit by hand. -->\n\n";
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, banner + result, "utf8");
  console.log("Wrote:", posixRel(repoRoot, outAbs));
}

function sourceGlobPattern() {
  const day01Only =
    process.argv.includes("--day01") || process.env.MATH_RENDER_DAY01 === "1";
  return day01Only
    ? "Day01/**/*README*.source.md"
    : "**/*README*.source.md";
}

async function main() {
  const pattern = sourceGlobPattern();
  const sources = globSync(pattern, {
    cwd: repoRoot,
    ignore: ["**/node_modules/**"],
    nodir: true,
    posix: false,
  }).sort();

  if (sources.length === 0) {
    console.log("No files matched:", pattern);
    process.exit(0);
  }

  console.log("Source files:", sources.length);

  /** @type {Map<string, string>} */
  const uniqueTexByHash = new Map();

  for (const rel of sources) {
    const abs = path.join(repoRoot, rel);
    const md = fs.readFileSync(abs, "utf8");
    const re = new RegExp(MATH_FENCE.source, MATH_FENCE.flags);
    let m;
    while ((m = re.exec(md)) !== null) {
      const tex = m[1].trim();
      const h = hashTex(tex);
      if (!uniqueTexByHash.has(h)) uniqueTexByHash.set(h, tex);
    }
  }

  const texHashesInOrder = [...uniqueTexByHash.keys()];

  if (texHashesInOrder.length > 0) {
    await renderAllPngs(texHashesInOrder, uniqueTexByHash);
  }

  for (const rel of sources) {
    processOneSource(path.join(repoRoot, rel));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
