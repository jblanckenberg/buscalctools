import Link from "next/link";
import { PHASE_1, PHASE_2 } from "@/lib/tools";
import { TOPICS } from "@/lib/topics";
import CookieSettingsLink from "@/components/shared/CookieSettingsLink";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-brand-light">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Profit &amp; pricing
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {PHASE_1.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="text-gray-700 hover:text-brand-primary">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Planning &amp; valuation
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {PHASE_2.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="text-gray-700 hover:text-brand-primary">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Topic guides
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {TOPICS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/topics/${t.slug}`} className="text-gray-700 hover:text-brand-primary">
                    {t.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/blog" className="text-gray-700 hover:text-brand-primary">All articles</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-brand-primary">About</Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-gray-700 hover:text-brand-primary">Editorial Policy</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-brand-primary">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-700 hover:text-brand-primary">Privacy</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-700 hover:text-brand-primary">Cookies</Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
              <li>
                <Link href="/terms" className="text-gray-700 hover:text-brand-primary">Terms</Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-gray-700 hover:text-brand-primary">Disclosure</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-700 hover:text-brand-primary">Disclaimer</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Personal finance?
            </h3>
            <p className="mt-3 text-sm text-gray-700">
              Try our sister site{" "}
              <a
                href="https://finncalc.com/"
                rel="noopener"
                className="font-semibold text-brand-primary hover:underline"
              >
                FinCalcHub
              </a>
              {" — "} free retirement, mortgage, and take-home pay calculators
              for the USA, UK, and South Africa.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-300 pt-6 text-xs text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} BusCalcTools. For information only — not
            financial, accounting, or tax advice. Consult a qualified professional
            before making business decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
