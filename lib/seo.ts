import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Variant } from "@/lib/variants.types";

type CalculatorMetadataArgs = {
  slug: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

// hreflang map. We serve a single URL per page that's region-aware via an
// in-page toggle (US/UK/SA). Pointing all three locales + x-default at the
// same URL is the Google-recommended soft signal for multi-region content
// served from a single URL.
export function hreflang(url: string): Record<string, string> {
  return {
    "en-US": url,
    "en-GB": url,
    "en-ZA": url,
    "x-default": url,
  };
}

export function calculatorMetadata({
  slug,
  title,
  description,
  ogTitle,
  ogDescription,
}: CalculatorMetadataArgs): Metadata {
  const url = `${SITE_URL}/${slug}`;
  return {
    // Use absolute so layout's "%s | BusCalcTools" template doesn't double-append
    // — calc page titles already include the brand suffix.
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: hreflang(url) },
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

type VariantMetadataArgs = {
  calcSlug: string;
  variant: Variant;
};

/**
 * Hreflang map for a variant page.
 * - Geo variants override their own locale; other locales fall back to the parent calc.
 * - Non-geo variants point all locales at the variant URL.
 */
function variantHreflang(calcSlug: string, variant: Variant): Record<string, string> {
  const parentUrl = `${SITE_URL}/${calcSlug}`;
  const variantUrl = `${SITE_URL}/${calcSlug}/${variant.slug}`;
  if (variant.kind === "geo" && variant.hreflangCountry) {
    const map: Record<string, string> = {
      "en-US": parentUrl,
      "en-GB": parentUrl,
      "en-ZA": parentUrl,
      "x-default": parentUrl,
    };
    map[variant.hreflangCountry] = variantUrl;
    return map;
  }
  return {
    "en-US": variantUrl,
    "en-GB": variantUrl,
    "en-ZA": variantUrl,
    "x-default": variantUrl,
  };
}

export function variantMetadata({ calcSlug, variant }: VariantMetadataArgs): Metadata {
  const url = `${SITE_URL}/${calcSlug}/${variant.slug}`;
  return {
    title: { absolute: variant.title },
    description: variant.description,
    alternates: { canonical: url, languages: variantHreflang(calcSlug, variant) },
    openGraph: {
      title: variant.title,
      description: variant.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: variant.title,
      description: variant.description,
    },
  };
}
