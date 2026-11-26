import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchField } from "~/components/ui/SearchField";

describe("SearchField", () => {
  it("shows the value under an accessible label", () => {
    render(<SearchField value="render" onChange={() => {}} />);
    const input = screen.getByLabelText<HTMLInputElement>("Search notes");
    expect(input.value).toBe("render");
  });

  it("reports typed text", () => {
    const onChange = vi.fn();
    render(<SearchField value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledWith("abc");
  });

  it("accepts a custom label", () => {
    render(<SearchField value="" onChange={() => {}} label="Find a topic" />);
    expect(screen.getByLabelText("Find a topic")).toBeTruthy();
  });
});
