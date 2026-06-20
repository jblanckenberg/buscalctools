/**
 * Per-variant unique content (FAQ + worked example) kept OUT of variants.ts so
 * each variant carries its own non-duplicated FAQ block and a standalone worked
 * example. Merged onto the base Variant by getVariant(). Keyed by
 * "<calc-slug>/<variant-slug>", e.g. "profit-margin-calculator/uk".
 */
export type VariantExtra = {
  /** 4+ FAQ items unique to this variant — must NOT repeat the parent calc FAQ. */
  faqs: { q: string; a: string }[];
  /** A standalone worked example specific to this variant (markdown-lite). */
  workedExample: string;
};

export type VariantExtraMap = Record<string, VariantExtra>;
