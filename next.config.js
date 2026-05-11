// next.config.js
/** @type {import("next").NextConfig} */
const nextConfig = {
 output: "export", // Outputs static files into /out folder
 images: { unoptimized: true }, // Required for static export
}
module.exports = nextConfig