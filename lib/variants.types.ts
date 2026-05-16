/** Closed union of variant kinds — keep in sync with FC variants.json schema. */
export type VariantKind = "geo" | "scenario" | "audience";

/** Composite key: "<calc-slug>/<variant-slug>". Used as the matrix lookup key. */
export type VariantKey = `${string}/${string}`;

/** A single variant definition. Variant pages render against this object. */
export type Variant = {
  /** URL-safe slug, e.g. "uk", "restaurants", "designers". */
  slug: string;
  /** What category of variant — drives hreflang + breadcrumb logic. */
  kind: VariantKind;
  /** Human label for breadcrumb + nav, e.g. "UK", "Restaurants". */
  label: string;
  /** Appended to parent H1, e.g. " for UK Businesses". No leading space stripped. */
  h1Suffix: string;
  /** Variant page <title>; supplied verbatim (already brand-suffixed). */
  title: string;
  /** Variant page meta description (120-160 char target). */
  description: string;
  /** Optional 29-word voice-snippet override; falls back to parent if undefined. */
  voiceAnswer: string | undefined;
  /** Operator-written 300-500 word intro. Marker form until filled. */
  intro: string;
  /**
   * If kind === "geo", the hreflang country code that this variant satisfies
   * (e.g. "en-GB" for /uk/, "en-US" for /us/, "en-ZA" for /za/). Other kinds
   * leave this undefined and fall back to the parent calc's hreflang map.
   */
  hreflangCountry: "en-US" | "en-GB" | "en-ZA" | undefined;
};

/** Variant matrix: calc slug → variant slug → Variant. */
export type VariantMatrix = Record<string, Record<string, Variant>>;
