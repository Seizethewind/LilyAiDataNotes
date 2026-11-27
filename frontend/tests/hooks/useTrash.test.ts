import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTrash } from "~/hooks/useTrash";

describe("useTrash", () => {
  it("loads the deleted notes", async () => {
    const { result } = renderHook(() => useTrash());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.notes.map((note) => note.id)).toEqual(["n_t02", "n_t01"]);
  });
});
