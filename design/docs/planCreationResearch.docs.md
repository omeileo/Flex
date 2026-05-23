# Plan Creation & Detail — Competitive Research

Mobbin iOS deep search (May 2026). Goal: unify **Runna-style multi-week programming** with **Fitbod-style strength prescriptions**, plus explicit plan blurbs for goals, injuries, equipment affordances, and optional running.

## Runna — plan creation & presentation

| Pattern                                                                           | Use in Flex                                                                                  |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Plan Introduction** screen with coach avatar + speech bubble                    | Plan blurb after generation; explains phase goal, injury accommodations, running integration |
| **"Your plan is customized based on these details"** bullet recap before Generate | Inputs recap screen — surfaces profile, injuries, gym equipment, running goal                |
| **Conversational support chat** (Sam / CX)                                        | AI coach chat during creation; user can refine niche goals (trail run + strength)            |
| **Plan nearly ready** summary — duration, race/goal, schedule constraints         | Pre-generate confirmation with 12-week arc + 5 lift days + 2 runs                            |
| **Workout detail** — Warm-Up / Main / Cool-down numbered cards + coach note       | Day detail: warm-up block + main work list                                                   |
| **Today + Plan Overview** with week strip                                         | Existing trainingPlan flow — extend with phase labels                                        |

## Fitbod — strength programming

| Pattern                                                                  | Use in Flex                                                                                         |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **Upcoming workouts** — muscle groups, exercise comma-list, volume stats | Week view listing exact exercises per day (not just "Push Day")                                     |
| **Calculating workout…** skeleton                                        | AI generation loading state                                                                         |
| **Weekly workout goal** — days/week + day picker                         | Already in onboarding; echo in plan recap                                                           |
| Daily adaptive model (not fixed calendar)                                | Flex uses **fixed 8–12 week blocks** with readaptation — closer to user's current spreadsheet plans |

## User's real plan model (reference)

Flex plans should support structures like the internal **8–12 Week Workout Progression**:

- **Phases** (3×): Foundation (W1–4), Strength (W5–8), Peak (W9–12) — each with goal, RPE band, rest defaults, progression rule
- **Training days** (5×/week): Upper Push, Lower Strength, Upper Pull, Power/Glutes, Upper Hypertrophy
- **Session structure**: Warm-up (6–8 min, named moves) + Main work (exercise, sets×reps, RIR/RPE notes)
- **Affordances**: e.g. rack-free Zercher squats, partial-ROM incline fly for shoulder tolerance
- **Optional deload week**: −30–40% load, −2 sets, RPE 5–6
- **Running (optional)**: separate Runna-style sessions on non-lift days or easy runs — unified in one plan object

## Flex unified plan object (design)

Every generated plan includes:

1. **Plan blurb** (2–4 sentences): primary goal, phase intent, injury/equipment constraints applied, running goal if any
2. **Inputs used** (bullet list): goals, managed injuries, active gym + missing equipment avoided, days/week, running distance/pace target
3. **Phase blocks**: name, week range, intensity, rest policy, progression rule
4. **Weeks**: 5–7 sessions with modality (strength | run | mobility)
5. **Day detail**: warm-up items + main exercises with full prescription strings

## Mobbin references

- Runna — Plan Introduction, Generate my plan recap, coach chat, workout segment cards
- Fitbod — Upcoming workouts exercise list, calculating state, weekly schedule

## Design decisions

1. **Plan creation** lives in `trainingPlan` flow (empty → options → AI chat → recap → generate → introduction)
2. **Plan drill-down** lives in `planDetail` flow (program → phase → week → day → exercise)
3. **Hybrid plans** show both strength days and run days on week strip with modality colors (indigo strength, green run)
4. **Blurb is persistent** — visible on Plan tab overview and Plan Introduction, not hidden after first view
