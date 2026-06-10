import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import PagefindSearch from "@/components/shared/PagefindSearch";
import { SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const SEARCH_URL = `${SITE_URL}/search`;

export const metadata: Metadata = {
  title: "Search BusCalcTools",
  description:
    "Search 44 free business calculators and 25 guides — profit margin, pricing, break-even, ROI, freelance rate, loans, and valuation. US, UK, SA.",
  alternates: { canonical: SEARCH_URL, languages: hreflang(SEARCH_URL) },
  robots: { index: true, follow: true },
};

const POPULAR = [
  { label: "profit margin", href: "/search?q=profit+margin" },
  { label: "break-even", href: "/search?q=break-even" },
  { label: "freelance rate", href: "/search?q=freelance+rate" },
  { label: "amazon fees", href: "/search?q=amazon+fees" },
  { label: "business loan", href: "/search?q=business+loan" },
  { label: "ROI", href: "/search?q=ROI" },
  { label: "burn rate", href: "/search?q=burn+rate" },
  { label: "VAT", href: "/search?q=VAT" },
];

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          Search
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Search every calculator, guide, and topic hub on BusCalcTools. Type a
          term — like &ldquo;profit margin&rdquo; or &ldquo;amazon fees&rdquo;
          — and matching pages appear instantly.
        </p>
      </header>

      <PagefindSearch />

      <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          What you can search
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          The search index covers <strong>44 free calculators</strong> (covering
          profit, pricing, markup, break-even, ROI, cash flow, business loans,
          valuation, tax, SaaS metrics, freelance rates, and more),
          {" "}<strong>25 long-form guides</strong>
          {" "}covering pricing strategy, profit benchmarks, cash flow, hiring,
          valuation, and loans, and <strong>4 topic hubs</strong> that group
          related tools.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Search runs entirely in your browser — your query is never sent to a
          server. The full text of every calculator page, guide, and topic hub
          is indexed at build time, so a search for a phrase that only appears
          inside an article body still finds the right page.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Popular searches
        </h2>
        <ul className="flex flex-wrap gap-2">
          {POPULAR.map((p) => (
            <li key={p.label}>
              <Link
                href={p.href}
                className="inline-block rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-brand-dark hover:border-brand-primary hover:text-brand-primary"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Can&apos;t find what you need?
        </h2>
        <p className="text-sm leading-relaxed text-gray-700">
          If a search returns nothing useful, the topic might not be covered
          yet. Email{" "}
          <a href="mailto:hello@buscalctools.com" className="text-brand-primary underline">
            hello@buscalctools.com
          </a>
          {" "}with what you were looking for — calculator gaps and article
          requests genuinely shape the roadmap. You can also browse the{" "}
          <Link href="/" className="text-brand-primary underline">
            full calculator directory
          </Link>{" "}
          or the{" "}
          <Link href="/blog" className="text-brand-primary underline">
            blog index
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
