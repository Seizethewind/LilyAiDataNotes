import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { NoteCard } from "~/components/notes/NoteCard";
import { buildNote } from "~/services/api/buildNote";
import { toNoteSummary } from "~/services/api/toNoteSummary";

const note = toNoteSummary(
  buildNote({
    id: "n_9",
    title: "Sample title",
    summary: "Sample summary.",
    status: "verified",
    updatedAt: "2026-01-01T00:00:00Z",
  }),
);

describe("NoteCard", () => {
  it("links to the note", () => {
    render(
      <MemoryRouter>
        <NoteCard note={note} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link").getAttribute("href")).toBe("/notes/n_9");
  });

  it("shows title, summary, status and meta", () => {
    render(
      <MemoryRouter>
        <NoteCard note={note} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Sample title" })).toBeTruthy();
    expect(screen.getByText("Sample summary.")).toBeTruthy();
    expect(screen.getByText("Verified")).toBeTruthy();
    expect(screen.getByText("fact · lilyaidatanotes · 2026-01-01")).toBeTruthy();
  });
});
