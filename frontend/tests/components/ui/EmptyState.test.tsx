import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "~/components/ui/EmptyState";

describe("EmptyState", () => {
  it("shows the title and message", () => {
    render(<EmptyState title="No notes" message="Nothing matches." />);
    expect(screen.getByRole("heading", { name: "No notes" })).toBeTruthy();
    expect(screen.getByText("Nothing matches.")).toBeTruthy();
  });

  it("shows an action when given one", () => {
    render(
      <EmptyState title="No notes" message="Nothing matches.">
        <button type="button">Clear filters</button>
      </EmptyState>,
    );
    expect(screen.getByRole("button", { name: "Clear filters" })).toBeTruthy();
  });
});
