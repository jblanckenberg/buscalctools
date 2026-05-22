import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

// Converts every JPG under public/blog/ to a sibling WebP at quality 82.
// Used as a one-shot step for the Lighthouse "Improve image delivery"
// LCP fix — see commit perf(images): convert 75 blog JPGs to WebP.
//
// The original .jpg files are intentionally NOT deleted so the MDX rewrite
// can be rolled back if the WebP versions render badly anywhere. A
// follow-up commit removes them once production-validated.

const BLOG_DIR = path.join(process.cwd(), "public", "blog");
const QUALITY = 82; // sharp default for WebP — good size/quality balance

async function walkJpgs(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkJpgs(full)));
    else if (e.name.endsWith(".jpg") || e.name.endsWith(".jpeg")) out.push(full);
  }
  return out;
}

async function main() {
  const jpgs = await walkJpgs(BLOG_DIR);
  let totalIn = 0,
    totalOut = 0;
  for (const jpg of jpgs) {
    const webp = jpg.replace(/\.(jpg|jpeg)$/i, ".webp");
    const inStat = await fs.stat(jpg);
    totalIn += inStat.size;
    await sharp(jpg).webp({ quality: QUALITY, effort: 6 }).toFile(webp);
    const outStat = await fs.stat(webp);
    totalOut += outStat.size;
    const pct = ((1 - outStat.size / inStat.size) * 100).toFixed(1);
    console.log(
      `  ${path.relative(BLOG_DIR, jpg)}: ${(inStat.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB (-${pct}%)`,
    );
  }
  console.log(
    `\nTotal: ${(totalIn / 1024).toFixed(0)}KB → ${(totalOut / 1024).toFixed(0)}KB (saved ${((totalIn - totalOut) / 1024).toFixed(0)}KB, ${((1 - totalOut / totalIn) * 100).toFixed(1)}% reduction)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
