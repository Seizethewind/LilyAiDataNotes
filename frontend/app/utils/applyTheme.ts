import type { Theme } from "~/types/theme";
import { THEME_STORAGE_KEY } from "~/utils/themeStorageKey";

// Sets data-theme on <html> and remembers the choice.
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked. The theme still applies for this visit.
  }
}
