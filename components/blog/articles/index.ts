import type { ComponentType } from "react";

// All blog articles are now authored as MDX. @next/mdx compiles each .mdx to
// a React component at build time; the static map below keeps the dynamic
// blog/[slug] route resolvable from a slug (Turbopack doesn't reliably
// support template-literal dynamic imports under output:"export").
//
// To add a new post: drop content/blog/<slug>.mdx, add a POSTS entry in
// lib/blog/posts.ts, then register both below.

import AmazonFbaFeesExplained from "@/content/blog/amazon-fba-fees-explained.mdx";
import BreakEvenAnalysisExamples from "@/content/blog/break-even-analysis-examples.mdx";
import CashFlowManagementSmallBusiness from "@/content/blog/cash-flow-management-small-business.mdx";
import CostPlusPricingExplained from "@/content/blog/cost-plus-pricing-explained.mdx";
import DiscountPricingStrategy from "@/content/blog/discount-pricing-strategy.mdx";
import EbitdaVsNetProfit from "@/content/blog/ebitda-vs-net-profit.mdx";
import EmployeeVsContractorCostComparison from "@/content/blog/employee-vs-contractor-cost-comparison.mdx";
import EtsySellerFeesExplained from "@/content/blog/etsy-seller-fees-explained.mdx";
import FreelanceRatesByIndustryUk from "@/content/blog/freelance-rates-by-industry-uk.mdx";
import GrossProfitVsNetProfit from "@/content/blog/gross-profit-vs-net-profit.mdx";
import HowBusinessLoansWork from "@/content/blog/how-business-loans-work.mdx";
import HowMuchToChargeAsFreelancer from "@/content/blog/how-much-to-charge-as-freelancer.mdx";
import HowToCalculateBreakEvenPoint from "@/content/blog/how-to-calculate-break-even-point.mdx";
import HowToCalculateRoiForMarketing from "@/content/blog/how-to-calculate-roi-for-marketing.mdx";
import HowToReduceCostPerUnit from "@/content/blog/how-to-reduce-cost-per-unit.mdx";
import HowToValueABusinessToSell from "@/content/blog/how-to-value-a-business-to-sell.mdx";
import PaybackPeriodVsRoi from "@/content/blog/payback-period-vs-roi.mdx";
import ProfitMarginVsMarkup from "@/content/blog/profit-margin-vs-markup-difference.mdx";
import RevenueGrowthBenchmarks from "@/content/blog/revenue-growth-benchmarks.mdx";
import SbaLoanVsConventionalLoan from "@/content/blog/sba-loan-vs-conventional-loan.mdx";
import StartupRunwayBurnRateGuide from "@/content/blog/startup-runway-burn-rate-guide.mdx";
import TrueCostOfAnEmployee from "@/content/blog/true-cost-of-an-employee.mdx";
import UkInvoiceRequirements from "@/content/blog/uk-invoice-requirements.mdx";
import ValueBasedPricingVsCostPlus from "@/content/blog/value-based-pricing-vs-cost-plus.mdx";
import WhatIsAGoodProfitMargin from "@/content/blog/what-is-a-good-profit-margin.mdx";

export const ARTICLE_BODIES: Record<string, ComponentType> = {
  "amazon-fba-fees-explained": AmazonFbaFeesExplained,
  "break-even-analysis-examples": BreakEvenAnalysisExamples,
  "cash-flow-management-small-business": CashFlowManagementSmallBusiness,
  "cost-plus-pricing-explained": CostPlusPricingExplained,
  "discount-pricing-strategy": DiscountPricingStrategy,
  "ebitda-vs-net-profit": EbitdaVsNetProfit,
  "employee-vs-contractor-cost-comparison": EmployeeVsContractorCostComparison,
  "etsy-seller-fees-explained": EtsySellerFeesExplained,
  "freelance-rates-by-industry-uk": FreelanceRatesByIndustryUk,
  "gross-profit-vs-net-profit": GrossProfitVsNetProfit,
  "how-business-loans-work": HowBusinessLoansWork,
  "how-much-to-charge-as-freelancer": HowMuchToChargeAsFreelancer,
  "how-to-calculate-break-even-point": HowToCalculateBreakEvenPoint,
  "how-to-calculate-roi-for-marketing": HowToCalculateRoiForMarketing,
  "how-to-reduce-cost-per-unit": HowToReduceCostPerUnit,
  "how-to-value-a-business-to-sell": HowToValueABusinessToSell,
  "payback-period-vs-roi": PaybackPeriodVsRoi,
  "profit-margin-vs-markup-difference": ProfitMarginVsMarkup,
  "revenue-growth-benchmarks": RevenueGrowthBenchmarks,
  "sba-loan-vs-conventional-loan": SbaLoanVsConventionalLoan,
  "startup-runway-burn-rate-guide": StartupRunwayBurnRateGuide,
  "true-cost-of-an-employee": TrueCostOfAnEmployee,
  "uk-invoice-requirements": UkInvoiceRequirements,
  "value-based-pricing-vs-cost-plus": ValueBasedPricingVsCostPlus,
  "what-is-a-good-profit-margin": WhatIsAGoodProfitMargin,
};
