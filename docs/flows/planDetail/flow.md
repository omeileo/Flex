# Plan Detail

Five-level drill-down from the Plan tab into program structure, phase rules, weekly exercises, workout day detail, and exercise detail.

## Navigation hierarchy

1. **ProgramOverview** — plan blurb, stats, phase cards
2. **PhaseDetail** — goal, RPE, progression, rest policy, training split
3. **WeekSchedule** — exact exercise preview per day with week prev/next
4. **PlanDetail** — warm-up + main work, coach note, Start workout
5. **ExerciseDetail** — prescription, sets table, instructions, injury note

## Mobile screens

- `ProgramOverview`
- `PhaseDetail`
- `WeekSchedule`
- `PlanDetail`
- `ExerciseDetail`

## Entry points

- Plan tab → View full program → ProgramOverview
- Plan tab → View full week → WeekSchedule
- Plan tab / Today → workout card → PlanDetail (shortcut)
- ProgramOverview → phase card → PhaseDetail → WeekSchedule → PlanDetail → ExerciseDetail

## Data

Wired to `getActivePlan` redux slice via `useActivePlanPresentation` hook.
