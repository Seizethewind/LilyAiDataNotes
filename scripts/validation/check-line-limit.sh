#!/usr/bin/env bash
# Fails if any tracked non-Markdown file is over 200 lines (CLAUDE.md, Rule 2).
# Exempt: Markdown, generated lock files, and binary assets.
set -euo pipefail

limit=200
status=0

while IFS= read -r file; do
  case "$file" in
    *.md | *package-lock.json | *.lock | *.png | *.jpg | *.jpeg | *.webp | *.ico | *.woff2)
      continue
      ;;
  esac
  [ -f "$file" ] || continue
  lines=$(wc -l < "$file")
  if [ "$lines" -gt "$limit" ]; then
    echo "FAIL: $file has $lines lines (limit $limit)"
    status=1
  fi
done < <(git ls-files)

if [ "$status" -eq 0 ]; then
  echo "OK: no file is over $limit lines"
fi
exit "$status"
