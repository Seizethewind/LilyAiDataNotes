import type { Note } from "~/types/note";
import { formatRelativeTime } from "~/utils/formatRelativeTime";
import "./NoteMeta.css";

// The facts an AI (or a person) needs to judge how far to trust a note.
export function NoteMeta({ note }: { note: Note }) {
  const rows: [string, string][] = [
    ["Type", note.type],
    ["Project", note.project],
    ["Scope", note.scope],
    ["Source", note.source],
    ["Author", note.author],
    ["Version", `v${note.version}`],
    ["Updated", formatRelativeTime(note.updatedAt)],
    ["Verified", note.verifiedAt ? formatRelativeTime(note.verifiedAt) : "Not verified"],
  ];
  return (
    <dl className="note-meta">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="label-text">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
