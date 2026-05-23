# Training Plan Flow — Screen Specifications

Runna-inspired calendar + Fitbod-style exercise detail. Mobile: 390×844. Supports **8–12 week phased strength plans** with optional **running blocks** in one unified program.

---

## Plan creation (new — Steps 0–5)

### Step 0: Empty state — no active plan

- **Trigger:** Plan tab with no `activePlan`
- **Illustration:** Minimal calendar + dumbbell
- **Headline:** "Build your training plan"
- **Copy:** "Flex combines strength programming and running in one adaptive plan."
- **CTA:** **Create plan** (primary)
- **Secondary:** Import from onboarding profile (if onboarding complete)

### Step 1: Plan focus — modality options

- **Headline:** "What are you training for?"
- **Cards (single select):**
  - **Strength block** — 8–12 week progressive lifting (Fitbod-style prescriptions)
  - **Running goal** — 5K / 10K / half / custom distance (Runna-style)
  - **Hybrid** — lift + run in one calendar (recommended if both selected in profile)
  - **Return from injury** — lower volume, physio-safe progressions
- **CTA:** Continue → Step 2 or profile gaps prompt

### Step 2: AI coach chat

- **UI:** Full-screen chat (Runna CX pattern)
- **Header:** Flex coach avatar · "Plan coach" · Active
- **Starter prompts (chips):** "12-week upper/lower split", "Add 2 easy runs per week", "Shoulder-friendly pressing"
- **Agent collects / confirms:**
  - Week count (8 / 10 / 12)
  - Days per week (lift + run split)
  - Phase emphasis (foundation → strength → peak)
  - Injury accommodations (from profile wellness)
  - Equipment at active gym (from locations)
  - Running goal (distance, race date, current weekly mileage)
- **CTA in composer:** Send · Attach profile summary
- **Exit:** **Review inputs** → Step 3

### Step 3: Inputs recap — before generate

- **Headline:** "Your plan is customized based on these details"
- **Plan title (editable):** e.g. "12-Week Foundation → Peak"
- **Stats row:** 12 weeks · 5 lift days · 2 runs/week
- **Bullet list (from profile + chat):**
  - Goal: Build strength with joint-friendly volume
  - Shoulder: partial-ROM pressing, no behind-neck work
  - Equipment: Home gym — barbell, DBs, pull-up bar; no squat rack (Zercher variants)
  - Running: 2×/week easy 5K progression toward sub-25
  - Schedule: Lift Mon–Fri, run Sat/Sun
- **CTA:** **Generate my plan** (primary)
- **Secondary:** Back to chat

### Step 4: Generating plan

- **Full-screen loader:** "Building your 12-week plan…"
- **Subcopy:** Rotating status — "Applying shoulder constraints", "Scheduling run sessions", "Setting phase progressions"
- **Skeleton:** Week cards pulsing
- **Error:** Retry · Edit inputs

### Step 5: Plan introduction (blurb reveal)

- **Header:** Plan Introduction · back
- **Coach card:** Avatar + "Flex Coach"
- **Blurb (example):**
  > "This 12-week block builds pressing and pulling strength while keeping your shoulder happy — partial-ROM flies, strict OHP, and no rack squats (Zercher focus). Two easy runs each week support your 5K goal without interfering with leg recovery. Weeks 1–4 prioritize technique at RPE 6–7; we'll add load in phases 2 and 3."
- **Phase preview pills:** Foundation · Strength · Peak
- **CTA:** **View full plan** → Step 6 (existing plan overview, enhanced)

---

## Plan presentation (enhanced — Steps 6–10)

### Step 6: Multi-week plan overview

- Header: "Your Plan" + calendar icon
- **Plan blurb card (new):** Collapsed 2-line teaser + "Read more" → Step 5 blurb
- **Phase timeline:** Horizontal pills — Foundation (W1–4) · Strength (W5–8) · Peak (W9–12)
- Stacked week cards; current week bordered
- Each card: week #, date range, phase label, workout count, volume + run distance
- Workout rows: modality dot (strength indigo / run green) + title + duration
- Tab bar: Today | **Plan** | Coach | Profile

### Step 7: Week overview sheet

- Bottom sheet over plan screen
- Title: "Week 3 · Foundation Phase"
- **Phase rules row:** RPE 6–7 · +2.5–5 lb/week · compounds 2–3 min rest
- Stats: Total workouts, volume, run km
- Workout cards with **exercise preview line** (first 3 exercises + count)
- CTA: View full week → `planDetail` week schedule

### Step 8: Today daily workout

- Header: Week 2/12 dropdown + progress ring
- Location chip: active gym
- **Cycle phase chip** _(when cycle-aware training enabled):_ `Luteal · Day 22 ▾` or `Period · Day 2 ▾` — rose tint; tap opens cycle log / settings · see `cycleAwareTraining` Screens 7–9
- Week strip: Mon–Sun with strength + run dots
- Section: "Today's workouts"
- Workout cards: title, duration, modality bar, phase tag; subtitle **"Adjusted for cycle"** when menstruation adjustments apply
- Coach note (session-specific); **cycle variant:** phase-aware copy + link **"+ Log how you feel"**
- Primary CTA: Start workout
- Equipment mismatch sheet (unchanged)
- **Branch:** lighter workout confirm after low-energy log (`cycleAwareTraining` branch)

### Step 9: Weekly progression

- Header: Plan Overview + week chevrons
- Phase banner for selected week
- Segmented progress bar
- Coach message card (phase-aware)
- Workout list with full exercise comma-list per day
- CTA: Go to current week

### Step 10: AI plan adjustment

- Modal/bottom sheet
- Headline: "Adjust your plan?"
- Copy: missed sessions / injury flare / schedule change
- Actions: Readapt plan · Keep original · Talk to coach (→ chat)

---

## Screen inventory (Pencil / preview)

| #   | Screen                         |
| --- | ------------------------------ |
| 0   | Empty state — no plan          |
| 1   | Plan focus options             |
| 2   | AI coach chat                  |
| 3   | Inputs recap                   |
| 4   | Generating plan                |
| 5   | Plan introduction blurb        |
| 6   | Multi-week overview (enhanced) |
| 7   | Week overview sheet (enhanced) |
| 8   | Today daily workout            |
| 9   | Weekly progression (enhanced)  |
| 10  | AI plan adjustment             |
