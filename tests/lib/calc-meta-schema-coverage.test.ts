import { describe, it, expect } from "vitest";
import { TOOLS } from "@/lib/tools";
import { calcMeta } from "@/lib/calc-meta";

describe("calc-meta schema coverage — every TOOLS slug has full JSON-LD inputs", () => {
  for (const tool of TOOLS) {
    describe(tool.slug, () => {
      const meta = calcMeta(tool.slug);

      it("has a calcMeta entry", () => {
        expect(meta, `calcMeta("${tool.slug}") returned undefined`).toBeDefined();
      });

      it("has FAQ items for FAQPage schema (>= 3, every Q/A non-empty)", () => {
        expect(meta?.faqs, `${tool.slug}: faqs missing`).toBeDefined();
        expect(meta!.faqs!.length, `${tool.slug}: faqs.length < 3`).toBeGreaterThanOrEqual(3);
        for (const f of meta!.faqs!) {
          expect(f.q.trim().length, `${tool.slug}: empty FAQ question`).toBeGreaterThan(0);
          expect(f.a.trim().length, `${tool.slug}: empty FAQ answer`).toBeGreaterThan(0);
        }
      });

      it("has HowTo steps for HowTo schema (>= 3, every step non-empty)", () => {
        expect(meta?.howToSteps, `${tool.slug}: howToSteps missing`).toBeDefined();
        expect(meta!.howToSteps!.length, `${tool.slug}: howToSteps.length < 3`).toBeGreaterThanOrEqual(3);
        meta!.howToSteps!.forEach((s, idx) => {
          expect(s.name.trim().length, `${tool.slug}: howToSteps[${idx}].name empty`).toBeGreaterThan(0);
          expect(s.text.trim().length, `${tool.slug}: howToSteps[${idx}].text empty`).toBeGreaterThan(0);
        });
      });

      it("has howToName + howToDescription for HowTo schema", () => {
        expect(meta?.howToName?.trim().length, `${tool.slug}: howToName missing`).toBeGreaterThan(0);
        expect(meta?.howToDescription?.trim().length, `${tool.slug}: howToDescription missing`).toBeGreaterThan(0);
      });

      it("has featureList for SoftwareApplication schema (>= 3 non-empty features)", () => {
        expect(meta?.featureList, `${tool.slug}: featureList missing`).toBeDefined();
        expect(meta!.featureList!.length, `${tool.slug}: featureList.length < 3`).toBeGreaterThanOrEqual(3);
        meta!.featureList!.forEach((f, idx) => {
          expect(f.trim().length, `${tool.slug}: featureList[${idx}] empty`).toBeGreaterThan(0);
        });
      });

      it("has applicationSubCategory for SoftwareApplication schema", () => {
        expect(meta?.applicationSubCategory?.trim().length).toBeGreaterThan(0);
      });

      it("has lastReviewed (ISO date) for dateModified", () => {
        expect(meta?.lastReviewed, `${tool.slug}: lastReviewed missing`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  }
});
