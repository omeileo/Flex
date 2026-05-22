# Onboarding

Collect fitness profile and generate first training plan.

## Entry points

- `FlexBootstrap` when no `fitness_profiles` row

## API dependencies

| Step | Method | Path |
|------|--------|------|
| Save profile | PUT | `/fitness-profile` |
| Generate plan | POST | `/training-plans/generate` |

## Mobile screens

- `ProfileOnboarding`
