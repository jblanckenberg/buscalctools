// bizapp/scripts/audit-rich-results-urls.mjs
import fs from "node:fs";

const SITE = "https://buscalctools.com";
const TEST = "https://search.google.com/test/rich-results?url=";

const toolsSource = fs.readFileSync(new URL("../lib/tools.ts", import.meta.url), "utf8");
const slugs = [...toolsSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

console.log("# Rich Results Test URLs — one per calculator");
console.log("# Open each, confirm: SoftwareApplication + HowTo + FAQPage + BreadcrumbList detected.");
console.log("# Manual operator task — paste each URL into a browser.\n");
for (const slug of slugs) {
  console.log(`${TEST}${encodeURIComponent(`${SITE}/${slug}`)}`);
}
