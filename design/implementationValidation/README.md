# Design Implementation Validation

Artifacts from comparing Flex mobile **implementation** (React Native) against **Pencil design** (`.pen` flow files).

## Folder structure

### Standalone audit (one pass, read-only)

```
design/implementationValidation/
  README.md
  {flow}/
    {screen}/
      {screen}_{YYYYMMDDHHMMSS}/     ← single audit run
        {screen}.container.audit.md
        {screen}_1_ios.png
        {screen}_1_android.png
        design/                      ← optional Pencil export
```

### Reconcile session (audit → fix → re-audit)

```
design/implementationValidation/
  {flow}/
    {screen}/
      session_{YYYYMMDDHHMMSS}/
        session.meta.json
        implementation-notes.md
        initialAudit/
          {screen}_{YYYYMMDDHHMMSS}/
            {screen}.container.audit.md
            {screen}_1_{ios,android}.png
        finalAudit/
          {screen}_{YYYYMMDDHHMMSS}/
            {screen}.container.audit.md
            {screen}_1_{ios,android}.png
```

Use **reconcile-design-implementation** (`.cursor/skills/reconcile-design-implementation/SKILL.md`) for the full loop.

### Naming rules

Canonical reference: **`apps/api/prisma/migrations/`** (e.g. `20250612224012_add_tax_tables`).

| Artifact | Pattern | Example |
| -------- | ------- | ------- |
| Standalone audit folder | `{screen}_{YYYYMMDDHHMMSS}` | `login_20260525230240` |
| Reconcile session | `session_{YYYYMMDDHHMMSS}` | `session_20260525233940` |
| Screenshots | `{screen}_{n}_{platform}.png` | `login_1_ios.png` |
| Audit report | `{screen}.container.audit.md` | `login.container.audit.md` |
| Maestro capture flow | `capture{Screen}Screenshot.flow.maestro.yaml` | `captureLoginScreenshot.flow.maestro.yaml` |

Timestamp: **`YYYYMMDDHHMMSS`** (14 digits). Generate with `date +%Y%m%d%H%M%S`.

**Do not overwrite** prior audit folders; create new timestamps per run.

Maestro flows: `apps/mobile/src/e2e_tests/{flow}/` (underscore, not camelCase).

## How to run

| Goal | Skill |
| ---- | ----- |
| Audit only (no code changes) | `.cursor/skills/audit-design-implementation/SKILL.md` |
| Fix drift + iterate to parity | `.cursor/skills/reconcile-design-implementation/SKILL.md` |
| Quick checklist | `.cursor/skills/validate-design/SKILL.md` |
| Greenfield design → code | `.cursor/skills/implement-design/SKILL.md` |

Trigger phrases: *audit design implementation*, *reconcile login with design*, *fix design drift*.

## Worked examples — Login (auth)

| Item | Path |
| ---- | ---- |
| Design source | `design/flows/auth/auth.flow.design.pen` |
| Frame | `Auth Flow Step 1: Sign in` |
| Legacy initial audit | `auth/login/login_20260525230240/` |
| Reconcile session | `auth/login/session_20260525233940/` |
| Final parity audit | `.../finalAudit/login_20260525234023/login.container.audit.md` |
| Maestro flow | `apps/mobile/src/e2e_tests/auth/captureLoginScreenshot.flow.maestro.yaml` |
| Screen code | `apps/mobile/src/screens/Login/` |

## Notes

- Audit passes are **read-only** unless using **reconcile-design-implementation**.
- Never edit `.pen` files as text — use Pencil MCP tools only.
- **Meaningful parity** = no blocker or major discrepancies in final audit (cosmetic/platform diffs documented).
