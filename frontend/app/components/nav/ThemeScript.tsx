import { THEME_STORAGE_KEY } from "~/utils/themeStorageKey";

// Runs in <head> before the first paint, so the page never flashes the wrong theme.
// Same order as readStoredTheme: saved choice, then system preference.
const CODE = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: CODE }} />;
}
