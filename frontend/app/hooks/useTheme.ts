import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import type { ThemeContextValue } from "~/context/ThemeContext";

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return value;
}
