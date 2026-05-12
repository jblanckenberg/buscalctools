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
};

export const LAST_VERIFIED = "May 2026";

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
    methodologyNote:
      "Formula is region-agnostic and unchanged from standard pricing convention: Selling Price = Cost × (1 + Markup / 100). Currency symbol switches by region only.",
    featuredAnswer:
      "Markup is the percentage added to cost to set selling price: Selling Price = Cost × (1 + Markup ÷ 100). A 50% markup on a $40 cost gives a $60 selling price. Markup is always a higher percentage than the equivalent profit margin on the same sale.",
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
    methodologyNote:
      "Standard break-even formula (Fixed Costs / Contribution Margin per Unit). Region-agnostic — only the currency symbol changes.",
    featuredAnswer:
      "Break-even is the number of units you must sell to cover all costs: Break-Even Units = Fixed Costs ÷ (Selling Price − Variable Cost). At $5,000 fixed costs, $10 variable cost per unit, and a $25 selling price, you break even at 334 units (333.3 rounded up).",
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
    methodologyNote:
      "Simple ROI does not account for the time value of money. For investments held over multiple years, use the annualised ROI for fair comparison.",
    featuredAnswer:
      "ROI (return on investment) is profit as a percentage of cost: ROI = ((Net Return − Investment) ÷ Investment) × 100. Investing $10,000 and earning back $13,500 is a 35% ROI. Annualised ROI normalises across different holding periods for fair comparison between investments.",
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
    methodologyNote:
      "VAT/sales tax defaults pre-fill at 20% (UK), 15% (SA), and 0% (US — sales tax varies by state). Verify your specific state's rate for US business.",
    sources: VAT_SALES_TAX_SOURCES,
    featuredAnswer:
      "To calculate selling price from cost and target margin: Selling Price = Cost ÷ (1 − Margin ÷ 100). For a $20 cost at 40% target margin, the selling price is $33.33. Add VAT/sales tax on top where applicable (20% UK, 15% SA, varies by US state).",
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
    methodologyNote:
      "Tax pre-fills at headline rates (UK VAT 20%, SA VAT 15%, US 0%). UK businesses must register for VAT above £90,000 turnover; SA threshold is R1M. Verify your registration status before issuing VAT invoices.",
    sources: VAT_SALES_TAX_SOURCES,
    featuredAnswer:
      "An invoice total is the subtotal of line items, minus any discount, plus tax: Total = (Subtotal − Discount) × (1 + Tax ÷ 100). On £500 with 10% discount and 20% UK VAT: discounted subtotal £450, VAT £90, total £540. Each line item is quantity × unit rate.",
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
    methodologyNote:
      "Tax-buffer guidance reflects each region's typical self-employment tax burden. US 25–30% (SE tax + federal + state), UK 20–30% (income tax + Class 2/4 NI), SA 25–35% (provisional tax). Verify against your individual situation.",
    sources: SELF_EMPLOYMENT_TAX_SOURCES,
    featuredAnswer:
      "Your minimum freelance hourly rate is (Annual Income + Overhead) ÷ Annual Billable Hours. Targeting £60,000 with £6,000 overhead and 25 billable hours/week (46 weeks) = £66,000 ÷ 1,150 = £57.39/hour. Add a 10–20% profit margin to set your recommended rate. Add a tax buffer of 20–35% to your income target.",
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
    methodologyNote:
      "Standard cash-flow projection: running balance = opening cash + cumulative (income − expenses). Inputs are estimates; actual cash flow depends on timing of customer payments and supplier terms.",
    featuredAnswer:
      "Cash flow is monthly income minus monthly expenses, tracked as a running balance from opening cash. A 12-month projection plots that running balance month by month and flags any month it goes negative. Most cash crises are visible 3–6 months in advance if you project regularly.",
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
    methodologyNote:
      "Tax rate pre-fills at headline corporate rates (US 21%, UK 25%, SA 27%). Override for: US state tax additions, UK small profits rate (19% under £50k), SA turnover tax (small business alternative).",
    sources: CORPORATE_TAX_SOURCES,
    featuredAnswer:
      "Net profit is revenue minus all costs: Revenue − COGS − Operating Expenses − Interest − Tax = Net Profit. The full waterfall produces gross profit, operating profit (EBIT), earnings before tax (EBT), and finally net profit. Net margin = Net Profit ÷ Revenue × 100; 10–20% is healthy for most small businesses.",
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
    methodologyNote:
      "Platform fee defaults: Amazon FBA 15%, Etsy 6.5%, eBay 13%, Shopify 2.9%. Headline rates only — your actual fees may include category-specific premiums or volume discounts. Check your platform's seller dashboard for the exact split.",
    sources: VAT_SALES_TAX_SOURCES,
    featuredAnswer:
      "Ecommerce profit per unit = Selling Price − Product Cost − Platform Fee − Shipping − Ad Spend − VAT. On a $29.99 Amazon FBA sale with $8 product cost, 15% platform fee, $3.50 shipping, and $2 ads, you net about $12. Most sellers underestimate platform fees and ad spend.",
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
    methodologyNote:
      "Standard unit-cost formula: total CPU = (fixed + variable costs) / units produced. Scaling table assumes fixed costs stay constant and variable costs scale linearly with volume (no bulk discounts modelled).",
    featuredAnswer:
      "Cost per unit = (Total Fixed Costs + Total Variable Costs) ÷ Number of Units. With $10,000 fixed costs, $5,000 variable costs, and 500 units, total cost per unit is $30 ($20 fixed CPU + $10 variable CPU). Fixed CPU drops as volume rises — the economies-of-scale effect.",
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
    methodologyNote:
      "Pre-fill rates are mid-range SME rates for each region: US SBA 7(a) ~7.5%, UK SME ~8.5%, SA prime + margin ~14.5%. Actual rates vary by lender, term, credit, and collateral. APR includes fees; lenders quoting headline rates may be missing fee components.",
    sources: LOAN_RATE_SOURCES,
    featuredAnswer:
      "Monthly business loan payment uses the standard amortisation formula: P × [r(1+r)^n] / [(1+r)^n − 1], where P is principal, r is the monthly rate (APR ÷ 12 ÷ 100), and n is total months. A $50,000 loan at 8% APR over 60 months has a $1,013.82 monthly payment.",
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
    methodologyNote:
      "Simple payback ignores cash flows after recovery (so a 3-year-payback investment producing for 20 years is treated the same as one producing for 3). Pair with ROI for total-return view.",
    featuredAnswer:
      "Payback period is years until an investment recoups its initial cost: Investment ÷ Annual Cash Inflow. A $50,000 investment generating $18,000 per year has a payback period of 2.78 years. Discounted payback applies a discount rate to future cash flows to reflect the time value of money.",
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
    methodologyNote:
      "Runway = cash / net burn. Assumes current-month income and expense levels continue. In practice, expenses creep, hires happen, and revenue is non-linear. Update inputs monthly for accurate tracking.",
    featuredAnswer:
      "Burn rate is monthly cash consumption: Gross Burn = total monthly expenses; Net Burn = expenses minus revenue. Runway in months = Cash Balance ÷ Net Burn. A startup with $500,000 cash and a $50,000 net burn has 10 months of runway. Below 9 months is critical — start fundraising at 12.",
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
    methodologyNote:
      "DCF uses 5-year explicit projection + Gordon growth terminal value. The terminal value typically accounts for 60–80% of total DCF — small changes to growth or discount rate produce large swings. Use the range across methods, not the DCF alone.",
    featuredAnswer:
      "Most small businesses are valued using three methods: revenue × industry multiple, EBITDA × industry multiple, and discounted cash flow (DCF). Typical SME EBITDA multiples are 3–7×; SaaS revenue multiples 3–8×; service businesses 2–4× EBITDA. The midpoint of the three methods anchors realistic asking prices.",
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
    methodologyNote:
      "CAGR formula assumes geometric compounding from start value to end value over N years. Doesn't reflect intra-period volatility — a business that grew 100% one year and -50% the next can have a benign CAGR.",
    featuredAnswer:
      "Revenue growth rate is ((Current − Previous) ÷ Previous) × 100. From $180,000 to $250,000 is 38.9% growth. CAGR (Compound Annual Growth Rate) smooths multi-year volatility: ((End ÷ Start) ^ (1 ÷ Years)) − 1. Healthy growth for established small businesses is 10–20% annually.",
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
    methodologyNote:
      "Employer tax pre-fills at each region's typical SME burden. US: FICA 7.65% + FUTA 0.6% + SUTA ~2.7% ≈ 11%. UK: Employer NIC 13.8% above secondary threshold. SA: UIF 1% + SDL 1% (SDL exempt under R500k payroll). Confirm against your actual payroll software.",
    sources: EMPLOYER_TAX_SOURCES,
    featuredAnswer:
      "The true cost of an employee is 125–145% of their salary. Add employer payroll taxes (US ~11%, UK 13.8%, SA ~2%), benefits, pension contributions, equipment, training, and office overhead on top. A £45,000 UK salary typically costs the employer around £58,000 fully loaded.",
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
    methodologyNote:
      "Simple discount math. Bulk savings table assumes constant per-unit discount across quantities — doesn't model tiered or wholesale discount structures.",
    featuredAnswer:
      "Discounted price = Original Price × (1 − Discount Percentage ÷ 100). A 25% discount on a $100 item gives a $75 sale price and $25 saving. Reverse: Discount % = ((Original − Sale Price) ÷ Original) × 100. Most retail discounts run 10–40%; bigger discounts can erode brand value.",
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
