# Database Design

> **Status: design only. Nothing here is implemented yet.** The first version is **text-based data only**.

PostgreSQL is the source of truth. The database must stay usable even if every AI provider is unavailable.

## Core rules

1. Content is never overwritten. Every edit creates a new version row.
2. Deleting is a **soft delete** (`deleted_at`). Trashed notes are hidden from search and from AI clients and can be restored.
3. Embeddings are derived data. They can be rebuilt with any model and are never the source of truth.
4. Every schema change goes through a migration.
5. Related writes happen in one transaction.

## Tables (logical design)

### `notes`

One row per note. Holds the current state.

| Column | Notes |
|---|---|
| `id` | Stable identifier |
| `title`, `summary` | Short text used for scanning and ranking |
| `type` | `fact`, `decision`, `preference`, `procedure`, `log`, `code` |
| `project` | Subject the note belongs to |
| `scope` | `global`, `project`, `agent`, `private` |
| `source`, `author` | Who or what created it |
| `status` | `draft`, `verified`, `disputed`, `superseded` |
| `content` | Current text (UTF-8) |
| `content_hash` | SHA-256 of the normalized content, used to detect duplicates |
| `version` | Current version number |
| `parent_id`, `supersedes_id` | Tree position and replacement link |
| `created_at`, `updated_at`, `verified_at`, `valid_until` | Dates |
| `deleted_at` | Empty unless the note is in the trash |

### `note_versions`

Every saved version, kept forever (until the trash is purged): `note_id`, `version`, `content`, `change_note`, `edited_by`, `created_at`. The `change_note` records **why** the change was made.

### `note_links`

Edges between notes: `from_id`, `to_id`, `kind` (`related`, `contradicts`, `part_of`, `replaces`). This table also feeds the future graph view.

### `chunks`

Derived from note content for search: `note_id`, `version`, `position`, `heading_path`, `text`, `context_prefix`, `search_vector`. Rebuilt whenever a note changes. An `embedding` column is added later, only when keyword search proves insufficient.

### `api_keys`

`id`, `name`, `key_hash` (never the key itself), `scope` (`read` or `read+write`), `created_at`, `last_used_at`, `revoked_at`.

### `audit_log`

Append-only record of writes, deletes, restores, verifications and key changes: who, what, when, which key or session.

## Indexes

- Full-text search (GIN) on `chunks.search_vector`.
- B-tree on `notes(project, type, status, deleted_at)`.
- Unique index on `content_hash` within a project, to block duplicates.
- Vector index (pgvector) only after embeddings are added.

## Search stages

1. **Filter** by metadata: project, type, status, dates, not deleted.
2. **Match** text with PostgreSQL full-text search. Add vector search later.
3. **Rank**: verified above draft above disputed or superseded; newer above older; boost matches in titles and summaries.
4. **Expand**: attach neighbouring chunks and the parent note's summary.
5. **Return** IDs, titles, summaries and snippets. Full text is fetched separately by ID.

Searching summaries first and chunks second scales better than searching all raw text.

## Deep topics and versions

Two different things are called "version", and they are stored differently:

- **Edit history** (a correction): same note, new row in `note_versions`.
- **Topic evolution** (design v1, then v2, then v3): separate notes linked by `supersedes_id`. The old note becomes `superseded`, stays searchable, and ranks lower by default.

A topic has an overview note, kept current, that lists its children with one-line summaries and the reason for each change. Search results show a breadcrumb such as `Topic > v3 > Section`.

## Trash

Deleting sets `deleted_at`. Restoring clears it. Emptying the trash, or an automatic purge after a retention period *(proposed: 30 days)*, removes rows for good. Only a signed-in human can empty the trash.

## Open questions

- SQLite or PostgreSQL for the very first version. PostgreSQL is the plan of record; SQLite (with full-text search) is a lighter option if hosting cost or memory is a problem.
- Whether `scope` and `project` should be one field.
