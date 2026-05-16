import type { ComponentType } from "react";

import BestProfitMarginCalculators2026 from "./best-profit-margin-calculators-2026";
import QuickbooksVsFreeProfitMarginCalculator from "./quickbooks-vs-free-profit-margin-calculator";
import BestBreakEvenCalculators2026 from "./best-break-even-calculators-2026";
import DcfVsMultiplesSmallBusinessValuation from "./dcf-vs-multiples-small-business-valuation";

export const COMPARISON_BODIES: Record<string, ComponentType> = {
  "best-profit-margin-calculators-2026": BestProfitMarginCalculators2026,
  "quickbooks-vs-free-profit-margin-calculator": QuickbooksVsFreeProfitMarginCalculator,
  "best-break-even-calculators-2026": BestBreakEvenCalculators2026,
  "dcf-vs-multiples-small-business-valuation": DcfVsMultiplesSmallBusinessValuation,
};
