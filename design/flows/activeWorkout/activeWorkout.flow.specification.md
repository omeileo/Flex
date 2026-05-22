# Active Workout Flow — Screen Specifications

Strength + conditioning session from **Start workout** through **save / discard**. Mobile: 390×844. Light theme per Flex design system.

## Flow states (summary)

| State | Entry | Exit |
|-------|-------|------|
| `idle` | User on Today / Plan detail | Tap Start workout |
| `preStart` | Start workout | Begin session / Back |
| `active` | Session started | Pause, Finish, or Cancel |
| `resting` | Set marked complete (if auto-rest on) | Timer ends, Skip, or ±adjust |
| `paused` | Pause from header/menu | Resume or End workout |
| `finishing` | Finish workout CTA | Save sheet confirmed |
| `saveReview` | Finish confirmed | Save or Discard |
| `completed` | Save success | Navigate to Today (logged) |
| `abandoned` | Discard / cancel confirmed | Navigate to Today (no log) |

---

## Step 0: Entry — Today / Plan detail

- **Trigger:** Primary CTA **Start workout** on Today (Training Plan flow Step 3)
- **System:** Load planned session snapshot (exercises, prescribed sets/reps/weight, rest defaults, modality)
- **Offline:** If offline, use last cached plan; banner if stale >24h

---

## Step 1: Pre-start brief

- **Header:** Chevron down (minimize — future) · workout title · ⋯ menu
- **Stats row:** Exercise count · est. duration · modality pill (strength / energy / mobility)
- **Coach note (optional):** One-line focus for session
- **Exercise preview list:** Scrollable rows — name, sets×reps, equipment icon; ⋯ per row (swap/delete disabled until active)
- **Warm-up block (optional):** Collapsible “Warm-up” with timed moves
- **Primary CTA:** **Begin workout** (black pill)
- **Secondary:** **Not now** → dismiss to Today without session record

**User actions → system**

| Action | Response |
|--------|----------|
| Begin workout | Create `workoutSession` (API), transition to `active`, start elapsed timer |
| Not now | Pop navigation, no session |
| ⋯ menu | Sheet: Edit equipment profile (future), View plan detail |

---

## Step 2: Active session — exercise focus

- **Header:** Elapsed `MM:SS` · **Pause** · **Finish**
- **Progress:** `Exercise 2 of 8` + segmented bar (completed / current / upcoming)
- **Current exercise card:** Name, video thumbnail + play, target prescription (`3 × 8–10 @ 40 kg`)
- **Set table:**

| Column | Content |
|--------|---------|
| Status | Empty circle → checkmark when logged |
| Set # | 1, 2, 3… |
| Previous | Ghosted last session (e.g. 8 × 38 kg) |
| Reps | Editable numeric |
| Weight | Editable + unit toggle (kg/lb) |
| RPE (optional) | 1–10 after set logged |

- **Row states:** `pending`, `active` (highlight), `completed`, `skipped`
- **Tap check / row:** Log set → haptic → if auto-rest: go to `resting`
- **Add set:** `+ Add set` below table (max 10 sets)
- **Footer strip:** Previous exercise · **Next exercise** (primary when current complete)

**Data captured per set**

```ts
{
  setIndex: number
  reps: number
  weightKg: number | null
  rpe?: number
  completedAt: ISO8601
  isWarmup: boolean
  skipped: boolean
}
```

**Undo:** Snackbar “Set logged” + **Undo** (5s) reverts row to `active`, cancels rest timer if started

---

## Step 3: Rest timer overlay

- **Presentation:** Bottom sheet over dimmed active view (Gymshark / Fitbod pattern)
- **Display:** Large countdown `1:30`, circular or linear progress, label “Rest”
- **Controls:**
  - **Skip** — end rest, focus next set row
  - **−10s / +10s** — adjust remaining (Hevy Live Activity pattern: ±15s)
  - **Pause rest** — freeze countdown (optional v1: skip only)
- **Auto-start:** After set logged when per-exercise rest timer = ON (default from plan)
- **Per-exercise override:** Exercise ⋯ menu → Rest timer ON/OFF · default duration
- **Background:** iOS Live Activity / lock screen widget (phase 2)

---

## Step 4: Pause menu

- **Trigger:** Pause in header or hardware interruption
- **UI:** Full-screen dim + card or bottom sheet
- **Timer:** Session elapsed frozen; rest timer frozen if active
- **Actions:**
  - **Resume** (primary)
  - **Finish workout** → Step 7 pre-save sheet
  - **Cancel workout** → Step 9 confirm
- **Optional:** Music / audio cues link (phase 2)

---

## Step 5: Exercise actions (⋯ menu)

Full-screen or large sheet from active exercise:

| Action | Behavior |
|--------|----------|
| Instructions & video | Inline player or modal |
| **Replace / Swap** | → Step 6 picker; preserve logged sets where sensible |
| **Delete from workout** | Confirm alert; remove exercise from session |
| **Rest timer** | Toggle ON/OFF · edit default seconds |
| **Exclude from future plans** | Flags exercise for AI plan (Fitbod pattern) |
| **Add warm-up sets** | Inserts warmup rows above working sets |
| **Unit** | kg / lb toggle (session-level preference) |
| **Notes** | Free text per exercise |
| **Done** | Return to active view |

**Swipe left on row (Fitbod):** Quick Replace | Delete

---

## Step 6: Swap / add exercise

### Swap picker

- **Search** + filters: muscle group, equipment, injury-safe only
- **AI suggestions:** “Similar to Barbell Squat” chips (3)
- **Row:** Thumbnail, name, equipment; tap selects
- **Confirm:** Replaces current exercise; prescription copied or reset per policy

### Add exercise

- Same picker; append to end of session or insert after current
- **Circuit with below (Peloton):** phase 2 — group as superset

---

## Step 7: Finish — pre-save sheet

- **Trigger:** Finish from header (active or paused)
- **Sheet title:** “Finish and log workout?”
- **Stats:** Duration · Exercises completed · Volume (kg) · Calories (est.)
- **Toggles:** Sync Apple Health · Strava (off by default)
- **Actions:** **Resume** (secondary) · **Review & save** (primary) → Step 8

---

## Step 8: Save workout summary

- **Title:** Save Workout (Runna / Hevy pattern)
- **Editable workout name**
- **Summary stats:** Duration · Volume · Sets
- **Exercise breakdown:** Grouped by block/superset; each line `8 × 40 kg, 8 × 42 kg`
- **Private notes** field
- **Sync toggles** (repeat from sheet)
- **Primary:** **Save** → persist `completeWorkoutSession`, mark Today card complete
- **Destructive:** **Discard workout** (outlined red) → Step 9

**Resume link (Strava):** Top-left **Resume** returns to active if tapped before save

---

## Step 9: Cancel / discard confirmation

- **Alert title:** “Discard this workout?”
- **Copy:** “All logged sets will be lost. This can’t be undone.”
- **Actions:** Cancel (default) · **Discard** (destructive)
- **On discard:** Delete local session draft, API abandon if session id exists, → `abandoned` empty state or Today

---

## Step 10: Abandoned / cancelled state (optional toast screen)

- Brief illustration + “Workout discarded”
- CTA: **Back to Today**
- No history entry

---

## Step 11: Completed success

- **Celebration (light):** Checkmark + “Workout saved”
- **Highlights:** PR badges (phase 2), volume vs plan
- **CTA:** **Done** → Today with completed checkbox

---

## Modal / sheet patterns

| Pattern | Use |
|---------|-----|
| Bottom sheet | Rest timer, week-style pickers, finish pre-save |
| Center modal | Cancel confirm, delete exercise |
| Full-screen push | Swap/add picker, exercise ⋯ menu |
| Snackbar + Undo | Set logged, exercise deleted |

---

## Error & empty states

| Case | UI |
|------|-----|
| Session create fails | Alert + retry; stay on pre-start |
| Save fails | Inline error on save screen + retry; local draft retained |
| No exercises in plan | Block Start; “No workout scheduled” |
| All sets skipped | Warn on finish: “Log at least one set to save” |
| Offline mid-session | Banner “Offline — saving locally”; queue sync on reconnect |

---

## Offline considerations

- Persist session JSON to MMKV every set log / 30s autosave
- Replay `createWorkoutSession` + `completeWorkoutSession` when online
- Conflict: server wins if session already completed elsewhere

---

## Integration points (code)

- `apps/mobile/src/screens/WorkoutSession/` — production session (minimal today)
- `createWorkoutSession` / `completeWorkoutSession` redux slices
- Entry from `PlanDetail` / Today → `Start workout`

---

## Screen inventory (Pencil / preview)

1. Pre-start brief  
2. Active exercise + set logging  
3. Rest timer overlay  
4. Paused menu  
5. Exercise ⋯ / actions sheet  
6. Swap exercise picker  
7. Add exercise picker  
8. Cancel workout confirm  
9. Finish pre-save sheet  
10. Save workout summary  
11. Workout saved success  
12. Discarded / abandoned  
