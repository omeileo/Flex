#!/usr/bin/env bash

node src/shared/scripts/monitoring/monitoring.scripts.js "During Build" --continuous &
MONITOR_PID=$!

echo "Starting npm run build..."
npm run build
BUILD_EXIT_CODE=$?

echo "Stopping monitor..."
kill $MONITOR_PID 2>/dev/null || true

exit $BUILD_EXIT_CODE