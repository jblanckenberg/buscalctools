import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { CALC_META, type CalcCategory } from "@/lib/calc-meta";
import { staticPageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { TOOLS, type Tool } from "@/lib/tools";
import { TOPICS } from "@/lib/topics";

const INDEX_URL = `${SITE_URL}/methodology`;

export const metadata: Metadata = staticPageMetadata({
  slug: "methodology",
  title: "Methodology — Sources, Formulas, Assumptions | BusCalcTools",
  description:
    "The reference sources, default assumptions, and formula derivations behind every calculator. Audit trail for transparency.",
});

type CategoryGroup = {
  category: CalcCategory;
  topicSlug: string;
  topicName: string;
  tools: Tool[];
};

function groupByCategory(): CategoryGroup[] {
  return TOPICS.map((topic) => {
    const tools = topic.calcSlugs
      .map((slug) => TOOLS.find((t) => t.slug === slug))
      .filter((t): t is Tool => Boolean(t));
    const firstMeta = tools.length > 0 ? CALC_META[tools[0].slug] : undefined;
    return {
      category: (firstMeta?.category ?? topic.name) as CalcCategory,
      topicSlug: topic.slug,
      topicName: topic.name,
      tools,
    };
  }).filter((g) => g.tools.length > 0);
}

export default function MethodologyIndexPage() {
  const groups = groupByCategory();

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Methodology",
    url: INDEX_URL,
    description: `Formulas, primary sources, and assumptions for every calculator on ${SITE_NAME}.`,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
    hasPart: TOOLS.map((t) => ({
      "@type": "TechArticle",
      headline: `${t.name} — Methodology`,
      url: `${SITE_URL}/methodology/${t.slug}`,
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Methodology" }]} />

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Methodology
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          How every calculator on {SITE_NAME} works — formula, step-by-step
          calculation, primary sources, and assumptions. Each page lists the
          date it was last reviewed.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          For the underlying editorial standards, see the{" "}
          <Link href="/editorial-policy" className="text-brand-primary underline">
            editorial policy
          </Link>
          . For the public log of substantive updates, see the{" "}
          <Link href="/changelog" className="text-brand-primary underline">
            changelog
          </Link>
          .
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.topicSlug} className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold text-brand-dark">
              {group.category}
            </h2>
            <Link
              href={`/topics/${group.topicSlug}`}
              className="text-sm font-medium text-brand-primary hover:underline"
            >
              Topic hub →
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/methodology/${tool.slug}`}
                  className="block rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-brand-primary"
                >
                  <p className="text-sm font-semibold text-brand-dark">
                    {tool.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">{tool.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-12 rounded-xl bg-brand-light p-6">
        <h2 className="text-lg font-semibold text-brand-dark">
          Spotted something wrong?
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Methodology pages and rate defaults are reviewed annually and after
          any official rate change. If a number, source, or step is wrong, see
          the{" "}
          <Link href="/corrections-policy" className="text-brand-primary underline">
            corrections policy
          </Link>{" "}
          for how to report it.
        </p>
      </section>
    </article>
  );
}
