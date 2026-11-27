import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useNoteLinks } from "~/hooks/useNoteLinks";

describe("useNoteLinks", () => {
  it("loads the links of a note", async () => {
    const { result } = renderHook(() => useNoteLinks("n_001"));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.links.map((link) => link.id)).toEqual(["n_002", "n_003"]);
  });

  it("returns no links for an unknown note", async () => {
    const { result } = renderHook(() => useNoteLinks("nope"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.links).toEqual([]);
  });
});
