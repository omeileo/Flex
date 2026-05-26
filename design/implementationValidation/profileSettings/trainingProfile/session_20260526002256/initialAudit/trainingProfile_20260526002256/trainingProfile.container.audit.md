# Training Profile Hub — Initial Audit

**Session:** session_20260526002256  
**Design:** `design/flows/profileSettings/profileSettings.flow.design.pen` → Profile settings hub  
**Implementation:** `apps/mobile/src/screens/Profile/Profile.container.tsx` + `ProfileStack.navigator.tsx`

## Summary

| Severity | Count |
| -------- | ----- |
| Blocker  | 1     |
| Major    | 0     |
| Minor    | 0     |

## Findings

| ID | Severity | Area | Finding | Recommended fix |
| -- | -------- | ---- | ------- | --------------- |
| 1 | **Blocker** | Navigation | Profile tab mounted `Profile` directly; `ProfileStackNavigator` routes (`WellnessOverview`, `GoalsAndSchedule`, etc.) not registered → React Navigation "action NAVIGATE was not handled" | Use `ProfileStackNavigator` as Profile tab component |
| 2 | **Blocker** | Navigation | Diet preferences and Age & fitness rows had `onPress={() => undefined}` with no stack routes | Add `DietPreferences` + `AgeFitness` screens to ProfileStack and wire hub rows |

## Status after iteration 1

- Finding 1: **Fixed** — `MainTabs.navigator.tsx` uses `ProfileStackNavigator`.
- Finding 2: **Fixed** — screens implemented and registered; hub navigation wired.

## Remaining

- Maestro screenshot capture (iOS + Android) pending simulator/driver stability for visual parity sign-off.
