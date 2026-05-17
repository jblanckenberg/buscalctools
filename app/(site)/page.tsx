import Link from "next/link";
import type { Metadata } from "next";
import HomeSchema from "@/components/shared/HomeSchema";
import { SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";
import { PHASE_1, PHASE_2 } from "@/lib/tools";
import { TOPICS } from "@/lib/topics";

export const metadata: Metadata = {
  // Absolute prevents the layout template "%s | BusCalcTools" from
  // double-appending the brand suffix that's already in the title.
  title: {
    absolute: "Free Business Calculators — Profit, Pricing & ROI | BusCalcTools",
  },
  description:
    "18 free business calculators for profit, pricing, break-even, ROI, loans & cash flow. Instant results, no sign-up. USA, UK, South Africa.",
  alternates: { canonical: SITE_URL, languages: hreflang(SITE_URL) },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <HomeSchema />
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          Free Business Calculators for Profit, Pricing &amp; Growth
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          18 free, instant tools for small business owners and freelancers.
          No sign-up. No ads above the calculator. Just results.
        </p>
      </section>

      <section className="mb-10 rounded-2xl border border-gray-200 bg-brand-light/40 p-6">
        <h2 className="text-lg font-semibold text-brand-dark">Browse by topic</h2>
        <p className="mt-1 text-sm text-gray-600">
          Pick the category that matches your decision.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${t.slug}`}
                className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Profit &amp; pricing
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PHASE_1.map((tool) => (
            <ToolCard key={tool.slug} slug={tool.slug} name={tool.name} desc={tool.desc} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Planning &amp; valuation
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PHASE_2.map((tool) => (
            <ToolCard key={tool.slug} slug={tool.slug} name={tool.name} desc={tool.desc} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-xl bg-brand-light p-6">
        <h2 className="text-base font-semibold text-brand-dark">Why are these free?</h2>
        <p className="mt-2 text-sm text-gray-700">
          These tools are free forever. We earn a small amount from display
          advertising — it costs you nothing.
        </p>
      </section>
    </div>
  );
}

function ToolCard({ slug, name, desc }: { slug: string; name: string; desc: string }) {
  return (
    <Link
      href={`/${slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-brand-primary hover:shadow-md"
    >
      <h3 className="mb-2 text-lg font-semibold text-brand-dark">{name}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
      <span className="mt-3 inline-block text-sm font-medium text-brand-primary">
        Use Calculator →
      </span>
    </Link>
  );
}
