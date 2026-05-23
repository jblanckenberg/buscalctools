import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_NAME } from "@/lib/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = staticPageMetadata({
  slug: "editorial-policy",
  title: "Editorial Policy — How We Build Our Calculators | BusCalcTools",
  description:
    "The sourcing, review, and update standards behind every formula and calculator on the site. Author bylines, fact-check process.",
});

export default function EditorialPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-gray-700">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Editorial Policy" }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Editorial Policy
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last reviewed: 2026-05-12</p>
        <p className="mt-3 text-lg text-gray-600">
          How we research, write, fact-check, and update the calculators and
          articles on {SITE_NAME}.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">Sources</h2>
        <p className="mt-2">
          Every tax rate, interest-rate benchmark, employer-cost percentage, and
          industry multiple cited on this site comes from one of these primary
          sources. Each calculator page lists the sources used for its
          region-aware defaults, with last-verified dates.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <h3 className="font-semibold text-brand-dark">USA</h3>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>IRS — irs.gov</li>
              <li>US Small Business Administration — sba.gov</li>
              <li>FRED (St Louis Fed) — fred.stlouisfed.org</li>
              <li>BLS / Census Bureau for industry benchmarks</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <h3 className="font-semibold text-brand-dark">United Kingdom</h3>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>HMRC via GOV.UK</li>
              <li>Bank of England — bankofengland.co.uk</li>
              <li>ONS — ons.gov.uk</li>
              <li>BDO / Companies House for industry benchmarks</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <h3 className="font-semibold text-brand-dark">South Africa</h3>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>SARS — sars.gov.za</li>
              <li>South African Reserve Bank — resbank.co.za</li>
              <li>Stats SA — statssa.gov.za</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <h3 className="font-semibold text-brand-dark">General benchmarks</h3>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>Industry-published multiples (BDO, BVR)</li>
              <li>Amazon, Etsy, eBay, Shopify seller-fee schedules</li>
              <li>Reviewed annually against primary publications</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Calculation logic</h2>
        <p className="mt-2">
          Every calculator uses a hand-written, hand-reviewed calculation. Formulas
          are listed in the &ldquo;See the formula&rdquo; accordion on each calc
          page and matched against standard accounting or finance textbook
          definitions. We do not use closed-source third-party calculation
          libraries for tax or financial maths.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Authorship</h2>
        <p className="mt-2">
          All content is written or reviewed by{" "}
          <a href="/about" className="text-brand-primary underline">
            James Blanckenberg
          </a>
          . Every blog post carries a visible byline and a &ldquo;Last reviewed&rdquo;
          date.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">AI use disclosure</h2>
        <p className="mt-2">
          Some article drafts are prepared with AI assistance (Claude). Every
          AI-drafted article goes through a manual edit pass for accuracy,
          tone, and fact-checking against primary sources before publication.
          AI is not used for calculator logic, tax rates, or numerical
          benchmarks — those are hand-written, sourced, and reviewed.
        </p>
        <p className="mt-2">
          We don&apos;t publish AI-generated content that hasn&apos;t been
          read and corrected by a human.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Update cadence</h2>
        <ul className="mt-2 ml-6 list-disc space-y-2">
          <li>
            <strong>Tax rates</strong> are reviewed every 12 months or whenever a
            region changes its headline rate (typically following a Spring
            Budget in the UK, the federal budget cycle in the US, or the
            Medium-Term Budget Policy Statement in South Africa).
          </li>
          <li>
            <strong>Interest-rate benchmarks</strong> (SBA loan range, UK SME loan
            range, SA prime + margin) are reviewed quarterly.
          </li>
          <li>
            <strong>Articles</strong> are reviewed annually for accuracy. Articles
            that contain time-sensitive figures (e.g. &ldquo;UK Freelance Rates
            by Industry 2026&rdquo;) are reviewed at year-end.
          </li>
          <li>
            <strong>Industry benchmarks</strong> (typical margins by sector,
            valuation multiples) are reviewed when authoritative new data is
            published.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Corrections</h2>
        <p className="mt-2">
          If you spot an error, an out-of-date rate, or a calculation that
          contradicts your accountant, please tell us:{" "}
          <a href="mailto:hello@buscalctools.com" className="text-brand-primary underline">
            hello@buscalctools.com
          </a>
          .
        </p>
        <p className="mt-2">
          Corrections are made within 7 days of confirmation. Substantive
          changes are noted with a dated changelog entry on the affected page.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Conflict of interest</h2>
        <p className="mt-2">
          We have no affiliate relationships with any bank, lender, accountant,
          ecommerce platform, or financial product mentioned on the site. See
          our{" "}
          <a href="/disclosure" className="text-brand-primary underline">
            advertising disclosure
          </a>{" "}
          for how the site is monetised.
        </p>
      </section>
    </article>
  );
}
