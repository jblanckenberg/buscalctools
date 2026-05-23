import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { staticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = staticPageMetadata({
  slug: "disclaimer",
  title: "Disclaimer — Informational Use Only | BusCalcTools",
  description:
    "Why our calculator results are informational only and not financial, tax, or legal advice. When to consult a licensed professional.",
});

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-gray-700">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <h1 className="mb-4 text-3xl font-bold text-brand-dark">Disclaimer</h1>
      <p className="text-xs text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <section className="mt-6 space-y-3">
        <p>
          The calculators on BusinessCalc.io are provided for informational
          and educational purposes only. They are not financial,
          accounting, tax, or legal advice and should not be relied on as
          such.
        </p>
        <p>
          Tax rates, interest rates, and benchmark figures pre-filled by
          region are general guides at time of writing and may not reflect
          your specific situation. Always verify current rates with
          official sources and consult a qualified professional before
          making business decisions.
        </p>
        <p>
          BusinessCalc.io and its authors accept no liability for any loss
          or damage arising from use of these tools or reliance on the
          results they produce.
        </p>
      </section>
    </article>
  );
}
