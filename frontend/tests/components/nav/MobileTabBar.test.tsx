import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { MobileTabBar } from "~/components/nav/MobileTabBar";

describe("MobileTabBar", () => {
  it("lists every nav item and links the ones that exist", () => {
    render(
      <MemoryRouter initialEntries={["/trash"]}>
        <MobileTabBar />
      </MemoryRouter>,
    );
    const nav = within(screen.getByRole("navigation", { name: "Mobile" }));
    expect(nav.getAllByRole("listitem")).toHaveLength(5);
    expect(nav.getByRole("link", { name: "Trash" }).getAttribute("aria-current")).toBe("page");
    expect(nav.getByRole("link", { name: "Notes" }).getAttribute("aria-current")).toBeNull();
  });
});
