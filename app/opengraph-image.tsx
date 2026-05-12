import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt =
  "BusCalcTools — 18 free profit, pricing, and growth calculators";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #203A5F 0%, #1A56DB 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            BusCalc
            <span style={{ color: "#10B981" }}>Tools</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              color: "#EBF2FA",
              opacity: 0.85,
            }}
          >
            buscalctools.com
          </div>
        </div>

        {/* Middle: headline + subheadline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 950,
            }}
          >
            Free business calculators
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 500,
              color: "#EBF2FA",
              maxWidth: 950,
            }}
          >
            Profit margin, pricing, break-even, ROI &amp; more — for USA, UK
            and South Africa. No sign-up.
          </div>
        </div>

        {/* Bottom row: stats on the left, CTA pill on the right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 20,
              color: "#EBF2FA",
            }}
          >
            <span>18 calculators</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>25 guides</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Instant results</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#10B981",
              color: "white",
              padding: "16px 28px",
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: -0.3,
            }}
          >
            Try one free
            <span style={{ fontSize: 26 }}>→</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
