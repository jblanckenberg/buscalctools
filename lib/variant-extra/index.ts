import type { VariantExtraMap } from "../variant-extra.types";
import { groupA } from "./groupA";
import { groupB } from "./groupB";
import { groupC } from "./groupC";
import { groupD } from "./groupD";
import { groupE } from "./groupE";

/**
 * Unique per-variant content (FAQ + worked example), authored per calculator
 * family. Merged onto the base Variant by getVariant() so each variant page
 * carries a non-duplicated FAQ block — the AdSense "low value content" fix.
 */
export const VARIANT_EXTRA: VariantExtraMap = {
  ...groupA,
  ...groupB,
  ...groupC,
  ...groupD,
  ...groupE,
};
