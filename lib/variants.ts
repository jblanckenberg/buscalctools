import type { Variant, VariantMatrix } from "@/lib/variants.types";

/**
 * Variant matrix — 15 entries across 7 parent calculators.
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
