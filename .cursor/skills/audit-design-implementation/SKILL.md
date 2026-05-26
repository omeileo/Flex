---
name: audit-design-implementation
description: >-
  Audit Flex mobile screen implementation against Pencil design: inspect design
  frames, capture Maestro screenshots, visual compare, code trace, write dated
  audit report. Use when validating design vs implementation, auditing a screen
  against .pen flows, or reproducing the login audit workflow for another screen.
---

# Audit Design Implementation (Flex)

Systematic **read-only** audit comparing React Native implementation to approved Pencil design. Produces timestamped artifacts under `design/implementationValidation/`.

**Audit-only rule:** Do not modify app code, styles, or `.pen` files during the audit pass. Record discrepancies in the report; fix in a separate implementation pass.

## Prerequisites

| Requirement | Notes |
| ----------- | ----- |
| **Pencil MCP** | Open and inspect `.pen` flow files (`batch_get`, `snapshot_layout`, `get_screenshot`, `get_variables`) |
| **Maestro CLI** | [Install Maestro](https://maestro.mobile.dev/getting-started/installing-maestro) |
| **Simulators** | iOS Simulator and/or Android emulator with app installed (`npm run ios` / `npm run android` from `apps/mobile`) |
| **Metro** | App builds and launches; dev overlay acceptable in audit screenshots |
| **Design file** | Target flow at `design/flows/{flow}/{flow}.flow.design.pen` |

## Folder conventions

Canonical reference: **`apps/api/prisma/migrations/`** — each migration folder uses `{YYYYMMDDHHMMSS}_{description}/`. Audit folders mirror that timestamp pattern.

### Standalone audit (audit-only pass)

```
design/implementationValidation/{flow}/{screen}/{screen}_{YYYYMMDDHHMMSS}/
  {screen}.container.audit.md    # or {screen}.audit.md
  {screen}_1_ios.png
  {screen}_1_android.png
  design/                          # optional Pencil export
    {screen}_design.png
```

### Reconcile session (audit + implement + re-audit)

Use when closing drift across iterations — see **reconcile-design-implementation** skill:

```
design/implementationValidation/{flow}/{screen}/session_{YYYYMMDDHHMMSS}/
  session.meta.json
  implementation-notes.md
  initialAudit/{screen}_{YYYYMMDDHHMMSS}/   # first audit snapshot
  finalAudit/{screen}_{YYYYMMDDHHMMSS}/     # parity audit snapshot
```

```
apps/mobile/src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml
```

### Timestamp pattern

| Rule | Detail |
| ---- | ------ |
| **Format** | `{screen}_{YYYYMMDDHHMMSS}/` — 14-digit timestamp, no separators |
| **Example** | `login_20260525230240/` (same shape as `20250612224012_add_tax_tables`) |
| **When to create** | **Every audit run** gets a new folder with a fresh timestamp — never overwrite a prior audit |
| **How to generate** | `date +%Y%m%d%H%M%S` at folder creation (start of audit run) |
| **Screen prefix** | Screen name replaces Prisma's descriptive suffix; the timestamp is the unique key |

- **Screenshots:** `{screen}_{index}_{ios|android}.png` — index starts at `1`.
- **Maestro naming:** `capture{Screen}Screenshot.flow.maestro.yaml` (PascalCase screen segment).

See [design/implementationValidation/README.md](../../../design/implementationValidation/README.md) for structure overview.

## Audit workflow (reproducible steps)

Copy this checklist and track progress:

```
Audit progress — {flow}/{screen}:
- [ ] 1. Identify design frame and implementation files
- [ ] 2. Inspect design via Pencil MCP
- [ ] 3. Review implementation code (read-only)
- [ ] 4. Create/update Maestro capture flow
- [ ] 5. Capture iOS + Android screenshots
- [ ] 6. Visual compare (design vs iOS vs Android)
- [ ] 7. Write dated audit report
- [ ] 8. Verify artifact paths and Maestro re-run
```

### Step 1 — Identify scope

1. Find the flow design file: `design/flows/{flow}/{flow}.flow.design.pen`
2. Note the **exact frame name** for the screen (e.g. `Auth Flow Step 1: Sign in`)
3. Map implementation:
   - Screen: `apps/mobile/src/screens/{Screen}/`
   - Shared components used by the screen
   - Tokens: `apps/mobile/src/shared/styles/StyleConstants.ts`

### Step 2 — Inspect design (Pencil MCP)

1. `open_document` → flow `.pen` path
2. `batch_get` → locate target frame by name; record **node IDs** for root frame, content container, and each UI element
3. `snapshot_layout` → vertical positions, gaps, padding (1× logical px)
4. `get_screenshot` → export design reference (optional: save to `{screen}_{YYYYMMDDHHMMSS}/design/`)
5. `get_variables` → token names/values; map to `StyleConstants.ts`

Record in report: frame name, root ID, key child IDs, token table.

### Step 3 — Review implementation (read-only)

Read without editing:

- `{Screen}.component.tsx`, `{Screen}.styles.ts`, `{Screen}.container.tsx`
- Shared components referenced by the screen
- i18n keys for copy verification (`en.json`)
- `testID`s used by Maestro

Note computed values: `spacing.*`, `radii.*`, `typography.*`, hardcoded numbers.

### Step 4 — Maestro capture flow

Create or update:

`apps/mobile/src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml`

Template:

```yaml
appId: com.flex.app
---
# Capture {Screen} for design implementation audit
# Run: maestro test -p ios apps/mobile/src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml
# Copy output to: design/implementationValidation/{flow}/{screen}/{screen}_{YYYYMMDDHHMMSS}/{screen}_1_{ios|android}.png

- launchApp
# Navigation steps to reach screen (reuse existing flows via runFlow when possible)
- assertVisible:
    id: '{screen}-screen'
- takeScreenshot: {screen}_1
```

- Use `id:` selectors over text when localized
- Compose auth/navigation via `runFlow` from existing `{flow}/*.flow.maestro.yaml` subflows
- `takeScreenshot` basename becomes `{screen}_1.png` in Maestro output

### Step 5 — Capture screenshots

From `apps/mobile`:

```bash
maestro test -p ios src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml
maestro test -p android src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml
```

Copy Maestro output images into the timestamped audit folder, renaming with platform suffix:

- `{screen}_1_ios.png`
- `{screen}_1_android.png`

Create folder first:

```bash
mkdir -p design/implementationValidation/{flow}/{screen}/{screen}_$(date +%Y%m%d%H%M%S)
```

### Step 6 — Visual comparison

Compare three sources side by side:

1. Pencil design screenshot / layout snapshot
2. iOS implementation screenshot
3. Android implementation screenshot

For each visible element, check: copy, typography, color, spacing, alignment, icons, safe-area behavior, platform parity.

Note screenshot metadata: resolution, status bar, dev overlay, decorative layers not in design.

### Step 7 — Write audit report

Path:

`design/implementationValidation/{flow}/{screen}/{screen}_{YYYYMMDDHHMMSS}/{screen}.container.audit.md`

Use [audit-report-template.md](audit-report-template.md). Required sections:

1. **Header** — date, scope, design source, screenshot paths, code paths, audit-only disclaimer
2. **Pencil traceability** — frame name, node IDs, token variable table
3. **Screenshot / safe-area notes** — resolution, platform differences
4. **Summary table** — all discrepancies with severity
5. **Elements that match** — positive confirmation table
6. **Detailed discrepancy entries** — one subsection per issue
7. **Spacing stack reference** — design layout Y positions (from `snapshot_layout`)
8. **Recommended fix order** — prioritized for implementing agent
9. **Files most likely to change** — future work only

#### Severity levels

| Severity | Meaning |
| -------- | ------- |
| **Blocker** | Not in design; breaks legibility, layout, or brand |
| **Major** | Clear spec mismatch (size, spacing, wrong icon/copy) |
| **Minor** | Small delta; low user impact |
| **Cosmetic** | Expected platform diff (fonts, hairline borders) |

#### Per-discrepancy fields

| Field | Content |
| ----- | ------- |
| Element | UI element name |
| Design spec | Value from Pencil node + ID |
| iOS implementation | Observed + source file:line |
| Android implementation | Observed + parity note |
| Severity | Blocker / Major / Minor / Cosmetic |
| Fix guidance | Concrete file/property changes; do not edit during audit |
| Platform parity | Matched / iOS-only / Android-only / Both |

### Step 8 — Re-run and iterate

When design or implementation changes:

1. Create a **new** `{screen}_{YYYYMMDDHHMMSS}` folder (do not overwrite prior audits)
2. Re-run Maestro capture on both platforms
3. Re-inspect changed Pencil nodes if design updated
4. Write new report; reference prior audit folder in header if useful

To verify Maestro still works:

```bash
cd apps/mobile
maestro test -p ios src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml
```

## Worked example — Login (2026-05-25)

| Artifact | Path |
| -------- | ---- |
| Design | `design/flows/auth/auth.flow.design.pen` → frame `Auth Flow Step 1: Sign in` |
| Audit folder | `design/implementationValidation/auth/login/login_20260525230240/` |
| Report | `.../login.container.audit.md` |
| Screenshots | `.../login_1_ios.png`, `.../login_1_android.png` |
| Maestro | `apps/mobile/src/e2e_tests/auth/captureLoginScreenshot.flow.maestro.yaml` |
| Screen code | `apps/mobile/src/screens/Login/` |

Prior session steps (login reference):

1. Pencil MCP: open auth flow, inspect Sign in frame, `batch_get` / `snapshot_layout` / `get_screenshot` / `get_variables`
2. Code review: Login component/styles, AuthScreenShell, AuthBrandHeader, FormTextField, PrimaryButton, StyleConstants
3. Maestro: create capture flow, run iOS + Android, copy screenshots to timestamped folder
4. Visual compare iOS/Android vs Pencil
5. Write detailed audit with severities and fix guidance per discrepancy
6. No code changes during audit-only pass

## Related skills

- **reconcile-design-implementation** — audit → implement → re-audit loop with session folders
- **validate-design** — lightweight compare; use this skill for full audits
- **implement-design** — apply fixes after audit
- **validate-design-tokens** — token sync checks
- **implement-design** / **sync-theme-from-design** — when audit finds token drift

## Anti-patterns

- Do not edit `.pen` files as text
- Do not fix implementation during audit (record in report instead)
- Do not store screenshots outside timestamped `{screen}_{YYYYMMDDHHMMSS}` folders
- Do not use `e2eTests` (camelCase) — use `e2e_tests`
- Do not reuse an old timestamp folder for a new audit run — create a fresh `{screen}_{YYYYMMDDHHMMSS}/`
