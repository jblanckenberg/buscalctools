// One-off generator for finncalc's site-wide OG image. Uses Next.js's
// bundled @vercel/og (the same engine the app/opengraph-image.tsx
// convention compiles down to) so we don't have to install any new
// dependency in either repo.
//
// Run from C:/BizProfitCalc/bizapp:
//   node scripts/_generate-finncalc-og.mjs
//
// Output: writes C:/FIN_CALC_SITE/Finance_Calculator_Hub/og-image.png
// (overwrites the stale pixel-font version with a wordmark-on-white
// layout that matches the new brand).

import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";
import { writeFile } from "node:fs/promises";
import React from "react";

const NAVY = "#1B3A5C";
const TEAL = "#10B981";

// next/og expects React.createElement output (a plain JS object).
// Inline JSX would need a compiler; createElement is JSX-free.
const el = React.createElement;

const tree = el(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "60px 80px",
      fontFamily: "sans-serif",
      position: "relative",
    },
  },
  // Top: brand wordmark
  el(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 18,
        fontSize: 88,
        fontWeight: 900,
        letterSpacing: -3,
        lineHeight: 1,
      },
    },
    el("span", { style: { color: TEAL, display: "flex" } }, "finn"),
    el("span", { style: { color: NAVY, display: "flex" } }, "calc"),
  ),
  // Middle: headline + subheadline
  el(
    "div",
    {
      style: { display: "flex", flexDirection: "column", gap: 18 },
    },
    el(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 1.05,
          color: NAVY,
          maxWidth: 900,
        },
      },
      "Free financial calculators",
    ),
    el(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 32,
          fontWeight: 500,
          color: "#4A5568",
          lineHeight: 1.3,
          maxWidth: 900,
        },
      },
      "Retirement, mortgage, take-home pay, investing — for USA, UK and South Africa. No sign-up.",
    ),
  ),
  // Bottom: stats + URL
  el(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
      },
    },
    el(
      "div",
      {
        style: {
          display: "flex",
          gap: 24,
          fontSize: 22,
          color: "#4A5568",
          fontWeight: 500,
        },
      },
      el("span", { style: { display: "flex" } }, "19 calculators"),
      el("span", { style: { opacity: 0.4, display: "flex" } }, "•"),
      el("span", { style: { display: "flex" } }, "Instant results"),
      el("span", { style: { opacity: 0.4, display: "flex" } }, "•"),
      el("span", { style: { display: "flex" } }, "Region-aware"),
    ),
    el(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 28px",
          background: TEAL,
          color: "white",
          borderRadius: 999,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.3,
        },
      },
      "finncalc.com →",
    ),
  ),
);

const response = new ImageResponse(tree, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());
const out = "C:/FIN_CALC_SITE/Finance_Calculator_Hub/og-image.png";
await writeFile(out, buffer);
console.log(`Wrote ${out} (${buffer.length.toLocaleString()} bytes)`);
