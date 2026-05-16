import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const DISCLOSURE_URL = `${SITE_URL}/disclosure`;

export const metadata: Metadata = {
  title: "Advertising & Affiliate Disclosure",
  description:
    "How BusCalcTools makes money — display advertising via Google AdSense. We have no affiliate relationships and no sponsored content.",
  alternates: { canonical: DISCLOSURE_URL, languages: hreflang(DISCLOSURE_URL) },
};

export default function DisclosurePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-gray-700">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclosure" }]} />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
          Advertising &amp; Affiliate Disclosure
        </h1>
        <p className="mt-2 text-xs text-gray-500">Last updated: 2026-05-12</p>
      </header>

      <p>
        BusCalcTools is free to use. Here&apos;s how the site makes money and
        what that means for the content you read.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">How we make money</h2>
      <p className="mt-2">
        We display ads on the site via{" "}
        <strong>Google AdSense</strong> (publisher ID{" "}
        <code className="text-xs">ca-pub-5092336325075679</code>). Google matches
        ads to the content of each page and to general signals about the
        visitor. We get paid a small amount when those ads are seen or
        clicked.
      </p>
      <p className="mt-3">
        This is the <strong>only</strong> source of revenue for the site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">What we don&apos;t do</h2>
      <ul className="mt-2 ml-6 list-disc space-y-2">
        <li>
          <strong>No affiliate links.</strong> When we mention products,
          tools, or services in articles, we don&apos;t earn a commission if
          you click through. We mention them because they&apos;re relevant,
          not because we&apos;re paid to.
        </li>
        <li>
          <strong>No sponsored content.</strong> Brands cannot pay to be
          featured in articles or have their tools listed in calculator
          comparisons. If you spot a &ldquo;sponsored&rdquo; or paid placement label
          on this site, it&apos;s a mistake — please email us.
        </li>
        <li>
          <strong>No paid product reviews.</strong> We don&apos;t accept money,
          free products, or services in exchange for coverage.
        </li>
        <li>
          <strong>No email-list monetisation.</strong> We don&apos;t maintain a
          marketing list. Nothing is sold.
        </li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">Why this matters for you</h2>
      <p className="mt-2">
        The articles you read here aren&apos;t shaped by commercial relationships
        with anyone we mention. When we recommend a particular pricing
        approach, a specific loan structure, or a particular calculator
        method, it&apos;s because we genuinely think it&apos;s the right
        approach — not because anyone paid for that recommendation.
      </p>
      <p className="mt-3">
        The flip side is that the ads on the page are placed by Google&apos;s
        algorithm, not us. We don&apos;t hand-pick advertisers and we have no
        contractual relationship with the companies whose ads you see. Their
        appearance is not an endorsement.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">Future revenue changes</h2>
      <p className="mt-2">
        If we ever add affiliate links or sponsored content, this page will
        be updated <strong>before</strong> those links go live, and individual
        affiliate links will be marked inline with a clear &ldquo;affiliate&rdquo; tag.
        For now: display ads only.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">Compliance with advertising standards</h2>
      <p className="mt-2">
        This disclosure is provided to comply with:
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1">
        <li><strong>US FTC</strong> Endorsement Guides (16 CFR Part 255).</li>
        <li><strong>UK ASA / CAP Code</strong> rules on identification of advertising.</li>
        <li><strong>SA ASA</strong> code of advertising practice.</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">Questions</h2>
      <p className="mt-2">
        Email{" "}
        <a href="mailto:hello@buscalctools.com" className="text-brand-primary underline">
          hello@buscalctools.com
        </a>
        .
      </p>
    </article>
  );
}
