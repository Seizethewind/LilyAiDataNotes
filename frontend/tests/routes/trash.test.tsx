import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import TrashPage from "~/routes/trash";

describe("TrashPage", () => {
  it("lists the deleted notes", async () => {
    render(
      <MemoryRouter>
        <TrashPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Trash" })).toBeTruthy();
    expect(screen.getByRole("status")).toBeTruthy();
    await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(2));
    expect(screen.getByRole("heading", { name: "Sample: Bad import" })).toBeTruthy();
  });
});
