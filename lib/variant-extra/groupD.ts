import type { VariantExtraMap } from "../variant-extra.types";

export const groupD: VariantExtraMap = {
  "markup-calculator/uk": {
    faqs: [
      {
        q: "Should I enter my cost VAT-inclusive or VAT-exclusive?",
        a: "Enter the VAT-exclusive cost. If you're VAT-registered, the 20% input VAT on your supplier's invoice is reclaimable, so it isn't a real cost to you — including it would inflate the cost base and understate your markup. Work in ex-VAT figures throughout, then add 20% VAT to the calculator's selling price separately to reach the shelf price your customer pays.",
      },
      {
        q: "Does this calculator add UK VAT to the selling price?",
        a: "No. It computes the ex-VAT selling price from cost and markup, plus the profit per unit and implied margin. The 20% VAT (or 5% reduced rate on qualifying goods) is added on top of that figure to get the till price. Keeping VAT separate is deliberate: markup and margin are gross-profit measures, and folding VAT into them would distort both.",
      },
      {
        q: "Why does the implied margin look lower than the markup I entered?",
        a: "Because markup is profit over cost while margin is profit over selling price, and the selling price is always the larger base. A 40% markup on a £100 cost gives a £140 sale and just a 28.6% margin. The calculator shows both side by side so a UK retailer quoting markup to a supplier and a margin to an accountant never confuses the two numbers.",
      },
      {
        q: "Which markup should I use for trade versus retail customers?",
        a: "It depends on sector convention. Builders' merchants typically run 25-40% on materials, independent fashion 200-300%, and plumbing or electrical parts anywhere from 30-100% depending on whether the customer or trade sources them. Enter your sector-typical figure, then check the implied margin the tool returns covers your overhead before committing to the price.",
      },
    ],
    workedExample: `**UK trade pricing example — ex-VAT throughout.**

A plumbing supplier buys a pump for £120 ex-VAT and applies a 45% trade markup in forward (Cost → Price) mode.

- **Selling price (ex-VAT):** 120 × (1 + 45/100) = **£174**.
- **Profit per unit:** 174 − 120 = **£54**.
- **Implied margin:** 54 ÷ 174 = **31%** — just inside the calculator's healthy (green) band.

The till price the customer pays adds 20% VAT: 174 × 1.20 = £208.80, but that VAT is collected for HMRC and never enters the markup or margin figures. Note the gap between the 45% markup entered and the 31% margin returned — quote the 45% to a supplier and the 31% to your accountant, and read both from the comparison panel so the two are never mixed up.`,
  },

  "markup-calculator/retail": {
    faqs: [
      {
        q: "How do I work backwards from an MSRP to see my markup?",
        a: "Switch to reverse (Price → Markup) mode, enter your landed cost, and enter the MSRP as the selling price. The calculator returns the implied markup and margin at that price. This is how retail buyers sanity-check a brand's suggested price: a 40%-off-MSRP wholesale deal only works if the resulting markup clears your overhead and leaves a target margin.",
      },
      {
        q: "Is keystone pricing still a sensible retail default?",
        a: "Keystone — 100% markup, doubling cost — is a useful floor for boutique retail and a ceiling for big-box, but it's no longer a universal rule. Boutique apparel often runs 2.2-2.8x cost while mass apparel sits at 1.4-1.8x and electronics as low as 1.1-1.4x. Enter your category's typical multiple rather than defaulting to keystone, then read off the margin it actually produces.",
      },
      {
        q: "Should I include freight and duty in the cost field?",
        a: "Yes. Use your landed cost — supplier price plus inbound freight and any import duty — not the bare invoice. Markup applied to an understated cost produces a selling price that looks profitable but isn't once logistics are paid. The calculator's profit-per-unit output is only trustworthy when the cost you feed it reflects everything you spent to get the item on the shelf.",
      },
      {
        q: "Why does a high markup not guarantee a high real margin?",
        a: "Because real gross margin depends on sell-through, not list pricing. A 2.5x markup on apparel that only clears 65% at full price nets roughly the same as a 1.6x markup clearing 100%, once markdowns are counted. The calculator prices a single unit at full price; before trusting the margin, discount it for the share of stock you expect to sell at a reduction.",
      },
    ],
    workedExample: `**Retail buyer example — checking a wholesale offer.**

A buyer is offered a homeware item at $24 landed cost and wants to hit a keystone-plus price. In forward mode she enters $24 cost and a 150% markup.

- **Selling price:** 24 × (1 + 150/100) = **$60** (a 2.5x multiple).
- **Profit per unit:** 60 − 24 = **$36**.
- **Implied margin:** 36 ÷ 60 = **60%** — well inside the healthy band.

To pressure-test it she flips to reverse mode and enters the $48 price a competitor advertises: the tool returns a 100% markup and a 50% margin at her cost. The takeaway is that matching the competitor still leaves a strong 50% margin, so she has room to discount for sell-through. Real margin will land below 60% once some stock clears on markdown, so she treats 60% as a full-price ceiling, not the blended result.`,
  },

  "break-even-calculator/uk": {
    faqs: [
      {
        q: "Should the selling price I enter include VAT?",
        a: "No — use the ex-VAT price. The 20% VAT you charge is collected for HMRC and isn't your revenue, so feeding a VAT-inclusive price into the calculator overstates contribution margin and understates the break-even point. Enter the price net of VAT and the variable cost net of any reclaimable input VAT, so both sides of the contribution calculation are on the same basis.",
      },
      {
        q: "Where does employer National Insurance go in the inputs?",
        a: "Into Fixed Costs, alongside salaries. Employer NI runs 15% on pay above the £5,000 secondary threshold, so every £100 of salary above it adds £15 of fixed cost the calculator must cover before you break even. It's easy to forget on the salary line, which is why owners routinely understate fixed costs and quote a break-even point that's too optimistic.",
      },
      {
        q: "How do I use the target profit field for a UK business?",
        a: "Break-even alone leaves no buffer, so enter a target profit and the calculator returns the units needed to clear costs plus that goal. A sensible UK target is break-even plus 20-30% to fund a slow month, growth, and unexpected costs. The 'units for target profit' output tells you the real sales level the business you want actually requires, not just the survival minimum.",
      },
      {
        q: "Which monthly costs count as fixed for a UK SME?",
        a: "Rent, business rates (net of small business rate relief), salaries with employer NI, the 3% minimum employer pension, insurance, professional fees, and recurring software. Most owners underestimate this bucket because admin time and tools that 'don't really count' still appear in year-end accounts. Be brutal in the fixed-cost field — understating it is the most common reason a break-even figure proves too low in practice.",
      },
    ],
    workedExample: `**UK SME example — monthly figures, ex-VAT.**

A small UK manufacturer has £12,000 monthly fixed costs (rent, salaries including 15% employer NI, software, insurance). Each unit sells at £40 ex-VAT with £16 of variable cost (materials, packaging, processing).

- **Contribution margin per unit:** 40 − 16 = **£24**.
- **Break-even units:** 12,000 ÷ 24 = **500 units** per month.
- **Break-even revenue:** 500 × 40 = **£20,000**.

Hitting exactly 500 units only covers costs with no buffer, so the owner enters a £6,000 target profit (roughly break-even plus 25%). The calculator returns (12,000 + 6,000) ÷ 24 = 750 units. That gap — 500 to survive, 750 to fund the business properly — is the real planning number. If employer NI had been left off the fixed line, the figure would have looked deceptively lower.`,
  },

  "break-even-calculator/restaurants": {
    faqs: [
      {
        q: "How do I model a restaurant when the tool works in units, not covers?",
        a: "Treat one cover (one guest served) as one unit. Enter your average check as the selling price per unit and your per-cover variable cost — food, beverage, card processing, paper — as the variable cost. The calculator then returns break-even covers and the revenue they generate, which is the restaurant version of break-even units expressed per guest.",
      },
      {
        q: "What goes in fixed costs versus variable cost per cover?",
        a: "Fixed costs are monthly rent, utilities, insurance, salaried management, POS and reservation software, and loan or equipment-lease service. Variable cost per cover is everything that scales with each guest: food at 28-32% of check, beverage at 18-24%, card processing at 2-3%, plus paper and condiments. Peak-time server and line-cook labour is partly variable, so apportion it into the per-cover figure.",
      },
      {
        q: "How should I treat step-fixed labour like dishwashers and prep cooks?",
        a: "Roll it into monthly fixed costs, not the per-cover variable. Hosts, dishwashers, and prep cooks are scheduled to a shift regardless of how many covers arrive, so they behave as fixed cost for the month even though they feel labour-related. Putting step-fixed labour in the variable field would understate it on quiet shifts and distort the break-even cover count.",
      },
      {
        q: "What contribution margin per cover should I expect?",
        a: "With food at 28-32%, beverage at 18-24%, and variable labour and processing on top, contribution margin per cover usually lands between 30% and 45% of the average check. The implicit guardrail is the prime-cost rule — food plus labour at or below 60% of sales. If your contribution per cover falls outside that band, recheck which labour you've treated as variable versus fixed.",
      },
    ],
    workedExample: `**Restaurant example — one cover treated as one unit.**

A casual full-service spot has £24,000 monthly fixed costs (rent, utilities, salaried management, POS, step-fixed prep and dishwashing labour). Average check is £32 per cover. Per-cover variable cost runs £14.40 — food at about 30%, beverage, card processing, and paper.

- **Contribution margin per cover:** 32 − 14.40 = **£17.60** (a 55% contribution).
- **Break-even covers:** 24,000 ÷ 17.60 = 1,364 (rounded up) **covers per month**.
- **Break-even revenue:** 1,364 × 32 = **£43,648**.

Spread over a 26-day trading month that's roughly 53 covers a day to cover costs. To fund a £6,000 monthly profit the owner enters it as the target: (24,000 + 6,000) ÷ 17.60 = 1,705 covers. The jump from 1,364 to 1,705 covers shows how thin restaurant economics are once prime cost is honestly loaded into the inputs.`,
  },

  "cash-flow-calculator/uk": {
    faqs: [
      {
        q: "How do I enter quarterly VAT in a tool with monthly rows?",
        a: "Add the VAT payment to the Expenses cell of the single month it leaves your account — one calendar month and seven days after each quarter-end. Don't spread it across three months; UK VAT is a lumpy outflow, and smoothing it hides exactly the cash dip the forecast exists to reveal. The calculator then flags whether that month's running balance survives the hit.",
      },
      {
        q: "Should income go in the month I invoice or the month I'm paid?",
        a: "The month cash actually arrives. The projection tracks bank balance, not accruals, so a January invoice on net-30 terms belongs in the February income cell. Entering sales in the month they were made — the most common cash-flow mistake — makes the forecast look healthier than reality. Add a buffer too: 15-20% of invoices typically slip past their due date.",
      },
      {
        q: "Where do PAYE, Corporation Tax, and self-assessment payments go?",
        a: "All in the Expenses cell of the month each is due. PAYE/NI is monthly, payable by the 22nd of the following month electronically. Corporation Tax is due 9 months and 1 day after year-end. Sole-trader payments on account fall on 31 January and 31 July. Placing each in its correct month is what turns a flat forecast into one that exposes the real tax-driven dips.",
      },
      {
        q: "The forecast shows a negative month — what's the order of remedies?",
        a: "Work cheapest first. Tighten receivables (invoice day one, chase day seven, escalate day twenty-one), then extend payables, then pull sales forward, and only then arrange financing. The calculator highlights the lowest-balance month so you can act before it arrives — arranging an overdraft three months ahead is far cheaper than scrambling for emergency cash the week it bites.",
      },
    ],
    workedExample: `**UK SME example — spotting the VAT-quarter dip.**

A consultancy opens the year with £15,000 cash. Most months bring in £20,000 and spend £17,000 — a £3,000 monthly surplus. But in April a £12,000 quarterly VAT bill and the monthly PAYE both land, pushing that month's expenses to £30,000.

- **Typical month net:** 20,000 − 17,000 = **+£3,000**.
- **April net:** 20,000 − 30,000 = **−£10,000**.
- Running balance before April climbs from £15,000 toward £24,000; April then drops it to about **£14,000**.

The annual net cash flow stays clearly positive, yet the tool's lowest-balance flag pinpoints April as the squeeze. Because cash never turns negative here, no financing is needed — but had opening cash been £6,000, April would breach zero, and the owner would tighten receivables one quarter ahead rather than scramble in the VAT week.`,
  },
};
