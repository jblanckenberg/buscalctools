import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";
import { calcMeta, CALC_META_BASELINE_DATE } from "@/lib/calc-meta";
import { PUBLISHED_POSTS, POSTS_LAST_REVIEWED } from "@/lib/blog/posts";
import { PUBLISHED_COMPARISONS } from "@/lib/comparisons";
import { TOPICS } from "@/lib/topics";
import { allVariantParams } from "@/lib/variants";

export const dynamic = "force-static";

// Per-page lastModified uses the actual content date wherever possible
// instead of the build timestamp — better freshness signal for Google
// because pages that haven't actually changed don't claim they did.
function lm(iso: string): Date {
  return new Date(iso);
}

const SITE_LAST_REVIEWED = new Date(CALC_META_BASELINE_DATE);
const POLICY_LAST_REVIEWED = new Date("2026-05-19");
const PRIVACY_LAST_REVIEWED = new Date("2026-05-19");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...TOOLS.map((t) => {
      const meta = calcMeta(t.slug);
      return {
        url: `${SITE_URL}/${t.slug}`,
        lastModified: meta?.lastReviewed
          ? lm(meta.lastReviewed)
          : SITE_LAST_REVIEWED,
        changeFrequency: "monthly" as const,
        priority: t.phase === 1 ? 0.9 : 0.8,
      };
    }),
    ...allVariantParams().map(({ calculator, variant }) => {
      const parentMeta = calcMeta(calculator);
      return {
        url: `${SITE_URL}/${calculator}/${variant}`,
        // Variants inherit the parent calc's last-reviewed date — the
        // variant page renders the same CalcMeta + FAQ + scenarios.
        lastModified: parentMeta?.lastReviewed
          ? lm(parentMeta.lastReviewed)
          : SITE_LAST_REVIEWED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
    ...TOPICS.map((t) => ({
      url: `${SITE_URL}/topics/${t.slug}`,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(POSTS_LAST_REVIEWED),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...PUBLISHED_POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: lm(
        p.lastModified ?? p.publishedAt ?? POSTS_LAST_REVIEWED,
      ),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/compare`,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...PUBLISHED_COMPARISONS.map((c) => ({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: lm(c.updatedDate),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/authors/james-blanckenberg`,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: POLICY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/corrections-policy`,
      lastModified: POLICY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/changelog`,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...TOOLS.map((t) => {
      const meta = calcMeta(t.slug);
      return {
        url: `${SITE_URL}/methodology/${t.slug}`,
        lastModified: meta?.lastReviewed
          ? lm(meta.lastReviewed)
          : SITE_LAST_REVIEWED,
        changeFrequency: "monthly" as const,
        priority: 0.55,
      };
    }),
    {
      url: `${SITE_URL}/contact`,
      lastModified: POLICY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: SITE_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: PRIVACY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: POLICY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: POLICY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclosure`,
      lastModified: POLICY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: POLICY_LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
