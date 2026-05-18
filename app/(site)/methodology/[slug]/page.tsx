import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AuthorCard from "@/components/shared/AuthorCard";
import { AUTHOR_PROFILE_URL, authorPersonLd, reviewerPersonLd } from "@/lib/author";
import { CALC_META, CATEGORY_SLUG, formatReviewDate } from "@/lib/calc-meta";
import { hreflang } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { TOOLS, toolBySlug } from "@/lib/tools";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  const meta = CALC_META[slug];
  if (!tool || !meta) return {};

  const url = `${SITE_URL}/methodology/${slug}`;
  const title = `${tool.name} — Methodology & Sources`;
  const description = `How the ${tool.name.toLowerCase()} works on ${SITE_NAME}: formula, step-by-step calculation, assumptions, and primary sources for the USA, UK, and South Africa.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: hreflang(url) },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  const meta = CALC_META[slug];
  if (!tool || !meta) notFound();

  const calcUrl = `/${slug}`;
  const methodologyUrl = `${SITE_URL}/methodology/${slug}`;
  const topicSlug = CATEGORY_SLUG[meta.category];

  const ld = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${tool.name} — Methodology`,
    description: `Formula, calculation steps, assumptions, and primary sources for the ${tool.name.toLowerCase()} on ${SITE_NAME}.`,
    mainEntityOfPage: methodologyUrl,
    url: methodologyUrl,
    datePublished: meta.lastReviewed,
    dateModified: meta.lastReviewed,
    author: authorPersonLd(),
    reviewedBy: reviewerPersonLd(),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "SoftwareApplication",
      name: tool.name,
      url: `${SITE_URL}${calcUrl}`,
      applicationCategory: "BusinessApplication",
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Methodology", href: "/methodology" },
          { label: tool.name },
        ]}
      />

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Methodology
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          {tool.name} — Methodology
        </h1>
        <p className="mt-3 text-lg text-gray-600">{meta.featuredAnswer}</p>
        <p className="mt-3 text-sm text-gray-500">
          Last reviewed:{" "}
          <time dateTime={meta.lastReviewed}>
            {formatReviewDate(meta.lastReviewed)}
          </time>
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">
          What this calculator computes
        </h2>
        <ul className="mt-3 ml-6 list-disc space-y-1.5">
          {meta.featureList.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">
          Step-by-step calculation
        </h2>
        <p className="mt-2 text-sm text-gray-600">{meta.howToDescription}</p>
        <ol className="mt-4 space-y-4">
          {meta.howToSteps.map((step, i) => (
            <li
              key={step.name}
              id={`step-${i + 1}`}
              className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <span
                aria-hidden
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-semibold text-white"
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-dark">
                  {step.name}
                </p>
                <p className="mt-1 text-sm text-gray-700">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {meta.methodologyNote && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand-dark">
            Assumptions and overrides
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            {meta.methodologyNote}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Every region default on the calculator is editable. If your effective
            rate, fee, or threshold differs from the headline figure shown, type
            your own number into the field — the calculator recomputes
            instantly without leaving this page.
          </p>
        </section>
      )}

      {meta.sources && meta.sources.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand-dark">
            Primary sources
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Region-tagged primary sources for the default rates, thresholds, and
            benchmarks used in this calculator.
          </p>
          <ul className="mt-4 space-y-2">
            {meta.sources.map((s) => (
              <li key={s.url} className="text-sm">
                {s.region && (
                  <span className="mr-2 inline-block min-w-[32px] rounded bg-brand-light px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-dark">
                    {s.region}
                  </span>
                )}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">
          Review cadence and corrections
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          This methodology and the underlying rate defaults are reviewed at
          least annually, and immediately following any change to the headline
          rate from IRS, HMRC, or SARS. Every substantive update is recorded on
          the public{" "}
          <Link href="/changelog" className="text-brand-primary underline">
            changelog
          </Link>
          . Spotted an error? See the{" "}
          <Link href="/corrections-policy" className="text-brand-primary underline">
            corrections policy
          </Link>{" "}
          for how to report it.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          See the full{" "}
          <Link href="/editorial-policy" className="text-brand-primary underline">
            editorial policy
          </Link>{" "}
          for the standards every page on {SITE_NAME} is held to.
        </p>
      </section>

      <section className="mt-12 rounded-xl bg-brand-light p-6">
        <h2 className="text-lg font-semibold text-brand-dark">
          Use the calculator
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Open the{" "}
          <Link href={calcUrl} className="font-semibold text-brand-primary underline">
            {tool.name}
          </Link>{" "}
          to put this methodology to work. Or browse other{" "}
          <Link
            href={`/topics/${topicSlug}`}
            className="font-semibold text-brand-primary underline"
          >
            {meta.category}
          </Link>{" "}
          calculators.
        </p>
      </section>

      <AuthorCard />
    </article>
  );
}
