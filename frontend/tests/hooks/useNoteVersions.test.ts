import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useNoteVersions } from "~/hooks/useNoteVersions";

describe("useNoteVersions", () => {
  it("loads versions newest first", async () => {
    const { result } = renderHook(() => useNoteVersions("n_001"));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.versions.map((entry) => entry.version)).toEqual([3, 2, 1]);
  });

  it("returns no versions for a note without history", async () => {
    const { result } = renderHook(() => useNoteVersions("n_008"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.versions).toEqual([]);
  });
});
