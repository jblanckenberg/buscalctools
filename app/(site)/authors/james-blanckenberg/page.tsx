import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { AUTHOR, authorPersonLdStandalone } from "@/lib/author";
import { SITE_NAME } from "@/lib/site";
import { staticPageMetadata } from "@/lib/seo";
import { TOPICS } from "@/lib/topics";

export const metadata: Metadata = staticPageMetadata({
  slug: `authors/${AUTHOR.slug}`,
  title: `${AUTHOR.name} — Editor at ${SITE_NAME}`,
  description: `Author bio, expertise, and editorial responsibilities for ${AUTHOR.name} at ${SITE_NAME} — every calculator and article on the site.`,
});

export default function AuthorProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorPersonLdStandalone()) }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Authors", href: "/authors/james-blanckenberg" },
          { label: AUTHOR.name },
        ]}
      />

      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          aria-hidden
          className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-brand-dark text-2xl font-semibold text-white"
        >
          {AUTHOR.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Author profile
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            {AUTHOR.name}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{AUTHOR.jobTitle}</p>
        </div>
      </header>

      <section className="space-y-4 text-base leading-relaxed text-gray-700">
        {AUTHOR.longBio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Areas of expertise</h2>
        <p className="mt-2 text-sm text-gray-700">
          James writes and maintains every calculator and article across these
          four topic clusters on {SITE_NAME}:
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${t.slug}`}
                className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-brand-dark hover:border-brand-primary"
              >
                {t.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Editorial responsibilities</h2>
        <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Calculator logic.</strong> Every formula is hand-written,
            cross-checked against standard accounting and finance textbook
            definitions, and disclosed in the &ldquo;See the formula&rdquo;
            accordion on each calculator page.
          </li>
          <li>
            <strong>Source verification.</strong> Tax rates, loan benchmarks,
            and employer-cost percentages come from primary government
            publications (IRS, HMRC, SARS) and reputable industry data.
            Sources are listed and dated on each calculator page.
          </li>
          <li>
            <strong>Reviews and updates.</strong> Tax rates are reviewed at
            least once every 12 months and immediately following any official
            rate change. Articles are reviewed annually.
          </li>
          <li>
            <strong>Corrections.</strong> Every substantive correction is
            tracked publicly on the{" "}
            <Link href="/changelog" className="text-brand-primary underline">
              changelog
            </Link>
            . Report errors via the{" "}
            <Link href="/corrections-policy" className="text-brand-primary underline">
              corrections policy
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Editorial review</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          {SITE_NAME} is currently a single-author publication. Calculators and
          articles ship with an &ldquo;Editorial review by&rdquo; byline that
          reflects the same author until a credentialed reviewer (CFP, CPA, or
          CA(SA)) is recruited. Until then the site is candid about the limits
          of single-author review: calculators are educational tools, not
          professional advice. Always consult a qualified accountant or
          financial adviser for material decisions.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Other sites</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          James also runs{" "}
          <a
            href="https://finncalc.com/"
            rel="noopener"
            className="text-brand-primary underline"
          >
            FinnCalc
          </a>
          , a sister site covering personal-finance calculators (retirement,
          mortgage, take-home pay, investing) across the US, UK, and South
          Africa.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Online identity</h2>
        <ul className="mt-3 ml-6 list-disc space-y-1.5 text-sm">
          {AUTHOR.sameAs.map((url) => {
            const label = url
              .replace(/^https?:\/\/(www\.)?/, "")
              .replace(/\/$/, "");
            return (
              <li key={url}>
                <a
                  href={url}
                  rel="noopener me"
                  className="text-brand-primary underline"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 rounded-xl bg-brand-light p-6">
        <h2 className="text-lg font-semibold text-brand-dark">Contact</h2>
        <p className="mt-2 text-sm text-gray-700">
          Email{" "}
          <a
            href="mailto:hello@buscalctools.com"
            className="text-brand-primary underline"
          >
            hello@buscalctools.com
          </a>{" "}
          for corrections, source enquiries, or media requests. See the{" "}
          <Link href="/editorial-policy" className="text-brand-primary underline">
            editorial policy
          </Link>{" "}
          for the full standards we hold every page to.
        </p>
      </section>
    </div>
  );
}
