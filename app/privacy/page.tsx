import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const PRIVACY_URL = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BusCalcTools handles data, cookies, and analytics.",
  alternates: { canonical: PRIVACY_URL, languages: hreflang(PRIVACY_URL) },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-gray-700">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mb-4 text-3xl font-bold text-brand-dark">Privacy Policy</h1>
      <p className="text-xs text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-brand-dark">No accounts, no sign-ups</h2>
        <p>
          BusinessCalc.io is a free utility site. We do not collect, store,
          or transmit any of the values you enter into a calculator. All
          calculations run in your browser; the numbers never leave your
          device.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-brand-dark">Region preference</h2>
        <p>
          We save your last-selected region (USA, UK, or South Africa) in
          your browser&apos;s local storage so the calculator opens to the
          right currency and tax defaults next time. This data is stored
          on your device only and is not transmitted to us.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-brand-dark">Analytics</h2>
        <p>
          We use privacy-friendly analytics to understand which calculators
          are most useful. We do not use cookies that track you across
          other websites and we do not sell or share data with third
          parties.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-brand-dark">Display ads</h2>
        <p>
          This site is supported by display advertising. Ad networks may
          use cookies to personalise the ads you see. You can opt out of
          personalised advertising via your browser settings or your
          regional advertising preferences portal.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-brand-dark">Contact</h2>
        <p>
          Questions about privacy? Email hello@businesscalc.io.
        </p>
      </section>
    </article>
  );
}
