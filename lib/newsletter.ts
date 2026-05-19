// Beehiiv form action URL for the BusCalcTools publication. The env override
// is for local testing or staging a different publication; the fallback is the
// real production URL so Cloudflare's build picks it up without per-environment
// configuration (.env.local is gitignored and not present at deploy time).
export const BEEHIIV_FORM_URL =
  process.env.NEXT_PUBLIC_BEEHIIV_FORM_URL ??
  "https://james-newsletter-993ef9.beehiiv.com/subscribe";
