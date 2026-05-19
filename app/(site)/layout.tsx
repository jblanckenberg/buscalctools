import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/shared/AdSlot";
import ConsentBanner from "@/components/shared/ConsentBanner";
import ConsentGate from "@/components/shared/ConsentGate";
import PlausibleScript from "@/components/shared/PlausibleScript";
import NewsletterCapture from "@/components/shared/NewsletterCapture";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Footer leaderboard slot — desktop-only (md+) because it's a fixed 728x90
  // unit, not a true mobile anchor. Hidden on mobile so we don't cause CLS or
  // overflow on small viewports.
  const footerSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER;
  return (
    <>
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
      <ConsentBanner />
      <ConsentGate />
    </>
  );
}
