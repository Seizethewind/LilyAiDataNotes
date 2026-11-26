import { describe, expect, it } from "vitest";
import { NOTE_STATUSES } from "~/types/noteStatus";

describe("NOTE_STATUSES", () => {
  it("lists the four statuses from the API design", () => {
    expect([...NOTE_STATUSES]).toEqual(["draft", "verified", "disputed", "superseded"]);
  });
});
