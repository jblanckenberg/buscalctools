// Join buscalctools_keywords.csv against the live calc-page slugs to build a
// per-page keyword targeting map. For each existing /app/(site)/<slug>/ that
// matches a CSV row, pick the highest-leverage keyword (volume/difficulty) as
// `primary` and the next N as `secondary`.
//
// Output: scripts/seo-data/keyword-page-map.json
// Usage:  node scripts/build-keyword-page-map.mjs
//
// The CSV lives outside the bizapp tree (operator data dir) -- the path is
// hard-coded below. Override with KEYWORDS_CSV env var if needed.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SITE_DIR = join(REPO_ROOT, "app", "(site)");
const KEYWORDS_CSV = process.env.KEYWORDS_CSV ?? "C:/BizProfitCalc/keywords/buscalctools_keywords.csv";
const OUT_PATH = join(REPO_ROOT, "scripts", "seo-data", "keyword-page-map.json");

const SECONDARY_LIMIT = 5;
const MIN_SLUG_SIMILARITY = 0.5;
// Non-content directories to skip when listing slugs.
const SKIP_DIRS = new Set(["api", "authors", "blog", "compare", "topics", "embed", "search", "[calculator]"]);

// Manual slug -> cluster overrides for calcs whose slug uses abbreviations
// the keyword corpus spells out (cac, ltv, roe, roa, irr, npv, cagr, dso, mrr, arr).
// Without this, token-overlap matching misses every cluster keyword because
// the abbreviation never appears in the keyword string.
const SLUG_TO_CLUSTER = {
  "cac-ltv-calculator": "cac_ltv_marketing",
  "churn-rate-calculator": "cac_ltv_marketing",
  "mrr-calculator": "cac_ltv_marketing",
  "arr-calculator": "cac_ltv_marketing",
  "subscription-pricing-calculator": "cac_ltv_marketing",
  "quick-ratio-calculator": "cash_flow_working_capital",
  "current-ratio-calculator": "cash_flow_working_capital",
  "dso-calculator": "cash_flow_working_capital",
  "working-capital-calculator": "cash_flow_working_capital",
  "cash-flow-calculator": "cash_flow_working_capital",
  "inventory-turnover-calculator": "cash_flow_working_capital",
  "burn-rate-calculator": "cash_flow_working_capital",
  "debt-to-equity-calculator": "business_loans",
  "business-loan-calculator": "business_loans",
  "roe-calculator": "roi_npv_irr",
  "roa-calculator": "roi_npv_irr",
  "npv-calculator": "roi_npv_irr",
  "irr-calculator": "roi_npv_irr",
  "cagr-calculator": "roi_npv_irr",
  "roi-calculator": "roi_npv_irr",
  "payback-period-calculator": "roi_npv_irr",
  "business-valuation-calculator": "roi_npv_irr",
  "revenue-growth-calculator": "roi_npv_irr",
  "estimated-tax-calculator": "tax",
  "payroll-tax-calculator": "tax",
  "self-employment-tax-calculator": "tax",
  "section-179-calculator": "tax",
  "s-corp-election-calculator": "tax",
  "r-and-d-tax-credit-calculator": "tax",
  "employee-cost-calculator": "tax",
  "freelance-rate-calculator": "pricing",
  "hourly-to-salary-calculator": "pricing",
  "invoice-calculator": "pricing",
  "price-elasticity-calculator": "pricing",
};

function parseCsv(text) {
  // Strip UTF-8 BOM if present.
  const cleaned = text.replace(/^﻿/, "");
  const lines = cleaned.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    if (cells.length === 0) continue;
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = cells[j] ?? "";
    }
    rows.push(row);
  }
  return rows;
}

// Minimal CSV row splitter that handles quoted fields with embedded commas.
function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (ch === "," && !inQuote) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

// Tokens that appear in nearly every slug or keyword and add noise to the
// similarity computation. "calculator" is the most egregious -- it's in
// every slug (40+ pages) and many keywords, so a slug + keyword that share
// ONLY "calculator" should not count as similar.
const STOP_TOKENS = new Set([
  "calculator", "calc",
  "of", "for", "the", "a", "an", "and", "or", "to", "is", "what",
  // "rate" is too generic — it appears in churn-rate, freelance-rate,
  // burn-rate, growth-rate keywords across unrelated clusters and causes
  // false-positive slug matches.
  "rate",
]);

function slugSimilarity(slug, keyword) {
  const slugTokens = new Set(slug.split("-").filter((t) => t && !STOP_TOKENS.has(t)));
  const kwTokens = new Set(
    keyword
      .toLowerCase()
      .split(/[\s-]+/)
      .filter((t) => t && !STOP_TOKENS.has(t)),
  );
  if (slugTokens.size === 0 || kwTokens.size === 0) return 0;
  let overlap = 0;
  for (const t of slugTokens) if (kwTokens.has(t)) overlap++;
  return overlap / Math.max(slugTokens.size, kwTokens.size);
}

function listCalcSlugs() {
  return readdirSync(SITE_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !SKIP_DIRS.has(e.name) && !e.name.startsWith("(") && !e.name.startsWith("[") && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort();
}

function main() {
  if (!existsSync(KEYWORDS_CSV)) {
    console.error(`Keywords CSV not found at ${KEYWORDS_CSV}`);
    console.error(`Override with KEYWORDS_CSV env var.`);
    process.exit(1);
  }
  const rows = parseCsv(readFileSync(KEYWORDS_CSV, "utf8"));
  const slugs = listCalcSlugs();

  const map = {};
  const unmapped = [];

  for (const slug of slugs) {
    const fallbackCluster = SLUG_TO_CLUSTER[slug];
    const slugMatches = [];
    const clusterMatches = [];
    for (const r of rows) {
      const sim = slugSimilarity(slug, r.keyword ?? "");
      const isSlugMatch = sim >= MIN_SLUG_SIMILARITY;
      const isClusterMatch = !isSlugMatch && fallbackCluster && r.cluster === fallbackCluster;
      if (!isSlugMatch && !isClusterMatch) continue;
      const vol = Number(r.search_volume) || 0;
      const kd = Math.max(Number(r.difficulty) || 1, 1);
      const entry = {
        keyword: r.keyword,
        volume: vol,
        difficulty: kd,
        intent: r.intent,
        cluster: r.cluster,
        priority_tier: r.priority_tier,
        score: vol / kd,
        similarity: Math.round(sim * 100) / 100,
        match_via: isSlugMatch ? "slug" : "cluster",
      };
      if (isSlugMatch) slugMatches.push(entry);
      else clusterMatches.push(entry);
    }
    // Slug matches ALWAYS beat cluster matches for the primary slot — the
    // page's slug is the strongest signal of topical intent. Cluster matches
    // only fill remaining secondary slots and serve as the primary fallback
    // when no slug match exists.
    slugMatches.sort((a, b) => b.score - a.score);
    clusterMatches.sort((a, b) => b.score - a.score);
    const ordered = [...slugMatches, ...clusterMatches];
    if (ordered.length === 0) {
      unmapped.push(slug);
      continue;
    }
    map[slug] = {
      primary: {
        keyword: ordered[0].keyword,
        volume: ordered[0].volume,
        difficulty: ordered[0].difficulty,
        intent: ordered[0].intent,
        cluster: ordered[0].cluster,
        priority_tier: ordered[0].priority_tier,
        match_via: ordered[0].match_via,
      },
      secondary: ordered.slice(1, 1 + SECONDARY_LIMIT).map((s) => ({
        keyword: s.keyword,
        volume: s.volume,
        difficulty: s.difficulty,
        match_via: s.match_via,
      })),
    };
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify({ generated: new Date().toISOString(), source: KEYWORDS_CSV, pages_mapped: Object.keys(map).length, pages_unmapped: unmapped.length, map, unmapped }, null, 2));

  console.log(`Wrote ${OUT_PATH}`);
  console.log(`  ${Object.keys(map).length} pages mapped`);
  console.log(`  ${unmapped.length} pages unmapped (no keyword overlap):`);
  for (const s of unmapped.slice(0, 20)) console.log(`    - ${s}`);
  if (unmapped.length > 20) console.log(`    ... and ${unmapped.length - 20} more`);
}

main();
