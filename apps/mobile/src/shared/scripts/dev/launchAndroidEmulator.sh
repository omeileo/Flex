#!/bin/bash

EMULATOR_BIN="${ANDROID_HOME}/emulator/emulator"

if [ ! -f "$EMULATOR_BIN" ]; then
  EMULATOR_BIN="${ANDROID_HOME}/tools/emulator"
fi

if [ ! -f "$EMULATOR_BIN" ]; then
  echo "ERROR: Could not find emulator binary. Make sure ANDROID_HOME is set correctly."
  exit 1
fi

CONNECTED_DEVICES=$(adb devices | grep -E "device$" | wc -l | tr -d ' ')

if [ "$CONNECTED_DEVICES" -gt "0" ]; then
  echo "Device already connected. Skipping emulator launch."
  exit 0
fi

AVD_NAME=$("$EMULATOR_BIN" -list-avds 2>/dev/null | grep -v -E "^(INFO|WARNING|ERROR|VERBOSE|DEBUG)\s+\|" | grep -v "^$" | head -1)

if [ -z "$AVD_NAME" ]; then
  echo "ERROR: No AVDs found. Create one via Android Studio > Virtual Device Manager."
  exit 1
fi

echo "No device connected. Starting emulator: $AVD_NAME"
"$EMULATOR_BIN" "@$AVD_NAME" > /dev/null 2>&1 &
EMULATOR_PID=$!

echo "Waiting for emulator to connect to adb..."
adb wait-for-device

echo "Emulator connected. Waiting for full boot..."

BOOT_COMPLETED=""
ATTEMPTS=0
MAX_ATTEMPTS=60

while [ "$BOOT_COMPLETED" != "1" ] && [ "$ATTEMPTS" -lt "$MAX_ATTEMPTS" ]; do
  BOOT_COMPLETED=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  ATTEMPTS=$((ATTEMPTS + 1))
  sleep 2
done

if [ "$BOOT_COMPLETED" != "1" ]; then
  echo "ERROR: Emulator did not finish booting after $((MAX_ATTEMPTS * 2)) seconds."
  kill "$EMULATOR_PID" 2>/dev/null
  exit 1
fi

echo "Emulator '$AVD_NAME' is ready."
