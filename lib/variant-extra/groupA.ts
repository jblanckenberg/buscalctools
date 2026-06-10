import type { VariantExtraMap } from "../variant-extra.types";

export const groupA: VariantExtraMap = {
  "profit-margin-calculator/uk": {
    faqs: [
      {
        q: "Should I enter VAT-inclusive or VAT-exclusive revenue?",
        a: "Enter VAT-exclusive revenue. The 20% VAT you charge is collected on HMRC's behalf, not income, so including it overstates your top line and inflates every margin. VAT-exclusive turnover is the figure that ties to your CT600 and the accounts filed at Companies House, so the calculator's gross, operating, and net margins line up with what you actually report.",
      },
      {
        q: "Which UK Corporation Tax rate should I put in the Tax Rate field?",
        a: "Use 19% if your profit is under £50,000 (small profits rate) and 25% above £250,000 (main rate). Between those thresholds your effective rate sits in the 19-25% band because of marginal relief, so estimate the blended figure rather than picking one extreme. The field is editable for exactly this reason — override the regional default to match your own effective rate.",
      },
      {
        q: "Does this calculator account for employer National Insurance?",
        a: "Not as a separate field. Employer NI (15% above the £5,000 secondary threshold) is part of your payroll cost, so fold it into Operating Expenses alongside salaries, rent, and software. Once it sits in OpEx it correctly pulls down your operating and net margin, which is where wage-related costs belong in the gross-to-net waterfall.",
      },
      {
        q: "My UK gross margin is under 30% — is that a problem?",
        a: "Not necessarily. Under 30% gross signals a high-volume model where price discipline and tight inventory turns are the strategic levers, not blanket cost-cutting. Trades and construction routinely run 4-8% net on thin gross. Compare your net margin to the HMRC sector benchmark for your industry rather than judging the gross figure in isolation.",
      },
    ],
    workedExample: `**UK retail example — VAT-exclusive figures.**

A Manchester homewares shop records £600,000 of VAT-exclusive revenue. Cost of goods sold (supplier invoices, import duty, freight, packaging) is £360,000. Operating expenses — rent, salaries including 15% employer NI, software, and marketing — come to £150,000. Corporation Tax is set at 25%.

- **Gross margin:** (600,000 − 360,000) ÷ 600,000 = **40%**, a healthy product-business figure.
- **Operating profit:** 240,000 − 150,000 = £90,000, an operating margin of **15%**.
- **Net profit after 25% CT:** 90,000 × 0.75 = £67,500, a net margin of **11.25%**.

That 11.25% net sits comfortably inside the HMRC small-company retail range. The gap between 40% gross and 11.25% net shows overhead and tax doing most of the damage — the lever here is OpEx control, not deeper COGS cuts.`,
  },

  "profit-margin-calculator/us": {
    faqs: [
      {
        q: "What tax rate should I enter for a US C-corp versus a pass-through?",
        a: "For a C-corp, enter your combined rate: the flat 21% federal rate plus your state rate, which ranges from 0% (Nevada, Texas, Florida) to 11.5% (New Jersey). For a pass-through (S-corp, LLC, partnership, sole prop), the entity itself pays no federal income tax, so net margin is conventionally calculated pre-personal-tax — many owners enter 0% or just their state rate.",
      },
      {
        q: "How do I handle state corporate tax in the single Tax Rate field?",
        a: "Blend federal and state into one effective rate and type that in. A C-corp with nexus in a 6% state enters roughly 27% (21% federal + 6% state); a Texas C-corp enters 21% since Texas levies a separate franchise tax rather than income tax. The field is editable precisely so your net margin reflects what actually hits retained earnings after both layers.",
      },
      {
        q: "Where do self-employment taxes go for a pass-through entity?",
        a: "This calculator stops at the entity level, so the 15.3% SE tax on the first $184,500 of SE income isn't a separate output. SE tax is a personal-return cost, not a company expense, so leave it out of COGS and OpEx. Use the pre-personal-tax net margin here, then model SE tax separately on your 1040.",
      },
      {
        q: "What net margin should a US business be aiming for?",
        a: "It varies by sector. Per IRS Statistics of Income and NYU Stern tables: software/SaaS runs 15-25%, professional services 10-20%, non-grocery retail just 2-5%, restaurants 3-9%, and construction 5-10%. Benchmark your net output against your own industry rather than a single universal target, because a great retail margin would be a poor SaaS one.",
      },
    ],
    workedExample: `**US C-corp example — combined federal and state tax.**

A Florida ecommerce C-corp reports $900,000 in revenue. COGS — landed product cost, inbound freight, and payment processing — totals $540,000. Operating expenses (salaries, ad spend, software, 3PL fulfilment) run $250,000. Because Florida has no corporate income tax, the Tax Rate field holds just the 21% federal rate.

- **Gross margin:** (900,000 − 540,000) ÷ 900,000 = **40%**.
- **Operating profit:** 360,000 − 250,000 = $110,000, an operating margin of about **12.2%**.
- **Net profit after 21% tax:** 110,000 × 0.79 = $86,900, a net margin of roughly **9.7%**.

That 9.7% net is solid for retail (the IRS benchmark is 2-5%) but only middling for a software business. A C-corp with nexus in New Jersey would enter ~32.5% combined and watch net margin fall by several points on the same revenue.`,
  },

  "profit-margin-calculator/restaurants": {
    faqs: [
      {
        q: "How do I model restaurant prime cost with a Revenue/COGS/OpEx tool?",
        a: "Put your food and beverage purchases in COGS, then put total labour — wages plus FICA, workers' comp, and benefits — in Operating Expenses. Prime cost is COGS plus that labour line; keep the two together under about 60% of revenue and the rest of the P&L usually works. The calculator won't label it 'prime cost', but the figures you need sit in those two inputs.",
      },
      {
        q: "Where do food cost and labour go in the inputs?",
        a: "Food and beverage cost is your COGS — aim for 28-32% of sales full-service, 25-30% QSR. Labour belongs in Operating Expenses alongside rent, utilities, and insurance, targeting 28-35% depending on service model. Keeping them in separate inputs lets the tool show gross margin (after food cost) stepping down to operating margin (after labour and occupancy).",
      },
      {
        q: "What net margin is realistic for a restaurant?",
        a: "Thin by design. The National Restaurant Association puts industry-wide net at 3-9% — full-service typically 3-5%, limited-service 6-9%. If your net output lands in that band you're running a normal restaurant, not a failing one. A net far above 9% usually means a line item is misclassified; far below 3% means prime cost has drifted over 65%.",
      },
      {
        q: "My occupancy costs feel high — where do they belong and what's the target?",
        a: "Rent, utilities, and insurance are Operating Expenses, not COGS. As a rule occupancy should sit at or below 10% of sales; above 12% the lease itself is the problem and no amount of menu tweaking fully fixes it. Lumping occupancy into OpEx lets you watch its drag on the operating margin the calculator reports.",
      },
    ],
    workedExample: `**Full-service restaurant example.**

A 60-seat bistro turns over $1,200,000 a year. COGS — all food and beverage purchases — is $384,000, a 32% food-and-drink cost. Operating expenses bundle labour (with FICA and benefits), rent, utilities, insurance, and marketing at $720,000. Tax is set aside here to focus on operations.

- **Gross margin:** (1,200,000 − 384,000) ÷ 1,200,000 = **68%** — typical for hospitality once only food cost is deducted.
- **Operating profit:** 816,000 − 720,000 = $96,000, an operating margin of **8%**.

Net margin lands near that 8% before tax, comfortably inside the NRA's 3-9% range and strong for full-service. Notice how the healthy-looking 68% gross collapses once labour and occupancy hit OpEx — proof that in restaurants the bottom line is won or lost on prime cost, not on the headline food margin.`,
  },

  "profit-margin-calculator/za": {
    faqs: [
      {
        q: "Should South African revenue be entered VAT-inclusive or VAT-exclusive?",
        a: "Enter VAT-exclusive revenue. The 15% VAT you charge is collected for SARS, not income, so including it inflates your margins. VAT-exclusive turnover is the figure SARS expects on the ITR14 corporate return and the IT14SD reconciliation, so the calculator's outputs match what you actually file.",
      },
      {
        q: "What Corporate Income Tax rate should I use for a South African company?",
        a: "Use 27%, the standard CIT rate that applied after the 2022 reduction from 28%. It's pre-filled when you select South Africa, but the field stays editable in case you qualify for a different regime such as the Small Business Corporation graduated rates. Entering your true effective rate keeps the net margin output aligned with your retained-profit reality.",
      },
      {
        q: "Where do UIF and SDL fit in the inputs?",
        a: "They're payroll costs, so fold them into Operating Expenses with salaries and rent. The SA employer stack is unusually light — about 2% (1% UIF, capped, plus 1% SDL above the R500,000 payroll threshold) versus 15% UK employer NI — so it drags your operating margin far less than in the UK or US. Add it to OpEx, not COGS.",
      },
      {
        q: "How should I treat rand volatility on imported COGS?",
        a: "Enter your actual landed cost for the period in COGS, including import duty under the SACU tariff and freight from Cape Town or Durban ports. Because the rand can move 8-15% against the dollar in a quarter, rerun the calculator at a weaker and stronger exchange rate to see how far your gross margin swings, then price in a buffer for the downside case.",
      },
    ],
    workedExample: `**South African retail example — ZAR, VAT-exclusive.**

A Johannesburg retailer turns over R6,000,000 ex-VAT. COGS — imported stock, SACU import duty, port freight, and PayFast processing at roughly 3% — is R3,600,000. Operating expenses (rent, payroll including the light ~2% UIF+SDL stack, software, marketing) total R1,500,000. CIT is set at the 27% standard rate.

- **Gross margin:** (6,000,000 − 3,600,000) ÷ 6,000,000 = **40%**.
- **Operating profit:** 2,400,000 − 1,500,000 = R900,000, an operating margin of **15%**.
- **Net profit after 27% CIT:** 900,000 × 0.73 = R657,000, a net margin of **10.95%**.

That ~11% net sits near the upper end of the SA retail range. The light employer payroll stack helps the operating margin hold up — but if the rand weakens and landed COGS climbs 10%, that 40% gross would slip below 35% and squeeze the whole waterfall.`,
  },

  "profit-margin-calculator/ecommerce": {
    faqs: [
      {
        q: "How do I capture platform fees, shipping, and ad spend in just three cost inputs?",
        a: "Put per-order variable costs — landed COGS, payment processing (Stripe 2.9%+$0.30), fulfilment, and shipping — into the COGS field. Put period costs like ad spend, your software stack, and salaries into Operating Expenses. That split lets gross margin approximate per-order contribution and net margin show the fully-loaded result, which is the distinction that decides profitability.",
      },
      {
        q: "Does customer acquisition cost go in COGS or Operating Expenses?",
        a: "Total ad spend belongs in Operating Expenses, because it's a period cost spread across the whole catalogue rather than a per-unit input. If you want a true per-order contribution view, you can instead load the per-order CAC (ad spend ÷ new customers) into COGS. Pick one approach and stay consistent so your margins don't double-count acquisition.",
      },
      {
        q: "What net margin should an ecommerce store expect?",
        a: "Physical-product sellers typically run 5-15% net and digital 8-20%. By category (Shopify and McKinsey data): beauty 10-15%, apparel 5-12%, electronics 3-8%, home goods 8-14%, supplements 12-20%. Returns drag heavily in some categories — apparel returns of 20-30% can erase a thin margin — so benchmark against your specific niche, not the blended average.",
      },
      {
        q: "Why does my gross margin look fine but my net margin disappear?",
        a: "Because ad spend, software, and returns live below the gross line. A product with healthy 50% gross can still net near zero once a low ROAS, a 3-7%-of-revenue software stack, and 20%+ apparel returns hit Operating Expenses. Load those into OpEx and the calculator will show exactly where the contribution margin leaks away before reaching the bottom line.",
      },
    ],
    workedExample: `**DTC ecommerce example — per-order vs fully-loaded.**

A supplements brand does $750,000 in revenue. COGS captures per-order variable costs — landed product, payment processing at 2.9%+$0.30, and 3PL fulfilment — at $300,000. Operating expenses hold ad spend, the Shopify/Klaviyo software stack, salaries, and refunds at $375,000. Tax is left out to focus on unit economics.

- **Gross margin:** (750,000 − 300,000) ÷ 750,000 = **60%**, a strong per-order contribution.
- **Operating profit:** 450,000 − 375,000 = $75,000, an operating margin of **10%**.

That 10% sits at the low end of the 12-20% supplements benchmark, and the story is in the OpEx line: a 60% contribution margin is healthy, but ad spend and software are eating most of it. The lever here isn't deeper COGS cuts — it's lifting repeat-purchase rate so acquisition cost amortises across more orders.`,
  },
};
