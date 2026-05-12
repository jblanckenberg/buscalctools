import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { AUTHOR, authorPersonLd } from "@/lib/author";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";
import { TOPICS } from "@/lib/topics";

const ABOUT_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About — Who Builds BusCalcTools",
  description:
    "James Blanckenberg builds BusCalcTools — free profit, pricing, and growth calculators for small business owners across the US, UK, and South Africa.",
  alternates: { canonical: ABOUT_URL, languages: hreflang(ABOUT_URL) },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorPersonLd()) }}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Built by {AUTHOR.name} — {AUTHOR.jobTitle}.
        </p>
      </header>

      <section className="space-y-4 text-base leading-relaxed text-gray-700">
        {AUTHOR.longBio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-brand-dark">What we publish</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          18 calculators across four topic clusters, plus 25 long-form
          guides. Every calculator runs entirely in your browser; we don&apos;t
          collect or transmit the numbers you enter. Tax and rate defaults
          are sourced from primary government sources (IRS, HMRC, SARS) and
          dated on each calculator page.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${t.slug}`}
                className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-brand-dark hover:border-brand-primary"
              >
                {t.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Editorial policy</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Sources.</strong> Tax rates, loan benchmarks, and
            employer cost percentages are sourced from primary government
            data (IRS, HMRC, SARS) plus reputable industry sources for
            benchmarks (SBA, BDO, BoE). Each calculator page lists its
            sources with last-verified dates.
          </li>
          <li>
            <strong>Updates.</strong> Tax rates are reviewed every
            12 months or when a region changes its corporate or
            consumption tax rate. Articles are reviewed annually for
            accuracy.
          </li>
          <li>
            <strong>Not financial advice.</strong> These calculators are
            educational tools. They are accurate for the inputs you
            provide but they do not know your individual circumstances.
            Consult a qualified accountant or financial adviser before
            making business decisions.
          </li>
          <li>
            <strong>AI disclosure.</strong> Some article drafts were
            initially prepared with AI assistance and then edited and
            fact-checked by James. Calculator logic, calculations, and
            tax rates are hand-written and reviewed manually.
          </li>
          <li>
            <strong>Monetisation.</strong> The site is supported by
            display advertising. We have no affiliate relationships with
            banks, lenders, accountants, or financial product providers
            mentioned in articles.
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-xl bg-brand-light p-6">
        <h2 className="text-lg font-semibold text-brand-dark">Contact</h2>
        <p className="mt-2 text-sm text-gray-700">
          Spotted a bug, an out-of-date tax rate, or a feature request?
          Email{" "}
          <a
            href="mailto:hello@buscalctools.com"
            className="text-brand-primary underline"
          >
            hello@buscalctools.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
