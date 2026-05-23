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

type StaticPageMetadataArgs = {
  // Path under SITE_URL, no leading slash (e.g. "about", "terms").
  slug: string;
  // Full <title> as it should appear in the tab — brand suffix already baked in
  // where natural. We emit with { absolute: title } so the root layout's
  // "%s | BusCalcTools" template doesn't double-append the brand.
  title: string;
  description: string;
  // Optional override for the OG image path. Defaults to /og/<slug>.png so
  // every supporting page renders a unique social card. The actual PNG may
  // not exist yet — Next.js renders the meta tag regardless and the image
  // backfill is tracked separately.
  ogImage?: string;
};

/**
 * Metadata builder for the 10 static supporting pages (about, terms, privacy,
 * cookies, disclaimer, disclosure, editorial-policy, corrections-policy,
 * changelog, methodology) plus the author profile page. Closes the audit
 * finding where og:url / og:image / og:title fell back to root-layout defaults,
 * causing every social share to render as the homepage card.
 *
 * Use calculatorMetadata for calculator pages and variantMetadata for variant
 * pages — they include hreflang language maps which static pages don't need.
 */
export function staticPageMetadata({
  slug,
  title,
  description,
  ogImage,
}: StaticPageMetadataArgs): Metadata {
  const url = `${SITE_URL}/${slug}`;
  const image = ogImage ?? `/og/${slug}.png`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: hreflang(url) },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
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
