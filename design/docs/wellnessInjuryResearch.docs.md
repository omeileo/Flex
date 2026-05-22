# Wellness & Injury Tracking — Competitive Research

Mobbin iOS deep search (May 2026). Focus: how fitness apps track **chronic ailments**, **managed injuries**, and **exercise aggravation** — not just acute onboarding checkboxes.

## How apps handle injury ↔ fitness

| App | Model | What users track | How it affects workouts |
|-----|-------|------------------|-------------------------|
| **Fitbod** | Implicit + manual | **Exclude exercises** (global blacklist); **Muscle recovery %** per group (manual override); swipe Replace/Delete in session | Excluded exercises never recommended; low recovery % reduces volume for that muscle |
| **Bevel** | Exercise-level | **Exclude** mode in exercise library (multi-select); custom exercises | Removed from plan generation pool |
| **Peloton / Strength+** | Body-area | **Injury profile** onboarding: body region + severity; **Avoid exercises** list with search | Filters class/workout recommendations |
| **Runna** | Plan-type | **Return from injury** plan path; coach-led readapt | Separate plan template, not granular exercise DB |
| **Rise / Zero** | Condition tags | Multi-select pills: chronic pain, acute injury, stress | Personalizes non-workout experience; weak exercise linkage |
| **Apple Health** | Medical context | **Conditions** in Medical ID; **Medications** affecting HR; explanatory copy on *why* data matters | Changes metric interpretation, not exercise selection |
| **Ada** | Profile sections | Health Background, Medications, Allergies as drill-down rows with preview text | Clinical focus; good **hub → detail** pattern |
| **Oura** | Life factors | "Things affecting my sleep" as **summary string** of selected tags on profile row | Summary-on-hub pattern |
| **Future / Centr** | Coach + equipment | Home gym equipment + coach notes; less formal injury DB | Human coach fills gap |
| **WHOOP** | Recovery score | Strain/recovery/sleep rings; not injury-specific | Recovery % as proxy for readiness |

## Patterns easy to miss (Flex should include)

1. **Three-layer injury model**
   - **History** — what happened (body area, optional date)
   - **Current status** — recovered / managing / flare-up (changes plan aggressiveness)
   - **Exercise-level aggravators** — user knows "overhead press hurts" even if body area is "shoulder"

2. **Exclude vs swap vs restrict**
   - **Fitbod Exclude** — never recommend again (global)
   - **Peloton Avoid** — same idea, searchable library
   - **Onboarding movement restrictions** — abstract tags (overhead pressing, deep squat)
   - Flex needs **all three**: movement tags for plan AI, exercise blacklist for known aggravators, in-session swap (active workout flow)

3. **Summary on hub row**
   - Oura/Fitbod: show "2 conditions · 5 exercises excluded" without opening screen
   - Ada: preview values inline ("Managing · Shoulder, Lower back")

4. **Explain impact copy**
   - Apple Health: gray footnote under toggle — "Changing this affects future cardio predictions"
   - Flex: "Flex will avoid these exercises when building your plan" under aggravator list

5. **Chronic vs acute distinction**
   - Rise separates "Chronic physical pain" vs "Acute pain/injury"
   - Flex status enum covers this: `recovered` | `managing` | `flareUp`

6. **Manual recovery override**
   - Fitbod Muscle Recovery % editable per group — useful when user feels worse than algorithm thinks

7. **Regenerate prompt**
   - When wellness changes, prompt "Update plan for new restrictions?" (like Runna readapt)

8. **Coach note on change**
   - Short AI/coach message after saving wellness: "We'll swap overhead work for landmine presses this week."

## Flex differentiation

Most apps either:
- Ask once at onboarding (Flex already does steps 2–3), or
- Offer blunt exercise exclude lists (Fitbod/Bevel)

Flex should **persist a structured wellness profile** editable from Profile:
- Multiple concurrent conditions (chronic back + nagging shoulder)
- Per-condition aggravating exercises the user already identified
- Movement restriction tags for exercises not yet in library
- Link to plan regeneration

## References

Mobbin screens: Fitbod Training Settings (Exclude Exercises), Bevel Library Exclude, Peloton Injury Profile, Peloton Avoid Exercises, Rise chronic/acute pain onboarding, Apple Health Conditions, Ada Health Background, Oura profile goals section.

See also: [onboarding.flow.specification.md](../flows/onboarding/onboarding.flow.specification.md) steps 2–3, [gymLocations.flow.specification.md](../flows/gymLocations/gymLocations.flow.specification.md).
