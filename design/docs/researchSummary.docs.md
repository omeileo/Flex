# Competitive Research — AI Workout Plan Apps

Sources: Mobbin (Runna, Tonal, Apple Fitness, Alan, Yazio), product pages, UX articles (May 2026).

## Fitbod

**Positioning:** Adaptive strength training from logged performance — not fixed multi-week calendars.

| Area | Pattern |
|------|---------|
| Onboarding | Goals (build muscle, get lean, improve fitness), equipment, experience, schedule |
| Injury | No formal injury intake; users exclude exercises manually ("Don't Recommend Again") |
| Plan model | Daily generated workout from recovery %, history, equipment — not week-by-week calendar |
| AI story | Proprietary algorithm + 400M+ logged sets; recovery-aware muscle selection |
| Daily UI | Single workout tab with exercises, sets/reps, swap/replace |
| Differentiator | Progressive overload automation, strength score per muscle group |

**Takeaway for Flex:** Borrow adaptive logic messaging but add explicit injury/diet intake Fitbod lacks; use Runna-style calendar for plan presentation.

See [wellnessInjuryResearch.docs.md](wellnessInjuryResearch.docs.md) for injury/ailment tracking patterns (Fitbod exclude, Peloton injury profile, per-exercise aggravators).

## Runna

**Positioning:** Coach-led multi-week running plans with holistic support.

| Area | Pattern |
|------|---------|
| Onboarding | Conversational setup — goal distance, race date, days/week, ability, cross-training |
| Injury | Dedicated "Post-Injury Plan" and "Return to Running" templates |
| Plan model | Fixed multi-week plan with dynamic readaptation when sessions missed |
| Daily UI | **Today** tab auto-surfaces current day; week strip with colored dots |
| Weekly UI | Plan Overview with week selector, coach note, workout cards, "Go to current week" |
| Calendar | Full training calendar with drag/add, week totals, reset |
| AI story | "Runna Engine" — science-backed, adapts to schedule changes |
| Color | Minimal UI; yellow→green gradient bars on run cards; black primary CTA |

**Takeaway for Flex:** Primary reference for Today + Plan Overview + week progression UX.

## Tonal

| Area | Pattern |
|------|---------|
| Onboarding | Fitness profile wizard with progress bar; goal cards with descriptions |
| Goals | Get Lean / Build Muscle / Improve Fitness with explanatory subcopy |
| UI | Light neutral palette, radio selection cards, disabled Continue until selection |

## Alan (Health)

| Area | Pattern |
|------|---------|
| Injury intake | "Describe your pain" diagnostic flow before program |
| Steps | Pain location → physio follow-up → progressive exercises |
| UI | Friendly 3D character, numbered steps, purple CTA |

## Apple Fitness+

| Area | Pattern |
|------|---------|
| Plan setup | Start date + plan length pickers; weekly schedule editor before commit |
| Presentation | Day-grouped activity cards with duration and modality icons |

## Cross-App Patterns for Flex

1. **Onboarding:** One question per screen, progress indicator, multi-select goals, injury history + current status, diet prefs, age/fitness level
2. **Plan reveal:** Multi-week overview with current week highlighted; total volume stats per week
3. **Today-first:** Default landing shows today's section; week strip for context
4. **Coach layer:** Short personalized note per week (AI or templated)
5. **Adaptation moment:** Prompt when user misses sessions or requests regenerate
6. **AI positioning:** "Builds from your profile + performance" — concrete inputs, not black-box magic
7. **Visual system:** Neutral base + modality color punches + single strong CTA

## Active workout (in-session)

See [activeWorkoutResearch.docs.md](activeWorkoutResearch.docs.md) for Mobbin patterns: set logging (Hevy), rest timers (Gymshark, Fitbod), swap/delete menus (Fitbod, Peloton), save/discard (Runna, Hevy).

## Gym locations & equipment (Mobbin)

See **`design/docs/gymLocationsResearch.docs.md`** for Fitbod/Centr/Future/Peloton/Tempo patterns: location switcher, equipment count row, category checklist, custom weights, duplicate profile.

## Mobbin References

- Runna Today, Plan Overview, Training Calendar, Your Plan — [Mobbin Runna collection](https://mobbin.com/explore/apps/runna)
- Tonal Fitness Profile goal step
- Alan injury diagnostic intro
- Apple Fitness+ Get Started schedule
- Fitbod Your Gym + Available Equipment — gym location settings reference
