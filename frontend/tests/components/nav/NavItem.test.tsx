import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { NavItem } from "~/components/nav/NavItem";

function renderAt(path: string, item: { label: string; to: string; enabled: boolean }) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <NavItem item={item} />
    </MemoryRouter>,
  );
}

describe("NavItem", () => {
  it("links to its page", () => {
    renderAt("/trash", { label: "Notes", to: "/notes", enabled: true });
    expect(screen.getByRole("link", { name: "Notes" }).getAttribute("href")).toBe("/notes");
  });

  it("is marked current on its page and below it", () => {
    renderAt("/notes/n_001", { label: "Notes", to: "/notes", enabled: true });
    expect(screen.getByRole("link", { name: "Notes" }).getAttribute("aria-current")).toBe("page");
  });

  it("is not current on another page", () => {
    renderAt("/trash", { label: "Notes", to: "/notes", enabled: true });
    expect(screen.getByRole("link", { name: "Notes" }).getAttribute("aria-current")).toBeNull();
  });

  it("shows a Soon badge instead of a link when not enabled", () => {
    renderAt("/notes", { label: "Topics", to: "/topics", enabled: false });
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Soon")).toBeTruthy();
  });
});
