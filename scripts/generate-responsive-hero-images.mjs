import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

// Generates responsive AVIF + WebP variants of every hero.jpg in the blog
// image tree. Output naming: hero-<width>.<ext> (e.g. hero-480.avif).
// Used by the <Figure priority> render path to emit a <picture> with
// type-prioritised + srcset-resolved sources, which is the only image
// optimisation a static-export Next.js site can do (next/image is disabled
// because output:"export" requires images.unoptimized:true).
//
// mid/bottom images are skipped — they're below the fold and lazy-loaded,
// so the byte savings don't move LCP. If we ever want to extend, add
// "mid.jpg" / "bottom.jpg" to SOURCE_NAMES.

const BLOG_DIR = path.join(process.cwd(), "public", "blog");
const SOURCE_NAMES = new Set(["hero.jpg", "hero.jpeg"]);
const WIDTHS = [480, 768, 1200];
const AVIF_QUALITY = 50; // AVIF quality scale is steeper than JPEG/WebP — 50 = visually equivalent to WebP 82
const WEBP_QUALITY = 80;

async function findHeroes(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await findHeroes(full)));
    } else if (SOURCE_NAMES.has(e.name.toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function generateVariant(srcPath, width, format) {
  const dir = path.dirname(srcPath);
  const outPath = path.join(dir, `hero-${width}.${format}`);
  const pipeline = sharp(srcPath).resize({ width, withoutEnlargement: true });
  if (format === "avif") {
    await pipeline.avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(outPath);
  } else if (format === "webp") {
    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outPath);
  }
  const stat = await fs.stat(outPath);
  return { path: outPath, bytes: stat.size };
}

async function main() {
  const heroes = await findHeroes(BLOG_DIR);
  let totalBytes = 0;
  for (const hero of heroes) {
    const slug = path.basename(path.dirname(hero));
    console.log(`\n${slug}:`);
    for (const width of WIDTHS) {
      const avif = await generateVariant(hero, width, "avif");
      const webp = await generateVariant(hero, width, "webp");
      totalBytes += avif.bytes + webp.bytes;
      console.log(
        `  ${width}w: ${(avif.bytes / 1024).toFixed(0)}KB avif / ${(webp.bytes / 1024).toFixed(0)}KB webp`,
      );
    }
  }
  console.log(
    `\nGenerated ${heroes.length * WIDTHS.length * 2} variants (${heroes.length} heroes × ${WIDTHS.length} widths × 2 formats)`,
  );
  console.log(`Total bytes: ${(totalBytes / 1024).toFixed(0)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
