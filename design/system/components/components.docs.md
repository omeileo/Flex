# Component Designs

Reusable UI primitives for Flex mobile. Each component file defines a `reusable: true` master frame plus `ref` instances showing every state.

## Files

| Component | File | Maps to |
|-----------|------|---------|
| Button | `button.component.design.pen` | `Button` (primary, secondary, tertiary, destructive, icon-left, disabled, loading) |
| SelectionCard | `selectionCard.component.design.pen` | `SelectionCard` (default, selected, multi-select, disabled) |
| ProgressHeader | `progressHeader.component.design.pen` | `ProgressHeader` (start, mid, end stepper states) |
| CoachNote | `coachNote.component.design.pen` | `CoachNote` (info, warning, encouragement, inline tip) |
| PillTabBar | `pillTabBar.component.design.pen` | `BottomTabBar` (Today / Plan / Coach / Profile, active per tab) |
| WeekStrip | `weekStrip.component.design.pen` | `WeekStrip` (today, completed, scheduled, future) |
| WeekSummaryCard | `weekSummaryCard.component.design.pen` | `WeekSummaryCard` (current, past, future/deload) |
| WorkoutCard | `workoutCard.component.design.pen` | `WorkoutCard` (default per modality, completed, upcoming) |
| ScreenHeader | — | `ScreenHeader` (back + title nav bar) |
| SecondaryButton | `button.component.design.pen` | `SecondaryButton` (secondary, destructive variants) |
| ThemePicker | — | `ThemePicker` (Light / Dark / Gym Girlie preview cards) |
| ThemeSwatchRow | — | `ThemeSwatchRow` (inline hub swatches) |
| MovementRestrictionChip | — | `MovementRestrictionChip` (injury restriction multi-select) |
| ExerciseExcludeRow | — | `ExerciseExcludeRow` (global exclude toggle row) |
| CyclePhaseChip | — | `CyclePhaseChip` (cycle phase pill) |
| SymptomLogChip | — | `SymptomLogChip` (daily log symptom selector) |
| CycleCalendarStrip | — | `CycleCalendarStrip` (week row period highlights) |
| StatCard | — | `StatCard` (progress metric tile) |

## Token Parity

All component files use the same themed variables defined in `../tokens/color.tokens.design.pen` (themes: `light`, `dark`, `pink`). New flow files inherit the full themed token set so any screen renders correctly when the `mode` axis flips.

## Using Components in Flows

**Pencil constraint:** components cannot be referenced across `.pen` files — each flow file needs a local copy of the components it uses. Pattern:

1. In a flow `.pen` file, **paste the component master frame** (the one with `reusable: true`) into a dedicated "Component shelf" section, placed to the right of all the screens.
2. Inside a screen, use `type: "ref"` pointing at the local master to drop an instance.
3. Customize per instance via the `descendants` override map.

```jsonc
{
  "type": "ref",
  "ref": "cmpBtnPrimary",
  "name": "Button: CTA",
  "descendants": {
    "btnLabel": { "content": "Generate plan" }
  }
}
```

## State Coverage Required

Each component file shows:

- Default
- All variant states (selected / completed / active / loading)
- Disabled
- Theme-aware: tokens, not hardcoded hex

Annotate critical frames with `StyleConstants` token paths in screen specs.

## Adding a Component

Use the `create-component-design` skill or follow the structure in `button.component.design.pen`:

- Top-level header frame (title + description)
- Component master frame (`reusable: true`, name = `component/<Name>`)
- Ref instances showing variant states with `descendants` overrides

Verify with `mcp__pencil__get_screenshot` after edits.
