/**
 * Shared boot logic for every BC embed bundle. Builds the iframe + the
 * Powered-by anchor + the postMessage height listener.
 *
 * The Powered-by anchor lives ON THE HOST PAGE (sibling to the iframe), NOT
 * inside the iframe — anchors inside iframes don't pass PageRank. This is
 * the SEO mechanic of the embed widget.
 */
// __EMBED_ORIGIN__ is replaced at build time by scripts/build-embeds.mjs via
// esbuild's `define` with the runtime origin (e.g. "https://buscalctools.com").
declare const __EMBED_ORIGIN__: string;

type BootOpts = {
  slug: string;
  // Friendly name for the Powered-by anchor link text (e.g. "BusCalcTools").
  brand: string;
  // Inline-text label for the calculator (e.g. "Profit Margin Calculator").
  // Used as iframe title attribute for accessibility.
  label: string;
};

export function boot(opts: BootOpts): void {
  const containerId = `bct-embed-${opts.slug}`;
  const container = document.getElementById(containerId);
  if (!container) {
    // Defensive log; eaten by host-site CSP if console is suppressed.
    console.warn(
      `[BC embed] container #${containerId} not found; widget not mounted.`,
    );
    return;
  }
  // Idempotency: bail if a previous bundle already mounted here.
  if (container.dataset.bctMounted === "1") return;
  container.dataset.bctMounted = "1";

  const origin = __EMBED_ORIGIN__; // replaced by build script

  const iframe = document.createElement("iframe");
  iframe.src = `${origin}/embed/${opts.slug}/`;
  iframe.title = opts.label;
  iframe.loading = "lazy";
  iframe.style.cssText =
    "width:100%;border:0;display:block;height:600px;background:#fff;";
  iframe.setAttribute("scrolling", "no");
  // Sandbox lets the iframe run scripts (the calculator) but prevents
  // top-level navigation hijacks.
  iframe.setAttribute(
    "sandbox",
    "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
  );

  container.appendChild(iframe);

  // Powered-by anchor — sibling to iframe, on the HOST PAGE = dofollow backlink.
  const credit = document.createElement("p");
  credit.style.cssText =
    "font-size:11px;color:#666;text-align:right;margin:6px 0 0 0;font-family:system-ui,sans-serif;";
  const link = document.createElement("a");
  link.href = `${origin}/${opts.slug}/?utm_source=embed&utm_medium=widget&utm_campaign=${encodeURIComponent(opts.slug)}`;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = `Powered by ${opts.brand}`;
  link.style.color = "#0070f3";
  link.style.textDecoration = "none";
  credit.appendChild(document.createTextNode("⚡ "));
  credit.appendChild(link);
  container.appendChild(credit);

  // postMessage resize listener — accept only messages from our iframe.
  window.addEventListener("message", (event) => {
    if (event.source !== iframe.contentWindow) return;
    if (event.origin !== origin) return;
    const data = event.data as
      | { type?: string; slug?: string; height?: number }
      | undefined;
    if (!data || data.type !== "bct-embed-resize") return;
    if (data.slug !== opts.slug) return;
    if (typeof data.height !== "number" || !isFinite(data.height)) return;
    const h = Math.max(200, Math.min(4000, Math.floor(data.height)));
    iframe.style.height = `${h}px`;
  });
}
