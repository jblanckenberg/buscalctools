import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PHASE_1 } from "@/lib/tools";

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
    ...PHASE_1.map((t) => ({
      url: `${SITE_URL}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
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
