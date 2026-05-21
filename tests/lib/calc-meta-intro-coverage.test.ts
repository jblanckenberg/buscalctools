import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { TOOLS } from "@/lib/tools";

const WORD_THRESHOLD = 200;

// Count visible-text words in a calculator's page.tsx by stripping JSX tags,
// imports, attributes, and code blocks. This is a heuristic, not a parser —
// the threshold (WORD_THRESHOLD = 200) is set loosely so a calculator with the
// recommended 200-400 word intro+example copy passes comfortably.
//
// Known false-negative cases (acceptable — they push the count DOWN, not up):
//   1. {TEMPLATE_VAR} JSX interpolations stripped entirely.
//   2. `template literal` backtick blocks stripped (FormulaBox content lost).
//   3. dangerouslySetInnerHTML={{ __html: "..." }} — outer {{...}} stripped as
//      two single-brace tokens, inner string content dropped. No current page
//      uses this pattern but future authors should be aware.
//   4. Copy inside imported shared components is not followed.
function countWords(slug: string): number {
  const candidates = [
    path.resolve(__dirname, `../../app/(site)/${slug}/page.tsx`),
  ];
  const file = candidates.find((c) => fs.existsSync(c));
  if (!file) return 0;
  const src = fs.readFileSync(file, "utf8");

  // Strip imports, JSX tags, JSX attrs, code blocks (between backticks), and
  // template literal interpolations.
  // Surface quoted-string content from innermost {…} blocks (e.g. GlossarySection
  // items={[{ definition: "text" }]}) before stripping the braces so the copy
  // is not lost when the surrounding {…} is removed.
  const stripped = src
    .replace(/^import .+$/gm, "")
    .replace(/<\/?[A-Za-z][\w.-]*[^>]*>/g, " ")
    .replace(/\{[^{}]*\}/g, (match) => {
      // Extract quoted string values so copy survives brace stripping
      const content = match.replace(/"([^"]*)"/g, " $1 ");
      // Now strip the braces themselves, keeping the surfaced text
      return content.replace(/^\{/, " ").replace(/\}$/, " ");
    })
    .replace(/`[\s\S]*?`/g, " ")
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/[^A-Za-z'-]+/g, " ")
    .trim();

  return stripped.split(/\s+/).filter((w) => w.length > 1).length;
}

describe(`calculator pages have >= ${WORD_THRESHOLD} words of visible intro/example copy`, () => {
  for (const tool of TOOLS) {
    it(`${tool.slug}`, () => {
      const wc = countWords(tool.slug);
      expect(wc, `${tool.slug}: only ${wc} words — add 200-400 of intro/example/methodology copy`).toBeGreaterThanOrEqual(WORD_THRESHOLD);
    });
  }
});
