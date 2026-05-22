# Onboarding Flow

Multi-step intake before AI plan generation.

## Steps

1. **Goals** — Multi-select: build muscle, lose fat, improve endurance, return from injury, general fitness
2. **Injury history** — Body areas + past injuries (multi-select chips)
3. **Current injury state** — None / managing / acute — with severity and movement restrictions
4. **Diet** — Preference tags (high protein, plant-based, no preference) + optional calorie goal
5. **Age & fitness level** — Age band + self-rated level (beginner → advanced)
6. **Locations intro** — Why Flex asks where you train
7. **First location** — Name, preset type (home / commercial / travel)
8. **Equipment** — Category checklist + custom equipment modal
9. **Multi-location** — Add another, pick default location
10. **Plan generating** — Loading with coach copy (includes equipment bullet)
11. **Plan reveal** — Hand off to training plan flow

## Design File

`onboarding.flow.design.pen`

## Integration

Maps to `apps/api` fitness profile + training plan generation endpoints.
