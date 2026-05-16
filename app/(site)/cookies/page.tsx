import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const COOKIES_URL = `${SITE_URL}/cookies`;

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How BusCalcTools uses cookies and similar storage — Google AdSense, Microsoft Clarity, and your region preference.",
  alternates: { canonical: COOKIES_URL, languages: hreflang(COOKIES_URL) },
};

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-gray-700">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookies" }]} />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark">Cookie Policy</h1>
        <p className="mt-2 text-xs text-gray-500">Last updated: 2026-05-12</p>
      </header>

      <p>
        This page lists every cookie and similar storage mechanism that BusCalcTools
        uses, what each does, and where to disable them. We don&apos;t use cookies for
        targeted marketing of our own products.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">First-party storage</h2>

      <h3 className="mt-4 text-base font-semibold text-brand-dark">Region preference (localStorage)</h3>
      <p className="mt-2">
        We store your selected region (USA, UK, or South Africa) in your browser&apos;s
        local storage so the calculator opens to the right currency and tax defaults
        on your next visit.
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1">
        <li><strong>Key:</strong> <code className="rounded bg-brand-light px-1.5 py-0.5 text-xs">bizcalc:region</code></li>
        <li><strong>Stored on:</strong> your device only — never transmitted to us.</li>
        <li><strong>How to remove:</strong> clear site data in your browser settings.</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">Third-party cookies</h2>

      <h3 className="mt-4 text-base font-semibold text-brand-dark">Google AdSense</h3>
      <p className="mt-2">
        We display ads via Google AdSense (publisher ID <code className="text-xs">ca-pub-5092336325075679</code>).
        AdSense sets cookies to:
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1">
        <li>Show personalised or non-personalised ads (depending on your consent).</li>
        <li>Measure ad performance and prevent fraud.</li>
        <li>Provide a frequency cap so you don&apos;t see the same ad repeatedly.</li>
      </ul>
      <p className="mt-3">
        Google&apos;s ad-cookie list and policies:{" "}
        <a
          href="https://policies.google.com/technologies/cookies"
          target="_blank"
          rel="noopener"
          className="text-brand-primary underline"
        >
          policies.google.com/technologies/cookies
        </a>
        . Opt out of personalised ads at{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener"
          className="text-brand-primary underline"
        >
          adssettings.google.com
        </a>
        .
      </p>

      <h3 className="mt-4 text-base font-semibold text-brand-dark">Microsoft Clarity</h3>
      <p className="mt-2">
        We use Microsoft Clarity (project <code className="text-xs">wpt3aszb9h</code>) to record anonymised
        sessions and generate heatmaps. Clarity sets cookies to identify unique
        visitors and group interactions into sessions. Clarity does not collect
        personally identifiable information.
      </p>
      <p className="mt-3">
        Microsoft&apos;s Clarity privacy details:{" "}
        <a
          href="https://learn.microsoft.com/en-gb/clarity/setup-and-installation/cookie-list"
          target="_blank"
          rel="noopener"
          className="text-brand-primary underline"
        >
          learn.microsoft.com/clarity/cookie-list
        </a>
        .
      </p>

      <h3 className="mt-4 text-base font-semibold text-brand-dark">Cloudflare</h3>
      <p className="mt-2">
        Our hosting and CDN provider (Cloudflare) may set technical cookies for
        security, bot protection, and load balancing. These are essential to
        keeping the site online and protected.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">Disabling cookies</h2>
      <p className="mt-2">
        You can block or delete cookies at any time via your browser settings:
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-1">
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener"
            className="text-brand-primary underline"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
            target="_blank"
            rel="noopener"
            className="text-brand-primary underline"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener"
            className="text-brand-primary underline"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener"
            className="text-brand-primary underline"
          >
            Edge
          </a>
        </li>
      </ul>
      <p className="mt-3">
        Blocking AdSense cookies will not break the site, but ad relevance
        will be reduced. Blocking Clarity cookies has no user-visible
        effect.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-dark">Questions</h2>
      <p className="mt-2">
        See our{" "}
        <a href="/privacy" className="text-brand-primary underline">privacy policy</a>{" "}
        for the broader data-handling picture. For specific questions, email{" "}
        <a href="mailto:hello@buscalctools.com" className="text-brand-primary underline">
          hello@buscalctools.com
        </a>
        .
      </p>
    </article>
  );
}
