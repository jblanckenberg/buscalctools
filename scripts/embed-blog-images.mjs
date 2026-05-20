// Reads public/blog/credits.json (produced by fetch-blog-images.mjs) and
// inserts three <Figure> tags into each MDX article:
//   hero    — immediately after </Lead>
//   mid     — before the heading at floor(n / 2)
//   bottom  — before the heading at floor(n * 0.75), skipping back if it's
//             a clearly-final section ("Bottom line", "Run yours", "Recap"...)
//
// Idempotent: if the MDX already contains a <Figure src="/blog/<slug>/" tag
// for the slug, the file is skipped. Run once after fetch-blog-images.mjs.

import fs from "node:fs/promises";
import path from "node:path";

const FINAL_HEADING_HINTS = [
  "bottom line",
  "run yours",
  "recap",
  "summary",
  "conclusion",
  "next steps",
];

function figure({ slug, position, alt, name, url, priority = false }) {
  const altSafe = alt.replace(/"/g, "'");
  return [
    "",
    "<Figure",
    `  src="/blog/${slug}/${position}.jpg"`,
    `  alt="${altSafe}"`,
    ...(priority ? ["  priority"] : []),
    `  credit={{ name: ${JSON.stringify(name)}, url: ${JSON.stringify(url)} }}`,
    "/>",
    "",
  ].join("\n");
}

function insertFigures(mdx, slug, perSlug) {
  // Bail if already has a <Figure src="/blog/<slug>/ marker.
  if (mdx.includes(`<Figure\n  src="/blog/${slug}/`)) return null;

  // 1. Hero — after </Lead>
  const heroBlock = figure({
    slug,
    position: "hero",
    alt: perSlug.hero.alt,
    name: perSlug.hero.name,
    url: perSlug.hero.url,
    priority: true,
  });
  if (!mdx.includes("</Lead>")) {
    throw new Error(`${slug}: no </Lead> close tag`);
  }
  mdx = mdx.replace("</Lead>\n", `</Lead>\n${heroBlock}`);

  // 2. Find all "## " headings AFTER the hero insertion
  const lines = mdx.split("\n");
  const headingIdxs = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^## /.test(lines[i])) headingIdxs.push(i);
  }
  if (headingIdxs.length < 3) {
    throw new Error(`${slug}: only ${headingIdxs.length} H2 headings`);
  }

  // 3. Pick mid and bottom heading indexes; back off bottom if it lands on
  //    a clearly-final section.
  const n = headingIdxs.length;
  const midIdx = Math.max(1, Math.floor(n / 2));
  let bottomIdx = Math.max(midIdx + 1, Math.floor(n * 0.75));
  while (
    bottomIdx < n &&
    FINAL_HEADING_HINTS.some((h) =>
      lines[headingIdxs[bottomIdx]].toLowerCase().includes(h),
    )
  ) {
    bottomIdx--;
    if (bottomIdx <= midIdx) {
      bottomIdx = midIdx + 1; // give up, will be after mid
      break;
    }
  }

  // 4. Build inserts; insert by line index, descending, so earlier indexes
  //    stay valid.
  const inserts = [
    {
      line: headingIdxs[bottomIdx],
      block: figure({
        slug,
        position: "bottom",
        alt: perSlug.bottom.alt,
        name: perSlug.bottom.name,
        url: perSlug.bottom.url,
      }),
    },
    {
      line: headingIdxs[midIdx],
      block: figure({
        slug,
        position: "mid",
        alt: perSlug.mid.alt,
        name: perSlug.mid.name,
        url: perSlug.mid.url,
      }),
    },
  ];
  inserts.sort((a, b) => b.line - a.line);
  for (const ins of inserts) {
    lines.splice(ins.line, 0, ins.block);
  }
  return lines.join("\n");
}

async function main() {
  const credits = JSON.parse(
    await fs.readFile("public/blog/credits.json", "utf8"),
  );
  const blogDir = path.resolve("content/blog");
  let edited = 0,
    skipped = 0;
  for (const [slug, per] of Object.entries(credits)) {
    if (!per.hero || !per.mid || !per.bottom) {
      console.warn(`  ! ${slug}: incomplete credits, skipping`);
      continue;
    }
    const file = path.join(blogDir, `${slug}.mdx`);
    let mdx;
    try {
      mdx = await fs.readFile(file, "utf8");
    } catch (e) {
      console.warn(`  ! ${slug}: no MDX file (${e.code})`);
      continue;
    }
    try {
      const updated = insertFigures(mdx, slug, per);
      if (updated === null) {
        console.log(`  skip ${slug} (already has Figures)`);
        skipped++;
        continue;
      }
      await fs.writeFile(file, updated);
      console.log(`  ok   ${slug}`);
      edited++;
    } catch (e) {
      console.error(`  !!   ${slug}: ${e.message}`);
    }
  }
  console.log(`\n${edited} edited, ${skipped} skipped`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
