import { describe, it, expect } from "vitest";
import type { Metadata } from "next";

// Static supporting pages — each module exports a `metadata` literal that the
// app router consumes. Per Task 0.2, every one must publish a page-specific
// openGraph block so social shares don't fall back to the homepage card.
import { metadata as aboutMeta } from "@/app/(site)/about/page";
import { metadata as termsMeta } from "@/app/(site)/terms/page";
import { metadata as privacyMeta } from "@/app/(site)/privacy/page";
import { metadata as cookiesMeta } from "@/app/(site)/cookies/page";
import { metadata as disclaimerMeta } from "@/app/(site)/disclaimer/page";
import { metadata as disclosureMeta } from "@/app/(site)/disclosure/page";
import { metadata as editorialMeta } from "@/app/(site)/editorial-policy/page";
import { metadata as correctionsMeta } from "@/app/(site)/corrections-policy/page";
import { metadata as changelogMeta } from "@/app/(site)/changelog/page";
import { metadata as methodologyMeta } from "@/app/(site)/methodology/page";
import { metadata as authorMeta } from "@/app/(site)/authors/james-blanckenberg/page";

const SITE = "https://buscalctools.com";

type Case = {
  name: string;
  slug: string;
  meta: Metadata;
};

const CASES: Case[] = [
  { name: "about", slug: "about", meta: aboutMeta },
  { name: "terms", slug: "terms", meta: termsMeta },
  { name: "privacy", slug: "privacy", meta: privacyMeta },
  { name: "cookies", slug: "cookies", meta: cookiesMeta },
  { name: "disclaimer", slug: "disclaimer", meta: disclaimerMeta },
  { name: "disclosure", slug: "disclosure", meta: disclosureMeta },
  { name: "editorial-policy", slug: "editorial-policy", meta: editorialMeta },
  { name: "corrections-policy", slug: "corrections-policy", meta: correctionsMeta },
  { name: "changelog", slug: "changelog", meta: changelogMeta },
  { name: "methodology", slug: "methodology", meta: methodologyMeta },
  {
    name: "authors/james-blanckenberg",
    slug: "authors/james-blanckenberg",
    meta: authorMeta,
  },
];

// Helpers — Next's Metadata.title can be a string OR { absolute } OR { default }.
function extractTitle(t: Metadata["title"]): string {
  if (typeof t === "string") return t;
  if (t && typeof t === "object") {
    if ("absolute" in t && typeof t.absolute === "string") return t.absolute;
    if ("default" in t && typeof t.default === "string") return t.default;
  }
  return "";
}

function extractCanonical(meta: Metadata): string {
  const c = meta.alternates?.canonical;
  if (typeof c === "string") return c;
  if (c && typeof c === "object" && "url" in c && typeof c.url === "string") {
    return c.url;
  }
  return "";
}

describe.each(CASES)("page metadata: $name", ({ slug, meta }) => {
  it("has a canonical URL ending with the slug", () => {
    const canonical = extractCanonical(meta);
    expect(canonical).toBe(`${SITE}/${slug}`);
  });

  it("title is 30-65 characters", () => {
    const title = extractTitle(meta.title);
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(65);
  });

  it("description is 100-160 characters", () => {
    const description = meta.description ?? "";
    expect(typeof description).toBe("string");
    expect((description as string).length).toBeGreaterThanOrEqual(100);
    expect((description as string).length).toBeLessThanOrEqual(160);
  });

  it("openGraph.title is set", () => {
    const ogTitle = meta.openGraph?.title;
    const value = typeof ogTitle === "string" ? ogTitle : extractTitle(ogTitle);
    expect(value.length).toBeGreaterThan(0);
  });

  it("openGraph.url matches the canonical", () => {
    expect(meta.openGraph?.url).toBe(`${SITE}/${slug}`);
  });

  it("openGraph.type is website", () => {
    // OpenGraph is a discriminated union; static-page builder always emits type:"website".
    const og = meta.openGraph as { type?: string } | undefined;
    expect(og?.type).toBe("website");
  });

  it("openGraph.images has at least one entry", () => {
    const images = meta.openGraph?.images;
    expect(Array.isArray(images)).toBe(true);
    expect((images as unknown[]).length).toBeGreaterThanOrEqual(1);
  });

  it("twitter.card is summary_large_image", () => {
    // Twitter metadata is a discriminated union; static-page builder always emits summary_large_image.
    const tw = meta.twitter as { card?: string } | undefined;
    expect(tw?.card).toBe("summary_large_image");
  });
});
