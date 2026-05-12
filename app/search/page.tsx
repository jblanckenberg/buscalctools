import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SearchClient from "@/components/shared/SearchClient";
import { SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const SEARCH_URL = `${SITE_URL}/search`;

export const metadata: Metadata = {
  title: "Search BusCalcTools",
  description:
    "Search BusCalcTools calculators and guides — find the right tool for profit margin, pricing, break-even, freelance rate, loans, valuation, and more.",
  alternates: { canonical: SEARCH_URL, languages: hreflang(SEARCH_URL) },
  robots: { index: true, follow: true },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          Search
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Search every calculator and guide on BusCalcTools.
        </p>
      </header>

      <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
