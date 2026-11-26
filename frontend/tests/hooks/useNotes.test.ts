import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useNotes } from "~/hooks/useNotes";

describe("useNotes", () => {
  it("starts loading, then returns notes", async () => {
    const { result } = renderHook(() => useNotes(""));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.notes).toHaveLength(8);
  });

  it("searches again when the query changes", async () => {
    const { result, rerender } = renderHook(({ query }) => useNotes(query), {
      initialProps: { query: "" },
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    rerender({ query: "render" });
    await waitFor(() => expect(result.current.notes.map((note) => note.id)).toEqual(["n_001"]));
  });

  it("applies filters", async () => {
    const { result } = renderHook(() => useNotes("", { status: "disputed" }));
    await waitFor(() => expect(result.current.notes.map((note) => note.id)).toEqual(["n_007"]));
  });
});
