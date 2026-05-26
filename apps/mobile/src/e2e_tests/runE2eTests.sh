#!/usr/bin/env bash
# Loads src/e2e_tests/e2e.env (if present) and runs Maestro from apps/mobile.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MOBILE_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
ENV_FILE="${SCRIPT_DIR}/e2e.env"

if [[ -f "${ENV_FILE}" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
fi

cd "${MOBILE_ROOT}"

MAESTRO_ARGS=()
has_platform=false
for arg in "$@"; do
  case "${arg}" in
    -p|--platform|-p=*|--platform=*)
      has_platform=true
      break
      ;;
  esac
done

if [[ "${has_platform}" == false ]]; then
  if [[ -n "${MAESTRO_PLATFORM:-}" ]]; then
    MAESTRO_ARGS+=(-p "${MAESTRO_PLATFORM}")
  elif xcrun simctl list devices booted 2>/dev/null | grep -q Booted; then
    MAESTRO_ARGS+=(-p ios)
  fi
fi

if [[ $# -eq 0 ]]; then
  maestro test "${MAESTRO_ARGS[@]}" src/e2e_tests/
else
  maestro test "${MAESTRO_ARGS[@]}" "$@"
fi
