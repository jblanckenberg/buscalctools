import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/shared/AdSlot";
import ConsentGate from "@/components/shared/ConsentGate";
import PlausibleScript from "@/components/shared/PlausibleScript";
import NewsletterCapture from "@/components/shared/NewsletterCapture";
import { COOKIEBOT_CBID } from "@/lib/site";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Footer leaderboard slot — desktop-only (md+) because it's a fixed 728x90
  // unit, not a true mobile anchor. Hidden on mobile so we don't cause CLS or
  // overflow on small viewports.
  const footerSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER;
  return (
    <>
      {/* Cookiebot CMP loader — IAB TCF v2.3 certified.
          strategy="lazyOnload" defers the ~120 KB Cookiebot bundle (uc.js +
          cc.js + dialog CSS) to browser idle time so it doesn't block LCP/FCP.
          The consent banner appears ~1-2s after the page becomes interactive
          rather than at hydration; safe for GDPR because nothing requiring
          consent runs before the banner — ConsentGate below waits for the
          CookiebotOnConsentReady event before injecting AdSense / Clarity /
          GA4 / GoogleTag, and Plausible is cookieless.
          data-blockingmode="manual" disables Cookiebot's DOM observer (which
          rewrites unknown third-party script tags to type=text/plain until
          consent). The observer was belt-and-braces given ConsentGate already
          enforces the gate, and it accounted for the longest main-thread
          tasks in the 2026-05-22 Lighthouse trace. If a future contributor
          adds a bare third-party <script> bypassing ConsentGate, that script
          would now slip through — keep new ad/analytics scripts inside
          ConsentGate.tsx. */}
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={COOKIEBOT_CBID}
        data-blockingmode="manual"
        strategy="lazyOnload"
      />
      <Header />
      <main className="min-h-screen bg-white" data-pagefind-body>{children}</main>
      {footerSlot ? (
        <div className="hidden md:flex justify-center py-4 border-t border-gray-200">
          <AdSlot
            slot={footerSlot}
            minHeight={90}
            style={{ display: "inline-block", width: "728px", height: "90px" }}
          />
        </div>
      ) : null}
      <NewsletterCapture />
      <Footer />
      <PlausibleScript />
      <ConsentGate />
    </>
  );
}
