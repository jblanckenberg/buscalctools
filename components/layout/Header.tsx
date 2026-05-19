import Link from "next/link";

// Header turns light/white once the wordmark logo is in place — the logo file
// at /public/logo.png is a dark-navy + teal wordmark on a white background
// designed for a light context. The brand palette (brand-dark / brand-primary /
// brand-accent) carries through the rest of the site for buttons, badges,
// and copy.
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          aria-label="BusCalcTools — home"
          className="flex items-center"
        >
          {/* Source PNG is 4608 x 1024 (≈4.5:1). The width/height attrs are
              the intrinsic ratio reserved for CLS; CSS classes set the
              rendered height. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="BusCalcTools"
            width={4608}
            height={1024}
            className="h-8 w-auto sm:h-10"
          />
        </Link>
        <nav className="flex items-center gap-2 text-sm text-brand-dark">
          <Link
            href="/"
            className="rounded-md px-2 py-1 hover:bg-brand-light"
          >
            Calculators
          </Link>
          <Link
            href="/blog"
            className="hidden rounded-md px-2 py-1 hover:bg-brand-light sm:inline-block"
          >
            Blog
          </Link>
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-md px-2 py-1 hover:bg-brand-light"
          >
            🔍
          </Link>
        </nav>
      </div>
    </header>
  );
}
