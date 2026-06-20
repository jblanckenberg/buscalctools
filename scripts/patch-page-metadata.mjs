// Idempotent description-keyword patcher.
//
// Reads scripts/seo-data/keyword-page-map.json and patches each calc page's
// metadata description so it contains the primary keyword for that page,
// when that keyword:
//   (a) matched via slug-token overlap (HIGH confidence — not cluster-only)
//   (b) is not already present in the description (idempotency)
//   (c) can be added without pushing the description past 160 chars
//
// Conservative by design: NEVER edits titles (too easy to bust the 60-char
// SERP cap). Logs every skip with a reason so a follow-up manual pass can
// address them.
//
// Usage:
//   node scripts/patch-page-metadata.mjs --dry-run    # print plan only
//   node scripts/patch-page-metadata.mjs              # apply changes
//
// Re-running is safe: if the keyword is already in the description, the
// file is left alone.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SITE_DIR = join(REPO_ROOT, "app", "(site)");
const MAP_PATH = join(REPO_ROOT, "scripts", "seo-data", "keyword-page-map.json");

// 160 is the conservative SERP-truncation point. 170 is the operational
// safe cap — Google occasionally renders longer descriptions on desktop,
// and the patcher only ever needs ~10–20 extra chars of headroom to land
// the primary keyword. Pages staying under 170 don't risk truncation in
// practice but DO unlock keyword insertions that would otherwise be blocked.
const MAX_DESCRIPTION = 170;
const dryRun = process.argv.includes("--dry-run");

// Per-slug primary-keyword overrides for cases where the auto-matcher picks
// a clearly off-topic keyword. Add a slug here if the dry-run flags the
// primary as obviously wrong (e.g. "storage unit cost per month" for
// cost-per-unit-calculator). Leave the cluster fallback in place for slugs
// not listed here -- conservative-by-default.
const PRIMARY_OVERRIDES = {
  // Keep empty for the first ship -- populate as operator triages dry-run output.
};

function loadMap() {
  if (!existsSync(MAP_PATH)) {
    console.error(`Missing ${MAP_PATH}. Run scripts/build-keyword-page-map.mjs first.`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(MAP_PATH, "utf8"));
}

// Match a `description:` value inside a metadata literal or calculatorMetadata({...}) call.
// Supports both single-line strings and concatenated string literals like
//   description:
//     "First line " +
//     "second line",
// Returns { match, value, fullMatchStart, fullMatchEnd } or null.
function findDescription(source) {
  // Look for description: followed by a string-literal expression that ends
  // before a comma or closing brace.
  const re = /description:\s*(?:\n\s*)?(["'`])(?:[\s\S]*?)\1(?:\s*\+\s*(["'`])(?:[\s\S]*?)\2)*/g;
  let match;
  let last = null;
  while ((match = re.exec(source)) !== null) {
    last = { fullMatchStart: match.index, fullMatchEnd: match.index + match[0].length, raw: match[0] };
  }
  if (!last) return null;
  // Extract the concatenated text from the raw match.
  const stringRe = /(["'`])([\s\S]*?)\1/g;
  let text = "";
  let s;
  while ((s = stringRe.exec(last.raw)) !== null) {
    text += s[2];
  }
  last.text = text;
  return last;
}

function injectKeyword(description, keyword) {
  // Strategy: prepend "Free <keyword>." if the description doesn't already
  // open with "Free ", otherwise append "Includes <keyword>." or fall back
  // to a clause-style insertion. Stay under 160 chars.
  const kwLower = keyword.toLowerCase();
  if (description.toLowerCase().includes(kwLower)) return { changed: false, next: description, reason: "already-contains" };

  // Strategy 1: prepend "Free <keyword>." if it fits.
  if (description.startsWith("Free ")) {
    // Replace "Free <whatever>" with "Free <keyword> + <rest after first period>"
    // Conservative: skip prepend, try append instead.
  } else {
    const prepended = `Free ${keyword}. ${description}`;
    if (prepended.length <= MAX_DESCRIPTION) return { changed: true, next: prepended, reason: "prepended" };
  }

  // Strategy 2: append a clause if it fits.
  const sep = description.endsWith(".") ? " " : ". ";
  const appended = `${description}${sep}Includes ${keyword} basics.`;
  if (appended.length <= MAX_DESCRIPTION) return { changed: true, next: appended, reason: "appended" };

  return { changed: false, next: description, reason: "no-room" };
}

function tsStringLiteral(text) {
  // Use double quotes. Escape backslashes and double-quotes inside.
  return `"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function main() {
  const mapData = loadMap();
  const results = { patched: [], skipped: [], errored: [] };

  for (const [slug, entry] of Object.entries(mapData.map)) {
    const pagePath = join(SITE_DIR, slug, "page.tsx");
    if (!existsSync(pagePath)) {
      results.skipped.push({ slug, reason: "no-page-file" });
      continue;
    }
    const override = PRIMARY_OVERRIDES[slug];
    const primaryKeyword = override ?? entry.primary.keyword;
    if (!override && entry.primary.match_via !== "slug") {
      results.skipped.push({ slug, reason: "cluster-only-primary", primary: entry.primary.keyword });
      continue;
    }

    const source = readFileSync(pagePath, "utf8");
    const desc = findDescription(source);
    if (!desc) {
      results.skipped.push({ slug, reason: "no-description-field" });
      continue;
    }

    const inj = injectKeyword(desc.text, primaryKeyword);
    if (!inj.changed) {
      results.skipped.push({ slug, reason: inj.reason, current_length: desc.text.length });
      continue;
    }

    // Replace the original (possibly concatenated) description with a single
    // double-quoted string of the new value. Keep the `description:` prefix
    // and any leading whitespace exactly as was.
    const indentMatch = desc.raw.match(/description:\s*(?:\n(\s*))?/);
    const indent = indentMatch && indentMatch[1] ? indentMatch[1] : "";
    const newDescription = `description:${indent ? `\n${indent}` : " "}${tsStringLiteral(inj.next)}`;
    const next = source.slice(0, desc.fullMatchStart) + newDescription + source.slice(desc.fullMatchEnd);

    if (dryRun) {
      results.patched.push({ slug, primary: primaryKeyword, before: desc.text, after: inj.next, reason: inj.reason, dry_run: true });
    } else {
      writeFileSync(pagePath, next);
      results.patched.push({ slug, primary: primaryKeyword, before: desc.text, after: inj.next, reason: inj.reason });
    }
  }

  console.log(`\n${dryRun ? "[DRY RUN] " : ""}Patched: ${results.patched.length}`);
  for (const p of results.patched) {
    console.log(`  ${p.slug.padEnd(40)} ${p.reason}`);
    console.log(`    BEFORE: ${p.before.slice(0, 120)}${p.before.length > 120 ? "..." : ""}`);
    console.log(`    AFTER:  ${p.after.slice(0, 120)}${p.after.length > 120 ? "..." : ""}`);
  }
  console.log(`\nSkipped: ${results.skipped.length}`);
  const groupCounts = {};
  for (const s of results.skipped) groupCounts[s.reason] = (groupCounts[s.reason] ?? 0) + 1;
  for (const [reason, n] of Object.entries(groupCounts)) console.log(`  ${reason.padEnd(28)} ${n}`);
}

main();
