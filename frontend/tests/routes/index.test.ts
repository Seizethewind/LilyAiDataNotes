import { describe, expect, it } from "vitest";
import { loader } from "~/routes/_index";

describe("index route", () => {
  it("redirects to the notes list", () => {
    const response = loader();
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/notes");
  });
});
