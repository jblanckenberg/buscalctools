import { readFileSync } from "node:fs";

function visibleText(src) {
  return src
    .replace(/^import .+;$/gm, "")
    .replace(/^export .+/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/\s+\w[\w-]*=\{[^}]*\}/g, " ")
    .replace(/\s+\w[\w-]*="[^"]*"/g, " ")
    .replace(/<\/?[A-Za-z][\w.]*/g, " ")
    .replace(/[<>{}]/g, " ")
    .replace(/&\w+;/g, " ")
    .replace(/&#\d+;/g, " ");
}

function wordCount(s) {
  return (s.match(/[A-Za-z][A-Za-z'\-]*/g) || []).length;
}

const slugs = [
  "profit-margin-calculator",
  "markup-calculator",
  "break-even-calculator",
  "roi-calculator",
  "pricing-calculator",
  "invoice-calculator",
  "freelance-rate-calculator",
  "cash-flow-calculator",
  "net-profit-calculator",
  "ecommerce-profit-calculator",
  "cost-per-unit-calculator",
  "business-loan-calculator",
  "payback-period-calculator",
  "burn-rate-calculator",
  "business-valuation-calculator",
  "revenue-growth-calculator",
  "employee-cost-calculator",
  "discount-calculator",
];

const metaSrc = readFileSync("lib/calc-meta.ts", "utf8");

function blockForSlug(slug, key) {
  const idx = metaSrc.indexOf(`"${slug}":`);
  if (idx === -1) return null;
  const after = metaSrc.slice(idx);
  const keyStart = after.indexOf(`${key}:`);
  if (keyStart === -1) return null;
  // Find opening [
  let i = keyStart;
  while (i < after.length && after[i] !== "[") i++;
  if (i >= after.length) return null;
  let depth = 0, end = -1;
  for (; i < after.length; i++) {
    const c = after[i];
    if (c === "[") depth++;
    else if (c === "]") { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) return null;
  return after.slice(keyStart, end + 1);
}

function stringWordsIn(block) {
  if (!block) return 0;
  const strings = block.match(/"((?:\\.|[^"\\])*)"/g) || [];
  return strings.reduce((sum, s) => sum + wordCount(s.slice(1, -1)), 0);
}

function scalarWordsForSlug(slug, key) {
  const idx = metaSrc.indexOf(`"${slug}":`);
  if (idx === -1) return 0;
  const after = metaSrc.slice(idx, idx + 8000);
  const re = new RegExp(`${key}:\\s*"((?:\\\\.|[^"\\\\])*)"`);
  const m = after.match(re);
  if (!m) return 0;
  return wordCount(m[1]);
}

const rows = [];
for (const slug of slugs) {
  const pagePath = `app/(site)/${slug}/page.tsx`;
  let pageWords = 0;
  try {
    const src = readFileSync(pagePath, "utf8");
    pageWords = wordCount(visibleText(src));
  } catch (e) {
    pageWords = -1;
  }
  const faqW = stringWordsIn(blockForSlug(slug, "faqs"));
  const howToW = stringWordsIn(blockForSlug(slug, "howToSteps"));
  const methW = scalarWordsForSlug(slug, "methodologyNote");
  const featW = scalarWordsForSlug(slug, "featuredAnswer");
  const total = pageWords + faqW + howToW + methW + featW;
  rows.push({ slug, pageWords, faqW, howToW, methW, featW, total });
}

rows.sort((a, b) => a.total - b.total);
console.log("slug                               | page | faqs | howto | meth | feat | TOTAL");
console.log("-".repeat(80));
for (const r of rows) {
  const flag = r.total < 1200 ? " <UNDER>" : "";
  console.log(`${r.slug.padEnd(34)} | ${String(r.pageWords).padStart(4)} | ${String(r.faqW).padStart(4)} | ${String(r.howToW).padStart(5)} | ${String(r.methW).padStart(4)} | ${String(r.featW).padStart(4)} | ${String(r.total).padStart(5)}${flag}`);
}
