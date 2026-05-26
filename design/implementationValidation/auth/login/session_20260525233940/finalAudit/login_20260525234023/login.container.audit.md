# Login Screen — Design vs Implementation Audit (Post-Reconcile)

**Date:** 2026-05-25  
**Auditor:** Automated design validation (Pencil MCP + screenshot review + code trace)  
**Scope:** Auth Flow Step 1 — Sign in / Login screen only  
**Session:** `session_20260525233940` (reconcile iteration **1**)  
**Prior audit:** `initialAudit/login_20260525230240/` (14 discrepancies before fixes)  
**Design source:** `design/flows/auth/auth.flow.design.pen`  
**Implementation screenshots:**
- `finalAudit/login_20260525234023/login_1_ios.png`
- `finalAudit/login_20260525234023/login_1_android.png`

**Implementation code:**
- `apps/mobile/src/screens/Login/`
- `apps/mobile/src/shared/components/AuthScreenShell/`
- `apps/mobile/src/shared/components/AuthBrandHeader/`
- `apps/mobile/src/shared/components/FormTextField/`
- `apps/mobile/src/shared/components/PasswordTextInput/`
- `apps/mobile/src/shared/components/PrimaryButton/`
- `apps/mobile/src/shared/styles/StyleConstants.ts`

---

## Parity verdict

**Meaningful parity: YES**

All blocker and major discrepancies from the initial audit are resolved. Remaining deltas are **cosmetic** (platform font families) or **environmental** (RN dev debugger banner, status bar not modeled in static Pencil frame).

---

## Pencil traceability

| Item | Value |
|------|-------|
| **Frame name** | `Auth Flow Step 1: Sign in` |
| **Root frame ID** | `VvhuQ` (390 × 844, fill `#F7F8FA`) |
| **Content container ID** | `I1rxW` (padding `[56, 24, 40, 24]`, gap `24`) |

### Design token variables

| Token | Value | StyleConstants mapping |
|-------|-------|------------------------|
| `background` | `#F7F8FA` | `themePalettes.light.background` ✓ |
| `surface` | `#FFFFFF` | `surface` ✓ |
| `text-primary` | `#111827` | `textPrimary` ✓ |
| `text-secondary` | `#6B7280` | `textSecondary` ✓ |
| `accent-cta` | `#111827` | `accent` ✓ |
| `accent-energy` | `#22C55E` | `accentEnergy` ✓ |
| `border` | `#E5E7EB` | `border` ✓ |

---

## Summary table — remaining discrepancies

| # | Element | Design | Implementation | Severity | Notes |
|---|---------|--------|----------------|----------|-------|
| 1 | Typeface family | Inter | AvenirNext / sans-serif | **Cosmetic** | Accepted unless Inter is loaded app-wide |
| 2 | Status bar / safe area | Not in static frame | OS status bar + 56 px padding | **Minor** | Visual top spacing acceptable on iPhone 17 sim; optional `useSafeAreaInsets` if design requires 56 + inset |
| 3 | Dev overlay | N/A | RN debugger banner | **Environmental** | Not a design spec item |

**Counts:** 0 blocker · 0 major · 1 minor · 2 cosmetic/environmental · **3 total non-blocking notes**

---

## Resolved from initial audit (20260525230240)

| # | Issue | Resolution |
|---|-------|------------|
| 1 | Decorative atmosphere | Removed SVG layer from `AuthScreenShell` |
| 2 | Top padding 24 vs 56 | `composition.authTopInset: 56` on scroll content |
| 3 | Brand FLEX vs Flex | Removed `textTransform: 'uppercase'` |
| 4 | Input radius 8 vs 12 | `radii.input: 12` on `FormTextField` |
| 5 | Button height 52 vs 56 | `PrimaryButton` `minHeight: 56` |
| 6 | Password eye icon | Swapped states in `PasswordVisibilityIcon` |
| 7 | Title→tagline 8 vs 24 | `Login.styles` `tagline.marginTop: spacing.lg` |
| 8–9 | Brand size / letter-spacing | `typography.display` (28), no brand letterSpacing |
| 10 | Footer link emphasis | Uniform `textSecondary` / weight 400 |
| 11 | Bottom padding 48 vs 40 | `composition.authBottomInset: 40` |
| 12 | Input border hairline | `borderWidth: 1` |
| 13 | Accent bar gap 16 vs 8 | `accentBar.marginBottom: spacing.sm` |

---

## Elements that match (post-fix)

| Element | Design spec | Implementation |
|---------|-------------|----------------|
| Background | Flat `#F7F8FA` | No atmosphere layer ✓ |
| Brand wordmark | `Flex` 28 / 700 | Sentence case, 28 px ✓ |
| Content padding | 56 / 24 / 40 | `authTopInset` / `lg` / `authBottomInset` ✓ |
| Title / tagline copy & typography | Per frame | i18n + styles ✓ |
| Title→tagline gap | 24 px | `spacing.lg` ✓ |
| Inputs | 48 h, 12 radius, 1 px border | `FormTextField` ✓ |
| Primary CTA | 56 h, pill 36 | `PrimaryButton` ✓ |
| Password icon (hidden) | Lucide `eye` 22 px | Open eye when hidden ✓ |
| Footer link | Single secondary gray | Uniform styling ✓ |

---

## Screenshot notes

| Property | iOS | Android |
|----------|-----|---------|
| Decorative shapes | None | None |
| Brand casing | Flex | Flex |
| Flat background | Yes | Yes |
| Dev overlay | Present | Present |

---

## Recommended follow-ups (optional)

1. Load Inter via `expo-font` if strict typographic parity is required.
2. Validate `paddingTop: 56` vs `insets.top + 56` on notched hardware if product requests safe-area additive inset.

---

*End of post-reconcile audit.*
