# Profile & Wellness Settings Flow — Screen Specifications

Post-onboarding profile management. Mobile: 390×844. Entry: **Profile tab** → **Training profile** (or Settings gear).

Reuses onboarding patterns for edit flows; changes trigger optional **plan readapt** prompt.

---

## Screen 1: Profile settings hub

- Nav: title "Training profile" · optional gear for account settings (out of scope)
- Hero card: avatar initials · name · member since
- Section **APP**
  - **Appearance** → Screen 8 · preview: current theme label (Light / Dark / Gym Girlie) + mini swatches
- Section **TRAINING**
  - **Goals & schedule** → Screen 2 · preview: "Build muscle · 3 days/week"
  - **Workout locations** → links `gymLocations` flow · preview: "Home Gym (default) · 3 locations"
- Section **WELLNESS**
  - **Injuries & conditions** → Screen 3 · preview: "2 active · Shoulder, Lower back"
  - **Excluded exercises** → Screen 7 · preview: "5 exercises"
- Section **BODY & NUTRITION**
  - **Diet preferences** → Screen 8 · preview: "High protein · 2,200 kcal"
  - **Age & fitness level** → Screen 9 · preview: "35–44 · Intermediate"
- Footer note (gray): "Changes to wellness or goals may update your plan."
- Sticky when dirty: **Save** (if inline edits) — hub is navigation-only in v1

---

## Screen 2: Goals & schedule

- Nav: Back · "Goals & schedule"
- Multi-select chips (same as onboarding step 1): Build muscle, Lose fat, Endurance, Return from injury, General fitness
- **Experience level** segmented: Beginner · Intermediate · Advanced
- **Days per week** stepper 2–6
- **Session length** chips: 30 · 45 · 60 · 75 min
- CTA: Save
- On save: if plan exists → Screen 10 readapt sheet

---

## Screen 3: Wellness overview

- Nav: Back · "Injuries & conditions"
- Subcopy: "Flex adapts your plan around what you’re managing — including exercises you know cause pain."
- **Active conditions** list (`ConditionCard` each):
  - Body area icon/bar (left accent `accent-injury` when flare-up, `accent-mobility` when managing)
  - Title: "Left shoulder" or custom label
  - Status badge: Managing · Flare-up · Recovered
  - Sub: "3 aggravating exercises · Overhead pressing"
  - Chevron → Screen 4
- Empty: "No conditions tracked" + CTA Add condition
- Primary: **Add condition**
- Text link: **Log today’s pain level** (optional phase 2 — omit in v1 designs)

---

## Screen 4: Condition detail (example: chronic shoulder)

- Nav: Back · "Left shoulder" · overflow: Mark recovered · Delete
- Section **Status**
  - Segmented: Recovered · **Managing** · Flare-up
  - If flare-up: "Last flare-up" date field
- Section **Movement restrictions**
  - Multi chips: Overhead pressing · Horizontal push · Pull-ups · Deep ROM · Impact
  - CTA chip: + Add custom restriction
- Section **Aggravating exercises**
  - Subcopy: "Exercises you know make this worse. Flex won’t recommend them while this condition is active."
  - Rows: exercise name + remove ×
  - Examples: Overhead press, Arnold press, Upright row
  - CTA: **+ Add exercise** → Screen 5
- Section **Notes** (optional textarea): "Rotator cuff — avoid heavy overhead since 2023"
- Section **Coach insight** (read-only card): "We'll favor landmine presses and neutral-grip work for upper body."
- Sticky: Save changes

---

## Screen 5: Add aggravating exercise (sheet)

- Search exercises (catalog)
- Recent / suggested for body area
- Multi-select with checkmarks
- **Add custom exercise name** text field at bottom
- CTA: Add selected · Cancel

---

## Screen 6: Add condition wizard

- Step A: Body area chips — Shoulder, Knee, Lower back, Hip, Ankle, Wrist, Neck, Other
- Step B: Label optional ("Left shoulder", "Chronic L4/L5")
- Step C: Status radio — Recovered · Managing · Flare-up
- Step D: Movement restrictions (same chips as Screen 4)
- Step E: Skip or add aggravating exercises → Screen 5
- CTA: Save condition

---

## Screen 7: Excluded exercises (global)

- Nav: Back · "Excluded exercises"
- Subcopy: "Never recommended in any plan — even without a linked condition."
- Search + filter by muscle group
- List rows: thumbnail · name · equipment · remove
- Fitbod/Bevel pattern: checkmark = excluded
- CTA: + Add exercises
- Link: "Manage per-condition aggravators in Injuries & conditions"

---

## Screen 8: Appearance

- Nav: Back · "Appearance"
- Subcopy: "Choose how Flex looks. Your theme was set from onboarding and can be changed anytime."
- **Theme picker** (MacroFactor-style preview cards):
  - **Light** — manual override
  - **Dark** — male onboarding default
  - **Gym Girlie** — female onboarding default (internal id: `pink`)
- Selected card: 2px border in `$accent-cta`, label in accent color
- Each preview card shows mini UI: "Aa", modality dots, sample CTA bar
- **Your default** info card: explains onboarding-assigned default (e.g. "Gym Girlie · Set from onboarding (Female)")
- Theme change applies immediately — no plan readapt prompt
- Design also includes hub variants in Light, Dark, and Gym Girlie for token validation

---

## Screen 9: Diet preferences

- Same as onboarding step 4: diet chips + optional calorie target
- Save → readapt prompt if macro-sensitive goals

---

## Screen 10: Age & fitness

- Age band picker + fitness slider (onboarding step 5)
- Save

---

## Screen 11: Plan readapt prompt _(branch)_

- Bottom sheet over previous screen
- Title: "Update your plan?"
- Copy: "You changed wellness settings. Flex can readapt the rest of your plan."
- Primary: Readapt plan
- Secondary: Keep current plan

---

## Data model (client notes)

### WellnessCondition

| Field                  | Type          | Notes                                                     |
| ---------------------- | ------------- | --------------------------------------------------------- |
| `id`                   | string        | UUID                                                      |
| `bodyArea`             | enum          | shoulder, knee, lowerBack, hip, ankle, wrist, neck, other |
| `label`                | string?       | "Left shoulder"                                           |
| `status`               | enum          | recovered, managing, flareUp                              |
| `lastFlareUpAt`        | ISO?          | When status = flareUp or history                          |
| `movementRestrictions` | string[]      | Tag ids                                                   |
| `aggravatingExercises` | ExerciseRef[] | predefinedId or customLabel                               |
| `notes`                | string?       | Free text                                                 |
| `createdAt`            | ISO           |                                                           |

### ExerciseRef

| Field          | Type    |
| -------------- | ------- |
| `predefinedId` | string? |
| `customLabel`  | string? |

### GlobalExcludeList

Separate from per-condition aggravators — union of all excluded exercise ids for plan engine.

### Plan integration

- Plan generator: `NOT IN aggravatingExercises UNION globalExcludes` for active conditions (status ≠ recovered)
- Movement restriction tags map to exercise metadata tags server-side
- Profile save → `POST /fitness-profile` → optional `regeneratePlan: true`

---

## Components

- **ProfileSectionRow** — icon, title, preview, chevron
- **ThemePicker** — three preview cards (Light, Dark, Gym Girlie) with selected border state
- **ThemeSwatchRow** — inline mini swatches on hub Appearance row
- **ConditionCard** — status badge, accent bar
- **StatusSegment** — Recovered / Managing / Flare-up
- **MovementRestrictionChip** — multi-select
- **ExerciseExcludeRow** — toggle/check exclude
- Reuse: **SelectionCard**, **PrimaryButton**, **CoachNote**, **FormTextField**
