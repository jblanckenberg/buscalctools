"use client";

// Opens the Cookiebot consent dialog. Cookiebot's UC.js exposes
// window.Cookiebot.renew() which re-shows the banner so visitors can revise
// their choices. If Cookiebot hasn't loaded yet (network failure, ad blocker),
// the button silently no-ops rather than throwing — the link is in the footer
// on every page, and a quick refresh + Cookiebot retry usually resolves it.
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;
        const cb = window.Cookiebot;
        if (cb?.renew) cb.renew();
      }}
      className="text-gray-700 hover:text-brand-primary"
    >
      Cookie settings
    </button>
  );
}
