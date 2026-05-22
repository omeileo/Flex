# Gym Locations Flow (Settings) — Screen Specifications

Manage workout locations after onboarding. Mobile: 390×844. Entry: Profile → Settings → **Workout locations**.

## Step 1: Locations list

- Nav: Back · title "Workout locations"
- Subcopy: "Plans and Today use your default location's equipment."
- Rows (`LocationCard` each):
  - Name + preset badge (Home / Gym / Travel)
  - Equipment count · default star if `isDefault`
  - Chevron → edit
- Empty state: "No locations yet" + CTA Add location
- Footer actions:
  - Primary: Add location
  - Text link: Learn how equipment affects your plan

## Step 2: Location detail / edit

- Nav: Back · title = location name · overflow (⋯): Set as default · Duplicate · Delete
- Section **Details**
  - Name (editable inline)
  - Notes (optional)
  - Preset type (picker)
- Section **Equipment**
  - Row: "Available equipment" · **{n} selected** · chevron → Step 3
  - Toggle: Bodyweight-only workouts at this location
- Section **Danger zone**
  - Delete location (confirm if default or last location)
- Sticky save when dirty

## Step 3: Equipment editor

- Nav: Back · title "Equipment" · subtitle = location name
- Search field: filter predefined catalog
- Category pills (horizontal scroll): All · Free weights · Racks · Machines · Cardio · Accessories
- Chip grid (multi-select) with selected count in header
- Selected summary strip at top (removable chips) — Future pattern
- Footer: **+ Add custom equipment** → Step 4
- Quick actions: Select all common · Clear all
- CTA: Save

## Step 4: Custom equipment modal

- Bottom sheet
- Title: "Add custom equipment"
- Name input (required)
- Category tags (multi chips)
- Optional quantity stepper
- CTA: Add · Cancel
- On add: append to location equipment with `customLabel` + tags; dismiss sheet

## Step 5: Add location (create flow)

- Reuses onboarding Steps 7–8 pattern:
  1. Name + preset type
  2. Equipment checklist
- On save: return to list; prompt "Set as default?" if first location

## Step 6: Delete / default confirm *(branch)*

- Alert: "Delete {name}?" — warns if default ("Choose a new default first")
- Alert: "Set {name} as default?" — updates `activeLocationId` + `isDefault`

---

## Data model (client — not full API)

Same entities as onboarding (`WorkoutLocation`, `EquipmentItem`). Settings flow adds:

| Operation | Behavior |
|-----------|----------|
| List | Sort default first, then alphabetical |
| Delete | Block if only location; reassign default if deleting default |
| Duplicate | Copy name + "(copy)", equipment[], `isDefault: false` |
| Active vs default | `activeLocationId` may differ from default for current session; default used for plan generation |

### Plan generation & Today

- **Plan generation** always uses **default** location equipment unless user explicitly regenerates for another location (future).
- **Today / Start workout** uses **active** location; mismatch prompt before session (see onboarding spec § Training plan integration).

### Predefined equipment catalog (reference)

Grouped ids (server-owned later): `barbell`, `dumbbells`, `kettlebells`, `bench`, `squat-rack`, `cable-machine`, `pull-up-bar`, `resistance-bands`, `treadmill`, `rower`, `leg-press`, `smith-machine`, `ez-bar`, `trap-bar`, `medicine-ball`, `yoga-mat`, `bodyweight-only`.

Custom items: `customLabel` + `categoryTags` only.
