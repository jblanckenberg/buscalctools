export type BlogFaq = {
  question: string;
  answer: string;
};

// FAQ data for blog posts that have a "Frequently asked questions" section.
// Each entry mirrors the MDX prose so Google can surface it as a rich-snippet
// FAQ answer. Adding FAQs to a new post = adding to this map + writing the
// MDX section (the [slug] route picks the new entry up automatically).
export const BLOG_FAQS: Record<string, BlogFaq[]> = {
  "profit-margin-vs-markup-difference": [
    {
      question: "What's the difference between markup and margin?",
      answer:
        "Markup is profit as a percentage of cost. Margin is profit as a percentage of selling price. The same sale always shows a higher markup percentage than margin percentage.",
    },
    {
      question: "Is markup the same as gross profit?",
      answer:
        "No. Markup is a percentage; gross profit is a dollar amount. The same gross profit can be quoted as either markup or margin depending on the denominator. Markup uses cost as the denominator; margin uses revenue.",
    },
    {
      question: "How do I convert markup to margin?",
      answer:
        "Margin (%) = Markup ÷ (100 + Markup) × 100. For example, a 60% markup converts to a 37.5% margin: 60 ÷ 160 × 100 = 37.5.",
    },
    {
      question: "Why is my margin always lower than my markup?",
      answer:
        "Because they have different denominators. Margin divides by selling price (which is bigger than cost), and the bigger the denominator, the smaller the percentage. The gap widens dramatically at high markups: 100% markup → 50% margin, but 300% markup → only 75% margin.",
    },
    {
      question: "What's a good markup percentage?",
      answer:
        "It depends on the industry. Restaurants typically use 200-300% markup (70-75% margin on food, higher on drinks). Retail \"keystone\" is 100% markup (50% margin). Service businesses often use 150-200% markup (60-66% margin).",
    },
    {
      question: "Can margin be higher than 100%?",
      answer:
        "No. Margin is profit divided by selling price, and profit cannot exceed selling price (that would require negative cost). The mathematical ceiling is 100%, approached but never reached. Markup, on the other hand, has no ceiling — a $1 cost item sold for $100 has 9,900% markup and 99% margin.",
    },
    {
      question: "Does VAT or sales tax affect margin?",
      answer:
        "Yes. Gross margin in standard accounting is computed on net revenue — revenue after removing VAT or sales tax, because that tax is not yours to keep. A $120 sale at 20% VAT is a $100 net sale; margin calculations should use the $100. Markup, similarly, should be applied to net cost (excluding recoverable VAT) and produce a net selling price, with VAT added on top for the customer-facing number.",
    },
  ],
  "value-based-pricing-vs-cost-plus": [
    {
      question: "What's the difference between cost-plus and value-based pricing?",
      answer:
        "Cost-plus starts from your costs and adds a target margin or markup — the price is built from the inside out. Value-based pricing starts from what the customer's outcome is worth in dollars and works back to a price — built from the outside in. On the same deliverable, the value-based price is typically 2–10× the cost-plus price.",
    },
    {
      question: "When should I use value-based pricing?",
      answer:
        "When three conditions hold: (1) you can quantify the outcome in dollars, (2) you're differentiated enough that the buyer can't easily comparison-shop, and (3) the buyer is B2B or otherwise outcome-focused rather than price-focused. Legal, M&A advisory, executive coaching, B2B SaaS, and specialised consulting all fit. Commodity retail does not.",
    },
    {
      question: "How do I calculate my value-based price?",
      answer:
        "Quantify the customer's outcome in dollars (revenue gained, costs avoided, time saved × hourly value), then charge a percentage of that value. The B2B-consulting industry norm is 3–10% of the value created. On a $1M revenue lift, that's a $30,000–$100,000 fee. Cross-check against cost-plus to make sure you're not pricing below your floor.",
    },
    {
      question: "Is value-based pricing more profitable than cost-plus?",
      answer:
        "In the right context, yes — typically 2–10× revenue per deal. But it requires more sales-cycle effort, more customer research, and a higher win-loss tolerance. Net profit (after the extra sales cost) is usually still well above cost-plus, but the gap is smaller than the headline price difference suggests.",
    },
    {
      question: "Can I switch from cost-plus to value-based pricing?",
      answer:
        "Yes — but transition deliberately. Start with new customers (your existing book has cost-plus anchors locked in). Introduce tiered packaging first, then move to outcome-based language in proposals, then run pricing experiments. Most service businesses take 6–18 months to fully transition and see significant margin expansion in year one.",
    },
    {
      question: "What industries use value-based pricing most?",
      answer:
        "Management consulting, legal services, M&A advisory, B2B SaaS, executive coaching, specialty medical procedures, brand design, and growth marketing. Anywhere outcomes are large, measurable, and the buyer is sophisticated enough to think in ROI terms.",
    },
    {
      question: "Should freelancers use cost-plus or value-based?",
      answer:
        "Freelancers should anchor on cost-plus (so they don't price below profitability) but quote value-based whenever the customer is B2B and the outcome is measurable. Charge cost-plus for low-stakes commodity work; charge value-based for differentiated, high-stakes deliverables.",
    },
  ],
  "cost-plus-pricing-explained": [
    {
      question: "What is cost-plus pricing?",
      answer:
        "Cost-plus pricing is a method that sets the selling price by adding a fixed markup percentage to the unit cost of a product or service. The formula is Price = Unit Cost × (1 + Markup %). It's the simplest pricing method and guarantees a margin as long as the cost number is fully loaded (direct cost plus allocated overhead). It's used by government contractors, manufacturers selling to wholesalers, and most small service businesses.",
    },
    {
      question: "What's a typical cost-plus markup percentage?",
      answer:
        "It depends heavily on industry. Typical ranges: SaaS 200–600% markup (70–90% margin), e-commerce physical product 100–150% markup (50–60% margin), professional services 100–200% markup (50–66% margin), B2B manufacturing 25–55% markup (20–35% margin), retail apparel 100–150% markup (50–60% margin, \"keystone+\"), restaurants 200–300% on food (70–75% margin), government contracts capped at 8–12% per FAR / MOD rules.",
    },
    {
      question: "When should I use cost-plus pricing?",
      answer:
        "Use cost-plus when (1) you're in a regulated or government contract that requires it, (2) you sell through wholesalers / retailers who expect cost+markup quotes, (3) the product is a commodity where the market sets the price band, or (4) you can't quantify customer value in dollars. For differentiated B2B work where outcomes are measurable, switch to value-based pricing.",
    },
    {
      question: "Is cost-plus pricing the same as markup pricing?",
      answer:
        "Essentially yes. \"Markup pricing\" is the most common variation of cost-plus — apply a percentage markup to cost. The broader cost-plus family also includes target-margin pricing (work backwards from a margin target) and activity-based cost-plus (allocate overhead by activity drivers, then mark up). All four are cost-plus methods; basic markup is just the most common.",
    },
    {
      question: "How do I calculate my cost-plus price?",
      answer:
        "Three steps. (1) Calculate fully-loaded cost — direct cost plus allocated overhead per unit. (2) Pick a target margin appropriate for your industry. (3) Convert the margin to a markup with Markup = Margin / (100 − Margin) × 100 and apply. Example: $40 fully-loaded cost, 40% target margin → markup = 40/60 = 66.7% → price = $40 × 1.667 = $66.67.",
    },
    {
      question: "What's wrong with cost-plus pricing?",
      answer:
        "Three failure modes: (1) it ignores customer willingness to pay, which leaves money on the table when the outcome is worth more than your cost-plus number; (2) it depends on a fully-loaded accurate cost number, and most small businesses leave 20–40% of overhead out; (3) it misallocates overhead in heterogeneous product mixes, making some lines look profitable when they're actually losing money. Cost-plus is a floor, not a strategy.",
    },
    {
      question: "Cost-plus vs value-based pricing — which is better?",
      answer:
        "Neither is universally better. Cost-plus is better for commodities, channel sales, government contracts, and compliance services where buyers price-shop. Value-based is better for differentiated B2B services where outcomes are quantifiable and buyers care about ROI. Mature businesses run both: cost-plus on commodity SKUs and compliance work, value-based on advisory and differentiated offers.",
    },
  ],
};

export function blogFaqs(slug: string): BlogFaq[] | undefined {
  return BLOG_FAQS[slug];
}
