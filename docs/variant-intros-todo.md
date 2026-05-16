# Variant Intro Copy — Operator TODO (BusCalcTools, Phase 2)

> **Goal:** Replace every `[OPERATOR_TO_FILL: ...]` marker in `lib/variants.ts` with a 300-500 word unique intro paragraph (or 2-3 paragraphs).
>
> **Style:** Match the parent calculator's existing tone. Open with a 40-60 word direct answer (snippet target). Cite at least one government source (HMRC / IRS / SARS / SBA / BoE / SARB) per geo variant. Cite at least one industry source per scenario/audience variant.
>
> **Anti-patterns:** No AI-generated text. No "in this article we will explore". No restating the calculator's instructions.
>
> **When done with one:** edit the matching entry in `lib/variants.ts` (replace the `todo("...")` value with the new prose string), tick the row below, run `npm run build`, then `wrangler pages deploy out`. The variant page auto-flips from `noindex,follow` to default `index,follow` as soon as its intro no longer starts with `[OPERATOR_TO_FILL:`.
>
> **Validation:** after each edit, run `npm test -- variants.test` — the "every intro is currently an OPERATOR_TO_FILL marker" assertion will fail once you've shipped your first intro, which is expected. Replace that assertion with one that checks every intro is non-empty + ≥300 words once all 15 are filled.

## Tracker

| # | Parent calculator | Variant | Kind | URL | Words written? | Reviewed? |
|---|---|---|---|---|---|---|
| 1 | profit-margin-calculator | uk | geo | /profit-margin-calculator/uk | ☐ | ☐ |
| 2 | profit-margin-calculator | us | geo | /profit-margin-calculator/us | ☐ | ☐ |
| 3 | profit-margin-calculator | restaurants | scenario | /profit-margin-calculator/restaurants | ☐ | ☐ |
| 4 | profit-margin-calculator | ecommerce | scenario | /profit-margin-calculator/ecommerce | ☐ | ☐ |
| 5 | markup-calculator | uk | geo | /markup-calculator/uk | ☐ | ☐ |
| 6 | markup-calculator | retail | scenario | /markup-calculator/retail | ☐ | ☐ |
| 7 | freelance-rate-calculator | uk | geo | /freelance-rate-calculator/uk | ☐ | ☐ |
| 8 | freelance-rate-calculator | us | geo | /freelance-rate-calculator/us | ☐ | ☐ |
| 9 | freelance-rate-calculator | designers | audience | /freelance-rate-calculator/designers | ☐ | ☐ |
| 10 | freelance-rate-calculator | developers | audience | /freelance-rate-calculator/developers | ☐ | ☐ |
| 11 | break-even-calculator | uk | geo | /break-even-calculator/uk | ☐ | ☐ |
| 12 | break-even-calculator | restaurants | scenario | /break-even-calculator/restaurants | ☐ | ☐ |
| 13 | cash-flow-calculator | uk | geo | /cash-flow-calculator/uk | ☐ | ☐ |
| 14 | business-loan-calculator | uk | geo | /business-loan-calculator/uk | ☐ | ☐ |
| 15 | roi-calculator | marketing | scenario | /roi-calculator/marketing | ☐ | ☐ |

## After all 15 ship

1. Resubmit `https://buscalctools.com/sitemap.xml` to Google Search Console, Bing Webmaster, and Yandex Webmaster.
2. Update `lib/variants.ts` "every intro is OPERATOR_TO_FILL marker" test to assert ≥300 words per intro.
3. Run a Lighthouse pass on 3 representative variant pages; confirm CLS ≤ 0.1 and LCP ≤ 2.5s.
4. Add 5 internal links from related blog posts to the new variants.
