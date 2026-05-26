# Profile navigation reconcile — session_20260526002256

## Iteration 1

### Root cause
`MainTabs.navigator.tsx` mounted `Profile.container` directly on the Profile tab. All profile sub-screens live in `ProfileStackNavigator`, so `navigation.navigate('WellnessOverview')` (and every other stack route) was unhandled.

### Changes
1. **Navigation fix:** Profile tab now uses `ProfileStackNavigator` with `headerShown: false` on the tab screen.
2. **New screens:** `DietPreferences` and `AgeFitness` containers added and registered in `ProfileStack`.
3. **Profile hub:** Diet/age rows wired to navigation; previews read from `profile.preferences` when available.
4. **Maestro:** Updated profile flows to handle already-authenticated app state; extended `profileSettingsNavigation` to assert wellness + goals navigation.

### Tests
- `npm test -- --testPathPattern=Profile` — 6 suites, 7 tests passed.

### Maestro
- iOS `profileSettingsNavigation.flow.maestro.yaml` — failed (XCTest driver `Connection refused` on simulator port 7001).
- Screenshots not captured for initial/final audit on this run.

### Design
- Existing Pencil flow: `design/flows/profileSettings/profileSettings.flow.design.pen` (hub + all sub-screens including diet/age).
- No new Pencil frames required for this session.

### Parity status
**No** — navigation fix verified by code review + unit tests; visual Maestro audit blocked by simulator infra.
