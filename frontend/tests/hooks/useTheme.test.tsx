import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTheme } from "~/hooks/useTheme";

describe("useTheme", () => {
  it("throws outside ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow("useTheme must be used inside ThemeProvider");
    spy.mockRestore();
  });
});
