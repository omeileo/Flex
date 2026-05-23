# Cycle-Aware Training — Competitive Research

Mobbin iOS deep search (May 2026). Focus: how fitness and health apps integrate **menstrual cycle tracking** with **workout planning** — not standalone period apps.

## How apps handle cycle ↔ fitness

| App              | Model                     | What users track                   | How it affects workouts                                                                                                   |
| ---------------- | ------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Flo**          | Phase content hub         | Period start, symptoms, cycle day  | "Workouts and Your Cycle" — menstruation = low key, follicular = up intensity; symptom cards link to exercise suggestions |
| **Oura**         | Master toggle + phases    | Cycle length, hormones, period log | "Cycle Insights" toggle; follicular/luteal guidance on daily readiness                                                    |
| **Fitbit**       | Calendar in fitness app   | Flow, cramps, mood, energy         | "Cycle day X of Y" on Today; log details sheet beside workouts                                                            |
| **Clue**         | Customizable symptom grid | Pain, energy, PMS, exercise tags   | Daily log with toggled categories; exercise tag on cycle day                                                              |
| **Ultrahuman**   | Phase dashboard           | Period log, skin temp              | "Follicular Phase · Cycle Day 7" with phase insight copy                                                                  |
| **Apple Health** | Category toggles          | Symptoms, flow, cycle length       | Cycle log options screen; privacy-first data controls                                                                     |
| **Withings**     | Home card + pin toggle    | Period, cycle phases               | Cycle tracking card on health dashboard; pin to home                                                                      |

## Patterns Flex should include

1. **Master toggle with explanatory copy** (Oura) — "When off, predictions pause and cycle UI is hidden."
2. **Inclusive opt-in** (Clue) — cycle features available regardless of sex; onboarding can proactively offer to female users.
3. **Phase chip on workout home** (Ultrahuman/Fitbit) — `Luteal · Day 22` beside location chip on Today.
4. **Workout-relevant symptom log** (Fitbit/Clue) — energy, cramps, flow — not full medical tracking.
5. **Coach note explaining adjustment** (Flo) — "Energy looks low — we'll trim one working set today."
6. **Data source row** (Clue/Withings) — manual v1 + Health sync as phase 2.
7. **Plan readapt on cycle change** — same pattern as wellness/injury readapt in Flex profileSettings.

## Flex differentiation

Most apps either ship a full period tracker (Flo, Clue) or bolt on educational content (Flo "Workouts and Your Cycle"). Flex should:

- Treat cycle like **wellness/injury** — structured profile data feeding the **AI plan engine**
- Adjust **today's session** from phase + daily log, not just weekly content
- Keep scope narrow: workout-relevant symptoms only
- Surface on **Today**, not a separate tab

## Mobbin references

- Flo: Workouts and Your Cycle hub, daily insights carousel, symptom log
- Oura: Cycle Insights settings toggles
- Fitbit: Period calendar + Log Details sheet
- Clue: Customize tracking toggles, daily symptom grid
- Apple Health: Cycle Tracking Options
- Ultrahuman: Follicular phase dashboard
