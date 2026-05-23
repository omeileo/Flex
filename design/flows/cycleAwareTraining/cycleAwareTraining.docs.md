# Cycle-Aware Training Flow

Period tracking and cycle-synced workout adjustments for Flex users who opt in.

| Artifact      | Path                                                                                   |
| ------------- | -------------------------------------------------------------------------------------- |
| Research      | [cycleAwareTrainingResearch.docs.md](../../docs/cycleAwareTrainingResearch.docs.md)    |
| Specification | [cycleAwareTraining.flow.specification.md](./cycleAwareTraining.flow.specification.md) |
| Pencil        | [cycleAwareTraining.flow.design.pen](./cycleAwareTraining.flow.design.pen)             |
| Related       | `onboarding/` (Step 5b), `profileSettings/`, `trainingPlan/` (Today)                   |

## Screens

1. Onboarding opt-in (Female branch)
2. Cycle setup — last period
3. Cycle setup — cycle lengths
4. Profile hub row (cycle enabled preview)
5. Cycle settings (master toggle + data sources)
   5b. Health sync settings _(phase 2 branch)_
6. Customize symptoms
7. Daily log sheet
8. Today — cycle active (luteal)
9. Today — period day (menstruation)
10. Plan readapt prompt

## Branches

- Toggle off confirmation
- Profile opt-in (Male / Prefer not to say)
- Lighter workout confirm after symptom log

## Integration

- Onboarding Step 5 collects sex; Step 5b offers cycle setup to Female users
- Profile hub WELLNESS row links here; visible to all users
- AI plan generator receives `cycleContext` when enabled
- Manual logging v1; Apple Health / Health Connect phase 2
