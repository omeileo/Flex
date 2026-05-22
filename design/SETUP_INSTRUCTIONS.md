# Pencil Setup Instructions

## Prerequisites

1. Install and launch the **Pencil** desktop app
2. Ensure the `user-pencil` MCP server is connected in Cursor
3. Open files from this folder in Pencil (not as plain text)

## Seeded Files (May 2026)

Initial `.pen` files were copied from Budgy as structural seeds. **Replace frame content** with Flex fitness flows using Pencil MCP `batch_design` when the app is connected.

| File | Intended content |
|------|------------------|
| `system/tokens/color.tokens.design.pen` | Flex palette from `themeTokens.docs.md` |
| `system/components/workoutCard.component.design.pen` | Workout card states |
| `flows/onboarding/onboarding.flow.design.pen` | 7 onboarding steps |
| `flows/trainingPlan/trainingPlan.flow.design.pen` | 5 plan presentation steps |

## Frames to Create — Onboarding

Mobile frames: **390×844**, left-to-right at 200px spacing.

1. `Onboarding Flow Step 1: Goal multi-select`
2. `Onboarding Flow Step 2: Injury history body map chips`
3. `Onboarding Flow Step 3: Current injury state`
4. `Onboarding Flow Step 4: Diet preferences`
5. `Onboarding Flow Step 5: Age and fitness level`
6. `Onboarding Flow Step 6: Plan generating loader`
7. `Onboarding Flow Step 7: Plan reveal handoff`

## Frames to Create — Training Plan

1. `Training Plan Flow Step 1: Multi-week plan overview`
2. `Training Plan Flow Step 2: Week overview bottom sheet`
3. `Training Plan Flow Step 3: Today daily workout`
4. `Training Plan Flow Step 4: Weekly progression plan overview`
5. `Training Plan Flow Step 5: AI plan adjustment prompt`

## Variables to Set

Use `set_variables` on each file:

```json
{
  "background": {"type": "color", "value": "#F7F8FA"},
  "surface": {"type": "color", "value": "#FFFFFF"},
  "text-primary": {"type": "color", "value": "#111827"},
  "text-secondary": {"type": "color", "value": "#6B7280"},
  "accent-cta": {"type": "color", "value": "#111827"},
  "accent-energy": {"type": "color", "value": "#22C55E"},
  "accent-strength": {"type": "color", "value": "#6366F1"},
  "spacing-md": {"type": "number", "value": 16},
  "radius-lg": {"type": "number", "value": 16}
}
```

## MCP Workflow

```
open_document → set_variables → batch_design → get_screenshot → export_nodes
```

## Blocker Note

If you see `failed to connect to running Pencil app`, launch Pencil desktop and retry.
