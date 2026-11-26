import { createContext } from "react";
import type { Theme } from "~/types/theme";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// null means no ThemeProvider above. useTheme turns that into an error.
export const ThemeContext = createContext<ThemeContextValue | null>(null);
