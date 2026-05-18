import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const CORRECTIONS_URL = `${SITE_URL}/corrections-policy`;

export const metadata: Metadata = {
  title: "Corrections Policy",
  description: `How ${SITE_NAME} handles factual errors, broken calculations, and outdated rates — how to report, response times, and the public correction log.`,
  alternates: { canonical: CORRECTIONS_URL, languages: hreflang(CORRECTIONS_URL) },
};

const correctionsLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Corrections Policy",
  url: CORRECTIONS_URL,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
  description: `How ${SITE_NAME} handles factual errors, broken calculations, and outdated rates.`,
};

export default function CorrectionsPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(correctionsLd) }}
      />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Corrections Policy" }]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Corrections Policy
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last reviewed: 2026-05-18</p>
        <p className="mt-3 text-lg text-gray-600">
          {SITE_NAME} publishes financial calculators and articles read by
          small business owners across the US, UK, and South Africa. When
          something on this site is wrong, we want to know — and we want our
          fix to be visible.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">What we treat as a correction</h2>
        <ul className="mt-3 ml-6 list-disc space-y-2">
          <li>
            <strong>Factual errors</strong> — a tax rate, threshold, or rule
            stated incorrectly anywhere on the site.
          </li>
          <li>
            <strong>Broken calculations</strong> — a formula that produces an
            output inconsistent with the documented &ldquo;See the
            formula&rdquo; box on the same page.
          </li>
          <li>
            <strong>Outdated rates</strong> — a benchmark, tax rate, or
            statutory threshold that has changed since our last review.
          </li>
          <li>
            <strong>Source errors</strong> — a citation that no longer
            resolves, or that points to the wrong primary source.
          </li>
          <li>
            <strong>Misleading framing</strong> — language that implies
            individual financial advice rather than educational guidance.
          </li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Typo fixes, broken internal links, and design tweaks are treated as
          ordinary maintenance and do not appear in the public correction log.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How to report a correction</h2>
        <p className="mt-2">
          Email{" "}
          <a
            href="mailto:hello@buscalctools.com?subject=Correction%20%E2%80%94%20"
            className="text-brand-primary underline"
          >
            hello@buscalctools.com
          </a>{" "}
          with:
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-1.5">
          <li>The URL of the affected page.</li>
          <li>The specific sentence, number, or output that&apos;s wrong.</li>
          <li>What you believe the correct value or wording should be.</li>
          <li>
            A link to a primary source (IRS, HMRC, SARS, statute, or peer-reviewed
            publication) where possible.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Response times</h2>
        <ul className="mt-3 ml-6 list-disc space-y-2">
          <li>
            <strong>Acknowledgement</strong> within 2 business days of receipt.
          </li>
          <li>
            <strong>Investigation</strong> within 7 days for clear-cut issues
            (a documented rate change, a formula that contradicts its own
            &ldquo;See the formula&rdquo; box).
          </li>
          <li>
            <strong>Investigation</strong> within 21 days for nuanced issues
            (regional edge cases, scope-of-applicability questions).
          </li>
          <li>
            <strong>Correction shipped</strong> within 7 days of confirming the
            error.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How corrections are recorded</h2>
        <p className="mt-2">
          Every substantive correction does three things:
        </p>
        <ol className="mt-3 ml-6 list-decimal space-y-2">
          <li>
            The affected page&apos;s <strong>last-reviewed date</strong>
            updates, which also updates the <code>dateModified</code> field in
            the page&apos;s JSON-LD schema for search engines.
          </li>
          <li>
            A dated entry is added to the public{" "}
            <Link href="/changelog" className="text-brand-primary underline">
              changelog
            </Link>{" "}
            describing what changed and why.
          </li>
          <li>
            If the original error materially affected an output (a calculator
            returned a wrong number for a class of inputs), the changelog entry
            states that explicitly. We don&apos;t quietly rewrite history.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">What we won&apos;t correct</h2>
        <ul className="mt-3 ml-6 list-disc space-y-2">
          <li>
            <strong>Differences of opinion on benchmarks.</strong> Where the
            site uses an industry-typical figure (e.g. healthy gross margins
            for a SaaS business), we cite our source. A reasoned disagreement
            about which benchmark to use is an editorial choice, not a
            correction.
          </li>
          <li>
            <strong>Output that disagrees with your accountant.</strong>{" "}
            Calculators on this site are designed as fast sanity checks, not a
            substitute for professional advice. If your accountant gives you a
            different number, your accountant is probably right — they know
            your full situation and we don&apos;t.
          </li>
          <li>
            <strong>Region-mismatch results.</strong> When a US user runs a UK
            tax scenario the calculator returns the right number for the wrong
            jurisdiction. That&apos;s a UX issue we keep working on, not a
            calculation error.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Editorial independence</h2>
        <p className="mt-2">
          {SITE_NAME} is monetised by display advertising. We have no affiliate
          relationships with banks, lenders, accountants, ecommerce platforms,
          or financial-product providers mentioned in our content. See the{" "}
          <Link href="/disclosure" className="text-brand-primary underline">
            advertising disclosure
          </Link>{" "}
          for the full monetisation picture. No correction is ever blocked or
          modified because of a commercial relationship.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Authorship and review</h2>
        <p className="mt-2">
          All content is written and reviewed by{" "}
          <Link href="/authors/james-blanckenberg" className="text-brand-primary underline">
            James Blanckenberg
          </Link>
          . See the{" "}
          <Link href="/editorial-policy" className="text-brand-primary underline">
            editorial policy
          </Link>{" "}
          for the full standards we hold every page to.
        </p>
      </section>
    </article>
  );
}
