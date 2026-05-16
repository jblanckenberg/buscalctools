import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsentBanner from "@/components/shared/ConsentBanner";
import ConsentGate from "@/components/shared/ConsentGate";
import PlausibleScript from "@/components/shared/PlausibleScript";
import NewsletterCapture from "@/components/shared/NewsletterCapture";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">{children}</main>
      <NewsletterCapture />
      <Footer />
      <PlausibleScript />
      <ConsentBanner />
      <ConsentGate />
    </>
  );
}
