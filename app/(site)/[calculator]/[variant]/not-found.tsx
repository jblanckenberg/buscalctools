import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-brand-dark">Variant not found</h1>
      <p className="mt-3 text-gray-600">
        That calculator variant doesn&apos;t exist (yet).
      </p>
      <Link href="/" className="mt-6 inline-block text-brand-primary underline">
        Back to all calculators
      </Link>
    </article>
  );
}
