import { Button } from "~/components/ui/Button";
import { useTheme } from "~/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";
  return (
    <Button variant="ghost" onClick={toggleTheme} aria-label={`Switch to ${next} theme`}>
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}
