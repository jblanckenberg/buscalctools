"use client";
import { useEffect } from "react";

type Props = {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  minHeight: number; // reserve to defend CLS
  className?: string;
  style?: React.CSSProperties; // for the leaderboard's fixed 728x90
};

// Renders a single AdSense ad unit. Requires the AdSense library script to
// have been loaded already (see ConsentGate). Pushes to window.adsbygoogle
// on mount so AdSense fills the slot. The wrapping div reserves minHeight
// to defend against CLS while the ad loads.
export default function AdSlot({
  slot,
  format = "auto",
  minHeight,
  className,
  style,
}: Props) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense library script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={className} style={{ minHeight, ...style }}>
      <ins
        className="adsbygoogle"
        style={style ?? { display: "block", minHeight }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
