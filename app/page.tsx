import Link from "next/link";
import type { Metadata } from "next";
import HomeSchema from "@/components/shared/HomeSchema";
import { SITE_URL } from "@/lib/site";
import { PHASE_1, PHASE_2 } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Business Calculators — Profit, ROI, Break-Even & More",
  description:
    "Free online business calculators for profit margin, break-even, ROI, markup, pricing, invoicing and more. Instant results. No sign-up required. Works for USA, UK & South Africa.",
  alternates: { canonical: SITE_URL },
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
        <h2 className="text-lg font-semibold text-brand-dark">Why are these free?</h2>
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
