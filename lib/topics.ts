import { POSTS, type BlogPost } from "@/lib/blog/posts";
import { TOOLS, type Tool } from "@/lib/tools";

export type Topic = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  body: string[]; // paragraphs after intro
  calcSlugs: string[];
  postSlugs: string[];
  siblings: { slug: string; name: string }[]; // links to other topic hubs
};

export const TOPICS: Topic[] = [
  {
    slug: "profit-and-pricing",
    name: "Profit & Pricing",
    title: "Profit & Pricing Calculators and Guides",
    description:
      "Free calculators and step-by-step guides for profit margin, pricing, markup, net profit, and ecommerce profitability — for USA, UK, and South Africa businesses.",
    h1: "Profit, Margin & Pricing Calculators",
    intro:
      "Six calculators and ten guides for setting prices, measuring profit, and protecting margin. Whether you're pricing a new product, reviewing margins after a cost increase, or trying to understand why ecommerce profit always disappoints, this hub has the tool and the explainer.",
    body: [
      "Profit is the single most-watched number in small business — and the most misunderstood. Gross profit, operating profit, and net profit are three different numbers, each answering a different question. Margin and markup are not the same percentage. Cost-plus and value-based pricing produce wildly different prices for the same product.",
      "Start with the calculator that matches the decision you're making. If you're pricing a new product, use the Pricing Calculator. If you want to understand whether your existing margin is healthy, use the Profit Margin Calculator. If you're an ecommerce seller wondering where your money went, use the Ecommerce Profit Calculator — Amazon FBA fees alone can take 30–40% of the selling price before you've paid for shipping or ads.",
      "Then pair the result with the article that explains what to do next. Each guide cross-links back to the relevant calculator so you can act on what you've read.",
    ],
    calcSlugs: [
      "profit-margin-calculator",
      "markup-calculator",
      "pricing-calculator",
      "net-profit-calculator",
      "ecommerce-profit-calculator",
      "discount-calculator",
    ],
    postSlugs: [
      "profit-margin-vs-markup-difference",
      "what-is-a-good-profit-margin",
      "gross-profit-vs-net-profit",
      "ebitda-vs-net-profit",
      "cost-plus-pricing-explained",
      "value-based-pricing-vs-cost-plus",
      "discount-pricing-strategy",
      "amazon-fba-fees-explained",
      "etsy-seller-fees-explained",
    ],
    siblings: [
      { slug: "break-even-and-cash-flow", name: "Break-Even & Cash Flow" },
      { slug: "freelance-and-hiring", name: "Freelance & Hiring" },
      { slug: "funding-and-valuation", name: "Funding & Valuation" },
    ],
  },

  {
    slug: "break-even-and-cash-flow",
    name: "Break-Even & Cash Flow",
    title: "Break-Even & Cash Flow Calculators and Guides",
    description:
      "Calculators and guides for break-even analysis, cost per unit, 12-month cash flow projection, burn rate, and invoicing — for small businesses and startups.",
    h1: "Break-Even & Cash Flow Calculators",
    intro:
      "Five calculators and the operational guides that go with them. These tools answer the most pressing operational questions in early-stage business: how many units must you sell to cover costs, when does cash run out, and which months will be tight.",
    body: [
      "Profitable businesses go bust every day — almost always because of timing, not profit. The customer paid in 60 days; rent was due tomorrow. Cash flow management is what separates businesses that survive their first 24 months from those that don't.",
      "Start with the Break-Even Calculator if you're validating a new product or pricing decision. Use the Cash Flow Calculator monthly to project 12 months ahead — most cash crises are visible 3–6 months out if you bother to look. The Burn Rate Calculator is specifically for startups burning investor capital; it tells you exactly how many months until cash exhaustion.",
      "Pair the calculation with the guide. The break-even examples article walks through five real industries; the cash flow management guide gives you the seven habits that prevent a crunch.",
    ],
    calcSlugs: [
      "break-even-calculator",
      "cost-per-unit-calculator",
      "cash-flow-calculator",
      "burn-rate-calculator",
      "invoice-calculator",
    ],
    postSlugs: [
      "how-to-calculate-break-even-point",
      "break-even-analysis-examples",
      "how-to-reduce-cost-per-unit",
      "cash-flow-management-small-business",
      "startup-runway-burn-rate-guide",
      "uk-invoice-requirements",
    ],
    siblings: [
      { slug: "profit-and-pricing", name: "Profit & Pricing" },
      { slug: "freelance-and-hiring", name: "Freelance & Hiring" },
      { slug: "funding-and-valuation", name: "Funding & Valuation" },
    ],
  },

  {
    slug: "freelance-and-hiring",
    name: "Freelance & Hiring",
    title: "Freelance Rate & Employee Cost Calculators",
    description:
      "Free calculators and guides for setting freelance rates, calculating true employee cost, building invoices, and choosing between hiring and contracting — UK, US, SA.",
    h1: "Freelance & Hiring Calculators",
    intro:
      "Three calculators and four guides on the people side of business — what to charge as a freelancer, what an employee actually costs after taxes and overhead, and how to decide between hiring versus contracting.",
    body: [
      "Most freelancers set their rates by looking at competitor pricing on job boards and undercutting by 10%. Most first-time employers offer a salary based on the gross number without realising the true cost is 25–45% higher. Both mistakes are avoidable with five minutes of arithmetic.",
      "The Freelance Rate Calculator works backward from your annual income goal, billable hours, and tax buffer to a defensible hourly rate. The Employee Cost Calculator does the inverse for businesses — it adds employer taxes, benefits, equipment, training, and overhead on top of the salary to show the all-in annual cost per hire.",
      "The cross-decision is hire-versus-contract: at what day rate does a contractor cost less than a salaried employee? The guide answers that with a side-by-side cost comparison for a typical mid-senior role.",
    ],
    calcSlugs: [
      "freelance-rate-calculator",
      "employee-cost-calculator",
      "invoice-calculator",
    ],
    postSlugs: [
      "how-much-to-charge-as-freelancer",
      "freelance-rates-by-industry-uk",
      "true-cost-of-an-employee",
      "employee-vs-contractor-cost-comparison",
    ],
    siblings: [
      { slug: "profit-and-pricing", name: "Profit & Pricing" },
      { slug: "break-even-and-cash-flow", name: "Break-Even & Cash Flow" },
      { slug: "funding-and-valuation", name: "Funding & Valuation" },
    ],
  },

  {
    slug: "funding-and-valuation",
    name: "Funding & Valuation",
    title: "ROI, Loan, Valuation & Growth Calculators",
    description:
      "Free calculators and guides for ROI, business loan amortisation, payback period, business valuation, and revenue growth — for owners, founders, and investors.",
    h1: "Funding, ROI & Valuation Calculators",
    intro:
      "Five calculators and seven guides that answer the big-decision questions in business finance — whether to take a loan, whether an investment is worth making, what your business is worth to a buyer, and whether your growth rate matches investor expectations.",
    body: [
      "These are the calculations behind every major financial decision a business owner makes. The ROI Calculator and Payback Period Calculator answer the same question from two angles — total return and speed of recovery. The Business Loan Calculator produces a monthly payment and amortisation table for any loan amount and term. The Business Valuation Calculator runs three valuation methods side-by-side so you can defend an asking price.",
      "Use the calculators alongside the guides. The payback-vs-ROI article explains which metric to use when. The how-to-value-a-business article walks through the multiples buyers actually pay (most owners overestimate by 50%+). The SBA vs conventional loan article compares total cost on a $200k example — the answer is often surprising.",
      "Whether you're raising capital, deploying capital, or preparing to exit, the maths starts here.",
    ],
    calcSlugs: [
      "roi-calculator",
      "business-loan-calculator",
      "payback-period-calculator",
      "business-valuation-calculator",
      "revenue-growth-calculator",
    ],
    postSlugs: [
      "how-to-calculate-roi-for-marketing",
      "how-business-loans-work",
      "sba-loan-vs-conventional-loan",
      "payback-period-vs-roi",
      "how-to-value-a-business-to-sell",
      "revenue-growth-benchmarks",
    ],
    siblings: [
      { slug: "profit-and-pricing", name: "Profit & Pricing" },
      { slug: "break-even-and-cash-flow", name: "Break-Even & Cash Flow" },
      { slug: "freelance-and-hiring", name: "Freelance & Hiring" },
    ],
  },
];

export function topicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function topicCalcs(topic: Topic): Tool[] {
  return topic.calcSlugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter(Boolean) as Tool[];
}

export function topicPosts(topic: Topic): BlogPost[] {
  return topic.postSlugs
    .map((slug) => POSTS.find((p) => p.slug === slug))
    .filter(Boolean) as BlogPost[];
}
