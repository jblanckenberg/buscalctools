import Script from "next/script";

// 2026-05-21: SEO audit recommended loading Plausible on first user interaction
// rather than `afterInteractive`. Not implemented — `afterInteractive` + `defer`
// already lands Plausible after FCP/LCP, and a load-on-interaction change
// risks under-counting bounces (users who never interact). Revisit if Plausible
// shows up in a future Lighthouse trace as a TBT contributor.
export default function PlausibleScript() {
  return (
    <Script
      defer
      data-domain="buscalctools.com"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
