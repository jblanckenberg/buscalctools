import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-dark/20 bg-brand-dark text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-baseline gap-1 text-lg font-semibold tracking-tight">
          BusCalc
          <span className="text-brand-primary">Tools</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/" className="rounded-md px-2 py-1 hover:bg-white/10">
            Calculators
          </Link>
          <Link href="/blog" className="hidden rounded-md px-2 py-1 hover:bg-white/10 sm:inline-block">
            Blog
          </Link>
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-md px-2 py-1 text-white hover:bg-white/10"
          >
            🔍
          </Link>
        </nav>
      </div>
    </header>
  );
}
