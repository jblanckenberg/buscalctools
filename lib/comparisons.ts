// C:\BizProfitCalc\bizapp\lib\comparisons.ts

/**
 * Source of truth for /compare/<slug>/ pages.
 *
 * Mirror this shape in C:\FIN_CALC_SITE\Finance_Calculator_Hub\_build\schemas\comparison.schema.json
 * and C:\FIN_CALC_SITE\Finance_Calculator_Hub\_build\data\comparisons.json.
 */

export type ComparisonFAQ = {
  q: string;
  a: string;
};

export type Comparison = {
  slug: string;
  title: string;
  description: string;
  publishedDate: string; // ISO YYYY-MM-DD
  updatedDate: string;   // ISO YYYY-MM-DD
  embedsCalcSlug: string;
  relatedComparisons: string[];
  faq: ComparisonFAQ[];
  status: "published" | "draft";
  note?: string;
};

export const COMPARISONS_LAST_REVIEWED = "2026-05-16";

export const COMPARISONS: Comparison[] = [
  {
    slug: "best-profit-margin-calculators-2026",
    title: "The 7 Best Profit Margin Calculators in 2026 (Free + Paid)",
    description:
      "Hands-on comparison of the seven profit margin calculators small business owners actually use in 2026 — what each does well, where they fall down, and which to pick.",
    publishedDate: "2026-05-16",
    updatedDate: "2026-05-16",
    embedsCalcSlug: "profit-margin-calculator",
    relatedComparisons: [
      "quickbooks-vs-free-profit-margin-calculator",
      "best-break-even-calculators-2026",
    ],
    faq: [
      {
        q: "Which profit margin calculator is the best for a small business in 2026?",
        a: "[OPERATOR_TO_FILL — ~80 words covering: name the top pick, why it wins for small-business owners, and the single criterion that decided it.]",
      },
      {
        q: "Are free profit margin calculators accurate?",
        a: "[OPERATOR_TO_FILL — ~80 words covering: yes/no, what determines accuracy, when paid tools genuinely outperform.]",
      },
      {
        q: "What features should I look for in a profit margin calculator?",
        a: "[OPERATOR_TO_FILL — ~80 words listing the 4–5 must-have features (gross + net margin, tax-region toggle, scenario comparison, export, mobile-friendly).]",
      },
      {
        q: "Do I need an accounting tool like QuickBooks if I already have a profit margin calculator?",
        a: "[OPERATOR_TO_FILL — ~80 words clarifying the distinction: calculators are decision aids, accounting tools are systems of record.]",
      },
      {
        q: "How often should I recalculate my profit margin?",
        a: "[OPERATOR_TO_FILL — ~80 words covering monthly cadence, plus the events that should trigger an ad-hoc recalc (price change, supplier change, new product launch).]",
      },
    ],
    status: "published",
  },
  {
    slug: "quickbooks-vs-free-profit-margin-calculator",
    title: "QuickBooks vs a Free Profit Margin Calculator: Which Do You Actually Need?",
    description:
      "QuickBooks tracks your books; a free profit margin calculator answers one question fast. Here's when each one earns its keep — and how to use both without paying twice.",
    publishedDate: "2026-05-16",
    updatedDate: "2026-05-16",
    embedsCalcSlug: "profit-margin-calculator",
    relatedComparisons: [
      "best-profit-margin-calculators-2026",
    ],
    faq: [
      {
        q: "Can a free calculator replace QuickBooks for tracking profit margin?",
        a: "[OPERATOR_TO_FILL — ~80 words covering: short answer no, why the system-of-record role is different from the decision-tool role.]",
      },
      {
        q: "Does QuickBooks calculate profit margin automatically?",
        a: "[OPERATOR_TO_FILL — ~80 words explaining where QB surfaces margin, what it shows, and what it doesn't (per-product, scenario, what-if).]",
      },
      {
        q: "What's the fastest way to check the margin on a single product?",
        a: "[OPERATOR_TO_FILL — ~80 words pointing to the free calculator workflow vs the QB report path.]",
      },
      {
        q: "If I'm using QuickBooks, why would I ever open a separate calculator?",
        a: "[OPERATOR_TO_FILL — ~80 words covering pricing decisions, supplier negotiation, sanity-check before sending a quote.]",
      },
    ],
    status: "published",
  },
  {
    slug: "best-break-even-calculators-2026",
    title: "The Best Break-Even Calculators of 2026 (Ranked & Reviewed)",
    description:
      "We ran the same coffee-shop scenario through every major break-even calculator on the web. Here's which ones got the contribution margin right — and which ones quietly skipped it.",
    publishedDate: "2026-05-16",
    updatedDate: "2026-05-16",
    embedsCalcSlug: "break-even-calculator",
    relatedComparisons: [
      "best-profit-margin-calculators-2026",
    ],
    faq: [
      {
        q: "What is the most accurate break-even calculator?",
        a: "[OPERATOR_TO_FILL — ~80 words naming the top pick and the accuracy criterion (multi-product support, contribution margin, chart output).]",
      },
      {
        q: "Do break-even calculators work for service businesses?",
        a: "[OPERATOR_TO_FILL — ~80 words explaining how to map services into the units/CM model, what to use as 'unit' when you sell hours.]",
      },
      {
        q: "Why do break-even calculators give different answers?",
        a: "[OPERATOR_TO_FILL — ~80 words covering input definitions (semi-variable costs, contribution margin handling, target-profit mode).]",
      },
      {
        q: "Can I use a break-even calculator for a multi-product business?",
        a: "[OPERATOR_TO_FILL — ~80 words covering weighted contribution margin and which calculators support it natively.]",
      },
    ],
    status: "published",
  },
  {
    slug: "dcf-vs-multiples-small-business-valuation",
    title: "DCF vs Multiples: Which Small-Business Valuation Method Wins in 2026?",
    description:
      "Discounted cash flow is rigorous; multiples are practical. Here's which method buyers actually use for sub-$5M businesses — and how to run both side-by-side in five minutes.",
    publishedDate: "2026-05-16",
    updatedDate: "2026-05-16",
    embedsCalcSlug: "business-valuation-calculator",
    relatedComparisons: [
      "best-profit-margin-calculators-2026",
    ],
    faq: [
      {
        q: "Should I use DCF or a multiple to value my business?",
        a: "[OPERATOR_TO_FILL — ~80 words covering the rule of thumb (sub-$5M = multiples, >$10M = DCF, in-between = both for triangulation).]",
      },
      {
        q: "Why do buyers prefer EBITDA multiples for small businesses?",
        a: "[OPERATOR_TO_FILL — ~80 words covering speed of comparison, capital-structure neutrality, owner-comp adjustments.]",
      },
      {
        q: "How accurate is a DCF for a small business?",
        a: "[OPERATOR_TO_FILL — ~80 words covering forecast-error sensitivity, terminal-value dominance, GIGO risk.]",
      },
      {
        q: "What multiple should I expect for a service business?",
        a: "[OPERATOR_TO_FILL — ~80 words giving range (2–4× EBITDA for most), and what pushes you up or down within that band.]",
      },
      {
        q: "Can I combine DCF and multiples for a defensible valuation?",
        a: "[OPERATOR_TO_FILL — ~80 words covering triangulation, sensitivity tables, how brokers actually present a range to buyers.]",
      },
    ],
    status: "published",
  },
];

export const PUBLISHED_COMPARISONS = COMPARISONS.filter(
  (c) => c.status === "published",
);

export function comparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function comparisonsForCalc(calcSlug: string): Comparison[] {
  return PUBLISHED_COMPARISONS.filter((c) => c.embedsCalcSlug === calcSlug);
}
