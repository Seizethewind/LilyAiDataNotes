import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { NoteDetail } from "~/components/notes/NoteDetail";
import { buildNote } from "~/services/api/buildNote";

const note = buildNote({
  id: "n_1",
  title: "Hosting decision",
  summary: "Where the site runs.",
  status: "draft",
  content: "The site runs on Render.",
});
const links = [{ id: "n_2", title: "Backup plan", relation: "related" as const }];
const versions = [
  { noteId: "n_1", version: 1, changeNote: "First draft.", author: "human", createdAt: "2026-01-01T00:00:00Z" },
];

function renderDetail() {
  render(
    <MemoryRouter>
      <NoteDetail note={note} versions={versions} links={links} />
    </MemoryRouter>,
  );
}

describe("NoteDetail", () => {
  it("shows the title, summary and content", () => {
    renderDetail();
    expect(screen.getByRole("heading", { level: 1, name: "Hosting decision" })).toBeTruthy();
    expect(screen.getByText("Where the site runs.")).toBeTruthy();
    expect(screen.getByText("The site runs on Render.")).toBeTruthy();
  });

  it("has a section each for details, links and history", () => {
    renderDetail();
    for (const name of ["Content", "Details", "Linked notes", "History"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
    }
  });

  it("shows the linked note and the version", () => {
    renderDetail();
    expect(screen.getByRole("link", { name: /Backup plan/ })).toBeTruthy();
    expect(screen.getByText("First draft.")).toBeTruthy();
  });

  it("offers Verify on a draft", () => {
    renderDetail();
    expect(screen.getByRole("button", { name: "Verify" })).toBeTruthy();
  });
});
