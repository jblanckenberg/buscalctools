import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type CalculatorMetadataArgs = {
  slug: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export function calculatorMetadata({
  slug,
  title,
  description,
  ogTitle,
  ogDescription,
}: CalculatorMetadataArgs): Metadata {
  const url = `${SITE_URL}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
    },
  };
}
