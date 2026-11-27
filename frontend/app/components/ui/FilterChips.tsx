import "./FilterChips.css";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
}

export function FilterChips({ options, selected, onSelect, label = "Filters" }: FilterChipsProps) {
  return (
    <div className="ui-filter-chips" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="ui-filter-chip"
          aria-pressed={option.value === selected}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
