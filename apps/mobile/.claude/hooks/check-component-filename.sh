#!/bin/sh
# Reject Edit/Write to .tsx files whose name doesn't match the component pattern.
# Pattern: <PascalName>.(component|container|styles|types|validation|tests).tsx

set -eu

if [ -z "${1:-}" ]; then
  exit 0
fi

pattern='^[A-Z][A-Za-z0-9]*\.(component|container|styles|types|validation|tests)\.tsx$'

for f in $1; do
  case "$f" in
    *.tsx)
      base=$(basename "$f")
      if ! echo "$base" | grep -Eq "$pattern"; then
        # Skip test scaffolds and config in repo root
        case "$f" in
          __tests__/*|*.config.*|index.tsx) continue ;;
        esac
        echo "[check-component-filename] Refusing to edit $f — name must match: <Name>.(component|container|styles|types|validation|tests).tsx" >&2
        exit 2
      fi
      ;;
  esac
done

exit 0
