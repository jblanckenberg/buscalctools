// Single source of truth for the public origin used in metadata, OG tags,
// canonical URLs, sitemap, and JSON-LD. Override with NEXT_PUBLIC_SITE_URL
// at build time if the domain changes.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://buscalctools.com";

export const SITE_NAME = "BusCalcTools";

export const SITE_TAGLINE =
  "Free business calculators for profit, pricing & growth";

export const SITE_DESCRIPTION =
  "Free online business calculators for profit margin, break-even, ROI, markup, pricing, invoicing and more. Instant results. No sign-up required. Works for USA, UK & South Africa.";

// Google AdSense publisher ID. Loaded via next/script on every page from the
// root layout. Replace if the AdSense account changes.
export const ADSENSE_PUB_ID = "ca-pub-5092336325075679";
