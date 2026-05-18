import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { CHANGELOG_ENTRIES, type ChangelogEntryKind } from "@/lib/changelog";
import { CALC_META, formatReviewDate } from "@/lib/calc-meta";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";
import { TOOLS } from "@/lib/tools";

const CHANGELOG_URL = `${SITE_URL}/changelog`;

export const metadata: Metadata = {
  title: "Changelog",
  description: `Substantive updates, reviews, and corrections to ${SITE_NAME} calculators and articles — with the date each page was last reviewed.`,
  alternates: { canonical: CHANGELOG_URL, languages: hreflang(CHANGELOG_URL) },
};

const KIND_LABEL: Record<ChangelogEntryKind, string> = {
  review: "Review",
  correction: "Correction",
  feature: "Feature",
  policy: "Policy",
};

const KIND_BADGE: Record<ChangelogEntryKind, string> = {
  review: "bg-emerald-50 text-emerald-700 border-emerald-200",
  correction: "bg-amber-50 text-amber-800 border-amber-200",
  feature: "bg-sky-50 text-sky-700 border-sky-200",
  policy: "bg-violet-50 text-violet-700 border-violet-200",
};

const changelogLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Changelog",
  url: CHANGELOG_URL,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
  description: `Substantive updates, reviews, and corrections to ${SITE_NAME}.`,
  hasPart: CHANGELOG_ENTRIES.map((e) => ({
    "@type": "CreativeWork",
    headline: e.title,
    datePublished: e.date,
    description: e.summary,
  })),
};

type CalcRow = {
  slug: string;
  name: string;
  lastReviewed: string;
};

function calcRows(): CalcRow[] {
  return TOOLS.map((t) => {
    const meta = CALC_META[t.slug];
    return {
      slug: t.slug,
      name: t.name,
      lastReviewed: meta?.lastReviewed ?? "—",
    };
  }).sort((a, b) => b.lastReviewed.localeCompare(a.lastReviewed));
}

export default function ChangelogPage() {
  const rows = calcRows();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(changelogLd) }}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Changelog" }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Changelog
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Substantive reviews, corrections, and template updates to{" "}
          {SITE_NAME}. Per-calculator review dates also appear in JSON-LD
          (<code className="rounded bg-gray-100 px-1 py-0.5 text-xs">dateModified</code>)
          on each page.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          Report a possible error via the{" "}
          <Link href="/corrections-policy" className="text-brand-primary underline">
            corrections policy
          </Link>
          .
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">Site-wide updates</h2>
        <ol className="mt-4 space-y-6">
          {CHANGELOG_ENTRIES.map((entry, i) => (
            <li
              key={`${entry.date}-${i}`}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <time
                  dateTime={entry.date}
                  className="font-mono text-sm font-semibold text-brand-dark"
                >
                  {formatReviewDate(entry.date)}
                </time>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${KIND_BADGE[entry.kind]}`}
                >
                  {KIND_LABEL[entry.kind]}
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-brand-dark">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700">{entry.summary}</p>
              {entry.affects === "all" ? (
                <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
                  Affects: every calculator
                </p>
              ) : Array.isArray(entry.affects) && entry.affects.length > 0 ? (
                <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
                  Affects:{" "}
                  {entry.affects.map((slug, idx) => (
                    <span key={slug}>
                      <Link href={`/${slug}`} className="text-brand-primary hover:underline">
                        {slug}
                      </Link>
                      {idx < (entry.affects as string[]).length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">
          Current per-calculator review dates
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          The date each calculator was most recently reviewed against primary
          sources (IRS, HMRC, SARS) and its own formula documentation.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3">Last reviewed</th>
                <th scope="col" className="px-4 py-3">Calculator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {rows.map((row) => (
                <tr key={row.slug}>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-600">
                    {row.lastReviewed !== "—"
                      ? formatReviewDate(row.lastReviewed)
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/${row.slug}`}
                      className="font-medium text-brand-dark hover:text-brand-primary"
                    >
                      {row.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-brand-light p-6">
        <h2 className="text-lg font-semibold text-brand-dark">Update cadence</h2>
        <p className="mt-2 text-sm text-gray-700">
          Tax rates are reviewed every 12 months or whenever a region changes
          its headline rate. Interest-rate benchmarks (SBA, BoE, SARB) are
          reviewed quarterly. Articles are reviewed annually. See the{" "}
          <Link href="/editorial-policy" className="text-brand-primary underline">
            editorial policy
          </Link>{" "}
          for the full standards we hold every page to.
        </p>
      </section>
    </article>
  );
}
