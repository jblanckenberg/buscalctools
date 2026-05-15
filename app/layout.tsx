import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsentBanner from "@/components/shared/ConsentBanner";
import ConsentGate from "@/components/shared/ConsentGate";
import PlausibleScript from "@/components/shared/PlausibleScript";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Business Calculators`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  keywords: [
    "business calculator",
    "profit margin calculator",
    "break-even calculator",
    "ROI calculator",
    "pricing calculator",
    "markup calculator",
    "invoice calculator",
    "freelance rate calculator",
    "cash flow calculator",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `Free Profit, Pricing & Growth Calculators | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Profit, Pricing & Growth Calculators | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  verification: {
    yandex: "ab67bbbed12622c3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-white">{children}</main>
        <Footer />
        <PlausibleScript />
        <ConsentBanner />
        <ConsentGate />
      </body>
    </html>
  );
}
