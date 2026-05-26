# Design ↔ Mobile Implementation Audit

**Repo:** `/Users/omeileo/Code/InternalProjects/Flex`  
**Last updated:** 2026-05-24  
**Scope:** `design/` flows & system tokens vs `apps/mobile/` production code

This document synthesizes the explore-agent audit (2026-05-23) with work completed by parallel implementation agents through 2026-05-24.

---

## Executive summary

| Area | Status |
|------|--------|
| **Design coverage** | 9 flows documented in Pencil; strong `DesignPreview/` stubs for most |
| **Production readiness** | Core tab shell + auth/onboarding + training surfaces exist; settings stack built but not fully wired |
| **Theming** | ✅ Tokens, `ThemeProvider`, `useThemedStyles`, Appearance screen wired |
| **Quality gate** | ✅ ESLint, `tsc`, Jest green — **42 suites, 55 tests** |
| **E2E** | Maestro structure in place (8 YAML files); auth fixture & CI credentials still needed |

**Bootstrap path (target):** Landing → Auth → FlexBootstrap → ProfileOnboarding → MainTabs (Today) → PlanDetail → WorkoutSession

---

## Recently completed (parallel agents)

These items were **open gaps** in the initial audit and are now substantially done:

| Item | Evidence |
|------|----------|
| **Theming wired** | `StyleConstants.ts` (light/dark/pink), `createAppDefaultStyles(colors)`, `ThemeProvider`, `useThemedStyles` across screens/components |
| **Today tab default** | `MainTabs.navigator.tsx` — tab order: Today → PlanHome → Progress → Coach → Profile |
| **Auth polished** | `AuthScreenShell`, `AuthBrandHeader`; Jest on Login, SignUp, VerifyEmail, ForgetPassword, Landing |
| **ProfileOnboarding 11-step** | `ProfileOnboarding.dictionary.ts` (`TOTAL_ONBOARDING_STEPS = 11`); goals → injuries → nutrition → locations → equipment → plan generating → reveal |
| **ProfileStack + settings screens** | `ProfileStack.navigator.tsx` + containers: Goals, Wellness, Condition, Excluded, Appearance, Gym (list/detail/equipment), Cycle (settings/setup/symptoms) |
| **Training promoted** | `Today`, `PlanHome`, `Coach`, `PlanDetail`, `WorkoutSession` in production with Redux wiring |
| **Progress editorial MVP** | `Progress/` — StatCard grid + ProgressBarChart; themed layout |
| **Maestro structure** | `src/e2e_tests/README.md`; screen-colocated YAML + flow folders |
| **Local profile slices** | `workoutLocations`, `wellness`, `cycleProfile` redux + MMKV hydrate |

---

## 1. Design folder inventory

### `design/flows/` (9 flows)

| Flow | Design artifacts | Doc status |
|------|------------------|------------|
| `auth/` | `.pen`, `.docs.md`, `.flow.specification.md` | Complete · 3 screens (+ forget-password prod-only) |
| `onboarding/` | `.pen`, `.docs.md`, `.flow.specification.md` | Complete · 11 steps |
| `trainingPlan/` | `.pen`, `.docs.md`, `.flow.specification.md` | Complete · 11 steps |
| `planDetail/` | `.pen`, `.docs.md`, `.flow.specification.md` | Complete · 5 levels |
| `activeWorkout/` | `.pen`, `.docs.md`, `.flow.specification.md` | Complete · 12 screens |
| `progress/` | `.pen`, `.docs.md`, `.flow.specification.md` | MVP · 1 screen |
| `gymLocations/` | `.pen`, `.docs.md`, `.flow.specification.md` | Partial · 4/6 Pencil steps |
| `profileSettings/` | `.pen`, `.docs.md`, `.flow.specification.md` | Partial · 8/11 Pencil screens |
| `cycleAwareTraining/` | `.pen`, `.docs.md`, `.flow.specification.md` | New · 10 steps + branches |

Index: `design/flows/flows.docs.md`

### `design/system/`

| Path | Contents |
|------|----------|
| `tokens/color.tokens.design.pen` | Multi-theme palette (light/dark/pink), matrix, Appearance picker |
| `tokens/tokens.docs.md` | Points to `design/docs/themeTokens.docs.md` |
| `components/*.component.design.pen` (8) | button, selectionCard, progressHeader, coachNote, pillTabBar, weekStrip, weekSummaryCard, workoutCard |
| `components/components.docs.md` | RN mapping; 10+ components without `.pen` source |
| `patterns/patterns.docs.md` | Selection card, week strip, coach note, progress header, modality bar |

Canonical token mapping: `design/docs/themeTokens.docs.md` → `apps/mobile/src/shared/styles/StyleConstants.ts`

---

## 2. Flow-by-flow status

Legend: **Done** · **Partial** · **Preview only** · **Missing**

### Auth — **Partial** (polished, not pixel-perfect)

| Design screen | Production | Preview | Status |
|---------------|------------|---------|--------|
| Sign in | `screens/Login/` | `DesignPreview/AuthFlowPreview/` | Partial — functional + `AuthScreenShell`; Jest ✓, Maestro ✓ |
| Sign up | `screens/SignUp/` | AuthFlowPreview | Partial — Jest ✓ |
| Verify email | `screens/VerifyEmail/` | AuthFlowPreview | Partial — Jest ✓ |
| Reset password | `screens/ForgetPassword/` | — | Partial — **no Pencil screen**; Jest ✓ |
| Landing | `screens/Landing/` | — | Partial — Jest ✓ |

**Remaining gaps:** Maestro for SignUp/VerifyEmail/ForgetPassword; full Pencil fidelity pass; forget-password design asset.

---

### Onboarding — **Partial** (11-step restored)

| Design step (11) | Production | Preview |
|------------------|------------|---------|
| 1 Goals | `ProfileOnboarding` step 1 | OnboardingFlowPreview ✓ |
| 2 Injury history | step 2 | ✓ |
| 3 Current injury state | step 3 | ✓ |
| 4 About you (age/sex) | step 4 | ✓ |
| 5 Nutrition | step 5 | ✓ |
| 5b Cycle opt-in | — | spec only |
| 6 Locations intro | step 6 | ✓ |
| 7 First location | step 7 | ✓ |
| 8 Equipment | step 8 | ✓ |
| 9 Multi-location | step 9 | ✓ |
| 10 Plan generating | step 10 | ✓ |
| 11 Plan reveal | step 11 | ✓ |

**Remaining gaps:** Cycle opt-in (Step 5b) not implemented; sex-at-birth captured but **not wired to default theme** (`setThemeMode` on submit); Maestro for key steps; Pencil frame parity verification.

---

### Training Plan — **Partial**

| Design step (11) | Production | Preview |
|------------------|------------|---------|
| 0 Empty state | `PlanHome` empty view | TrainingPlanFlowPreview ✓ |
| 1 Plan focus | — | ✓ |
| 2 AI coach chat | `Coach` (local stub replies) | ✓ |
| 3 Inputs recap | — | ✓ |
| 4 Generating | `PlanHome` generating + FlexBootstrap | ✓ |
| 5 Plan introduction | — | ✓ |
| 6 Multi-week overview | `PlanHome` overview | ✓ |
| 7 Week overview sheet | — | ✓ |
| 8 **Today** | `screens/Today/` ✅ **default tab** | ✓ |
| 9 Weekly progression | — | ✓ |
| 10 Plan adjustment | — | ✓ |

**Remaining gaps:** Creation steps 1–3, 5, 7, 9–10 still in `DesignPreview/TrainingPlanFlowPreview/`; `PillTabBar` not used for main tabs; Coach has no backend/AI.

---

### Plan Detail — **Partial**

| Design level (5) | Production | Preview |
|------------------|------------|---------|
| 1 Program overview | — | PlanDetailFlowPreview ✓ |
| 2 Phase detail | — | ✓ |
| 3 Week schedule | — | ✓ |
| 4 Workout day detail | `screens/PlanDetail/` (single day) | ✓ |
| 5 Exercise detail | `screens/ExerciseDetail/` (minimal) | ✓ |

**Remaining gaps:** No program → phase → week navigation hierarchy; production collapses to day view; Jest ✓, no Maestro.

---

### Active Workout — **Partial**

| Design (12 screens) | Production phases | Preview |
|---------------------|-------------------|---------|
| Pre-start → Active → Rest → Save/Saved | `preStart`, `active`, `rest`, `save`, `saved` | ActiveWorkoutFlowPreview (10 views) ✓ |

**Missing in production:** `paused`, `exerciseMenu`, `swap`, `discard`, richer `finishSheet`, set logging depth.

**Remaining gaps:** 7 of 12 design screens; Maestro + `e2e_tests/workout/` flow; swap sheet component exists but not wired in session.

---

### Progress — **Partial** (MVP UI ✓, data ✗)

| Design | Production | Preview |
|--------|------------|---------|
| Metrics stub (2×2 + bar chart) | `screens/Progress/` editorial layout | — |

**Remaining gaps:** `Progress.container.tsx` still uses **placeholder i18n stats + hardcoded weekly volume**; no workout-session aggregate API; real streak/PR/volume computation.

---

### Gym Locations — **Partial** (prod screens, local state)

| Design step | Production | Preview |
|-------------|------------|---------|
| 1 Locations list | `GymLocationsList.container.tsx` | GymLocationsSettingsPreview ✓ |
| 2 Location detail | `GymLocationDetail.container.tsx` | ✓ |
| 3 Equipment editor | `GymLocationEquipment.container.tsx` | ✓ |
| 4 Custom equipment modal | partial via `EquipmentPickerSheet` | ✓ |
| 5 Add location | inline add in list | **missing in Pencil** |
| 6 Confirm dialogs | — | **missing in Pencil** |

**Remaining gaps:** No API sync (`workoutLocations` is MMKV-local); confirm/delete dialogs; Maestro; design steps 5–6 need Pencil.

---

### Profile & Wellness Settings — **Partial**

| Design step | Production | Preview |
|-------------|------------|---------|
| 1 Training profile hub | `Profile/` hub with section rows | ProfileSettingsFlowPreview |
| 2 Goals & schedule | `GoalsAndSchedule.container.tsx` | ✓ |
| 3 Wellness overview | `WellnessOverview.container.tsx` | ✓ |
| 4 Condition detail | `ConditionDetail.container.tsx` | ✓ |
| 5 Excluded exercises | `ExcludedExercises.container.tsx` | ✓ |
| 6 Add condition wizard | — | missing in preview |
| 7 Plan readapt prompt | `PlanReadaptSheet` in cycle/settings | ✓ |
| 8 Appearance | `Appearance.container.tsx` ✅ ThemePicker → `setThemeMode` | missing in preview |
| 9–11 Diet / age detail | stub preview rows on Profile | partial |

**Critical wiring gap:** `ProfileStackNavigator` exists with all routes but **MainTabs still mounts `Profile.container` directly** — settings navigation will not resolve until Profile tab uses `ProfileStackNavigator`.

**Remaining gaps:** Add-condition wizard; diet/age detail screens; API sync for wellness; Maestro profile-settings flow (skeleton exists).

---

### Cycle-Aware Training — **Partial**

| Design (10 + branches) | Production | Preview |
|------------------------|------------|---------|
| Settings hub | `CycleAwareSettings.container.tsx` | — |
| Setup | `CycleSetup.container.tsx` | — |
| Customize symptoms | `CustomizeSymptoms.container.tsx` | — |
| Branch flows (disable, readapt, etc.) | partial (BottomSheet + PlanReadaptSheet) | **no DesignPreview route** |

**Remaining gaps:** Full branch logic per spec; onboarding Step 5b; Today/plan integration for cycle-adjusted workouts; no Maestro; no API.

---

## 3. Token & theming gaps

### Completed ✅

| Piece | Path |
|-------|------|
| Theme palettes (light/dark/pink) | `StyleConstants.ts` → `themePalettes`, `getThemeColors` |
| Semantic + cycle accents | `sharedSemanticColors`, `accentCycle*` |
| Redux theme slice | `redux/states/settings/theme/` — hydrate, persist, `setThemeMode` |
| ThemeProvider | `shared/context/ThemeProvider/` — wraps app in `App.tsx` |
| useThemeColors / useThemeMode | `shared/hooks/useThemeColors/` |
| useThemedStyles | `shared/hooks/useThemedStyles/` — adopted across screens & most components |
| Themed app defaults factory | `appDefault.styles.ts` → `createAppDefaultStyles(colors)` |
| Appearance screen | `screens/Appearance/` — ThemePicker dispatches `setThemeMode` |

### Remaining gaps

| Token / behavior | Design | Code | Gap |
|------------------|--------|------|-----|
| Motion (duration/easing) | `themeTokens.docs.md` | not in `StyleConstants.ts` | **Missing** |
| Global typography fonts | Inter / SF Pro | sizes/weights only | **Missing** font family setup |
| Spacing/typography `.pen` | planned | only `color.tokens.design.pen` | **Missing** token files |
| Theme-aware elevation | per-theme shadow | `getElevation(shadowColor)` partial | shadow color now theme-param; verify all call sites |
| `createAppDefaultStyles` consumption | themed layout/text helpers | factory exists, **not imported in app** | wire via `useThemedStyles` or deprecate |
| Sex-based default theme | onboarding spec | sex captured, no `setThemeMode` on complete | **Missing** |
| PillTabBar on main tabs | designed | default React Navigation tab bar | **Missing** |
| Static `colors` imports | — | some legacy/preview files | audit & migrate |

---

## 4. Component design parity

### With `.pen` files (8)

| Design | RN component | Themed | Jest |
|--------|--------------|--------|------|
| button | PrimaryButton, SecondaryButton | ✓ | Secondary ✓, Primary ✗ |
| selectionCard | SelectionCard | ✓ | ✗ |
| progressHeader | ProgressHeader | ✓ | ✗ |
| coachNote | CoachNote | ✓ | ✗ |
| pillTabBar | PillTabBar | ✓ | ✗ |
| weekStrip | WeekStrip | ✓ | ✗ |
| weekSummaryCard | WeekSummaryCard | ✓ | ✗ |
| workoutCard | WorkoutCard | ✓ | ✗ |

### Implemented without `.pen` (documented in `components.docs.md`)

ScreenHeader, ThemePicker, ThemeSwatchRow, StatCard, ProgressBarChart, cycle chips, MovementRestrictionChip, ExerciseExcludeRow, FlowScreenScaffold, PlanReadaptSheet, etc. — RN code exists; several have Jest tests but no Pencil source of truth.

---

## 5. Test coverage

### Jest — **42 suites, 55 tests** (all passing)

**Screens with component tests:** Landing, Login, SignUp, VerifyEmail, ForgetPassword, ProfileOnboarding (+ mapDraft), Profile, Today, PlanHome, PlanDetail, WorkoutSession, Coach, Progress

**Screens without tests:** FlexBootstrap, ExerciseDetail, Appearance, all ProfileStack sub-screens (Goals, Wellness, Gym*, Cycle*), DesignPreview screens

**Redux tested:** theme, getProfile, saveProfile, generatePlan, getActivePlan, getPlanChanges, createWorkoutSession, completeWorkoutSession, workoutLocations

**Shared components with tests (18/45):** ThemePicker, ThemeSwatchRow, StatCard, ProgressBarChart, ScreenHeader, SecondaryButton, BottomSheet, ChatComposer, ChatBubble, CyclePhaseChip, CycleCalendarStrip, SymptomLogChip, MovementRestrictionChip, ExerciseExcludeRow, HealthSyncRow, ErrorBoundary, useThemedStyles, StyleConstants

**High-value missing component tests:** PrimaryButton, WorkoutCard, WeekStrip, SelectionCard, CoachNote, PillTabBar, PlanReadaptSheet, FlowScreenScaffold

### Maestro — **8 YAML files**

| File | Coverage |
|------|----------|
| `screens/Login/Login.maestro.yaml` | Login form smoke |
| `screens/Progress/Progress.maestro.yaml` | Progress tab metrics |
| `screens/Today/Today.maestro.yaml` | Today tab smoke |
| `screens/Profile/Profile.maestro.yaml` | Profile hub smoke |
| `e2e_tests/auth/landingToLogin.flow.maestro.yaml` | Landing → Login |
| `e2e_tests/progress/viewProgressMetrics.flow.maestro.yaml` | Progress journey |
| `e2e_tests/training/viewTodayWorkouts.flow.maestro.yaml` | Today workouts |
| `e2e_tests/profile/viewTrainingProfile.flow.maestro.yaml` | Profile hub |

**Missing Maestro:** SignUp, VerifyEmail, ForgetPassword, PlanHome, PlanDetail, WorkoutSession, ProfileOnboarding steps, gym/cycle settings navigation, authenticated bootstrap, **reusable auth login subflow + CI test credentials**.

---

## 6. Workstreams A–L (status)

Parallel workstreams from the initial audit, updated for completed work:

| Stream | Scope | Status | Notes |
|--------|-------|--------|-------|
| **A — Navigation shell** | Today tab, tab order, PillTabBar | **Done** (PillTabBar pending) | Today is first tab |
| **B — Auth polish** | Login/SignUp/VerifyEmail + Maestro | **Mostly done** | Missing SignUp/Verify Maestro |
| **C — Onboarding production** | 11-step ProfileOnboarding | **Done** | Cycle 5b + sex→theme pending |
| **D — Training plan core** | PlanHome + creation steps 0–5, 7, 9–10 | **Partial** | Empty/generating/overview only |
| **E — Plan detail hierarchy** | Phase/week/day navigation | **Not started** | Single day view |
| **F — Active workout** | Full session UI (12 screens) | **Partial** | 5 phases wired |
| **G — Progress API** | Real workout aggregates | **Not started** | Stub data |
| **H — Profile stack** | Navigator + settings screens | **Partial** | **Stack not mounted on Profile tab** |
| **I — Gym locations** | Prod screens + redux | **Partial** | Local MMKV; no API |
| **J — Cycle-aware** | Full flow + onboarding 5b | **Partial** | Settings screens only |
| **K — Theming pass** | Appearance, sex defaults, appDefault | **Mostly done** | Sex default + appDefault consumption |
| **L — Design system** | Missing `.pen` files, spacing/typography tokens | **Not started** | |

---

## 7. Summary matrix

| Flow | Design | Preview | Production | Overall |
|------|--------|---------|------------|---------|
| Auth | Complete | ✓ | Polished partial | **Partial** |
| Onboarding | Complete | ✓ | 11-step ✓ | **Partial** |
| Training Plan | Complete | ✓ | Today + PlanHome partial | **Partial** |
| Plan Detail | Complete | ✓ | Day view only | **Partial** |
| Active Workout | Complete | ✓ | 5/12 phases | **Partial** |
| Progress | MVP | — | MVP UI, stub data | **Partial** |
| Gym Locations | 4/6 Pencil | ✓ | Local screens ✓ | **Partial** |
| Profile Settings | 8/11 Pencil | Partial preview | Stack built, **unwired** | **Partial** |
| Cycle-Aware | Complete spec | Missing | Settings partial | **Partial** |

---

## 8. Next sprint

Prioritized backlog for the upcoming sprint. P0 items block the core product loop; P1 closes design fidelity; P2 covers wiring, backend, and test depth.

### P0 — Core product loop

1. **Wire ProfileStack to MainTabs** — replace Profile tab component with `ProfileStackNavigator` so settings/gym/cycle routes resolve
2. **Progress real data** — replace placeholder stats/chart with workout-session aggregates (API or local compute from `completeWorkoutSession`)
3. **Active workout completeness** — paused, exercise menu, swap, discard, richer finish sheet (7 remaining design screens)
4. **Plan detail hierarchy** — program → phase → week → day → exercise navigation (5 levels)
5. **Training plan creation** — promote DesignPreview steps 1–3, 5, 7, 9–10 to production PlanHome/Coach flow
6. **Maestro auth fixture** — reusable login subflow + env vars for CI; expand authenticated e2e journeys

### P1 — Design fidelity

1. **Onboarding parity** — Step 5b cycle opt-in; verify every Pencil frame; sex-at-birth → default theme
2. **PillTabBar** — replace default tab chrome on MainTabs
3. **Profile settings** — add-condition wizard; diet/age detail screens (spec steps 9–11)
4. **Gym locations** — confirm/delete dialogs; complete Pencil steps 5–6
5. **Cycle-aware branches** — full 10-screen flow per spec; Today/plan integration hooks
6. **Auth** — SignUp/VerifyEmail/ForgetPassword Maestro; optional forget-password Pencil frame

### P2 — Platform & quality

1. **Backend integration** — sync gym locations, wellness, cycle profile beyond MMKV
2. **Coach AI** — wire chat to backend instead of local stub replies
3. **Plan readapt triggers** — fire `PlanReadaptSheet` on wellness/profile edits per spec
4. **Motion + typography tokens** — add to `StyleConstants.ts`; configure Inter/SF Pro globally
5. **Jest expansion** — PrimaryButton, WorkoutCard, WeekStrip, PillTabBar, ProfileStack screens
6. **Design system** — `.pen` files for StatCard, ThemePicker, ScreenHeader, cycle chips; spacing/typography token files
7. **DesignPreview consolidation** — deprecate or gate preview routes once production parity reached

---

## References

- Flow business logic: `design/flows/{flowName}/{flowName}.docs.md` + `.flow.specification.md`
- Product flow drift check: `npm run check:product-flow-docs` (from repo root)
- Implement-design skill: `.cursor/skills/implement-design/SKILL.md`
- Maestro conventions: `apps/mobile/src/e2e_tests/README.md`
- Mobile architecture: `apps/mobile/CLAUDE.md`
