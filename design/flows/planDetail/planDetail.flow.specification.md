# Plan Detail Flow — Screen Specifications

Drill-down from Plan tab / Today into **program structure**, **phase rules**, **exact weekly exercises**, and **session start**. Mobile: 390×844.

Reflects real 8–12 week phased plans (Foundation → Strength → Peak) with warm-up + main work blocks.

---

## Step 1: Program overview

- **Nav:** Back · "12-Week Strength + 5K" · share (future)
- **Plan blurb card:** Full coach paragraph — goal, injuries, equipment affordances, running integration
- **Stats row:** 12 weeks · 5 lift days · 2 runs/week · Phase 1 of 3
- **Phase cards (scroll):**
  - **Foundation (W1–4)** — RPE 6–7 · volume build · tap → Step 2
  - **Strength (W5–8)** — RPE 7–8 · +5 lb/week barbell
  - **Peak (W9–12)** — RPE 8–9 · heavy singles/doubles
- **Optional deload note:** "Deload available after Week 8"
- **CTA:** Jump to current week

## Step 2: Phase detail

- **Nav:** Back · "Foundation Phase" · Weeks 1–4
- **Goal block:** "Establish technique, build joint resilience, increase weekly volume"
- **Rules grid:**
  - Intensity: RPE 6–7
  - Progression: +1–2 reps or 2.5–5 lb weekly
  - Rest — compounds: 2–3 min · accessories: 60–120s
- **Training split list:** Day 1 Upper Push · Day 2 Lower · Day 3 Upper Pull · Day 4 Power · Day 5 Hypertrophy
- **Running block (if hybrid):** "2× easy runs — conversational pace, separate from leg days"
- **CTA:** View Week 1 schedule → Step 3

## Step 3: Week schedule — exact exercises

- **Nav:** Back · "Week 1" · chevrons prev/next week
- **Phase pill:** Foundation · RPE 6–7
- **Day cards (5 strength + optional runs):**

| Day | Title                    | Exercise preview                                 |
| --- | ------------------------ | ------------------------------------------------ |
| Mon | Upper Push               | OHP 3×5–8, Incline DB bench 3×10, Flat DB bench… |
| Tue | Lower Strength           | Zercher squat 3×6, RDL 3×8, Bulgarian split…     |
| Wed | Upper Pull               | Pull-ups AMRAP, Barbell row 4×6…                 |
| Thu | Power / Glutes           | Deadlift 4×3, Z-press, Hip thrust…               |
| Fri | Upper Hypertrophy        | Incline DB 3×10, giant set shoulders…            |
| Sat | Easy Run                 | 5K easy — conversational                         |
| Sun | Rest / optional mobility | —                                                |

- Tap day → Step 4
- **Footer:** Week volume · run km totals

## Step 4: Workout day detail (`PlanDetail`)

- **Nav:** Back · "Day 1 — Upper Push" · ⋯
- **Meta:** Week 1 · Foundation · ~55 min · RPE 6–7
- **Coach note:** Session focus one-liner

### Warm-up section (6–8 min)

- Section header with clock icon
- Rows: Band external rotations · Scapular push-ups · Light DB presses

### Main work section

- Exercise rows with modality bar
- Prescription: `Standing Barbell OHP — 3×5–8 (RIR 2–3, strict)`
- Tap row → Step 5

- **Sticky CTA:** **Start workout** → `activeWorkout` pre-start

## Step 5: Exercise detail (`ExerciseDetail`)

- **Nav:** Back · exercise name · ⋯
- **Media:** Video thumbnail
- **Prescription:** `3×5–8 @ 40 kg · RIR 2–3`
- **Phase note:** "Progress to 4×10 by Week 4" (when applicable)
- **Ghost history:** Last session summary
- **Sets table (read-only):** Set # · target reps · target weight
- **Instructions:** Coaching cues (2–3 sentences)
- **Injury note (optional):** "Partial ROM — stop at shoulder discomfort"

---

## Data model hints

```ts
type PlanPhase = {
  name: string
  weekStart: number
  weekEnd: number
  goal: string
  rpeRange: string
  restPolicy: string
  progressionRule: string
}

type PlannedDay = {
  dayLabel: string
  modality: 'strength' | 'run' | 'mobility'
  warmUp?: string[]
  exercises: Array<{ name: string; prescription: string }>
}
```

---

## Screen inventory (Pencil / preview)

1. Program overview + blurb
2. Phase detail (rules + split)
3. Week schedule (exact exercises per day)
4. Workout day detail (warm-up + main)
5. Exercise detail

## Integration

- Parent: `trainingPlan` Steps 6–9
- Child: `activeWorkout` via Start workout
- Profile: injuries, gym locations feed plan blurb bullets
