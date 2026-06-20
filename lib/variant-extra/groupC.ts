import type { VariantExtraMap } from "../variant-extra.types";

export const groupC: VariantExtraMap = {
  "business-loan-calculator/uk": {
    faqs: [
      {
        q: "Why is my UK loan's total interest higher than a headline rate suggests?",
        a: "The calculator amortises a single APR over your term, so the total-interest figure already reflects compounding across every month — not a flat add-on. Headline rates from high-street banks often exclude arrangement and broker fees. Re-run the tool with the APR rather than the nominal rate to see the true sterling cost of the borrowing.",
      },
      {
        q: "How do I model a government-backed Growth Guarantee Scheme loan here?",
        a: "Enter the amount, the lender's quoted APR (typically lower than unsecured commercial pricing), and the term in years. The 70% government guarantee changes the lender's risk, not your repayment maths, so the monthly payment the calculator returns is exactly what you would pay. The guarantee does not reduce your personal liability for the full debt.",
      },
      {
        q: "Does this calculator handle invoice finance or factoring costs?",
        a: "No — it amortises a fixed-rate term loan with one APR and a set term. Invoice finance is priced as a service fee (a percentage of invoice value plus a discount margin), not an amortising APR, so it sits outside this tool. Use the monthly payment output only for term-loan, asset-finance, or government-scheme structures that repay on a fixed schedule.",
      },
      {
        q: "How should I read the 'total interest as % of original loan' figure?",
        a: "That percentage is total interest divided by principal, shown beside the result. On longer sterling terms it climbs steeply: the same loan over ten years can pay roughly double the interest of a five-year term. Treat it as a quick sense-check on whether stretching the term to lower the monthly payment is worth the extra lifetime cost.",
      },
    ],
    workedExample: `**UK term loan worked example.** A Manchester wholesaler borrows £80,000 over 5 years at 11% APR (unsecured, base + a typical SME margin). Enter Loan Amount £80,000, Annual Interest Rate 11%, and Term 5 years. The calculator converts to a monthly rate of 0.11 ÷ 12 = 0.009167 and n = 60 months, then applies M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. The Monthly Payment returns about £1,739. Total Loan Cost is roughly £104,360, of which the Total Interest figure is about £24,360 — shown as ~30.5% of the original loan. If the wholesaler's monthly EBITDA is £9,000, the £1,739 payment is about 19% of profit, inside the comfortable affordability range.`,
  },
  "business-loan-calculator/us": {
    faqs: [
      {
        q: "The intro mentions origination and SBA guarantee fees — does the calculator add them?",
        a: "No. The tool amortises one APR over the term and returns monthly payment, total interest, and total cost. Fees are not a separate input. To model true cost, add any origination or guarantee fee to the principal before entering it, then read the higher monthly payment. The output is the loan's repayment maths, not an all-in fee-loaded APR.",
      },
      {
        q: "How do I compare a 10-year SBA term against a 5-year conventional loan?",
        a: "Run the calculator twice with the same principal, changing only rate and term. Compare the two monthly payments and the two total-interest figures side by side. The shorter conventional term usually shows a higher monthly payment but markedly lower total interest, while the SBA term lowers the monthly burden at the cost of more lifetime interest.",
      },
      {
        q: "Can this model a revolving business line of credit?",
        a: "Not accurately. A line of credit charges interest only on the drawn balance and is often interest-only during the draw period, whereas this calculator assumes a fully-amortising fixed loan with level payments. Use it for SBA-7(a), 504, and conventional term loans. For a line of credit, treat the output as an upper-bound repayment if you drew and amortised the full limit.",
      },
      {
        q: "Why does the personal-guarantee point matter if the payment looks affordable?",
        a: "The monthly payment is the only number the calculator shows, but most US SBA and conventional loans require a personal guarantee from owners holding 20% or more equity. That means the debt is effectively secured against personal assets. A comfortable payment on paper still carries personal-balance-sheet exposure the calculator cannot display.",
      },
    ],
    workedExample: `**US conventional term loan worked example.** A Texas distributor borrows $150,000 over 7 years at 9% APR to fund inventory and a vehicle. Enter Loan Amount $150,000, Annual Interest Rate 9%, Term 7 years. The calculator sets r = 0.09 ÷ 12 = 0.0075 and n = 84, then applies M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], returning a Monthly Payment of about $2,414. Total Loan Cost is roughly $202,750, with the Total Interest figure near $52,750 — about 35% of the original loan. If the lender also charges a 3% origination fee ($4,500), fold that into the principal and re-run with $154,500 to see the fee-adjusted monthly payment of roughly $2,486.`,
  },
  "business-loan-calculator/sba": {
    faqs: [
      {
        q: "Which SBA rate do I type into the single rate field?",
        a: "Enter the all-in APR your lender quotes, not the Prime base. SBA-7(a) variable pricing is Prime plus a tiered spread, so with Prime near 7.75% a +2.75% deal is 10.5%. The calculator needs that combined figure. It has one rate input and amortises it over your term — it does not look up Prime or apply SBA rate caps for you.",
      },
      {
        q: "Does the calculator apply the SBA guarantee-fee tiers automatically?",
        a: "No. Guarantee fees are charged on the guaranteed portion and vary by loan size and current waiver windows, none of which the tool tracks. The monthly payment reflects principal, rate, and term only. If a guarantee fee applies to your tranche, add it to the principal before entering, then read the adjusted monthly payment and total cost.",
      },
      {
        q: "Can I use this for a 25-year SBA-504 real-estate amortisation?",
        a: "Yes. Set the term to 25 years and enter the blended or specific tranche APR you are modelling. Remember 504 is a three-part structure — bank first mortgage, CDC/SBA debenture, and borrower equity — so for the most accurate picture, run each financed tranche separately and sum the monthly payments the calculator returns.",
      },
      {
        q: "Why is so much of my early SBA payment interest in the amortisation table?",
        a: "On a long 7(a) or 504 term, the opening balance is large, so the first payments are mostly interest with little principal reduction. The amortisation schedule shows this shift month by month. It is normal and is why total interest on a 10- or 25-year SBA loan can approach or exceed half the original principal.",
      },
    ],
    workedExample: `**SBA-7(a) worked example.** A food manufacturer borrows $300,000 over 10 years at Prime + 2.75%. With Prime at 7.75%, the all-in APR is 10.5% — enter Loan Amount $300,000, Annual Interest Rate 10.5%, Term 10 years. The calculator sets r = 0.105 ÷ 12 = 0.00875 and n = 120, then applies M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], returning a Monthly Payment of about $4,048. Total Loan Cost is roughly $485,765, with the Total Interest figure near $185,765 — about 62% of the original principal. Expanding the amortisation schedule shows month 1 interest of about $2,625, with principal reduction starting small and accelerating over the term.`,
  },
  "business-loan-calculator/equipment-finance": {
    faqs: [
      {
        q: "Does this calculator apply Section 179 or bonus depreciation to the result?",
        a: "No. It amortises a fixed-rate equipment loan and returns monthly payment, total interest, and total cost — pre-tax. Section 179 expensing and bonus depreciation are deductions you apply separately. To estimate after-tax cost, take the total cost the calculator shows and subtract your year-one tax saving (deduction × marginal rate) outside the tool.",
      },
      {
        q: "Can I compare an equipment loan against an operating lease here?",
        a: "Only partly. The calculator models the loan side accurately — enter amount, APR, and a term matched to the equipment's useful life. An operating lease has no amortising principal and a different tax treatment (the full payment is deductible), so model the lease as a flat monthly figure separately, then compare total cash outlay against the loan's total cost.",
      },
      {
        q: "What loan term should I enter for financed equipment?",
        a: "Match the term to the asset's useful life. Construction and manufacturing kit is often financed over 5–7 years (or longer for machine tools), trucking tractors over 3–5 years, and IT hardware over 2–4 years. A term that outlasts the equipment risks paying for an asset you have already replaced — the calculator's total-interest figure rises sharply as the term lengthens.",
      },
      {
        q: "Why isn't residual or balloon value reflected in my monthly payment?",
        a: "The calculator fully amortises the principal to zero over the term, with no residual or balloon adjustment. Capital-lease buyouts and fleet balloon structures leave a lump sum at term end that this tool does not model. If your finance has a balloon, the true monthly payment will be lower than the calculator shows, with the balloon due separately at maturity.",
      },
    ],
    workedExample: `**Equipment loan worked example.** A landscaping firm finances an $80,000 truck over 5 years at 8% APR. Enter Loan Amount $80,000, Annual Interest Rate 8%, Term 5 years. The calculator sets r = 0.08 ÷ 12 = 0.006667 and n = 60, then applies M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], returning a Monthly Payment of about $1,622. Total Loan Cost is roughly $97,327, with the Total Interest figure near $17,327 — about 22% of principal. The calculator stops there. To get after-tax cost, apply Section 179 separately: expensing the full $80,000 at a 35% marginal rate saves about $28,000 in year one, bringing the effective cost to roughly $69,327.`,
  },
  "business-loan-calculator/za": {
    faqs: [
      {
        q: "Do I enter prime or the full rate into the calculator?",
        a: "Enter the full APR. With SARB-driven prime near 11.75%, an unsecured big-five loan at prime + 6% is 17.75% — that combined figure goes in the rate field. The calculator has one rate input and amortises it in rand over your term. It does not track the SARB repo decision or add the prime margin for you.",
      },
      {
        q: "Can I use this to compare a big-five bank loan against SEFA pricing?",
        a: "Yes. Run the calculator twice with the same principal and term, changing only the rate — for example 17.75% (prime + 6%) versus roughly 13.75% (prime + 2%) for SEFA-qualifying borrowers. Compare the two monthly payments and total-interest figures. On a 5-year R1m loan the SEFA rate can save well over R100,000 in total interest if you qualify.",
      },
      {
        q: "Does the calculator include initiation fees or monthly service fees?",
        a: "No. Big-five banks typically charge an initiation fee plus a small monthly service fee, and these are not inputs here. The tool returns principal, interest, and total cost on the rate you enter. To approximate the true cost, add the initiation fee to the principal and treat the monthly service fee as a separate line on top of the calculated payment.",
      },
      {
        q: "How does the personal-surety reality affect how I read the result?",
        a: "For unsecured SME loans below R10 million, personal surety from the owner (and often a spouse married in community of property) is near-universal, frequently unlimited. The monthly payment the calculator shows is the public number; the surety means you are personally liable for the full debt even if business assets are liquidated. Read the payment alongside that exposure.",
      },
    ],
    workedExample: `**South African term loan worked example.** A Johannesburg manufacturer borrows R1,000,000 unsecured over 5 years from a big-five bank at prime + 6%. With prime at 11.75%, the APR is 17.75% — enter Loan Amount R1,000,000, Annual Interest Rate 17.75%, Term 5 years. The calculator sets r = 0.1775 ÷ 12 = 0.014792 and n = 60, then applies M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], returning a Monthly Payment of about R25,258. Total Loan Cost is roughly R1,515,457, with the Total Interest figure near R515,457 — about 52% of the original principal. Re-running at 13.75% (SEFA-style prime + 2%) drops the payment to roughly R23,159 and total interest to about R389,541.`,
  },
  "roi-calculator/marketing": {
    faqs: [
      {
        q: "The intro lists ROAS, MER, CAC and LTV:CAC — does the calculator output all four?",
        a: "No. This tool computes ROI, net profit, and annualised ROI from three inputs: investment, net return, and an optional period in months. ROAS, MER, CAC and LTV:CAC are separate ratios with their own inputs. Use this calculator for the profit-based ROI on a specific campaign, then derive those channel ratios with their own figures.",
      },
      {
        q: "Should I enter gross revenue or net contribution as the Net Return?",
        a: "Enter net return — revenue minus the costs of fulfilling it (COGS, fees, refunds) — not gross revenue. The most common marketing-ROI error is treating gross revenue as the return: a campaign showing 400% on revenue can be negative once COGS is removed. The calculator divides net profit by spend, so feeding it gross revenue inflates the ROI it reports.",
      },
      {
        q: "What does the annualised ROI tell me for a short campaign?",
        a: "If you enter the period in months, the calculator annualises using (1 + ROI)^(12 ÷ months) − 1. A high return earned in three months annualises to a very large yearly-equivalent rate, which is useful for comparing campaigns of different lengths on an equal footing — but treat extreme annualised figures cautiously, since short-run results rarely sustain across a full year.",
      },
      {
        q: "How do I read the color-coded ROI tier?",
        a: "The result is tiered green at 20% or above, amber from 0 to 19%, and red below zero. Green signals a strong return worth scaling; amber is positive but modest, so compare it against your next-best use of the cash; red means the spend lost money. The tier reflects total ROI on net return, not ROAS or attribution quality.",
      },
    ],
    workedExample: `**Marketing ROI worked example.** A DTC brand spends $8,000 on a paid-social campaign over 3 months and attributes $26,000 in revenue, with $11,000 of COGS and fees on that revenue. The correct Net Return is $26,000 − $11,000 = $15,000, not the gross $26,000. Enter Initial Investment $8,000, Net Return $15,000, Investment Period 3 months. The calculator computes net profit $7,000 and ROI = 7,000 ÷ 8,000 × 100 = 87.5%, tiered green. With months filled, it annualises: (1 + 0.875)^(12 ÷ 3) − 1 ≈ 1137%. Feeding gross $26,000 instead would have shown a misleading 225% ROI on the same spend.`,
  },
};
