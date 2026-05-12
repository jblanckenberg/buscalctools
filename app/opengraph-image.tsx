import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt =
  "BusCalcTools — Free business calculators for profit, pricing, and growth";

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
          padding: "70px 80px",
          color: "white",
          fontFamily: "sans-serif",
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

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
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
              fontSize: 32,
              fontWeight: 500,
              color: "#EBF2FA",
              maxWidth: 950,
            }}
          >
            Profit margin, pricing, break-even, ROI, cash flow &amp; more —
            for USA, UK, and South Africa.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#EBF2FA",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>18 calculators</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>25 guides</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Instant results</span>
          </div>
          <div style={{ fontWeight: 600 }}>buscalctools.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
