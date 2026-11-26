import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "~/context/ThemeProvider";
import { useTheme } from "~/hooks/useTheme";
import { THEME_STORAGE_KEY } from "~/utils/themeStorageKey";

function Probe() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}

function renderProbe() {
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
}

describe("ThemeProvider", () => {
  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("uses the saved theme after mount", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    renderProbe();
    expect(screen.getByRole("button").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("toggles and saves the new theme", () => {
    renderProbe();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button").textContent).toBe("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
