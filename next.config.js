// next.config.js
const createMDX = require("@next/mdx");

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export", // Outputs static files into /out folder
  images: { unoptimized: true }, // Required for static export
  // Allow .mdx files to be treated as routes / importable modules by Turbopack.
  // .ts and .tsx still work; .mdx is what @next/mdx compiles to React.
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    // Inlines the stylesheet for above-the-fold CSS into <head> so the page
    // can render before the external CSS file finishes downloading. Removes
    // a ~160 ms render-blocking step Lighthouse flagged on mobile.
    inlineCss: true,
  },
};

const withMDX = createMDX({
  // No remark/rehype plugins for now — keep the toolchain minimal until we
  // need shortcodes, math, or syntax-highlighted code blocks. Add plugins
  // here when the content demands them.
});

module.exports = withMDX(nextConfig);
