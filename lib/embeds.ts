import { calcMeta, type CalcMeta } from "@/lib/calc-meta";
import { SITE_URL } from "@/lib/site";

/**
 * The 4 calculators that ship as embeddable widgets in Phase 3.
 * Order matters — first slug in this list is the canonical example
 * shown in marketing copy. See docs/superpowers/plans/2026-05-15-phase3-embed-widget.md.
 */
export const EMBED_SLUGS = [
  "profit-margin-calculator",
  "break-even-calculator",
  "roi-calculator",
  "cash-flow-calculator",
] as const;

export type EmbedSlug = (typeof EMBED_SLUGS)[number];

export function isEmbedSlug(s: string): s is EmbedSlug {
  return (EMBED_SLUGS as readonly string[]).includes(s);
}

// The origin used inside the bundle for both iframe src + Powered-by anchor.
// Override at build time via NEXT_PUBLIC_EMBED_ORIGIN if serving from a CDN
// or staging origin. Falls back to the canonical SITE_URL.
export const EMBED_ORIGIN =
  process.env.NEXT_PUBLIC_EMBED_ORIGIN?.replace(/\/$/, "") ?? SITE_URL;

export function embedSnippet(slug: EmbedSlug): string {
  return [
    `<div id="bct-embed-${slug}"></div>`,
    `<script async src="${EMBED_ORIGIN}/embed/${slug}.js"></script>`,
  ].join("\n");
}

export function embedMeta(slug: EmbedSlug): CalcMeta {
  const meta = calcMeta(slug);
  if (!meta) {
    throw new Error(`Phase 3 embed slug ${slug} has no entry in calc-meta.ts`);
  }
  return meta;
}
