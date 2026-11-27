import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NoteMeta } from "~/components/notes/NoteMeta";
import { buildNote } from "~/services/api/buildNote";

describe("NoteMeta", () => {
  it("shows the version and author", () => {
    render(<NoteMeta note={buildNote({ id: "n_1", title: "T", version: 3, author: "lily-agent" })} />);
    expect(screen.getByText("v3")).toBeTruthy();
    expect(screen.getByText("lily-agent")).toBeTruthy();
  });

  it("says when a note was never verified", () => {
    render(<NoteMeta note={buildNote({ id: "n_1", title: "T" })} />);
    expect(screen.getByText("Not verified")).toBeTruthy();
  });

  it("shows when a note was verified", () => {
    const note = buildNote({ id: "n_1", title: "T", verifiedAt: "2026-01-01T00:00:00Z" });
    render(<NoteMeta note={note} />);
    expect(screen.getByText("2026-01-01")).toBeTruthy();
  });
});
