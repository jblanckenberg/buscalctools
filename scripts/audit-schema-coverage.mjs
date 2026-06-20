// Scan every app/(site)/<slug>/page.tsx for JSON-LD schema coverage.
// Reports which calc pages emit BreadcrumbList, FAQPage, WebApplication,
// HowTo, and Article schema. Identifies coverage gaps so the next content
// pass can target them.
//
// Output: scripts/seo-data/schema-coverage.json + console table
// Usage:  node scripts/audit-schema-coverage.mjs

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SITE_DIR = join(REPO_ROOT, "app", "(site)");
const OUT_PATH = join(REPO_ROOT, "scripts", "seo-data", "schema-coverage.json");

const SKIP_DIRS = new Set(["api", "embed", "search"]);

// Signal -> regex pattern. Source-level detection (not rendered) — we look
// for the helper calls + component names that emit each schema type.
// Each signal regex must cover both direct schema emission AND indirect
// emission via shared helpers/components. `calcBreadcrumb(SLUG)` passed
// to <CalculatorShell breadcrumbs={...}> renders <Breadcrumbs> internally
// which emits BreadcrumbList JSON-LD, so the helper call IS evidence of
// the schema being present.
const SCHEMA_SIGNALS = {
  breadcrumb: /\b(Breadcrumbs|buildBreadcrumbList|BreadcrumbList|calcBreadcrumb|breadcrumbs\s*=)\b/,
  faq: /\b(FaqList|buildFaqJsonLd|FAQPage)\b/,
  webapp: /\b(WebAppSchema|WebApplication|SoftwareApplication)\b/,
  howto: /\bHowToSchema\b/,
  article: /\b(ArticleSchema|"@type":\s*"Article"|"@type":\s*"BlogPosting")\b/,
  collection: /\b("@type":\s*"CollectionPage"|CollectionPage)\b/,
  organization: /\bauthorPersonLdStandalone|"@type":\s*"Organization"\b/,
};

function walk(dir, depth = 0) {
  if (depth > 6) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walk(full, depth + 1));
    } else if (e.name === "page.tsx") {
      out.push(full);
    }
  }
  return out;
}

function relSlug(pagePath) {
  // Convert C:/.../app/(site)/<slug>/.../page.tsx -> <slug>/<rest>
  return pagePath
    .replace(SITE_DIR, "")
    .replace(/^[\\/]/, "")
    .replace(/[\\/]page\.tsx$/, "")
    .replace(/\\/g, "/");
}

function isCalculatorPage(slug) {
  return slug.endsWith("-calculator") || slug.endsWith("calc");
}

function classifyPage(slug) {
  if (slug === "") return "home";
  if (slug.startsWith("blog")) return "blog";
  if (slug.startsWith("compare")) return "compare";
  if (slug.startsWith("authors")) return "author";
  if (slug.startsWith("topics")) return "topic";
  if (isCalculatorPage(slug)) return "calculator";
  return "static";
}

function main() {
  const files = walk(SITE_DIR);
  const pages = [];
  for (const file of files) {
    const slug = relSlug(file);
    if ([...SKIP_DIRS].some((s) => slug.startsWith(s))) continue;
    const source = readFileSync(file, "utf8");
    const signals = {};
    for (const [name, pattern] of Object.entries(SCHEMA_SIGNALS)) {
      signals[name] = pattern.test(source);
    }
    pages.push({
      slug,
      kind: classifyPage(slug),
      signals,
      lines: source.split("\n").length,
    });
  }

  pages.sort((a, b) => a.slug.localeCompare(b.slug));

  // Coverage summary by kind
  const byKind = {};
  for (const p of pages) {
    if (!byKind[p.kind]) byKind[p.kind] = { count: 0, coverage: {} };
    byKind[p.kind].count++;
    for (const [sig, present] of Object.entries(p.signals)) {
      if (!byKind[p.kind].coverage[sig]) byKind[p.kind].coverage[sig] = 0;
      if (present) byKind[p.kind].coverage[sig]++;
    }
  }

  // Calculator-page gaps: pages missing breadcrumb, faq, webapp, OR howto
  const calcGaps = pages
    .filter((p) => p.kind === "calculator")
    .map((p) => ({
      slug: p.slug,
      missing: Object.entries(p.signals)
        .filter(([k, v]) => !v && ["breadcrumb", "faq", "webapp", "howto"].includes(k))
        .map(([k]) => k),
    }))
    .filter((g) => g.missing.length > 0);

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(
    OUT_PATH,
    JSON.stringify({ generated: new Date().toISOString(), pages_audited: pages.length, by_kind: byKind, calc_gaps: calcGaps, pages }, null, 2),
  );

  console.log(`Wrote ${OUT_PATH}`);
  console.log(`\nCoverage summary by page kind:\n`);
  for (const [kind, data] of Object.entries(byKind)) {
    console.log(`  ${kind.padEnd(12)} (${data.count} pages)`);
    for (const [sig, hits] of Object.entries(data.coverage)) {
      const pct = data.count > 0 ? Math.round((hits / data.count) * 100) : 0;
      console.log(`    ${sig.padEnd(14)} ${hits}/${data.count}  (${pct}%)`);
    }
  }
  console.log(`\nCalculator pages with schema gaps (${calcGaps.length}):`);
  for (const g of calcGaps.slice(0, 30)) {
    console.log(`  ${g.slug.padEnd(40)} missing: ${g.missing.join(", ")}`);
  }
  if (calcGaps.length > 30) console.log(`  ... and ${calcGaps.length - 30} more`);
}

main();
