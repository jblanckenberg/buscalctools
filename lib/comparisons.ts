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
      "Hands-on comparison of the 7 profit margin calculators small-business owners use in 2026 — what each does well, where they fall, and which to pick.",
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
        a: "For most small-business owners, BusCalcTools wins because it handles the one thing nearly every other calculator ignores: net margin with overhead, fees, and tax built in. Most free margin calculators stop at gross margin and call it a day, which gives you a number that looks great until you remember rent, Stripe fees, and VAT. The deciding criterion was simple: does the calculator return a number you can actually price against, or one you have to mentally adjust? BusCalcTools returns the first kind. Full disclosure, I built it.",
      },
      {
        q: "Are free profit margin calculators accurate?",
        a: "Yes — the math itself is two lines of code and every free calculator I tested returns the same gross margin. Accuracy is decided by what the calculator includes alongside cost: tax region, payment processor fees, shipping, overhead. Free tools that ignore those return a technically correct number you can't actually price against. Paid tools outperform when they pull cost data straight from your bookkeeping ledger (QuickBooks, Xero) — that removes the typo-risk of retyping. Otherwise, paying for arithmetic is bad value.",
      },
      {
        q: "What features should I look for in a profit margin calculator?",
        a: "Five things to insist on. One, both gross AND net margin (gross only is a homework tool). Two, a tax-region toggle for US, UK, and SA — VAT and sales tax are not interchangeable. Three, the ability to compare two or three price scenarios side-by-side without retyping. Four, a way to export or screenshot the result for a supplier email. Five, mobile-friendly — you'll do half your margin checks from a phone on the warehouse floor. Anything beyond that is bonus.",
      },
      {
        q: "Do I need an accounting tool like QuickBooks if I already have a profit margin calculator?",
        a: "Yes, they do different jobs. A profit margin calculator answers \"what would my margin be at this price?\" — a forward-looking decision aid. QuickBooks (or Xero, FreshBooks, Wave) tracks \"what actually happened\" — your system of record for invoices, expenses, VAT returns, and the P&L your accountant signs off on. A calculator can't file your taxes; QuickBooks isn't built for 20-second pricing experiments. Most owners need both: the calc for decisions, the accounting tool for the trail.",
      },
      {
        q: "How often should I recalculate my profit margin?",
        a: "Monthly as a baseline — review the prior month's actuals against your target. But the more important habit is event-driven recalculation. Run a fresh margin check any time you change a price, switch a supplier (or your existing one raises a cost), launch a new SKU, add a new sales channel with different fees, or cross a VAT-registration threshold. Most margin compression happens between those quarterly reviews when nobody was watching. Five minutes with a calculator before each event prevents the surprise.",
      },
    ],
    status: "published",
  },
  {
    slug: "quickbooks-vs-free-profit-margin-calculator",
    title: "QuickBooks vs a Free Profit Margin Calculator (2026)",
    description:
      "QuickBooks tracks your books; a free profit margin calculator answers one question fast. When each earns its keep — and how to use both.",
    publishedDate: "2026-05-16",
    updatedDate: "2026-05-16",
    embedsCalcSlug: "profit-margin-calculator",
    relatedComparisons: [
      "best-profit-margin-calculators-2026",
    ],
    faq: [
      {
        q: "Can a free calculator replace QuickBooks for tracking profit margin?",
        a: "No. They do opposite jobs. QuickBooks is your system of record — it stores every transaction, reconciles to your bank, supports VAT returns, and generates the P&L your accountant relies on. A free calculator is a sandbox for hypothetical scenarios. The calculator can't track historical margin trends, can't tie back to actuals, and can't be audited. The right move is to use both: QuickBooks for the bookkeeping truth, a free calculator for the \"what if we priced this at £49 instead\" question that should take 20 seconds.",
      },
      {
        q: "Does QuickBooks calculate profit margin automatically?",
        a: "Yes. QuickBooks Online and Desktop both surface gross margin on the Profit & Loss report, and you can filter by Product/Service to drill into a single SKU. The catch: it only works on transactions you've already recorded. If you haven't sold the product yet, there's nothing to calculate. QB answers \"what was my margin last month\" perfectly. It doesn't answer \"what would my margin be at $39 instead of $49\" — that's a forward-looking question, and you need a different tool.",
      },
      {
        q: "What's the fastest way to check the margin on a single product?",
        a: "A free calculator, by a wide margin. Type the price and cost into BusCalcTools or Calculator Soup, get the answer in five seconds. The QB equivalent is Reports → Profit & Loss → Customise → add Product/Service filter → run report — at least six clicks, and only works if you've already recorded a sale of that SKU. For a one-off check on a product you haven't sold yet, QB literally can't answer the question. For audited monthly trends, QB is the only honest answer. Different tools, different jobs.",
      },
      {
        q: "If I'm using QuickBooks, why would I ever open a separate calculator?",
        a: "Three jobs QuickBooks is bad at. Pricing a new product (no transaction history to report on). Supplier negotiation, where you're modelling \"if wholesale drops 8%, what does that do to my margin?\" — that's hypothetical, not historical. And sanity-checking a quote before it goes out to a customer, where speed matters more than audit-grade precision. A free calculator handles all three in seconds; QB needs the data to already exist before it can answer. Pay for QB for the bookkeeping; use a calculator for the decisions.",
      },
    ],
    status: "published",
  },
  {
    slug: "best-break-even-calculators-2026",
    title: "The Best Break-Even Calculators of 2026 (Ranked & Reviewed)",
    description:
      "We ran the same coffee-shop scenario through every major break-even calculator. Which ones got contribution margin right — and which skipped it.",
    publishedDate: "2026-05-16",
    updatedDate: "2026-05-16",
    embedsCalcSlug: "break-even-calculator",
    relatedComparisons: [
      "best-profit-margin-calculators-2026",
    ],
    faq: [
      {
        q: "What is the most accurate break-even calculator?",
        a: "BusCalcTools, for the unglamorous reason that it handles weighted contribution margin for multi-product businesses out of the box. Most break-even calculators on page one of Google assume one SKU at one price — useful for a homework problem, useless for a coffee shop selling coffee, pastries, and sandwiches at different margins. The accuracy criterion is the contribution-margin ratio. If a calculator can't return one weighted across your product mix, it's an arithmetic toy, not a business tool. NetMBA's Excel worksheet is a strong second if you're comfortable in spreadsheets.",
      },
      {
        q: "Do break-even calculators work for service businesses?",
        a: "Yes — you just have to translate. For a consultancy, the \"unit\" is a billable hour (or a day, or a fixed-fee engagement). Selling price = your hourly rate; variable cost = direct cost of delivering that hour (contractor pay, software seat, travel). Contribution margin per hour = rate minus variable cost. Break-even = monthly fixed costs (rent, salaries you can't flex, software) divided by CM per hour. That tells you the minimum billable hours per month before profit starts. Same math, different unit.",
      },
      {
        q: "Why do break-even calculators give different answers?",
        a: "Three usual culprits. First, what counts as variable vs fixed — some calculators treat shipping as fixed (wrong), others as part of variable cost (right). Second, how they handle semi-variable costs like utilities that have a base charge plus a usage component. Third, whether the calculator returns straight break-even (zero profit) or supports a target-profit mode (revenue needed to hit, say, £30k profit). A 15% spread between two calculators on the same inputs almost always traces back to one of these three definition differences.",
      },
      {
        q: "Can I use a break-even calculator for a multi-product business?",
        a: "Yes, but most online calculators don't actually handle it correctly. The math is weighted contribution margin: each product's CM ratio weighted by its share of revenue, summed, then fixed costs divided by the blended ratio. Get the mix wrong (say a new high-margin pastry line grows faster than coffee) and your break-even quietly moves. BusCalcTools supports up to three SKUs with weighted-CM built in. NetMBA's Excel template handles as many as you're willing to add columns for. Almost everything else is single-product only.",
      },
    ],
    status: "published",
  },
  {
    slug: "dcf-vs-multiples-small-business-valuation",
    title: "DCF vs Multiples: Small-Business Valuation in 2026",
    description:
      "DCF is rigorous; multiples are practical. Which method buyers actually use for sub-$5M businesses — and how to run both side-by-side in 5 minutes.",
    publishedDate: "2026-05-16",
    updatedDate: "2026-05-16",
    embedsCalcSlug: "business-valuation-calculator",
    relatedComparisons: [
      "best-profit-margin-calculators-2026",
    ],
    faq: [
      {
        q: "Should I use DCF or a multiple to value my business?",
        a: "Use multiples for sub-$5M businesses, DCF for $10M+, and run both as a triangulation in between. The buyer pool decides the method. Small-business buyers — other owner-operators, industry strategics, search funds — pattern-match against recent comparables they know about (BizBuySell, IBBA Market Pulse). Larger buyers — PE firms, corporate dev — run DCFs internally regardless of what you pitch. Mixing both gives you defensible bookends: multiples for what the market will pay, DCF for whether the cash flows justify a premium.",
      },
      {
        q: "Why do buyers prefer EBITDA multiples for small businesses?",
        a: "EBITDA strips out everything below the line that varies between buyer and seller. Different debt structures, different tax positions, different depreciation policies — EBITDA ignores all of it, leaving an apples-to-apples cash-flow proxy that buyers can compare across deals quickly. For small businesses specifically, buyers usually adjust further to SDE (Seller's Discretionary Earnings) by adding back owner compensation and one-time costs. That gets the number the new owner can actually take home. Five minutes to compute, comparable to every other deal they've seen.",
      },
      {
        q: "How accurate is a DCF for a small business?",
        a: "Honestly, mostly art. A small-business DCF has two killer sensitivities: the discount rate and the terminal growth rate. A one-percentage-point change in WACC moves the answer 10-15%. Terminal value typically accounts for half to two-thirds of the total, and that figure leans on a perpetuity assumption that punishes optimism. For businesses under $5M EBITDA, where forecasts are inherently speculative and the buyer pool is unsophisticated about DCF mechanics, the model is best used as a sanity check against your multiples number — not as a primary valuation.",
      },
      {
        q: "What multiple should I expect for a service business?",
        a: "For a typical service business — agency, consultancy, accountancy, trades — expect 2-4× EBITDA, with most deals landing 2.5-3.5×. Up within that band: recurring revenue (retainers, contracts), low customer concentration, owner-independent operations, clean books, and strong gross margins. Down within the band: heavy owner dependence (the business IS you), one client over 25% of revenue, high churn, or messy bookkeeping. For sub-$2M EBITDA the market usually quotes SDE multiples (1.5-3×) instead. The IBBA Market Pulse publishes current quarterly medians.",
      },
      {
        q: "Can I combine DCF and multiples for a defensible valuation?",
        a: "Yes, and serious brokers usually do. The standard format: lead with the multiples range as the anchor (\"comparable transactions price this business between $2.3M and $3.1M\"), then back it up with a DCF showing the cash flows justify a premium at the top of the range. Include a sensitivity table — how the DCF answer moves at WACC of 12%/14%/16% and terminal growth of 2%/3%/4%. Buyers respect the rigour and discount the headline number less. Sellers get a defensible argument for the upper end.",
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
