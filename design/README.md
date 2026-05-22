# Flex Design System

Design artifacts for the Flex mobile fitness app — AI-assisted multi-week training plans with injury-aware personalization.

## Structure

- `/docs/` — Design system documentation and workflow guides
- `/system/` — Tokens, patterns, and component designs
- `/templates/` — Reusable mobile screen layouts
- `/flows/` — Multi-screen user journeys (onboarding, plan reveal, daily/weekly views)
- `/explorations/` — Design experiments and alternatives
- `/archives/` — Deprecated or historical designs

## Getting Started

1. Read [designSystem.docs.md](docs/designSystem.docs.md) for the token → pattern → component → flow hierarchy
2. Open `.pen` files in Pencil (never edit `.pen` files as plain text)
3. Use Cursor skills under `.cursor/skills/` for scaffolding and validation

## Key Design Files

| File | Purpose |
|------|---------|
| `system/tokens/color.tokens.design.pen` | Color palette and semantic tokens |
| `system/components/workoutCard.component.design.pen` | Workout card primitive |
| `flows/onboarding/onboarding.flow.design.pen` | Goal, injury, diet, age onboarding |
| `flows/trainingPlan/trainingPlan.flow.design.pen` | Plan reveal, daily, weekly, AI adjust |

## Code Integration

Design tokens map to `apps/mobile/src/shared/styles/StyleConstants.ts`. When tokens change in design, sync to code via the `sync-theme-from-design` skill.

## Cursor Integration

- Skills: `.cursor/skills/` (ported from Budgy, adjusted for Flex)
- Rules: `.cursor/rules/design/`

## Build Exclusions

Add `.design.pen` to any future build/lint ignore lists if the mobile app gains stricter tooling.
