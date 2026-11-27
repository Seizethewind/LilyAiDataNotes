import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { LinkedNotes } from "~/components/notes/LinkedNotes";

const links = [
  { id: "n_5", title: "Old API key note", relation: "supersedes" as const },
  { id: "n_2", title: "Backup plan", relation: "related" as const },
];

describe("LinkedNotes", () => {
  it("links each note with its relation", () => {
    render(
      <MemoryRouter>
        <LinkedNotes links={links} />
      </MemoryRouter>,
    );
    const replaces = screen.getByRole("link", { name: /Replaces/ });
    expect(replaces.getAttribute("href")).toBe("/notes/n_5");
    expect(replaces.textContent).toContain("Old API key note");
    expect(screen.getByRole("link", { name: /Related/ }).getAttribute("href")).toBe("/notes/n_2");
  });

  it("says so when there are no links", () => {
    render(
      <MemoryRouter>
        <LinkedNotes links={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByText("No linked notes.")).toBeTruthy();
  });
});
