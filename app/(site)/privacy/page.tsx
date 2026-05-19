import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";

const PRIVACY_URL = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles data, cookies, analytics, and advertising — and your rights under GDPR, UK PECR, and CCPA.`,
  alternates: { canonical: PRIVACY_URL, languages: hreflang(PRIVACY_URL) },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-base leading-relaxed text-gray-700">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: 2026-05-19</p>
        <p className="mt-3 text-base text-gray-600">
          This policy explains what data {SITE_NAME} collects, how cookies and
          advertising work, who the third-party vendors are, and your rights
          under GDPR, UK PECR, CCPA / CPRA, and equivalent laws.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">
          1. Who runs this site
        </h2>
        <p className="mt-2">
          {SITE_NAME} is operated by James Blanckenberg as a sole-operator
          publication. The site does not require an account or sign-up to use
          any calculator. For data-protection enquiries, contact{" "}
          <a
            href="mailto:hello@buscalctools.com"
            className="text-brand-primary underline"
          >
            hello@buscalctools.com
          </a>
          .
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          2. The numbers you type stay on your device
        </h2>
        <p className="mt-2">
          Every calculator runs entirely in your browser. Revenue, costs,
          margins, loan amounts, and any other figures you enter are never
          transmitted to our servers and never written to any database. The
          only persistent value the calculators store is your{" "}
          <strong>region preference</strong> (USA / UK / SA), saved in your
          browser&apos;s local storage so the calculator opens to the right
          currency next time.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          3. Cookies and similar technologies
        </h2>
        <p className="mt-2">
          We use cookies and equivalent technologies (local storage, session
          storage) for three purposes:
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-1.5">
          <li>
            <strong>Strictly necessary:</strong> remembering your cookie
            consent choice, your region preference, and any in-progress
            calculator inputs while you navigate the site. These set with no
            consent prompt because they are required for the site to function.
          </li>
          <li>
            <strong>Analytics (statistics consent):</strong> Google Analytics
            4, Microsoft Clarity, and Plausible Analytics set cookies or use
            equivalent identifiers to measure aggregate usage. These load only
            after you accept the &ldquo;statistics&rdquo; category in the
            Cookiebot banner.
          </li>
          <li>
            <strong>Advertising (marketing consent):</strong> Google AdSense
            and Google&apos;s ad-tech partners set cookies to serve and
            measure ads. These load only after you accept the
            &ldquo;marketing&rdquo; category in the Cookiebot banner.
          </li>
        </ul>
        <p className="mt-3">
          Reopen the consent dialog at any time via the{" "}
          <strong>Cookie settings</strong> link in the footer to change your
          choices or withdraw consent.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          4. Third-party services we use
        </h2>
        <p className="mt-2">
          The following third-party services may process limited data about
          your visit. Each operates under its own privacy policy.
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-2">
          <li>
            <strong>Google AdSense</strong> — display advertising, served
            only after marketing consent. Google may use the DoubleClick DART
            cookie and equivalent identifiers to serve ads based on your
            prior visits to this site and other sites on the internet.
            Google&apos;s use of advertising cookies is described at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              policies.google.com/technologies/ads
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics 4 + Google Tag</strong> — aggregate usage
            measurement (pageviews, scroll depth, calculator-complete events).
            Loads only after statistics consent. See{" "}
            <a
              href="https://policies.google.com/privacy"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              policies.google.com/privacy
            </a>
            .
          </li>
          <li>
            <strong>Microsoft Clarity</strong> — heat-mapping and session
            recording so we can see where calculators are confusing.
            Recordings are masked by default; form input values are not
            recorded. Loads only after statistics consent.{" "}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              privacy.microsoft.com
            </a>
            .
          </li>
          <li>
            <strong>Plausible Analytics</strong> — privacy-friendly,
            cookie-less aggregate analytics. Loads regardless of consent
            because it does not set tracking cookies or collect personal
            data.{" "}
            <a
              href="https://plausible.io/privacy"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              plausible.io/privacy
            </a>
            .
          </li>
          <li>
            <strong>Cookiebot</strong> — our Consent Management Platform (IAB
            TCF v2.3 certified). Stores your consent preferences in a
            first-party cookie and shares the consent signal with the
            analytics and ad vendors above.{" "}
            <a
              href="https://www.cookiebot.com/en/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              cookiebot.com/privacy
            </a>
            .
          </li>
          <li>
            <strong>Beehiiv</strong> — newsletter delivery. If you submit an
            email address via our newsletter form, that address is sent to
            Beehiiv to manage your subscription. Beehiiv does not receive any
            other browsing data from this site.{" "}
            <a
              href="https://www.beehiiv.com/privacy"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              beehiiv.com/privacy
            </a>
            .
          </li>
          <li>
            <strong>Cloudflare</strong> — our content delivery network and
            hosting provider. Cloudflare may log standard request data (IP,
            User-Agent, timestamps) for security and traffic-management
            purposes. Cloudflare does not receive any of the values you type
            into a calculator.{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              cloudflare.com/privacy
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          5. Personalised advertising and your opt-outs
        </h2>
        <p className="mt-2">
          When marketing consent is granted, Google and its ad-tech partners
          may show advertising based on your prior visits. You can opt out of
          personalised advertising in several ways:
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-1.5">
          <li>
            <strong>This site:</strong> click <em>Cookie settings</em> in the
            footer and disable the marketing category. Ads will still appear
            but will not be personalised.
          </li>
          <li>
            <strong>Google account-wide:</strong>{" "}
            <a
              href="https://adssettings.google.com/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              adssettings.google.com
            </a>
            .
          </li>
          <li>
            <strong>Third-party ad networks (NAI / DAA):</strong>{" "}
            <a
              href="https://optout.aboutads.info/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              optout.aboutads.info
            </a>{" "}
            and{" "}
            <a
              href="https://optout.networkadvertising.org/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-brand-primary underline"
            >
              optout.networkadvertising.org
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          6. Your rights (GDPR / UK GDPR)
        </h2>
        <p className="mt-2">
          If you are in the EU, UK, or EEA you have the right to access,
          correct, delete, port, or restrict processing of your personal
          data; to object to processing based on legitimate interests; and to
          lodge a complaint with your supervisory authority. To exercise any
          of these rights, email{" "}
          <a
            href="mailto:hello@buscalctools.com"
            className="text-brand-primary underline"
          >
            hello@buscalctools.com
          </a>
          . Because we do not maintain user accounts, we will typically only
          hold consent-record metadata and any email address you submitted to
          the newsletter — we will identify you by that email.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          7. California residents (CCPA / CPRA)
        </h2>
        <p className="mt-2">
          California residents have the right to know what categories of
          personal information are collected, to request deletion, to opt out
          of the sale or sharing of personal information for cross-context
          behavioural advertising, and to not be discriminated against for
          exercising these rights.
        </p>
        <p className="mt-3">
          To opt out of the sale or sharing of your information for
          cross-context behavioural advertising, click{" "}
          <strong>Your Privacy Choices</strong> in the Cookiebot banner (also
          available via the <em>Cookie settings</em> footer link), or send a
          verified opt-out request to{" "}
          <a
            href="mailto:hello@buscalctools.com"
            className="text-brand-primary underline"
          >
            hello@buscalctools.com
          </a>
          . We also honour the <strong>Global Privacy Control (GPC)</strong>{" "}
          browser signal automatically.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">8. Children</h2>
        <p className="mt-2">
          {SITE_NAME} is not directed at children under 13 (USA) or 16
          (EU/UK). We do not knowingly collect data from children. If you
          believe we have inadvertently collected such data, please contact us
          and we will delete it.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          9. International transfers
        </h2>
        <p className="mt-2">
          The third-party vendors listed above (notably Google, Microsoft, and
          Cloudflare) operate globally and may transfer data to data centres
          in the United States or other jurisdictions. Each vendor maintains
          its own Standard Contractual Clauses (SCCs) or equivalent transfer
          mechanism under GDPR Article 46.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">
          10. Changes to this policy
        </h2>
        <p className="mt-2">
          We update this policy when new services are added or laws change.
          Substantive updates are reflected in the &ldquo;Last updated&rdquo;
          date at the top, and material changes (new categories of data, new
          vendors) trigger a re-prompt from the Cookiebot consent banner.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-brand-dark">11. Contact</h2>
        <p className="mt-2">
          Privacy questions, data-subject requests, complaints:{" "}
          <a
            href="mailto:hello@buscalctools.com"
            className="text-brand-primary underline"
          >
            hello@buscalctools.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}
