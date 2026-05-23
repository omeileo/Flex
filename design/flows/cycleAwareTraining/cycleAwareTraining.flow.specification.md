# Cycle-Aware Training Flow — Screen Specifications

Cycle-synced workout adjustments. Mobile: 390×844.

**Entry points:**

- Onboarding Step 5b (Female, proactive offer)
- Profile → Training profile → **Cycle-aware training** (all users)

Reuses profileSettings patterns; changes trigger optional **plan readapt** prompt.

---

## Screen 1: Onboarding opt-in _(Female branch)_

- Progress: Step 5b of 8 (after sex = Female on Step 5)
- Headline: "Train with your cycle?"
- Subcopy: "Flex can adjust volume and intensity based on your phase — and how you feel each day."
- Hero card (soft rose `#FDF2F8` fill, rose accent bar):
  - Bullets: "Phase-aware coach notes" · "Lighter sessions on low-energy days" · "Private — you control what's shared"
- Primary CTA: **Enable cycle-aware training**
- Secondary link: Not now
- Footnote (gray): "You can turn this on anytime in Profile."

---

## Screen 2: Cycle setup — last period

- Nav: Back · "Cycle setup"
- Headline: "When did your last period start?"
- Subcopy: "We'll estimate your current phase from this."
- Calendar strip (Fitbit pattern): week row with period days highlighted rose
- Date picker area: selected date large display
- CTA: Continue

---

## Screen 3: Cycle setup — lengths

- Nav: Back · "Cycle setup"
- Headline: "Your typical cycle"
- Row: **Average cycle length** · stepper or select (default 28 days)
- Row: **Period length** · select (default 5 days)
- Footnote: "Predictions improve as you log each period."
- CTA: Save & continue → gym setup (onboarding) or Profile (settings path)

---

## Screen 4: Profile hub row _(context frame)_

Shows Profile Settings hub with new WELLNESS row inserted after Injuries:

- **Cycle-aware training** → Screen 5
- Preview when enabled: `Luteal · Day 22 · On` (rose dot accent)
- Preview when off: `Off`
- Visible to **all users** regardless of sex

---

## Screen 5: Cycle settings

- Nav: Back · "Cycle-aware training"
- Section **CYCLE-AWARE TRAINING**
  - Master toggle ON · subcopy: "Flex adjusts your plan based on cycle phase and daily check-ins."
- Section **YOUR CYCLE**
  - Last period start · `Mar 3, 2026` chevron
  - Cycle length · `28 days`
  - Period length · `5 days`
  - Hormonal contraception · `None` _(optional)_
- Section **DATA SOURCES**
  - **Manual logging** · checkmark · Active
  - **Apple Health** · `Coming soon` · disabled row (phase 2)
  - **Health Connect** · `Coming soon` · disabled row (phase 2)
- Section **TRACKING**
  - Customize symptoms → Screen 6
- Footer: privacy note + **Delete cycle data** (destructive)
- Toggle OFF → branch confirmation sheet

---

## Screen 5b: Health sync settings _(phase 2 branch)_

- Nav: Back · "Apple Health"
- Icon + headline: "Connect Apple Health"
- Copy: "Import period history and symptoms logged in Apple Health. Flex never writes to Health without permission."
- Primary: Connect Apple Health
- Secondary: Not now
- Connected state: Last synced · Disconnect

---

## Screen 6: Customize symptoms

- Nav: Back · "Customize symptoms"
- Subcopy: "Choose what appears in your daily check-in."
- Toggle rows (Clue pattern):
  - Energy · ON
  - Cramps · ON
  - Flow intensity · ON
  - Mood · ON
  - Bloating · ON
  - Headache · OFF
  - Breast tenderness · OFF
- CTA: Save

---

## Screen 7: Daily log sheet _(branch over Today)_

- Sheet handle + title: "How are you feeling?"
- Subheader: `Cycle Day 22 · Luteal phase`
- Section **Energy**: Low · **Normal** · High (icon chips)
- Section **Symptoms**: Cramps · Bloating · Fatigue · None (multi)
- Section **Flow** _(if on period)_: Spotting · Light · Medium · Heavy
- CTA: Save
- On save with low energy → lighter workout confirm branch

---

## Screen 8: Today — cycle active

Extends Training Plan Today (Step 8):

- Header row: chips `🏠 Home Gym ▾` + `Luteal · Day 22 ▾` (rose tint chip)
- Week strip unchanged
- Workout cards unchanged
- Coach note (rose left accent): "You're in your luteal phase — we'll keep intensity moderate. Log how you feel if energy shifts."
- Link row: **+ Log how you feel**
- Start workout CTA
- Tab bar: Today active

---

## Screen 9: Today — period day

Same as Screen 8 with menstruation styling:

- Phase chip: `Period · Day 2` (rose fill chip)
- Coach note: "Take it easier today — we reduced leg volume by one set and swapped jump work for low-impact options."
- Workout card subtitle shows adjustment badge: "Adjusted for cycle"

---

## Screen 10: Plan readapt prompt _(branch)_

- Bottom sheet
- Title: "Update your plan?"
- Copy variants:
  - Enable: "Flex can readapt your remaining weeks for cycle-aware training."
  - Data change: "You updated cycle settings. Readapt the rest of your plan?"
- Primary: Readapt plan
- Secondary: Keep current plan

---

## Branch: Toggle off confirmation

- Sheet: "Turn off cycle-aware training?"
- Copy: "Predictions pause and cycle info hides from Today. Your logged data is kept."
- Primary: Turn off · Secondary: Cancel

---

## Branch: Profile opt-in (non-female path)

- Same as Screen 5 with toggle OFF → user enables → jumps to Screens 2–3 setup wizard
- No onboarding Step 5b shown

---

## Branch: Lighter workout confirm

- Sheet after low-energy log
- "Adjust today's workout?"
- Options: Lighter session · Keep planned · Skip today

---

## Data model (client notes)

### CycleProfile

| Field                 | Type     | Notes                                       |
| --------------------- | -------- | ------------------------------------------- |
| `enabled`             | boolean  | Master toggle                               |
| `lastPeriodStartAt`   | ISO      |                                             |
| `avgCycleLengthDays`  | number   | default 28                                  |
| `avgPeriodLengthDays` | number   | default 5                                   |
| `contraception`       | enum?    | none, combined, progestin_only, other       |
| `trackedSymptoms`     | string[] | SymptomCategory ids                         |
| `dataSource`          | enum     | manual (v1 default)                         |
| `healthSync`          | object?  | phase 2 — provider, connected, lastSyncedAt |

### CycleDailyLog

| Field      | Type                                 |
| ---------- | ------------------------------------ |
| `date`     | ISO                                  |
| `energy`   | low \| normal \| high                |
| `flow`     | spotting \| light \| medium \| heavy |
| `symptoms` | string[]                             |
| `mood`     | string[]                             |

### ComputedCycleState

| Field             | Type                                              |
| ----------------- | ------------------------------------------------- |
| `phase`           | menstruation \| follicular \| ovulation \| luteal |
| `cycleDay`        | number                                            |
| `daysUntilPeriod` | number?                                           |

### sexAtBirth

On fitness profile: `female` \| `male` \| `prefer_not_to_say` — drives onboarding offer only, not feature access.

---

## Plan integration

- Plan generator payload adds `cycleContext` when `enabled`
- Phase rules:
  - **Menstruation:** −10–20% volume, low-impact swaps
  - **Follicular:** normal-to-higher intensity
  - **Ovulation:** peak strength; joint laxity note
  - **Luteal:** moderate volume; recovery if energy low
- Daily log overrides phase defaults for today's session
- Store in `fitness_profiles.preferences.cycle` initially

---

## Components

- **CyclePhaseChip** — rose-tint pill, phase + day
- **SymptomLogChip** — circular icon grid item
- **CycleCalendarStrip** — week row with period highlight
- Reuse: **ProfileSectionRow**, **PrimaryButton**, **CoachNote**, **SelectionCard**
