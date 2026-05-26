# Flex Mobile E2E Tests (Maestro)

Maestro end-to-end tests for the Flex React Native app.

## Structure

| Location | Purpose | Example |
| -------- | ------- | ------- |
| `src/screens/{Screen}/{Screen}.maestro.yaml` | Single-screen smoke tests colocated with the screen | `Progress/Progress.maestro.yaml` |
| `src/e2e_tests/{flowName}/*.flow.maestro.yaml` | Multi-step user journeys grouped by product flow | `auth/authenticatedBootstrap.flow.maestro.yaml` |
| `src/e2e_tests/auth/*.subflow.maestro.yaml` | Reusable setup steps (login, etc.) composed via `runFlow` | `auth/loginWithTestCredentials.subflow.maestro.yaml` |

Flow tests compose screen steps and auth subflows via `runFlow`.

## Prerequisites

1. Install [Maestro CLI](https://maestro.mobile.dev/getting-started/installing-maestro)
2. Build and install the app on a simulator/emulator (`npm run ios` or `npm run android` from `apps/mobile`)
3. App id: `com.flex.app` (iOS and Android)
4. Rebuild after pull if auth submit `testID`s changed (`login-submit`, `signup-submit`)
5. Provision E2E test credentials on your target API environment (see [Test credentials](#test-credentials))

## Test credentials

Authenticated flows use the reusable login subflow at `e2e_tests/auth/loginWithTestCredentials.subflow.maestro.yaml`.

### Local setup (recommended)

1. Copy the example env file:

```bash
cp src/e2e_tests/e2e.env.example src/e2e_tests/e2e.env
```

2. Edit `src/e2e_tests/e2e.env` with your test account (this file is gitignored):

```bash
MAESTRO_E2E_EMAIL=your-test-user@example.com
MAESTRO_E2E_PASSWORD=your-secure-password
```

3. Run tests — `npm run test:e2e` sources `e2e.env` automatically via `runE2eTests.sh` (auto-selects `-p ios` when a booted iOS simulator is detected; override with `MAESTRO_PLATFORM=android` or pass `-p android`).

Never commit `e2e.env`. Only `e2e.env.example` (with placeholders) is tracked.

### Environment variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `MAESTRO_E2E_EMAIL` | Yes* | Primary test user email (verified, profile + active plan) |
| `MAESTRO_E2E_PASSWORD` | Yes* | Primary test user password |
| `MAESTRO_E2E_ONBOARDING_EMAIL` | No | Account without completed profile (for onboarding flows) |
| `MAESTRO_E2E_ONBOARDING_PASSWORD` | No | Password for onboarding account |

Aliases also accepted by the login subflow: `E2E_TEST_EMAIL` / `E2E_TEST_PASSWORD`, or `E2E_EMAIL` / `E2E_PASSWORD` when passed through `runFlow env`.

\*Required for any flow that calls the login subflow. Unauthenticated screen tests (Landing, Login, SignUp, VerifyEmail) do not need credentials.

### Alternative: export or CLI

Export before running:

```bash
export MAESTRO_E2E_EMAIL="e2e-user@your-domain.test"
export MAESTRO_E2E_PASSWORD="your-secure-password"
```

Or pass per run with Maestro CLI:

```bash
maestro test \
  -e MAESTRO_E2E_EMAIL=e2e-user@your-domain.test \
  -e MAESTRO_E2E_PASSWORD=your-secure-password \
  apps/mobile/src/e2e_tests/auth/authenticatedBootstrap.flow.maestro.yaml
```

### Reusing login in a flow

Parent flows own `launchApp`; the subflow handles Landing → Login → Today:

```yaml
- launchApp
- runFlow:
    file: ../auth/loginWithTestCredentials.subflow.maestro.yaml
```

## Running tests

From `apps/mobile`:

```bash
# All flow tests (loads src/e2e_tests/e2e.env when present)
npm run test:e2e

# Auth bootstrap smoke (loads e2e.env when present)
npm run test:e2e:auth

# Single screen (pass path after script)
npm run test:e2e:screen -- src/screens/SignUp/SignUp.maestro.yaml

# Auth landing → login (no credentials)
maestro test src/e2e_tests/auth/landingToLogin.flow.maestro.yaml

# Authenticated bootstrap
maestro test src/e2e_tests/auth/authenticatedBootstrap.flow.maestro.yaml

# Flow folder
maestro test src/e2e_tests/training/
maestro test src/e2e_tests/profile/
```

From repo root, prefix paths with `apps/mobile/`.

### Screen-level coverage

| Screen | File | Auth required |
| ------ | ---- | ------------- |
| Login | `screens/Login/Login.maestro.yaml` | No |
| SignUp | `screens/SignUp/SignUp.maestro.yaml` | No |
| VerifyEmail | `screens/VerifyEmail/VerifyEmail.maestro.yaml` | No (deep link) |
| Today | `screens/Today/Today.maestro.yaml` | Yes (manual session or use flow test) |
| PlanHome | `screens/PlanHome/PlanHome.maestro.yaml` | Yes (via login subflow) |
| PlanDetail | `screens/PlanDetail/PlanDetail.maestro.yaml` | Yes |
| WorkoutSession | `screens/WorkoutSession/WorkoutSession.maestro.yaml` | Yes |
| ProfileOnboarding | `screens/ProfileOnboarding/ProfileOnboarding.maestro.yaml` | Onboarding account |
| Progress | `screens/Progress/Progress.maestro.yaml` | Yes (manual session or use flow test) |
| Profile | `screens/Profile/Profile.maestro.yaml` | Yes (manual session or use flow test) |

### Flow-level coverage

| Flow | File |
| ---- | ---- |
| Landing → Login | `e2e_tests/auth/landingToLogin.flow.maestro.yaml` |
| Authenticated bootstrap | `e2e_tests/auth/authenticatedBootstrap.flow.maestro.yaml` |
| Today workouts | `e2e_tests/training/viewTodayWorkouts.flow.maestro.yaml` |
| Today → Workout session | `e2e_tests/training/todayToWorkout.flow.maestro.yaml` |
| Progress metrics | `e2e_tests/progress/viewProgressMetrics.flow.maestro.yaml` |
| Profile settings navigation | `e2e_tests/profile/profileSettingsNavigation.flow.maestro.yaml` |
| Profile hub + settings | `e2e_tests/profile/viewTrainingProfile.flow.maestro.yaml` |
| Plan detail hierarchy | `e2e_tests/planDetail/viewPlanHierarchy.flow.maestro.yaml` |
| Active workout flow | `e2e_tests/workout/activeWorkoutFlow.flow.maestro.yaml` |
| Create training plan | `e2e_tests/training/createTrainingPlan.flow.maestro.yaml` |
| Onboarding goals (key steps) | `e2e_tests/onboarding/profileOnboardingGoals.flow.maestro.yaml` |

All authenticated flows above compose `loginWithTestCredentials.subflow.maestro.yaml` via `runFlow`.

## CI

Maestro is not wired into GitHub Actions yet (mobile CI runs lint, typecheck, and Jest only). To add E2E in CI:

1. Build the app for simulator (iOS) or emulator (Android) in a workflow job.
2. Install Maestro CLI (`curl -Ls "https://get.maestro.mobile.dev" | bash`).
3. Store `MAESTRO_E2E_EMAIL` and `MAESTRO_E2E_PASSWORD` as GitHub Actions secrets (do not commit `e2e.env`).
4. Boot a simulator/emulator and run:

```yaml
- name: Maestro E2E
  working-directory: apps/mobile
  env:
    MAESTRO_E2E_EMAIL: ${{ secrets.MAESTRO_E2E_EMAIL }}
    MAESTRO_E2E_PASSWORD: ${{ secrets.MAESTRO_E2E_PASSWORD }}
  run: |
    npm run test:e2e
```

For [EAS Workflows](https://docs.expo.dev/eas/workflows/pre-packaged-jobs/), use a `maestro` job with `flow_path` pointing at `apps/mobile/src/e2e_tests/` and pass `MAESTRO_*` env vars to the Maestro step.

Recommended CI split:

- **PR smoke (no secrets):** `landingToLogin`, `SignUp`, `VerifyEmail`
- **Nightly / staging (with secrets):** full `src/e2e_tests/` suite

## Conventions

- Use `testID` props on interactive or assertable UI (see Progress, Profile, Today screens)
- Prefer `id:` selectors over text when strings are localized
- Name flow files `{action}.flow.maestro.yaml`; reusable fragments `{name}.subflow.maestro.yaml`
- Keep screen tests focused on one screen; cross-screen journeys belong in `e2e_tests/`
- Auth subflows do not call `launchApp` — parent flows own app launch

## Note on Hourrier reference

The Hourrier Web App project uses Vitest for unit/integration tests only (no Maestro). This structure follows Flex mobile conventions: screen-colocated Maestro YAML plus flow folders under `src/e2e_tests/`.
