# Deployment and Data Protection Design

> **Status: design only. Nothing here is implemented or tested yet.**

Hosting target: Render. The main concern is losing data. Backups protect against loss. `SECURITY.md` covers unauthorized access.

## What Render provides

From [Render's backup documentation](https://render.com/docs/postgresql-backups):

- **Free databases have no backups.** No point-in-time recovery and no exports. Whether free databases expire is not stated on that page, so check Render's pricing page before relying on one.
- **Paid databases have point-in-time recovery**: the past 3 days on a Hobby workspace, 7 days on Pro or higher.
- **Manual exports** are kept 7 days.
- Backups are stored in the **same region, on Render**. They do not protect against losing the Render account or database.
- A web service's own disk is wiped on redeploy. Do not keep notes there.

## What each risk needs

| Risk | Protection |
|---|---|
| Bad or deleted notes | Soft delete and version history (`DATABASE.md`) |
| Bad migration or bug wipes tables | Paid point-in-time recovery, and a backup before every migration |
| Render account or database lost | A copy stored with a different provider |
| Data on the server disk | Never rely on it |

## Backup layers

1. **Paid PostgreSQL** from the start.
2. **Frequent incremental upload (every 5 minutes).** Upload only notes changed since the last upload, as a new timestamped file, to storage at a different provider (for example Backblaze B2 or Cloudflare R2). Run it as a background worker (`backend/worker/main.py`).
3. **Nightly full snapshot** to the same off-site storage. Keep 30 daily and 12 monthly *(proposed)*.
4. **Nightly readable export** of every note as Markdown or JSON to a private repository. It can be read with no database at all.
5. **Encryption** of all backup files.

## Restore on boot

On every startup, after migrations:

1. Count the notes.
2. If the database is **empty**, download the latest snapshot and replay the incremental files made after it.
3. If it is **not empty**, restore nothing.

Worst-case loss is about 5 minutes of notes.

## Required guards

1. **A backup of an empty database must never replace good data.** Never overwrite old files; each upload gets a new timestamped name. Refuse to upload when the note count drops sharply *(proposed: more than 20%)*.
2. **Never restore into a non-empty database,** to avoid overwriting newer notes or creating duplicates.
3. **Record deletions.** Soft-deleted notes carry `deleted_at` into backups, so a restore does not bring back trashed notes.
4. **Backup credentials can write files but not delete them.** Keep them in Render environment variables.

## Ready-made tools

- **SQLite:** Litestream replicates changes to S3-style storage and restores on startup.
- **PostgreSQL:** WAL-G or pgBackRest give continuous archiving, but are more complex than a small export script.

The plan of record is a small changed-rows script, because it is easy to understand and test.

## Before and during deploys

- Back up immediately before every migration.
- The application uses a least-privilege database user. Migrations use a separate admin user.

## Testing

- **Monthly restore drill:** restore a snapshot into a scratch database and check that notes are present.
- Deliberately wipe a scratch database and confirm restore-on-boot recovers it.
- Confirm the guards: an empty-database backup is refused, and a restore into a non-empty database does nothing.

An untested backup is not a backup.
