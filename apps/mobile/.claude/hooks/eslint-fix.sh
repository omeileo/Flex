#!/bin/sh
# Auto-fix lint on files Claude just edited.
# CLAUDE_FILE_PATHS is a space-separated list of changed files.

set -eu

if [ -z "${1:-}" ]; then
  exit 0
fi

# Filter to .ts/.tsx files only
files=""
for f in $1; do
  case "$f" in
    *.ts|*.tsx) files="$files $f" ;;
  esac
done

if [ -z "$files" ]; then
  exit 0
fi

# shellcheck disable=SC2086
npx eslint --fix $files >/dev/null 2>&1 || true
