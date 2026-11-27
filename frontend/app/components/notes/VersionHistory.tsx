import type { NoteVersion } from "~/types/noteVersion";
import { formatRelativeTime } from "~/utils/formatRelativeTime";
import "./VersionHistory.css";

// Newest first, as given. Old versions are never overwritten, so this is the full trail.
export function VersionHistory({ versions }: { versions: NoteVersion[] }) {
  if (versions.length === 0) {
    return <p className="version-history__empty">No version history yet.</p>;
  }
  return (
    <ol className="version-history">
      {versions.map((entry) => (
        <li key={entry.version} className="version-history__item">
          <span className="version-history__version">{`v${entry.version}`}</span>
          <span>{entry.changeNote}</span>
          <span className="version-history__meta">
            {`${entry.author} · ${formatRelativeTime(entry.createdAt)}`}
          </span>
        </li>
      ))}
    </ol>
  );
}
