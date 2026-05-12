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
  "18 free business calculators for profit, pricing, break-even, ROI, loans & cash flow. Instant results, no sign-up. USA, UK, South Africa.";

// Google AdSense publisher ID. Loaded via next/script on every page from the
// root layout. Replace if the AdSense account changes.
export const ADSENSE_PUB_ID = "ca-pub-5092336325075679";

// Microsoft Clarity project ID — heatmaps + session recording. Loaded via
// next/script on every page from the root layout.
export const CLARITY_PROJECT_ID = "wpt3aszb9h";

// Google Tag (modern unified tag) — issued by Google Tag Manager admin.
// Loaded as the primary gtag bundle and routes events server-side to any
// destinations configured under the Google Tag admin (Ads, GA4, etc.).
export const GOOGLE_TAG_ID = "GT-PJRMN75C";

// Google Analytics 4 measurement ID — also configured directly so GA4
// pageviews land even if the Google Tag routing isn't set up yet. No
// double-counting; gtag dedupes by destination ID.
export const GA4_MEASUREMENT_ID = "G-6DDT7KY0YD";
