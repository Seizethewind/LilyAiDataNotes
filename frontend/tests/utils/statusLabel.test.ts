import { describe, expect, it } from "vitest";
import { NOTE_STATUSES } from "~/types/noteStatus";
import { statusLabel } from "~/utils/statusLabel";

describe("statusLabel", () => {
  it.each(NOTE_STATUSES)("%s has a capitalised label", (status) => {
    expect(statusLabel(status)).toBe(status[0].toUpperCase() + status.slice(1));
  });
});
