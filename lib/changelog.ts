// Hand-curated changelog of site-wide reviews and substantive corrections.
// Per-calc review dates live in lib/calc-meta.ts (CalcMeta.lastReviewed) and
// are surfaced separately on the /changelog page; this file is for the
// editorial narrative: what was reviewed, why, and what changed.
//
// Append a new entry at the TOP of CHANGELOG_ENTRIES when:
//  - A batch of calculators is reviewed in one sitting.
//  - A correction is shipped per the /corrections-policy SLA.
//  - A site-wide policy or template change lands (template section added,
//    new schema field emitted, etc.).
//
// Keep entries terse: a 1–2 sentence summary is enough. The per-calc table
// on /changelog already names the affected pages.

export type ChangelogEntryKind =
  | "review" // periodic review (annual / quarterly / monthly cycle)
  | "correction" // a specific factual or formula fix
  | "feature" // template, schema, or site-wide capability change
  | "policy"; // editorial / corrections / disclosure policy update

export type ChangelogEntry = {
  // ISO date (YYYY-MM-DD)
  date: string;
  kind: ChangelogEntryKind;
  // Headline rendered as the entry title.
  title: string;
  // 1–2 sentences. Plain text; no markdown.
  summary: string;
  // Optional list of affected calc slugs. Use "all" for site-wide changes.
  affects?: string[] | "all";
};

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    date: "2026-05-18",
    kind: "feature",
    title: "Public corrections policy, author profile, and changelog launched",
    summary:
      "Added the /corrections-policy page describing how factual errors and formula bugs are reported and resolved. Added the /authors/james-blanckenberg/ canonical author profile and pointed Person.url schema at it. Launched this changelog as the public record of substantive site updates.",
    affects: "all",
  },
  {
    date: "2026-05-17",
    kind: "review",
    title: "Site-wide content + schema review across all 18 calculators",
    summary:
      "Verified sources, formulas, FAQs, and Key Concepts across every Phase 1 and Phase 2 calculator. Refreshed lastReviewed dates, expanded FAQs from 5 to 10 per calc, and added Common-mistakes + When-to-use prose to all four topic clusters. JSON-LD now emits Person, dateModified, and HowTo on every calc and variant page.",
    affects: "all",
  },
];
