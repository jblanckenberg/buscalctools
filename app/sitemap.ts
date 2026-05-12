import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";
import { PUBLISHED_POSTS } from "@/lib/blog/posts";
import { TOPICS } from "@/lib/topics";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...TOOLS.map((t) => ({
      url: `${SITE_URL}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: t.phase === 1 ? 0.9 : 0.8,
    })),
    ...TOPICS.map((t) => ({
      url: `${SITE_URL}/topics/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...PUBLISHED_POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
