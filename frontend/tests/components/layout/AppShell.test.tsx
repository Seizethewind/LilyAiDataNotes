import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { AppShell } from "~/components/layout/AppShell";
import { ThemeProvider } from "~/context/ThemeProvider";

function renderShell() {
  render(
    <MemoryRouter initialEntries={["/notes"]}>
      <ThemeProvider>
        <AppShell>
          <p>Page content</p>
        </AppShell>
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe("AppShell", () => {
  it("puts the page inside the main landmark", () => {
    renderShell();
    expect(within(screen.getByRole("main")).getByText("Page content")).toBeTruthy();
  });

  it("renders both navigations, one for each screen size", () => {
    renderShell();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeTruthy();
  });

  it("offers a theme toggle in the sidebar and in the top bar", () => {
    renderShell();
    expect(screen.getAllByRole("button", { name: /theme/ })).toHaveLength(2);
  });
});
