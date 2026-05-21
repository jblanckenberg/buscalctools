import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { TOOLS } from "@/lib/tools";

// Count visible-text words in a calculator's page.tsx by stripping JSX tags,
// imports, attributes, and code blocks. This is a heuristic, not a parser —
// the threshold (200 words) is set loosely so a calculator with the
// recommended 200-400 word intro+example copy passes comfortably.
function countWords(slug: string): number {
  const candidates = [
    path.resolve(__dirname, `../../app/(site)/${slug}/page.tsx`),
  ];
  const file = candidates.find((c) => fs.existsSync(c));
  if (!file) return 0;
  const src = fs.readFileSync(file, "utf8");

  // Strip imports, JSX tags, JSX attrs, code blocks (between backticks), and
  // template literal interpolations.
  const stripped = src
    .replace(/^import .+$/gm, "")
    .replace(/<\/?[A-Za-z][\w.-]*[^>]*>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/`[\s\S]*?`/g, " ")
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/[^A-Za-z'-]+/g, " ")
    .trim();

  return stripped.split(/\s+/).filter((w) => w.length > 1).length;
}

describe("calculator pages have >= 200 words of visible intro/example copy", () => {
  for (const tool of TOOLS) {
    it(`${tool.slug}`, () => {
      const wc = countWords(tool.slug);
      expect(wc, `${tool.slug}: only ${wc} words — add 200-400 of intro/example/methodology copy`).toBeGreaterThanOrEqual(200);
    });
  }
});
