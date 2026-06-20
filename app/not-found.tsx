import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { TOPICS } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Page not found | BusCalcTools",
  description:
    "We couldn't find that page. Use the search or pick a calculator from the directory below.",
  robots: { index: false, follow: true },
};

const FEATURED = [
  "profit-margin-calculator",
  "break-even-calculator",
  "roi-calculator",
  "pricing-calculator",
  "freelance-rate-calculator",
  "business-loan-calculator",
];

export default function NotFound() {
  const featured = FEATURED.map((slug) => TOOLS.find((t) => t.slug === slug)).filter(Boolean) as typeof TOOLS;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
        Error 404
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
        The page you tried to open doesn&apos;t exist or has moved. Try the
        calculators below, or jump back to the homepage to browse all 44 free
        tools.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-block rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
        >
          ← Back to homepage
        </Link>
        <Link
          href="/blog"
          className="inline-block rounded-lg border border-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-light"
        >
          Browse the blog
        </Link>
      </div>

      <section className="mt-14 text-left">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Most-used calculators
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand-primary hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-brand-dark">{c.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 text-left">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Or browse by topic
        </h2>
        <ul className="flex flex-wrap justify-start gap-3">
          {TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${t.slug}`}
                className="inline-block rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-brand-dark hover:border-brand-primary hover:text-brand-primary"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
