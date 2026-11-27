import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusChip } from "~/components/ui/StatusChip";
import { NOTE_STATUSES } from "~/types/noteStatus";
import { statusLabel } from "~/utils/statusLabel";

describe("StatusChip", () => {
  it.each(NOTE_STATUSES)("shows the %s label with its own style", (status) => {
    render(<StatusChip status={status} />);
    const chip = screen.getByText(statusLabel(status));
    expect(chip.className).toContain(`ui-status-chip--${status}`);
  });
});
