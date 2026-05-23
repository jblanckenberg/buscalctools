import Link from "next/link";
import type { Metadata } from "next";
import { PUBLISHED_COMPARISONS } from "@/lib/comparisons";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

// Hub page for /compare. Closes the audit finding that sitemap.xml declared
// /compare but no page existed (404). Each card links to /compare/<slug>.
const COMPARE_URL = `${SITE_URL}/compare`;

export const metadata: Metadata = {
  title: {
    absolute: "Calculator Comparisons — Side-by-Side Guides | BusCalcTools",
  },
  description:
    "Side-by-side comparisons of business calculators — pricing tools, margin tools, break-even analysis — and which to use when.",
  alternates: { canonical: COMPARE_URL, languages: hreflang(COMPARE_URL) },
  openGraph: {
    title: "Calculator Comparisons — Side-by-Side Guides | BusCalcTools",
    description:
      "Side-by-side comparisons of business calculators — pricing tools, margin tools, break-even analysis — and which to use when.",
    url: COMPARE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Comparisons — Side-by-Side Guides | BusCalcTools",
    description:
      "Side-by-side comparisons of business calculators — pricing tools, margin tools, break-even analysis — and which to use when.",
  },
};

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Calculator Comparisons",
  url: COMPARE_URL,
  description:
    "Side-by-side comparisons of business calculators — pricing tools, margin tools, break-even analysis — and which to use when.",
  hasPart: PUBLISHED_COMPARISONS.map((c) => ({
    "@type": "Article",
    headline: c.title,
    url: `${SITE_URL}/compare/${c.slug}`,
    description: c.description,
    datePublished: c.publishedDate,
  })),
};

export default function CompareHubPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Comparisons" }]} />
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          Calculator Comparisons
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          Honest, hands-on comparisons of the business calculators owners actually
          use — what each does well, where they fall short, and which to pick.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          All comparisons
        </h2>
        <div className="space-y-4">
          {PUBLISHED_COMPARISONS.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand-primary hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-brand-dark">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{c.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-primary">
                Read comparison →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
