import { describe, expect, it } from "vitest";
import { listTrash } from "~/services/api/listTrash";

describe("listTrash", () => {
  it("returns only deleted notes, newest deletion first", async () => {
    const trash = await listTrash();
    expect(trash.map((note) => note.id)).toEqual(["n_t02", "n_t01"]);
  });
});
