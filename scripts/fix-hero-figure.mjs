// Fixes: hero <Figure> was missing on CRLF-terminated MDX files because the
// previous script's `</Lead>\n` pattern didn't match `</Lead>\r\n`. This
// script inserts a hero Figure after </Lead> only when one isn't already
// present for that slug.

import fs from "node:fs/promises";
import path from "node:path";

const credits = JSON.parse(
  await fs.readFile("public/blog/credits.json", "utf8"),
);

const blogDir = path.resolve("content/blog");
let fixed = 0,
  ok = 0,
  missing = 0;

for (const [slug, per] of Object.entries(credits)) {
  if (!per.hero) {
    missing++;
    continue;
  }
  const file = path.join(blogDir, `${slug}.mdx`);
  let mdx;
  try {
    mdx = await fs.readFile(file, "utf8");
  } catch {
    missing++;
    continue;
  }
  // Already has a hero <Figure src="/blog/<slug>/hero.jpg" ?
  if (mdx.includes(`src="/blog/${slug}/hero.jpg"`)) {
    ok++;
    continue;
  }
  if (!mdx.match(/<\/Lead>\r?\n/)) {
    console.error(`  ! ${slug}: no </Lead> tag — manual fix needed`);
    continue;
  }
  const altSafe = per.hero.alt.replace(/"/g, "'");
  const heroBlock =
    "\n<Figure\n" +
    `  src="/blog/${slug}/hero.jpg"\n` +
    `  alt="${altSafe}"\n` +
    "  priority\n" +
    `  credit={{ name: ${JSON.stringify(per.hero.name)}, url: ${JSON.stringify(per.hero.url)} }}\n` +
    "/>\n";
  const updated = mdx.replace(/<\/Lead>(\r?\n)/, `</Lead>$1${heroBlock}`);
  await fs.writeFile(file, updated);
  console.log(`  fix  ${slug}`);
  fixed++;
}

console.log(`\n${fixed} fixed, ${ok} already ok, ${missing} missing files`);
