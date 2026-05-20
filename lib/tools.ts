export type Tool = {
  slug: string;
  name: string;
  short: string;
  desc: string;
  phase: 1 | 2;
};

export const TOOLS: Tool[] = [
  { slug: "profit-margin-calculator", name: "Profit Margin Calculator", short: "Profit Margin", desc: "Calculate gross and net profit margin instantly.", phase: 1 },
  { slug: "markup-calculator", name: "Markup Calculator", short: "Markup", desc: "Convert cost price to selling price at any markup %.", phase: 1 },
  { slug: "break-even-calculator", name: "Break-Even Calculator", short: "Break-Even", desc: "Find the units and revenue needed to break even.", phase: 1 },
  { slug: "roi-calculator", name: "ROI Calculator", short: "ROI", desc: "Calculate return on investment from any spend.", phase: 1 },
  { slug: "pricing-calculator", name: "Pricing Calculator", short: "Pricing", desc: "Set the optimal selling price from cost and margin.", phase: 1 },
  { slug: "invoice-calculator", name: "Invoice Calculator", short: "Invoice", desc: "Build invoice totals with tax in seconds.", phase: 1 },
  { slug: "freelance-rate-calculator", name: "Freelance Rate Calculator", short: "Freelance Rate", desc: "Calculate a sustainable hourly rate for freelancers.", phase: 1 },
  { slug: "cash-flow-calculator", name: "Cash Flow Calculator", short: "Cash Flow", desc: "Project 12-month cash flow from income and expenses.", phase: 1 },
  { slug: "net-profit-calculator", name: "Net Profit Calculator", short: "Net Profit", desc: "Calculate true net profit after all costs and tax.", phase: 1 },
  { slug: "ecommerce-profit-calculator", name: "Ecommerce Profit Calculator", short: "Ecommerce Profit", desc: "True profit per unit after fees, shipping and ad spend.", phase: 1 },
  { slug: "cost-per-unit-calculator", name: "Cost Per Unit Calculator", short: "Cost Per Unit", desc: "Calculate production cost per unit from total costs.", phase: 1 },
  { slug: "business-loan-calculator", name: "Business Loan Calculator", short: "Business Loan", desc: "Calculate monthly repayments and total interest.", phase: 1 },
  { slug: "payback-period-calculator", name: "Payback Period Calculator", short: "Payback Period", desc: "How long until an investment pays for itself.", phase: 2 },
  { slug: "burn-rate-calculator", name: "Burn Rate & Runway Calculator", short: "Burn Rate", desc: "Months of runway from cash on hand and monthly burn.", phase: 2 },
  { slug: "business-valuation-calculator", name: "Business Valuation Calculator", short: "Business Valuation", desc: "Estimate business value from revenue, profit and multiples.", phase: 2 },
  { slug: "revenue-growth-calculator", name: "Revenue Growth Rate Calculator", short: "Revenue Growth", desc: "Calculate growth rate between two periods.", phase: 2 },
  { slug: "employee-cost-calculator", name: "Employee Cost Calculator", short: "Employee Cost", desc: "True cost of hiring after taxes, benefits and overhead.", phase: 2 },
  { slug: "discount-calculator", name: "Discount & Sale Price Calculator", short: "Discount", desc: "Sale price and savings from any discount %.", phase: 2 },
  { slug: "hourly-to-salary-calculator", name: "Hourly to Salary Calculator", short: "Hourly to Salary", desc: "Convert hourly rate to annual salary with employer loaded cost.", phase: 2 },
  { slug: "working-capital-calculator", name: "Working Capital Calculator", short: "Working Capital", desc: "Current ratio and bank-readiness from short-term assets and liabilities.", phase: 2 },
  { slug: "dso-calculator", name: "DSO Calculator", short: "DSO", desc: "Days Sales Outstanding and the cash released by faster collections.", phase: 2 },
  { slug: "self-employment-tax-calculator", name: "Self-Employment Tax Calculator", short: "SE Tax", desc: "SE tax plus federal income and state tax for US freelancers (TY 2026).", phase: 2 },
  { slug: "s-corp-election-calculator", name: "S-Corp Election Calculator", short: "S-Corp Election", desc: "Compare LLC default tax to S-corp election with reasonable salary and compliance overhead.", phase: 2 },
  { slug: "estimated-tax-calculator", name: "Estimated Tax Calculator", short: "Estimated Tax", desc: "IRS quarterly safe-harbor payments with TY 2026 due dates.", phase: 2 },
  { slug: "cac-ltv-calculator", name: "CAC LTV Calculator", short: "CAC LTV", desc: "Customer acquisition cost vs lifetime value with payback period and health bands.", phase: 2 },
  { slug: "subscription-pricing-calculator", name: "Subscription Pricing Calculator", short: "Subscription Pricing", desc: "Monthly vs annual LTV with break-even discount.", phase: 2 },
  { slug: "price-elasticity-calculator", name: "Price Elasticity Calculator", short: "Price Elasticity", desc: "Revenue impact at multiple price-hike scenarios.", phase: 2 },
  { slug: "payroll-tax-calculator", name: "Payroll Tax Calculator", short: "Payroll Tax", desc: "US employer FICA, FUTA, state UI burden by headcount.", phase: 2 },
  { slug: "section-179-calculator", name: "Section 179 Calculator", short: "Section 179", desc: "Immediate expensing vs MACRS depreciation NPV.", phase: 2 },
  { slug: "inventory-turnover-calculator", name: "Inventory Turnover Calculator", short: "Inventory Turnover", desc: "Turnover ratio and days in inventory with benchmarks.", phase: 2 },
  { slug: "profit-first-allocation-calculator", name: "Profit First Allocation Calculator", short: "Profit First", desc: "Michalowicz Real Revenue allocation across Profit / Owner Pay / Tax / OpEx.", phase: 2 },
  { slug: "r-and-d-tax-credit-calculator", name: "R&D Tax Credit Calculator", short: "R&D Credit", desc: "US Section 41 ASC method with QSB payroll-tax-offset check.", phase: 2 },
];

export const PHASE_1 = TOOLS.filter((t) => t.phase === 1);
export const PHASE_2 = TOOLS.filter((t) => t.phase === 2);

export const toolBySlug = (slug: string): Tool | undefined =>
  TOOLS.find((t) => t.slug === slug);
