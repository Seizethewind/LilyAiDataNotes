import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Page } from "~/components/layout/Page";

function renderPage(props: Omit<Parameters<typeof Page>[0], "children">) {
  render(
    <MemoryRouter>
      <Page {...props}>
        <p>Body</p>
      </Page>
    </MemoryRouter>,
  );
}

describe("Page", () => {
  it("shows the title, description and body", () => {
    renderPage({ title: "Notes", description: "All notes." });
    expect(screen.getByRole("heading", { level: 1, name: "Notes" })).toBeTruthy();
    expect(screen.getByText("All notes.")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
  });

  it("shows a back link when asked", () => {
    renderPage({ back: { to: "/notes", label: "All notes" } });
    expect(screen.getByRole("link", { name: "All notes" }).getAttribute("href")).toBe("/notes");
  });

  it("has no heading or back link by default", () => {
    renderPage({});
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });
});
