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

## Component Library

Canonical sources live in `design/system/components/`. Each component file has a `reusable: true` master plus refs covering every state.

| Component | File | States |
| --- | --- | --- |
| Button | `button.component.design.pen` | Primary · Secondary · Tertiary · Destructive · IconLeft · Disabled · Loading |
| SelectionCard | `selectionCard.component.design.pen` | Default · Selected · Multi-select · Disabled |
| ProgressHeader | `progressHeader.component.design.pen` | Start · Mid · End |
| CoachNote | `coachNote.component.design.pen` | Info (muted) · Warning (amber) · Encouragement (green) · Inline tip |
| PillTabBar | `pillTabBar.component.design.pen` | Today / Plan / Coach / Profile active |
| WeekStrip | `weekStrip.component.design.pen` | Today filled · Completed dot · Scheduled ring · Future muted |
| WeekSummaryCard | `weekSummaryCard.component.design.pen` | Current · Past · Future/Deload |
| WorkoutCard | `workoutCard.component.design.pen` | Strength · Energy · Mobility · Conditioning · Completed · Upcoming |

### Cross-File Reuse Pattern

Pencil components cannot be referenced across `.pen` files. Each flow file owns a **Component shelf** frame placed to the right of all screens — it holds local copies of the masters the flow needs. Screens drop instances via `type: "ref"` and customize via the `descendants` map.

```jsonc
{ "type": "ref", "ref": "<local-master-id>", "descendants": { "<child-id>": { "content": "…" } } }
```

Shelves currently live in: `trainingPlan` (`x:3700`), `onboarding` (`x:6650`), `activeWorkout` (`x:4880`). When wiring a new flow, paste the master frames from `design/system/components/` into a similar shelf, then build screens from refs.

### Token Parity

All flow `.pen` files mirror the themed variable set defined in `design/system/tokens/color.tokens.design.pen`: every color is themed across `light` / `dark` / `pink`, plus full scales for spacing (`xs`/`sm`/`md`/`lg`/`xl`/`xxl`), radius (`sm`/`md`/`lg`/`pill`), font sizes (`caption` → `display`), and font weights (`regular` → `bold`). Token names match `StyleConstants.ts` keys.

## Agent Workflow

See [workflowGuide.docs.md](workflowGuide.docs.md).
