import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// Regression test: every Next.js <Script> tag in the codebase must declare
// strategy="afterInteractive" or "lazyOnload" or "worker". A bare <Script>
// (no strategy) defaults to "afterInteractive" in practice but the audit
// trace flagged render-blocking concerns; making the strategy explicit
// prevents a future contributor from accidentally introducing a sync script.
//
// Closes 2026-05-23 SEO audit finding "render-blocking scripts present on
// every audited page." The actual culprit traced to Cloudflare's
// edge-injected cdn-cgi/challenge-platform (out of our control — documented
// in MEMORY 2026-05-21). Everything in OUR codebase is already deferred:
//   - Cookiebot: strategy="lazyOnload" (site layout)
//   - Plausible: strategy="afterInteractive" + defer (PlausibleScript)
//   - AdSense / Clarity / GA4 / gtag: strategy="afterInteractive" (ConsentGate)
//   - Recharts: dynamic(() => import("./<Chart>")) with ssr:false
//
// This test scans the source tree and fails the build if anyone adds a
// <Script> tag without an explicit strategy prop.

const ROOT = join(__dirname, "..", "..");
const ALLOWED_STRATEGIES = ["afterInteractive", "lazyOnload", "worker"];

function* walkSourceFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".") || entry === "node_modules" || entry === "out" || entry === ".next") {
      continue;
    }
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walkSourceFiles(full);
    } else if (entry.endsWith(".tsx") || entry.endsWith(".ts")) {
      yield full;
    }
  }
}

interface ScriptTagOccurrence {
  file: string;
  match: string;
}

function findScriptTagsWithoutStrategy(): ScriptTagOccurrence[] {
  const offenders: ScriptTagOccurrence[] = [];
  for (const file of walkSourceFiles(join(ROOT, "app"))) collect(file, offenders);
  for (const file of walkSourceFiles(join(ROOT, "components"))) collect(file, offenders);
  return offenders;
}

function collect(file: string, offenders: ScriptTagOccurrence[]) {
  // Skip the test file itself.
  if (file.endsWith("no-blocking-scripts.test.ts")) return;
  const source = readFileSync(file, "utf8");
  // Match <Script ...> blocks (multi-line). We only care about Next.js'
  // capital-S Script component — raw <script> tags are HTML primitives and
  // out of scope.
  // Use [\s\S] instead of the `s` flag (ES2018+) so we stay compatible with
  // the project's tsconfig target. Matches <Script ...> across newlines.
  const tagRegex = /<Script\b[\s\S]*?\/?>/g;
  for (const m of source.matchAll(tagRegex)) {
    const tag = m[0];
    if (!ALLOWED_STRATEGIES.some((s) => tag.includes(`strategy="${s}"`))) {
      offenders.push({ file: relative(ROOT, file), match: tag.slice(0, 200) });
    }
  }
}

describe("Next.js <Script> tags declare strategy=afterInteractive|lazyOnload|worker", () => {
  it("no bare <Script> tag without an explicit deferred strategy", () => {
    const offenders = findScriptTagsWithoutStrategy();
    expect(
      offenders,
      `Found ${offenders.length} Script tag(s) without explicit strategy:\n${offenders
        .map((o) => `  ${o.file}: ${o.match}`)
        .join("\n")}`,
    ).toEqual([]);
  });
});
