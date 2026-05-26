---
name: reconcile-design-implementation
description: >-
  Full design–implementation reconcile loop for Flex mobile: audit against Pencil,
  implement fixes from report, re-audit with Maestro screenshots, iterate until
  meaningful parity. Use when fixing design drift, closing audit discrepancies,
  or after audit-design-implementation reports blockers/majors.
---

# Reconcile Design Implementation (Flex)

End-to-end workflow: **audit → implement → re-audit → iterate** until the screen has no meaningful drift vs approved Pencil design.

Delegates to:
- [audit-design-implementation](../audit-design-implementation/SKILL.md) — read-only audits
- [implement-design](../implement-design/SKILL.md) — RN conventions
- [audit-report-template](../audit-design-implementation/audit-report-template.md) — report shape

## When to use

- User asks to **fix design drift**, **implement audit fixes**, or **reconcile** a screen with design
- An audit report exists with blocker/major items
- You need **session artifacts** (initial + final audit) for traceability

## Session folder structure

Each reconcile run uses one **session** folder (not a flat `{screen}_{timestamp}` only):

```
design/implementationValidation/{flow}/{screen}/session_{YYYYMMDDHHMMSS}/
  session.meta.json              # iterations, parity flag, audit paths
  implementation-notes.md        # what changed each iteration
  initialAudit/
    {screen}_{YYYYMMDDHHMMSS}/   # first audit (copy or fresh run)
      {screen}.container.audit.md
      {screen}_1_ios.png
      {screen}_1_android.png
      design/                    # optional Pencil export
  finalAudit/
    {screen}_{YYYYMMDDHHMMSS}/   # audit when parity achieved
      {screen}.container.audit.md
      {screen}_1_ios.png
      {screen}_1_android.png
```

| Rule | Detail |
| ---- | ------ |
| **Session ID** | `session_` + `date +%Y%m%d%H%M%S` at start |
| **initialAudit** | First audit snapshot (existing folder copied, or new audit) |
| **finalAudit** | Written only when **meaningful parity** (0 blocker, 0 major) |
| **Legacy flat folders** | Older `login_20260525230240/` kept; add README pointing to session |

Timestamped subfolders inside `initialAudit/` and `finalAudit/` keep the Prisma-style `{screen}_{YYYYMMDDHHMMSS}` pattern for each audit **run**.

## Reconcile checklist

```
Reconcile — {flow}/{screen}:
- [ ] 1. Create session_{timestamp}/ and seed initialAudit
- [ ] 2. Read audit report; implement fixes in recommended order
- [ ] 3. Run screen tests (and shared component tests if touched)
- [ ] 4. Maestro iOS + Android screenshots → new timestamp under session
- [ ] 5. Write audit report (audit-design-implementation skill)
- [ ] 6. If blocker/major remain → increment iteration, repeat 2–5
- [ ] 7. On parity → write finalAudit, update session.meta.json
```

### Step 1 — Open session

```bash
SESSION=session_$(date +%Y%m%d%H%M%S)
mkdir -p design/implementationValidation/{flow}/{screen}/${SESSION}/initialAudit
```

- If a prior flat audit exists (e.g. `login_20260525230240/`), **copy** into `initialAudit/login_20260525230240/`
- Otherwise run **audit-design-implementation** and save output under `initialAudit/{screen}_{timestamp}/`

Write `session.meta.json` with `iterations: 0`, `parityAchieved: false`.

### Step 2 — Implement fixes

Follow the audit report **recommended fix order**. Prefer shared auth primitives when the audit lists them (`AuthScreenShell`, `AuthBrandHeader`, `FormTextField`, `PrimaryButton`).

Rules:
- TypeScript, functional React, no semicolons
- Styles in `.styles.ts`, types in `.types.ts`
- Tokens in `StyleConstants.ts` (`composition.authTopInset`, `radii.input`, etc.)
- Never edit `.pen` as text — Pencil MCP only for design changes
- Minimize scope; fix shared components when audit says they affect parity

Log changes in `implementation-notes.md`.

### Step 3 — Tests

From `apps/mobile`:

```bash
npm test -- --testPathPattern={Screen}
```

Add/update tests only when behavior or testIDs change.

### Step 4 — Maestro screenshots

Flow: `apps/mobile/src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml`

```bash
cd apps/mobile
maestro test -p ios src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml
cp login_1.png ../../design/implementationValidation/.../login_1_ios.png
maestro test -p android src/e2e_tests/{flow}/capture{Screen}Screenshot.flow.maestro.yaml
cp login_1.png .../login_1_android.png
```

Update Maestro comment copy paths to the **session** folder (see login flow example).

### Step 5 — Re-audit

Follow **audit-design-implementation** (Pencil MCP + visual compare + code trace). Save report under:

`session_.../finalAudit/{screen}_{timestamp}/` (or `initialAudit/...` if mid-iteration)

### Step 6 — Iterate

| Outcome | Action |
| ------- | ------ |
| Blocker or major discrepancies | `iterations += 1`, implement, re-capture, re-audit |
| Only minor/cosmetic/environmental | Document in report; set `parityAchieved: true` if product accepts |
| User requires zero drift | Continue until cosmetic items addressed or explicitly waived |

### Step 7 — Close session

- Set `session.meta.json`: `parityAchieved`, `finalAudit` path, `iterations` count
- Summarize for user: files changed, parity yes/no, remaining notes

## Parity definition

**Meaningful parity** = no **Blocker** or **Major** items in the final audit summary.

Accepted without blocking parity:
- **Cosmetic** — platform fonts (Inter vs system), sub-pixel hairlines
- **Environmental** — RN dev overlay, status bar not in static Pencil frame
- **Minor** — safe-area additive inset, unless product mandates `insets.top + designPadding`

## Worked example — Login

| Item | Path |
| ---- | ---- |
| Session | `design/implementationValidation/auth/login/session_20260525233940/` |
| Initial audit | `initialAudit/login_20260525230240/` |
| Final audit | `finalAudit/login_20260525234023/` |
| Maestro | `apps/mobile/src/e2e_tests/auth/captureLoginScreenshot.flow.maestro.yaml` |
| Design | `design/flows/auth/auth.flow.design.pen` → `Auth Flow Step 1: Sign in` |

## Related skills

- **audit-design-implementation** — audit-only pass
- **validate-design** — quick checklist
- **implement-design** — greenfield design → code

## Anti-patterns

- Do not overwrite `initialAudit` after implementation starts
- Do not skip Maestro on both platforms before claiming parity
- Do not mark `parityAchieved` while blocker/major rows remain
- Do not fix code during audit-only steps (use reconcile for fixes)
