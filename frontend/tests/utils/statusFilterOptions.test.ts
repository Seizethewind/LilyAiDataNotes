import { describe, expect, it } from "vitest";
import { STATUS_FILTER_OPTIONS } from "~/utils/statusFilterOptions";

describe("STATUS_FILTER_OPTIONS", () => {
  it("starts with All, then one option per status", () => {
    expect(STATUS_FILTER_OPTIONS.map((option) => option.value)).toEqual([
      "all",
      "draft",
      "verified",
      "disputed",
      "superseded",
    ]);
  });

  it("uses the same labels as the status chips", () => {
    expect(STATUS_FILTER_OPTIONS.map((option) => option.label)).toEqual([
      "All",
      "Draft",
      "Verified",
      "Disputed",
      "Superseded",
    ]);
  });
});
