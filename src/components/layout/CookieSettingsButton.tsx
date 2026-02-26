"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="text-sm text-graphite-light transition-colors hover:text-moss"
      aria-label="Otwórz ustawienia cookies"
      onClick={() => {
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
    >
      Ustawienia cookies
    </button>
  );
}
