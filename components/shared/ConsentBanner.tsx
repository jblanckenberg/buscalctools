"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "bizcalc:consent";
const CONSENT_VERSION = 1;

export type ConsentState = {
  version: number;
  analytics: boolean;
  ads: boolean;
  ts: number;
};

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistConsent(state: ConsentState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(
    new CustomEvent("bizcalc:consent-changed", { detail: state }),
  );
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setAnalytics(stored.analytics);
      setAds(stored.ads);
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    function openBanner() {
      const stored = getStoredConsent();
      if (stored) {
        setAnalytics(stored.analytics);
        setAds(stored.ads);
        setAdvanced(true);
      }
      setVisible(true);
    }
    window.addEventListener("bizcalc:open-consent", openBanner);
    return () => window.removeEventListener("bizcalc:open-consent", openBanner);
  }, []);

  function save(next: { analytics: boolean; ads: boolean }) {
    const prev = getStoredConsent();
    const downgrade = Boolean(
      (prev?.analytics && !next.analytics) || (prev?.ads && !next.ads),
    );
    persistConsent({
      version: CONSENT_VERSION,
      analytics: next.analytics,
      ads: next.ads,
      ts: Date.now(),
    });
    setVisible(false);
    // Once a third-party script has loaded we cannot unload it from this tab,
    // so a reload is the only way to honour a withdrawal of consent.
    if (downgrade) window.location.reload();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-300 bg-white shadow-lg"
    >
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex-1">
            <h2
              id="cookie-banner-title"
              className="text-sm font-semibold text-brand-dark"
            >
              Cookies on BusCalcTools
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-700">
              We use cookies for traffic analytics (Microsoft Clarity, Google
              Analytics) and to fund the site through Google AdSense. The
              numbers you enter into a calculator always stay in your browser.
              See the{" "}
              <a href="/cookies" className="text-brand-primary underline">
                cookie policy
              </a>{" "}
              for details.
            </p>
            {advanced && (
              <div className="mt-3 space-y-2 text-xs text-gray-800">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <span>
                    <strong>Analytics</strong> — Microsoft Clarity, Google
                    Analytics. Helps us see which calculators are used and
                    where they break.
                  </span>
                </label>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={ads}
                    onChange={(e) => setAds(e.target.checked)}
                  />
                  <span>
                    <strong>Advertising</strong> — Google AdSense. Pays for
                    the site so the calculators stay free.
                  </span>
                </label>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
            {!advanced ? (
              <>
                <button
                  type="button"
                  onClick={() => save({ analytics: true, ads: true })}
                  className="rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white hover:bg-brand-dark"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => save({ analytics: false, ads: false })}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-brand-dark hover:border-brand-primary"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={() => setAdvanced(true)}
                  className="text-xs font-medium text-brand-primary underline"
                >
                  Customise
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => save({ analytics, ads })}
                  className="rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white hover:bg-brand-dark"
                >
                  Save preferences
                </button>
                <button
                  type="button"
                  onClick={() => save({ analytics: false, ads: false })}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-brand-dark hover:border-brand-primary"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={() => setAdvanced(false)}
                  className="text-xs font-medium text-brand-primary underline"
                >
                  ← Back
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
