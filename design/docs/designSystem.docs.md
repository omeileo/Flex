# Flex Design System Overview

Flex is an AI-assisted fitness app that builds multi-week training plans toward a goal while respecting injuries, diet, age, and fitness level. The UI is **clean, minimal, and premium** with **strategic color punches** on workout type accents and CTAs.

## Philosophy

```
Tokens → Patterns → Components → Templates → Flows
```

- **Tokens** — Raw values (color, type, spacing, radius, elevation, motion)
- **Patterns** — Reusable treatments (selection cards, progress bars, coach messages)
- **Components** — Implementable UI (workout card, week strip, pill tab bar)
- **Templates** — Screen shells (Today, Plan Overview, Onboarding step)
- **Flows** — End-to-end journeys documented in `.flow.design.pen` files

## Visual Direction

Inspired by Runna (plan progression, Today-first), Fitbod (adaptive strength), Tonal (goal cards), and Alan (injury intake).

| Principle        | Application                                                 |
| ---------------- | ----------------------------------------------------------- |
| Minimal chrome   | White/off-white surfaces, generous whitespace               |
| Strong hierarchy | Bold titles, muted metadata, one primary CTA per screen     |
| Color punches    | Left-edge gradient bars on workout cards by modality        |
| Coach presence   | Small avatar + short contextual message on plan screens     |
| Progress clarity | Week X/Y selector, segmented week progress, today highlight |

## File Naming

`{name}.{type}.design.pen`

Types: `tokens`, `patterns`, `component`, `template`, `flow`, `exploration`

## Frame Naming

```
<Frame Name>: <Description> [- Final]
```

Examples:

- `Onboarding Flow Step 3: Injury history multi-select`
- `Training Plan Flow Step 5: Today view with week strip - Final`

## Theme Integration

Flex ships three theme modes: **Light**, **Dark**, and **Gym Girlie** (internal id: `pink`).

| Mode    | UI label   | Default for             |
| ------- | ---------- | ----------------------- |
| `light` | Light      | Manual override         |
| `dark`  | Dark       | Male (onboarding sex)   |
| `pink`  | Gym Girlie | Female (onboarding sex) |

All designs reference themed tokens from `StyleConstants.ts` (see [themeTokens.docs.md](themeTokens.docs.md)). Token swatches and the Appearance picker live in `design/system/tokens/color.tokens.design.pen`.

Pencil files use the `mode` theme axis on frames and `$variable` bindings for theme-aware fills.

## Agent Workflow

See [workflowGuide.docs.md](workflowGuide.docs.md).
