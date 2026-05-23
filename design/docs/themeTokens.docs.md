# Flex Theme Token Reference

Maps design tokens to `apps/mobile/src/shared/styles/StyleConstants.ts`.

Flex supports **three theme modes**: `light`, `dark`, and `pink` (displayed as **Gym Girlie** in the UI).

## Theme Defaults (Onboarding)

| Sex (onboarding) | Default theme | UI label   |
| ---------------- | ------------- | ---------- |
| Male             | `dark`        | Dark       |
| Female           | `pink`        | Gym Girlie |

Users can override anytime in **Profile → Appearance**. Light is always available as a manual choice.

## Theme Axis

Pencil variable theming uses axis `mode` with values: `light`, `dark`, `pink`.

Design reference: `design/system/tokens/color.tokens.design.pen`

---

## Surface & Text Tokens (per theme)

| Token                  | Light     | Dark      | Gym Girlie |
| ---------------------- | --------- | --------- | ---------- |
| `colors.background`    | `#F7F8FA` | `#0F1117` | `#FFF0F5`  |
| `colors.surface`       | `#FFFFFF` | `#1A1F2E` | `#FFFBFC`  |
| `colors.textPrimary`   | `#111827` | `#F9FAFB` | `#3B1229`  |
| `colors.textSecondary` | `#6B7280` | `#9CA3AF` | `#9D6280`  |
| `colors.textInverse`   | `#FFFFFF` | `#111827` | `#FFFFFF`  |
| `colors.accent` (CTA)  | `#111827` | `#F9FAFB` | `#DB2777`  |
| `colors.accentMuted`   | `#D8E3FB` | `#2D3748` | `#FFD6E8`  |
| `colors.border`        | `#E5E7EB` | `#374151` | `#F5C6DE`  |

### Gym Girlie direction

Light pink canvas with punchy magenta CTA (`#DB2777`). Inspired by Gentler Streak / Fitbod coral accents and PlayStation Nova Pink — feminine without being washed out.

### Dark direction

Deep charcoal canvas with white CTAs. Inspired by Fitbod, Gymshark Training, and MacroFactor dark previews.

Modality accent colors (`accentEnergy`, `accentStrength`, etc.) are **shared across all themes** for workout-type recognition.

## Semantic Tokens (shared)

| Token                       | Value     | Usage                               |
| --------------------------- | --------- | ----------------------------------- |
| `colors.accentEnergy`       | `#22C55E` | Running/cardio accent bar           |
| `colors.accentStrength`     | `#6366F1` | Strength accent bar                 |
| `colors.accentMobility`     | `#14B8A6` | Mobility/recovery accent bar        |
| `colors.accentConditioning` | `#F59E0B` | HIIT/conditioning accent bar        |
| `colors.accentInjury`       | `#EF4444` | Injury caution, restricted movement |
| `colors.error`              | `#DC2626` | Errors, validation                  |
| `colors.warning`            | `#F59E0B` | Warnings, deload weeks              |
| `colors.success`            | `#16A34A` | Completed workouts                  |
| `colors.accentCycle`        | `#BE185D` | Cycle phase chip accent             |
| `colors.accentCycleMuted`   | `#F9A8D4` | Cycle chip border / muted accent    |
| `colors.accentCycleSoft`    | `#FDF2F8` | Cycle hero cards, period highlights |

### Workout Card Gradient Bars

Left-edge 4px bar uses modality color at top → `colors.accentEnergy` at bottom for mixed sessions.

## Spacing (8px grid)

| Token         | px  | Usage                        |
| ------------- | --- | ---------------------------- |
| `spacing.xs`  | 4   | Tight inline gaps            |
| `spacing.sm`  | 8   | Icon-label gaps              |
| `spacing.md`  | 16  | Screen padding, card padding |
| `spacing.lg`  | 24  | Section gaps                 |
| `spacing.xl`  | 32  | Major section breaks         |
| `spacing.xxl` | 48  | Flow frame spacing           |

## Typography

Font family: **Inter** (fallback SF Pro on iOS).

| Token                  | Size | Weight | Usage                |
| ---------------------- | ---- | ------ | -------------------- |
| `typography.caption`   | 12   | 500    | Tab labels, badges   |
| `typography.body`      | 14   | 400    | Body copy            |
| `typography.bodyLarge` | 16   | 400    | Coach messages       |
| `typography.title`     | 18   | 600    | Card titles          |
| `typography.heading`   | 22   | 700    | Screen titles        |
| `typography.display`   | 28   | 700    | Onboarding headlines |

## Border Radius

| Token        | px  | Usage                            |
| ------------ | --- | -------------------------------- |
| `radii.sm`   | 4   | Chips, badges                    |
| `radii.md`   | 8   | Inputs, small cards              |
| `radii.lg`   | 16  | Workout cards, sheets            |
| `radii.pill` | 36  | Tab bar capsule, primary buttons |

## Elevation

| Token                | Shadow                           | Usage                  |
| -------------------- | -------------------------------- | ---------------------- |
| `elevation.subtle`   | `0 1px 3px rgba(17,24,39,0.06)`  | Resting cards          |
| `elevation.card`     | `0 4px 12px rgba(17,24,39,0.08)` | Elevated cards, sheets |
| `elevation.floating` | `0 8px 24px rgba(17,24,39,0.12)` | FAB, modals            |

Dark and Gym Girlie elevation shadows should use theme-appropriate shadow colors when synced to code.

## Motion Principles

| Pattern         | Duration | Easing                      | Usage                          |
| --------------- | -------- | --------------------------- | ------------------------------ |
| Screen push     | 300ms    | ease-out                    | Onboarding step advance        |
| Sheet rise      | 280ms    | cubic-bezier(0.2,0.8,0.2,1) | Week overview bottom sheet     |
| Tab switch      | 200ms    | ease-in-out                 | Bottom nav                     |
| Progress fill   | 400ms    | ease-out                    | Week segment bar               |
| Card press      | 120ms    | ease-out                    | Scale 0.98 + opacity           |
| Plan regenerate | 600ms    | ease-in-out                 | Skeleton → reveal on AI adjust |

## Component Primitives

- **SelectionCard** — Single/multi goal chips with border highlight
- **ProgressHeader** — Step X of Y + thin progress bar
- **WeekStrip** — Horizontal day selector with today ring
- **WorkoutCard** — Date, title, modality bar, checkbox
- **WeekSummaryCard** — Bordered current week, muted future weeks
- **CoachNote** — Avatar + truncated message
- **PrimaryButton** — Full-width pill CTA (theme-aware fill)
- **PillTabBar** — 4-tab floating capsule (Today, Plan, Coach, Profile)
- **ThemePicker** — Three preview cards (Light, Dark, Gym Girlie) with selected border state
- **ThemeSwatchRow** — Inline mini accent swatches for hub preview rows
- **ScreenHeader** — Back + centered title navigation bar
- **SecondaryButton** — Outlined secondary and destructive pill CTAs
- **MovementRestrictionChip** — Injury restriction multi-select chip
- **ExerciseExcludeRow** — Global exclude list row with checkbox
- **CyclePhaseChip** — Rose-tint cycle phase pill
- **SymptomLogChip** — Circular daily log symptom selector
- **CycleCalendarStrip** — Week row with period day highlights
- **StatCard** — Progress tab metric tile

## Mobbin Research Notes

- **MacroFactor** — Theme picker with mini UI preview cards (System / Light / Dark)
- **Any Distance** — Named theme carousel with live preview
- **PlayStation App** — Color swatch list with named themes (Nova Pink reference for Gym Girlie)
- **Fitbod / Gentler Streak** — Dark mode with punchy coral/pink accent CTAs
- **Gymshark Training** — Dark settings with high-contrast selection cards
