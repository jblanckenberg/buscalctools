import Link from "next/link";
import { PHASE_1, PHASE_2 } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-brand-light">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Phase 1 — Live
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
              Phase 2 — Coming soon
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {PHASE_2.map((t) => (
                <li key={t.slug} className="text-gray-500">
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-dark">
              About
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/" className="text-gray-700 hover:text-brand-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-700 hover:text-brand-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-700 hover:text-brand-primary">
                  Disclaimer
                </Link>
              </li>
            </ul>
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
