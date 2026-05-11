import type { ComponentType } from "react";

import ProfitMarginVsMarkup from "./profit-margin-vs-markup-difference";
import WhatIsAGoodProfitMargin from "./what-is-a-good-profit-margin";
import GrossProfitVsNetProfit from "./gross-profit-vs-net-profit";
import EbitdaVsNetProfit from "./ebitda-vs-net-profit";
import CostPlusPricingExplained from "./cost-plus-pricing-explained";
import ValueBasedPricingVsCostPlus from "./value-based-pricing-vs-cost-plus";
import DiscountPricingStrategy from "./discount-pricing-strategy";
import HowToCalculateBreakEvenPoint from "./how-to-calculate-break-even-point";
import BreakEvenAnalysisExamples from "./break-even-analysis-examples";
import HowToReduceCostPerUnit from "./how-to-reduce-cost-per-unit";
import CashFlowManagementSmallBusiness from "./cash-flow-management-small-business";
import AmazonFbaFeesExplained from "./amazon-fba-fees-explained";
import EtsySellerFeesExplained from "./etsy-seller-fees-explained";
import UkInvoiceRequirements from "./uk-invoice-requirements";
import HowMuchToChargeAsFreelancer from "./how-much-to-charge-as-freelancer";
import FreelanceRatesByIndustryUk from "./freelance-rates-by-industry-uk";
import TrueCostOfAnEmployee from "./true-cost-of-an-employee";
import EmployeeVsContractorCostComparison from "./employee-vs-contractor-cost-comparison";
import HowToCalculateRoiForMarketing from "./how-to-calculate-roi-for-marketing";
import HowBusinessLoansWork from "./how-business-loans-work";
import SbaLoanVsConventionalLoan from "./sba-loan-vs-conventional-loan";
import PaybackPeriodVsRoi from "./payback-period-vs-roi";
import StartupRunwayBurnRateGuide from "./startup-runway-burn-rate-guide";
import HowToValueABusinessToSell from "./how-to-value-a-business-to-sell";
import RevenueGrowthBenchmarks from "./revenue-growth-benchmarks";

export const ARTICLE_BODIES: Record<string, ComponentType> = {
  "profit-margin-vs-markup-difference": ProfitMarginVsMarkup,
  "what-is-a-good-profit-margin": WhatIsAGoodProfitMargin,
  "gross-profit-vs-net-profit": GrossProfitVsNetProfit,
  "ebitda-vs-net-profit": EbitdaVsNetProfit,
  "cost-plus-pricing-explained": CostPlusPricingExplained,
  "value-based-pricing-vs-cost-plus": ValueBasedPricingVsCostPlus,
  "discount-pricing-strategy": DiscountPricingStrategy,
  "how-to-calculate-break-even-point": HowToCalculateBreakEvenPoint,
  "break-even-analysis-examples": BreakEvenAnalysisExamples,
  "how-to-reduce-cost-per-unit": HowToReduceCostPerUnit,
  "cash-flow-management-small-business": CashFlowManagementSmallBusiness,
  "amazon-fba-fees-explained": AmazonFbaFeesExplained,
  "etsy-seller-fees-explained": EtsySellerFeesExplained,
  "uk-invoice-requirements": UkInvoiceRequirements,
  "how-much-to-charge-as-freelancer": HowMuchToChargeAsFreelancer,
  "freelance-rates-by-industry-uk": FreelanceRatesByIndustryUk,
  "true-cost-of-an-employee": TrueCostOfAnEmployee,
  "employee-vs-contractor-cost-comparison": EmployeeVsContractorCostComparison,
  "how-to-calculate-roi-for-marketing": HowToCalculateRoiForMarketing,
  "how-business-loans-work": HowBusinessLoansWork,
  "sba-loan-vs-conventional-loan": SbaLoanVsConventionalLoan,
  "payback-period-vs-roi": PaybackPeriodVsRoi,
  "startup-runway-burn-rate-guide": StartupRunwayBurnRateGuide,
  "how-to-value-a-business-to-sell": HowToValueABusinessToSell,
  "revenue-growth-benchmarks": RevenueGrowthBenchmarks,
};
