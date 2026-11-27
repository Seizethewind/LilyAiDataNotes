import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Sidebar } from "~/components/nav/Sidebar";
import { ThemeProvider } from "~/context/ThemeProvider";

function renderSidebar() {
  render(
    <MemoryRouter initialEntries={["/notes"]}>
      <ThemeProvider>
        <Sidebar />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe("Sidebar", () => {
  it("shows the brand", () => {
    renderSidebar();
    expect(screen.getByText("LilyAiDataNotes")).toBeTruthy();
  });

  it("lists every nav item, linking only the ones that exist", () => {
    renderSidebar();
    const nav = within(screen.getByRole("navigation", { name: "Primary" }));
    expect(nav.getAllByRole("listitem")).toHaveLength(5);
    expect(nav.getAllByRole("link").map((link) => link.textContent)).toEqual(["Notes", "Trash"]);
  });

  it("has a theme toggle", () => {
    renderSidebar();
    expect(screen.getByRole("button", { name: /theme/ })).toBeTruthy();
  });
});
