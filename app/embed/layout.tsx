import "../globals.css";

/**
 * Chrome-less layout for /embed/<slug>/ pages.
 *
 * No Header, Footer, NewsletterCapture, Plausible, ConsentBanner, or
 * ConsentGate. The host site that embeds the iframe owns its visitor's
 * chrome and consent UX — re-rendering ours inside the iframe would be
 * confusing AND would double-count analytics.
 *
 * Background is white so the host page can place the embed against any
 * background colour without visual seams.
 */
export default function EmbedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      style={{
        margin: 0,
        padding: "12px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

export const metadata = {
  // Keep embed pages out of search; the canonical calc page is the indexable URL.
  robots: { index: false, follow: false },
};
