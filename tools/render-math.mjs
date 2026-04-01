/**
 * Renders ```math ... ``` blocks in Day01/README-practice.source.md to PNG images
 * and writes Day01/README-practice.md with ![...](...) embeds (reliable on GitHub blob view).
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import katex from "katex";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const SOURCE = path.join(repoRoot, "Day01", "README-practice.source.md");
const OUT_MD = path.join(repoRoot, "Day01", "README-practice.md");
const OUT_IMG_DIR = path.join(repoRoot, "assets", "math", "day01", "readme-practice");
const REL_IMG_PREFIX = "../assets/math/day01/readme-practice";

const KATEX_CSS =
  "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";

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

async function screenshotEquations(texList, outPaths) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    deviceScaleFactor: 2,
    viewport: { width: 1400, height: 1200 },
  });

  const bodies = texList
    .map((tex, i) => {
      let html;
      try {
        html = renderKatexHtml(tex);
      } catch (e) {
        html = "<span style=\"color:#b00\">" + String(e.message) + "</span>";
      }
      return "<div id=\"box-" + i + "\" style=\"display:inline-block;margin:0;padding:8px;background:#fff;\">" + html + "</div>";
    })
    .join("\n");

  const html = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"" + KATEX_CSS + "\"></head><body style=\"margin:0;background:white;\">" + bodies + "</body></html>";

  await page.setContent(html, { waitUntil: "networkidle" });

  for (let i = 0; i < texList.length; i++) {
    const el = page.locator("#box-" + i);
    await el.waitFor({ state: "visible" });
    const box = await el.boundingBox();
    if (!box) {
      throw new Error("No bounding box for equation " + i);
    }
    const pad = 6;
    await page.screenshot({
      path: outPaths[i],
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

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing:", SOURCE);
    process.exit(1);
  }

  const md = fs.readFileSync(SOURCE, "utf8");
  const re = /^```math\s*\n([\s\S]*?)\n```/gm;
  const matches = [...md.matchAll(re)];

  if (matches.length === 0) {
    console.log("No math blocks found; copying source to output.");
    fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
    fs.writeFileSync(OUT_MD, md, "utf8");
    return;
  }

  fs.mkdirSync(OUT_IMG_DIR, { recursive: true });

  const unique = new Map();
  for (const m of matches) {
    const tex = m[1].trim();
    const h = hashTex(tex);
    if (!unique.has(h)) unique.set(h, tex);
  }

  const texHashes = [...unique.keys()];
  const texList = texHashes.map((h) => unique.get(h));
  const outPaths = texHashes.map((h) =>
    path.join(OUT_IMG_DIR, "eq-" + h + ".png")
  );

  console.log("Rendering " + texList.length + " unique equation(s) to PNG…");
  await screenshotEquations(texList, outPaths);

  let result = "";
  let lastIndex = 0;
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(md)) !== null) {
    result += md.slice(lastIndex, m.index);
    const tex = m[1].trim();
    const h = hashTex(tex);
    const rel = REL_IMG_PREFIX + "/eq-" + h + ".png";
    result += "![display math](" + rel + ")\n";
    lastIndex = m.index + m[0].length;
  }
  result += md.slice(lastIndex);

  const banner = "<!-- Generated from README-practice.source.md by tools/render-math.mjs — do not edit by hand. -->\n\n";
  fs.writeFileSync(OUT_MD, banner + result, "utf8");
  console.log("Wrote:", OUT_MD);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});