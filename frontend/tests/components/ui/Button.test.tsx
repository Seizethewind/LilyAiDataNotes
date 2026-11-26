import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "~/components/ui/Button";

describe("Button", () => {
  it("renders its label as a plain button", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.getAttribute("type")).toBe("button");
  });

  it("calls onClick", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("uses the primary variant by default and the ghost variant on request", () => {
    const { rerender } = render(<Button>Save</Button>);
    expect(screen.getByRole("button").className).toContain("ui-button--primary");
    rerender(<Button variant="ghost">Save</Button>);
    expect(screen.getByRole("button").className).toContain("ui-button--ghost");
  });
});
