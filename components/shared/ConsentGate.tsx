"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  ADSENSE_PUB_ID,
  CLARITY_PROJECT_ID,
  GA4_MEASUREMENT_ID,
  GOOGLE_TAG_ID,
} from "@/lib/site";

// Cookiebot exposes window.Cookiebot.consent with these four flags after the
// CookiebotOnConsentReady event fires. See https://www.cookiebot.com/en/developer/
type CookiebotConsent = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    Cookiebot?: {
      consent: CookiebotConsent;
      renew?: () => void;
    };
  }
}

// Renders AdSense, Clarity, GA4, and Google Tag scripts only after Cookiebot
// reports that the visitor has granted consent for the matching category.
// Required for GDPR/UK PECR compliance: under PECR a non-essential cookie may
// not be set before the user has actively opted in.
//
// We listen for Cookiebot's own CookiebotOnConsentReady event instead of
// rolling our own state — the Cookiebot UI handles "Accept", "Reject", and
// "Customise" interactions on its own banner.
//
// data-blockingmode="auto" on the Cookiebot loader provides defence-in-depth:
// even if a script slipped through this gate, Cookiebot's DOM observer would
// still rewrite its `type` attribute to `text/plain` until consent is granted.
export default function ConsentGate() {
  const [consent, setConsent] = useState<CookiebotConsent | null>(null);

  useEffect(() => {
    function readConsent() {
      if (typeof window === "undefined") return;
      const cb = window.Cookiebot;
      if (cb?.consent) setConsent({ ...cb.consent });
    }

    readConsent();
    window.addEventListener("CookiebotOnConsentReady", readConsent);
    window.addEventListener("CookiebotOnAccept", readConsent);
    window.addEventListener("CookiebotOnDecline", readConsent);

    return () => {
      window.removeEventListener("CookiebotOnConsentReady", readConsent);
      window.removeEventListener("CookiebotOnAccept", readConsent);
      window.removeEventListener("CookiebotOnDecline", readConsent);
    };
  }, []);

  if (!consent) return null;

  const ads = consent.marketing;
  const analytics = consent.statistics;

  return (
    <>
      {ads && (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
        />
      )}
      {analytics && (
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
