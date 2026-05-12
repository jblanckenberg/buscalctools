import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const CONTACT_URL = `${SITE_URL}/contact`;
const CONTACT_EMAIL = "hello@buscalctools.com";

export const metadata: Metadata = {
  title: "Contact BusCalcTools",
  description:
    "Get in touch with BusCalcTools. Report a bug, suggest a calculator, or flag an out-of-date tax rate. We read everything.",
  alternates: { canonical: CONTACT_URL, languages: hreflang(CONTACT_URL) },
};

export default function ContactPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: CONTACT_URL,
    description: "Contact form and email for BusCalcTools support and feedback.",
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          Contact
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          The fastest way to reach the human behind BusCalcTools.
        </p>
      </header>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-brand-dark">Email</h2>
        <p className="mt-2 text-sm">
          For everything — bug reports, feature requests, partnership ideas,
          out-of-date tax rates, broken calculations, content corrections:
        </p>
        <p className="mt-3 text-base font-semibold">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand-primary underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Response time is typically 24–72 hours.
        </p>
      </section>

      <section className="mt-8 rounded-xl bg-brand-light p-6">
        <h2 className="text-lg font-semibold text-brand-dark">What to include</h2>
        <p className="mt-2 text-sm">
          To get a faster, more useful reply, include where you can:
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-1.5 text-sm">
          <li><strong>Page URL</strong> — exactly which calculator or article.</li>
          <li><strong>Region</strong> — USA, UK, or South Africa.</li>
          <li><strong>What you expected vs. what you got</strong> — for calculation issues.</li>
          <li><strong>Source link</strong> — if you&apos;re flagging a tax rate as out of date, link the gov page that proves it.</li>
          <li><strong>Browser + device</strong> — for UI bugs (Chrome on Android, Safari on iPhone, etc.).</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">What we don&apos;t do</h2>
        <ul className="mt-3 ml-6 list-disc space-y-2 text-sm">
          <li>
            <strong>Personalised financial advice.</strong> Calculations on this site
            are general tools. Talk to an accountant or financial adviser for
            advice specific to your circumstances.
          </li>
          <li>
            <strong>Paid sponsorships or affiliate inclusions in articles.</strong>
            The site is supported by display ads and our editorial content is
            independent. Pitches for &ldquo;featured product&rdquo; placement won&apos;t be
            actioned.
          </li>
          <li>
            <strong>Guest-post submissions.</strong> We don&apos;t accept third-party
            content. Skip the outreach email.
          </li>
        </ul>
      </section>

      <section className="mt-8 text-sm text-gray-600">
        <p>
          For privacy and data-handling questions, see the{" "}
          <a href="/privacy" className="text-brand-primary underline">privacy policy</a>.
          For how we research and review content, see the{" "}
          <a href="/editorial-policy" className="text-brand-primary underline">
            editorial policy
          </a>
          .
        </p>
      </section>
    </article>
  );
}
