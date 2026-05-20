import type { FaqItem } from "@/components/shared/FaqList";
import type { HowToStep } from "@/components/shared/HowToSchema";
import type { Scenario } from "@/components/shared/Scenarios";

export type CalcCategory =
  | "Profit & Pricing"
  | "Break-Even & Cash Flow"
  | "Freelance & Hiring"
  | "Funding & Valuation";

export const CATEGORY_SLUG: Record<CalcCategory, string> = {
  "Profit & Pricing": "profit-and-pricing",
  "Break-Even & Cash Flow": "break-even-and-cash-flow",
  "Freelance & Hiring": "freelance-and-hiring",
  "Funding & Valuation": "funding-and-valuation",
};

export type SourceLink = {
  label: string;
  url: string;
  region?: "USA" | "UK" | "SA";
};

export type CalcMeta = {
  slug: string;
  category: CalcCategory;
  applicationSubCategory: string;
  featureList: string[];
  howToName: string;
  howToDescription: string;
  howToSteps: HowToStep[];
  sources?: SourceLink[];
  methodologyNote?: string;
  // 40-60 word direct answer to the implicit question for the page.
  // Targets featured snippets and voice search via the `.lead` selector.
  featuredAnswer: string;
  // ~29-word condensed answer for voice-assistant snippets (Google's
  // voice-snippet sweet spot). Rendered inside .speakable-answer when set.
  voiceAnswer?: string;
  // ISO date (YYYY-MM-DD) of the most recent review of this calc's
  // logic, copy, and sources. Drives the visible "Last reviewed" stamp
  // and the JSON-LD dateModified field. Update per-calc as content is revised.
  lastReviewed: string;
  // Pre-filled query-string scenarios rendered as chips below the calculator.
  // Each href must use the URL param schema the matching calculator component
  // reads on mount (see lib/calc-params.ts and each *Calculator.tsx).
  scenarios?: Scenario[];
  // FAQ list rendered via <FaqList /> on the parent calc page AND surfaced
  // on every variant page so variants also ship FAQPage schema. Variants can
  // override later if they need region-specific Q&A.
  faqs: FaqItem[];
};

export const LAST_VERIFIED = "May 2026";

// Baseline ISO date used as dateModified fallback for any calc page whose
// slug is not yet in CALC_META. Bump when the next global review happens.
export const CALC_META_BASELINE_DATE = "2026-05-17";

// Re-usable source link bundles
const CORPORATE_TAX_SOURCES: SourceLink[] = [
  { label: "IRS — Form 1120 (US corporate tax 21%)", url: "https://www.irs.gov/forms-pubs/about-form-1120", region: "USA" },
  { label: "GOV.UK — UK Corporation Tax rates (25% / 19% small profits)", url: "https://www.gov.uk/corporation-tax-rates", region: "UK" },
  { label: "SARS — Corporate Income Tax (27% standard)", url: "https://www.sars.gov.za/types-of-tax/corporate-income-tax/", region: "SA" },
];

const VAT_SALES_TAX_SOURCES: SourceLink[] = [
  { label: "IRS — Sales and Use Tax (US varies by state)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/sales-and-use-tax", region: "USA" },
  { label: "GOV.UK — VAT rates (UK standard 20%)", url: "https://www.gov.uk/vat-rates", region: "UK" },
  { label: "SARS — Value-Added Tax (SA standard 15%)", url: "https://www.sars.gov.za/types-of-tax/value-added-tax/", region: "SA" },
];

const SELF_EMPLOYMENT_TAX_SOURCES: SourceLink[] = [
  { label: "IRS — Self-Employment Tax (US 15.3%)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes", region: "USA" },
  { label: "GOV.UK — Self-Assessment & Class 2/4 NI (UK)", url: "https://www.gov.uk/self-employed-records", region: "UK" },
  { label: "SARS — Provisional Tax (SA)", url: "https://www.sars.gov.za/types-of-tax/provisional-tax/", region: "SA" },
];

const EMPLOYER_TAX_SOURCES: SourceLink[] = [
  { label: "IRS — Employment Taxes (FICA, FUTA — US ~11% total)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/understanding-employment-taxes", region: "USA" },
  { label: "GOV.UK — Employer National Insurance (13.8%)", url: "https://www.gov.uk/national-insurance-rates-letters", region: "UK" },
  { label: "SARS — UIF + SDL (SA ~2% total)", url: "https://www.sars.gov.za/types-of-tax/unemployment-insurance-fund-uif/", region: "SA" },
];

const LOAN_RATE_SOURCES: SourceLink[] = [
  { label: "US SBA — 7(a) Loan rate ranges", url: "https://www.sba.gov/funding-programs/loans/7a-loans", region: "USA" },
  { label: "Bank of England — Bank Rate (UK base rate)", url: "https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate", region: "UK" },
  { label: "South African Reserve Bank — repo + prime", url: "https://www.resbank.co.za/en/home/what-we-do/monetary-policy", region: "SA" },
];

export const CALC_META: Record<string, CalcMeta> = {
  "profit-margin-calculator": {
    slug: "profit-margin-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Retail store: $250k revenue / $150k COGS",
        href: "/profit-margin-calculator?revenue=250000&cogs=150000&opex=60000",
      },
      {
        label: "SaaS: $1.2M revenue / $200k COGS",
        href: "/profit-margin-calculator?revenue=1200000&cogs=200000&opex=400000",
      },
      {
        label: "Agency: $500k revenue / $50k COGS",
        href: "/profit-margin-calculator?revenue=500000&cogs=50000&opex=200000",
      },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Profit Margin Calculator",
    featureList: [
      "Calculates gross, operating, and net profit margin instantly",
      "Region-aware tax defaults for USA, UK, and South Africa",
      "Color-coded result interpretation (healthy / caution / action needed)",
      "No sign-up; all calculations run in your browser",
    ],
    howToName: "How to calculate profit margin",
    howToDescription: "Calculate gross, operating, and net profit margin from revenue and cost figures in seconds.",
    howToSteps: [
      { name: "Pick your region", text: "Toggle USA, UK, or South Africa to load the right currency symbol and pre-fill the corporate tax rate." },
      { name: "Enter total revenue", text: "Type your sales or revenue for the period in the Revenue field." },
      { name: "Enter cost of goods sold (COGS)", text: "Add the direct costs to produce or buy what you sold." },
      { name: "Add operating expenses (optional)", text: "Add rent, salaries, marketing, and overhead to unlock the operating margin result." },
      { name: "Read your margin tier", text: "Gross, operating, and net margin display with color-coded interpretation — green is healthy, amber is caution, red needs action." },
    ],
    methodologyNote:
      "Tax rate defaults reflect each region's headline corporate tax rate. Override the rate if your effective rate differs (e.g. UK small profits rate, US state tax additions).",
    sources: CORPORATE_TAX_SOURCES,
    featuredAnswer:
      "Profit margin is profit as a percentage of revenue: ((Revenue − Costs) ÷ Revenue) × 100. Gross margin uses cost of goods sold only; net margin subtracts all costs and tax. A healthy net margin is 10–20% for most small businesses, though benchmarks vary by industry.",
    voiceAnswer:
      "Profit margin equals profit divided by revenue. Gross margin uses cost of goods sold; net margin subtracts all costs and tax. A healthy small-business net margin is ten percent.",
    faqs: [
      {
        q: "What is a good profit margin for a small business?",
        a: "A gross profit margin above 40% is considered strong for most product businesses. Service businesses typically see higher margins (50–70%). Net profit margins of 10–20% are healthy for most small businesses. Use this calculator to benchmark your margin against these targets.",
      },
      {
        q: "What is the difference between profit margin and markup?",
        a: "Profit margin is calculated as a percentage of your selling price. Markup is calculated as a percentage of your cost. A 50% markup on a $10 cost gives a $15 selling price — but the margin on that sale is only 33%. They are different numbers for the same transaction.",
      },
      {
        q: "How do I calculate gross profit margin?",
        a: "Gross profit margin = ((Revenue − Cost of Goods Sold) / Revenue) × 100. For example, if you earn $100,000 in revenue and your COGS is $60,000, your gross profit is $40,000 and your gross margin is 40%.",
      },
      {
        q: "What is net profit margin?",
        a: "Net profit margin is your profit as a percentage of revenue after ALL costs — including COGS, operating expenses, interest, and taxes. It is the true bottom-line profitability measure. A 10% net margin means you keep $10 for every $100 of revenue earned.",
      },
      {
        q: "How is profit margin different in the UK vs USA?",
        a: "The calculation method is identical, but tax rates differ. In the UK, corporation tax is 25% (19% for profits under £50,000). In the USA, federal corporate tax is 21%, with additional state-level taxes. This calculator automatically adjusts for your selected region.",
      },
      {
        q: "What is the difference between gross, operating, and net margin?",
        a: "Gross margin deducts only the direct cost of producing what you sell. Operating margin also deducts rent, salaries, marketing, and other running costs — it shows how efficient the business is before financing and tax. Net margin deducts interest and tax too. The three numbers should always step down: gross > operating > net.",
      },
      {
        q: "What does it mean if my net profit margin is negative?",
        a: "A negative net margin means your total costs (COGS, operating expenses, interest, and tax) exceed your revenue — you are running at a loss for that period. Short-term losses are normal during early growth or seasonal dips, but a consistently negative margin signals either underpricing, bloated overheads, or weak demand. Diagnose by checking which line in the waterfall flips the result negative.",
      },
      {
        q: "What is the most common profit margin mistake?",
        a: "Confusing markup with margin is the most expensive error in small business. A shop owner applying \"50% markup\" thinking it equals a 50% margin actually earns only 33.3%. On annual revenue of $500,000 that gap is roughly $80,000 of profit gone missing. Always calculate the margin separately rather than assuming the markup percentage is what you keep.",
      },
      {
        q: "My revenue is zero — why does the margin show an error?",
        a: "Profit margin divides profit by revenue. When revenue is zero the calculation is mathematically undefined (division by zero), so the calculator shows a dash or error rather than a misleading 0% or 100%. Enter a non-zero revenue figure to see results. If you genuinely had no sales in the period, margin is not a meaningful metric — track cash burn instead.",
      },
      {
        q: "I have my margin number — what should I do with it?",
        a: "Compare it to your industry benchmark (10–20% net is healthy for most small businesses) and to your own prior periods. If margin is falling, the cause is usually either rising COGS (renegotiate suppliers), rising overhead (audit fixed costs), or undisciplined discounting (test smaller promotions). If margin is healthy but profit is small, the lever is volume — focus on driving more revenue at the same margin.",
      },
    ],
  },

  "markup-calculator": {
    slug: "markup-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Retail: $40 cost at 50% markup",
        href: "/markup-calculator?mode=forward&cost=40&markup=50",
      },
      {
        label: "Wholesale: $12 cost at 100% markup",
        href: "/markup-calculator?mode=forward&cost=12&markup=100",
      },
      {
        label: "Reverse: $79 price from $25 cost",
        href: "/markup-calculator?mode=reverse&cost=25&price=79",
      },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Markup Calculator",
    featureList: [
      "Forward mode: convert cost to selling price at any markup %",
      "Reverse mode: enter a selling price to find the implied markup",
      "Shows equivalent margin alongside markup to avoid pricing mistakes",
      "Currency switches automatically for USA, UK, and South Africa",
    ],
    howToName: "How to calculate markup and selling price",
    howToDescription: "Convert a cost price into a selling price at any markup, or work backwards from a price to find the implied markup.",
    howToSteps: [
      { name: "Choose forward or reverse mode", text: "Toggle Cost → Price (forward) or Price → Markup (reverse) at the top of the calculator." },
      { name: "Enter your cost price", text: "Add what the product or service costs you to produce or buy." },
      { name: "Add markup % (forward) or selling price (reverse)", text: "In forward mode, enter the markup percentage. In reverse mode, enter your selling price." },
      { name: "Read the selling price and implied margin", text: "The calculator shows the selling price, the profit per unit, and the equivalent margin so you can sanity-check pricing." },
    ],
    methodologyNote:
      "Formula is region-agnostic and unchanged from standard pricing convention: Selling Price = Cost × (1 + Markup / 100). Currency symbol switches by region only.",
    featuredAnswer:
      "Markup is the percentage added to cost to set selling price: Selling Price = Cost × (1 + Markup ÷ 100). A 50% markup on a $40 cost gives a $60 selling price. Markup is always a higher percentage than the equivalent profit margin on the same sale.",
    voiceAnswer:
      "Markup is the percentage added to cost to set selling price. A fifty percent markup on a forty dollar cost gives a sixty dollar price — higher than the margin.",
    faqs: [
      { q: "What is markup in business?", a: "Markup is the amount added to the cost price of a product to determine its selling price. It is expressed as a percentage of cost. A 50% markup on a $20 item gives a selling price of $30. Markup is always higher than the equivalent margin percentage." },
      { q: "Is 50% markup the same as 50% margin?", a: "No. A 50% markup means you add 50% to your cost. A 50% margin means 50% of your selling price is profit. A 50% markup produces a 33.3% margin. This is one of the most common pricing mistakes in small business." },
      { q: "How do I calculate markup percentage?", a: "Markup percentage = ((Selling Price − Cost) / Cost) × 100. If your cost is $40 and your selling price is $60, the markup is ($20 / $40) × 100 = 50%." },
      { q: "What markup should I use for my products?", a: "Typical retail markups range from 50% to 200%. Service businesses often use higher markups (100–300%) because labour costs include overhead. eCommerce businesses typically need 60–100% minimum markup to cover platform fees, shipping, and advertising costs." },
      { q: "How does markup affect profit margin?", a: "Every markup percentage corresponds to a specific margin: 25% markup = 20% margin; 50% markup = 33.3% margin; 100% markup = 50% margin; 200% markup = 66.7% margin. Use the comparison panel in this calculator to see both figures simultaneously." },
      { q: "Do UK and US retailers calculate markup the same way?", a: "Yes — the formula is identical worldwide: markup is always profit as a percentage of cost. What differs is how prices are displayed at the till. UK retailers show prices inclusive of 20% VAT, so the markup is applied to the pre-VAT cost and then VAT is added on top. US retailers add sales tax at checkout, so the markup percentage maps directly to the shelf price." },
      { q: "What is the biggest mistake people make with markup?", a: "Setting a markup that does not cover overhead. A 30% markup on a $50 cost gives a $65 price and $15 gross profit per unit — but if rent, wages, and marketing eat $20 per unit, you lose money on every sale. Always calculate the all-in cost per unit (product + allocated overhead) before choosing a markup, not just the supplier invoice." },
      { q: "What happens if I enter a cost of zero?", a: "Markup is defined as a percentage of cost, so a zero cost makes the calculation undefined — you cannot have a percentage of nothing. The calculator will show a dash. If your product genuinely has no cost (e.g. a downloadable file you already created), markup is not the right metric. Set the price directly against what the market will pay instead." },
      { q: "I picked a markup — what should I check next?", a: "Run the resulting selling price past three tests. First: does it beat your minimum break-even price including overhead? Second: is it within 15% of comparable competitor prices, or do you have a clear reason to be outside that band? Third: does the implied margin (shown in the comparison panel) hit your target? If any test fails, revisit the markup before publishing the price." },
      { q: "How is markup different from a price increase?", a: "Markup is the gap between cost and selling price on a single unit, set at launch. A price increase is a change to an existing selling price, applied later. A 10% markup increase on a $50 cost moves the price from (say) $75 to $80 — but a 10% price increase on $75 also lands at $82.50. The two operations look similar but start from different bases, so the resulting margins differ." },
    ],
  },

  "break-even-calculator": {
    slug: "break-even-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Coffee shop: $5k fixed / $3 var / $7 price",
        href: "/break-even-calculator?fixed=5000&variable=3&price=7",
      },
      {
        label: "SaaS startup: $30k fixed / $5 var / $49 price",
        href: "/break-even-calculator?fixed=30000&variable=5&price=49",
      },
      {
        label: "Manufacturer with $20k profit target",
        href: "/break-even-calculator?fixed=15000&variable=12&price=40&target=20000",
      },
    ],
    category: "Break-Even & Cash Flow",
    applicationSubCategory: "Break-Even Calculator",
    featureList: [
      "Calculates break-even units and revenue from fixed and variable costs",
      "Visual break-even chart with revenue and cost lines",
      "Target-profit mode: units needed to clear a profit goal",
      "Contribution margin per unit shown for pricing decisions",
    ],
    howToName: "How to calculate your break-even point",
    howToDescription: "Find the number of units and total revenue you need to cover all costs and start making profit.",
    howToSteps: [
      { name: "Enter monthly fixed costs", text: "List rent, salaries, insurance, and any cost that doesn't change with output, then total them in the Fixed Costs field." },
      { name: "Add variable cost per unit", text: "Materials, packaging, commission, and platform fees — the per-unit costs that scale with each sale." },
      { name: "Enter selling price per unit", text: "What you charge customers per unit sold." },
      { name: "Optionally add a target profit", text: "Enter a profit goal to see units needed to clear costs plus the target profit." },
      { name: "Read break-even units and chart", text: "The chart shows the revenue and total-cost lines crossing at break-even. Round units up — you don't break even at 399 if the result is 400." },
    ],
    methodologyNote:
      "Standard break-even formula (Fixed Costs / Contribution Margin per Unit). Region-agnostic — only the currency symbol changes.",
    featuredAnswer:
      "Break-even is the number of units you must sell to cover all costs: Break-Even Units = Fixed Costs ÷ (Selling Price − Variable Cost). At $5,000 fixed costs, $10 variable cost per unit, and a $25 selling price, you break even at 334 units (333.3 rounded up).",
    voiceAnswer:
      "Break-even units equal fixed costs divided by contribution margin per unit. Selling price minus variable cost is contribution margin. Five thousand divided by fifteen equals three hundred thirty-four units.",
    faqs: [
      { q: "What is the break-even point?", a: "The break-even point is the level of sales at which your total revenue exactly equals your total costs — you are making neither a profit nor a loss. Any sales above the break-even point generate profit. Any sales below it result in a loss." },
      { q: "How do I calculate break-even point in units?", a: "Break-even units = Fixed Costs / (Selling Price per unit − Variable Cost per unit). The denominator is called the contribution margin — the profit each unit contributes toward covering your fixed costs." },
      { q: "What are fixed costs vs variable costs?", a: "Fixed costs stay the same regardless of how many units you sell — rent, insurance, salaries. Variable costs change with each unit produced or sold — raw materials, packaging, sales commission. The distinction is critical for accurate break-even analysis." },
      { q: "How do I lower my break-even point?", a: "You can lower your break-even point by: (1) increasing your selling price, (2) reducing variable costs per unit, or (3) reducing fixed overhead costs. Increasing price is usually the fastest lever, but must be balanced against demand elasticity." },
      { q: "What is the break-even formula?", a: "Break-Even Units = Fixed Costs ÷ Contribution Margin, where Contribution Margin = Selling Price − Variable Cost Per Unit. In revenue terms: Break-Even Revenue = Break-Even Units × Selling Price." },
      { q: "Does VAT or sales tax affect the break-even calculation?", a: "Use net-of-tax prices throughout. VAT in the UK (20%) and South Africa (15%) is collected on behalf of HMRC or SARS — it is not your revenue. Plug the pre-VAT selling price into the calculator. In the US, sales tax is added at checkout and excluded from your revenue automatically. Mixing gross and net figures is the single most common break-even error." },
      { q: "What is the most common break-even mistake?", a: "Misclassifying semi-variable costs as fixed. Items like utilities, sales commissions, and part-time labour change with volume but not on a perfect per-unit basis. Treating them as pure fixed costs understates your true contribution margin and inflates the break-even point. Split semi-variable costs into a fixed base plus a per-unit component before entering them." },
      { q: "What if my variable cost is higher than my selling price?", a: "Contribution margin is negative — every unit sold loses money, so there is no break-even point at any volume. The calculator will return an error or infinity. You have two options: raise the selling price until it exceeds variable cost, or cut variable costs (renegotiate suppliers, simplify the product). Until contribution margin is positive, selling more makes the loss worse, not better." },
      { q: "How is break-even different from payback period?", a: "Break-even answers \"how many units per period must I sell to cover ongoing costs?\" Payback period answers \"how long until a one-off investment pays itself back?\" Break-even is about operations; payback is about capital decisions. A new product launch needs both — the unit volume to be viable and the months until the launch investment is recovered." },
      { q: "I know my break-even — what should I do next?", a: "Three actions. Compare break-even units to current monthly sales: if you are below, you are losing money every month and the gap quantifies the urgency. Use target-profit mode to find the volume needed for a specific profit goal. And model the impact of a 10% price rise or a 10% cost cut on break-even — the smaller number usually points to the higher-leverage lever to pull first." },
    ],
  },

  "roi-calculator": {
    slug: "roi-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Marketing: $5k spend → $12k return over 6 mo",
        href: "/roi-calculator?investment=5000&return=12000&months=6",
      },
      {
        label: "Equipment: $25k → $40k over 24 mo",
        href: "/roi-calculator?investment=25000&return=40000&months=24",
      },
      {
        label: "Training: $2k → $3k over 12 mo",
        href: "/roi-calculator?investment=2000&return=3000&months=12",
      },
    ],
    category: "Funding & Valuation",
    applicationSubCategory: "ROI Calculator",
    featureList: [
      "Calculates ROI percentage and absolute net profit",
      "Annualised ROI for comparing investments of different durations",
      "Color-coded result tier (green ≥20%, amber 0–19%, red negative)",
      "Region-aware currency formatting",
    ],
    howToName: "How to calculate return on investment (ROI)",
    howToDescription: "Measure ROI on any business spend — marketing, equipment, training — with optional annualisation for fair comparisons.",
    howToSteps: [
      { name: "Enter initial investment", text: "The total amount you spent upfront on the investment." },
      { name: "Enter net return", text: "The total return or revenue the investment generated." },
      { name: "Optionally enter the period in months", text: "Add the investment period to see annualised ROI alongside total ROI." },
      { name: "Read ROI, net profit, and annualised rate", text: "The calculator shows ROI as a percentage, net profit in cash, and the annualised rate for comparison against other investments." },
    ],
    methodologyNote:
      "Simple ROI does not account for the time value of money. For investments held over multiple years, use the annualised ROI for fair comparison.",
    featuredAnswer:
      "ROI (return on investment) is profit as a percentage of cost: ROI = ((Net Return − Investment) ÷ Investment) × 100. Investing $10,000 and earning back $13,500 is a 35% ROI. Annualised ROI normalises across different holding periods for fair comparison between investments.",
    voiceAnswer:
      "ROI equals net return minus investment, divided by the investment, times one hundred. Earning thirteen thousand five hundred back on a ten thousand investment is a thirty-five percent ROI.",
    faqs: [
      { q: "What is ROI?", a: "ROI (Return on Investment) is a measure of the profitability of an investment expressed as a percentage of the original cost. An ROI of 35% means you earned $35 in profit for every $100 invested. A positive ROI means the investment was profitable; a negative ROI means it was a loss." },
      { q: "How do I calculate ROI?", a: "ROI (%) = ((Net Return − Investment Cost) / Investment Cost) × 100. Net Return is the total income or value generated. Investment Cost is what you paid. Example: invest $5,000, earn back $6,500 — ROI = (1,500/5,000) × 100 = 30%." },
      { q: "What is a good ROI for a small business?", a: "A 15–30% annual ROI is considered good for most small business investments. Marketing campaigns with ROI above 100% (you earn back more than double what you spent) are excellent. Any positive ROI means the investment paid off more than doing nothing." },
      { q: "What is annualised ROI and when should I use it?", a: "Annualised ROI converts a total ROI figure into an equivalent yearly rate, allowing you to compare investments held for different periods. Use it when comparing a 6-month investment against a 2-year investment on an equal basis." },
      { q: "How is ROI used in marketing?", a: "Marketing ROI measures the revenue generated from a campaign relative to what it cost to run it. An ROI above 100% means the campaign returned more revenue than it cost. Most businesses target marketing ROI of 200–500% (earning $2–$5 for every $1 spent)." },
      { q: "Should I include tax in ROI calculations?", a: "Use pre-tax figures when comparing investments to keep the analysis consistent, then apply tax separately at the end. Tax rates differ by jurisdiction (US 21% federal, UK 25%, SA 27%) and by investment type (capital gains often taxed differently from operating profit). Calculating ROI gross-of-tax means the same investment looks the same in every region; tax adjustments are applied as a final layer when deciding actual cash retained." },
      { q: "What is the most common ROI mistake?", a: "Counting revenue as the return instead of profit. A marketing campaign that generated $50,000 in revenue from $10,000 spend looks like 400% ROI — but if the COGS on that revenue was $35,000, the actual profit is $5,000 and the true ROI is negative 50%. Always use net return (revenue minus the costs of fulfilling that revenue), not gross revenue, in the numerator." },
      { q: "What if my ROI is negative or zero?", a: "Negative ROI means the investment lost money — you got back less than you put in. Zero ROI means you broke even. Neither is automatically a failure: a marketing test with -10% ROI may have produced valuable customer insight, and a brand-building investment may have zero direct ROI but improve future conversion rates. Quantify the non-financial return before writing off the spend." },
      { q: "I have my ROI number — what should I do with it?", a: "Compare it to two benchmarks. One: your hurdle rate — the minimum return you require for any investment, typically 15–20% annualised for small businesses. Below that, the cash is better deployed elsewhere. Two: the next-best alternative — if a marketing campaign returned 35% but a debt repayment would have saved 9% interest, the campaign wins. ROI is only useful when compared against an alternative use of the same money." },
      { q: "How is ROI different from payback period?", a: "ROI measures the size of the return (percentage of money earned back). Payback period measures the speed of the return (months until you recover the original spend). A $10,000 investment returning $15,000 over 5 years has 50% ROI but 4-year payback. A $10,000 investment returning $12,000 over 12 months has only 20% ROI but 10-month payback. Use ROI for total returns, payback for cash-flow planning and risk." },
    ],
  },

  "pricing-calculator": {
    slug: "pricing-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Service: $50 cost at 40% margin",
        href: "/pricing-calculator?mode=margin&cost=50&margin=40",
      },
      {
        label: "Retail: $15 cost at 60% markup + 20% VAT",
        href: "/pricing-calculator?mode=markup&cost=15&markup=60&tax=20",
      },
      {
        label: "Premium: $80 cost at 55% margin",
        href: "/pricing-calculator?mode=margin&cost=80&margin=55",
      },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Pricing Calculator",
    featureList: [
      "Calculates selling price from cost + target margin or markup",
      "Toggle between margin-mode and markup-mode pricing",
      "Adds VAT (UK 20%, SA 15%) or sales tax (US) automatically",
      "Shows equivalent markup alongside margin for comparison",
    ],
    howToName: "How to calculate the right selling price",
    howToDescription: "Set the optimal selling price from cost and your target margin or markup, with region-appropriate VAT or sales tax.",
    howToSteps: [
      { name: "Choose margin-mode or markup-mode", text: "Pick whether you want to price by target gross margin (% of selling price) or by markup (% added to cost)." },
      { name: "Enter your cost price", text: "Fully-loaded cost: materials, direct labour, plus any per-unit overhead allocation." },
      { name: "Set your target margin or markup", text: "Enter the percentage you want to achieve in the toggle's active field." },
      { name: "Set the VAT or sales tax (optional)", text: "Pre-filled by region — UK 20%, SA 15%, US 0% by default. Override if your situation differs." },
      { name: "Read both ex-tax and inc-tax prices", text: "The calculator shows the recommended price before and after tax, plus profit per unit." },
    ],
    methodologyNote:
      "VAT/sales tax defaults pre-fill at 20% (UK), 15% (SA), and 0% (US — sales tax varies by state). Verify your specific state's rate for US business.",
    sources: VAT_SALES_TAX_SOURCES,
    featuredAnswer:
      "To calculate selling price from cost and target margin: Selling Price = Cost ÷ (1 − Margin ÷ 100). For a $20 cost at 40% target margin, the selling price is $33.33. Add VAT/sales tax on top where applicable (20% UK, 15% SA, varies by US state).",
    faqs: [
      { q: "How do I calculate the selling price from cost and margin?", a: "Selling Price = Cost ÷ (1 − Desired Margin). This formula is used when you know your cost and the profit margin percentage you want to achieve. Example: cost $50, target margin 40% → Selling Price = $50 ÷ 0.60 = $83.33." },
      { q: "What is cost-plus pricing?", a: "Cost-plus pricing means setting your price by adding a fixed markup to your cost. It is the simplest pricing method: know your cost, add your desired profit, and that is your price. The risk is that it ignores what the market will actually pay." },
      { q: "How do I price a service (not a product)?", a: "For services, \"cost\" includes your time at a target hourly rate plus any direct expenses. Use the Freelance Rate Calculator to determine your minimum hourly rate, then use this tool to set project prices that achieve your target margin." },
      { q: "Should I include VAT/sales tax in my advertised price?", a: "In the UK, consumer-facing prices must be displayed inclusive of VAT. In the USA, sales tax is typically added at checkout and not included in advertised prices. In South Africa, prices are generally displayed inclusive of VAT. This calculator handles all three conventions." },
      { q: "How does pricing affect profit margin?", a: "A small price increase has a disproportionately large effect on margin. If your cost is $50 and you sell at $70 (30% margin), a $5 price increase to $75 raises your margin to 33.3% — a 10% improvement in profitability from a 7% price increase." },
      { q: "How does VAT registration in the UK or SA change my pricing?", a: "Once you cross the VAT threshold (£90,000 turnover in the UK, R1 million in South Africa) you must add VAT to every invoice. If your customers are consumers, this effectively cuts your margin by 17–20% unless you raise prices. B2B customers usually reclaim VAT, so the impact is neutral. Plan the transition before you cross the threshold, not after." },
      { q: "What is the most common pricing mistake?", a: "Pricing based on what feels reasonable rather than on cost plus target margin. Owners often anchor to a competitor's price without knowing whether the competitor is profitable, or set a round number ($99) that looks tidy but does not cover allocated overhead. Run every price through the calculator first; treat market and psychological pricing as adjustments, not the starting point." },
      { q: "What if my target margin is 100% or more?", a: "A 100% margin is mathematically impossible — you would need to sell something for an infinite price (the formula divides by zero). The maximum sensible target is around 90%. If you genuinely want a very high margin, switch to markup-based pricing instead, where 1000% markup is well-defined and equals a 90.9% margin. The calculator caps margin entries at 99% for this reason." },
      { q: "I have my recommended price — should I just publish it?", a: "Sanity-check it against three things first. One: competitor prices within your category — if you are 30%+ above or below the band, you need a story for why. Two: psychological price points ($49 vs $50, £99 vs £100). Three: round-up to absorb future cost rises. If the calculator says $73.14, publishing at $79 gives you headroom and looks deliberate rather than algorithmic." },
      { q: "How is pricing different from quoting?", a: "Pricing sets a standard selling price for a repeatable product or service, designed to hit a target margin across many sales. Quoting is custom — it builds a one-off price for a specific client and scope, often including line items the standard price does not cover (travel, rush work, exclusivity). Use this calculator for pricing; quoting needs an itemised estimate template instead." },
    ],
  },

  "invoice-calculator": {
    slug: "invoice-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Consultant: 10 hrs at $120, 20% VAT",
        href: "/invoice-calculator?desc=Consulting+hours&qty=10&rate=120&tax=20",
      },
      {
        label: "Designer: 1 project at $2,500, 10% discount",
        href: "/invoice-calculator?desc=Design+project&qty=1&rate=2500&tax=20&discount=10",
      },
      {
        label: "US contractor: 40 hrs at $85, no sales tax",
        href: "/invoice-calculator?desc=Contract+work&qty=40&rate=85&tax=0",
      },
    ],
    category: "Freelance & Hiring",
    applicationSubCategory: "Invoice Calculator",
    featureList: [
      "Build totals from up to 5 line items with description, qty, rate",
      "Adds VAT, GST, or sales tax by region",
      "Optional discount applied before tax",
      "One-click copy of the full invoice summary",
    ],
    howToName: "How to build an invoice total with tax",
    howToDescription: "Build an invoice total from multiple line items with automatic VAT, GST, or sales tax based on your region.",
    howToSteps: [
      { name: "Add each line item", text: "Enter a description, quantity, and unit rate for each line. Add up to 5 lines." },
      { name: "Set the tax rate", text: "Pre-filled at 20% (UK VAT), 15% (SA VAT), or 0% (US — sales tax added at checkout). Override if needed." },
      { name: "Optionally add a discount", text: "A percentage discount applied to the subtotal before tax is calculated." },
      { name: "Read subtotal, tax, and invoice total", text: "Copy the result block to paste into your invoice template." },
    ],
    methodologyNote:
      "Tax pre-fills at headline rates (UK VAT 20%, SA VAT 15%, US 0%). UK businesses must register for VAT above £90,000 turnover; SA threshold is R1M. Verify your registration status before issuing VAT invoices.",
    sources: VAT_SALES_TAX_SOURCES,
    featuredAnswer:
      "An invoice total is the subtotal of line items, minus any discount, plus tax: Total = (Subtotal − Discount) × (1 + Tax ÷ 100). On £500 with 10% discount and 20% UK VAT: discounted subtotal £450, VAT £90, total £540. Each line item is quantity × unit rate.",
    faqs: [
      { q: "How do I calculate an invoice total with VAT?", a: "Invoice Total with VAT = Subtotal × (1 + VAT Rate / 100). If your subtotal is £500 and VAT is 20%, your invoice total is £500 × 1.20 = £600. The VAT amount itself is £100." },
      { q: "How do I add a discount to an invoice?", a: "Apply the discount to the subtotal before calculating tax. Discounted Subtotal = Subtotal × (1 − Discount%/100). Then calculate tax on the discounted subtotal. Example: £1,000 subtotal, 10% discount = £900 discounted subtotal, then add 20% VAT = £1,080 total." },
      { q: "What is the difference between VAT and sales tax?", a: "VAT (UK/SA) is charged at each stage of the supply chain — businesses collect and remit it to the government. US Sales Tax is only charged at the final point of sale to the consumer. Both are consumption taxes but work differently for business billing." },
      { q: "Do I need to charge VAT on my invoices?", a: "In the UK, you must register for and charge VAT only if your taxable turnover exceeds £90,000 per year (the threshold raised from £85,000 on 1 April 2024 and remains in force). In South Africa, the threshold is R1 million. In the USA, sales tax rules vary by state and product type." },
      { q: "What should an invoice include?", a: "A valid invoice includes: your business name and address, client name and address, unique invoice number, invoice date, payment due date, itemised list of goods/services, applicable tax, total amount due, and payment instructions. For VAT invoices (UK/SA), include your VAT registration number." },
      { q: "How is invoicing different in the US, UK, and SA?", a: "US invoices typically have no tax unless the seller has nexus in a sales-tax state, in which case it's added per-state. UK invoices must show VAT (20%) once you're registered, broken out separately, with your VAT number visible. South African invoices show VAT (15%) the same way, plus your VAT vendor number. Invoice numbering must be sequential in the UK and SA — random numbering can cause problems in a VAT audit." },
      { q: "What is the most common invoicing mistake?", a: "Applying tax before subtracting the discount, instead of after. If a $1,000 invoice has a 10% discount and 20% VAT, the correct calculation is ($1,000 − $100) × 1.20 = $1,080. Applying VAT first gives $1,200 minus $100 = $1,100 — a $20 overcharge to the client and a VAT remittance mismatch. This calculator does it in the correct order; verify your own invoicing software does the same." },
      { q: "What if my client is in a different country — do I still charge VAT?", a: "In the UK, B2B services to a VAT-registered business in another country are usually zero-rated (no VAT charged, but the invoice must show the client's VAT number and a reverse-charge note). B2C services across borders follow different rules per country. South African export rules are similar but require proof of export. When in doubt, charge zero VAT and note \"reverse charge applies\" — confirm with an accountant." },
      { q: "What if my quantity or rate is zero on a line item?", a: "The line total becomes zero and is excluded from the subtotal, which is mathematically correct but probably not what you meant. Either delete the line entirely (cleaner) or replace with the intended value. A zero line on the printed invoice can confuse clients into asking why it's there — most invoicing best practice is to keep the invoice tight to billable items only." },
      { q: "I have my invoice total — what should I do before sending?", a: "Five-second checklist. One: invoice number is sequential and unique. Two: payment due date is explicit (not just \"net-30\" — write the actual date). Three: payment instructions include bank details or a link. Four: tax breakdown matches the calculator output. Five: keep a copy in your records (legally required for 6 years in the UK, 5 in SA, 7 in most US states). Send via email with PDF attached — chasing late payment is much easier with a clear audit trail." },
    ],
  },

  "freelance-rate-calculator": {
    slug: "freelance-rate-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Designer: $60k target, 25 hrs/wk, $6k overhead",
        href: "/freelance-rate-calculator?income=60000&hours=25&overhead=6000&weeks_off=6&margin=15",
      },
      {
        label: "Developer: $120k target, 30 hrs/wk, $10k overhead",
        href: "/freelance-rate-calculator?income=120000&hours=30&overhead=10000&weeks_off=5&margin=20",
      },
      {
        label: "Copywriter: $45k target, 20 hrs/wk, $3k overhead",
        href: "/freelance-rate-calculator?income=45000&hours=20&overhead=3000&weeks_off=8&margin=10",
      },
    ],
    category: "Freelance & Hiring",
    applicationSubCategory: "Freelance Rate Calculator",
    featureList: [
      "Builds rate from income goal, billable hours, overhead, profit buffer",
      "Region-aware tax-buffer reminder for USA, UK, South Africa",
      "Shows minimum (floor) rate and recommended rate",
      "Day-rate equivalent for project quoting",
    ],
    howToName: "How to calculate your freelance hourly rate",
    howToDescription: "Set a sustainable freelance hourly rate from your income goal, business expenses, billable hours, and desired profit margin.",
    howToSteps: [
      { name: "Set your annual income target", text: "Your desired take-home — before adding the tax buffer the calculator will remind you about." },
      { name: "Enter realistic billable hours per week", text: "Most experienced freelancers bill 20–25 hours per week, not 40. Be honest." },
      { name: "Add annual overhead and weeks off", text: "Software, equipment, insurance, accountant fees — plus 5–8 weeks for holidays and sick days." },
      { name: "Set your desired profit margin", text: "10–20% above the floor is typical. This is your buffer for slow months." },
      { name: "Read minimum and recommended rates", text: "Quote at or above the recommended rate. Treat the minimum as the floor, not the target." },
    ],
    methodologyNote:
      "Tax-buffer guidance reflects each region's typical self-employment tax burden. US 25–30% (SE tax + federal + state), UK 20–30% (income tax + Class 2/4 NI), SA 25–35% (provisional tax). Verify against your individual situation.",
    sources: SELF_EMPLOYMENT_TAX_SOURCES,
    featuredAnswer:
      "Your minimum freelance hourly rate is (Annual Income + Overhead) ÷ Annual Billable Hours. Targeting £60,000 with £6,000 overhead and 25 billable hours/week (46 weeks) = £66,000 ÷ 1,150 = £57.39/hour. Add a 10–20% profit margin to set your recommended rate. Add a tax buffer of 20–35% to your income target.",
    faqs: [
      { q: "How do I calculate my freelance hourly rate?", a: "Your minimum hourly rate = (Target Annual Income + Annual Business Expenses) / Annual Billable Hours. Billable hours are not all your working hours — they are only the hours you can actually invoice clients for. A typical freelancer bills 20–25 hours per week maximum." },
      { q: "How many hours a week can a freelancer actually bill?", a: "Most experienced freelancers bill 20–25 hours per week. The remaining time goes on admin, marketing, invoicing, meetings that cannot be billed, and professional development. Setting your rate based on 40 billable hours will leave you severely underpaid." },
      { q: "Should I include taxes in my freelance rate?", a: "Yes. As a freelancer, you pay both the employer and employee portions of self-employment taxes, plus income tax. In the USA, add at least 25–30% to your take-home income target. In the UK, add 20–30%. In South Africa, add 25–35% depending on your income level." },
      { q: "What is a day rate and how do I calculate it?", a: "A day rate is simply your hourly rate multiplied by 8 (a standard working day). If your recommended hourly rate is $75, your day rate is $600. Day rates are commonly used for contractor work and project-based engagements." },
      { q: "Am I charging enough as a freelancer?", a: "If you regularly win the first project you quote, you are almost certainly undercharging. Freelancers should win approximately 30–50% of competitive proposals. If you are winning 80%+, your rate is likely below market. Use this calculator as a floor, not a ceiling." },
      { q: "How do freelance rates differ in the US, UK, and SA?", a: "Headline rates vary by market: a mid-level designer charges roughly $75–$125/hr in the US, £50–£90/hr in the UK, and R450–R850/hr in South Africa. But the tax and overhead structure also differs. US freelancers carry self-employment tax (~15.3%) plus state income tax. UK freelancers face Class 4 NICs plus income tax. SA freelancers add provisional tax planning twice a year. Always price in your local effective tax burden, not just the headline number." },
      { q: "What is the most common freelance rate mistake?", a: "Pricing by dividing target salary by 2,080 hours. That assumes every working hour is billable, no holidays, no overhead, and zero tax — which is wrong on four counts. A freelancer who wants the equivalent of a $60,000 salaried role typically needs a billable rate of $65–$80/hr, not the $29/hr the naive calculation produces. Always include billable-hours ratio, overhead, and tax buffer." },
      { q: "What if my billable hours per week are zero or very low?", a: "Zero billable hours makes the rate infinite (division by zero) — the calculator returns an error. In practice, if you're new and have under 10 billable hours per week, the calculator output will look unreasonably high. Price for a realistic medium-term target (e.g., 20 hrs/wk in month 6) rather than current pipeline; otherwise your rates won't survive contact with a healthy client load." },
      { q: "I have my recommended rate — what should I do with it?", a: "Three things. One: stop quoting below it, even on small jobs (the time cost is the same). Two: build a rate card with three tiers — your minimum, the recommended, and a premium (recommended × 1.5) for rush or specialist work. Three: review the inputs every six months. Annual overhead creeps up, billable hours fluctuate by season, and target income should rise faster than inflation if the freelance business is healthy." },
      { q: "How is a freelance rate different from a salary?", a: "A salary is gross pay only; you receive employer-funded holidays, sick pay, pension contributions, equipment, and the employer covers payroll tax. A freelance rate has to fund all of that out of the hourly billing. The rule of thumb: take any salary you'd accept as an employee, divide by 1,000 (not 2,000), and that's your minimum hourly freelance rate to roughly match the total package. The calculator does this more precisely." },
    ],
  },

  "cash-flow-calculator": {
    slug: "cash-flow-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Steady SMB: $10k opening, $12k in / $9.5k out",
        href: "/cash-flow-calculator?opening=10000&income=12000&expenses=9500",
      },
      {
        label: "Lean startup: $50k opening, $5k in / $15k out",
        href: "/cash-flow-calculator?opening=50000&income=5000&expenses=15000",
      },
      {
        label: "Scaling agency: $25k opening, $40k in / $32k out",
        href: "/cash-flow-calculator?opening=25000&income=40000&expenses=32000",
      },
    ],
    category: "Break-Even & Cash Flow",
    applicationSubCategory: "Cash Flow Calculator",
    featureList: [
      "12-month rolling cash flow projection",
      "Running balance chart with negative-balance warning line",
      "Highlights the lowest-balance month so you can plan ahead",
      "Editable month-by-month income and expense rows",
    ],
    howToName: "How to project 12-month cash flow",
    howToDescription: "Project monthly cash flow over 12 months from income and expense estimates, with a chart that flags negative balance months.",
    howToSteps: [
      { name: "Enter your opening cash balance", text: "Bank + liquid assets at the start of month 1." },
      { name: "Fill in each month's income", text: "Estimated revenue or cash receipts for each of the 12 months ahead." },
      { name: "Fill in each month's expenses", text: "Estimated total cash outflows — salaries, rent, software, supplier payments." },
      { name: "Read net cash flow and running balance", text: "Each month shows net flow (green positive, red negative) and the running balance. The chart highlights any month where cash goes negative." },
    ],
    methodologyNote:
      "Standard cash-flow projection: running balance = opening cash + cumulative (income − expenses). Inputs are estimates; actual cash flow depends on timing of customer payments and supplier terms.",
    featuredAnswer:
      "Cash flow is monthly income minus monthly expenses, tracked as a running balance from opening cash. A 12-month projection plots that running balance month by month and flags any month it goes negative. Most cash crises are visible 3–6 months in advance if you project regularly.",
    faqs: [
      { q: "What is cash flow in business?", a: "Cash flow is the movement of money in and out of your business. Positive cash flow means more cash is coming in than going out. Negative cash flow means you are spending more than you are earning — and will run out of cash if not corrected." },
      { q: "What is the difference between cash flow and profit?", a: "A business can be profitable on paper but have negative cash flow if customers pay late. Profit is revenue minus costs on an accounting basis. Cash flow is the actual cash you have available. Many businesses fail not from lack of profit but from poor cash flow timing." },
      { q: "How do I improve business cash flow?", a: "Key strategies include: invoice immediately upon delivery, offer early payment discounts, negotiate longer payment terms with suppliers, maintain a cash reserve of 2–3 months of expenses, and delay non-essential expenditure to months with stronger income." },
      { q: "What is a cash flow projection?", a: "A cash flow projection is a month-by-month forecast of the cash you expect to receive and spend. It shows you in advance which months you may face a cash shortfall — allowing you to arrange financing, delay expenditure, or accelerate collections before the problem hits." },
      { q: "How much cash reserve should a small business keep?", a: "Most financial advisors recommend 3–6 months of operating expenses as a cash reserve. Seasonal businesses may need more. This calculator will show your lowest cash balance month — ensure your reserve covers at least that shortfall with a comfortable buffer." },
      { q: "Does VAT affect my cash flow projection?", a: "Yes, significantly. UK businesses collect 20% VAT on sales and pay it to HMRC quarterly, so cash arrives before it leaves — but the outflow is large and lumpy. South African VAT works the same way at 15%. Model the VAT payment as an expense in the month it's due (roughly one month after each quarter-end — HMRC assigns one of three stagger groups; check your VAT registration letter for your specific due dates). US businesses without sales tax obligations can ignore this line." },
      { q: "What is the most common cash flow projection mistake?", a: "Confusing invoice date with payment date. If your terms are net-30, an invoice raised in January is cash in February. Owners frequently enter sales in the month they were sold rather than the month payment lands, which makes the projection look better than reality. Always enter income in the month cash actually arrives, including a realistic late-payment buffer (15–20% of invoices typically slip)." },
      { q: "What if my running balance goes negative in a future month?", a: "That is a forecast shortfall — you'll run out of cash unless something changes. The calculator highlights the worst month so you can act in advance. Options: accelerate collections (offer 2% early-payment discount), delay payables (negotiate net-60 with suppliers), arrange a short-term loan or overdraft before you need it, or cut a planned expense. The earlier you spot the gap, the cheaper the fix." },
      { q: "How is cash flow different from a profit and loss statement?", a: "A P&L shows revenue and expenses on an accrual basis — income is recorded when invoiced, costs when incurred. Cash flow shows actual money moving in and out of the bank. The two diverge whenever there is a timing gap: late-paying clients, supplier credit terms, large prepayments, or depreciation (non-cash). Profitable businesses go bust from cash flow problems, not P&L problems — which is why both need monitoring." },
      { q: "I have my 12-month projection — what should I do with it?", a: "Three actions. One: identify the lowest-balance month and confirm your cash reserve plus credit facilities cover it with a 20% buffer. Two: rerun the model with a stress case — what if revenue is 20% lower or one big client pays 60 days late? Three: set a monthly check-in to compare actual cash to forecast. Variances over 10% mean the model needs updating, not that the model is wrong." },
    ],
  },

  "net-profit-calculator": {
    slug: "net-profit-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "SMB: $500k revenue / $250k COGS / $150k OpEx",
        href: "/net-profit-calculator?revenue=500000&cogs=250000&opex=150000&interest=8000",
      },
      {
        label: "High-margin SaaS: $1M revenue / $150k COGS",
        href: "/net-profit-calculator?revenue=1000000&cogs=150000&opex=500000&interest=0",
      },
      {
        label: "Thin-margin retail: $800k revenue / $560k COGS",
        href: "/net-profit-calculator?revenue=800000&cogs=560000&opex=180000&interest=12000",
      },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Net Profit Calculator",
    featureList: [
      "Full revenue-to-net-profit waterfall in one screen",
      "Deducts COGS, OpEx, interest, and tax in sequence",
      "Region-aware corporate tax pre-fill (US 21%, UK 25%, SA 27%)",
      "Net margin percentage alongside net profit",
    ],
    howToName: "How to calculate true net profit",
    howToDescription: "Walk down the income statement from revenue to net profit after COGS, operating expenses, interest, and tax.",
    howToSteps: [
      { name: "Enter total revenue", text: "Top-line revenue for the period — typically annual." },
      { name: "Add COGS and operating expenses", text: "Cost of goods sold first; then operating expenses like rent, salaries, marketing." },
      { name: "Add interest expense", text: "Total interest paid on any business loans or credit lines in the period." },
      { name: "Confirm the tax rate", text: "Pre-filled by region. Override if you have a different effective rate." },
      { name: "Read the full waterfall", text: "Gross profit → operating profit (EBIT) → EBT → net profit, with net margin as a percentage." },
    ],
    methodologyNote:
      "Tax rate pre-fills at headline corporate rates (US 21%, UK 25%, SA 27%). Override for: US state tax additions, UK small profits rate (19% under £50k), SA turnover tax (small business alternative).",
    sources: CORPORATE_TAX_SOURCES,
    featuredAnswer:
      "Net profit is revenue minus all costs: Revenue − COGS − Operating Expenses − Interest − Tax = Net Profit. The full waterfall produces gross profit, operating profit (EBIT), earnings before tax (EBT), and finally net profit. Net margin = Net Profit ÷ Revenue × 100; 10–20% is healthy for most small businesses.",
    faqs: [
      { q: "What is net profit?", a: "Net profit is the amount of money a business has left after paying ALL its expenses — including cost of goods sold, operating costs, interest on loans, and tax. It is the true bottom-line measure of business profitability, also called the \"bottom line\"." },
      { q: "What is the difference between gross profit and net profit?", a: "Gross profit = Revenue minus Cost of Goods Sold only. Net profit = Revenue minus ALL costs including COGS, operating expenses, interest, and tax. A business with a high gross profit margin can still have a low or negative net profit if overhead costs are high." },
      { q: "How do I calculate net profit margin?", a: "Net Profit Margin (%) = (Net Profit / Revenue) × 100. If your net profit is $25,000 on revenue of $200,000, your net profit margin is 12.5%. This means you keep $12.50 for every $100 of revenue after paying all costs." },
      { q: "What is EBITDA and is it the same as net profit?", a: "EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortisation) is not the same as net profit. EBITDA excludes these four items to give a measure of operational profitability. Net profit includes them all. Investors often use EBITDA for business valuation; net profit for assessing true returns." },
      { q: "What is a good net profit margin?", a: "It varies significantly by industry. Retail: 2–5%. Software/SaaS: 20–30%. Consulting: 15–25%. Manufacturing: 5–10%. A net margin above 10% is generally considered healthy. Below 5% is thin and vulnerable to cost increases or revenue decline." },
      { q: "How does corporation tax differ between the US, UK, and South Africa?", a: "US federal corporate tax is 21%, but state taxes add 0–10% on top (Texas and Florida charge 0%, California adds 8.84%). UK corporation tax is 25%, with a 19% small profits rate for taxable profits under £50,000. South Africa charges a flat 27% on company income. This calculator preloads the headline rate for each region, but always confirm your effective rate with an accountant." },
      { q: "What is the most common net profit calculation mistake?", a: "Forgetting to deduct the owner's salary from operating expenses. A sole owner who pays themselves through dividends or drawings often shows an inflated net profit because their labour cost is missing from the income statement. Always include a market-rate salary for the founder in OpEx — otherwise the business looks more profitable than it is and decisions get made on the wrong number." },
      { q: "What happens if my interest expense is bigger than operating profit?", a: "Earnings before tax (EBT) becomes negative — operating profit minus interest = a loss. The calculator stops applying tax at that point (you do not pay tax on a loss in any of the three regions, and you may be able to carry the loss forward). A negative EBT is a strong signal that your debt service is unsustainable: either revenue must grow or the loan needs to be restructured." },
      { q: "How is net profit different from cash flow?", a: "Net profit is an accounting result — it includes non-cash items like depreciation and counts revenue when it is invoiced, not when it is paid. Cash flow tracks actual money in and out of the bank. A business can be profitable on paper but cash-poor (clients pay late) or unprofitable but cash-rich (deposits taken in advance). Use this calculator for profitability and the Cash Flow Calculator for liquidity." },
      { q: "I have my net profit number — what do I do with it?", a: "Three things. First, calculate the net margin (net profit ÷ revenue) and compare it to your industry benchmark. Second, look at the waterfall to see which line is eating the most profit — is it COGS, OpEx, interest, or tax? Attack the biggest leak. Third, decide what to do with the profit: reinvest in growth, pay down debt, build a cash reserve, or take it as owner compensation. Treat the number as a starting point for a decision, not the end of the analysis." },
    ],
  },

  "ecommerce-profit-calculator": {
    slug: "ecommerce-profit-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Amazon FBA: $29.99 sale / $8 cost",
        href: "/ecommerce-profit-calculator?platform=Amazon+FBA&fee=15&price=29.99&cost=8&shipping=3.5&ads=2",
      },
      {
        label: "Etsy: $45 sale / $12 cost / $3 shipping",
        href: "/ecommerce-profit-calculator?platform=Etsy&fee=6.5&price=45&cost=12&shipping=3&ads=1",
      },
      {
        label: "Shopify DTC: $89 sale / $20 cost / $15 ads",
        href: "/ecommerce-profit-calculator?platform=Shopify&fee=2.9&price=89&cost=20&shipping=5&ads=15",
      },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Ecommerce Profit Calculator",
    featureList: [
      "Platform presets: Amazon FBA, Etsy, eBay, Shopify",
      "Deducts product cost, platform fee, shipping, ad spend, VAT",
      "Net profit and net margin per unit sold",
      "Region-aware VAT handling for UK and South Africa",
    ],
    howToName: "How to calculate ecommerce profit per unit",
    howToDescription: "Find true profit per unit after platform fees, shipping, advertising, and VAT — across Amazon, Etsy, eBay, and Shopify.",
    howToSteps: [
      { name: "Pick your platform", text: "Click Amazon FBA, Etsy, eBay, Shopify, or Custom — the platform fee % pre-fills accordingly." },
      { name: "Enter selling price and product cost", text: "Your listing price and the landed cost of the product to you (including shipping into your warehouse)." },
      { name: "Add shipping and ad spend per sale", text: "Outbound shipping cost (if you cover it) and the advertising cost attributable to each sale." },
      { name: "Set the VAT rate (optional, UK/SA)", text: "VAT is removed from the gross price for VAT-registered sellers in UK and SA." },
      { name: "Read net profit and net margin per unit", text: "The result shows what actually reaches your bank after every deduction." },
    ],
    methodologyNote:
      "Platform fee defaults: Amazon FBA 15%, Etsy 6.5%, eBay 13%, Shopify 2.9%. Headline rates only — your actual fees may include category-specific premiums or volume discounts. Check your platform's seller dashboard for the exact split.",
    sources: VAT_SALES_TAX_SOURCES,
    featuredAnswer:
      "Ecommerce profit per unit = Selling Price − Product Cost − Platform Fee − Shipping − Ad Spend − VAT. On a $29.99 Amazon FBA sale with $8 product cost, 15% platform fee, $3.50 shipping, and $2 ads, you net about $12. Most sellers underestimate platform fees and ad spend.",
    faqs: [
      { q: "Why is my ecommerce profit lower than I expected?", a: "Most sellers underestimate their true costs. Platform fees (10–20%), shipping (10–25% of revenue), advertising (10–30%), and payment processing all erode your margin. This calculator adds all these up — the result is often a shock for sellers who only calculated product cost vs. selling price." },
      { q: "What are Amazon FBA fees?", a: "Amazon FBA (Fulfilled by Amazon) charges a referral fee (typically 8–15% depending on category) plus fulfilment fees based on product size/weight (typically $3–$8 per unit). There are also monthly storage fees. Enter your total fee as a percentage of selling price in this calculator." },
      { q: "How do I calculate Etsy profit?", a: "Etsy charges a 6.5% transaction fee, a payment processing fee (3–4%), and a listing fee ($0.20 per item). Enter 6.5% as the platform fee and add the listing fee to your fixed costs. Etsy also collects VAT in the UK and SA on your behalf." },
      { q: "What profit margin should I target in ecommerce?", a: "Target a minimum net profit margin of 20–30% per unit after all fees and costs. Below 15% leaves no room for returns, price competition, or ad spend increases. Below 10% is generally not viable as a sustainable ecommerce business." },
      { q: "How does advertising cost affect ecommerce profitability?", a: "Advertising cost per sale (also called ACOS — Advertising Cost of Sale on Amazon) directly reduces your net profit. An ACOS of 30% on a $30 product means you spend $9 in ads per sale. Tracking ad spend per unit sold (not total campaign spend) is essential for accurate profitability analysis." },
      { q: "How does VAT change my ecommerce profit in the UK and SA?", a: "If you are VAT-registered, the gross selling price is shown inclusive of 20% VAT in the UK or 15% in South Africa. You owe that VAT to HMRC or SARS, so it never reaches your bank account. The calculator strips it out before calculating profit. In the US, sales tax is collected at checkout and remitted to the state — also not your money. Always work in net-of-tax numbers when comparing per-unit profitability." },
      { q: "What is the biggest mistake new ecommerce sellers make on profit?", a: "Pricing based on product cost alone and ignoring variable costs per sale. A $20 product that cost $8 looks like a 60% margin — until you subtract a $3 platform fee, $4 shipping, $3 ad spend, and $0.60 in payment processing. Real net profit is $1.40, or 7%. Run every product through this calculator before launching, and re-run quarterly as fees and ad costs change." },
      { q: "What if I have returns or refunds — how do I factor those in?", a: "Returns are usually expressed as a percentage of orders (5–15% is typical, higher in apparel). To bake them in, increase your platform fee or shipping cost slightly to reflect the real cost per sold-and-kept unit. For example, a 10% return rate on a product that costs $4 to ship adds about $0.40 in absorbed shipping per net sale. Returns also forfeit the original ad spend, so add a small premium to ACOS too." },
      { q: "What if my advertising cost per sale is zero?", a: "That means you are getting all your traffic from organic, repeat, or referral sources — the most profitable kind of revenue. The calculator will return a higher net profit, which is correct, but be cautious about assuming this can scale. Most ecommerce businesses need paid ads to grow beyond their existing audience. Model the same product with a realistic ACOS (20–30%) to see what scaled economics look like." },
      { q: "How is ecommerce profit different from a regular profit margin calculation?", a: "A regular profit margin treats cost as a single COGS line. Ecommerce profit breaks variable costs into four moving parts — product cost, platform fee, shipping, and ads — because each one behaves differently. Platform fees scale with price, shipping scales with weight, and ad cost scales with competition. Treating them separately exposes which lever to pull when margin slips, instead of just \"costs are up.\"" },
    ],
  },

  "cost-per-unit-calculator": {
    slug: "cost-per-unit-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Small batch: $10k fixed / $5k variable / 500 units",
        href: "/cost-per-unit-calculator?fixed=10000&variable=5000&units=500",
      },
      {
        label: "Scale-up: $50k fixed / $25k variable / 5,000 units",
        href: "/cost-per-unit-calculator?fixed=50000&variable=25000&units=5000",
      },
      {
        label: "High-volume: $200k fixed / $150k variable / 50,000 units",
        href: "/cost-per-unit-calculator?fixed=200000&variable=150000&units=50000",
      },
    ],
    category: "Break-Even & Cash Flow",
    applicationSubCategory: "Cost Per Unit Calculator",
    featureList: [
      "Splits fixed and variable cost per unit",
      "Volume scaling table at 50%, 100%, 150%, 200% of current production",
      "Shows economies of scale at a glance",
      "Region-aware currency",
    ],
    howToName: "How to calculate cost per unit",
    howToDescription: "Calculate fixed, variable, and total cost per unit, plus how unit cost falls at higher production volumes.",
    howToSteps: [
      { name: "Enter total fixed costs", text: "Costs that don't change with production volume — rent, equipment depreciation, management salaries." },
      { name: "Enter total variable costs", text: "Costs that scale with each unit — raw materials, direct labour, packaging." },
      { name: "Enter number of units produced", text: "Total units made or bought in the period." },
      { name: "Read CPU and the scaling table", text: "Fixed CPU, variable CPU, and total CPU display together. The table shows what your unit cost would be at 50%, 100%, 150%, and 200% of current volume." },
    ],
    methodologyNote:
      "Standard unit-cost formula: total CPU = (fixed + variable costs) / units produced. Scaling table assumes fixed costs stay constant and variable costs scale linearly with volume (no bulk discounts modelled).",
    featuredAnswer:
      "Cost per unit = (Total Fixed Costs + Total Variable Costs) ÷ Number of Units. With $10,000 fixed costs, $5,000 variable costs, and 500 units, total cost per unit is $30 ($20 fixed CPU + $10 variable CPU). Fixed CPU drops as volume rises — the economies-of-scale effect.",
    faqs: [
      { q: "What is cost per unit?", a: "Cost per unit is the total cost to produce or acquire one unit of a product, calculated by dividing total production costs by the number of units produced. It includes both fixed costs (spread across all units) and variable costs (direct per-unit costs)." },
      { q: "Why does my cost per unit decrease when I produce more?", a: "Fixed costs (like rent, equipment, and management salaries) stay the same regardless of how many units you produce. When spread across more units, the fixed cost component per unit decreases. This is called economies of scale — one of the primary advantages of higher production volumes." },
      { q: "What is the difference between fixed and variable costs?", a: "Fixed costs do not change with production volume — rent, insurance, equipment depreciation. Variable costs scale directly with production — raw materials, labour per unit, packaging. Total cost per unit = (Fixed Costs ÷ Units) + Variable Cost Per Unit." },
      { q: "How do I use cost per unit for pricing?", a: "Cost per unit is the minimum floor for your pricing. Your selling price must exceed your cost per unit to make a profit. Use the Pricing Calculator to set a selling price that gives you your desired profit margin above your cost per unit." },
      { q: "How does production volume affect profitability?", a: "Increasing production volume reduces your fixed cost per unit, which reduces your total cost per unit, which increases your profit margin at the same selling price. Use the scaling table in this calculator to see exactly what your cost per unit would be at different production volumes." },
      { q: "Does cost per unit work differently for service businesses?", a: "Yes — \"units\" become billable hours or completed engagements. Fixed costs are still rent, software, and salaried staff. Variable costs are sub-contractors and project-specific expenses. Divide total cost by total billable hours to get an hourly cost floor. The Freelance Rate Calculator is purpose-built for this and will be more accurate than this product-focused calculator for pure service work." },
      { q: "What is the most common cost per unit mistake?", a: "Leaving owner labour out of fixed costs. Sole proprietors often skip their own salary because they pay themselves from profit. The true cost per unit is then understated — sometimes by 30–50% — making products look more profitable than they are. Always include a market-rate salary for working owners in fixed costs before dividing by units." },
      { q: "What if I produce zero units in the period?", a: "Cost per unit becomes undefined (you cannot divide by zero) and the calculator will show a dash. Practically, your fixed costs still accrue (rent, salaries, insurance), so they become 100% loss for that period. This is a useful red flag for businesses with seasonal production — model the months when no units are produced separately, and ensure cash reserves cover the fixed-cost-only periods." },
      { q: "I know my cost per unit — what should I do with it?", a: "Use it as your absolute price floor. Run it through the Pricing Calculator to set a selling price that hits your target margin (typically 40–60% above cost for retail). Then run the scaling table to find the production volume where cost per unit drops meaningfully — that volume becomes your sales target for the next quarter, because each step up improves margin without raising the price." },
      { q: "How is cost per unit different from break-even price?", a: "Cost per unit is what each item costs you to make. Break-even price is the minimum you must charge per unit to cover all costs at the planned production volume — they are usually the same number if you have priced the unit correctly. The difference appears when you change production volume: cost per unit drops with scale, but break-even price drops too only if fixed costs are spread over more units." },
    ],
  },

  "business-loan-calculator": {
    slug: "business-loan-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "SBA 7(a): $50k at 7.5% over 5 years",
        href: "/business-loan-calculator?amount=50000&rate=7.5&term=5&unit=years",
      },
      {
        label: "Equipment: $25k at 9% over 36 months",
        href: "/business-loan-calculator?amount=25000&rate=9&term=36&unit=months",
      },
      {
        label: "Expansion: $250k at 8.5% over 10 years",
        href: "/business-loan-calculator?amount=250000&rate=8.5&term=10&unit=years",
      },
    ],
    category: "Funding & Valuation",
    applicationSubCategory: "Business Loan Calculator",
    featureList: [
      "Monthly payment, total interest, total cost in one screen",
      "Full month-by-month amortisation table",
      "Region-aware interest rate pre-fill (US 7.5%, UK 8.5%, SA 14.5%)",
      "Toggle term in months or years",
    ],
    howToName: "How to calculate business loan repayments",
    howToDescription: "Calculate monthly business loan payment, total interest paid, and full amortisation schedule for any loan amount.",
    howToSteps: [
      { name: "Enter loan amount", text: "Total principal you intend to borrow." },
      { name: "Set the annual interest rate (APR)", text: "Pre-filled with the typical SME rate for your region — override with the actual rate you're being offered." },
      { name: "Set the loan term", text: "Toggle between months or years, then enter the term length." },
      { name: "Read monthly payment and total cost", text: "The calculator shows the fixed monthly payment, total interest paid, and total cost over the full term." },
      { name: "Expand the amortisation schedule", text: "Click to view the month-by-month breakdown of principal vs interest in each payment." },
    ],
    methodologyNote:
      "Pre-fill rates are mid-range SME rates for each region: US SBA 7(a) ~7.5%, UK SME ~8.5%, SA prime + margin ~14.5%. Actual rates vary by lender, term, credit, and collateral. APR includes fees; lenders quoting headline rates may be missing fee components.",
    sources: LOAN_RATE_SOURCES,
    featuredAnswer:
      "Monthly business loan payment uses the standard amortisation formula: P × [r(1+r)^n] / [(1+r)^n − 1], where P is principal, r is the monthly rate (APR ÷ 12 ÷ 100), and n is total months. A $50,000 loan at 8% APR over 60 months has a $1,013.82 monthly payment.",
    faqs: [
      { q: "How do I calculate business loan repayments?", a: "Monthly Payment = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly payments. This calculator does this automatically — just enter the loan amount, rate, and term." },
      { q: "What is an amortisation table?", a: "An amortisation table shows the breakdown of every loan payment into principal (reducing the loan balance) and interest (the cost of borrowing). In early payments, most of your payment is interest. Over time, the proportion shifts toward principal. This table shows exactly how your loan balance reduces each month." },
      { q: "What interest rate should I use for a business loan?", a: "In the USA, SBA 7(a) loans currently range from 6.5–9.5%. Conventional unsecured business loans: 8–25% depending on creditworthiness. In the UK, 7–15% for SME unsecured loans. In South Africa, prime rate is approximately 11.75%, with loans typically at prime + 2–5%." },
      { q: "Is it better to take a shorter or longer loan term?", a: "A shorter term means higher monthly payments but less total interest paid. A longer term means lower monthly payments but significantly more total interest. Use this calculator to compare: a $50,000 loan at 8% costs $10,829 in interest over 5 years vs $18,526 over 10 years." },
      { q: "What is APR and how does it affect my loan cost?", a: "APR (Annual Percentage Rate) is the true annual cost of borrowing including fees, not just the stated interest rate. Always ask lenders for the APR, not just the interest rate. A loan with a lower interest rate but high fees can have a higher APR than a loan with a slightly higher stated rate but lower fees." },
      { q: "How do business loan rates compare across the US, UK, and SA?", a: "US SBA-backed loans are the cheapest at 6.5–9.5%, conventional bank loans 8–15%, online lenders 15–35%. UK SME loans range from 7–15% from high-street banks, with alternative lenders going to 25%+. South African business loans typically start at prime (around 11.75% in 2026) plus 2–5% — so 13.75–16.75% is common. Regional risk profiles and central-bank rates explain most of the gap." },
      { q: "What is the most common business loan mistake?", a: "Borrowing the maximum approved rather than what the business actually needs. Approval amount is set by what you can theoretically repay, not what generates returns above the cost of the loan. Borrowing $200,000 when $80,000 would have funded the project just creates $120,000 of unnecessary interest expense (about $10,000 a year at 8%) and ties up future borrowing capacity for no benefit." },
      { q: "What if my interest rate is zero (a 0% deal)?", a: "The amortisation formula divides by the interest rate, so a literal 0% would cause an error. The calculator handles 0% by switching to a simple division: monthly payment = loan amount ÷ number of months. Total interest is zero. Genuinely free loans are rare in business lending; if you see a 0% offer, check for origination fees, prepayment penalties, or balloon payments that shift the cost elsewhere." },
      { q: "I have my monthly payment — what should I check next?", a: "Three tests. One: payment as a percentage of monthly revenue — under 10% is comfortable, 10–20% is manageable, above 20% is risky. Two: the project being financed must generate cash returns greater than the interest cost (otherwise borrowing destroys value). Three: stress-test the payment against a 20% revenue drop. If the business breaks at that drop, the loan is too large or the term too short." },
      { q: "How is a business loan different from a line of credit?", a: "A loan is a lump-sum disbursement with fixed monthly payments over a set term — best for one-off purchases like equipment or a vehicle. A line of credit is a pool you can draw from and repay flexibly, paying interest only on what you've borrowed — better for managing cash flow gaps. Loans typically have lower interest rates; lines of credit offer flexibility at slightly higher cost." },
    ],
  },

  "payback-period-calculator": {
    slug: "payback-period-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Equipment: $50k / $18k per year",
        href: "/payback-period-calculator?investment=50000&inflow=18000",
      },
      {
        label: "Software platform: $20k / $9k per year, 10% discount",
        href: "/payback-period-calculator?investment=20000&inflow=9000&discount=10",
      },
      {
        label: "Office buildout: $120k / $30k per year, 12% discount",
        href: "/payback-period-calculator?investment=120000&inflow=30000&discount=12",
      },
    ],
    category: "Funding & Valuation",
    applicationSubCategory: "Payback Period Calculator",
    featureList: [
      "Simple payback period in years",
      "Discounted payback option for time value of money",
      "Color-coded tier (green ≤3 years, amber 3–5, red >5)",
      "Region-aware currency",
    ],
    howToName: "How to calculate investment payback period",
    howToDescription: "Calculate how many years it takes to recoup an initial business investment from its annual cash flows.",
    howToSteps: [
      { name: "Enter the initial investment", text: "Upfront cost of the investment in your local currency." },
      { name: "Enter the annual cash inflow", text: "Net cash the investment is expected to generate each year." },
      { name: "Optionally add a discount rate", text: "Typically your cost of capital (8–12%). Enables the discounted payback calculation." },
      { name: "Read simple and discounted payback", text: "Simple payback shows years to recoup at face value. Discounted payback weights future cash flows lower to reflect time value of money." },
    ],
    methodologyNote:
      "Simple payback ignores cash flows after recovery (so a 3-year-payback investment producing for 20 years is treated the same as one producing for 3). Pair with ROI for total-return view.",
    featuredAnswer:
      "Payback period is years until an investment recoups its initial cost: Investment ÷ Annual Cash Inflow. A $50,000 investment generating $18,000 per year has a payback period of 2.78 years. Discounted payback applies a discount rate to future cash flows to reflect the time value of money.",
    faqs: [
      { q: "What is the payback period?", a: "The payback period is the time it takes for an investment to generate enough cash flow to recoup its initial cost. A $10,000 investment that generates $2,500 per year has a 4-year payback period. Shorter payback periods mean lower risk." },
      { q: "What is a good payback period for a business investment?", a: "Most businesses target payback periods of 2–3 years for equipment and 1–2 years for marketing investments. Investments with payback periods under 2 years are generally considered low-risk. Above 5 years requires careful consideration of opportunity cost." },
      { q: "What is discounted payback period?", a: "Discounted payback period accounts for the time value of money — future cash flows are worth less than present cash flows due to inflation and opportunity cost. It discounts each year's cash flow back to present value before cumulating toward the investment recovery point." },
      { q: "How is payback period different from ROI?", a: "ROI measures the total profitability of an investment as a percentage. Payback period measures how quickly you get your money back, without regard for what happens after that point. Both are useful: ROI for total return, payback for liquidity and risk assessment." },
      { q: "What are the limitations of payback period analysis?", a: "Payback period ignores cash flows after the recovery point (a 3-year payback investment that earns for 20 years vs 3 years is treated the same). Use it alongside ROI and NPV analysis for complete investment evaluation." },
      { q: "What discount rate should I use in the US, UK, and SA?", a: "The discount rate reflects your opportunity cost — what you'd earn investing the money elsewhere. US small businesses often use 10–15% (above stock market average to compensate for business risk). UK businesses 8–12% (in line with WACC for typical SMEs). South African businesses 13–18% (higher local interest rates and currency risk push the floor up). Use a higher rate if the investment is risky or the cash flows are uncertain." },
      { q: "What is the most common payback period mistake?", a: "Using projected cash flows that are too optimistic. A spreadsheet showing 4-year payback on equipment that promises $25,000 annual savings looks great — until the equipment underperforms by 30% and the real payback is 5.7 years. Always model a base case, a worst case (cash flows 25% lower), and a best case. If the worst case exceeds 5 years, the investment is fragile." },
      { q: "What if my annual cash flow is zero or negative?", a: "Simple payback becomes infinite (you'd never recover the investment) and the calculator returns an error. Negative cash flow means the investment is losing money in addition to not paying back. This isn't always disqualifying — an investment in brand or R&D may have negative direct cash flow but build long-term value. But it does mean payback period is the wrong evaluation tool; switch to ROI or strategic value assessment." },
      { q: "I have my payback period — what should I do with it?", a: "Compare it to two benchmarks. One: your maximum acceptable payback for that asset class — typically 2 years for marketing, 3 years for equipment, 5 years for property. If the calculator says longer, the project is too slow. Two: the asset's useful life — payback must be significantly shorter than how long the asset will keep earning. Equipment with 6-year life and 5-year payback gives only one year of pure profit; not enough margin for error." },
      { q: "How is payback different from break-even?", a: "Break-even asks \"how many units per period must I sell to cover ongoing costs?\" — it's an operational measure repeated every period. Payback asks \"how long until a one-off capital investment is recovered?\" — it's a one-time measure for a specific decision. A new product launch needs both: the unit volume to be operationally viable (break-even) and the months until the launch investment is recouped (payback)." },
    ],
  },

  "burn-rate-calculator": {
    slug: "burn-rate-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Pre-revenue: $500k cash / $0 in / $50k out",
        href: "/burn-rate-calculator?cash=500000&revenue=0&expenses=50000",
      },
      {
        label: "Early stage: $1M cash / $20k in / $80k out",
        href: "/burn-rate-calculator?cash=1000000&revenue=20000&expenses=80000",
      },
      {
        label: "Approaching profit: $300k / $60k in / $70k out",
        href: "/burn-rate-calculator?cash=300000&revenue=60000&expenses=70000",
      },
    ],
    category: "Funding & Valuation",
    applicationSubCategory: "Burn Rate & Runway Calculator",
    featureList: [
      "Gross burn and net burn calculated separately",
      "Runway in months with color-coded urgency tier",
      "Cash exhaustion date estimate",
      "Handles cash-flow-positive scenarios (infinite runway)",
    ],
    howToName: "How to calculate startup burn rate and runway",
    howToDescription: "Calculate gross burn, net burn, and months of runway from cash balance, revenue, and monthly expenses.",
    howToSteps: [
      { name: "Enter current cash balance", text: "Bank balance plus liquid assets — the total you can spend." },
      { name: "Enter monthly revenue", text: "Average monthly income. Use 0 for pre-revenue startups." },
      { name: "Enter monthly expenses", text: "Total monthly cash outflows — salaries, rent, software, suppliers." },
      { name: "Read burn rate and runway", text: "Gross burn (total expenses), net burn (expenses minus revenue), and runway in months. The cash exhaustion date estimates when funds run out at current trajectory." },
    ],
    methodologyNote:
      "Runway = cash / net burn. Assumes current-month income and expense levels continue. In practice, expenses creep, hires happen, and revenue is non-linear. Update inputs monthly for accurate tracking.",
    featuredAnswer:
      "Burn rate is monthly cash consumption: Gross Burn = total monthly expenses; Net Burn = expenses minus revenue. Runway in months = Cash Balance ÷ Net Burn. A startup with $500,000 cash and a $50,000 net burn has 10 months of runway. Below 9 months is critical — start fundraising at 12.",
    faqs: [
      { q: "What is burn rate?", a: "Burn rate is the rate at which a company spends its cash reserves. Gross burn rate is total monthly expenses. Net burn rate is expenses minus revenue — the net cash being consumed each month. A startup with $500,000 in the bank and a $50,000 net burn rate has 10 months of runway." },
      { q: "What is a startup runway?", a: "Runway is the number of months a company can operate before running out of cash, calculated as: Current Cash / Monthly Net Burn Rate. Investors typically want to see at least 18 months of runway. Below 9 months is a critical situation requiring immediate action." },
      { q: "What is a healthy burn rate for a startup?", a: "There is no single healthy burn rate — it depends on your stage and funding. What matters is the ratio of burn to progress. A startup burning $100,000/month with rapid revenue growth may be more healthy than one burning $20,000/month with no growth." },
      { q: "How do I extend my runway?", a: "Runway extension strategies: cut non-essential costs immediately, accelerate revenue collection, offer annual payment discounts to customers, renegotiate vendor contracts, pause hiring, and identify break-even milestones to reduce burn systematically." },
      { q: "When should a startup raise more funding?", a: "Start fundraising when you have 9–12 months of runway remaining. Fundraising typically takes 3–6 months, so starting at 12 months gives you a buffer. Never start fundraising with less than 6 months of runway — desperation weakens your negotiating position." },
      { q: "Do US, UK, and South African startups think about runway differently?", a: "The maths is identical, but the cushion expectations differ. US VC-backed startups typically target 18–24 months of runway between rounds because Series A and B fundraising is competitive and slow. UK and EU founders often run leaner — 12–18 months — because angel and seed rounds close faster but at smaller cheque sizes. South African founders frequently need 24+ months because the local VC market is thinner and forex risk on USD costs adds volatility." },
      { q: "What is the most common burn rate mistake?", a: "Using a single-month snapshot rather than a 3-month rolling average. A founder who paid an annual SaaS bill in January will see January burn that overstates true monthly spend by 30–50%, panic, and overcorrect. Always smooth burn over the last three months, and pull out one-off items (legal fees, annual contracts) into a separate line so the underlying trend is visible." },
      { q: "What if my revenue is higher than my expenses?", a: "Net burn is negative — you're cash-flow positive and runway is effectively infinite at the current trajectory. The calculator returns \"profitable\" rather than a runway number. Congratulations, but stay disciplined: the metric to watch shifts from runway to cash conversion (how quickly profit becomes bank balance) and the next milestone becomes reinvestment ROI rather than survival." },
      { q: "How is burn rate different from cash flow?", a: "Burn rate is a summary metric — typically one number for monthly net cash consumption, used by founders and investors as a quick health check. Cash flow is a detailed forecast — month-by-month income and expense lines projected forward. Burn rate tells you how long the runway is; a cash flow projection tells you which month the bumps are. Use burn for board updates, cash flow for operational planning." },
      { q: "I know my runway — what action does it dictate?", a: "Above 18 months: focus on growth and product, not fundraising. 12–18 months: start warming investor conversations and tightening unit economics. 9–12 months: begin formal fundraising and identify cost cuts that don't damage growth. Under 6 months: assume fundraising will fail and execute a path to breakeven (cut burn 30–50%, even at the cost of growth speed). Match the action to the runway band, not your mood." },
    ],
  },

  "business-valuation-calculator": {
    slug: "business-valuation-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Service business: $750k rev / $150k EBITDA",
        href: "/business-valuation-calculator?revenue=750000&ebitda=150000&fcf=120000&rev_multiple=1.5&ebitda_multiple=5&discount=20&growth=10",
      },
      {
        label: "SaaS: $2M rev / $400k EBITDA / 6× revenue",
        href: "/business-valuation-calculator?revenue=2000000&ebitda=400000&fcf=350000&rev_multiple=6&ebitda_multiple=12&discount=18&growth=20",
      },
      {
        label: "Mature retail: $1.5M rev / $200k EBITDA / 0.8× revenue",
        href: "/business-valuation-calculator?revenue=1500000&ebitda=200000&fcf=150000&rev_multiple=0.8&ebitda_multiple=4&discount=22&growth=5",
      },
    ],
    category: "Funding & Valuation",
    applicationSubCategory: "Business Valuation Calculator",
    featureList: [
      "Three valuation methods side-by-side: revenue multiple, EBITDA multiple, DCF",
      "5-year DCF with terminal value calculation",
      "Valuation range (low, midpoint, high) for negotiation anchors",
      "Industry-typical multiple ranges in helper text",
    ],
    howToName: "How to value a small business",
    howToDescription: "Estimate small business value using revenue multiple, EBITDA multiple, and discounted cash flow side-by-side.",
    howToSteps: [
      { name: "Enter revenue, EBITDA, and free cash flow", text: "Last 12 months of revenue; EBITDA; and annual free cash flow for the DCF method." },
      { name: "Set the revenue and EBITDA multiples", text: "Use industry averages shown in helper text — service 2–4× EBITDA, SaaS 3–8× revenue, retail 0.5–1.5× revenue." },
      { name: "Set discount rate and growth rate for DCF", text: "Discount rate is typically 15–25% for SMEs; growth rate is your expected annual revenue growth." },
      { name: "Read the valuation range", text: "Three methods produce three values. Use the range and midpoint as your asking-price anchor — buyers expect to negotiate within a range." },
    ],
    methodologyNote:
      "DCF uses 5-year explicit projection + Gordon growth terminal value. The terminal value typically accounts for 60–80% of total DCF — small changes to growth or discount rate produce large swings. Use the range across methods, not the DCF alone.",
    featuredAnswer:
      "Most small businesses are valued using three methods: revenue × industry multiple, EBITDA × industry multiple, and discounted cash flow (DCF). Typical SME EBITDA multiples are 3–7×; SaaS revenue multiples 3–8×; service businesses 2–4× EBITDA. The midpoint of the three methods anchors realistic asking prices.",
    faqs: [
      { q: "How do I value a small business?", a: "The three most common methods for valuing a small business are: (1) Revenue Multiple — annual revenue × an industry-specific multiple, (2) EBITDA Multiple — earnings before interest/tax × a multiple (most reliable for profitable businesses), and (3) Discounted Cash Flow — present value of projected future cash flows." },
      { q: "What multiple is used to value a small business?", a: "Multiples vary by industry and profitability. Service businesses typically sell at 2–4× EBITDA. SaaS businesses at 4–10× revenue. Retail at 0.5–1.5× revenue. Manufacturing at 4–6× EBITDA. Businesses with strong recurring revenue and low customer concentration command higher multiples." },
      { q: "What makes a business more valuable?", a: "Key value drivers: recurring or contracted revenue, high customer retention, documented systems and processes (not owner-dependent), diversified customer base, strong brand, barriers to competition, and consistent year-on-year growth. Businesses that run without the owner command the highest multiples." },
      { q: "How much can I sell my business for on Flippa?", a: "Online businesses (content sites, SaaS, ecommerce) on Flippa typically sell for 30–42× monthly net profit. A site earning $3,000/month net would sell for $90,000–$126,000. Larger, more established businesses with proven traffic sell at higher multiples." },
      { q: "What is EBITDA and why is it used for business valuation?", a: "EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortisation) is used because it removes non-cash charges and financing decisions, giving a cleaner picture of operational profitability that buyers can compare across businesses with different capital structures and tax situations." },
      { q: "Do business valuations differ in the US, UK, and South Africa?", a: "Methods are universal but multiples vary. US small businesses typically sell at 3–5× EBITDA (higher in tech), UK SMEs at 4–6× EBITDA (boosted by easier acquisition financing), and South African businesses at 2–4× EBITDA (higher country risk discount and thinner buyer pool). DCF discount rates also differ: 10–12% US, 9–11% UK, 14–18% SA. The same business is often worth 30–50% less in SA than in the US for structural reasons." },
      { q: "What is the most common business valuation mistake?", a: "Confusing what the owner thinks the business is worth (often based on years of effort and personal investment) with what a buyer will actually pay (based on future cash flow they'll inherit). Buyers don't care about sunk effort. Always start with the multiple methods (revenue, EBITDA, DCF) and treat the range they produce as the negotiation window — anchoring to a single number, especially a wishful one, kills deals." },
      { q: "What if my business is making a loss or has zero EBITDA?", a: "EBITDA-based valuation breaks down — a loss-making business cannot be valued on a multiple of negative earnings. Switch to revenue multiple (works for high-growth businesses without profit) or asset-based valuation (value of inventory, equipment, IP, customer contracts). Many software startups sell at 4–10× revenue even at a loss because buyers project future profitability. A traditional business with no profit usually sells at 0.3–0.8× revenue or for asset value only." },
      { q: "I have my valuation range — what do I do with it?", a: "Three uses. One: if selling, set the asking price at the top of the range and negotiate down toward the midpoint. Two: if buying, anchor your offer near the bottom of the range and use due diligence findings to justify staying low. Three: even if not transacting, the valuation is your scorecard — track it annually, and the levers that move it (recurring revenue, owner-independence, customer concentration) become your strategic priorities." },
      { q: "How is business valuation different from a fair price?", a: "Valuation is an analytical estimate based on numbers — EBITDA multiples, DCF assumptions, comparables. Fair price is what the market actually pays, which depends on negotiation, buyer competition, deal terms, and timing. A business valued at $500K via DCF might sell for $400K to a single buyer in a slow market, or $650K in a bidding war. Use valuation to know your defensible range; expect the actual price to land within it but rarely at the calculated midpoint." },
    ],
  },

  "revenue-growth-calculator": {
    slug: "revenue-growth-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "YoY: $180k → $250k (with CAGR over 4 yrs)",
        href: "/revenue-growth-calculator?mode=year&current=250000&previous=180000&start=100000&years=4",
      },
      {
        label: "MoM: $42k → $48k (steady growth)",
        href: "/revenue-growth-calculator?mode=month&current=48000&previous=42000&start=30000&years=2",
      },
      {
        label: "Declining: $500k → $420k (warning sign)",
        href: "/revenue-growth-calculator?mode=year&current=420000&previous=500000&start=380000&years=3",
      },
    ],
    category: "Funding & Valuation",
    applicationSubCategory: "Revenue Growth Calculator",
    featureList: [
      "Month-over-month or year-over-year growth toggle",
      "CAGR (Compound Annual Growth Rate) over any number of years",
      "Color-coded tier vs investor benchmarks",
      "Currency switches by region",
    ],
    howToName: "How to calculate revenue growth rate and CAGR",
    howToDescription: "Calculate period-over-period growth (MoM or YoY) and multi-year CAGR from any two revenue figures.",
    howToSteps: [
      { name: "Pick MoM or YoY mode", text: "Monthly compares this month to last month. Annual compares year-over-year." },
      { name: "Enter current and previous revenue", text: "Same period type — both monthly figures, or both annual figures." },
      { name: "Optionally fill the CAGR section", text: "Starting revenue and number of years for a multi-year compound rate." },
      { name: "Read growth rate and CAGR", text: "Period-over-period growth and the smoothed CAGR display together. Use CAGR to compare against investor benchmarks." },
    ],
    methodologyNote:
      "CAGR formula assumes geometric compounding from start value to end value over N years. Doesn't reflect intra-period volatility — a business that grew 100% one year and -50% the next can have a benign CAGR.",
    featuredAnswer:
      "Revenue growth rate is ((Current − Previous) ÷ Previous) × 100. From $180,000 to $250,000 is 38.9% growth. CAGR (Compound Annual Growth Rate) smooths multi-year volatility: ((End ÷ Start) ^ (1 ÷ Years)) − 1. Healthy growth for established small businesses is 10–20% annually.",
    faqs: [
      { q: "What is a good revenue growth rate for a small business?", a: "Healthy growth varies by stage: early-stage businesses should target 20–50% annual growth, established small businesses 10–20%, and mature businesses 5–10%. High-growth tech businesses may target 50–100%+ annually. Consistent growth above inflation and market averages is the key benchmark." },
      { q: "What is CAGR and how do I calculate it?", a: "CAGR (Compound Annual Growth Rate) is the constant annual growth rate that would take a starting value to an ending value over a set number of years. Formula: CAGR = (End Value / Start Value)^(1/Years) − 1. It smooths out year-to-year volatility to show underlying trend." },
      { q: "What is the difference between MoM and YoY growth?", a: "Month-over-month (MoM) growth compares this month to last month. Year-over-year (YoY) compares this month (or year) to the same period 12 months ago. YoY is more meaningful for seasonal businesses as it eliminates seasonal fluctuations." },
      { q: "What is negative revenue growth?", a: "Negative revenue growth means your revenue declined compared to the previous period. A -10% growth rate means you earned 10% less than before. Negative growth is a warning signal requiring investigation into its cause — losing customers, market decline, or business model issues." },
      { q: "How do investors use CAGR?", a: "Investors use CAGR to compare the performance of different investments or business metrics over time on an annualised basis. A business growing at 25% CAGR is significantly more attractive than one growing at 5% CAGR, as the former will be 3.05× larger after 5 years vs 1.28× larger." },
      { q: "Do growth expectations differ in the US, UK, and SA?", a: "Yes, mostly driven by market size and capital availability. US investor-backed startups typically need 100%+ year-over-year growth in early years to attract follow-on capital. UK growth-stage SMEs target 30–50% annually. South African businesses face slower addressable-market expansion and typically grow 15–30% annually even when well-run. Adjust your benchmark to your market — chasing US-style growth rates in a smaller market often forces unsustainable spending." },
      { q: "What is the most common growth rate mistake?", a: "Reporting MoM growth during a high-base month and ignoring the comparison. A business that did $100K in December (holiday peak) and $80K in January shows -20% MoM growth — which looks bad but is actually a normal seasonal pattern. Always compare year-over-year for seasonal businesses, and use rolling 3-month averages for smoother trend visibility. Don't celebrate or panic based on a single high-base or low-base month." },
      { q: "What if my starting revenue is zero — can I calculate growth?", a: "No — percentage growth from zero is mathematically infinite (any number divided by zero), and the calculator returns an error. For a new business or a new revenue line, track absolute revenue for the first few periods until you have a meaningful base, then start measuring percentage growth. CAGR also fails from a zero start. Use absolute revenue change (\"grew from $0 to $30K in 6 months\") instead until the base is meaningful." },
      { q: "I have my growth rate — what should I do with it?", a: "Compare it to three things. One: inflation in your region (US ~3%, UK ~2%, SA ~5% in 2026) — growth below inflation means the business is shrinking in real terms. Two: your market's growth rate (industry reports) — beating the market means you're gaining share. Three: your own prior periods — accelerating growth is healthy, decelerating growth needs diagnosis. The number alone is meaningless; the comparison gives it meaning." },
      { q: "How is revenue growth different from profit growth?", a: "Revenue growth measures the top line — total sales over time. Profit growth measures the bottom line — what's left after costs. They often diverge: a business can grow revenue 30% while profit shrinks if costs grow faster (common during rapid expansion). Conversely, profit can grow 20% on flat revenue if margins improve. Track both: revenue growth shows market traction, profit growth shows operational discipline. Healthy long-term businesses grow both, but rarely at the same rate." },
    ],
  },

  "employee-cost-calculator": {
    slug: "employee-cost-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Junior hire: $45k salary, modest benefits",
        href: "/employee-cost-calculator?salary=45000&benefits=3000&equipment=2000&training=1000&office=2500",
      },
      {
        label: "Mid-level developer: $90k salary, full stack of perks",
        href: "/employee-cost-calculator?salary=90000&benefits=9000&equipment=4000&training=2500&office=4000",
      },
      {
        label: "Senior leader: $150k salary, exec-tier benefits",
        href: "/employee-cost-calculator?salary=150000&benefits=18000&equipment=5000&training=4000&office=6000",
      },
    ],
    category: "Freelance & Hiring",
    applicationSubCategory: "Employee Cost Calculator",
    featureList: [
      "Region-aware employer tax pre-fill (US ~11%, UK 13.8%, SA ~2%)",
      "Total annual cost broken down into 6 layers",
      "True hourly cost and productive-hour cost",
      "Cost as % of salary (typically 125–145%)",
    ],
    howToName: "How to calculate the true cost of an employee",
    howToDescription: "Calculate the total annual cost of an employee including salary, employer taxes, benefits, equipment, training, and overhead.",
    howToSteps: [
      { name: "Enter annual salary", text: "Gross salary offered to the employee." },
      { name: "Confirm employer tax rate", text: "Pre-filled by region — FICA + FUTA + SUTA (US ~11%), Employer NIC (UK 13.8%), UIF + SDL (SA ~2%)." },
      { name: "Add benefits, equipment, training, office costs", text: "Health insurance, pension, laptop, software, training budget, and desk/utility allocation." },
      { name: "Read total cost and hourly rates", text: "Total annual cost (typically 125–145% of salary), cost as % of salary, and hourly cost at 2,080 hours vs ~1,700 productive hours." },
    ],
    methodologyNote:
      "Employer tax pre-fills at each region's typical SME burden. US: FICA 7.65% + FUTA 0.6% + SUTA ~2.7% ≈ 11%. UK: Employer NIC 13.8% above secondary threshold. SA: UIF 1% + SDL 1% (SDL exempt under R500k payroll). Confirm against your actual payroll software.",
    sources: EMPLOYER_TAX_SOURCES,
    featuredAnswer:
      "The true cost of an employee is 125–145% of their salary. Add employer payroll taxes (US ~11%, UK 13.8%, SA ~2%), benefits, pension contributions, equipment, training, and office overhead on top. A £45,000 UK salary typically costs the employer around £58,000 fully loaded.",
    faqs: [
      { q: "What is the true cost of an employee?", a: "The true cost of an employee is typically 125–145% of their salary when you include employer payroll taxes, pension/retirement contributions, health insurance, equipment, training, and office overhead. A $60,000 salary employee may cost $75,000–$87,000 in total annual cost." },
      { q: "What are employer payroll taxes in the USA?", a: "US employers pay: FICA (7.65% — covering 6.2% Social Security and 1.45% Medicare), FUTA federal unemployment tax (0.6% on first $7,000 of wages), and state unemployment tax (SUTA, typically 1.5–5%). Total employer taxes are approximately 10–13% of gross wages." },
      { q: "What is employer National Insurance in the UK?", a: "From 6 April 2025 (in force for 2025/26 and 2026/27), UK employers pay National Insurance Contributions (NICs) at 15% on employee earnings above the secondary threshold of £5,000 per year — sharply higher than the pre-April-2025 rate of 13.8% above £9,100. Employers must also contribute at least 3% of qualifying earnings into a pension under automatic enrolment." },
      { q: "Is it cheaper to hire an employee or a contractor?", a: "Contractors typically cost more per hour than employees but have lower total cost because you avoid employer taxes, benefits, pension, equipment, and overhead. For short-term or specialist work, contractors are usually cheaper. For ongoing, full-time roles, employees are typically more cost-effective over 2+ years." },
      { q: "How do I calculate cost per productive hour for an employee?", a: "Not all working hours are billable or fully productive. Subtract time for holidays (average 25 days UK, 10 days USA), sick leave (~5 days), training, meetings, and admin. A full-time employee yields approximately 1,600–1,800 truly productive hours per year, not 2,080." },
      { q: "What employer costs apply to hiring in South Africa?", a: "SA employers contribute 1% of payroll to UIF (capped) and a Skills Development Levy of 1% if total annual payroll exceeds R500,000. There's no compulsory employer pension contribution, but most companies offer 5–10% of salary as a benefit. Workmen's Compensation (COIDA) is typically 0.5–2% of payroll depending on industry. Add roughly 15–20% to the base salary for a realistic all-in figure." },
      { q: "What is the most common employee cost mistake?", a: "Budgeting for salary only and treating everything else as optional. New hires need equipment (laptop, monitor, software licences) costing $2,000–$5,000 in year one. Workspace adds $3,000–$8,000 per year. Training and onboarding cost real money even if the line item is invisible. The 1.25–1.45x salary multiplier exists for a reason — businesses that ignore it are surprised by year-one cash flow." },
      { q: "What if I'm hiring part-time or fractional — does the multiplier still apply?", a: "Mostly yes, but the loaded percentage shifts. Employer taxes scale linearly with salary, so a half-time employee pays half the tax. Benefits often have a fixed minimum (health insurance premium, pension setup fees) that doesn't halve, so the multiplier on a part-time employee can be higher than 1.4x. Equipment is fixed regardless of hours. Enter the actual annual salary and the calculator handles the rest." },
      { q: "I have the true cost — what should I do with it?", a: "Two decisions. First, set the revenue this role must generate to be worth it — usually 2–3x their true cost for a non-management role, higher for sales. If they can't realistically produce that much value, the hire is wrong even if the salary feels affordable. Second, use the productive-hour cost as an internal billing rate — useful for project costing, client quotes (for agencies), and deciding whether to hire vs outsource a specific task." },
      { q: "How is employee cost different from a contractor day rate?", a: "An employee's true cost is fixed and ongoing — you pay it whether they're productive that month or not. A contractor's day rate is high per unit but you only pay it on days they work. For ongoing work over 12+ months, employees typically cost 30–50% less per hour than contractors. For project work under 6 months, contractors are almost always cheaper once you include onboarding, equipment, and termination risk for employees." },
    ],
  },

  "discount-calculator": {
    slug: "discount-calculator",
    lastReviewed: "2026-05-17",
    scenarios: [
      {
        label: "Black Friday: 25% off $100, 10 units",
        href: "/discount-calculator?mode=forward&original=100&discount=25&qty=10",
      },
      {
        label: "Clearance: 50% off $200, 5 units",
        href: "/discount-calculator?mode=forward&original=200&discount=50&qty=5",
      },
      {
        label: "Reverse check: $79 sale from $99 list",
        href: "/discount-calculator?mode=reverse&original=99&price=79&qty=1",
      },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Discount Calculator",
    featureList: [
      "Forward mode: discounted price from original price + discount %",
      "Reverse mode: implied % from original and sale price",
      "Bulk savings table at 1, 5, 10, 50, 100 units",
      "Region-aware currency",
    ],
    howToName: "How to calculate a discount and sale price",
    howToDescription: "Calculate discounted price, savings amount, percentage off, and total bulk savings for any discount scenario.",
    howToSteps: [
      { name: "Choose forward or reverse mode", text: "Forward: original price plus discount % → discounted price. Reverse: original plus discounted price → implied %." },
      { name: "Enter the original price", text: "The standard or list price before discount." },
      { name: "Enter discount % (forward) or sale price (reverse)", text: "Forward mode takes a percentage. Reverse mode takes the discounted price and calculates the implied discount." },
      { name: "Optionally enter quantity", text: "Adds a bulk-savings table for typical order sizes." },
      { name: "Read sale price, savings, and bulk totals", text: "The calculator shows the discounted price, savings per unit, and total savings at typical quantities." },
    ],
    methodologyNote:
      "Simple discount math. Bulk savings table assumes constant per-unit discount across quantities — doesn't model tiered or wholesale discount structures.",
    featuredAnswer:
      "Discounted price = Original Price × (1 − Discount Percentage ÷ 100). A 25% discount on a $100 item gives a $75 sale price and $25 saving. Reverse: Discount % = ((Original − Sale Price) ÷ Original) × 100. Most retail discounts run 10–40%; bigger discounts can erode brand value.",
    faqs: [
      { q: "How do I calculate a discount?", a: "Discounted Price = Original Price × (1 − Discount Percentage / 100). If a $100 item is 25% off, the discount is $25 and the sale price is $75. The savings amount is the original price minus the discounted price." },
      { q: "How do I calculate the percentage off from two prices?", a: "Percentage off = ((Original Price − Sale Price) / Original Price) × 100. If a $100 item is selling for $70, the discount is 30%. Use this calculator's reverse mode to do this automatically." },
      { q: "What is a good discount percentage to offer?", a: "Typical retail discounts run 10–40%. Below 10% rarely drives action. Above 50% can signal poor quality or hurt brand perception unless framed as a clearance event. Consider your margin — a 30% discount on a 35% margin product nearly eliminates profit." },
      { q: "How do I calculate bulk savings?", a: "Multiply the per-unit savings by the quantity. If each unit saves $5 and you buy 100 units, total bulk savings is $500. The bulk savings table in this calculator does this automatically for typical quantities." },
      { q: "Should I offer a percentage or a dollar discount?", a: "Percentages feel larger on low-priced items (\"50% off!\" on $20). Dollar amounts feel larger on high-priced items (\"$200 off!\" on $1000). Research shows customers respond more strongly to the framing that produces the bigger number." },
      { q: "Are discounts taxed differently in the UK, US, and SA?", a: "VAT in the UK (20%) and South Africa (15%) is calculated on the discounted price, so the customer pays less tax as well as less for the item. US sales tax works the same way at the state level — it applies to the post-discount amount. The exception is manufacturer coupons in the US, where some states tax the pre-coupon price. This calculator handles the standard case." },
      { q: "What is the most common discounting mistake?", a: "Discounting deeper than the margin can absorb. A 30% discount on a product with a 35% gross margin cuts your profit per sale from 35% to roughly 7%. To break even on profit you would need to nearly quintuple unit sales to compensate. Always check the post-discount margin (use the Profit Margin Calculator) before publishing the offer, not after the campaign ends." },
      { q: "What if the discount is 100% or more?", a: "A 100% discount means the item is free — sale price is zero and savings equal the original price. The calculator handles this correctly. Discounts above 100% are not mathematically meaningful and the calculator caps the input. If you want to give customers more value than the item costs (e.g. a $50 cashback on a $30 product), structure it as a separate rebate rather than a discount percentage." },
      { q: "I have my discounted price — how do I decide whether the promotion is worth it?", a: "Calculate three numbers. First, the per-unit profit after the discount (price minus all costs). Second, the break-even uplift — how many extra units you need to sell to match pre-discount profit. Third, your realistic expected uplift based on past promotions. If expected uplift comfortably exceeds break-even uplift, run the discount; if not, try a smaller discount or a bundle instead." },
      { q: "How is a discount different from a markdown?", a: "A discount is a temporary price reduction (a sale, a coupon, a flash promotion) — the regular price returns afterwards. A markdown is a permanent reprice, usually applied to clear slow-moving or end-of-season stock. Discounts are a marketing lever; markdowns are an inventory cleanup. Both use the same percentage-off maths, but they signal very different things to customers and affect long-term price perception differently." },
    ],
  },

  "hourly-to-salary-calculator": {
    slug: "hourly-to-salary-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      {
        label: "Standard: $25/hr full-time",
        href: "/hourly-to-salary-calculator?mode=hourly&hourly=25&hours=40&weeks=52",
      },
      {
        label: "Reverse: $80k annual to hourly",
        href: "/hourly-to-salary-calculator?mode=annual&annual=80000&hours=40&weeks=52",
      },
      {
        label: "UK 37.5-hour week",
        href: "/hourly-to-salary-calculator?mode=hourly&hourly=22&hours=37.5&weeks=52",
      },
    ],
    category: "Freelance & Hiring",
    applicationSubCategory: "Hourly to Salary Calculator",
    featureList: [
      "Bidirectional conversion: hourly ↔ annual salary",
      "Configurable hours per week and weeks per year",
      "True loaded cost — salary plus statutory taxes and benefits",
      "Region-aware loaded-cost defaults for USA, UK, and South Africa",
    ],
    howToName: "How to convert hourly rate to annual salary",
    howToDescription: "Convert any hourly rate into an annual salary equivalent, or work backwards from a salary to find the equivalent hourly rate.",
    howToSteps: [
      { name: "Pick a direction", text: "Choose Hourly → Annual or Annual → Hourly using the mode toggle." },
      { name: "Enter the rate or salary", text: "Type the hourly rate or annual salary you want to convert." },
      { name: "Set hours per week and weeks per year", text: "Default is 40 × 52 = 2,080 hours/year. Reduce weeks if the role includes unpaid leave." },
      { name: "Review the loaded-cost figures", text: "The calculator shows the true employer cost after statutory taxes and benefits." },
    ],
    sources: EMPLOYER_TAX_SOURCES,
    methodologyNote:
      "Loaded-cost defaults are market medians: USA 28% (FICA 7.65% + benefits + workers comp); UK 25% (employer NIC 13.8% + pension 3% + benefits); SA 18% (UIF 1% + SDL 1% + benefits). Adjust the input for your actual benefits package.",
    featuredAnswer:
      "To convert an hourly rate to an annual salary, multiply hourly by hours per week by weeks per year. A $25/hr rate at 40 hours per week × 52 weeks = $52,000 annual. The true employer cost is typically 18-28% higher after statutory taxes and benefits.",
    voiceAnswer:
      "Multiply the hourly rate by hours per week and weeks per year. Twenty-five dollars per hour at forty hours per week times fifty-two weeks equals fifty-two thousand dollars per year.",
    faqs: [
      { q: "How do I convert hourly to annual salary?", a: "Multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks per year. The standard full-time figure is 40 hours × 52 weeks = 2,080 hours. A $25/hr rate converts to $52,000 annually. Adjust the weeks figure if your role includes unpaid leave." },
      { q: "How do I convert salary to hourly rate?", a: "Divide your annual salary by total annual hours worked. At 40 hours per week for 52 weeks (2,080 hours), a $80,000 salary equals $38.46/hour. For a more accurate productive hourly rate, divide by billable hours only — typically 1,700-1,800 for an employee with statutory paid leave." },
      { q: "What is loaded cost or fully loaded labor cost?", a: "Loaded cost is the total expense an employer carries per employee — gross salary plus statutory taxes (FICA in the US, employer NIC in the UK, UIF and SDL in SA), plus benefits like health insurance, pension contributions, paid leave, equipment, and software. Typically 18-30% above the headline salary." },
      { q: "How many hours are in a working year?", a: "The standard convention is 2,080 hours (40 hours × 52 weeks) in the US and South Africa, and 1,950 hours (37.5 × 52) in the UK. Once paid leave and public holidays are removed, productive working hours drop to about 1,800-1,920 — relevant for accurate cost-per-billable-hour calculations." },
      { q: "Should a freelancer charge the same as the equivalent salary hourly rate?", a: "No. Freelancers cover their own taxes, paid leave, pension, equipment, training, and downtime between contracts. Most need 50-80% above the equivalent salaried hourly rate just to match an employee&apos;s after-tax outcome. Use the Freelance Rate Calculator for a sustainable freelance price." },
      { q: "Why are UK loaded costs lower than US loaded costs?", a: "UK statutory employer cost is centred on employer NIC at 13.8% above the secondary threshold, plus auto-enrolment pension at 3%. US employers pay FICA at 7.65% plus federal/state unemployment and workers comp (~3-5%), and typically fund a much larger health-insurance benefit. The US healthcare-burden gap is the main reason US loaded percentages run higher despite lower headline statutory rates." },
      { q: "How does loaded cost differ in South Africa?", a: "SA statutory employer cost is light — UIF at 1% and SDL at 1% — but most established employers add 10-15% on top in pension, group life, and medical aid subsidies, plus 1-2% for COIDA workers compensation. The 18% default in this calculator is the median for an employee with a typical benefits package." },
      { q: "What is the difference between 2,080 and 1,920 working hours?", a: "2,080 hours is gross annual hours assuming no leave (40 × 52). 1,920 hours adjusts for four weeks of paid leave. Use 2,080 for converting headline pay; use 1,920 or lower for accurate cost-per-billable-hour analysis. The 160-hour gap is roughly 8% — material when pricing professional services." },
      { q: "How do I price a contractor against a salaried employee?", a: "Compare the contractor&apos;s invoice rate against the loaded hourly cost of the employee, not the headline rate. A $50/hr employee costs the business roughly $64/hr loaded. A contractor at $60/hr who delivers the same hours is cheaper than the employee on a like-for-like basis — though contractors offer less continuity and require their own tax compliance." },
      { q: "Why is my real productive hourly rate higher than my headline rate?", a: "Because the headline divides salary by gross hours (2,080), but productive hours are lower once paid leave, training, internal admin, and meetings are removed. A $52,000 employee with 25 days paid leave really earns $52,000 ÷ 1,880 productive hours = $27.66/hr — the right number to use when pricing client deliverables off employee cost." },
    ],
  },

  "working-capital-calculator": {
    slug: "working-capital-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      {
        label: "Healthy: $150k assets / $80k liabilities",
        href: "/working-capital-calculator?ca=150000&cl=80000",
      },
      {
        label: "Stressed: $90k assets / $80k liabilities",
        href: "/working-capital-calculator?ca=90000&cl=80000",
      },
      {
        label: "Bank-ready: $250k assets / $100k liabilities",
        href: "/working-capital-calculator?ca=250000&cl=100000",
      },
    ],
    category: "Break-Even & Cash Flow",
    applicationSubCategory: "Working Capital Calculator",
    featureList: [
      "Calculates working capital (current assets − current liabilities)",
      "Current ratio with bank-lending threshold flag (1.5x)",
      "Health banding from stressed through healthy to over-capitalised",
      "Region-aware currency formatting",
    ],
    howToName: "How to calculate working capital and current ratio",
    howToDescription: "Find your working capital and current ratio from balance-sheet figures, then check whether you clear the standard bank-lending threshold.",
    howToSteps: [
      { name: "Add up current assets", text: "Total cash, accounts receivable, inventory, and prepaid expenses — anything convertible to cash within 12 months." },
      { name: "Add up current liabilities", text: "Accounts payable, short-term debt, accrued expenses, taxes due, and the current portion of long-term loans." },
      { name: "Read the working capital and current ratio", text: "The calculator subtracts to find working capital and divides to find the ratio." },
      { name: "Check the bank-readiness flag", text: "A current ratio of 1.5 or higher is the conventional floor for working-capital lending." },
    ],
    methodologyNote:
      "Standard accounting formula. The 1.5 bank-readiness threshold is conventional across US, UK, and SA commercial lending. Stress-testing the ratio with a 50% inventory write-down is recommended before any bank application.",
    featuredAnswer:
      "Working capital is current assets minus current liabilities. Current ratio is current assets divided by current liabilities. At $150,000 in current assets and $80,000 in current liabilities, working capital is $70,000 and the current ratio is 1.88x — comfortably above the 1.5 threshold most lenders require.",
    voiceAnswer:
      "Working capital equals current assets minus current liabilities. The current ratio is assets divided by liabilities. Most banks require at least one point five.",
    faqs: [
      { q: "What is working capital?", a: "Working capital is current assets minus current liabilities — the cash buffer a business has after settling everything due within 12 months. Positive working capital means short-term obligations are fully covered; negative working capital means the business cannot meet near-term commitments from short-term assets." },
      { q: "What is a good current ratio?", a: "Most commercial lenders treat 1.5 as the floor for unsecured working-capital lending. Below 1.0 is a solvency risk. Above 3.0 may indicate idle cash or slow-moving inventory that could be deployed more productively. The 1.5-2.5 band is typical for healthy small businesses." },
      { q: "How do I calculate working capital from a balance sheet?", a: "Sum the current assets (cash, accounts receivable, inventory, prepaid expenses) and subtract the current liabilities (accounts payable, short-term debt, accrued expenses, taxes due, current portion of long-term debt). The result is working capital. Divide assets by liabilities for the ratio." },
      { q: "What counts as a current asset?", a: "Anything expected to convert to cash within 12 months — bank cash, accounts receivable, inventory at realisable value, prepaid expenses, and short-term marketable securities. Long-term receivables and fixed assets like property and equipment are excluded." },
      { q: "What counts as a current liability?", a: "Obligations due within 12 months — accounts payable to suppliers, short-term debt, accrued payroll and bonuses, taxes due, and the current portion of long-term loans. The current portion of a five-year loan is the most commonly missed item." },
      { q: "Why do banks discount inventory when assessing working capital?", a: "Because inventory book value often overstates realisable value. Slow-moving stock, seasonal goods past their season, and damaged or obsolete items would not fetch full price in a fire sale. Most banks apply a 40-60% discount to inventory when stress-testing the current ratio. A 1.8x book ratio can fall to 1.2x after this adjustment." },
      { q: "Is negative working capital always bad?", a: "Not always. Some retail and quick-service business models run on negative working capital deliberately — customers pay at point of sale while suppliers extend 30-60 day terms. Walmart, McDonald&apos;s, and most subscription businesses operate this way. For small businesses without a strong supplier-payment position, negative working capital is usually a problem." },
      { q: "How does working capital differ from cash flow?", a: "Working capital is a balance-sheet snapshot — assets minus liabilities at a point in time. Cash flow is the movement of cash over a period — the income-statement view. A business can have positive working capital and still run out of cash if collections lag payments. Use both together for a full picture." },
      { q: "How can I improve my current ratio quickly?", a: "Three fast levers. First, accelerate collections to convert AR into cash (use the DSO Calculator to size the prize). Second, negotiate longer terms with suppliers to push payables out beyond 12 months where possible. Third, clear slow inventory through a targeted promotion. Each one moves the ratio by 0.1-0.3x typically." },
      { q: "What current ratio do US, UK, and SA banks expect?", a: "All three lending markets converge on roughly 1.5x as the floor for unsecured working-capital lending. SBA 7(a) loans in the US, RBS/NatWest small-business lending in the UK, and FNB/Standard Bank business banking in SA all reference this threshold. Asset-backed lending (equipment finance, invoice factoring) is more lenient because the security shifts the risk profile." },
    ],
  },

  "dso-calculator": {
    slug: "dso-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      {
        label: "Healthy: $80k AR / $1.2M revenue",
        href: "/dso-calculator?ar=80000&revenue=1200000&days=365",
      },
      {
        label: "Stressed: $200k AR / $1.2M revenue",
        href: "/dso-calculator?ar=200000&revenue=1200000&days=365",
      },
      {
        label: "Quarterly view: $80k AR / $400k Q-revenue",
        href: "/dso-calculator?ar=80000&revenue=400000&days=90",
      },
    ],
    category: "Break-Even & Cash Flow",
    applicationSubCategory: "DSO Calculator",
    featureList: [
      "Calculates Days Sales Outstanding from AR and revenue",
      "Compares against 30-day benchmark with cash-released figure",
      "Industry-benchmark guidance (services, manufacturing, construction)",
      "Period flexibility — annual, quarterly, or monthly DSO",
    ],
    howToName: "How to calculate Days Sales Outstanding (DSO)",
    howToDescription: "Calculate the average number of days customers take to pay you, and see the cash you'd unlock by collecting faster.",
    howToSteps: [
      { name: "Enter accounts receivable", text: "Total invoices outstanding at the end of your period." },
      { name: "Enter revenue for the same period", text: "Use net revenue — exclude VAT or sales tax to match the AR basis." },
      { name: "Set the period length", text: "365 for annual, 90 for quarterly, 30 for monthly." },
      { name: "Read DSO and cash tied up", text: "The calculator divides AR by revenue and multiplies by days. The benchmark figure shows the cash released by getting to 30-day collections." },
    ],
    methodologyNote:
      "Standard DSO formula. The 30-day benchmark reflects typical B2B Net 30 invoice terms. Industry norms vary — services 30-45 days, manufacturing 45-60 days, construction 60-90 days. Use net revenue (exclusive of VAT/sales tax) to match AR basis on most accounting systems.",
    featuredAnswer:
      "DSO is the average number of days between invoicing and getting paid. Calculate it as (Accounts Receivable ÷ Revenue) × Days in Period. At $120,000 AR on $1.2M annual revenue, DSO = 36.5 days. Cutting that to 30 days releases roughly $21,000 in cash from receivables.",
    voiceAnswer:
      "Days Sales Outstanding equals accounts receivable divided by revenue, times days in the period. The standard benchmark is thirty days.",
    faqs: [
      { q: "What is Days Sales Outstanding?", a: "DSO measures how long it takes on average for customers to pay invoices. It is calculated as (Accounts Receivable / Revenue) × Days in Period. A lower DSO means faster cash conversion. A DSO above industry benchmark means you are effectively financing customers from your own cash." },
      { q: "What is a good DSO?", a: "For B2B services, 30-45 days is normal. Manufacturing tends to run 45-60 days. Construction often runs 60-90 days. B2C card-based retail runs 1-3 days. Any DSO materially above your industry norm is a working-capital opportunity — either chase collections or tighten terms." },
      { q: "How do I calculate DSO?", a: "DSO = (Accounts Receivable / Revenue) × Number of Days. For a full year, use total annual revenue and 365 days. For a quarter, use Q-revenue and 90 days. The result is the average days between invoice issue and payment received across the period." },
      { q: "What is the difference between DSO and AR turnover?", a: "AR Turnover = Revenue / Accounts Receivable. DSO = 365 / AR Turnover. They express the same idea two ways — turnover as a frequency (how many times AR cycles per year) and DSO as a duration (how long each cycle takes). DSO is more intuitive for cash-flow planning." },
      { q: "How can I reduce DSO?", a: "Three levers in order of impact: (1) automated invoice reminders at day 14, 21, and 28 — typically drops DSO by 5-8 days. (2) prompt-pay discounts of 1-2% for under-15-day settlement — flips the cost-benefit at the customer&apos;s finance team. (3) milestone billing or upfront deposits on longer projects — removes timing risk on a chunk of revenue entirely." },
      { q: "Does VAT or sales tax affect DSO calculation?", a: "DSO should be calculated on net revenue, the same basis as AR on most accounting systems. UK businesses (20% VAT) and SA businesses (15% VAT) can overstate DSO by 15-20% if they use gross revenue. US sales tax is typically not included in AR or revenue, so the issue is smaller. Match the basis." },
      { q: "How does DSO affect bank lending decisions?", a: "Banks read rising DSO as a leading indicator of cash pressure. A trend rising 5+ days per quarter usually surfaces in late supplier payments and overdraft usage 60-90 days later. Underwriters compare current DSO against industry benchmarks and against the business&apos;s own historical DSO when sizing working-capital lines." },
      { q: "What is a bad DSO trend?", a: "Any sustained increase month-on-month, or any single month where DSO jumps more than 20% above the trailing-12-month average. Both indicate either slipping collections discipline or a concentration of slow-paying customers. Stratify AR by ageing band to identify whether it is a portfolio or a single-customer issue." },
      { q: "Should I factor invoices if DSO is high?", a: "Factoring (selling invoices to a finance company at a discount) is one option, but it costs 2-5% of the invoice face value. Compare against the cost of carrying the AR yourself — overdraft interest, lost investment returns, supplier-discount opportunity cost. Factoring is usually worth it only when DSO is structurally above 60 days and improvement initiatives have plateaued." },
      { q: "How does DSO interact with working capital?", a: "DSO is one of the three working-capital cycle components — DSO (collections), DIO (inventory), and DPO (payments). The cash conversion cycle is DSO + DIO − DPO. A high DSO without offsetting longer DPO creates working-capital pressure. Look at all three together rather than DSO in isolation." },
    ],
  },

  "subscription-pricing-calculator": {
    slug: "subscription-pricing-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      { label: "SaaS: $30 monthly, 17% annual discount, 5% monthly churn", href: "/subscription-pricing-calculator?monthly=30&discount=17&mChurn=5&aChurn=20&margin=80" },
      { label: "Consumer: $10 monthly, 25% annual discount, higher churn", href: "/subscription-pricing-calculator?monthly=10&discount=25&mChurn=8&aChurn=30&margin=70" },
      { label: "B2B Enterprise: $200 monthly, 20% discount, low churn", href: "/subscription-pricing-calculator?monthly=200&discount=20&mChurn=2&aChurn=10&margin=85" },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Subscription Pricing Calculator",
    featureList: [
      "Compares monthly vs annual subscription LTV at any discount",
      "Models retention boost from annual prepayment commitment",
      "Calculates break-even discount where annual = monthly LTV",
      "Gross-margin-based (not revenue-based) LTV",
    ],
    howToName: "How to compare monthly vs annual subscription pricing",
    howToDescription: "Find the right annual-discount level by comparing customer lifetime value on monthly vs annual subscriptions.",
    howToSteps: [
      { name: "Enter monthly price and annual discount", text: "Standard is 17% (\"2 months free\") but anywhere from 10-25% is normal." },
      { name: "Set monthly and annual churn rates", text: "Annual churn is typically 2-3× lower than monthly × 12 due to commitment." },
      { name: "Set gross margin", text: "Revenue minus variable cost of delivery." },
      { name: "Read the break-even discount", text: "The discount at which annual LTV exactly equals monthly LTV. Anything below it is a positive trade." },
    ],
    methodologyNote:
      "Simplified LTV formula: ARPU × gross margin × lifespan (in months for monthly, years for annual). Does not model upgrade/downgrade between tiers, win-back of churned customers, or seasonal churn variations. Real cohort analysis using your own data is recommended past $1M ARR.",
    featuredAnswer:
      "Compare LTVs: monthly = monthly price × margin × (1 / monthly churn) months; annual = annual price × margin × (1 / annual churn) years. Annual typically wins even at 15-20% discounts because annual subscribers churn materially less. The break-even discount is the rate at which annual LTV exactly equals monthly LTV.",
    voiceAnswer:
      "Monthly LTV equals price times margin times one over monthly churn. Annual LTV equals discounted annual price times margin times one over annual churn.",
    faqs: [
      { q: "What's the best annual discount for a subscription?", a: "10-25% is the typical range. 17% ('2 months free') is convention but not optimal for every business. The right answer depends on the retention boost annual subscribers deliver — if annual churn is half of monthly × 12, a 20% discount is usually defensible." },
      { q: "Why do annual subscribers churn less?", a: "Three reasons: (1) self-selection — customers willing to commit to a year are higher-intent. (2) friction — cancelling an annual plan mid-term means losing prepaid value, which biases toward staying. (3) usage — annual subscribers integrate the product more deeply because they've paid for the year and want their money's worth." },
      { q: "How do I calculate subscription LTV?", a: "Monthly LTV = monthly price × gross margin % × (1 / monthly churn rate) months. Use gross margin, not revenue, because LTV measures contribution to fixed costs and profit. A $30/mo subscription at 80% margin and 5% monthly churn has LTV = $30 × 0.80 × 20 = $480." },
      { q: "Should I offer monthly billing at all?", a: "Usually yes for trial conversion — many customers won't commit to annual upfront. But your acquisition flow should default to annual with monthly as the toggle option. Most SaaS see 30-50% of new customers pick annual when it's the default versus 10-20% when monthly is the default." },
      { q: "What's a good monthly churn rate?", a: "B2B SaaS: 1-3%. Mid-market SaaS: 3-5%. Consumer subscription: 5-10%. Anything above 7-8% needs urgent attention — it usually means product-market fit is shaky and you're acquiring customers who don't see lasting value." },
      { q: "How does annual discount affect cash flow?", a: "Annual prepayment improves cash flow significantly — you receive 12 months of revenue upfront instead of monthly. This is a major reason VC-backed SaaS push annual hard: it reduces working capital requirements and accelerates growth from the same revenue base." },
      { q: "What's the difference between contraction churn and customer churn?", a: "Customer churn (often called logo churn) measures customers leaving. Contraction churn measures revenue lost from existing customers downgrading. Net revenue retention combines both with expansion (upgrades). The calculator above models customer churn — for full SaaS unit economics, the CAC/LTV calculator pairs nicely." },
      { q: "Should I let monthly customers switch to annual?", a: "Yes, aggressively. Offering an in-app prompt to switch saves significantly more revenue than equivalent acquisition effort. Most SaaS see 5-15% of monthly customers convert annual within their first 6 months when offered a clear path." },
      { q: "How does annual discount interact with pricing tiers?", a: "Pricing tier should be the primary segmentation tool; annual discount the secondary lever. Don't let annual discount erode price-tier separation. If monthly Pro is $50 and monthly Enterprise is $200, annual Pro at 20% off ($480/year) shouldn't undercut annual Enterprise at 25% off ($1,800/year)." },
      { q: "What if my annual churn data is uncertain?", a: "Use the broader SaaS rule: assume annual churn is 50-60% of (monthly churn × 12). So 5% monthly = 36% gross annual extrapolated, but actual annual churn is more like 18-22% due to commitment effect. This is conservative — many products achieve closer to 30-40% annual churn lift." },
    ],
  },

  "price-elasticity-calculator": {
    slug: "price-elasticity-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      { label: "Measured: $20 → $22, units 1000 → 900", href: "/price-elasticity-calculator?mode=measured&p1=20&q1=1000&p2=22&q2=900" },
      { label: "Assumed elasticity -0.5 (necessity)", href: "/price-elasticity-calculator?mode=assumed&elasticity=-0.5&revenue=20000" },
      { label: "Assumed elasticity -2 (discretionary)", href: "/price-elasticity-calculator?mode=assumed&elasticity=-2&revenue=20000" },
    ],
    category: "Profit & Pricing",
    applicationSubCategory: "Price Elasticity Calculator",
    featureList: [
      "Measured mode: compute elasticity from before/after sales data",
      "Assumed mode: model revenue impact at any elasticity",
      "Revenue impact at +5%, +10%, +20% price hikes",
      "Classification (inelastic / unit-elastic / elastic) with interpretation",
    ],
    howToName: "How to calculate price elasticity",
    howToDescription: "Measure elasticity from sales data, or assume a value, then see revenue impact at multiple price-hike scenarios.",
    howToSteps: [
      { name: "Pick a mode", text: "Measured if you have before/after data; assumed if you're planning hypothetically." },
      { name: "Enter the data or assumption", text: "Measured mode needs current + new price and units. Assumed mode needs elasticity coefficient and baseline revenue." },
      { name: "Read the revenue impact table", text: "Shows what happens to total revenue at +5%, +10%, +20% price hikes." },
    ],
    methodologyNote:
      "Uses the arc (midpoint) elasticity formula for measured mode — more accurate than the point-elasticity formula across larger price changes. Assumes constant elasticity across the price range — real demand curves bend, so don't extrapolate beyond modest hikes (15-20%).",
    featuredAnswer:
      "Elasticity = (% change in quantity) ÷ (% change in price). Negative values are normal — higher prices reduce demand. |elasticity| < 1 means inelastic (a price hike grows revenue); |elasticity| > 1 means elastic (a price hike cuts revenue). Most B2B services run -0.5 to -1; discretionary consumer goods -1.5 to -2.5.",
    voiceAnswer:
      "Price elasticity is the percentage change in quantity demanded divided by the percentage change in price. Most products are between negative half and negative two.",
    faqs: [
      { q: "What is price elasticity?", a: "A measure of how much customer demand changes when price changes. Calculated as (% change in quantity) ÷ (% change in price). Almost always negative because higher prices reduce demand." },
      { q: "What does -1 elasticity mean?", a: "Unit elastic — quantity drops the same percentage as price rises, leaving revenue unchanged. Values below -1 (e.g. -2) are elastic, where price hikes reduce revenue. Values between 0 and -1 (e.g. -0.5) are inelastic, where price hikes increase revenue." },
      { q: "How do I measure my product's elasticity?", a: "Run a controlled price test on a subset of customers or a randomised sample over time. Measure unit sales before and after. Apply the midpoint formula to avoid asymmetry between price-up and price-down scenarios. Two months of data per test point is typical; one month is usually too short to filter noise." },
      { q: "Why is elasticity usually negative?", a: "Higher prices generally reduce demand — the law of demand. Exceptions exist (Veblen goods like luxury watches, where higher prices signal exclusivity and increase demand), but they're rare. For practical purposes, treat positive elasticity as a measurement error rather than a real result." },
      { q: "Can I have different elasticity at different price points?", a: "Yes. Demand curves typically bend — elasticity at $20 doesn't predict elasticity at $30. The further you push from your test range, the less reliable the elasticity estimate. Run multiple tests at different price points for a more complete picture." },
      { q: "How does elasticity differ by industry?", a: "Roughly: necessities (insulin, basic groceries) -0.1 to -0.3; most B2B services -0.5 to -1.0; branded consumer goods -1.0 to -1.5; restaurants and discretionary -1.5 to -2.5; commodities and highly substitutable goods -2.0 to -4.0. Your actual elasticity depends on competition, switching costs, and customer segments." },
      { q: "What's the relationship between elasticity and pricing strategy?", a: "Inelastic demand (|E| < 1) → raise prices, revenue rises. Elastic demand (|E| > 1) → cut prices, revenue rises (if volume responds). Unit elastic → revenue independent of price; focus on cost or competitive positioning instead." },
      { q: "Should I measure elasticity by segment?", a: "Yes when possible. Enterprise customers are typically less elastic than SMB. Repeat customers less elastic than first-time. Existing channels less elastic than new acquisition. Segment-level elasticity often differs by 50-200% from the overall average." },
      { q: "What's cross-price elasticity?", a: "How your demand responds to competitor price changes. Cross-elasticity > 0 (substitute) means a competitor price hike grows your demand. Cross-elasticity < 0 (complement) means a competitor price hike reduces your demand. Most pricing decisions need to consider both own-price and cross-price elasticity together." },
      { q: "How big a price change should I test?", a: "5-10% is usually enough to detect a signal in 4-8 weeks of post-change data. Below 5% the noise often swamps the signal. Above 15% the change is so disruptive that elasticity estimates extrapolate poorly to smaller real-world hikes." },
    ],
  },

  "payroll-tax-calculator": {
    slug: "payroll-tax-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      { label: "$500k payroll, 8 employees, moderate state", href: "/payroll-tax-calculator?payroll=500000&employees=8&state=moderate" },
      { label: "$1M payroll, 12 employees, high-tax state (CA/NY)", href: "/payroll-tax-calculator?payroll=1000000&employees=12&state=high" },
      { label: "$250k payroll, 4 employees, low-tax state (TX/FL)", href: "/payroll-tax-calculator?payroll=250000&employees=4&state=none" },
    ],
    category: "Freelance & Hiring",
    applicationSubCategory: "Payroll Tax Calculator",
    featureList: [
      "FICA, FUTA, state UI, workers comp combined",
      "2026 Social Security wage base ($184,500)",
      "3-tier state-rate approximation",
      "Per-employee burden breakdown",
    ],
    howToName: "How to calculate employer payroll tax burden",
    howToDescription: "Estimate the total employer-side payroll-tax burden for any payroll and headcount in the US.",
    howToSteps: [
      { name: "Enter gross annual payroll", text: "Total wages paid to all employees in a year." },
      { name: "Enter employee count", text: "Used to apply the SS wage-base cap and FUTA per-employee limit." },
      { name: "Pick state tier", text: "Approximation of state UI + workers comp combined rate." },
      { name: "Read the total burden", text: "Federal + state combined, plus per-employee average." },
    ],
    sources: EMPLOYER_TAX_SOURCES,
    methodologyNote:
      "Federal portion is exact (FICA, FUTA). State portion approximated in 3 tiers — real state rates vary by state, industry, and the employer's experience-rating history with the state unemployment agency. Workers compensation varies enormously by industry (office: 0.2-0.5%; construction: 5-15%) — the bands assume mixed white-collar work.",
    featuredAnswer:
      "Employer payroll-tax burden runs 9-13% of gross wages in the US. Federal: FICA (Social Security 6.2% up to $184,500, Medicare 1.45% uncapped) + FUTA (0.6% × first $7,000 per employee). State: UI + workers comp ranges from ~1.5% (low-tax states) to ~7% (CA, NY, NJ).",
    voiceAnswer:
      "US employer payroll tax runs around eleven percent of gross wages. Federal FICA is seven point six five percent. State adds two to six percent.",
    faqs: [
      { q: "What is employer payroll tax?", a: "The portion of payroll tax paid by employers on top of employee wages — FICA (Social Security + Medicare), FUTA (federal unemployment), state UI (unemployment insurance), and workers compensation. Separate from the FICA portion withheld from employee paychecks." },
      { q: "How much is FICA?", a: "7.65% total — 6.2% for Social Security (capped at $184,500 of wages per employee in 2026) and 1.45% for Medicare (no cap). Employees pay another 7.65% withheld from their paychecks — so the combined FICA on each dollar of wage is 15.3%." },
      { q: "What is FUTA?", a: "Federal Unemployment Tax Act tax. 6% statutory rate on the first $7,000 of wages per employee per year, but most states qualify for a 5.4% credit, reducing the net rate to 0.6%. So roughly $42/year per employee in most states." },
      { q: "How is state unemployment tax calculated?", a: "Varies by state and by employer experience rating. New employers typically pay 2-4% on the first $9,000-$50,000 of wages per employee (the state UI wage base varies). After 2-3 years, your rate is reassigned based on actual unemployment claims filed by former employees — well-managed businesses can get to 0.5-1%." },
      { q: "What is workers compensation?", a: "Insurance covering medical care and lost wages for workplace injuries. Required by law in 49 states (Texas is the exception — voluntary there). Cost varies dramatically by industry: office work $0.20-$0.50 per $100 of wages; construction $5-$15 per $100. Industry classification codes determine the rate." },
      { q: "Does payroll tax differ by state?", a: "Yes significantly. The federal portion is uniform. State UI + workers comp combined ranges from ~1.5% in low-tax states (FL, TX, NV) to ~6-7% in high-tax states (CA, NY, NJ, MA). California is also unusual for charging SDI and PFL on top of standard payroll taxes." },
      { q: "Are payroll taxes deductible for the employer?", a: "Yes. All employer-paid payroll taxes (FICA, FUTA, state UI, workers comp) are deductible business expenses on the federal tax return, reducing taxable income. This is one reason employer payroll tax doesn't hit the bottom line at the full 11% — closer to 7-8% after the deduction." },
      { q: "What happens if I miss a payroll tax deposit?", a: "Penalties start at 2% for 1-5 days late, 5% for 6-15 days, 10% for 16+ days, and 15% if paid only after IRS notice. The IRS Trust Fund Recovery Penalty for employer FICA can be assessed personally against owners and officers — payroll taxes are not dischargeable in bankruptcy." },
      { q: "Can I reduce employer payroll tax?", a: "Three legitimate strategies. (1) Hire independent contractors instead of employees (where appropriate — misclassification is a major IRS focus). (2) Use an S-corp election to convert some profit to distributions (no FICA on distributions). (3) Add a Section 125 cafeteria plan for benefits — pre-tax benefits reduce wage base subject to FICA." },
      { q: "Does the SS wage base cap matter?", a: "For most small businesses with average wages under $184,500, no — every dollar is subject to full FICA. For businesses with high-earning employees ($200k+), once an employee crosses the wage base, the 6.2% SS portion stops, but the 1.45% Medicare continues, and an additional 0.9% Medicare kicks in above $200k single / $250k MFJ for the employee side." },
    ],
  },

  "section-179-calculator": {
    slug: "section-179-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      { label: "$100k equipment, 24% bracket", href: "/section-179-calculator?cost=100000&tax=24&discount=5" },
      { label: "$500k equipment, 32% bracket", href: "/section-179-calculator?cost=500000&tax=32&discount=5" },
      { label: "$1.5M equipment (approaching phase-out)", href: "/section-179-calculator?cost=1500000&tax=24&discount=5" },
    ],
    category: "Funding & Valuation",
    applicationSubCategory: "Section 179 Calculator",
    featureList: [
      "Section 179 immediate expensing vs MACRS 5-year depreciation",
      "2026 $1.22M cap + $3.05M phase-out logic",
      "NPV comparison at user-supplied discount rate",
      "Year-by-year MACRS schedule with half-year convention",
    ],
    howToName: "How to compare Section 179 to MACRS depreciation",
    howToDescription: "See whether Section 179 immediate expensing or MACRS 5-year depreciation produces more present-value savings for your equipment purchase.",
    howToSteps: [
      { name: "Enter equipment cost", text: "Total purchase price of qualifying business equipment." },
      { name: "Set your marginal tax rate", text: "Federal + state combined effective rate." },
      { name: "Set discount rate for NPV", text: "5% is a reasonable default time-value-of-money assumption." },
      { name: "Read the NPV advantage", text: "Section 179 normally wins by 10-15% of present value, unless you lack year-1 taxable income to absorb the full deduction." },
    ],
    methodologyNote:
      "Compares Section 179 immediate expensing against straight MACRS 5-year half-year-convention depreciation. Doesn't model bonus depreciation interaction (currently phasing down 60%/40%/20%/0% across 2024-2027). Also assumes the business has sufficient taxable income to absorb the Section 179 deduction — excess is carried forward, not refunded.",
    featuredAnswer:
      "Section 179 lets US businesses immediately expense up to $1.22M of qualifying equipment in the year of purchase (2026 estimate), versus spreading deductions over 5+ years under MACRS depreciation. Phase-out begins at $3.05M of purchases. Total nominal tax savings are the same; Section 179 wins on NPV by roughly 10-15% at typical discount rates.",
    voiceAnswer:
      "Section 179 lets you deduct equipment cost in year one instead of spreading over five years. NPV advantage is usually ten to fifteen percent.",
    faqs: [
      { q: "What is Section 179?", a: "A US tax-code provision (IRC §179) allowing businesses to immediately deduct the full cost of qualifying equipment in the year of purchase, rather than depreciating it over the useful life. 2026 cap: $1.22M with phase-out starting at $3.05M of total purchases." },
      { q: "What equipment qualifies for Section 179?", a: "Tangible personal property used in business — machinery, vehicles, office furniture, computers, software, and even some real-property improvements (roofs, HVAC, security systems on commercial buildings). Real estate land/buildings generally don't qualify. The asset must be acquired for business use AND placed in service in the tax year." },
      { q: "How is Section 179 different from MACRS depreciation?", a: "Section 179 takes the full deduction in year 1. MACRS spreads the deduction over 3-39 years depending on asset class (5 years for most equipment). Total nominal tax savings are identical (cost × marginal rate); Section 179 has higher present value because the savings arrive sooner." },
      { q: "What's the phase-out rule?", a: "If your total equipment purchases in the year exceed $3.05M (2026), the Section 179 cap reduces dollar-for-dollar. At $4.27M of purchases, the Section 179 cap is fully phased out and you're left with MACRS. The phase-out is designed to keep Section 179 focused on small and mid-size businesses." },
      { q: "Can Section 179 create a tax loss?", a: "No. The deduction is limited to the business's taxable income for the year. Any excess Section 179 deduction is carried forward to future years (indefinitely) — but you can't use it to generate a refund." },
      { q: "How does bonus depreciation interact?", a: "Bonus depreciation (currently 60% for 2024, dropping to 40%/20%/0% over 2025-2027 absent legislative extension) can be combined with Section 179. Most CPAs sequence: Section 179 first (up to limits), bonus depreciation on the remaining basis, then MACRS on whatever remains. The combination often eliminates the entire equipment cost from year-1 taxable income." },
      { q: "Should I always take Section 179?", a: "Almost always yes when (a) you have sufficient taxable income to absorb the deduction, AND (b) you expect your future marginal tax rate to be lower or unchanged. The exception: if you expect a much higher tax rate in 2-3 years (e.g. business growth), spreading the deduction via MACRS might capture deductions at higher marginal rates." },
      { q: "Can I use Section 179 for vehicles?", a: "Yes with caveats. SUVs and trucks over 6,000 lbs GVWR qualify for the full $30,500 (2026 estimate) — the so-called 'Hummer loophole'. Lighter vehicles are subject to a separate $20,200/year first-year cap. Specialty vehicles (delivery vans without rear seats, etc.) often qualify without the SUV cap." },
      { q: "When must I place equipment in service?", a: "By December 31 of the tax year you want to claim the deduction. Buying equipment in December but not actually using it until January means the deduction shifts to the following tax year. For cash-method businesses, the 'placed in service' standard is sometimes more flexible than for accrual-method businesses." },
      { q: "What if I sell the equipment later?", a: "If you sell within the asset's MACRS useful life, you recapture the depreciation as ordinary income (not capital gains). Section 179 recapture is calculated as the difference between actual depreciation taken and what straight-line depreciation would have been. This is rarely a problem because most equipment depreciates economically faster than the tax schedule." },
    ],
  },

  "inventory-turnover-calculator": {
    slug: "inventory-turnover-calculator",
    lastReviewed: "2026-05-20",
    scenarios: [
      { label: "Specialty retail: $600k COGS, $110k avg inventory", href: "/inventory-turnover-calculator?cogs=600000&begin=120000&end=100000" },
      { label: "Grocery: $5M COGS, $250k avg inventory (high turn)", href: "/inventory-turnover-calculator?cogs=5000000&begin=260000&end=240000" },
      { label: "B2B manufacturer: $2M COGS, $400k avg inventory", href: "/inventory-turnover-calculator?cogs=2000000&begin=420000&end=380000" },
    ],
    category: "Break-Even & Cash Flow",
    applicationSubCategory: "Inventory Turnover Calculator",
    featureList: [
      "Turnover ratio (COGS / Average Inventory)",
      "Days in inventory (365 / turnover)",
      "Industry-benchmark band with interpretation",
      "Region-aware currency formatting",
    ],
    howToName: "How to calculate inventory turnover",
    howToDescription: "Calculate how many times per year you turn your inventory and how long average stock sits before sale.",
    howToSteps: [
      { name: "Enter annual COGS", text: "Cost of goods sold for the year — from your P&amp;L." },
      { name: "Enter beginning and ending inventory", text: "Inventory values at the start and end of the period — from balance sheets." },
      { name: "Read the ratio and days", text: "Compare against the industry benchmark shown in the third result card." },
    ],
    methodologyNote:
      "Uses (Beginning + Ending) / 2 for average inventory — the standard formula but inaccurate for highly seasonal businesses. For seasonal operations, average 12 monthly inventory snapshots instead. Industry benchmarks reflect approximate medians and vary by business model within each category (e.g. fast-fashion retail turns 15-25× while traditional apparel retail turns 4-8×).",
    featuredAnswer:
      "Inventory turnover = Annual COGS / Average Inventory. Days in inventory = 365 / Turnover. Typical benchmarks: grocery 15-30×, retail 4-12×, manufacturing 5-10×, capital goods 1-3×. Low turnover ties up cash; very high turnover risks stockouts.",
    voiceAnswer:
      "Inventory turnover equals cost of goods sold divided by average inventory. Days in inventory equals three sixty-five divided by turnover.",
    faqs: [
      { q: "What is inventory turnover?", a: "A measure of how many times per year a business completely cycles through its inventory. Calculated as Annual COGS divided by Average Inventory. Higher turnover usually indicates more efficient inventory management, but can also signal stockout problems." },
      { q: "What is a good inventory turnover ratio?", a: "Depends entirely on industry. Grocery 15-30 (perishables force fast turns). General retail 4-12. Specialty retail 3-6. Restaurants 30-100 (food spoilage). Auto dealers 8-12. Manufacturing 5-10. Heavy machinery 1-3. Capital goods 0.5-1.5. Compare to your own industry, not absolute thresholds." },
      { q: "What does days in inventory mean?", a: "The average number of days a unit of inventory sits before being sold. Calculated as 365 / Inventory Turnover Ratio. Higher days = slower-moving inventory = more cash tied up in stock." },
      { q: "Why does inventory turnover matter?", a: "Three reasons. (1) Cash flow — slow turnover ties up working capital. (2) Holding costs — insurance, warehousing, capital, and obsolescence run 15-25% of inventory value per year. (3) Markdown risk — slow inventory often gets marked down 25-50% to clear, destroying margin." },
      { q: "How do I improve inventory turnover?", a: "Three levers. (1) Reduce inventory levels via just-in-time ordering, vendor-managed inventory, or smaller minimum order quantities. (2) Liquidate slow movers via clearance, B2B liquidation channels, or bundling with fast movers. (3) Improve demand forecasting to avoid over-buying in the first place. Most retailers can improve turnover 20-30% in 12 months through forecast and ordering discipline." },
      { q: "Can inventory turnover be too high?", a: "Yes. Very high turnover often indicates frequent stockouts — lost sales because product isn't available when customers want it. A retailer with 20× turnover in a non-perishable category may be losing 10-15% of potential sales to out-of-stock incidents. The optimal turnover balances holding costs against stockout costs." },
      { q: "Should I use revenue or COGS in the formula?", a: "COGS, not revenue. Some older textbooks use Revenue / Inventory but this overstates turnover by the gross margin percentage. Modern accounting practice and all comparable industry benchmarks use COGS / Inventory. Mixing the two makes cross-company comparisons meaningless." },
      { q: "What is the inventory days outstanding (DIO)?", a: "Same as 'days in inventory' — 365 / Turnover. Together with DSO (days sales outstanding, on receivables) and DPO (days payable outstanding, on payables), it forms the cash conversion cycle: DSO + DIO − DPO. The lower the cycle, the less working capital your business consumes per dollar of revenue." },
      { q: "Does inventory turnover vary by season?", a: "Yes substantially in seasonal businesses. Retailers might see turnover of 1-2 in January (post-holiday clearance) and 8-10 in December (peak holiday). Use an annual figure with 12-month average inventory for the headline number, then monitor a 3-month rolling figure to detect trends." },
      { q: "How does inventory turnover affect business valuation?", a: "Acquirers and lenders use turnover to assess working-capital efficiency. A business with 8× turnover in a category where the median is 5× often commands a higher multiple — it's generating the same revenue with less capital tied up. The difference can be 10-25% of business value at sale." },
    ],
  },
};

export function calcMeta(slug: string): CalcMeta | undefined {
  return CALC_META[slug];
}

export function calcBreadcrumb(slug: string) {
  const meta = CALC_META[slug];
  if (!meta) return [{ label: "Home", href: "/" }];
  return [
    { label: "Home", href: "/" },
    { label: meta.category, href: `/topics/${CATEGORY_SLUG[meta.category]}` },
    { label: meta.applicationSubCategory },
  ];
}

export function formatReviewDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
