# Profile & Wellness Settings Flow

Edit goals, gyms, wellness/injuries, diet, body stats, and appearance after onboarding.

| Artifact      | Path                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| Research      | [wellnessInjuryResearch.docs.md](../../docs/wellnessInjuryResearch.docs.md)      |
| Specification | [profileSettings.flow.specification.md](./profileSettings.flow.specification.md) |
| Pencil        | [profileSettings.flow.design.pen](./profileSettings.flow.design.pen)             |
| Theming       | [themeTokens.docs.md](../../docs/themeTokens.docs.md)                            |
| Related       | `gymLocations/`, onboarding steps 1–5                                            |
| RN preview    | `apps/mobile/src/screens/DesignPreview/ProfileSettingsFlowPreview/`              |

## Screens (Pencil)

Each step is laid out in **one row** with three theme columns: **Light · Dark · Gym Girlie** (left to right, 80px gap).

| Row | Step |
|-----|------|
| 1 | Training profile hub |
| 2 | Goals & schedule |
| 3 | Wellness overview |
| 4 | Condition detail |
| 5 | Excluded exercises |
| 6 | Add condition wizard |
| 7 | Plan readapt prompt |
| 8 | Appearance (theme picker) |

## Theming

- Hub includes **APP → Appearance** row with current theme label and mini swatches
- All profile screens use themed `$background`, `$surface`, `$text-*`, `$accent-cta` variables
- Sex-based defaults: Male → Dark, Female → Gym Girlie; Light always available as override
- Theme changes do not trigger plan readapt
