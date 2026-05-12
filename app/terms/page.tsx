import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const TERMS_URL = `${SITE_URL}/terms`;

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for BusCalcTools — permitted use, content rights, source policy, limitation of liability, and contact details. Calculators are educational tools, not financial advice.",
  alternates: { canonical: TERMS_URL, languages: hreflang(TERMS_URL) },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-gray-700">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark">Terms of Use</h1>
        <p className="mt-2 text-xs text-gray-500">Last updated: 2026-05-12</p>
      </header>

      <p>
        These terms govern your use of {SITE_NAME} (the site). By accessing or
        using the site, you agree to these terms. If you don&apos;t agree, please
        stop using the site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">1. What the site is</h2>
      <p className="mt-2">
        {SITE_NAME} provides free online calculators and educational content
        about small business finance for users in the USA, UK, and South
        Africa. The site is operated by James Blanckenberg as a personal
        project.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">2. Not financial advice</h2>
      <p className="mt-2">
        Content and calculations on the site are for informational and
        educational purposes only. They do not constitute financial,
        accounting, tax, legal, or investment advice. We are not your
        accountant, financial adviser, or solicitor. Always consult a
        qualified professional before making business decisions based on
        anything you read or calculate here.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">3. Permitted use</h2>
      <p className="mt-2">You may:</p>
      <ul className="mt-2 ml-6 list-disc space-y-1">
        <li>Use the calculators for personal or business purposes.</li>
        <li>Link to any page on the site.</li>
        <li>Quote short excerpts of articles with attribution and a link back.</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">4. What you may not do</h2>
      <ul className="mt-2 ml-6 list-disc space-y-1">
        <li>Republish full articles or scrape the site systematically.</li>
        <li>Resell access to the calculators or wrap them in a competing product.</li>
        <li>Use the site for anything illegal under your local law.</li>
        <li>Attempt to circumvent rate limits, security measures, or access controls.</li>
        <li>Misrepresent affiliation with {SITE_NAME}.</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">5. Accuracy &amp; updates</h2>
      <p className="mt-2">
        We try hard to keep tax rates, interest-rate benchmarks, and other
        figures up to date — each calculator page lists its sources and
        last-verified date. But rates change, and we may not catch every
        update immediately. Verify against primary sources (IRS, GOV.UK,
        SARS, SBA) before relying on a number for a business decision.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">6. Limitation of liability</h2>
      <p className="mt-2">
        To the maximum extent permitted by law, {SITE_NAME} and its operator
        accept no liability for any loss, damage, or expense arising from your
        use of the site, including any reliance on the calculators or
        content. The site is provided &ldquo;as is&rdquo; without warranties of any kind.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">7. Third-party content</h2>
      <p className="mt-2">
        The site displays third-party advertising (Google AdSense) and uses
        third-party analytics (Microsoft Clarity). Those providers operate
        under their own terms. We are not responsible for the content of ads
        or third-party links from this site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">8. Changes to these terms</h2>
      <p className="mt-2">
        We may update these terms from time to time. Substantial changes will
        be flagged on this page with a new &ldquo;Last updated&rdquo; date. Continued use
        of the site after a change constitutes acceptance.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">9. Governing law</h2>
      <p className="mt-2">
        These terms are governed by the laws of England and Wales. Disputes
        will be resolved in the courts of England and Wales unless your local
        consumer-protection law gives you a non-waivable right to a different
        forum.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">10. Contact</h2>
      <p className="mt-2">
        Questions about these terms? Email{" "}
        <a href="mailto:hello@buscalctools.com" className="text-brand-primary underline">
          hello@buscalctools.com
        </a>
        .
      </p>
    </article>
  );
}
