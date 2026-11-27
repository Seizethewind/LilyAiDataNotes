import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import NoteRoute from "~/routes/notes.$noteId";

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/notes/:noteId" element={<NoteRoute />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("note detail page", () => {
  it("loads the note, its history and its links", async () => {
    renderAt("/notes/n_001");
    expect(screen.getByRole("status")).toBeTruthy();
    expect(
      await screen.findByRole("heading", { level: 1, name: "Sample: Hosting decision" }),
    ).toBeTruthy();
    expect(await screen.findByText("Chose Render.")).toBeTruthy();
    expect(await screen.findByRole("link", { name: /Backup every 5 minutes/ })).toBeTruthy();
  });

  it("links back to the list", async () => {
    renderAt("/notes/n_001");
    const back = await screen.findByRole("link", { name: /All notes/ });
    expect(back.getAttribute("href")).toBe("/notes");
  });

  it("says when the note does not exist", async () => {
    renderAt("/notes/nope");
    expect(await screen.findByRole("heading", { name: "Note not found" })).toBeTruthy();
  });

  it("treats a deleted note as not found", async () => {
    renderAt("/notes/n_t01");
    expect(await screen.findByRole("heading", { name: "Note not found" })).toBeTruthy();
  });
});
