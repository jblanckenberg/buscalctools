import type { VariantExtraMap } from "../variant-extra.types";

export const groupB: VariantExtraMap = {
  "freelance-rate-calculator/uk": {
    faqs: [
      {
        q: "Why should UK freelancers inflate the income target before entering it?",
        a: "The calculator builds your rate from the income figure you supply, but it does not deduct tax. Because a UK sole trader owes income tax plus Class 4 NI on profits, enter a target that already includes a 20–30% buffer. Otherwise the recommended rate funds your desired take-home only before HMRC takes its share.",
      },
      {
        q: "Where do accountant and insurance costs go in this calculator?",
        a: "Put them in the Annual Overhead field. For a UK freelancer that typically means accountant fees (£60–150/month), professional indemnity and public liability cover (£20–80/month), software and a workspace allowance. Overhead is added to your income target before dividing by billable hours, so understating it quietly underprices every invoice.",
      },
      {
        q: "How should a UK contractor set the Weeks Off input?",
        a: "Treat the statutory 28-day holiday equivalent plus a sick-day allowance as unbillable time. Six weeks off is a realistic default; it removes those weeks from your billable-hours total before the rate is calculated, so your effective rate still covers holidays you would otherwise take unpaid.",
      },
      {
        q: "Does the calculator handle IR35 or limited-company structures?",
        a: "No. It outputs an hourly floor and recommended rate from your inputs regardless of trading structure. Whether you operate as a sole trader or inside/outside IR35 through a limited company changes your effective tax, not the gross rate maths — so adjust the income-target buffer to reflect your own deductions.",
      },
    ],
    workedExample: `A London developer wants £55,000 in their pocket but knows HMRC takes a slice, so they enter a tax-buffered **Desired Annual Income of £70,000**. They add **£7,000 Annual Overhead** (accountant, PI/PL insurance, software, broadband). They bill realistically: **25 hours/week** with **6 Weeks Off**, giving (52 − 6) × 25 = **1,150 billable hours/year**.

Minimum rate = (£70,000 + £7,000) ÷ 1,150 = **£66.96/hour** — the floor below which the business loses money. Applying a **15% Desired Profit Margin** lifts the recommended rate to **£77.00/hour**, with a **day rate of £616** for clients who quote per day. The 15% buffer is what absorbs a slow month or a late-paying client without derailing the £70k target.`,
  },

  "freelance-rate-calculator/us": {
    faqs: [
      {
        q: "Does this calculator work out US self-employment tax for me?",
        a: "No. It shows a tax-buffer reminder but does not compute SE tax, federal, or state income tax. Because a 1099 freelancer pays both halves of FICA (15.3%) plus income tax, enter an income target that already adds roughly 25–30%, so the recommended rate clears those obligations.",
      },
      {
        q: "What belongs in the Annual Overhead field for a US freelancer?",
        a: "Costs employees usually get for free: health insurance premiums, business software, professional development, a home-office or coworking allowance, and liability cover. These are added to your income target before the rate is computed, so leaving health insurance out is one of the most common ways US freelancers underprice.",
      },
      {
        q: "How many billable hours should a US freelancer assume?",
        a: "Enter the hours you can actually invoice, not the hours you work. Selling, admin, and unpaid calls mean most full-time US freelancers bill 20–30 hours/week. Combined with your Weeks Off, that lands near 1,000–1,400 billable hours/year — the divisor that turns your income target into an hourly rate.",
      },
      {
        q: "Can I use the day-rate output for contract quoting?",
        a: "Yes. The day rate is simply the recommended hourly rate multiplied by eight, which matches how many US procurement teams and staffing agencies prefer to be quoted. Use it as a starting anchor; for multi-week engagements you may discount slightly in exchange for guaranteed booked time.",
      },
    ],
    workedExample: `A US consultant targets **$95,000 take-home**, but since the tool does not deduct tax, they buffer for SE tax and federal/state tax and enter a **Desired Annual Income of $125,000**. Overhead — health insurance, software, coworking — comes to **$12,000/year**. They bill **28 hours/week** with **5 Weeks Off**: (52 − 5) × 28 = **1,316 billable hours/year**.

Minimum rate = ($125,000 + $12,000) ÷ 1,316 = **$104.10/hour**, the floor that merely breaks even. A **20% Desired Profit Margin** raises the recommended rate to **$124.92/hour**, giving a **day rate of $999**. That 20% buffer cushions gaps between contracts and the lumpy nature of quarterly estimated-tax payments, so a thin month does not eat into the $95k goal.`,
  },

  "freelance-rate-calculator/za": {
    faqs: [
      {
        q: "Does the calculator account for SARS provisional tax?",
        a: "No — it builds a rate from your inputs without deducting tax. Since SA sole proprietors settle income tax through two provisional instalments a year, enter an income target inflated by roughly 25–35%. The recommended rate then covers the tax you will hand to SARS rather than leaving you short at filing.",
      },
      {
        q: "How do I handle VAT when setting my rate here?",
        a: "The calculator produces an ex-VAT rate. If your turnover crosses the R1 million registration threshold you must add 15% output VAT on top of the rate it gives you, charging clients the VAT-inclusive figure and remitting the VAT bi-monthly. The calculator does not toggle VAT, so layer it on manually after reading the recommended rate.",
      },
      {
        q: "What overhead should a South African freelancer enter?",
        a: "Medical scheme contributions, a retirement annuity, accountant fees (R1,200–3,500/month), liability cover, software, and load-shedding resilience like an inverter or UPS. Enter the annual total in the Overhead field; it is added to your income target before dividing by billable hours, so it is recovered across every invoice.",
      },
      {
        q: "Why budget extra Weeks Off in South Africa?",
        a: "Beyond holidays and sick days, load-shedding and long invoice-payment terms (often 60–75 days) erode billable capacity. Setting a realistic Weeks Off figure removes that unbillable time from the calculation, so the rate it returns still supports your income target across a genuinely productive year.",
      },
    ],
    workedExample: `A Johannesburg consultant wants **R500,000 take-home**. Because the tool does not deduct tax, they buffer for SARS provisional tax and enter a **Desired Annual Income of R650,000**. Overhead — medical aid, RA, accountant, UPS amortisation — is **R72,000/year**. They bill **25 hours/week** with **6 Weeks Off**: (52 − 6) × 25 = **1,150 billable hours/year**.

Minimum rate = (R650,000 + R72,000) ÷ 1,150 = **R627.83/hour**, the break-even floor. A **15% Desired Profit Margin** lifts the recommended rate to **R721.96/hour**, with a **day rate of R5,776**. If VAT-registered, add 15% on top, quoting roughly R830/hour incl-VAT. The 15% buffer absorbs the cash-flow drag of 60-day payment terms common in the SA market.`,
  },

  "freelance-rate-calculator/new-york": {
    faqs: [
      {
        q: "Does this calculator stack NY State and NYC taxes for me?",
        a: "No. It builds a rate from your inputs and shows only a general tax-buffer reminder. Because a Manhattan freelancer faces federal SE tax, federal income tax, NY State tax, and NYC resident tax, inflate your income target heavily — often by 30% or more — so the recommended rate survives that combined burden.",
      },
      {
        q: "How do high NYC overheads fit into the calculator?",
        a: "Enter them in the Annual Overhead field: NYC coworking or office space ($400–900/month for a desk), health insurance, and software. Manhattan's overhead is materially higher than most US markets, and because overhead is added to your income target before the rate is computed, capturing it accurately keeps you from underpricing.",
      },
      {
        q: "What billable-hours figure suits a New York consultant?",
        a: "Enter only invoiceable hours. NY client work carries heavy meeting and business-development load, so many full-time consultants bill closer to 1,100–1,200 hours/year. Set your weekly hours and Weeks Off to reflect that, since a smaller billable-hours divisor raises the rate needed to hit your target.",
      },
      {
        q: "Can I derive a weekly retainer from these outputs?",
        a: "The calculator outputs hourly and day rates only, not retainers. To approximate a weekly retainer, multiply the day rate by your committed days per week. The tool gives you the per-unit floor and recommended figures; packaging them into a retainer is a manual pricing step on top.",
      },
    ],
    workedExample: `A Brooklyn-based UX consultant wants **$130,000 take-home**. New York's federal-plus-state-plus-city burden is steep, so they buffer hard and enter a **Desired Annual Income of $185,000**. Overhead — Manhattan coworking, health insurance, software — is **$18,000/year**. They bill **26 hours/week** with **6 Weeks Off**: (52 − 6) × 26 = **1,196 billable hours/year**.

Minimum rate = ($185,000 + $18,000) ÷ 1,196 = **$169.73/hour**, the floor. A **20% Desired Profit Margin** lifts the recommended rate to **$203.68/hour**, giving a **day rate of $1,629**. Committing three days a week to one client implies a roughly **$4,900 weekly retainer**. The 20% buffer cushions the gap between quarterly estimated payments to the IRS, NY State, and NYC.`,
  },

  "freelance-rate-calculator/texas": {
    faqs: [
      {
        q: "Does no state income tax mean a lower target in this calculator?",
        a: "Effectively, yes. Texas levies no personal income tax, so your tax buffer covers only federal SE tax and federal income tax — roughly 22–30% rather than the 30%+ in NY or CA. Enter a smaller inflated income target than a coastal freelancer would, and the recommended rate comes out correspondingly lower for the same take-home.",
      },
      {
        q: "What overhead should a Texas freelancer enter?",
        a: "Health insurance (Texas has no state exchange, so off-subsidy premiums run $400–850/month), Austin or Dallas coworking, software, and liability cover. Enter the annual total in the Overhead field. It is added to your income target before the rate is calculated, so accurate overhead keeps your floor honest.",
      },
      {
        q: "Does the calculator handle Texas franchise tax?",
        a: "No, and for most sole proprietors that is fine — franchise tax applies to entities like LLCs and corporations above a multi-million-dollar revenue threshold, not to individual freelancers. The calculator outputs a personal rate; if you later wrap the business in an LLC, franchise tax is a separate, usually-zero, consideration at typical freelance volumes.",
      },
      {
        q: "How realistic are the high billable-hours assumptions for Texas?",
        a: "Enter only hours you can invoice. Even with lower living costs, Texas freelancers still lose time to selling and admin, so 1,200–1,300 billable hours/year is realistic for a busy contractor. Set weekly hours and Weeks Off to match; the billable-hours total is the divisor that converts your income target into an hourly rate.",
      },
    ],
    workedExample: `An Austin developer wants **$100,000 take-home**. With no Texas state income tax, only federal SE and income tax apply, so they buffer to a **Desired Annual Income of $135,000** — lighter than a New York peer would need. Overhead — Healthcare.gov premiums, coworking, tooling — is **$11,000/year**. They bill **27 hours/week** with **5 Weeks Off**: (52 − 5) × 27 = **1,269 billable hours/year**.

Minimum rate = ($135,000 + $11,000) ÷ 1,269 = **$115.05/hour**, the floor. A **15% Desired Profit Margin** raises the recommended rate to **$132.31/hour**, giving a **day rate of $1,058**. Because there is no state quarterly filing, the buffer only has to absorb federal estimated payments — one fewer deadline eating into that $100k goal.`,
  },

  "freelance-rate-calculator/designers": {
    faqs: [
      {
        q: "Is hourly the right rate model for a freelance designer?",
        a: "Hourly is the right starting floor, which is exactly what this calculator gives you — the minimum you should accept. Experienced designers then move to project or value-based pricing, because hourly caps earnings at your fastest delivery. Use the recommended rate as the basis you must clear, then package it into fixed-scope proposals that price higher.",
      },
      {
        q: "How do I turn the hourly output into a project price?",
        a: "Estimate the realistic hours a deliverable takes — a logo system, brand guidelines, or a website — and multiply by the recommended rate to get a floor, then add a margin for the outcome's value. The calculator does not price projects directly, but its recommended rate is the cost anchor every fixed-scope quote should sit above.",
      },
      {
        q: "What should designers put in the Annual Overhead field?",
        a: "Creative software subscriptions (Adobe, Figma), a capable workstation and display, stock-asset and font licences, portfolio hosting, and liability cover. Enter the annual total; it is added to your income target before the rate is calculated, so designers who omit recurring tool subscriptions consistently set their floor too low.",
      },
      {
        q: "How should designers set billable hours given non-billable creative time?",
        a: "Pitching, moodboarding, revisions you absorb, and self-marketing are rarely invoiced, so enter a conservative weekly billable figure — often 20–25 hours. A smaller billable-hours total raises the rate needed to hit your income target, which correctly reflects how much design time goes unbilled.",
      },
    ],
    workedExample: `A freelance brand designer targets **$70,000 take-home**, buffered to a **Desired Annual Income of $90,000** to cover self-employment and income tax. Overhead — Adobe and Figma subscriptions, a workstation, font and stock licences — is **$8,000/year**. Design work carries heavy unbilled pitching and revision time, so they enter **22 hours/week** billable with **6 Weeks Off**: (52 − 6) × 22 = **1,012 billable hours/year**.

Minimum rate = ($90,000 + $8,000) ÷ 1,012 = **$96.84/hour**, the floor. A **15% Desired Profit Margin** lifts the recommended rate to **$111.37/hour**, with a **day rate of $891**. Treat that hourly figure as the basis for a logo-system project: if one takes ~40 hours, the floor is about **$4,455**, before adding usage-rights value.`,
  },

  "freelance-rate-calculator/developers": {
    faqs: [
      {
        q: "How does specialisation change what I enter in this calculator?",
        a: "Specialisation does not change the maths — it changes the income target you can realistically pursue. A senior cloud or ML developer can set a higher Desired Annual Income than a generalist front-end contractor, and the calculator back-solves the rate from whatever target and billable hours you enter. Pick a target your market and stack support.",
      },
      {
        q: "What should developers include in Annual Overhead?",
        a: "IDEs and editor subscriptions, cloud hosting and test environments, GitHub Copilot or Cursor, monitoring and CI tools, a strong machine, and liability cover. Enter the annual total in the Overhead field. It is added to your income target before the rate is computed, so recurring infra and tooling costs are recovered across your billable hours.",
      },
      {
        q: "What billable-hours figure is realistic for a freelance developer?",
        a: "Developers working direct-to-client often bill 1,200–1,500 hours/year, lower through agencies that take a margin. Enter weekly hours and Weeks Off that reflect your channel mix; the billable-hours total is the divisor that converts your income target into an hourly rate, so honest hours prevent overpricing or underpricing.",
      },
      {
        q: "Can I get a day rate for enterprise procurement from this tool?",
        a: "Yes. The calculator multiplies the recommended hourly rate by eight to give a day rate, which is how many enterprise procurement and staffing teams prefer to engage contractors. Use it as your anchor for SOW and retainer discussions; the underlying hourly recommended rate is the floor those packaged figures must clear.",
      },
    ],
    workedExample: `A senior full-stack developer targets **$120,000 take-home**, buffered to a **Desired Annual Income of $160,000** for self-employment and income tax. Overhead — cloud hosting, Copilot, monitoring, a high-end machine — is **$10,000/year**. Billing direct-to-client, they enter **30 hours/week** with **5 Weeks Off**: (52 − 5) × 30 = **1,410 billable hours/year**.

Minimum rate = ($160,000 + $10,000) ÷ 1,410 = **$120.57/hour**, the floor. A **20% Desired Profit Margin** lifts the recommended rate to **$144.68/hour**, giving a **day rate of $1,157** for enterprise procurement. That day rate becomes the anchor for SOW pricing on an MVP build or infrastructure migration; the 20% buffer absorbs gaps between contracts.`,
  },
};
