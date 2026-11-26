import { useId } from "react";
import "./SearchField.css";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function SearchField({ value, onChange, label = "Search notes" }: SearchFieldProps) {
  const id = useId();
  return (
    <div className="ui-search-field" role="search">
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={label}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
