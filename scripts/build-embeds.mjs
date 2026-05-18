/**
 * Phase 3 embed bundle build driver.
 *
 * Reads src/embed/<slug>.ts for every Phase-3 slug, bundles each into
 * public/embed/<slug>.js as a self-contained IIFE that runs immediately on
 * load, replaces __EMBED_ORIGIN__ with the runtime origin, and minifies.
 *
 * Output is committed to git so Cloudflare Pages serves it as a static asset.
 */
import { build } from "esbuild";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "src/embed");
const OUT = resolve(ROOT, "public/embed");

// Keep this list in sync with lib/embeds.ts EMBED_SLUGS.
const SLUGS = [
  "profit-margin-calculator",
  "break-even-calculator",
  "roi-calculator",
  "cash-flow-calculator",
];

const ORIGIN = (
  process.env.NEXT_PUBLIC_EMBED_ORIGIN || "https://buscalctools.com"
).replace(/\/$/, "");

async function main() {
  await mkdir(OUT, { recursive: true });
  await Promise.all(
    SLUGS.map((slug) =>
      build({
        entryPoints: [resolve(SRC, `${slug}.ts`)],
        outfile: resolve(OUT, `${slug}.js`),
        bundle: true,
        minify: true,
        format: "iife",
        target: ["chrome110", "firefox110", "safari16", "edge110"],
        platform: "browser",
        define: {
          // Inline the origin so the bundle works cross-origin without env vars.
          // esbuild's `define` replaces the bare identifier __EMBED_ORIGIN__
          // (declared in shared.ts) with the JSON-stringified origin literal.
          __EMBED_ORIGIN__: JSON.stringify(ORIGIN),
        },
        legalComments: "none",
      }),
    ),
  );
  console.log(
    `[build-embeds] wrote ${SLUGS.length} bundles to public/embed/ (origin=${ORIGIN})`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
