import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PUBLISHED_COMPARISONS,
  comparisonBySlug,
} from "@/lib/comparisons";
import { COMPARISON_BODIES } from "@/components/compare/articles";
import ComparisonShell from "@/components/compare/ComparisonShell";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

export async function generateStaticParams() {
  return PUBLISHED_COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisonBySlug(slug);
  if (!comparison) return {};
  const url = `${SITE_URL}/compare/${slug}`;
  return {
    title: { absolute: comparison.title },
    description: comparison.description,
    alternates: { canonical: url, languages: hreflang(url) },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: comparison.publishedDate,
      modifiedTime: comparison.updatedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.title,
      description: comparison.description,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = comparisonBySlug(slug);
  if (!comparison || comparison.status !== "published") notFound();

  const Body = COMPARISON_BODIES[comparison.slug];
  if (!Body) notFound();

  return (
    <ComparisonShell comparison={comparison}>
      <Body />
    </ComparisonShell>
  );
}
