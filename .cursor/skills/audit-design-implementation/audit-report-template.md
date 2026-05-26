# {Screen} — Design vs Implementation Audit

**Date:** YYYY-MM-DD  
**Auditor:** {name or "Automated design validation"}  
**Scope:** {Flow name} — {screen description} only  
**Design source:** `design/flows/{flow}/{flow}.flow.design.pen`  
**Implementation screenshots:**
- `design/implementationValidation/{flow}/{screen}/{screen}_{YYYYMMDDHHMMSS}/{screen}_1_ios.png`
- `design/implementationValidation/{flow}/{screen}/{screen}_{YYYYMMDDHHMMSS}/{screen}_1_android.png`

**Implementation code (read-only reference):**
- `apps/mobile/src/screens/{Screen}/`
- `{list shared components}`
- `apps/mobile/src/shared/styles/StyleConstants.ts`

> **No code or design files were modified during this audit.**

---

## Pencil traceability

| Item | Value |
|------|-------|
| **Frame name** | `{exact frame name}` |
| **Root frame ID** | `{id}` ({width} × {height}, fill `{color}`) |
| **Content container ID** | `{id}` (padding `[t,r,b,l]`, gap `{n}`) |
| **{Element} ID** | `{id}` — `{notes}` |

### Design token variables (from Pencil `get_variables`)

| Token | Value | StyleConstants mapping |
|-------|-------|------------------------|
| `{token}` | `{hex}` | `{mapping}` ✓/✗ |

---

## Screenshot / safe-area notes

| Property | iOS screenshot | Android screenshot | Design frame |
|----------|----------------|-------------------|--------------|
| Capture resolution | | | |
| Status bar visible | | | |
| Dev overlay | | | |
| Top inset observation | | | |

---

## Summary table — all discrepancies

| # | Element | Design | iOS impl | Android impl | Severity | Platform parity |
|---|---------|--------|----------|--------------|----------|-------------------|
| 1 | | | | | **Blocker/Major/Minor/Cosmetic** | |

**Counts:** {n} blocker · {n} major · {n} minor · {n} cosmetic · **{total} total discrepancies**

---

## Elements that match (positive confirmation)

| Element | Design spec | Implementation | Notes |
|---------|-------------|----------------|-------|
| | | | ✓ |

---

## Detailed discrepancy entries

### 1. {Element name}

| Field | Value |
|-------|-------|
| **Element** | |
| **Design spec** | Node `{id}`: {spec} |
| **iOS implementation** | {observation}. Source: `{file}` |
| **Android implementation** | {observation} |
| **Severity** | **{level}** — {rationale} |
| **Fix guidance** | {concrete changes; separate implementation pass} |
| **Platform parity** | |

---

## Spacing stack reference (design layout snapshot)

```
y={n}   {element} ({id}, h={n})
...
```

---

## Recommended fix order (for implementing agent)

1. **{Blocker}** — {brief}
2. **{Major}** — {brief}

---

## Files most likely to change (future work)

| Priority | File | Properties |
|----------|------|------------|
| P0 | `{path}` | `{changes}` |

---

*End of audit report.*
