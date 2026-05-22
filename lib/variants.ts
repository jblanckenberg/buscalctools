import type { Variant, VariantMatrix } from "@/lib/variants.types";

/**
 * Variant matrix — 29 entries across 11 parent calculators.
 * Each entry adds geo/scenario/audience nuance on top of the parent calc.
 * Title body is kept ≤70 chars before the ` | BusCalcTools` brand suffix
 * so the full string fits inside Google's title-rendering envelope.
 */
export const VARIANTS: VariantMatrix = {
  "profit-margin-calculator": {
    uk: {
      slug: "uk",
      kind: "geo",
      label: "UK",
      h1Suffix: " for UK Businesses",
      title: "Profit Margin Calculator UK | BusCalcTools",
      description:
        "Calculate UK gross, operating, and net profit margins with HMRC corporation tax built in. Free, browser-based, sterling-ready for small businesses.",
      voiceAnswer: undefined,
      intro: `A UK profit margin calculator returns gross, operating, and net margins after VAT (20%), Corporation Tax (25% main / 19% small profits, with marginal relief between £50k-£250k), and employer NI (15% above £5,000). Enter VAT-exclusive revenue. HMRC's CT600 guidance and VAT Notice 700 are the authoritative references.

Margin and markup get confused constantly in UK SME finance — a 50% markup is only a 33.3% margin, and that 16.7 percentage-point gap is the difference between a healthy business and one quietly losing money on every unit sold. This calculator separates the three margin layers (gross, operating, net) using your VAT-exclusive revenue figure — the HMRC standard for accounts filed with Companies House — so you're not inflating the top line by 20% of VAT you collect on HMRC's behalf.

Costs go into two buckets. Cost of goods sold (COGS) is everything that scales with the unit sold: supplier invoices, import duty since the EU-UK Trade and Cooperation Agreement changes, freight, payment processing (Stripe, GoCardless, Worldpay), and packaging. Operating overheads are rent, payroll including 15% employer National Insurance above the £5,000 secondary threshold, software, professional fees, and marketing.

Realistic UK net-margin benchmarks (HMRC sector ratios + FAME small-company data):
- Professional services: 12-25%
- Trades and construction: 4-8%
- Ecommerce: 5-12% depending on category and ad spend
- Hospitality: 2-7% (London rents compress this further)
- SaaS post-scale: 20%+ once customer acquisition cost normalises

If gross margin lands under 30%, you're in a high-volume model where price discipline and tight inventory turns are the strategic levers — not cost-cutting. If gross is above 60%, customer acquisition cost is the binding constraint.

The calculator also flags when your Corporation Tax estimate (using the marginal relief formula between £50,000 and £250,000 profit) suggests pulling forward capex or pension contributions before year-end. For the underlying rules, HMRC's CT600 guidance, VAT Notice 700, and the Employer Helpbook on gov.uk are the authoritative sources.`,
      hreflangCountry: "en-GB",
    },
    us: {
      slug: "us",
      kind: "geo",
      label: "USA",
      h1Suffix: " for US Businesses",
      title: "Profit Margin Calculator USA | BusCalcTools",
      description:
        "Calculate US gross, operating, and net profit margins with IRS federal corporate tax (21%) pre-filled. Free, browser-based, dollar-ready.",
      voiceAnswer: undefined,
      intro: `A US profit margin calculator computes gross, operating, and net margin after COGS, operating expenses, and federal corporate tax (21% flat for C-corps under TCJA), plus state taxes ranging from 0% (NV, TX, FL) to 11.5% (NJ). IRS Form 1120 and Publication 535 are the authoritative references.

US profit margin math has two complications absent in most other markets: the federal-plus-state tax stack, and pass-through versus C-corp treatment.

For C-corps, the federal rate is a flat 21% post-TCJA. State rates range from 0% (Nevada, Texas, Washington — Texas has a separate franchise tax) to 11.5% (New Jersey), so the blended rate depends on nexus. The calculator lets you set an effective combined rate so net margin output reflects what actually hits retained earnings.

For pass-through entities (S-corp, LLC, partnership, sole prop), the entity pays no federal income tax — profit flows to the personal 1040 and is taxed at marginal rates from 10% to 37%, plus 15.3% self-employment tax on the first $184,500 of SE income (2026 Social Security wage base) and 2.9% Medicare above (with an additional 0.9% above $200k). Net margin for pass-throughs is conventionally calculated pre-personal-tax.

COGS under US GAAP includes direct materials, direct labor, and manufacturing overhead. Section 263A (UNICAP) rules force resellers and manufacturers with average receipts above $32M (2026 threshold) to capitalize more indirect costs into inventory.

Net-margin benchmarks (IRS Statistics of Income and NYU Stern industry tables):
- Software / SaaS: 15-25%
- Professional services: 10-20%
- Retail (non-grocery): 2-5%
- Restaurants: 3-9%
- Construction: 5-10%

The single biggest US-specific lever past $1M revenue is electing S-corp status (if eligible) to escape SE tax on a reasonable-salary versus distribution split — the calculator's scenario toggle models this. For underlying rules, IRS Publication 535, Form 1120 instructions, and the Schedule SE instructions are authoritative.`,
      hreflangCountry: "en-US",
    },
    restaurants: {
      slug: "restaurants",
      kind: "scenario",
      label: "Restaurants",
      h1Suffix: " for Restaurants",
      title: "Restaurant Profit Margin Calculator | BusCalcTools",
      description:
        "Calculate restaurant gross and net profit margins from food cost, labour, and overhead. Benchmarks for full-service vs quick-service venues.",
      voiceAnswer: undefined,
      intro: `Restaurant profit margins are thin — the National Restaurant Association puts industry-wide net margins at 3-9%, with full-service averaging 3-5% and limited-service 6-9%. The two metrics that drive that net: prime cost (food + labor as % of sales, target under 60%) and food cost percentage (target 28-32%).

Restaurant P&L is a different animal from generic retail because two cost lines — food and labor — are simultaneously huge, variable daily, and the operator's main lever. The industry has converged on prime cost (food cost + total labor including taxes and benefits, as a % of sales) as the single most important operating metric. Keep prime cost under 60% of revenue and the rest of the math usually works; let it drift above 65% and the venue loses money even on busy nights.

This calculator splits the analysis into the lines a restaurant operator actually tracks:
- **Food cost percentage**: COGS food ÷ food sales. Target 28-32% full-service, 25-30% QSR
- **Beverage cost percentage**: 18-22% beer, 22-28% wine, 18-24% spirits
- **Labor cost percentage**: including FICA, workers' comp, and benefits. Target 28-35% depending on service model
- **Occupancy**: rent + utilities + insurance. Should be ≤ 10% of sales; over 12% the lease is the problem
- **Net margin**: what's left after everything

A common reason restaurants run unprofitable: they price the menu off food cost alone and forget that labor scales with covers, not revenue. A $14 burger at 30% food cost looks fine until you realise four-top tables tie up a server for an hour and labor cost balloons.

The calculator also outputs break-even cover count — how many guests per shift you need to clear fixed costs. Pair it with seat-turn rate to see whether the venue is geometrically capable of profit at current pricing, or whether menu engineering is needed (a price increase on items with the lowest cost-to-price ratio).

For US operators, the National Restaurant Association's annual Restaurant Industry Operations Report is the authoritative benchmark source. For UK operators, UKHospitality's quarterly tracker publishes comparable figures.`,
      hreflangCountry: undefined,
    },
    za: {
      slug: "za",
      kind: "geo",
      label: "South Africa",
      h1Suffix: " for South African Businesses",
      title: "Profit Margin Calculator South Africa | BusCalcTools",
      description:
        "Calculate SA gross, operating, and net profit margins with SARS corporate tax (27%) and 15% VAT pre-filled. Free, browser-based, ZAR-ready for small businesses.",
      voiceAnswer: undefined,
      intro: `A South African profit margin calculator returns gross, operating, and net margins after VAT (15%), Corporate Income Tax (27% standard rate post-2022 reduction from 28%), UIF (1% employer + 1% employee, capped), and SDL (1% above R500,000 annual payroll). Enter VAT-exclusive revenue. SARS Corporate Income Tax guidance and the VAT 404 Guide for Vendors are the authoritative references.

SA SME margin math has two structural features that don't appear in UK or US frameworks: the relatively low headline corporate rate (27% versus the UK's 25% main rate and a US blended federal-plus-state stack of 25-32%) is offset by tighter VAT margins on consumer goods, and the rand's volatility against the dollar means landed import COGS can shift 8-15% in a quarter for businesses sourcing internationally.

Margin and markup remain the most-confused pair in SA pricing conversations — a 50% markup is only a 33.3% margin, and that 16.7 percentage-point gap is the difference between a profitable business and one quietly funding customer discounts out of retained earnings. This calculator separates the three margin layers (gross, operating, net) using VAT-exclusive revenue — the figure SARS expects on the ITR14 corporate return and on the IT14SD reconciliation.

Costs go into two buckets. Cost of goods sold (COGS) is everything that scales with the unit sold: supplier invoices (Chinese imports, EU specialty, local manufacturing), import duty under the SACU tariff schedule, freight from Cape Town/Durban ports, payment processing (Yoco, PayFast, Peach, Stitch — typically 2.5-3.5% per transaction), and packaging. Operating overheads include rent, payroll (the employer cost stack is unusually light at ~2% — 1% UIF capped at R17,712/month earnings plus 1% SDL above the R500k payroll threshold — versus 13.8% UK Employer NI or ~11% US FICA+FUTA), software, professional fees, and marketing.

Realistic SA net-margin benchmarks (SARS Tax Statistics + StatsSA quarterly survey data):
- Professional services: 15-25%
- Trades and construction: 5-9% (load-shedding contingencies compress this)
- Ecommerce: 6-14% depending on category and import exposure
- Hospitality: 3-8%
- SaaS post-scale: 22%+ once CAC normalises

Worked example: a Cape Town retailer turning over R4.8M ex-VAT with R2.4M COGS, R1.2M opex, lands at R1.2M operating profit (25% operating margin). After 27% CIT that's R876,000 retained — a 18.25% net margin, well above the SA retail median.

If gross margin lands under 30%, you're in a high-volume model where price discipline and stock turn are the strategic levers. Above 60%, customer acquisition cost is the binding constraint. The calculator also flags when provisional tax instalments (due 31 August and end of February for most year-ends) require pulling forward s12C wear-and-tear allowances. See also the related /pricing-calculator/za for VAT-inclusive shelf pricing and /employee-cost-calculator/za for the full UIF+SDL stack.`,
      hreflangCountry: "en-ZA",
    },
    ecommerce: {
      slug: "ecommerce",
      kind: "scenario",
      label: "Ecommerce",
      h1Suffix: " for Ecommerce",
      title: "Ecommerce Profit Margin Calculator | BusCalcTools",
      description:
        "Calculate ecommerce profit margin after platform fees, shipping, and ad spend. Built for Amazon, Etsy, eBay, and Shopify sellers.",
      voiceAnswer: undefined,
      intro: `Ecommerce profit margins run 5-15% net for physical-product sellers and 8-20% net for digital. Ad spend, payment processing (2.9%+$0.30 on Stripe), shipping, returns, and platform fees compress that quickly. A real margin calculator separates per-order contribution margin from fully-loaded net margin — the distinction that determines profitability.

The fastest way to bankrupt an ecommerce brand is to optimise revenue while ignoring contribution margin. Top-line growth funded by a 5x ROAS on a 35% gross-margin product is a slow leak — every order makes the loss bigger because variable costs eat the margin before fixed costs are even covered.

This calculator pulls apart ecommerce P&L into the lines that actually move:

**Per-order variable costs:**
- COGS (landed cost including supplier, freight, duties, packaging)
- Payment processing (Stripe 2.9%+$0.30; PayPal 3.49%+$0.49; Shopify Payments lower)
- Fulfilment (pick, pack, ship — typically $4-12 per order via 3PLs like ShipBob)
- Shipping (usually subsidised or absorbed)
- Customer acquisition cost (ad spend ÷ new customers)

**Contribution margin** = price minus all of the above. If this is negative, no volume of orders saves the business.

**Period costs (fixed-ish):**
- Software stack (Shopify, Klaviyo, Postscript, returns tools — typically 3-7% of revenue at scale)
- Salaries
- Returns and refunds (apparel: 20-30%, electronics: 8-15%, beauty: 5-10%)

Net-margin benchmarks by category (Shopify and McKinsey data):
- Beauty / cosmetics: 10-15%
- Apparel: 5-12%
- Electronics: 3-8%
- Home goods: 8-14%
- Supplements: 12-20%

The single biggest leverage point in DTC ecommerce isn't ad spend — it's repeat purchase rate. A brand with 30% second-order rate at 90 days is worth 2-3x a brand at 10% second-order, because CAC amortises across a longer LTV. The calculator's repeat-rate toggle models this. For DTC benchmarks, the Shopify State of Commerce report and the U.S. Census Bureau's quarterly e-commerce sales release are useful references.`,
      hreflangCountry: undefined,
    },
  },

  "markup-calculator": {
    uk: {
      slug: "uk",
      kind: "geo",
      label: "UK",
      h1Suffix: " for UK Businesses",
      title: "Markup Calculator UK | BusCalcTools",
      description:
        "Calculate UK selling price from cost and markup, with HMRC VAT at 20% on top. Forward and reverse modes for retail and trade pricing.",
      voiceAnswer: undefined,
      intro: `A UK markup calculator converts cost to selling price including 20% VAT. Markup is profit as a percentage of cost; margin is profit as a percentage of price. A 50% markup gives a 33% margin; a keystone 100% markup gives 50% margin. HMRC VAT Notice 700 is the authoritative reference.

Markup and margin are mathematically related but commercially different, and UK retailers and tradespeople routinely confuse them. The conversation usually goes: "What markup do you put on?" "About 40%." But 40% markup on a £100 cost is a £140 sale — a 28.6% margin. If you thought you were making 40 pence in the pound, you've just found why year-end accounts look thinner than expected.

This calculator handles UK pricing in two clear steps.

**Step 1 — Cost to ex-VAT price:** apply your chosen markup to your VAT-exclusive cost. If you're VAT-registered, your supplier's invoice may include 20% VAT that you'll reclaim — work in ex-VAT figures throughout, because that's how HMRC's CT600 will see it.

**Step 2 — Ex-VAT to shelf price:** add 20% VAT (or 5% reduced rate for energy-saving products, children's car seats, etc.) to get the price the customer pays. The calculator runs the math both ways — input a target margin and it back-solves to shelf price; input a competitor's shelf price and it tells you the margin at current cost.

UK markup conventions by sector (industry-typical, before haggling):
- Builders' merchants: 25-40% on materials, 10-15% on plant
- Independent fashion retail: 200-300% (keystone-plus)
- Hospitality wine: 250-400% by the glass
- Independent bookshops: 30-50%
- Plumbing / electrical parts: 30-100% depending on whether customer or trade sourced

For VAT-registered businesses, the calculator also outputs the input VAT recoverable on cost — useful for checking that a particular pricing scheme leaves you net positive after quarterly HMRC filing. For the underlying VAT rules, HMRC's VAT Notice 700 and the VAT rates page on gov.uk are authoritative.`,
      hreflangCountry: "en-GB",
    },
    retail: {
      slug: "retail",
      kind: "scenario",
      label: "Retail",
      h1Suffix: " for Retail",
      title: "Retail Markup Calculator | BusCalcTools",
      description:
        "Calculate retail selling price from cost and target markup. Includes equivalent margin, keystone pricing, and VAT/sales tax handling per region.",
      voiceAnswer: undefined,
      intro: `Retail markup is conventionally expressed as a multiple of cost: keystone (100% markup, 2x cost) is the historical baseline, but real margins now sit between 30% and 250% depending on category, channel, and brand power. This calculator translates between markup, margin, MSRP, and MAP — the four pricing terms retail buyers actually use.

Retail pricing has its own vocabulary. Getting fluent in it is the difference between negotiating a competitive cost from your supplier and getting handed a wholesale price you can't sell profitably.

The four numbers every retail buyer needs to keep straight:
- **Cost** — what you pay your supplier landed (including duty and freight)
- **MSRP (Manufacturer's Suggested Retail Price)** — the price the brand recommends you sell at
- **MAP (Minimum Advertised Price)** — the lowest price you're contractually allowed to advertise (common in electronics, beauty, premium consumer brands)
- **Markup** — your gross profit expressed as a multiple of cost (1.5x = 50% markup; 2x = 100% markup or keystone; 2.5x = keystone-plus)

The keystone convention — doubling cost to set retail — is a hangover from pre-1980s department-store buying when fixed costs and inventory turn justified that spread. Today keystone is a floor for boutique retail and a ceiling for big-box, with categories trending:
- Apparel (independent boutique): 2.2-2.8x
- Apparel (mass): 1.4-1.8x
- Beauty (prestige): 2-3x
- Beauty (drugstore): 1.4-1.8x
- Furniture (independent): 2-2.5x
- Furniture (big box): 1.6-2x
- Electronics: 1.1-1.4x (the famously thin category)
- Books (independent): 1.4-1.5x (publisher discount typically 40%)
- Gifts / novelty: 2.5-3.5x

The calculator outputs both markup and margin so you can convert between how your supplier talks ("we sell at 40% off MSRP") and how your accountant talks ("you're running 28% gross margin"). It also flags when sell-through assumption is too optimistic: a 2.5x markup on apparel that only clears 65% at full price is functionally the same as a 1.6x markup that clears 100%. Real gross margin depends on sell-through, not list pricing.`,
      hreflangCountry: undefined,
    },
  },

  "freelance-rate-calculator": {
    uk: {
      slug: "uk",
      kind: "geo",
      label: "UK",
      h1Suffix: " for UK Freelancers",
      title: "Freelance Rate Calculator UK | BusCalcTools",
      description:
        "Calculate UK freelance hourly rate with HMRC self-assessment and Class 2/4 NI buffer. Sustainable rates for sole traders and limited companies.",
      voiceAnswer: undefined,
      intro: `UK freelancers calculating an hourly rate must cover income tax (20% / 40% / 45%), Class 4 NI (6% £12,570-£50,270, 2% above), pension, holiday, sick days, and overhead. Realistic conversion: a £50,000 take-home target requires roughly £75-90/hour at 1,200 billable hours/year. HMRC's self-employment guidance is authoritative.

UK freelance rate-setting is where most new contractors get it wrong, because the headline "I want £60k a year" needs to clear several deductions before it lands in your account.

**The 2026/27 HMRC tax stack for a UK sole trader:**
- Personal allowance: £12,570 tax-free
- Basic rate: 20% on £12,571 – £50,270
- Higher rate: 40% on £50,271 – £125,140
- Additional rate: 45% above £125,140
- Class 2 NI: £3.65/week, voluntary for most self-employed since April 2024
- Class 4 NI: 6% on profits £12,570-£50,270; 2% above

For limited-company contractors, the math changes: 19% / 25% Corporation Tax on company profits (with marginal relief between £50k-£250k), then dividend tax of 10.75% / 35.75% / 39.35% when you draw. Inside IR35, you're back to PAYE-like deductions.

**The non-tax deductions every freelancer underestimates:**
- **Billable hours**: a full-time freelancer typically bills 1,000-1,400 hours per year, not 1,820. Selling, admin, training, and downtime eat the rest
- **Holiday**: 28 days statutory equivalent = ~11% of working time uncosted
- **Sick days**: budget 5-10 days
- **Overhead**: software, accountant (£60-150/month), insurance (PI/PL £20-80/month), workspace
- **Pension**: 8-15% if self-funding
- **Income smoothing**: 2-3 months' costs in reserve

Plug a target net income into the calculator and it back-solves to the hourly rate, accounting for HMRC tax bands and assumed utilisation. For most UK freelancers targeting a £50k post-tax lifestyle, the answer lands between £75 and £100/hour billed.

For underlying rules, consult HMRC's self-employment guidance on gov.uk and the National Insurance contributions and credits pages — both refreshed each tax year as bands and thresholds change.`,
      hreflangCountry: "en-GB",
    },
    us: {
      slug: "us",
      kind: "geo",
      label: "USA",
      h1Suffix: " for US Freelancers",
      title: "Freelance Rate Calculator USA | BusCalcTools",
      description:
        "Calculate US freelance hourly rate with IRS self-employment tax (15.3%) buffer. Sustainable pricing for independent contractors and 1099 workers.",
      voiceAnswer: undefined,
      intro: `US freelance rates must cover federal income tax (10-37%), state income tax (0-13.3%), and self-employment tax of 15.3% on the first $184,500 (2026 Social Security wage base) plus 2.9% Medicare above. A $100,000 take-home typically requires $130-150/hour at 1,200 billable hours. IRS Publication 334 is authoritative.

The single biggest US-specific surprise for new freelancers is self-employment tax. As a W-2 employee, your employer paid half of FICA (7.65%) on your behalf and you barely noticed. As a 1099 freelancer or sole proprietor, you pay both halves — 15.3% on net SE income up to the Social Security wage base ($184,500 in 2026), then 2.9% (+0.9% Additional Medicare) above. That's before federal and state income tax.

**The IRS stack for a typical 1099 freelancer:**
- **Self-employment tax**: 15.3% on first $184,500 of net SE income, 2.9% above (plus 0.9% Additional Medicare over $200k single / $250k MFJ)
- **Federal income tax**: marginal rates 10% / 12% / 22% / 24% / 32% / 35% / 37% — applied to AGI after the 50% deduction for SE tax paid and any QBI deduction (up to 20% for qualified pass-through income, subject to phase-outs and SSTB rules)
- **State income tax**: 0% (TX, FL, NV, WA, TN, NH, SD, WY, AK) up to 13.3% (CA top bracket)
- **Estimated tax payments**: quarterly to IRS (Form 1040-ES) and most states, due 15 April / 15 June / 15 September / 15 January

Beyond tax, US freelancers pay for things employees get for free:
- **Health insurance**: $400-1,500/month off-exchange depending on age, state, coverage
- **Self-funded retirement**: SEP-IRA (up to 25% of net SE income capped at $72,000 in 2026) or Solo 401(k) (combined up to $72,000, $80,000 if 50+, up to $83,250 with the age 60-63 super-catch-up)
- **Disability / life insurance**
- **Business deductions** (home office, mileage, software, professional development)

The calculator takes your post-tax income target, state, and assumed billable hours and outputs the hourly rate required. It also models the S-corp election break-even — usually worthwhile above $80-90k SE profit, depending on reasonable-comp rules and state. For tax specifics, IRS Publication 334 and Schedule SE instructions are authoritative.`,
      hreflangCountry: "en-US",
    },
    za: {
      slug: "za",
      kind: "geo",
      label: "South Africa",
      h1Suffix: " for South African Freelancers",
      title: "Freelance Rate Calculator South Africa | BusCalcTools",
      description:
        "Calculate SA freelance hourly rate with SARS provisional tax, UIF, and R1M VAT threshold built in. Sustainable rates for sole proprietors and consultants.",
      voiceAnswer: undefined,
      intro: `South African freelancers calculating an hourly rate must cover SARS personal income tax (18-45% across seven brackets), provisional tax instalments (twice yearly), UIF (1% of earnings up to R17,712/month), and the R1 million VAT registration threshold for those who cross it. Realistic conversion: a R600,000 take-home target requires roughly R650-800/hour at 1,200 billable hours. SARS Provisional Tax (IRP6) guidance is authoritative.

SA freelance pricing has three quirks that catch new sole proprietors off-guard. First, the absence of an employer subsidy on PAYE means you owe the full tax bill on net profit, paid in two provisional instalments (31 August and last day of February for most natural-person taxpayers) plus a top-up at year-end. Underestimate the second instalment by more than 20% and SARS levies a 20% understatement penalty plus interest at the official rate.

**The 2026/27 SARS personal income tax stack for a sole proprietor:**
- 18% on taxable income up to R237,100
- 26% on R237,101 – R370,500
- 31% on R370,501 – R512,800
- 36% on R512,801 – R673,000
- 39% on R673,001 – R857,900
- 41% on R857,901 – R1,817,000
- 45% above R1,817,000
- Primary rebate: R18,450 (under 65)
- Secondary rebate: R10,140 (65-74)
- Tertiary rebate: R3,386 (75+)

Tax threshold for under-65s is therefore R102,500 of taxable income before any tax is owed.

**Non-tax deductions every SA freelancer underestimates:**
- **Billable hours**: full-time freelancers bill 1,000-1,400 hours per year, not 1,820. Selling, admin, load-shedding downtime, and training eat the rest
- **VAT registration**: voluntary at R50,000 turnover, mandatory at R1,000,000 rolling 12-month. Once registered you charge 15% output VAT on every invoice — and must remit it bi-monthly
- **Medical scheme contributions**: SA has no employer subsidy; budget R2,500-7,500/month for family cover (Discovery, Momentum, Bonitas)
- **Retirement annuity (RA)**: deductible up to 27.5% of taxable income (capped R350k/year). Without an employer pension, self-funding is essential
- **Overhead**: accountant (R1,200-3,500/month), liability insurance, software, co-working or load-shedding-resilient home office (inverter + UPS: R25-80k once-off)
- **Income smoothing**: 3-4 months' costs in reserve — SA invoice payment terms regularly drift to 60-75 days

Worked example: a Joburg consultant targeting R500,000 take-home, 1,200 billable hours, R6,000/month overhead. Pre-tax revenue needed ≈ R720,000; hourly rate ≈ R600/hour. If VAT-registered, charge R690/hour ex-VAT to clients (which is R793 incl-VAT) so the R90 in absorbed payment-processing fees doesn't erode margin.

For underlying rules, see SARS' Comprehensive Guide to the ITR12 and the IRP6 provisional tax guide, and pair this with /invoice-calculator/za for SA invoice requirements and /employee-cost-calculator/za once you hire your first employee.`,
      hreflangCountry: "en-ZA",
    },
    "new-york": {
      slug: "new-york",
      kind: "geo",
      label: "New York",
      h1Suffix: " for New York Freelancers",
      title: "Freelance Rate Calculator New York | BusCalcTools",
      description:
        "Calculate NY freelance hourly rate with federal SE tax, NY state income tax, and NYC city tax stacked. Sustainable rates for 1099 consultants.",
      voiceAnswer: undefined,
      intro: `New York freelancers face the heaviest combined tax stack of any major US freelance market: federal self-employment tax (15.3% to the SS wage base), federal income tax (10-37%), New York State income tax (4-10.9%), and — for NYC residents — New York City income tax (3.078-3.876%). A $120,000 take-home in Manhattan typically requires $160-190/hour at 1,200 billable hours. The NY Department of Taxation and Finance and IRS Publication 334 are authoritative.

The "tri-tax stack" is what makes NY freelance rate-setting different from Florida or Texas. A 1099 consultant earning $200,000 net SE income in Manhattan faces an effective combined marginal rate of roughly 47-50% on the next dollar earned — federal 32-35%, NY State 6.85%, NYC 3.876%, and Additional Medicare 0.9% above $200k single. That's after the 50% deduction for SE tax paid and any QBI deduction.

**The 2026 stack for a Manhattan-based 1099 freelancer:**
- **Self-employment tax**: 15.3% on first $184,500 of net SE income, 2.9% above (plus 0.9% Additional Medicare over $200k single / $250k MFJ)
- **Federal income tax**: marginal 10/12/22/24/32/35/37% on taxable income
- **NY State income tax**: 4% on first $8,500 single, climbing through 4.5/5.25/5.5/6/6.85/9.65/10.3/10.9% — top bracket bites above $25M
- **NYC resident tax**: 3.078% on first $12,000 single, up to 3.876% over $50,000
- **MCTMT (Metropolitan Commuter Transportation Mobility Tax)**: 0.34-0.6% if net SE earnings in the MCTD exceed $50k/year
- **Estimated tax payments**: quarterly to IRS, NY State, and NYC, due 15 April / 15 June / 15 September / 15 January

**NY-specific cost realities:**
- **Health insurance**: NY State of Health premiums for a single 40-year-old without subsidy run $600-1,100/month
- **Coworking / office**: WeWork, Industrious, Convene single desks $400-900/month; private offices $1,500-4,500/month
- **Freelance Isn't Free Act (FIFA)**: NYC ordinance requires written contracts for engagements $800+ and pays within 30 days; treble damages plus attorney fees for non-compliance — a useful collections lever
- **Self-funded retirement**: SEP-IRA up to 25% of net SE income capped at $72,000 (2026), Solo 401(k) combined up to $72,000 (or $80,000 if 50+)

Worked example: a Brooklyn-based UX consultant targeting $130k take-home after all taxes, 1,150 billable hours/year. Pre-tax revenue needed ≈ $245,000 (47% effective combined burden); hourly rate ≈ $215/hour, day rate ≈ $1,700, weekly retainer ≈ $7,500.

The S-corp election typically breaks even around $85-110k SE profit for NY freelancers given state-level admin overhead. For specifics, the NY Department of Taxation and Finance Personal Income Tax guidance and IRS Schedule SE instructions are authoritative.`,
      hreflangCountry: "en-US",
    },
    texas: {
      slug: "texas",
      kind: "geo",
      label: "Texas",
      h1Suffix: " for Texas Freelancers",
      title: "Freelance Rate Calculator Texas | BusCalcTools",
      description:
        "Calculate Texas freelance hourly rate with federal SE tax and zero state income tax. Sustainable pricing for 1099 consultants and independent contractors.",
      voiceAnswer: undefined,
      intro: `Texas freelancers benefit from the lightest US state tax burden — no personal income tax at all, only federal self-employment tax (15.3%) and federal income tax (10-37%) apply to 1099 income. A $100,000 take-home target typically requires $115-135/hour at 1,200 billable hours, materially less than the same target in California or New York. IRS Publication 334 and the Texas Comptroller's franchise tax guidance are authoritative.

Texas is structurally the cheapest US state for a successful sole-proprietor freelancer because the state collects no personal income tax. The federal-only burden of roughly 22-32% on the marginal dollar (SE tax 15.3% plus federal 12-24% on most freelance income brackets, after the 50% SE deduction and QBI) lets a Texas consultant keep $4-12k more per $100k earned than the same freelancer in NY or CA.

**The 2026 stack for a Texas-based 1099 freelancer:**
- **Self-employment tax**: 15.3% on first $184,500 of net SE income, 2.9% Medicare above (plus 0.9% Additional Medicare over $200k single)
- **Federal income tax**: marginal 10/12/22/24/32/35/37% on taxable income (after SE deduction and QBI)
- **State income tax**: ZERO — Texas has no personal income tax
- **Texas franchise tax**: levied on entities (LLCs, corporations, partnerships), not sole proprietors. Threshold is $2.47M annual revenue (2026); below that, no franchise tax return required, only the Public Information Report
- **Estimated tax payments**: quarterly to IRS only (Form 1040-ES). No state quarterly filing — one fewer administrative deadline

**Texas-specific cost realities:**
- **Health insurance**: Texas didn't expand Medicaid and has no state exchange — Healthcare.gov premiums for a 40-year-old single in Austin/Houston/Dallas run $400-850/month off-subsidy
- **Coworking / office**: Austin (The Riveter, Industrious) $300-600/month single desks; Houston/Dallas slightly lower
- **Sales tax on services**: Texas does NOT tax most professional services (consulting, design, writing) but DOES tax data processing, security, and certain digital products at 6.25% state plus up to 2% local
- **Retirement**: SEP-IRA up to 25% of net SE income capped at $72,000 (2026), Solo 401(k) combined up to $72,000 (or $80,000 if 50+)
- **Asset protection**: Texas has strong homestead and asset-protection statutes; pairs well with an LLC wrapper once SE income tops $80k

Worked example: an Austin-based developer targeting $110k take-home, 1,250 billable hours/year. Pre-tax revenue needed ≈ $155,000 (29% effective combined federal burden); hourly rate ≈ $125/hour, day rate ≈ $1,000, weekly retainer ≈ $4,500.

The S-corp election typically breaks even around $80-100k SE profit for Texas freelancers — earlier than in high-tax states because there's no state-level S-corp surcharge to erode the federal SE tax savings. For specifics, IRS Publication 334 and the Texas Comptroller's franchise tax overview are authoritative.`,
      hreflangCountry: "en-US",
    },
    designers: {
      slug: "designers",
      kind: "audience",
      label: "Designers",
      h1Suffix: " for Designers",
      title: "Freelance Designer Rate Calculator | BusCalcTools",
      description:
        "Calculate sustainable hourly and day rates for freelance designers from income goals, billable hours, software costs, and project profit buffer.",
      voiceAnswer: undefined,
      intro: `Freelance design rates in 2026 cluster between $50-150/hour for general visual design, $75-200/hour for UX/product design, and $100-300/hour for senior brand and strategy work. Project-based pricing usually nets more than hourly. The AIGA Design Salary Survey and US BLS OEWS data are the standard rate references.

Hourly rate is the wrong unit for most experienced freelance designers, because it caps earnings at your fastest possible delivery. The faster you get, the less you make on the same output — which is why senior freelancers move to project-based or value-based pricing as soon as their portfolio supports it.

That said, hourly is the right starting point for setting a floor — the minimum you'd accept to take on a project. This calculator helps you set that floor based on real cost structure.

Typical freelance design rate bands (US / UK averages):
- **Graphic design (general)**: $50-90/hour entry; $90-150/hour mid; $150-200/hour senior
- **Brand identity**: $75-150/hour mid; $150-300/hour senior with strategy
- **UI / UX design**: $75-130/hour mid; $130-220/hour senior; $200-350/hour senior product design at SaaS scale
- **Illustration**: highly variable — $50-200/hour, plus usage-rights licensing on top
- **Motion / animation**: $90-200/hour, with day rates of $800-2,500 common
- **Web design (full project)**: $3,000-30,000 typical per site

Beyond rate, three commercial moves separate designers earning $50k from designers earning $200k+:
1. **Usage rights pricing** — for brand identity and illustration, you can license the same asset multiple times. A logo for a local plumber vs a national brand is the same delivery but a 5-10x price difference because usage value differs
2. **Retainer engagements** — replacing project-by-project with monthly retainers stabilises revenue and lets you charge a premium for guaranteed availability
3. **Scope-and-deliverable proposals** — fixed-scope, fixed-price proposals (with explicit revision rounds) consistently price 30-50% higher than hourly because you're selling outcome, not time

The calculator outputs both minimum hourly floor and equivalent project-based price for typical design deliverables (logo systems, brand guidelines, websites, illustration sets). For industry rate benchmarks, the AIGA Design Salary Survey and the BLS Occupational Employment and Wages Statistics for graphic designers are useful references.`,
      hreflangCountry: undefined,
    },
    developers: {
      slug: "developers",
      kind: "audience",
      label: "Developers",
      h1Suffix: " for Developers",
      title: "Freelance Developer Rate Calculator | BusCalcTools",
      description:
        "Calculate sustainable hourly rates for freelance developers from income targets, billable hours, infra costs, and contract profit margin.",
      voiceAnswer: undefined,
      intro: `Freelance developer rates in 2026 sit at $50-100/hour for junior generalists, $80-150/hour for mid-level full-stack, $150-250/hour for senior specialists (cloud, ML, fintech), and $250-500/hour for niche consultants. Stack Overflow's annual Developer Survey and the BLS Occupational Outlook Handbook are the closest rate benchmarks.

Developer rates are the most stratified of any freelance discipline — a junior front-end contractor in a low-cost city and a senior staff engineer doing six-week embedded engagements at a Series B can both be in the same "freelance developer" market while charging 10x apart. Where you sit on that distribution is driven by stack, specialisation, and the buyer's pain.

Typical 2026 rate bands by specialisation (US / UK; lower in non-tech-hub geographies):
- **Front-end (HTML / CSS / JS, vanilla React)**: $50-100/hour
- **Full-stack (React + Node / Python / Rails)**: $80-150/hour
- **Mobile (iOS / Android native)**: $90-160/hour
- **Backend / distributed systems (Go, Rust, Java at scale)**: $130-220/hour
- **Cloud / DevOps (AWS / GCP / Azure architect)**: $150-250/hour
- **Data engineering (Spark, dbt, Snowflake)**: $130-200/hour
- **Machine learning / AI applied**: $150-350/hour
- **Security (pentesting, SOC2 prep)**: $200-400/hour
- **Smart contracts / blockchain**: $150-400/hour
- **Embedded / firmware**: $120-200/hour

The single biggest rate-multiplier in dev contracting is buyer urgency × specificity. Generalist "build me a CRUD app" work has near-infinite supply and competes globally on price. Specialist "our Stripe webhooks are dropping at 0.3% under load, fix it by Friday" work has scarce supply and the buyer will pay 3-5x to get it solved.

This calculator works backwards from a target take-home, accounting for:
- Federal + state (or HMRC + NI) tax stack
- Self-employment / Class 4 NI burden
- Billable hours assumption (developers typically bill 1,200-1,500/year direct-to-client, lower through agencies)
- Health insurance, retirement, and tools (IDEs, hosting, GitHub Copilot / Cursor, monitoring)
- Income smoothing reserve

It also outputs day-rate and weekly equivalent for enterprise procurement teams, plus indicative SOW pricing for common project types (MVP build, audit / code review, infrastructure migration).`,
      hreflangCountry: undefined,
    },
  },

  "break-even-calculator": {
    uk: {
      slug: "uk",
      kind: "geo",
      label: "UK",
      h1Suffix: " for UK Businesses",
      title: "Break-Even Calculator UK | BusCalcTools",
      description:
        "Calculate break-even units and revenue for a UK business in pounds sterling, with HMRC-aware fixed cost guidance and contribution margin output.",
      voiceAnswer: undefined,
      intro: `Break-even is the sales volume where total revenue equals total costs. For UK businesses: break-even units = fixed costs ÷ (price − variable cost). Fixed costs must include rent, salaries, employer NI (15% above £5,000), and software. HMRC's Employer Helpbook on gov.uk is authoritative for the NI inputs.

Break-even is the most-asked-for piece of management accounting in UK SMEs, because it's the one number that tells you whether your business model is geometrically capable of profit — or whether you're running a slow-motion loss-maker that needs structural change before more sales can save it.

**The UK break-even calculation has three inputs:**
- **Fixed costs (monthly)**: rent, salaries including employer's National Insurance (15% above the £5,000/year secondary threshold per employee), workplace pension contributions (3% employer minimum), software, professional fees, business rates (with small business rate relief if applicable), insurance
- **Variable cost per unit**: COGS plus any per-unit variable cost (commission, payment processing, fulfilment)
- **Price per unit (ex-VAT)**: selling price net of the 20% VAT collected for HMRC

Break-even units = fixed costs ÷ (price − variable cost)
Break-even revenue = fixed costs ÷ contribution margin %

Three observations from running this for hundreds of UK SMEs:

1. **Most owners overestimate variable costs and underestimate fixed costs.** Workshop tools, recurring software, and admin time that "doesn't really count" all show up in year-end accounts as fixed cost. Be brutal in the fixed-cost bucket.

2. **Employer NI is a hidden margin-killer.** Every £100 of payroll above the £5,000 secondary threshold costs an extra £15 — over a year on a £30k employee, that's £3,750 of employer NI nobody mentions on the salary line.

3. **Break-even isn't the goal — break-even plus 20-30% is.** A business that exactly hits break-even has no buffer for a slow month, no funds for growth, and no cushion for unexpected costs. Use the calculator's target-profit toggle to find the sales level that funds the business you actually want.

For UK-specific cost inputs (NI thresholds, small business rate relief, VAT rates), the gov.uk Employer Helpbook and HMRC's PAYE rate tables are authoritative.`,
      hreflangCountry: "en-GB",
    },
    restaurants: {
      slug: "restaurants",
      kind: "scenario",
      label: "Restaurants",
      h1Suffix: " for Restaurants",
      title: "Restaurant Break-Even Calculator | BusCalcTools",
      description:
        "Calculate restaurant break-even covers and revenue from rent, payroll, food cost, and average ticket. Visual chart and target profit mode included.",
      voiceAnswer: undefined,
      intro: `Restaurant break-even is calculated as fixed costs ÷ contribution margin per cover. With food cost typically 28-32%, beverage 18-24%, and labor 28-35%, contribution margin per cover usually sits between 30% and 45%. The National Restaurant Association's prime-cost rule (food + labor ≤ 60%) is the implicit operational guardrail.

Restaurant break-even has more moving parts than almost any other small-business calculation because revenue depends on two things you can only partly control — covers per service and average check — while costs include both per-cover variables (food, paper, card processing) and per-shift step-fixed labor (you can't half-staff a Friday night).

**Fixed costs (monthly):**
- Rent + utilities + insurance (target ≤ 10% of sales; over 12% the lease is broken)
- Salaried management
- Software (POS, reservations, scheduling)
- Marketing
- Loan service and equipment leases

**Variable cost per cover:**
- Food cost (price × food cost % — usually 28-32%)
- Beverage cost (price × beverage cost % — 18-24% beer, 22-28% wine, 18-24% spirits)
- Variable labor (servers, line cooks during peak — 15-25% of revenue)
- Card processing (2-3%)
- Paper, condiments, breakage

**Step-fixed labor** (per shift, not per cover): hosts, dishwashers, prep cooks, sous chefs scheduled to a shift regardless of cover count.

Plug average check, target food and labor percentages, and fixed costs into the calculator and it returns:
- Break-even covers per day
- Break-even revenue per month
- Margin of safety (current covers vs break-even covers)
- "What if" sliders for menu-price increases and labor-cost reductions

Three structural patterns that put a restaurant permanently below break-even, no matter how busy:
1. **Menu-price compression** — operators afraid to raise prices, while food and labor have inflated 15-30% over 2022-2024
2. **Prime cost > 65%** — NRA data shows successful operators consistently below 60%
3. **Seat-turn under industry norms** — 1.5 turns at dinner for casual full-service is typical; below 1.2 and the throughput economics break

For US benchmarks, the National Restaurant Association's Restaurant Industry Operations Report is the standard source.`,
      hreflangCountry: undefined,
    },
  },

  "cash-flow-calculator": {
    uk: {
      slug: "uk",
      kind: "geo",
      label: "UK",
      h1Suffix: " for UK Businesses",
      title: "Cash Flow Calculator UK | BusCalcTools",
      description:
        "Project 12-month UK business cash flow in sterling with HMRC VAT-quarter awareness. Highlights months with negative balances and runway risk.",
      voiceAnswer: undefined,
      intro: `A 12-month UK cash flow forecast tracks monthly cash in (sales, VAT refunds, grants) and cash out (payroll, VAT, PAYE, Corporation Tax, suppliers, rent) to project bank balance. Two UK timing traps catch SMEs: quarterly VAT due one month and seven days after quarter-end, and the 31 January self-assessment payment-on-account.

Cash flow is where profitable UK businesses go to die. You can run a 15% net-margin business into administration in twelve months if customer payment terms are 60 days, suppliers want 30, and you've just hit an £18,000 VAT bill the same week as payroll. P&L solvency and cash solvency are different problems, and this 12-month forecast tool models the cash side.

**UK cash flow inputs that catch people off-guard:**

- **VAT returns** — typically quarterly to HMRC, due one calendar month and seven days after the period ends, with electronic payment by direct debit. Plan for a single month's VAT liability as a cash outflow
- **PAYE / NI** — monthly to HMRC, due 22nd of the following month if paying electronically (19th for cheques)
- **Corporation Tax** — due 9 months and 1 day after the company's year-end (or quarterly instalments if profits over £1.5M)
- **Self-assessment payments on account** — for sole traders and personal returns: 31 January (balancing + first instalment) and 31 July (second instalment), each typically half the previous year's tax bill
- **VAT registration** — mandatory at £90,000 rolling 12-month turnover (2024 threshold). Crossing the line mid-year is a common cash shock if you haven't priced VAT-inclusively

The calculator builds out the next 12 months row-by-row:
- **Cash in**: sales × collection timing (this month, +30 days, +60 days, etc.)
- **Cash out**: payroll, suppliers, rent, software, VAT (every 3 months), PAYE (monthly), Corporation Tax (annually), other
- **Opening balance** → **closing balance** for each month
- **Flags**: any month where projected closing balance goes negative

For UK SMEs, the British Business Bank's cash flow templates and HMRC's payment deadlines on gov.uk are the authoritative references. If the forecast shows a negative month, the order of remedies is: tighten receivables (invoice day 1, chase day 7, escalate day 21), extend payables, pull forward sales, then financing.`,
      hreflangCountry: "en-GB",
    },
  },

  "business-loan-calculator": {
    uk: {
      slug: "uk",
      kind: "geo",
      label: "UK",
      h1Suffix: " for UK Businesses",
      title: "Business Loan Calculator UK | BusCalcTools",
      description:
        "Calculate UK business loan repayments at Bank of England-aware rates. Monthly payment, total interest, and full amortisation schedule in sterling.",
      voiceAnswer: undefined,
      intro: `A UK business loan calculator uses the standard amortisation formula to compute monthly repayments and total interest cost. The Bank of England base rate drives variable SME lending, with high-street banks pricing unsecured loans at base + 3-8%. The British Business Bank publishes monthly UK SME finance benchmarks.

UK business borrowing in 2026 looks very different from the pre-2022 era. With BoE base materially higher than the 0.1% of 2021, the all-in cost on an unsecured SME term loan typically sits at 9-13%, and even Recovery Loan Scheme / Growth Guarantee Scheme borrowing sits at 6-9% APR depending on lender and term.

This calculator handles the four loan structures UK SMEs actually use:

**1. Term loan (fixed monthly repayments)**
- Bank loan, alternative lender (Funding Circle, iwoca, Capital on Tap)
- 1-7 year term typical
- Pricing: base + 3-8% unsecured; base + 2-4% secured against property/assets
- Amortisation formula: M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]

**2. Government-backed loans (RLS, GGS)**
- Up to £2M per business group (£1M cap for Northern Ireland Protocol borrowers), 6-year term
- 70% government guarantee, but the borrower remains personally liable for the full debt
- Pricing typically 6-9% APR

**3. Invoice finance (factoring / discounting)**
- 80-90% advance against unpaid invoices
- Costs: 0.5-2.5% of invoice value plus discount margin
- Priced as a service fee, not an APR — annualised it's often 12-30%

**4. Asset finance (HP, lease)**
- For equipment, vehicles, plant
- 3-7 year term typical
- Pricing 5-12% APR depending on asset and security

Plug loan amount, term, and rate into the calculator and it returns:
- Monthly repayment
- Total interest cost over term
- Amortisation schedule (capital vs interest by month)
- Affordability check (repayment as % of monthly profit; aim for under 25% of monthly EBITDA for comfort)

For comparable UK SME lending rates, the Bank of England's monthly Money and Credit statistical release publishes the average rate on new SME lending, and the British Business Bank's annual Small Business Finance Markets report covers regional benchmarks.`,
      hreflangCountry: "en-GB",
    },
    us: {
      slug: "us",
      kind: "geo",
      label: "USA",
      h1Suffix: " for US Businesses",
      title: "Business Loan Calculator USA | BusCalcTools",
      description:
        "Calculate US business loan repayments at SBA, conventional, and alt-lender rates. Monthly payment, total interest, and full amortisation in dollars.",
      voiceAnswer: undefined,
      intro: `A US business loan calculator uses the standard amortisation formula to compute monthly repayments and total interest cost at prevailing 2026 US small business lending rates. With the Federal Funds rate sitting in the 4-5% range and Prime tracking at roughly 7-8%, the all-in cost of US SMB borrowing in 2026 spans a wide arc — from 7-10% on conventional bank term loans to 15-30% APR on alternative lenders. The SBA.gov website, Federal Reserve Senior Loan Officer Opinion Survey, and NFIB Small Business Economic Trends report are the authoritative sources for current US small business lending benchmarks.

US small business borrowing in 2026 has settled into a five-product market that this calculator handles cleanly:

**1. SBA-7(a) — the workhorse of US small business lending**
- Up to $5 million principal, 10-year working capital / 25-year real estate amortisation
- Pricing: Prime + 3.0% to 6.5% (tiered by loan size); larger loans get the lower spread
- Typical 2026 all-in APR: 9-12% with Prime at ~7-8%
- SBA guarantee: 75% on loans above $150k, 85% on loans below $150k
- Use of funds: working capital, equipment, owner-occupied real estate, business acquisition, refinance

**2. SBA-504 — fixed-asset and real-estate financing**
- Up to $5.5 million ($5M project portion, plus the lender's first-mortgage portion can push total to $20M+)
- Structure: 50% bank first mortgage, 40% CDC/SBA debenture at sub-market fixed rate, 10% borrower equity
- Pricing: 504 debenture portion ~6% fixed (2026 Treasury-plus), bank first mortgage at market
- 10, 20, or 25-year amortisation

**3. Conventional term loan**
- $50k-$10M+
- Pricing 7-10% APR for established borrowers with collateral
- 3-7 year typical term
- Bank or credit union, often relationship-based

**4. Business line of credit**
- Revolving, $10k-$1M typical
- Prime + 1.5% to 5% on drawn balances
- Often interest-only during draw period

**5. Alternative lenders (OnDeck, Bluevine, Funding Circle, Kabbage, Fundbox)**
- $5k-$500k
- 15-30% APR effective on short-term and 6-18% on medium-term
- Faster decisions (24-72 hours) but materially higher cost

**Worked example — SBA-7(a):** A US small business takes a $100,000 SBA-7(a) loan at 10% APR over 10 years to fund a build-out. Using M = P × [r(1+r)^n] / [(1+r)^n − 1] with r = 0.10/12 = 0.008333 and n = 120, the monthly payment is $1,321.51. Total paid over 120 months = $158,581. Of that, $100,000 is principal and $58,581 is interest — about 59% of the original principal paid in interest over the term.

**The personal-guarantee reality:** almost every US SBA loan requires personal guarantees from owners holding 20% or more equity. Most conventional small business loans also require personal guarantees until the business has substantial standalone credit history. This means SMB borrowing in the US is, in practice, secured by the owner's home and personal assets in most cases — the calculator's monthly payment is the public number, but the personal-asset exposure is the private one.

**Origination and SBA guarantee fees:** conventional lenders charge 0-5% origination fees that should be added to the principal when modelling true cost. SBA-7(a) borrowers also pay an upfront guarantee fee, tiered by loan size: 0% on loans up to $1M during current SBA fee-waiver windows, 0.55% on $1M-$1.5M, 0.75% on $1.5M-$2M, and 0.85% on $2M-$5M (check current SBA fee notices, as these are revised). On a $100k SBA-7(a) the guarantee fee under the current waiver is $0; on a $2.5M loan, roughly $20,000.

For authoritative current data, the SBA.gov SOP 50 10 7 sets the underwriting and pricing rules for 7(a) and 504 loans, the Federal Reserve's H.15 release publishes Prime daily, the Senior Loan Officer Opinion Survey tracks tightening or easing in SMB credit standards quarterly, and the NFIB Small Business Economic Trends survey publishes monthly SMB borrowing-needs data. Pair this calculator with /roi-calculator/us to test whether the debt-funded project actually pays off and /cash-flow-calculator/us to confirm the monthly payment fits projected cash flow.`,
      hreflangCountry: "en-US",
    },
    sba: {
      slug: "sba",
      kind: "scenario",
      label: "SBA",
      h1Suffix: " for SBA Loans",
      title: "SBA Loan Calculator (7a, 504) | BusCalcTools",
      description:
        "Model SBA-7(a), 504, and Express loan repayments with current SBA guarantee-fee tiers and Prime-linked pricing. Monthly payment, total interest, amortisation.",
      voiceAnswer: undefined,
      intro: `An SBA loan calculator computes monthly repayments and total interest cost across the three main SBA programs — 7(a), 504, and Express — using current Prime-linked pricing and SBA guarantee-fee tiers. The 7(a) program is the SBA's general-purpose loan up to $5 million, 504 is fixed-asset and real-estate financing up to $5.5 million per project, and Express is a fast-track product up to $500,000 with a reduced 50% SBA guarantee (versus 75-85% on standard 7(a)). The SBA.gov SOP 50 10 7 and the SBA's quarterly fee notices are the authoritative sources for current program rules.

The three SBA programs each have a distinct rate cap, fee structure, and process timeline that the calculator's "loan amount + rate + term" inputs only partially capture — so context matters when interpreting the monthly payment number.

**SBA-7(a) — general purpose, up to $5M**
- Maximum variable rate: Prime + 3.0% on loans above $350k, Prime + 4.5% on $50k-$350k, Prime + 6.0% on $25k-$50k, Prime + 6.5% on loans up to $25k (tiered to reflect underwriting cost on smaller loans)
- Maximum fixed rate: tied to a quarterly SBA peg (typically Treasury-plus a small spread)
- Term: up to 10 years for working capital, 25 years for real estate
- Collateral: SBA requires lender to take all available collateral up to the loan amount; lender may not decline solely for lack of collateral if other underwriting is strong
- Personal guarantee: required from any owner ≥20% equity; spousal guarantee may also be required in community-property states (AZ, CA, ID, LA, NV, NM, TX, WA, WI)

**SBA-504 — fixed assets and real estate, up to $5.5M debenture**
- Structure: 50% bank first mortgage at market rate / 40% CDC-SBA debenture at sub-market fixed / 10% borrower equity
- 504 debenture rate: ~6% fixed in 2026 (10-year Treasury plus a spread, set monthly by the CDC at debenture pricing)
- Term: 10, 20, or 25 years (25-year option added in recent SBA reforms)
- Use of funds restricted: must be fixed-asset purchase (real estate, heavy equipment) — no working capital or business acquisition

**SBA Express — fast-track, up to $500k**
- 36-hour SBA decision
- 50% SBA guarantee (vs 75-85% on standard 7(a)) means lender takes more risk and prices it accordingly
- Maximum rate: Prime + 4.5% on loans above $50k, Prime + 6.5% below $50k
- Often used for lines of credit and quick working-capital needs

**SBA guarantee fees (tiered by loan size, 2026):**
- $0 - $1,000,000: 0% during current SBA fee-waiver windows (verify against the current SBA fee notice, as these are reset annually)
- $1,000,001 - $1,500,000: 0.55%
- $1,500,001 - $2,000,000: 0.75%
- $2,000,001 - $5,000,000: 0.85% (subject to annual review)
- All fees are charged on the guaranteed portion only, not the full loan amount

**Worked example:** A US food manufacturer takes a $500,000 SBA-7(a) loan at Prime + 2.75% — with Prime at 7.75% that's 10.5% APR — to fund a new processing line, 10-year fully-amortising. Using M = P × [r(1+r)^n] / [(1+r)^n − 1] with r = 0.105/12 = 0.00875 and n = 120, the monthly payment is $6,746.75. Total paid = $809,610. Total interest = $309,610 — about 62% of the original principal paid in interest over the 10-year term. The SBA guarantee fee on this loan (current waiver) is $0; outside the waiver window at 0% / 0.55% / 0.75% / 0.85% tiers, a $500k loan would carry no guarantee fee since it's below the $1M threshold.

**SBA eligibility — the gating questions before rate math matters:**
- For-profit, US-based, operating in an eligible industry
- Meets SBA size standards by NAICS code (most retail, manufacturing, and services are under 500 employees; some industries use revenue thresholds)
- Owner has invested reasonable equity
- Demonstrated repayment ability from business cash flow
- Has exhausted other non-SBA financing options (or can demonstrate they would not be available)

**Process timeline:** SBA Express decisions in 36 hours, standard 7(a) decisions in 30-90 days, 504 in 60-120 days. The 504 timeline is the longest because the CDC, SBA, and bank all underwrite separately.

For authoritative current data, the SBA's SOP 50 10 7 (Small Business Lender Operating Procedures) sets all 7(a) and 504 underwriting and pricing rules, the SBA quarterly fee notices publish current guarantee fees, and individual CDCs (Certified Development Companies) publish current 504 debenture rates. Pair this calculator with /business-loan-calculator/us for conventional alternatives and /cash-flow-calculator/us to model affordability of the projected monthly payment.`,
      hreflangCountry: "en-US",
    },
    "equipment-finance": {
      slug: "equipment-finance",
      kind: "scenario",
      label: "Equipment Finance",
      h1Suffix: " for Equipment Finance",
      title: "Equipment Finance Calculator | BusCalcTools",
      description:
        "Model equipment loan vs lease, with Section 179 expensing and bonus depreciation built in. Monthly payment, total cost, and after-tax comparison.",
      voiceAnswer: undefined,
      intro: `An equipment finance calculator models monthly payments and after-tax cost across the three main equipment-financing structures — equipment loan, capital (finance) lease, and operating lease — and lets you stack Section 179 expensing and bonus depreciation on top to see true after-tax cost. IRS Publication 946 (How to Depreciate Property), Section 179 of the Internal Revenue Code, and the Equipment Leasing and Finance Association (ELFA) Monthly Confidence Index are the authoritative sources for current equipment-finance benchmarks and tax rules.

US small businesses finance roughly $1 trillion of equipment annually across these three structures, and the right structure depends on tax position, balance-sheet objectives, and how long you intend to hold the asset.

**1. Equipment loan**
- You own the equipment immediately; lender takes a UCC-1 security interest
- Depreciate the asset on your books; deduct interest expense separately
- Section 179 expensing or bonus depreciation available in year of placed-in-service
- Typical rate: 7-12% APR depending on credit and asset type
- Term: matched to equipment useful life, typically 3-7 years

**2. Capital (finance) lease**
- Lessor owns title, lessee has economic ownership
- Often a $1 buyout or fair-market-value buyout at end of term
- For tax: treated like a loan — depreciate, deduct interest portion of lease payment
- For GAAP: capitalised on the balance sheet under ASC 842
- Same Section 179 / bonus depreciation eligibility as a loan

**3. Operating lease (true lease)**
- Lessor retains title; lessee returns at end of term
- Lower monthly payments because no equity buildup
- Tax: deduct the full lease payment as operating expense (no depreciation, no Section 179)
- GAAP: on-balance-sheet under ASC 842 (right-of-use asset and lease liability)
- Typical with technology, vehicles, and equipment with rapid obsolescence

**Section 179 expensing 2026:**
- Maximum deduction: up to $1.22 million in equipment cost expensed in year of placed-in-service (verify against the current IRS Section 179 cap, which is indexed annually)
- Phase-out: begins at $3.05 million in equipment placed in service in the tax year; dollar-for-dollar reduction in the cap above that
- Eligible property: tangible personal property used in the active conduct of a trade or business
- Election: made annually on Form 4562

**Bonus depreciation 2026:** 60% of basis in year of placed-in-service for qualifying property (down from 100% pre-2023, phasing 20 percentage points per year toward 0% in 2027 under the current TCJA sunset, subject to ongoing legislative changes — verify current rate). Bonus depreciation applies to the portion of basis not expensed under Section 179.

**Worked example — equipment loan with Section 179:** A landscaping company buys a $80,000 truck on a 5-year loan at 8% APR. Using M = P × [r(1+r)^n] / [(1+r)^n − 1] with r = 0.08/12 = 0.006667 and n = 60, the monthly payment is $1,622.11. Total paid over 60 months = $97,327. Total interest = $17,327 — about 22% of principal in interest over the term. Under Section 179, the full $80,000 cost is deductible in year 1 if elected; at a 35% combined federal-plus-state marginal rate, that's $28,000 of federal-plus-state tax saved in year 1, bringing the effective after-tax cost of the truck to roughly $69,327 ($97,327 total paid minus $28,000 tax shield, before discounting).

**Worked example — operating lease comparison:** the same $80,000 truck on a 5-year operating lease at $1,400/month means $84,000 total lease payments over 60 months — slightly less than the $97,327 loan total. The lessee deducts $16,800/year in lease payments (about $5,880/year federal-plus-state tax shield at 35% marginal, $29,400 total over 5 years), making the after-tax cost of the lease roughly $54,600. The lease wins on after-tax cost in this scenario, but the company doesn't own the truck at the end — if the truck still has $25,000-$30,000 of residual value, the loan-plus-Section-179 path leaves you with the asset and the lease path doesn't.

**Industry-typical equipment-finance norms:**
- Construction: heavy equipment financed 3-7 years; manufacturer captives (Caterpillar Financial, John Deere Financial, Komatsu Financial) often beat bank rates
- Trucking: tractor financing 3-5 years; trailer financing 5-7 years; PACCAR Financial, Daimler Truck Financial, and Navistar Capital are the captives
- Manufacturing: machine-tool financing 5-10 years on long-life capex; CIT, US Bank Equipment Finance, and Wells Fargo Equipment Finance dominate
- Medical equipment: 3-7 years; manufacturer programs (Siemens Healthineers Financial, GE HealthCare Capital) compete with specialty lenders
- Technology / IT: 2-4 year operating leases dominant due to obsolescence risk

For authoritative current rules, IRS Publication 946 covers MACRS depreciation, Section 179, and bonus depreciation; the IRS Form 4562 instructions cover the election mechanics; and the ELFA Monthly Confidence Index publishes current equipment-finance pricing and volume benchmarks. Pair this calculator with /roi-calculator for the project-level return analysis and /business-loan-calculator/us for conventional loan alternatives.`,
      hreflangCountry: "en-US",
    },
    za: {
      slug: "za",
      kind: "geo",
      label: "South Africa",
      h1Suffix: " for South African Businesses",
      title: "Business Loan Calculator South Africa | BusCalcTools",
      description:
        "Calculate SA business loan repayments at prime-linked rates from the big-five banks, SEFA, and IDC. Monthly payment, total interest, and amortisation in rand.",
      voiceAnswer: undefined,
      intro: `A South African business loan calculator computes monthly repayments and total interest cost at prevailing 2026 SA SME lending rates. With the SARB repo rate driving prime at roughly 11.75% in 2026 (track current SARB MPC decisions on the South African Reserve Bank website), unsecured SME term loans typically price at prime + 4% to prime + 10%, putting the all-in cost in the 15.75% to 21.75% range. State-backed lending via SEFA and IDC sits materially below market at 6-10%. The SARB Monetary Policy Statement, NCR (National Credit Regulator) annual report, and the FinScope SA SMME survey are authoritative references for current SA SME finance benchmarks.

SA SME borrowing in 2026 splits into five distinct channels, each priced and structured differently. This calculator handles the math for all five — the operator just needs to plug in the right rate for the channel they're modelling.

**1. Big-five commercial bank business loans**
- Standard Bank Business Banking, Absa Business, Nedbank Business, FNB BizFin, Capitec Business
- Unsecured SME term loans: prime + 4% to prime + 10% depending on credit, sector, and tenor (so 15.75% to 21.75% with prime at 11.75%)
- Secured (property, asset-backed): prime + 1% to prime + 4% (12.75% to 15.75%)
- Term: 1-7 years typical for unsecured, up to 20 years for property-secured
- Personal surety almost universal for loans below R10 million

**2. SEFA (Small Enterprise Finance Agency)**
- Micro loans up to R50,000; small loans R50,001 to R5 million
- Pricing: prime + 2% to prime + 3% (13.75% to 14.75%)
- Term: up to 60 months for working capital, longer for asset finance
- Eligibility: SA-registered, B-BBEE level demonstrable contribution, sector focus on township and rural enterprise

**3. IDC (Industrial Development Corporation)**
- Minimum R1 million; no formal maximum (typical deals R5m-R1bn)
- Pricing: 6-10% — sub-market because IDC is a development finance institution with concessional mandate
- Restricted to qualifying enterprises with developmental impact — B-BBEE level, sector (manufacturing, mining, infrastructure), and job creation are scored
- Term: matched to project, typically 5-15 years
- Process is slower than commercial bank — 3-6 months from application to drawdown is typical

**4. Asset finance**
- Wesbank, ABSA Vehicle and Asset Finance, MBSA (Mercedes-Benz Financial Services), Stanlib Equipment Finance
- Vehicles and commercial equipment, 3-6 year terms typical
- Pricing: prime + 1% to prime + 5% depending on asset and customer
- Residual / balloon structures common for fleet

**5. Alternative and fintech lenders**
- Merchant Capital, Lulalend, Retail Capital, Bridgement, Pollen Finance
- Short-term revenue-based and term products R10k-R5m
- Effective APR 25-60% on short-term, 18-30% on medium-term
- Faster (24-72 hour decisions) but materially more expensive than bank or SEFA

**Worked example:** A Johannesburg manufacturing SME takes an unsecured R1,000,000 term loan from a big-five bank at prime + 6% = 17.75% APR over 5 years. Using M = P × [r(1+r)^n] / [(1+r)^n − 1] with r = 0.1775/12 = 0.014792 and n = 60, the monthly payment is R25,257.62. Total paid over 60 months = R1,515,457. Total interest = R515,457 — about 52% of the original principal paid in interest over the term. The same R1m at prime + 2% (13.75%) from SEFA would carry a monthly payment of roughly R23,159 and total interest of about R389,541, a R125,916 saving over the 5-year term if the borrower qualifies for SEFA pricing.

**The personal-surety reality:** for unsecured SME loans below R10 million from any of the big-five banks, personal surety from the owner (and often the spouse if married in community of property) is universal. The bank requires unlimited surety in most cases, meaning the surety is liable for the full debt even if the business assets are liquidated. The calculator's monthly payment line is the public number; the personal-balance-sheet exposure behind it is the private one.

**Origination and admin fees:**
- Big-five banks: R1,000-R5,000 initiation fee plus monthly service fee of R50-R100
- SEFA: 1-2% initiation fee
- Alternative lenders: 2-5% origination + monthly service fee, often baked into the headline rate

**NCR and NCA considerations:** the National Credit Act applies to all credit granted to juristic persons (companies, CCs, trusts) with annual turnover below R1 million and to all natural-person credit. NCA-regulated loans require pre-agreement quote (Form 20), full cost-of-credit disclosure, and prescribed dispute-resolution channels. For SME loans above the R1m turnover threshold to corporate entities, the NCA does not apply, but the NCR still regulates the lender's credit-provider registration. The National Credit Regulator's annual report publishes current NCA enforcement priorities.

**B-BBEE impact on lending access:** access to procurement-backed lending (where the loan is structured against confirmed government or large-corporate purchase orders) and to state-backed programmes (SEFA, IDC, NEF) is meaningfully easier for B-BBEE Level 1-4 entities. Sector codes also matter — the construction sector B-BBEE code differs from the financial services code, and lender scorecards weight these differently.

For authoritative current data, the SARB Monetary Policy Statement publishes the repo rate decision and forward guidance, BankservAfrica's BETI tracks SME credit demand, and the FinScope SA SMME survey publishes biennial SME finance access data. Pair this calculator with /cash-flow-calculator/za to model affordability and /invoice-calculator/za for the VAT-compliant invoice format SARS requires on the funded project.`,
      hreflangCountry: "en-ZA",
    },
  },

  "pricing-calculator": {
    za: {
      slug: "za",
      kind: "geo",
      label: "South Africa",
      h1Suffix: " for South African Businesses",
      title: "Pricing Calculator South Africa | BusCalcTools",
      description:
        "Calculate SA selling price with SARS VAT 15%, payment-processor fees, and target margin pre-filled. Forward and reverse pricing for ZAR retail and B2B.",
      voiceAnswer: undefined,
      intro: `A South African pricing calculator converts cost to shelf price including 15% VAT, payment-processor fees (typically 2.5-3.5% via Yoco, PayFast, Peach, or Stitch), and your target margin. The R1,000,000 rolling 12-month turnover threshold for compulsory VAT registration is the single biggest pricing inflection point. SARS' VAT 404 Guide for Vendors is the authoritative reference.

SA pricing has three structural features absent in UK or US frameworks. First, the headline VAT rate (15%) is materially lower than the UK's 20% but higher than the average US state sales tax — and unlike US sales tax, SA VAT is charged on services as well as goods, with very few exemptions. Second, the R1 million turnover threshold for VAT registration is a notorious pricing cliff: cross it for the first time and your effective margin on existing customers drops 13% overnight unless you reprice. Third, the cash-vs-credit landscape is bifurcated — informal sector pricing assumes cash and instant payment, while formal B2B pricing assumes 30-60 day Net terms and the working-capital cost that implies.

**Step 1 — Cost to ex-VAT price:** apply your target markup to VAT-exclusive cost. If you're VAT-registered, your supplier's invoice will include 15% input VAT that you'll claim back via the VAT201 return — work in ex-VAT figures throughout, because that's how SARS sees your turnover on the ITR14.

**Step 2 — Ex-VAT to shelf price:** add 15% VAT. For zero-rated goods (basic foodstuffs: maize meal, brown bread, milk, eggs, vegetable oil, rice, fresh fruit and vegetables; international transport of passengers and goods; exports) the VAT rate is 0% — but you still register and file. For exempt supplies (residential rental, educational services, public road and rail transport, financial services) you don't register and can't claim input VAT.

**SA pricing conventions by sector (industry-typical):**
- Builders' merchants: 25-40% markup on materials
- Independent fashion retail: 150-250% (lower than UK/US due to import duty stack)
- Restaurants and bars: 60-200% on food, 250-400% on alcohol
- Professional services: 200-400% on direct staff cost
- Plumbing / electrical parts: 30-100% depending on trade or retail counter

**Worked example:** a Pretoria retailer sources a kettle at R180 ex-VAT from a Johannesburg distributor (R207 incl-VAT, R27 input VAT claimable). Target 45% gross margin means ex-VAT shelf price = R180 ÷ 0.55 = R327.27. Adding 15% VAT, the till receipt shows R376.36 — round to R379 for psychological pricing. Net of payment-processing 3%, the retailer banks R367.50, of which R49.06 is output VAT owed to SARS at the next VAT201 cycle, leaving R318.44 — a R138.44 (43.5%) gross margin on a R180 cost.

For underlying rules, SARS' VAT 404 Guide for Vendors and the Binding General Ruling collection on the SARS website are authoritative. Pair with /profit-margin-calculator/za for the downstream margin walk and /invoice-calculator/za for the VAT-compliant invoice format SARS requires.`,
      hreflangCountry: "en-ZA",
    },
  },

  "employee-cost-calculator": {
    za: {
      slug: "za",
      kind: "geo",
      label: "South Africa",
      h1Suffix: " for South African Employers",
      title: "Employee Cost Calculator South Africa | BusCalcTools",
      description:
        "Calculate true SA employee cost with UIF, SDL, PAYE, COIDA, and 13th cheque. Free, browser-based, ZAR-ready for SARS-compliant payroll budgeting.",
      voiceAnswer: undefined,
      intro: `A South African employee cost calculator returns true cost-to-company including UIF (1% employer, capped at R177.12/month), SDL (1% above R500,000 annual payroll), COIDA premium (industry-rated, typically 0.3-2% of payroll), and PAYE withholding. The SA employer payroll burden is roughly 2% above gross salary — dramatically lighter than the US (~11% FICA+FUTA) or UK (13.8% Employer NI). SARS PAYE BRS and the UIF Contributions Act are authoritative.

The relatively light SA employer payroll stack is a competitive advantage often overlooked when comparing global hiring costs. A R600,000 annual salary in Johannesburg costs the employer roughly R612,000 in mandatory contributions — a 2% loading. The same R600k equivalent ($32k) in the US would carry roughly $3,500 in FICA+FUTA (11%), and the £45k equivalent in the UK would carry £4,800 in Employer NI plus £1,200+ minimum auto-enrolment pension (15%+).

**The 2026/27 SARS employer cost stack:**
- **Gross salary** — what appears on the payslip's earnings line
- **UIF**: 1% employer contribution on gross remuneration, capped at R177.12/month per employee (1% of the R17,712 monthly UIF ceiling). Employee contributes another 1% withheld
- **SDL (Skills Development Levy)**: 1% of total annual payroll, but only if payroll exceeds R500,000/year. Below that threshold, no SDL is payable
- **COIDA (Compensation for Occupational Injuries and Diseases)**: industry-rated annual premium — Class A office work ~0.27%, Class M construction ~3.8%, average ~1.0%. Paid annually to the Compensation Commissioner
- **Bargaining-council levies**: applies in certain sectors (motor industry, road freight, building industry) — typically 0.5-2% additional

**Common voluntary additions** (not legally required but typical in formal-sector employment):
- **Pension or provident fund**: employer 5-12% of gross
- **Medical aid subsidy**: employer 50% of total scheme contribution is conventional, typically R1,500-4,500/employee/month
- **Group life and disability**: 1-2% of gross
- **13th cheque (bonus)**: legally optional but employee expectation; typically one month's gross

**PAYE (withheld from employee, not employer cost but you must remit it):** monthly to SARS via EMP201 by the 7th of the following month, plus annual EMP501 reconciliation in May (interim) and October (final).

Worked example: a Cape Town SaaS hiring a mid-level developer at R780,000 gross. Mandatory employer cost = R780,000 + R2,125 UIF + R7,800 SDL + R2,808 COIDA ≈ R792,733 — a 1.6% loading. Add provident fund (7.5% employer = R58,500), 50% medical aid subsidy (R30,000/year), and 13th cheque (R65,000) and true CTC reaches R946,233 — a 21.3% loading over gross salary that's roughly competitive with US/UK fully-loaded benchmarks despite the much lighter statutory base.

For specifics, see SARS' PAYE Business Requirements Specification, the Unemployment Insurance Contributions Act 4 of 2002, and the COIDA tariff schedule from the Department of Employment and Labour. Pair with /pricing-calculator/za and /freelance-rate-calculator/za to model the build-vs-contract decision.`,
      hreflangCountry: "en-ZA",
    },
    california: {
      slug: "california",
      kind: "geo",
      label: "California",
      h1Suffix: " for California Employers",
      title: "Employee Cost Calculator California | BusCalcTools",
      description:
        "Calculate true CA employee cost with FICA, FUTA, SUI, ETT, SDI, and workers' comp stacked. The highest US state employer payroll burden — modelled in full.",
      voiceAnswer: undefined,
      intro: `A California employee cost calculator returns true cost-to-company including federal FICA (7.65% employer), FUTA (0.6% effective), CA SUI (1.5-6.2% on first $7,000), CA ETT (0.1% on first $7,000), CA SDI (1.2% on first $168,600 — paid by employee in CA but a notable wage-base item), and workers' comp (1-15% industry-rated). CA is the highest US state employer cost. The EDD's California Employer's Guide (DE 44) is authoritative.

California has the heaviest US state employer payroll stack — roughly 12-18% above gross salary versus a national average of 11-13%. The combination of high SUI ceilings, the unique Employment Training Tax, and workers' comp premiums that have not normalised since the 2003 reforms means CA employers consistently pay 1-3 percentage points more in fully-loaded payroll cost than the same hire in Texas or Florida.

**The 2026 California employer cost stack:**
- **Gross salary** — base earnings before any tax
- **FICA Social Security**: 6.2% employer match on first $184,500 (2026 SS wage base)
- **FICA Medicare**: 1.45% employer match on all wages, plus 0.9% Additional Medicare withheld from employee above $200k single
- **FUTA**: 6% on first $7,000 of wages, reduced to 0.6% effective rate via state UI credit
- **CA SUI (State Unemployment Insurance)**: new-employer rate 3.4% on first $7,000; experience-rated from 1.5% to 6.2% after three years
- **CA ETT (Employment Training Tax)**: 0.1% on first $7,000 — funds the CA Employment Training Panel
- **CA SDI (State Disability Insurance)**: 1.2% on all wages up to $168,600 (no employer match; withheld from employee, but a relevant CA-specific cost-of-employment item)
- **Workers' comp**: industry-rated premiums via private carriers or State Fund; clerical class code 8810 ~$0.30 per $100 of payroll, construction 5474 ~$15+ per $100
- **CA Paid Family Leave**: funded through SDI, no separate employer cost

**Common voluntary additions:**
- **Health insurance**: employer typically pays 70-90% of premium; CA group plans run $600-1,400/employee/month
- **401(k) match**: typical 3-6% Safe Harbor
- **Disability and life insurance**: 0.5-1% of payroll
- **CalSavers** (mandatory for employers without retirement plan, 5+ employees): no direct employer cost but admin overhead

**CA-specific labor cost realities not on the payroll line:**
- **Daily overtime**: 1.5x after 8 hours/day, 2x after 12 — versus federal weekly 40-hour threshold
- **Meal and rest break premiums**: missed break = 1 hour wages owed
- **Paid sick leave**: minimum 40 hours/year accrual
- **Final paycheck on termination**: due same day for involuntary, within 72 hours for voluntary

Worked example: SF SaaS hiring a senior PM at $185,000 base. Federal FICA $11,475 + FUTA $42 + CA SUI $217 (new employer) + CA ETT $7 + workers' comp 8810 $555 = $12,296 statutory loading (6.6%). Add 80% health insurance subsidy ($14,400/year), 4% 401(k) match ($7,400), disability/life ($1,200) = $35,296 total benefit and tax loading on top of gross — a 19% loading, before factoring CA-specific overtime and break-premium risk.

For specifics, see EDD's California Employer's Guide (DE 44) and the Workers' Compensation Insurance Rating Bureau's pure-premium-rate filings. Pair with /pricing-calculator and /freelance-rate-calculator/new-york for the build-vs-contract math.`,
      hreflangCountry: "en-US",
    },
  },

  "invoice-calculator": {
    za: {
      slug: "za",
      kind: "geo",
      label: "South Africa",
      h1Suffix: " for South African Businesses",
      title: "Invoice Calculator South Africa | BusCalcTools",
      description:
        "Generate SA tax invoices with SARS-compliant VAT 15% breakout, R1M registration threshold guidance, and ZAR formatting. Free and browser-based.",
      voiceAnswer: undefined,
      intro: `A South African invoice calculator generates SARS-compliant tax invoices with 15% VAT broken out separately, supplier VAT number, customer details, and sequential invoice numbering. VAT registration is mandatory at R1,000,000 rolling 12-month turnover (voluntary from R50,000). SARS' VAT 404 Guide for Vendors and section 20 of the VAT Act are the authoritative references on tax invoice requirements.

SA invoice compliance is unusually prescriptive because SARS audits invoice content directly during VAT verifications — a non-compliant tax invoice means the customer can't claim input VAT and you can be penalised for issuing an invalid document. The R1 million turnover threshold for compulsory VAT registration is the single biggest invoice-format inflection point for an SA small business: cross it for the first time, and every subsequent invoice must include 11 specific fields that simpler "quotation"-style invoices skip.

**Section 20(4) of the VAT Act — required elements of a full tax invoice (R5,000+):**
- The words "Tax Invoice", "VAT Invoice", or "Invoice" in a prominent place
- Supplier's name, address, and VAT registration number
- Recipient's name, address, and VAT registration number (if a vendor)
- Individual serialised invoice number
- Date of issue
- Full and proper description of goods or services
- Quantity or volume supplied
- The value of the supply, the VAT charged, and the consideration (or alternatively the consideration and a statement that it includes VAT, with the rate)

**Abridged tax invoices (R50-R5,000):** can omit the recipient details and serialised number requirement but must still show VAT separately.

**Below R50:** no tax invoice required.

**Invoice numbering:** must be sequential and unbroken — gaps trigger SARS questions during VAT201 verification. Use a clean prefix scheme (e.g. INV-2026-0001) and never reissue a cancelled number; issue a credit note (with its own number, referencing the original invoice) instead.

**Currency and rounding:** SA tax invoices may be issued in any currency, but VAT must be stated in rand. SARS uses the spot rate on date of supply for the rand conversion. Round VAT to the nearest cent.

**Worked example:** Cape Town design studio invoices a Johannesburg client R45,000 ex-VAT for a brand identity project. Tax invoice shows: subtotal R45,000.00, VAT @ 15% R6,750.00, total R51,750.00. The studio remits the R6,750 on its next bi-monthly VAT201 return; the client claims R6,750 input VAT on its return, netting the cost to R45,000. If the studio is below the R50k voluntary threshold and not VAT-registered, it issues a plain "Invoice" for R45,000 with no VAT — but the client can claim zero input VAT, making the studio's pricing functionally R6,750 less competitive against a VAT-registered alternative for B2B work.

**Payment terms:** SA convention is 30 days net for B2B; 14 days for retail credit. The Prompt Payment Code (introduced 2020) targets 30-day max for government suppliers but is widely flouted; expect 60-90 days from large corporates in practice.

For specifics, see SARS' VAT 404 Guide for Vendors and Binding General Ruling 21 on tax invoices. Pair with /pricing-calculator/za for VAT-inclusive shelf pricing and /freelance-rate-calculator/za for the hourly-rate math behind the invoice line.`,
      hreflangCountry: "en-ZA",
    },
  },

  "ecommerce-profit-calculator": {
    california: {
      slug: "california",
      kind: "geo",
      label: "California",
      h1Suffix: " for California Ecommerce Sellers",
      title: "Ecommerce Profit Calculator California | BusCalcTools",
      description:
        "Calculate CA ecommerce profit with state sales tax (7.25-10.75%), marketplace facilitator law, and CDTFA nexus rules built in. Per-order and aggregate margin.",
      voiceAnswer: undefined,
      intro: `A California ecommerce profit calculator returns per-order and aggregate margin after California state sales tax (base 7.25% + local district up to 3.5%, total 7.25-10.75%), marketplace facilitator collection rules (Amazon, eBay, Etsy, Walmart Marketplace collect on the seller's behalf), and CA-specific nexus thresholds. CDTFA Publication 109 (Internet Sales) and AB 147 (the Wayfair-era marketplace law) are the authoritative references.

California is the largest US ecommerce market by volume and one of the most complex from a tax-collection standpoint. Three CA-specific rules reshape per-order economics versus a Texas or Florida baseline. First, the combined state-plus-district sales tax tops out at 10.75% (Alameda, La Mirada, parts of LA County) versus a 7.25% statewide floor — so the effective tax on a $50 product can range from $3.63 to $5.38 depending on the customer's ZIP, and the seller is responsible for collecting the correct rate via destination-sourcing. Second, AB 147 makes marketplace facilitators (Amazon, eBay, Etsy, Walmart, Mercari) liable for collecting and remitting CA sales tax on third-party sales — so direct DTC Shopify sellers carry tax responsibility, while marketplace sellers do not. Third, CA's economic nexus threshold ($500,000 in sales to CA, no transaction count) is among the highest, meaning small out-of-state sellers can stay below the registration line longer than they could in most other states.

**The CA ecommerce P&L stack:**

**Per-order variable costs:**
- COGS (landed cost: supplier + freight + duties + packaging)
- Payment processing: Stripe 2.9% + $0.30, Shopify Payments 2.4-2.9% + $0.30, PayPal 3.49% + $0.49
- Fulfilment: $4-12 per order for 3PL; in-state CA warehouses (Stockton, Ontario, Riverside) command 15-25% premium over Midwest fulfilment
- Shipping: CA-to-CA ground typically $5-8; CA-to-East-Coast $10-18; absorbed or partially passed through
- Sales tax: 7.25-10.75% collected from customer, remitted to CDTFA — not a cost line but a working-capital and audit-risk item
- Marketing CAC (ad spend ÷ new customers)

**Period costs:**
- Software stack (Shopify, Klaviyo, Postscript, returns) — 3-7% of revenue
- Salaries (in CA, fully-loaded with FICA + SUI + SDI + workers' comp — see /employee-cost-calculator/california)
- Returns and refunds (apparel 20-30%; electronics 8-15%; beauty 5-10%)

**CA-specific compliance overhead:**
- **CDTFA seller's permit** and quarterly/monthly sales tax filings (frequency assigned based on volume)
- **District tax rate updates**: CDTFA publishes new rate tables quarterly; automate via TaxJar, Avalara, or Shopify Tax to avoid undercollection
- **Prop 65 warnings** on physical products containing listed chemicals; non-compliance fines up to $2,500/day per violation
- **CCPA / CPRA privacy disclosures** for any seller with $25M+ revenue or processing 50k+ CA consumer records

**Worked example:** an LA-based DTC apparel seller, $40 average order value, 38% gross margin pre-tax. Per-order: $40 revenue − $25 COGS − $1.46 Stripe − $6 fulfilment = $7.54 contribution before marketing. CA sales tax collected ($3.40 at 8.5% average) is a pass-through, not margin. After $7 blended CAC, net per-order is $0.54 — meaning repeat-purchase economics (LTV from order 2+) determine whether the business compounds or bleeds.

For specifics, see CDTFA Publication 109 (Internet Sales), Publication 44 (District Taxes), and AB 147 marketplace facilitator guidance. Pair with /ecommerce-profit-calculator/texas for the no-state-income-tax contrast.`,
      hreflangCountry: "en-US",
    },
    texas: {
      slug: "texas",
      kind: "geo",
      label: "Texas",
      h1Suffix: " for Texas Ecommerce Sellers",
      title: "Ecommerce Profit Calculator Texas | BusCalcTools",
      description:
        "Calculate TX ecommerce profit with state sales tax 6.25% (up to 8.25% local), franchise tax, and no state income tax. Per-order and aggregate margin.",
      voiceAnswer: undefined,
      intro: `A Texas ecommerce profit calculator returns per-order and aggregate margin after Texas state sales tax (6.25% state + up to 2% local, capped at 8.25%), franchise tax for entities above the $2.47M revenue threshold (2026), and zero state personal income tax. Marketplace facilitator law makes Amazon, eBay, Etsy, and Walmart liable for collection on third-party sales. Texas Comptroller Rule 3.286 and Publication 94-108 are authoritative.

Texas is one of the most ecommerce-friendly US states for both DTC operators and marketplace sellers. The combination of no state personal income tax (so pass-through profit flows directly to the operator at federal rates only), a relatively modest 6.25-8.25% combined sales tax, a high $500,000 economic nexus threshold for remote sellers, and a $2.47M franchise tax floor means a Texas-domiciled ecommerce business under $2.5M revenue is genuinely free of state-entity tax — only federal income tax applies.

**The TX ecommerce P&L stack:**

**Per-order variable costs:**
- COGS (landed cost: supplier + freight + duties + packaging)
- Payment processing: Stripe 2.9% + $0.30, Shopify Payments 2.4-2.9% + $0.30, PayPal 3.49% + $0.49
- Fulfilment: $3.50-10 per order for 3PL; Texas (Dallas, Houston, San Antonio) is a top-3 US 3PL hub with competitive rates and 2-day reach to 90% of US population
- Shipping: TX-centric origin yields 8-15% lower blended shipping cost than coast-only origin
- Sales tax: 6.25-8.25% collected and remitted to TX Comptroller — Texas uses origin-based sourcing for intrastate sales (rate based on seller's location), destination-based for interstate
- Marketing CAC (ad spend ÷ new customers)

**Period costs:**
- Software stack (Shopify, Klaviyo, Postscript, returns) — 3-7% of revenue
- Salaries (TX is materially cheaper than CA/NY for fulfilment and ops staff)
- Returns and refunds (apparel 20-30%; electronics 8-15%; beauty 5-10%)

**TX-specific tax and compliance overhead:**
- **Sales and use tax permit**: required to collect TX sales tax; filing frequency assigned monthly/quarterly/annually based on liability
- **Franchise tax**: applies to entities (LLCs, corporations, partnerships) with annualised revenue above $2.47M (2026 no-tax-due threshold). Rate is 0.375% (retail/wholesale) or 0.75% (other) of taxable margin. Sole proprietors are exempt
- **Marketplace facilitator collection**: under HB 1525 (effective Oct 2019), Amazon, eBay, Etsy, Walmart, Mercari collect TX sales tax on third-party sales — direct DTC sellers carry that obligation
- **Economic nexus for remote sellers**: $500,000 in TX revenue in the preceding 12 months
- **Single Local Use Tax Rate**: TX allows remote sellers to elect a uniform 1.75% local tax (combined with 6.25% state = 8%) for all TX sales, instead of tracking every local jurisdiction — a meaningful admin simplification

**Worked example:** a Houston-based DTC supplements seller, $55 average order value, 52% gross margin pre-tax. Per-order: $55 revenue − $26.40 COGS − $1.90 Stripe − $5 fulfilment (TX 3PL) = $21.70 contribution before marketing. TX sales tax collected ($4.40 at 8%) is a pass-through. After $10 blended CAC, net per-order is $11.70 — better unit economics than the LA equivalent purely on lower fulfilment cost, lower payroll burden, and zero state income tax on the resulting profit.

For specifics, see Texas Comptroller Publication 94-108 (Engaged in Business in Texas) and Rule 3.286 (Seller's and Purchaser's Responsibilities). Pair with /ecommerce-profit-calculator/california for the high-cost-state contrast.`,
      hreflangCountry: "en-US",
    },
  },

  "roi-calculator": {
    marketing: {
      slug: "marketing",
      kind: "scenario",
      label: "Marketing",
      h1Suffix: " for Marketing",
      title: "Marketing ROI Calculator | BusCalcTools",
      description:
        "Calculate marketing ROI on campaigns, ads, and content spend. Annualised return, payback period view, and color-coded result tier for fast decisions.",
      voiceAnswer: undefined,
      intro: `Marketing ROI = (revenue attributable to marketing − marketing spend) ÷ marketing spend. The industry shorthand ROAS = gross revenue ÷ ad spend, before COGS. Healthy benchmarks: ROAS 3-4x for ecommerce paid social, CAC payback under 12 months for SaaS, LTV:CAC ratio of 3:1 or better. IAB attribution standards are the closest framework.

"Marketing ROI" gets used loosely across teams that mean very different things. A CMO usually means brand-attributable revenue lift over a long window. A performance marketer means ROAS this week. A CFO means contribution-margin payback against fully-loaded customer acquisition cost. This calculator outputs the four metrics they actually need, side-by-side, so the conversation can converge:

**ROAS (Return on Ad Spend)** = revenue / ad spend
- Industry shorthand for performance marketing
- Pre-COGS, pre-overhead — a vanity metric without context
- Useful for daily channel optimisation

**MER (Marketing Efficiency Ratio)** = total revenue / total marketing spend
- Aggregate, post-attribution honesty check
- Better than ROAS for cross-channel comparison

**CAC (Customer Acquisition Cost)** = marketing spend / new customers acquired
- The unit number that ties to LTV
- Should include all marketing fully-loaded (salaries, agencies, tools, ad spend)

**LTV:CAC** = customer lifetime value / CAC
- The single most important compound number in subscription / repeat-purchase businesses
- Healthy: 3:1 or better
- Below 1:1 you are subsidising customers; below 3:1 you may not be funding growth profitably

**Industry benchmarks (2026):**
- DTC ecommerce paid-social ROAS: 2-4x; best-in-class 5x+
- B2B SaaS CAC payback: 12-18 months target; under 12 is elite
- Content / SEO LTV:CAC: typically 5:1+ once mature (12-18 month ramp)
- Affiliate / referral CAC: lowest at 10-30% of paid CAC

**The calculator handles common gotchas:**
- Attribution windows (last-click vs first-click vs linear)
- iOS 14.5+ paid-social under-reporting (Meta typically under-reports actual revenue by 15-40% post-ATT)
- Returns and refunds (gross revenue overstates contribution)
- Free trial conversion (gross signups overstate paying-customer CAC)

For framework-level guidance, the IAB's MRC-accredited attribution standards and the AMA's marketing measurement framework are the closest things to authoritative references in the US.`,
      hreflangCountry: undefined,
    },
  },
};

/** Look up a single variant by `(calc, variant)` pair. Returns undefined if either is unknown. */
export function getVariant(calc: string, variant: string): Variant | undefined {
  return VARIANTS[calc]?.[variant];
}

/** All variants for a parent calculator (empty array if the calc has none). */
export function listVariants(calc: string): Variant[] {
  const map = VARIANTS[calc];
  return map ? Object.values(map) : [];
}

/** Flat `{calculator, variant}` list for Next.js `generateStaticParams()`. */
export function allVariantParams(): Array<{ calculator: string; variant: string }> {
  const out: Array<{ calculator: string; variant: string }> = [];
  for (const [calc, map] of Object.entries(VARIANTS)) {
    for (const variant of Object.keys(map)) {
      out.push({ calculator: calc, variant });
    }
  }
  return out;
}
