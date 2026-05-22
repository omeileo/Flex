# Active Workout Flow

In-session experience from **Start workout** through logging sets, rest timers, exercise edits, pause/resume, and save or discard.

## Documents

| File | Purpose |
|------|---------|
| `activeWorkout.flow.specification.md` | States, transitions, data model, edge cases |
| `activeWorkout.flow.design.pen` | Pencil frames (390×844) |
| `../../docs/activeWorkoutResearch.docs.md` | Mobbin competitive patterns |

## Steps (happy path)

1. **Pre-start brief** — Review exercises, coach note, Begin workout  
2. **Active exercise** — Set table, log reps/weight, next/previous exercise  
3. **Rest timer** — Auto after set; skip / ±10s  
4. **Pause** — Resume, finish, or cancel  
5. **Exercise menu** — Swap, delete, rest settings, notes  
6. **Finish sheet** — Stats + sync toggles → Review & save  
7. **Save summary** — Name, notes, exercise breakdown, Save / Discard  
8. **Success** — Return to Today (workout marked complete)

## Entry

Training Plan → Today → **Start workout**

## Design file

`activeWorkout.flow.design.pen`

## React Native preview

`apps/mobile/src/screens/DesignPreview/ActiveWorkoutFlowPreview/` — open via Landing → Design Preview Hub.
