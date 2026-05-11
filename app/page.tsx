import Link from "next/link";
import type { Metadata } from "next";
import HomeSchema from "@/components/shared/HomeSchema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Business Calculators — Profit, ROI, Break-Even & More",
  description:
    "Free online business calculators for profit margin, break-even, ROI, markup, pricing, invoicing and more. Instant results. No sign-up required. Works for USA, UK & South Africa.",
  alternates: { canonical: SITE_URL },
};

const phase1 = [
  { slug: "profit-margin-calculator", name: "Profit Margin Calculator", desc: "Calculate gross and net profit margin instantly." },
  { slug: "markup-calculator", name: "Markup Calculator", desc: "Convert cost price to selling price at any markup %." },
  { slug: "break-even-calculator", name: "Break-Even Calculator", desc: "Find the units and revenue needed to break even." },
  { slug: "roi-calculator", name: "ROI Calculator", desc: "Calculate return on investment from any spend." },
  { slug: "pricing-calculator", name: "Pricing Calculator", desc: "Set the optimal selling price from cost and margin." },
  { slug: "invoice-calculator", name: "Invoice Calculator", desc: "Build invoice totals with tax in seconds." },
  { slug: "freelance-rate-calculator", name: "Freelance Rate Calculator", desc: "Calculate a sustainable hourly rate for freelancers." },
  { slug: "cash-flow-calculator", name: "Cash Flow Calculator", desc: "Project 12-month cash flow from income and expenses." },
  { slug: "net-profit-calculator", name: "Net Profit Calculator", desc: "Calculate true net profit after all costs and tax." },
  { slug: "ecommerce-profit-calculator", name: "Ecommerce Profit Calculator", desc: "True profit per unit after fees, shipping and ad spend." },
  { slug: "cost-per-unit-calculator", name: "Cost Per Unit Calculator", desc: "Calculate production cost per unit from total costs." },
  { slug: "business-loan-calculator", name: "Business Loan Calculator", desc: "Calculate monthly repayments and total interest." },
];

const phase2 = [
  { slug: "payback-period-calculator", name: "Payback Period Calculator", desc: "How long until an investment pays for itself." },
  { slug: "burn-rate-calculator", name: "Burn Rate & Runway Calculator", desc: "Months of runway from cash on hand and monthly burn." },
  { slug: "business-valuation-calculator", name: "Business Valuation Calculator", desc: "Estimate business value from revenue, profit and multiples." },
  { slug: "revenue-growth-calculator", name: "Revenue Growth Rate Calculator", desc: "Calculate growth rate between two periods." },
  { slug: "employee-cost-calculator", name: "Employee Cost Calculator", desc: "True cost of hiring after taxes, benefits and overhead." },
  { slug: "discount-calculator", name: "Discount & Sale Price Calculator", desc: "Sale price and savings from any discount %." },
];

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
          Launch tools
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {phase1.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-brand-primary hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-brand-dark">{tool.name}</h3>
              <p className="text-sm text-gray-600">{tool.desc}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-primary">
                Use Calculator →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Coming soon
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {phase2.map((tool) => (
            <div
              key={tool.slug}
              aria-disabled
              className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-500">{tool.name}</h3>
                <span className="rounded-full bg-brand-light px-2 py-0.5 text-xs font-medium text-brand-dark">
                  Soon
                </span>
              </div>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </div>
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
