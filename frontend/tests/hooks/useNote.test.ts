import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useNote } from "~/hooks/useNote";

describe("useNote", () => {
  it("loads a note by id", async () => {
    const { result } = renderHook(() => useNote("n_001"));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.note?.id).toBe("n_001");
  });

  it("returns null for an unknown id", async () => {
    const { result } = renderHook(() => useNote("nope"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.note).toBeNull();
  });

  it("returns null when there is no id", async () => {
    const { result } = renderHook(() => useNote(undefined));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.note).toBeNull();
  });
});
