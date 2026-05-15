// Beehiiv form action URL — configured at build time. Falls back to a no-op
// placeholder when unset so /out can still build in CI without the env.
export const BEEHIIV_FORM_URL =
  process.env.NEXT_PUBLIC_BEEHIIV_FORM_URL ??
  "https://example.beehiiv.com/subscribe";
