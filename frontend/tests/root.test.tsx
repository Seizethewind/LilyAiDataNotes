import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import App from "~/root";

// Layout (the <html> document) needs a real server render, so only App is tested here.
const Stub = createRoutesStub([
  {
    path: "/",
    Component: App,
    children: [{ index: true, Component: () => <p>Child page</p> }],
  },
]);

describe("App", () => {
  it("wraps the page in the app shell", () => {
    render(<Stub />);
    expect(within(screen.getByRole("main")).getByText("Child page")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy();
  });

  it("provides the theme to the toggles", () => {
    render(<Stub />);
    expect(screen.getAllByRole("button", { name: /theme/ }).length).toBeGreaterThan(0);
  });
});
