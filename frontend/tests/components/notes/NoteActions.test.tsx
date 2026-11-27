import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NoteActions } from "~/components/notes/NoteActions";

describe("NoteActions", () => {
  it("offers Verify on a draft", () => {
    render(<NoteActions status="draft" />);
    expect(screen.getByRole("button", { name: "Verify" })).toBeTruthy();
  });

  it("hides Verify on a verified note", () => {
    render(<NoteActions status="verified" />);
    expect(screen.queryByRole("button", { name: "Verify" })).toBeNull();
  });

  it("disables a button that has no handler", () => {
    render(<NoteActions status="draft" />);
    const verify = screen.getByRole("button", { name: "Verify" }) as HTMLButtonElement;
    expect(verify.disabled).toBe(true);
  });

  it("calls the handlers", () => {
    const onVerify = vi.fn();
    const onDelete = vi.fn();
    render(<NoteActions status="draft" onVerify={onVerify} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole("button", { name: "Verify" }));
    fireEvent.click(screen.getByRole("button", { name: "Move to trash" }));
    expect(onVerify).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
