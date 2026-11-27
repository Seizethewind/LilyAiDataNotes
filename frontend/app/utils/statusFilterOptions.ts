import type { FilterOption } from "~/components/ui/FilterChips";
import { NOTE_STATUSES } from "~/types/noteStatus";
import { statusLabel } from "~/utils/statusLabel";

// "All" plus one chip per note status, for the filter row on the notes page.
export const STATUS_FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "All" },
  ...NOTE_STATUSES.map((status) => ({ value: status, label: statusLabel(status) })),
];
