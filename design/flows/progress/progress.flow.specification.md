# Progress Flow — Screen Specifications (MVP stub)

Light metrics tab per `docs/flows/progress/flow.md`. Mobile: 390×844. No API beyond aggregated workout session stats (future).

## Step 1: Progress stub (`Progress`)

- **Header:** "Progress"
- **Subcopy:** MVP scope — basic stats only; advanced analytics deferred
- **Stat grid (2×2):**
  - Workouts completed (period)
  - Total volume logged (kg)
  - Current streak (days)
  - Personal records count
- **Weekly volume chart:** Simple bar chart (placeholder data); label "Coming soon: strength score by muscle group"
- **Tab bar:** Today · Plan · **Progress** (active) · Profile

## Out of scope (post-MVP)

- Muscle-group strength score (Fitbod pattern)
- Contribution heatmap (Me+ pattern)
- Export / share
- Date range filters beyond current month

## Mobbin references

- Me+ — badges, streaks, yearly heatmap (future)
- Fi — comparison charts (future)
- Tonal — volume history per exercise (lives in planDetail / exercise detail, not tab)
