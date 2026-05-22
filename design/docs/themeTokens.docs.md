# Flex Theme Token Reference

Maps design tokens to `apps/mobile/src/shared/styles/StyleConstants.ts`.

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `colors.background` | `#F7F8FA` | App canvas, screen background |
| `colors.surface` | `#FFFFFF` | Cards, sheets, inputs |
| `colors.textPrimary` | `#111827` | Headlines, workout titles |
| `colors.textSecondary` | `#6B7280` | Metadata, captions |
| `colors.textInverse` | `#FFFFFF` | Text on dark/CTA buttons |
| `colors.accent` | `#111827` | Primary CTA fill (Runna-style black) |
| `colors.accentEnergy` | `#22C55E` | Running/cardio accent bar |
| `colors.accentStrength` | `#6366F1` | Strength accent bar |
| `colors.accentMobility` | `#14B8A6` | Mobility/recovery accent bar |
| `colors.accentConditioning` | `#F59E0B` | HIIT/conditioning accent bar |
| `colors.accentInjury` | `#EF4444` | Injury caution, restricted movement |
| `colors.accentMuted` | `#D8E3FB` | Selected chip background |
| `colors.border` | `#E5E7EB` | Card borders, dividers |
| `colors.error` | `#DC2626` | Errors, validation |
| `colors.warning` | `#F59E0B` | Warnings, deload weeks |
| `colors.success` | `#16A34A` | Completed workouts |

### Workout Card Gradient Bars

Left-edge 4px bar uses modality color at top → `colors.accentEnergy` at bottom for mixed sessions.

## Spacing (8px grid)

| Token | px | Usage |
|-------|-----|-------|
| `spacing.xs` | 4 | Tight inline gaps |
| `spacing.sm` | 8 | Icon-label gaps |
| `spacing.md` | 16 | Screen padding, card padding |
| `spacing.lg` | 24 | Section gaps |
| `spacing.xl` | 32 | Major section breaks |
| `spacing.xxl` | 48 | Flow frame spacing |

## Typography

Font family: **Inter** (fallback SF Pro on iOS).

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `typography.caption` | 12 | 500 | Tab labels, badges |
| `typography.body` | 14 | 400 | Body copy |
| `typography.bodyLarge` | 16 | 400 | Coach messages |
| `typography.title` | 18 | 600 | Card titles |
| `typography.heading` | 22 | 700 | Screen titles |
| `typography.display` | 28 | 700 | Onboarding headlines |

## Border Radius

| Token | px | Usage |
|-------|-----|-------|
| `radii.sm` | 4 | Chips, badges |
| `radii.md` | 8 | Inputs, small cards |
| `radii.lg` | 16 | Workout cards, sheets |
| `radii.pill` | 36 | Tab bar capsule, primary buttons |

## Elevation

| Token | Shadow | Usage |
|-------|--------|-------|
| `elevation.subtle` | `0 1px 3px rgba(17,24,39,0.06)` | Resting cards |
| `elevation.card` | `0 4px 12px rgba(17,24,39,0.08)` | Elevated cards, sheets |
| `elevation.floating` | `0 8px 24px rgba(17,24,39,0.12)` | FAB, modals |

## Motion Principles

| Pattern | Duration | Easing | Usage |
|---------|----------|--------|-------|
| Screen push | 300ms | ease-out | Onboarding step advance |
| Sheet rise | 280ms | cubic-bezier(0.2,0.8,0.2,1) | Week overview bottom sheet |
| Tab switch | 200ms | ease-in-out | Bottom nav |
| Progress fill | 400ms | ease-out | Week segment bar |
| Card press | 120ms | ease-out | Scale 0.98 + opacity |
| Plan regenerate | 600ms | ease-in-out | Skeleton → reveal on AI adjust |

## Component Primitives

- **SelectionCard** — Single/multi goal chips with border highlight
- **ProgressHeader** — Step X of Y + thin progress bar
- **WeekStrip** — Horizontal day selector with today ring
- **WorkoutCard** — Date, title, modality bar, checkbox
- **WeekSummaryCard** — Bordered current week, muted future weeks
- **CoachNote** — Avatar + truncated message
- **PrimaryButton** — Full-width black pill CTA
- **PillTabBar** — 4-tab floating capsule (Today, Plan, Coach, Profile)
