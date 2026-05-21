# Image title attribute audit — 2026-05-21

## Finding
DataForSEO SEO audit (`buscalctools.com-audit.json`, 2026-05-21) flagged
"Images missing title attribute site-wide" (low priority).

## Verification
Source-tree grep for `<img>` and Next.js `<Image>` components in
`bizapp/app/` and `bizapp/components/` found one existing image:
- `components/layout/Header.tsx:21` — logo `<img>` with `alt="BusCalcTools"` (no title)

All other visible images on the site are one of:
- Inline SVG (logo, calculator illustrations, decorative glyphs)
- CSS `background-image` (none in current build)
- Lucide-React icons (rendered as inline SVG, no `<img>` element)

## Diagnosis
The audit's flagged images therefore originate from **third-party scripts injected
at runtime**:
- Cookiebot consent banner branding (logo + provider icons)
- AdSense ad creative (varies per impression)
- Cloudflare Analytics beacon pixel
- Other third-party CMP / analytics imagery

## Decision
**No action.** We cannot add `title=` attributes to third-party-injected
DOM without monkey-patching the page after script load. That carries:

- **CSP risk** — adding inline scripts to mutate DOM violates our
  Content-Security-Policy (no `'unsafe-inline'` mutation handlers).
- **Consent-mode risk** — modifying Cookiebot's banner DOM after load may
  break IAB TCF v2.3 compliance.
- **AdSense TOS risk** — modifying ad-iframe content is against the
  AdSense terms of service.

The marginal SEO value of `title=` attributes is also low; `alt` is the
SEO-relevant attribute, and we don't have control over the third-party
`alt` strings either.

## First-party image standards
The one existing first-party image (logo in Header) has correct `alt`
and width/height for CLS. If we introduce additional first-party images
(hero photography, blog featured images, social og-images), we will:

1. Use raw `<img>` with `alt` (as per current logo pattern) or migrate
   to Next.js `<Image>` for automatic optimization.
2. Always set `alt` (the SEO-relevant attribute).
3. Set `title` only when it serves usability (e.g., hover-tooltips on
   icon-style links — most images do NOT need it).

## Lint guard
`eslint-config-next` (already in devDependencies) enables the
`jsx-a11y/img-has-alt` rule by default. That catches the case where
someone adds a raw `<img>` without `alt`. No additional config required.
