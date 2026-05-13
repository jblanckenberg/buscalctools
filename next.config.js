// next.config.js
/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export", // Outputs static files into /out folder
  images: { unoptimized: true }, // Required for static export
  experimental: {
    // Inlines the stylesheet for above-the-fold CSS into <head> so the page
    // can render before the external CSS file finishes downloading. Removes
    // a ~160 ms render-blocking step Lighthouse flagged on mobile.
    inlineCss: true,
  },
};
module.exports = nextConfig;