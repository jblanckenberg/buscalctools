import { Region } from "@/lib/regions";

export const EMPLOYER_TAX_BY_REGION: Record<Region, { rate: number; label: string }> = {
  USA: { rate: 11, label: "FICA (7.65%) + FUTA (0.6%) + SUTA (~2.7%) — total ~11%" },
  UK: { rate: 13.8, label: "Employer National Insurance Contributions" },
  SA: { rate: 2, label: "UIF (1%) + SDL (1%) — small business SDL exemption may apply" },
};
