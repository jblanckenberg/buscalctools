import type { Variant, VariantMatrix } from "@/lib/variants.types";

/**
 * Returns an OPERATOR_TO_FILL marker for an operator-written intro.
 * Variant pages render this string verbatim until an operator replaces it
 * with 300-500 words of unique commentary. Tests assert every intro starts
 * with `[OPERATOR_TO_FILL:` so the build never ships a stub by accident.
 */
function todo(topic: string): string {
  return `[OPERATOR_TO_FILL: ${topic}]`;
}

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
      intro: todo("UK profit margin benchmarks and HMRC tax notes"),
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
      intro: todo("US profit margin benchmarks and IRS tax notes"),
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
      intro: todo("restaurant margin benchmarks and food cost tips"),
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
      intro: todo("ecommerce margin after platform fees and ads"),
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
      intro: todo("UK markup pricing with HMRC VAT context"),
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
      intro: todo("retail markup, keystone pricing, and category benchmarks"),
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
      intro: todo("UK freelance rates and HMRC self-assessment buffer"),
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
      intro: todo("US freelance rates and IRS self-employment tax buffer"),
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
      intro: todo("designer rate benchmarks and project pricing"),
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
      intro: todo("developer rate benchmarks and contract pricing"),
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
      intro: todo("UK break-even guidance and fixed cost examples"),
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
      intro: todo("restaurant break-even covers and ticket math"),
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
      intro: todo("UK cash flow projections and VAT-quarter timing"),
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
      intro: todo("UK SME loan rates and Bank of England context"),
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
      intro: todo("marketing ROI benchmarks and campaign attribution"),
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
