import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VersionHistory } from "~/components/notes/VersionHistory";

const versions = [
  { noteId: "n_1", version: 2, changeNote: "Chose Render.", author: "human", createdAt: "2026-01-02T00:00:00Z" },
  { noteId: "n_1", version: 1, changeNote: "First draft.", author: "lily-agent", createdAt: "2026-01-01T00:00:00Z" },
];

describe("VersionHistory", () => {
  it("lists versions in the order given", () => {
    render(<VersionHistory versions={versions} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain("v2");
    expect(items[1].textContent).toContain("v1");
  });

  it("shows each change note and author", () => {
    render(<VersionHistory versions={versions} />);
    expect(screen.getByText("Chose Render.")).toBeTruthy();
    expect(screen.getByText("lily-agent · 2026-01-01")).toBeTruthy();
  });

  it("says so when there is no history", () => {
    render(<VersionHistory versions={[]} />);
    expect(screen.getByText("No version history yet.")).toBeTruthy();
  });
});
