// One-shot script to fetch 3 Pexels images per buscalctools blog post and
// write them to public/blog/<slug>/{hero,mid,bottom}.jpg.
// Outputs a credits.json that the MDX edit step uses for figcaption attribution.
//
// Usage:  node scripts/fetch-blog-images.mjs
// Env:    PEXELS_API_KEY (optional override; default falls back to the inline key)

import fs from "node:fs/promises";
import path from "node:path";

const KEY =
  process.env.PEXELS_API_KEY ||
  "t0qbhdimcFEN4DlVxLDzhIGwzPRgSieU26G4j4WlQmarW5VcJ2lYAmEY";

const PLAN = {
  "amazon-fba-fees-explained": [
    "amazon delivery box",
    "warehouse fulfilment",
    "online shopping cart",
  ],
  "break-even-analysis-examples": [
    "coffee shop counter",
    "small business accounting desk",
    "financial chart laptop",
  ],
  "cash-flow-management-small-business": [
    "small business owner",
    "bills paperwork desk",
    "cash money payment",
  ],
  "discount-pricing-strategy": [
    "sale sign storefront",
    "retail shopping bags",
    "store discount display",
  ],
  "ebitda-vs-net-profit": [
    "financial statements review",
    "accountant calculator desk",
    "balance sheet analysis",
  ],
  "employee-vs-contractor-cost-comparison": [
    "office handshake",
    "freelancer laptop home",
    "team meeting business",
  ],
  "etsy-seller-fees-explained": [
    "handmade craft workshop",
    "online seller packaging",
    "small craft shop",
  ],
  "freelance-rates-by-industry-uk": [
    "freelancer laptop coffee",
    "creative agency desk",
    "UK office worker",
  ],
  "gross-profit-vs-net-profit": [
    "calculator accountant desk",
    "business profit chart",
    "spreadsheet finance",
  ],
  "how-business-loans-work": [
    "loan agreement signing",
    "bank meeting business",
    "business plan paperwork",
  ],
  "how-much-to-charge-as-freelancer": [
    "freelancer laptop working",
    "invoice payment desk",
    "remote work coffee",
  ],
  "how-to-calculate-break-even-point": [
    "calculator notebook desk",
    "business graph chart",
    "small shop owner",
  ],
  "how-to-calculate-roi-for-marketing": [
    "marketing campaign meeting",
    "analytics dashboard screen",
    "digital marketing team",
  ],
  "how-to-reduce-cost-per-unit": [
    "factory production line",
    "manufacturing assembly",
    "quality control inspection",
  ],
  "how-to-value-a-business-to-sell": [
    "business handshake deal",
    "for sale sign storefront",
    "business meeting negotiation",
  ],
  "payback-period-vs-roi": [
    "calculator finance desk",
    "investment growth chart",
    "money clock business",
  ],
  "profit-margin-vs-markup-difference": [
    "store price tag",
    "calculator shop counter",
    "retail percentage discount",
  ],
  "revenue-growth-benchmarks": [
    "growth chart business",
    "startup team office",
    "upward arrow trend",
  ],
  "sba-loan-vs-conventional-loan": [
    "loan paperwork pen",
    "bank exterior building",
    "small business owner meeting",
  ],
  "startup-runway-burn-rate-guide": [
    "startup office work",
    "hourglass desk business",
    "founder laptop late night",
  ],
  "true-cost-of-an-employee": [
    "office team meeting",
    "employee desk computer",
    "human resources interview",
  ],
  "uk-invoice-requirements": [
    "invoice paperwork desk",
    "UK business documents",
    "freelancer accounting laptop",
  ],
  "value-based-pricing-vs-cost-plus": [
    "premium product display",
    "client meeting negotiation",
    "pricing strategy desk",
  ],
  "what-is-a-good-profit-margin": [
    "small business shop owner",
    "profit calculator desk",
    "retail store inventory",
  ],
};

const POSITIONS = ["hero", "mid", "bottom"];

async function pexelsSearch(query) {
  const url =
    "https://api.pexels.com/v1/search?per_page=3&orientation=landscape&query=" +
    encodeURIComponent(query);
  const r = await fetch(url, { headers: { Authorization: KEY } });
  if (!r.ok) throw new Error(`Pexels ${r.status} for "${query}"`);
  const j = await r.json();
  return j.photos || [];
}

async function download(url, target) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download ${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(target, buf);
  return buf.length;
}

async function main() {
  const credits = {};
  const root = path.resolve("public/blog");
  for (const [slug, queries] of Object.entries(PLAN)) {
    const dir = path.join(root, slug);
    await fs.mkdir(dir, { recursive: true });
    credits[slug] = {};
    for (let i = 0; i < queries.length; i++) {
      const q = queries[i];
      const pos = POSITIONS[i];
      try {
        const photos = await pexelsSearch(q);
        if (!photos.length) {
          console.warn(`  ! no results for ${slug} ${pos}: "${q}"`);
          continue;
        }
        const p = photos[0];
        const file = path.join(dir, `${pos}.jpg`);
        const bytes = await download(p.src.large, file);
        credits[slug][pos] = {
          query: q,
          file: `/blog/${slug}/${pos}.jpg`,
          alt: p.alt || `${slug} ${pos} illustration`,
          name: p.photographer,
          url: p.photographer_url,
          bytes,
        };
        console.log(
          `  ok ${slug}/${pos}.jpg  ${Math.round(bytes / 1024)}KB  by ${p.photographer}`,
        );
      } catch (e) {
        console.error(`  ! ${slug}/${pos}: ${e.message}`);
      }
    }
  }
  await fs.writeFile(
    path.join(root, "credits.json"),
    JSON.stringify(credits, null, 2),
  );
  console.log("\nwrote public/blog/credits.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
