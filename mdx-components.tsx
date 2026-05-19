import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// @next/mdx convention: this file must live at the project root and export
// a useMDXComponents() function. The returned map applies to every .mdx
// file imported anywhere in the app, so plain markdown elements inherit the
// same Tailwind classes the hand-coded TSX articles use.
//
// Spec for adding new mappings: match the visual treatment used in the
// remaining hand-coded articles under components/blog/articles/*.tsx so
// MDX and TSX posts look visually identical when rendered.

type AProps = ComponentProps<"a">;

// `<Lead>` wraps an article's first paragraph. Drives the .lead CSS selector
// referenced by the Article schema's speakable block. Renders as a <div>
// because MDX already wraps any text inside a custom component in a <p>;
// using a <div> here avoids invalid nested <p><p>… markup.
//
//   <Lead>Big intro paragraph that summarises the article…</Lead>
//
function Lead(props: ComponentProps<"div">) {
  return (
    <div className="lead text-lg leading-relaxed text-gray-700" {...props} />
  );
}

// Renders <a href="…"> as a Next <Link> when the href is a relative path;
// keeps external links as a plain anchor with the same brand styling.
function MdxLink({ href = "", children, ...rest }: AProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const className = "text-brand-primary underline hover:text-blue-700";
  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} rel="noopener" {...rest}>
      {children}
    </a>
  );
}

export function useMDXComponents(
  components: MDXComponents,
): MDXComponents {
  return {
    Lead,
    h2: (props) => (
      <h2 className="mt-10 text-2xl font-bold text-brand-dark" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-6 text-xl font-semibold text-brand-dark" {...props} />
    ),
    p: (props) => (
      <p className="mt-3 leading-relaxed text-gray-700" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-3 ml-6 list-decimal space-y-1 text-gray-700" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    a: MdxLink,
    strong: (props) => (
      <strong className="font-semibold text-brand-dark" {...props} />
    ),
    pre: (props) => (
      <pre
        className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-brand-light px-1 py-0.5 text-sm font-mono text-brand-dark"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-4 border-l-4 border-brand-primary pl-4 italic text-gray-700"
        {...props}
      />
    ),
    ...components,
  };
}
