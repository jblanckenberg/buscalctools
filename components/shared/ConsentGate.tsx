"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  ADSENSE_PUB_ID,
  CLARITY_PROJECT_ID,
  GA4_MEASUREMENT_ID,
  GOOGLE_TAG_ID,
} from "@/lib/site";
import { getStoredConsent, type ConsentState } from "./ConsentBanner";

// Renders the AdSense, Clarity, GA4, and Google Tag scripts only after the
// visitor has granted the matching consent category. Required for GDPR/UK PECR
// compliance: under PECR a non-essential cookie may not be set before the user
// has actively opted in, and AdSense/Clarity/GA4 are all non-essential here.
export default function ConsentGate() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
    setHydrated(true);
    function onChange(e: Event) {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setConsent(detail);
    }
    window.addEventListener(
      "bizcalc:consent-changed",
      onChange as EventListener,
    );
    return () =>
      window.removeEventListener(
        "bizcalc:consent-changed",
        onChange as EventListener,
      );
  }, []);

  if (!hydrated || !consent) return null;

  return (
    <>
      {consent.ads && (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
        />
      )}
      {consent.analytics && (
        <>
          <Script id="clarity-script" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
          </Script>
          <Script
            id="gtag-loader"
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GOOGLE_TAG_ID}');gtag('config', '${GA4_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}
