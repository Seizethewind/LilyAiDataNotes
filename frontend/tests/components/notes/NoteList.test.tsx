import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { NoteList } from "~/components/notes/NoteList";
import { buildNote } from "~/services/api/buildNote";
import { toNoteSummary } from "~/services/api/toNoteSummary";

const notes = [
  toNoteSummary(buildNote({ id: "n_1", title: "First" })),
  toNoteSummary(buildNote({ id: "n_2", title: "Second" })),
];

describe("NoteList", () => {
  it("shows one card per note", () => {
    render(
      <MemoryRouter>
        <NoteList notes={notes} />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Second" })).toBeTruthy();
  });

  it("shows an empty state when there are no notes", () => {
    render(
      <MemoryRouter>
        <NoteList notes={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "No notes found" })).toBeTruthy();
    expect(screen.queryByRole("list")).toBeNull();
  });
});
