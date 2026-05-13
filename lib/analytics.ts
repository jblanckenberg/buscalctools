// Thin wrapper around gtag for calculator-engagement events.
//
// gtag is only present when the visitor has accepted analytics cookies (see
// ConsentGate). All helpers must be no-ops when gtag is undefined; never
// re-throw and never assume the dataLayer exists.

type GtagFn = (
  command: "event" | "config" | "js" | "set" | "consent",
  action: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

const SESSION_KEY = "bizcalc:calc_completed";

function readRegion(): string | null {
  try {
    return window.localStorage.getItem("bizcalc:region");
  } catch {
    return null;
  }
}

// Fires `calc_completed` once per browser tab per slug. The dedupe keeps event
// volume sane on GA4 (one user fiddling with inputs shouldn't generate 50
// completions) while still distinguishing a genuine second visit (new tab).
export function trackCalcCompleted(slug: string): void {
  if (typeof window === "undefined" || !slug) return;
  if (typeof window.gtag !== "function") return;
  try {
    const sentKey = `${SESSION_KEY}:${slug}`;
    if (window.sessionStorage.getItem(sentKey)) return;
    window.sessionStorage.setItem(sentKey, "1");
  } catch {
    // Storage unavailable (private mode, quota): fire-and-forget without
    // dedupe is fine — better one duplicate event than zero events.
  }
  try {
    window.gtag("event", "calc_completed", {
      calc_slug: slug,
      region: readRegion() ?? "unknown",
    });
  } catch {
    // gtag itself threw; nothing to do.
  }
}
