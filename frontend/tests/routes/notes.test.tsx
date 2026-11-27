import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import NotesPage from "~/routes/notes";

function renderPage() {
  render(
    <MemoryRouter>
      <NotesPage />
    </MemoryRouter>,
  );
}

const items = () => screen.queryAllByRole("listitem");

describe("NotesPage", () => {
  it("shows a loading message, then every live note", async () => {
    renderPage();
    expect(screen.getByRole("status")).toBeTruthy();
    await waitFor(() => expect(items()).toHaveLength(8));
  });

  it("narrows the list as you type", async () => {
    renderPage();
    await waitFor(() => expect(items()).toHaveLength(8));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "render" } });
    await waitFor(() => expect(items()).toHaveLength(1));
    expect(screen.getByRole("heading", { name: "Sample: Hosting decision" })).toBeTruthy();
  });

  it("filters by status", async () => {
    renderPage();
    await waitFor(() => expect(items()).toHaveLength(8));
    fireEvent.click(screen.getByRole("button", { name: "Disputed" }));
    await waitFor(() => expect(items()).toHaveLength(1));
    expect(screen.getByRole("heading", { name: "Sample: Latency claim" })).toBeTruthy();
  });

  it("shows an empty state when nothing matches", async () => {
    renderPage();
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "zzzz" } });
    expect(await screen.findByRole("heading", { name: "No notes found" })).toBeTruthy();
  });
});
