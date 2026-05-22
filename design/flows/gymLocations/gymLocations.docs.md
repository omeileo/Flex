# Gym Locations Flow

Settings path for managing workout locations and per-location equipment.

## Screens

1. **Locations list** — all gyms, default badge, add entry point
2. **Location detail** — edit name, notes, preset, equipment row, delete
3. **Equipment editor** — predefined checklist + search + categories
4. **Custom equipment modal** — add non-catalog items
5. **Add location** — create flow (name → equipment)
6. **Confirm dialogs** — delete / set default

## Design file

`gymLocations.flow.design.pen`

## Onboarding overlap

Steps 6–9 in `onboarding.flow.specification.md` mirror the create + equipment pattern; keep visual parity between onboarding frames and settings frames.

## Integration

- Redux/profile: `workoutLocations` slice (future)
- Training plan Today tab: `activeLocationId` + equipment mismatch sheet
- Plan API: pass `defaultLocation.equipment[]` on generate/regenerate

## Research

See `design/docs/gymLocationsResearch.docs.md`.
