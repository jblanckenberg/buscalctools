import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ADSENSE_PUB_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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
    title: `${SITE_NAME} — Free Business Calculators`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Business Calculators`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
