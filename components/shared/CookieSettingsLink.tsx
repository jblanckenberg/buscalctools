"use client";

export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent("bizcalc:open-consent"))
      }
      className="text-gray-700 hover:text-brand-primary"
    >
      Cookie settings
    </button>
  );
}
