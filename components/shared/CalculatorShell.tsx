import AuthorCard from "@/components/shared/AuthorCard";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import FeaturedAnswer from "@/components/shared/FeaturedAnswer";

type Props = {
  h1: string;
  intro: string;
  breadcrumbs?: Crumb[];
  // Optional slug — when provided, the shell renders the calc's
  // featured-snippet answer block above the children (the live calculator).
  slug?: string;
  children: React.ReactNode;
};

export default function CalculatorShell({
  h1,
  intro,
  breadcrumbs,
  slug,
  children,
}: Props) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          {h1}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-gray-600">{intro}</p>
      </header>
      {slug && <FeaturedAnswer slug={slug} />}
      {children}
      <AuthorCard variant="full" />
    </article>
  );
}
