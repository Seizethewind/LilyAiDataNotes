import { THEMES } from "~/types/theme";
import type { Theme } from "~/types/theme";
import { THEME_STORAGE_KEY } from "~/utils/themeStorageKey";

function isTheme(value: string | null): value is Theme {
  return THEMES.some((theme) => theme === value);
}

// Saved choice first, then the system preference, then light.
export function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // Storage can be blocked. Fall through to the system preference.
  }
  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}
