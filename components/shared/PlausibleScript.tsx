import Script from "next/script";

export default function PlausibleScript() {
  return (
    <Script
      defer
      data-domain="buscalctools.com"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
