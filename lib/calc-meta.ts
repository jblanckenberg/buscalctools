import type { HowToStep } from "@/components/shared/HowToSchema";

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

export type CalcMeta = {
  slug: string;
  category: CalcCategory;
  applicationSubCategory: string;
  featureList: string[];
  howToName: string;
  howToDescription: string;
  howToSteps: HowToStep[];
};

export const CALC_META: Record<string, CalcMeta> = {
  "profit-margin-calculator": {
    slug: "profit-margin-calculator",
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
  },

  "markup-calculator": {
    slug: "markup-calculator",
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
  },

  "break-even-calculator": {
    slug: "break-even-calculator",
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
  },

  "roi-calculator": {
    slug: "roi-calculator",
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
  },

  "pricing-calculator": {
    slug: "pricing-calculator",
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
  },

  "invoice-calculator": {
    slug: "invoice-calculator",
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
  },

  "freelance-rate-calculator": {
    slug: "freelance-rate-calculator",
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
  },

  "cash-flow-calculator": {
    slug: "cash-flow-calculator",
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
  },

  "net-profit-calculator": {
    slug: "net-profit-calculator",
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
  },

  "ecommerce-profit-calculator": {
    slug: "ecommerce-profit-calculator",
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
  },

  "cost-per-unit-calculator": {
    slug: "cost-per-unit-calculator",
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
  },

  "business-loan-calculator": {
    slug: "business-loan-calculator",
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
  },

  "payback-period-calculator": {
    slug: "payback-period-calculator",
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
  },

  "burn-rate-calculator": {
    slug: "burn-rate-calculator",
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
  },

  "business-valuation-calculator": {
    slug: "business-valuation-calculator",
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
  },

  "revenue-growth-calculator": {
    slug: "revenue-growth-calculator",
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
  },

  "employee-cost-calculator": {
    slug: "employee-cost-calculator",
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
  },

  "discount-calculator": {
    slug: "discount-calculator",
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
