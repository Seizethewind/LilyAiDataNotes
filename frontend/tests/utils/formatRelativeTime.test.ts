import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "~/utils/formatRelativeTime";

const now = new Date("2026-11-26T12:00:00Z");

describe("formatRelativeTime", () => {
  it.each([
    ["2026-11-26T11:59:30Z", "just now"],
    ["2026-11-26T11:55:00Z", "5 min ago"],
    ["2026-11-26T09:00:00Z", "3 h ago"],
    ["2026-11-24T12:00:00Z", "2 d ago"],
    ["2026-11-01T08:00:00Z", "2026-11-01"],
    ["2026-11-27T00:00:00Z", "just now"],
  ])("%s -> %s", (iso, expected) => {
    expect(formatRelativeTime(iso, now)).toBe(expected);
  });
});
