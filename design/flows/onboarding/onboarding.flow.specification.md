# Onboarding Flow — Screen Specifications

Reference for Pencil frames. Mobile: 390×844.

**Step index map:** Steps 1–5 unchanged. Gym setup inserted as **6–9**. Plan generation/reveal renumbered to **10–11** (formerly 6–7).

## Step 1: Goal multi-select

- Progress: Step 1 of 8 (profile + gym), bar ~12% fill `accent-energy`
- Headline: "What's your main goal?"
- Subcopy: "Select all that apply — we'll balance your plan."
- Chips (multi): Build muscle, Lose fat, Improve endurance, Return from injury, General fitness
- CTA: Continue (disabled until ≥1 selected)

## Step 2: Injury history

- Headline: "Any past injuries?"
- Body area chips: Shoulder, Knee, Lower back, Hip, Ankle, Wrist, None
- Subsection: "When did it last flare up?" optional date picker
- Skip link: "No injury history"

## Step 3: Current injury state

- Headline: "How are you feeling now?"
- Radio cards:
  - Fully recovered — no restrictions
  - Managing — some movements to avoid
  - Acute — need modified plan
- If managing/acute: movement restriction multi-select

## Step 4: Diet preferences

- Headline: "Nutrition context"
- Chips: High protein, Plant-based, Calorie deficit, No preference
- Optional: daily calorie target input

## Step 5: Age & fitness level

- Headline: "Tell us about you"
- Age band picker: 18–24, 25–34, 35–44, 45–54, 55+
- Fitness level slider: Beginner → Advanced
- **Sex at birth** segmented: Female · Male · Prefer not to say
- CTA: Continue
- **Branch (Female only):** → Step 5b `cycleAwareTraining` opt-in before Step 6
- Male / Prefer not to say: skip Step 5b; cycle-aware training available later in Profile

## Step 5b: Cycle-aware training opt-in _(Female branch)_

- See [`cycleAwareTraining.flow.specification.md`](../cycleAwareTraining/cycleAwareTraining.flow.specification.md) Screen 1
- Enable → cycle setup (Screens 2–3) → Step 6
- Not now → Step 6

## Step 6: Workout locations intro _(new)_

- Progress: Step 6 of 8
- Headline: "Where do you train?"
- Subcopy: "Flex tailors exercises to equipment at each spot — home, commercial gym, or travel."
- Illustration or icon row: Home · Gym · Hotel
- Coach note: "You can add more locations anytime in Settings."
- CTA: Set up my first location

## Step 7: First location name & type _(new)_

- Progress: Step 7 of 8
- Headline: "Name this location"
- Text field: placeholder "e.g. Home Gym, LA Fitness"
- Optional notes field (collapsed): "Parking, hours, etc."
- Preset cards (single select): Home gym · Commercial gym · Hotel / travel · Custom
- CTA: Continue (disabled until name + preset)

## Step 8: Equipment checklist _(new)_

- Progress: Step 8 of 8
- Location name in subheader (e.g. "Home Gym")
- Subcopy: "Toggle what's available here. Change anytime."
- Horizontal category pills: Free weights · Benches & racks · Machines · Cardio · Accessories
- Grid of equipment chips (multi-select); selected = filled + check
- Row: **+ Add custom equipment** → opens custom modal (Step 8b)
- Quick actions: Select common set · Bodyweight only
- CTA: Save equipment

### Step 8b: Custom equipment modal _(branch)_

- Sheet over Step 8
- Title: "Add custom equipment"
- Fields: Name (required), Category tag (picker), optional notes
- CTA: Add to list · Cancel

## Step 9: Add another location & default _(new)_

- Headline: "Add another spot?"
- List card: Location just created + equipment count (e.g. "12 items")
- Secondary CTA: Add another location → loops to Step 7–8 for additional gyms
- Default location: radio list of saved locations (first location pre-selected)
- Skip: "Just one location for now"
- CTA: Continue to plan

## Step 10: Plan generating _(was Step 6)_

- Centered loader + coach avatar
- Copy: "Flex is building your 8-week plan…"
- Bullets animating: Goals → Injuries → **Equipment** → Schedule

## Step 11: Plan reveal handoff _(was Step 7)_

- Preview card: "Your plan is ready"
- Stats: 8 weeks · 3 days/week · Strength + conditioning
- Subline: "Built for **{defaultLocationName}**"
- CTA: View my plan → links to training plan flow

---

## Data model (client — not full API)

### WorkoutLocation

| Field        | Type            | Notes                                          |
| ------------ | --------------- | ---------------------------------------------- |
| `id`         | string          | Client-generated UUID until sync               |
| `name`       | string          | Required, 1–40 chars                           |
| `notes`      | string?         | Optional free text                             |
| `presetType` | enum            | `home` \| `commercial` \| `travel` \| `custom` |
| `isDefault`  | boolean         | Exactly one default per user                   |
| `equipment`  | EquipmentItem[] | See below                                      |
| `createdAt`  | ISO string      | Audit                                          |

### EquipmentItem

| Field          | Type     | Notes                           |
| -------------- | -------- | ------------------------------- |
| `predefinedId` | string?  | Catalog id when from list       |
| `customLabel`  | string?  | Required if no `predefinedId`   |
| `categoryTags` | string[] | e.g. `free-weights`, `machines` |
| `quantity`     | number?  | Optional (dumbbell pairs, etc.) |

**Invariant:** each item has `predefinedId` OR `customLabel`, not both.

### Plan generation usage

- Onboarding completion sends `defaultLocationId` + full location payloads to profile setup.
- Plan generator filters exercise pool to movements executable with selected equipment at **default location**.
- If user has only bodyweight at default, strength templates bias to bodyweight progressions.

### Training plan integration

- **Today** tab reads `activeLocationId` (defaults to `isDefault` location).
- Before **Start workout**, compare session required equipment vs active location; on mismatch show bottom sheet: switch location · edit equipment · continue anyway (advanced).
- Week plan copy may reference location: "Today's session uses your **Home Gym** setup."
