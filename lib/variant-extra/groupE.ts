import type { VariantExtraMap } from "../variant-extra.types";

export const groupE: VariantExtraMap = {
  "pricing-calculator/za": {
    faqs: [
      {
        q: "Does the calculator add 15% VAT on top of my price or strip it out?",
        a: "It adds VAT on top. Enter a VAT-exclusive cost, set your target margin or markup, and the tool returns the ex-VAT recommended price first, then a second line showing that price with 15% VAT added. Work in ex-VAT figures throughout, because that is the turnover SARS sees on your VAT201 and ITR14.",
      },
      {
        q: "Should I price zero-rated goods differently in this tool?",
        a: "Yes. For zero-rated supplies such as maize meal, brown bread, milk, eggs and fresh produce, set the VAT field to 0%. The ex-VAT recommended price then equals the shelf price, since no output VAT is added. You still register and file, but the customer pays no VAT on that line, so the inc-VAT figure matches the ex-VAT figure.",
      },
      {
        q: "Where do Yoco or PayFast processing fees fit into the result?",
        a: "The calculator does not model processor fees, so treat its profit-per-unit figure as pre-processing. After the till takes payment, subtract roughly 2.5 to 3.5% of the inc-VAT total to see banked cash. If processing matters to your margin, raise your target margin a few points so the recommended price absorbs the fee.",
      },
      {
        q: "How should I read the equivalent markup line for SA retail?",
        a: "Margin and markup describe the same sale from two angles. A 45% target margin shows as roughly 82% equivalent markup. That matters because SA trade conventions are usually quoted in markup terms: builders' merchants think 25 to 40% markup, fashion retail 150 to 250%. Use the equivalent line to sanity-check your price against how your sector actually talks.",
      },
    ],
    workedExample: `A Durban homeware retailer sources a ceramic dish at **R120 ex-VAT** and wants a **40% gross margin**. In margin mode the tool computes the ex-VAT price as R120 ÷ (1 − 0.40) = **R200.00**, with profit per unit of R200.00 − R120.00 = **R80.00**. Because the SA VAT field pre-fills at 15%, the second result line adds VAT on top: R200.00 × 1.15 = **R230.00** shelf price. The equivalent-markup line reads about **66.7%** (R80 profit ÷ R120 cost), which the retailer cross-checks against the typical fashion-and-homeware markup band. Rounding the R230 till price up to R239 for psychological pricing leaves a little extra headroom. Note the R80 profit is pre-processing; after a 3% card fee on R230 the banked margin tightens slightly.`,
  },

  "employee-cost-calculator/za": {
    faqs: [
      {
        q: "The tool has one employer-tax field — how do I enter UIF, SDL and COIDA together?",
        a: "Combine them into the single Employer Tax Rate percentage. The field pre-fills at 2% for South Africa, covering UIF (1%) plus SDL (1%). If your industry COIDA premium and any bargaining-council levy are material, add those percentage points into the same field, for example 3% or 4%, so the loading reflects your real statutory stack.",
      },
      {
        q: "Where do I put a 13th cheque or provident fund contribution?",
        a: "Use the Benefits field, which takes an annual rand figure rather than a percentage. Add the employer share of provident fund, a 50% medical-aid subsidy and a 13th cheque together into that one annual amount. The calculator then folds it into total cost-to-company and the cost-as-percentage-of-salary readout.",
      },
      {
        q: "Why is my SA cost-as-percentage-of-salary lower than the 125–145% guide?",
        a: "Because SA's statutory employer burden is light, roughly 2% versus 11% in the US. With only UIF and SDL on top of salary, a bare-bones SA hire can land near 105 to 110% of salary. The 125 to 145% band assumes generous voluntary benefits. Add provident fund, medical aid and a 13th cheque via the Benefits field to reach that range.",
      },
      {
        q: "How do I use the productive-hour cost for a billable SA role?",
        a: "The productive-hour figure divides total cost by about 1,700 hours rather than the full 2,080, accounting for leave, training and admin. For an agency or consultancy, treat that rand-per-hour number as your internal floor: any client rate below it loses money on that staffer before overhead and profit are even added.",
      },
    ],
    workedExample: `A Cape Town agency hires a designer at **R420,000 salary**. The SA employer-tax field pre-fills at **2%**, so employer tax is R420,000 × 0.02 = **R8,400**. Into Benefits they enter **R63,000** (provident fund plus medical-aid subsidy plus a 13th cheque), with Equipment **R18,000**, Training **R8,000** and Office space **R30,000**. Total annual cost = R420,000 + R8,400 + R63,000 + R18,000 + R8,000 + R30,000 = **R547,400**, which is **130.3%** of salary — squarely inside the 125–145% band once voluntary benefits are included. Dividing by 2,080 hours gives roughly **R263/hour**; dividing by ~1,700 productive hours gives about **R322/hour**. That R322 figure is the rate any billable project must clear before the agency earns a cent of margin.`,
  },

  "employee-cost-calculator/california": {
    faqs: [
      {
        q: "The calculator uses one employer-tax field — does that cover CA SUI, ETT and SDI?",
        a: "The field pre-fills at the US default of about 11%, covering FICA, FUTA and a typical SUTA. California's SUI, ETT and workers' comp sit a little above the national average, so raise the percentage a point or two if you want CA-specific accuracy. SDI is withheld from the employee rather than employer-paid, so leave it out of the rate.",
      },
      {
        q: "Where do California health insurance and 401(k) match go?",
        a: "Put both into the annual Benefits field as a single dollar figure. CA group health often runs $600 to $1,400 per employee per month, and a Safe Harbor 401(k) match adds 3 to 6% of salary. Sum the employer share of each across the year and enter that total; the tool rolls it into cost-to-company.",
      },
      {
        q: "Does the tool account for California daily overtime and break premiums?",
        a: "No. The calculator models fixed annual costs, not variable wage exposure. CA daily overtime (1.5x after 8 hours, 2x after 12) and missed-break premiums are real but situational. Treat the calculator's total as a baseline, then carry a separate contingency for overtime-heavy or shift-based roles where those premiums recur.",
      },
      {
        q: "Why is my CA total higher than a Texas hire at the same salary?",
        a: "At the same salary the statutory rate difference is modest, but California group health premiums and workers' comp tend to run higher, and those flow through your Benefits figure. The salary line is identical; the Benefits and tax-rate inputs are where the CA premium shows up in the total-cost and percentage-of-salary results.",
      },
    ],
    workedExample: `An SF startup hires an analyst at **$95,000 salary**. The employer-tax field pre-fills at **11%**, giving employer tax of $95,000 × 0.11 = **$10,450**. Benefits is set to **$16,800** (an 80% health-insurance subsidy plus a 4% 401(k) match), with Equipment **$3,500**, Training **$2,000** and Office space **$5,000**. Total annual cost = $95,000 + $10,450 + $16,800 + $3,500 + $2,000 + $5,000 = **$132,750**, or **139.7%** of salary — near the top of the 125–145% band, as expected for high-cost California. Dividing by 2,080 hours gives about **$63.82/hour**; by ~1,700 productive hours, roughly **$78.09/hour**. The team should expect any project this analyst owns to generate revenue well above that $78 productive-hour floor.`,
  },

  "invoice-calculator/za": {
    faqs: [
      {
        q: "In what order does the tool apply discount and 15% VAT?",
        a: "Discount first, then VAT, which is the SARS-correct sequence. The calculator subtracts the discount percentage from the line-item subtotal, then charges 15% VAT on that reduced base. Applying VAT before the discount would overstate the tax and create a remittance mismatch on your VAT201, so always discount the ex-VAT subtotal.",
      },
      {
        q: "Can I build a multi-line SARS tax invoice here?",
        a: "Yes, up to five line items, each with a description, quantity and unit rate. The tool sums them into a subtotal before discount and VAT. It produces the arithmetic for a compliant tax invoice, but you still add the section 20(4) fields manually, namely the words 'Tax Invoice', both VAT numbers and a serialised invoice number.",
      },
      {
        q: "How do I invoice a zero-rated or export supply?",
        a: "Set the VAT rate field to 0%. The tool then shows VAT of R0.00 and an invoice total equal to the discounted subtotal. For exports you must keep documentary proof of export on file, and for exempt supplies such as residential rental you do not register for VAT at all, so the 0% entry simply reflects no output VAT charged.",
      },
      {
        q: "Why does the abridged-versus-full invoice threshold matter for what I enter?",
        a: "Below R5,000 an abridged tax invoice may omit recipient details and the serialised number, but VAT must still appear separately, which this tool always shows. Above R5,000 the full section 20(4) field set applies. The calculator handles the money either way; the threshold only changes which descriptive fields you add to the printed document.",
      },
    ],
    workedExample: `A Johannesburg consultancy bills two lines: **40 hours of strategy work at R950** and **a R6,000 fixed research fee**. The subtotal is (40 × R950) + (1 × R6,000) = R38,000 + R6,000 = **R44,000.00**. The client has a **10% retainer discount**, so the tool subtracts R4,400.00 first, leaving a taxable base of **R39,600.00**. VAT at the pre-filled **15%** is R39,600.00 × 0.15 = **R5,940.00**, giving an invoice total of **R45,540.00**. The consultancy remits the R5,940 on its next bi-monthly VAT201 return, and the VAT-registered client reclaims the same R5,940 as input VAT, netting the engagement to R39,600 for both sides. Because the supply exceeds R5,000, the printed document needs the full section 20(4) field set and a sequential invoice number.`,
  },

  "ecommerce-profit-calculator/california": {
    faqs: [
      {
        q: "Does the calculator deduct California sales tax from my profit?",
        a: "No, and that is correct. For US regions the consumption-tax field pre-fills at 0%, because the 7.25–10.75% you collect from a CA buyer is a pass-through you remit to the CDTFA, not your money. Leave the field at 0 so net profit reflects price minus product cost, platform fee, shipping and ads, with sales tax handled separately.",
      },
      {
        q: "How should marketplace sellers set the platform fee for CA sales?",
        a: "Use the preset that matches your channel: Amazon FBA 15%, Etsy 6.5%, eBay 13%. Under California's AB 147, those marketplaces collect and remit CA sales tax for you, so you still leave the tax field at 0. Direct Shopify sellers pick the Shopify preset (2.9%) but carry the CDTFA collection obligation themselves outside this tool.",
      },
      {
        q: "Where do California fulfilment-cost premiums show up in the result?",
        a: "In the Shipping and, if you separate it, the Product Cost (landed) fields. In-state CA 3PLs in Stockton or Riverside can run 15 to 25% above Midwest rates, so enter your real per-order fulfilment figure rather than a national average. That single input is often what tips a CA order from workable to thin margin.",
      },
      {
        q: "Why does my net margin look thin even at a healthy gross margin?",
        a: "Because the tool stacks four variable costs the gross figure ignores: platform fee, shipping, ad spend and any VAT. A 38% gross margin can collapse toward break-even once a 15% platform fee, CA fulfilment and a realistic CAC are subtracted. Repeat-purchase revenue from order two onward is usually what turns a thin first-order number positive.",
      },
    ],
    workedExample: `An LA apparel seller on **Amazon FBA** lists at **$48.00** with a **$25.00** landed product cost. The platform-fee preset is **15%**, so the fee is $48.00 × 0.15 = **$7.20**. Shipping into the customer is **$6.00** and ad spend per sale is **$7.00**. The sales-tax field stays at the US default **0%**, because CA sales tax collected from the buyer is a pass-through to the CDTFA, not a cost. Total costs = $25.00 + $7.20 + $6.00 + $7.00 = **$45.20**, so net profit per unit = $48.00 − $45.20 = **$2.80**, a net margin of about **5.8%**. The calculator flags that as workable but with no cushion for returns. In apparel, where 20 to 30% of orders come back, the seller leans on repeat-purchase economics to make the unit compound.`,
  },

  "ecommerce-profit-calculator/texas": {
    faqs: [
      {
        q: "Should I enter Texas sales tax into the tax field?",
        a: "No. For US regions the field pre-fills at 0%, and that is right: the 6.25–8.25% you collect from a Texas buyer is remitted to the Comptroller, not retained. Keeping the field at 0 means net profit reflects only your real costs, while sales tax stays a pass-through line you reconcile on your TX sales-tax return.",
      },
      {
        q: "How do Texas fulfilment advantages change my inputs?",
        a: "Texas is a top-tier 3PL hub, so your Shipping figure is often 8 to 15% lower than a coast-only origin. Enter the genuinely lower per-order shipping and fulfilment cost you negotiate in Dallas or Houston; that smaller Shipping input is a big reason a TX order frequently nets more than the same order shipped from California.",
      },
      {
        q: "Does the calculator model Texas franchise tax?",
        a: "No. The tool is per-order, and franchise tax is an entity-level charge that only applies above the 2026 no-tax-due threshold of $2.47M in annualised revenue. Below that, a Texas business owes no franchise tax, so per-unit economics are unaffected. Model franchise tax separately once you cross that revenue line.",
      },
      {
        q: "Why does a Texas marketplace seller leave the tax field at zero too?",
        a: "Under HB 1525, Amazon, eBay, Etsy and Walmart collect and remit Texas sales tax on your third-party sales. So whether you sell via marketplace or DTC, the tax field stays at 0 in this tool; marketplace collection happens outside it. Pick the platform-fee preset that matches your channel and read net profit from there.",
      },
    ],
    workedExample: `A Houston seller on **Shopify** lists a supplement at **$55.00** with a **$26.40** landed product cost. Picking the **Shopify** preset sets the platform fee at **2.9%**, so the fee is $55.00 × 0.029 = **$1.60**. Texas-origin fulfilment keeps Shipping to **$5.00**, and ad spend per sale is **$10.00**. The sales-tax field stays at the US default **0%**, since the 8% the buyer pays is remitted to the Comptroller, not kept. Total costs = $26.40 + $1.60 + $5.00 + $10.00 = **$43.00**, giving net profit per unit of $55.00 − $43.00 = **$12.00**, a net margin near **21.8%** — a healthy figure the tool marks sustainable. The lower Shopify fee and cheaper TX fulfilment are what lift this above a comparable California order, and with revenue under $2.47M no franchise tax applies on the profit.`,
  },
};
