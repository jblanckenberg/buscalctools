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
  "44 free business calculators for profit, pricing, break-even, ROI, loans & cash flow. Instant results, no sign-up. USA, UK, South Africa.";

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

// Cookiebot CBID — IAB TCF v2.3 certified Consent Management Platform.
// Env override is for staging a different domain group; the fallback is the
// real production CBID so Cloudflare's build picks it up without per-env
// configuration (.env.local is gitignored).
//
// As of 2026-05-19, GDPR is configured on the Cookiebot dashboard; CCPA
// and AdSense US policy compliance are still in setup (user note). The
// loader is included on every page; Cookiebot's regional logic shows the
// banner only where required by the active regulations.
export const COOKIEBOT_CBID =
  process.env.NEXT_PUBLIC_COOKIEBOT_CBID ??
  "bd1f75e4-63e0-49b2-891f-29b90d7615e0";
