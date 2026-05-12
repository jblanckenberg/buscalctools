import Link from "next/link";
import { AUTHOR } from "@/lib/author";

export default function AuthorCard() {
  return (
    <section className="mt-12 rounded-xl border border-gray-200 bg-brand-light/40 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-dark text-lg font-semibold text-white">
          {AUTHOR.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Written by
          </p>
          <Link
            href="/about"
            className="text-base font-semibold text-brand-dark hover:text-brand-primary"
          >
            {AUTHOR.name}
          </Link>
          <p className="text-sm text-gray-600">{AUTHOR.jobTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            {AUTHOR.shortBio}
          </p>
          <Link
            href="/about"
            className="mt-2 inline-block text-sm font-medium text-brand-primary hover:underline"
          >
            More about James →
          </Link>
        </div>
      </div>
    </section>
  );
}
