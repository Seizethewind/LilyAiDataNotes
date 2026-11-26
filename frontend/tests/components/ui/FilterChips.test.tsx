import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FilterChips } from "~/components/ui/FilterChips";

const options = [
  { value: "all", label: "All" },
  { value: "verified", label: "Verified" },
];

describe("FilterChips", () => {
  it("marks only the selected chip as pressed", () => {
    render(<FilterChips options={options} selected="verified" onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: "Verified" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "All" }).getAttribute("aria-pressed")).toBe("false");
  });

  it("reports the chosen value", () => {
    const onSelect = vi.fn();
    render(<FilterChips options={options} selected="all" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Verified" }));
    expect(onSelect).toHaveBeenCalledWith("verified");
  });

  it("labels the group", () => {
    render(<FilterChips options={options} selected="all" onSelect={() => {}} label="Status" />);
    expect(screen.getByRole("group", { name: "Status" })).toBeTruthy();
  });
});
