import { ImageResponse } from "next/og";
import { calcMeta, CATEGORY_SLUG } from "@/lib/calc-meta";
import { SITE_URL } from "@/lib/site";
import { TOOLS, toolBySlug } from "@/lib/tools";

export const dynamic = "force-static";
export const dynamicParams = false;
export const contentType = "image/png";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

type Params = { slug: string };

export async function GET(
  _request: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  const meta = calcMeta(slug);
  if (!tool || !meta) {
    return new Response("Not found", { status: 404 });
  }

  const headline = tool.name.replace(/\s*Calculator$/, "");
  const categoryLabel = meta.category;
  const oneLiner = tool.desc;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(160deg, #203A5F 0%, #1A56DB 55%, #10B981 130%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 70px",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top: brand mark + region pills */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: -0.6,
            }}
          >
            BusCalc
            <span style={{ color: "#10B981" }}>Tools</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: "#EBF2FA",
              opacity: 0.9,
            }}
          >
            <span
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                fontWeight: 600,
              }}
            >
              {categoryLabel}
            </span>
            <span
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                fontWeight: 600,
              }}
            >
              USA · UK · SA
            </span>
          </div>
        </div>

        {/* Middle: headline + supporting copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 1.02,
              maxWidth: 860,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 500,
              color: "#EBF2FA",
              lineHeight: 1.25,
              maxWidth: 860,
            }}
          >
            {oneLiner}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 18,
              padding: "20px 32px",
              borderRadius: 999,
              backgroundColor: "#10B981",
              color: "white",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -0.4,
              alignSelf: "flex-start",
            }}
          >
            Calculate for free →
          </div>
        </div>

        {/* Bottom: URL + topic hub hint */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 24,
            color: "#EBF2FA",
            opacity: 0.85,
          }}
        >
          <div style={{ display: "flex", fontWeight: 600 }}>
            buscalctools.com/{slug}
          </div>
          <div style={{ display: "flex", fontSize: 20, opacity: 0.7 }}>
            More {categoryLabel.toLowerCase()} tools at{" "}
            {SITE_URL.replace(/^https?:\/\//, "")}/topics/
            {CATEGORY_SLUG[meta.category]}
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 1500 },
  );
}
