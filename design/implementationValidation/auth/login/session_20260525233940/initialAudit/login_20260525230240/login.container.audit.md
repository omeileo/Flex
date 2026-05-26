# Login Screen — Design vs Implementation Audit

**Date:** 2026-05-25  
**Auditor:** Automated design validation (Pencil MCP + screenshot review + code trace)  
**Scope:** Auth Flow Step 1 — Sign in / Login screen only  
**Design source:** `design/flows/auth/auth.flow.design.pen`  
**Implementation screenshots:**
- `design/implementationValidation/auth/login/login_20260525230240/login_1_ios.png` (1206 × 2622 px, ~3× logical)
- `design/implementationValidation/auth/login/login_20260525230240/login_1_android.png` (1280 × 2856 px)

**Implementation code (read-only reference):**
- `apps/mobile/src/screens/Login/Login.component.tsx`
- `apps/mobile/src/screens/Login/Login.styles.ts`
- `apps/mobile/src/shared/components/AuthScreenShell/`
- `apps/mobile/src/shared/components/AuthBrandHeader/`
- `apps/mobile/src/shared/components/FormTextField/`
- `apps/mobile/src/shared/components/PasswordTextInput/`
- `apps/mobile/src/shared/components/PrimaryButton/`
- `apps/mobile/src/shared/styles/StyleConstants.ts`

> **No code or design files were modified during this audit.**

---

## Pencil traceability

| Item | Value |
|------|-------|
| **Frame name** | `Auth Flow Step 1: Sign in` |
| **Root frame ID** | `VvhuQ` (390 × 844, fill `#F7F8FA`, no decorative layers) |
| **Content container ID** | `I1rxW` (padding `[56, 24, 40, 24]`, gap `24`, `alignItems: center`) |
| **Brand block ID** | `I6Tjwa` |
| **Brand wordmark text ID** | `fSFoN` — content `"Flex"` |
| **Accent bar ID** | `wwSaN` |
| **Title text ID** | `aaWO3` — `"Welcome back"` |
| **Tagline text ID** | `tlyXx` — `"Pick up your plan where you left off."` |
| **Form stack ID** | `tATlA` (gap `16`) |
| **Email field group ID** | `wd5qx` / input `MvTIv` |
| **Password field group ID** | `H5f8RZ` / input `oflWy` / eye icon `Z7VdR` |
| **Forgot password row ID** | `A4oM6` / text `wS0ac` |
| **Primary button ID** | `n2dJp` (ref to component `pdrz0`) |
| **Footer link text ID** | `TG6yh` |

### Design token variables (from Pencil `get_variables`)

| Token | Value | StyleConstants mapping |
|-------|-------|------------------------|
| `background` | `#F7F8FA` | `themePalettes.light.background` ✓ |
| `surface` | `#FFFFFF` | `themePalettes.light.surface` ✓ |
| `text-primary` | `#111827` | `textPrimary` ✓ |
| `text-secondary` | `#6B7280` | `textSecondary` ✓ |
| `accent-cta` | `#111827` | `accent` ✓ |
| `accent-energy` | `#22C55E` | `accentEnergy` ✓ |
| `border` | `#E5E7EB` | `border` ✓ |

---

## Screenshot / safe-area notes

| Property | iOS screenshot | Android screenshot | Design frame |
|----------|----------------|-------------------|--------------|
| Capture resolution | 1206 × 2622 (~3×) | 1280 × 2856 | 390 × 844 (1× logical) |
| Status bar visible | Yes (11:02, Dynamic Island area) | Yes (mixed emulator chrome) | Not modeled (static frame) |
| Dev overlay | RN yellow debugger banner at bottom | Same | N/A |
| Top inset observation | Logo sits very close to status bar | Similar tight top spacing | 56 px content padding from frame top (`I1rxW`) |
| Decorative background | Blue block top-right, green orb bottom-right, green line mid-left | Same + **green line visibly intersects tagline text** | **None** — flat `#F7F8FA` only |

Design frame `844` height matches iPhone 14-class viewport; top padding `56` is measured from the frame top (below status bar in the mock, not additive to it).

---

## Summary table — all discrepancies

| # | Element | Design | iOS impl | Android impl | Severity | Platform parity |
|---|---------|--------|----------|--------------|----------|-------------------|
| 1 | Decorative atmosphere | None | SVG rects/circles visible | Same; green line cuts through tagline | **Blocker** | Both — Android worse |
| 2 | Screen top padding | 56 px | ~24 px (`spacing.lg`) | ~24 px | **Major** | Matched (both low) |
| 3 | Brand wordmark casing | `Flex` (sentence) | `FLEX` (uppercase) | `FLEX` | **Major** | Matched |
| 4 | Form input corner radius | 12 px | 8 px (`radii.md`) | 8 px | **Major** | Matched |
| 5 | Primary button height | 56 px | ~52 px (`minHeight: 52`) | ~52 px | **Major** | Matched |
| 6 | Password visibility icon | Lucide `eye` (22 px, `#6B7280`) | `eye-off` slash icon when hidden | Same | **Major** | Matched |
| 7 | Title → tagline spacing | 24 px (parent gap) | 8 px (`tagline.marginTop`) | 8 px | **Major** | Matched |
| 8 | Brand font size | 28 px / 700 | 30 px (`display + 2`) + uppercase | Same | **Minor** | Matched |
| 9 | Brand letter-spacing | 0 (Inter default) | 3 px (`letterSpacing.brand`) | Same | **Minor** | Matched |
| 10 | Footer “Sign up” emphasis | Single `#6B7280` 400 weight string | “Sign up” `#111827` semibold | Same | **Minor** | Matched |
| 11 | Screen bottom padding | 40 px | 48 px (`spacing.xxl`) | 48 px | **Minor** | Matched |
| 12 | Input border thickness | 1 px stroke | `StyleSheet.hairlineWidth` | Same | **Minor** | Matched |
| 13 | Accent bar → next gap | 8 px (in brand stack) | 16 px (`accentBar.marginBottom`) | Same | **Minor** | Matched |
| 14 | Typeface | Inter | AvenirNext / sans-serif | Same | **Cosmetic** | Expected platform diff |
| 15 | Safe-area handling | 56 px absolute inset in frame | No `useSafeAreaInsets` in shell | Same | **Minor** | Matched |

**Counts:** 1 blocker · 6 major · 6 minor · 1 cosmetic · **14 total discrepancies**

---

## Elements that match (positive confirmation)

| Element | Design spec | Implementation | Notes |
|---------|-------------|----------------|-------|
| Background color | `#F7F8FA` | `colors.background` | Exact token match |
| Horizontal padding | 24 px | `spacing.lg` (24) | ✓ |
| Section gaps (most blocks) | 24 px | Brand→title 24; tagline→form 24; forgot→button 24; button→footer 24 | Achieved via mixed margins; see spacing note below |
| Title copy | “Welcome back” | `auth.login.title` | ✓ |
| Tagline copy | “Pick up your plan where you left off.” | `auth.login.tagline` | ✓ |
| Title typography | 22 px / 700 / `#111827` / centered | `typography.heading`, bold, `textAlign: 'center'` | ✓ |
| Tagline typography | 14 px / 400 / `#6B7280` / left in full-width row | `typography.body`, `textSecondary`, default left align | ✓ (prior note claiming centered tagline is **incorrect**) |
| Tagline alignment vs form | Left-aligned with inputs (`x: 24`) | Left-aligned with form labels | ✓ both platforms |
| Field labels | 14 px / 600 / `#111827` | `typography.body`, semibold, `textPrimary` | ✓ |
| Label → input gap | 8 px | `spacing.sm` (8) | ✓ |
| Input height | 48 px | `minHeight: 48` | ✓ |
| Input fill / border colors | `#FFFFFF` / `#E5E7EB` | `surface` / `border` | ✓ |
| Input horizontal padding | 16 px | `spacing.md` (16) | ✓ |
| Input placeholder size/color | 16 px / `#6B7280` | `bodyLarge` / `textSecondary` | ✓ |
| Placeholder copy | `you@example.com`, `Your password` | i18n keys match | ✓ |
| Email/password stack gap | 16 px | `FormTextField.container marginBottom: 16` | ✓ |
| Forgot password copy | “Forgot password?” | `auth.login.forgotPassword` | ✓ |
| Forgot password style | 14 px / 600 / `#6B7280` / right | `typography.body`, semibold, `textSecondary`, `alignSelf: 'flex-end'` | ✓ |
| Primary button copy | “Log in” | `auth.login.submit` | ✓ |
| Primary button colors | `#111827` fill, `#FFFFFF` label | `accent` / `textInverse` | ✓ |
| Primary button radius | 36 px pill | `radii.pill` (36) | ✓ |
| Primary button label | 16 px / 600 | `bodyLarge` / semibold | ✓ |
| Accent bar | 32 × 4 px, radius 2, `#22C55E` | `AuthBrandHeader.accentBar` | ✓ |
| Brand block left alignment | `x: 24` | Default column start | ✓ |

---

## Detailed discrepancy entries

### 1. Decorative atmosphere background

| Field | Value |
|-------|-------|
| **Element** | Background decorative shapes (blue block, green line, green circle, bottom accent line) |
| **Design spec** | **None.** Root frame `VvhuQ` is solid `#F7F8FA` only. |
| **iOS implementation** | Visible: pale blue rectangle top-right, horizontal green line mid-left, faint green circle lower-right. Source: `AuthScreenShell.component.tsx` lines 39–45 (`atmosphere` SVG layer). |
| **Android implementation** | Same shapes; green horizontal line **visually overlaps tagline** (“Pick up your plan…”), creating a readability defect. |
| **Severity** | **Blocker** — not in approved design; causes platform-visible layout/legibility issue. |
| **Fix guidance** | Remove or gate the `atmosphere` `<View>` + SVG in `AuthScreenShell.component.tsx` (or add a `showAtmosphere={false}` prop defaulting off for auth). Do **not** add these shapes to the Pencil file unless design team approves. |
| **Platform parity** | Both render atmosphere; Android intersection is worse. |

---

### 2. Screen top padding

| Field | Value |
|-------|-------|
| **Element** | Content inset from top of screen |
| **Design spec** | `I1rxW` padding top **56 px** (layout: brand block starts at `y: 56`). |
| **iOS implementation** | `AuthScreenShell.styles.ts` → `scrollContent.padding: spacing.lg` → **24 px**. Logo appears tight against status bar in screenshot. |
| **Android implementation** | Same **24 px** padding. |
| **Severity** | **Major** |
| **Fix guidance** | In `AuthScreenShell.styles.ts`, change `scrollContent` to use asymmetric padding matching design: `paddingTop: 56` (or new token e.g. `composition.authTopInset: 56`), keep `paddingHorizontal: spacing.lg` (24), `paddingBottom: 40`. Consider combining with `useSafeAreaInsets().top` if 56 should be *in addition to* safe area — design frame suggests 56 from full frame top. |
| **Platform parity** | Matched (both under-padded). |

---

### 3. Brand wordmark casing

| Field | Value |
|-------|-------|
| **Element** | Brand wordmark text |
| **Design spec** | Node `fSFoN`: content **`"Flex"`** (sentence case), 28 px, 700, `#111827`. |
| **iOS implementation** | Renders **`FLEX`**. i18n value is `"Flex"` (`en.json` → `app.name`) but `AuthBrandHeader.styles.ts` applies `textTransform: 'uppercase'`. |
| **Android implementation** | Same **`FLEX`**. |
| **Severity** | **Major** |
| **Fix guidance** | Remove `textTransform: 'uppercase'` from `AuthBrandHeader.styles.ts` → `brand` style. Verify no other uppercase transform on auth screens. |
| **Platform parity** | Matched. |

---

### 4. Form input corner radius

| Field | Value |
|-------|-------|
| **Element** | Email / password input containers |
| **Design spec** | Nodes `MvTIv`, `oflWy`: **`cornerRadius: 12`**, height 48, 1 px `#E5E7EB` stroke. |
| **iOS implementation** | Visually tighter corners (~8 px). Code: `FormTextField.styles.ts` → `borderRadius: radii.md` (**8**). |
| **Android implementation** | Same **8 px**. |
| **Severity** | **Major** |
| **Fix guidance** | Option A: add `radii.input: 12` to `StyleConstants.ts` and use in `FormTextField.styles.ts`. Option B: change `radii.md` to 12 if globally intended (verify other screens first). Target: **`borderRadius: 12`**. |
| **Platform parity** | Matched. |

---

### 5. Primary button height

| Field | Value |
|-------|-------|
| **Element** | “Log in” primary CTA |
| **Design spec** | Node `n2dJp`: **height 56**, `cornerRadius: 36`, `padding: 16`, width 342. |
| **iOS implementation** | Slightly shorter than design. Code: `PrimaryButton.styles.ts` → `minHeight: 52`. |
| **Android implementation** | Same **`minHeight: 52`**. |
| **Severity** | **Major** |
| **Fix guidance** | In `PrimaryButton.styles.ts`, set `minHeight: 56` (or `height: 56` with centered label). Aligns with design component `pdrz0`. |
| **Platform parity** | Matched. |

---

### 6. Password visibility icon

| Field | Value |
|-------|-------|
| **Element** | Trailing icon in password field |
| **Design spec** | Node `Z7VdR`: Lucide **`eye`** icon, 22 × 22, `#6B7280`, default hidden-password state. |
| **iOS implementation** | Shows **eye-off** (eye with slash) when password is hidden. `PasswordVisibilityIcon.component.tsx` renders slash variant when `visible === false`. |
| **Android implementation** | Same **eye-off** when hidden. |
| **Severity** | **Major** (wrong iconography vs spec; common pattern is `eye` = “tap to reveal”) |
| **Fix guidance** | In `PasswordVisibilityIcon.component.tsx`, swap icon states: when `!visible` (password hidden), render **`eye`** outline; when visible, render **`eye-off`**. Match Lucide stroke weight ~1.75 and 22 px size. Alternatively import lucide-react-native if project adds it. |
| **Platform parity** | Matched. |

---

### 7. Title → tagline vertical spacing

| Field | Value |
|-------|-------|
| **Element** | Gap between “Welcome back” and tagline |
| **Design spec** | Parent `I1rxW` gap **24 px**. Layout: title ends ~`y: 178`, tagline starts `y: 202` → **24 px**. |
| **iOS implementation** | **8 px** — `Login.styles.ts` → `tagline.marginTop: 8`. |
| **Android implementation** | Same **8 px**. |
| **Severity** | **Major** |
| **Fix guidance** | In `Login.styles.ts`, change `tagline.marginTop` from `8` to **`24`** (or `spacing.lg`). Remove double-counting if a wrapper gap is introduced later. |
| **Platform parity** | Matched. |

---

### 8. Brand font size

| Field | Value |
|-------|-------|
| **Element** | Brand wordmark size |
| **Design spec** | **28 px** (`fSFoN.fontSize: 28`). |
| **iOS implementation** | **30 px** — `typography.display + 2` (28 + 2) in `AuthBrandHeader.styles.ts`. |
| **Android implementation** | Same **30 px**. |
| **Severity** | **Minor** |
| **Fix guidance** | Change `brand.fontSize` to `typography.display` (28) in `AuthBrandHeader.styles.ts`. |
| **Platform parity** | Matched. |

---

### 9. Brand letter-spacing

| Field | Value |
|-------|-------|
| **Element** | Brand wordmark tracking |
| **Design spec** | Inter default (no explicit letterSpacing on `fSFoN`). |
| **iOS implementation** | **`letterSpacing: 3`** (`letterSpacing.brand`) widens “FLEX”. |
| **Android implementation** | Same. |
| **Severity** | **Minor** (compounds casing issue) |
| **Fix guidance** | Remove or reduce `letterSpacing` on `AuthBrandHeader.styles.ts` → `brand` (target **0** for design parity). |
| **Platform parity** | Matched. |

---

### 10. Footer “Sign up” link emphasis

| Field | Value |
|-------|-------|
| **Element** | “Need an account? Sign up” footer |
| **Design spec** | Node `TG6yh`: entire string **14 px / 400 / `#6B7280`**, `textAlign: center`. No weight/color split. |
| **iOS implementation** | “Need an account? ” in `textSecondary`; **“Sign up”** in `textPrimary` + semibold (`Login.styles.ts` → `linkEmphasis`). |
| **Android implementation** | Same split styling. |
| **Severity** | **Minor** |
| **Fix guidance** | In `Login.styles.ts`, remove distinct `linkEmphasis` color/weight **or** set `linkEmphasis` to same as `linkText` (`textSecondary`, weight 400). Confirm with design if tap target should still be Pressable-only on “Sign up” substring. |
| **Platform parity** | Matched. |

---

### 11. Screen bottom padding

| Field | Value |
|-------|-------|
| **Element** | Content inset from bottom |
| **Design spec** | `I1rxW` padding bottom **40 px**. |
| **iOS implementation** | **`paddingBottom: spacing.xxl` (48)** in `AuthScreenShell.styles.ts`. |
| **Android implementation** | Same **48 px**. |
| **Severity** | **Minor** |
| **Fix guidance** | Set `scrollContent.paddingBottom` to **40** (or add `composition.authBottomInset: 40`). |
| **Platform parity** | Matched. |

---

### 12. Input border thickness

| Field | Value |
|-------|-------|
| **Element** | Text field outline |
| **Design spec** | **1 px** stroke (`stroke.thickness: 1`). |
| **iOS implementation** | `StyleSheet.hairlineWidth` (~0.5–1 pt depending on density). |
| **Android implementation** | Same hairline. |
| **Severity** | **Minor** |
| **Fix guidance** | In `FormTextField.styles.ts`, set `borderWidth: 1` explicitly if pixel parity required. |
| **Platform parity** | Matched. |

---

### 13. Accent bar bottom spacing (within brand block)

| Field | Value |
|-------|-------|
| **Element** | Space below green accent bar in brand header |
| **Design spec** | Brand stack `I6Tjwa` gap **8 px** between accent bar and next node (`wwSaN` → `WodEB`). |
| **iOS implementation** | `accentBar.marginBottom: spacing.md` (**16 px**). |
| **Android implementation** | Same **16 px**. |
| **Severity** | **Minor** |
| **Fix guidance** | In `AuthBrandHeader.styles.ts`, change `accentBar.marginBottom` to **`spacing.sm` (8)**. Note: design includes empty text node `WodEB` (17 px tall, no content) — likely a placeholder; implementation can omit the empty node and rely on parent 24 px gap to title. |
| **Platform parity** | Matched. |

---

### 14. Typeface family

| Field | Value |
|-------|-------|
| **Element** | All text |
| **Design spec** | **Inter** throughout. |
| **iOS implementation** | AvenirNext variants via `StyleConstants.fonts`. |
| **Android implementation** | `sans-serif` / `sans-serif-black` / `sans-serif-condensed`. |
| **Severity** | **Cosmetic** (RN platform fonts unless Inter loaded) |
| **Fix guidance** | Only if strict parity required: load Inter via `expo-font` / linked assets and reference in `StyleConstants.fonts`. Otherwise document as accepted platform rendering. |
| **Platform parity** | Expected cross-platform difference. |

---

### 15. Safe-area / status-bar inset handling

| Field | Value |
|-------|-------|
| **Element** | Top inset relative to notch/status bar |
| **Design spec** | Static 844 frame; content padding 56 from frame top. |
| **iOS implementation** | `AuthScreenShell` does not call `useSafeAreaInsets`; relies on navigator + 24 px padding only. |
| **Android implementation** | Same. |
| **Severity** | **Minor** (pairs with #2) |
| **Fix guidance** | After fixing padding to 56, validate on notched devices. If design intent is `56 + safeArea.top`, use `paddingTop: insets.top + 56` in `AuthScreenShell` or pass `contentStyle` from Login. |
| **Platform parity** | Matched. |

---

## Spacing stack reference (design layout snapshot)

Vertical positions inside `I1rxW` (1× logical px):

```
y=56   Brand block (I6Tjwa, h=71)
y=151  Title “Welcome back” (h=27)          ← 24 px gap above
y=202  Tagline (h=17)                       ← 24 px gap above
y=243  Form stack (h=162)                     ← 24 px gap above
y=429  Forgot password (h=17)                 ← 24 px gap above
y=470  Log in button (h=56)                   ← 24 px gap above
y=550  Footer link (h=17)                     ← 24 px gap above
```

Implementation achieves most 24 px gaps via compound margins except **title→tagline (8 px)**.

---

## Prior gap notes — independent verification

| Prior note | Verified? | Finding |
|------------|-----------|---------|
| AuthScreenShell top padding 24 vs 56 | ✅ Confirmed | Major discrepancy (#2) |
| FormTextField radius 8 vs 12 | ✅ Confirmed | Major (#4) |
| Brand casing FLEX vs Flex | ✅ Confirmed | Major (#3); caused by `textTransform: 'uppercase'` |
| Title centering | ✅ Matches | `textAlign: 'center'` correct |
| Tagline placement | ⚠️ Partially corrected | Design tagline is **left-aligned**, not centered; implementation matches alignment but spacing is 8 vs 24 |
| Forgot password styling/placement | ✅ Mostly matches | Style and right alignment correct; vertical gap OK |
| Password eye icon | ✅ Confirmed wrong | Design `eye`, impl `eye-off` when hidden (#6) |
| PrimaryButton height ~52 vs 56 | ✅ Confirmed | Major (#5) |
| Decorative atmosphere in app not in design | ✅ Confirmed | Blocker (#1) |

---

## Recommended fix order (for implementing agent)

1. **Remove auth atmosphere layer** — eliminates blocker and Android tagline overlap.
2. **Fix top padding to 56 px** — largest layout shift vs design.
3. **Brand casing + letter-spacing + font size** — quick wins in `AuthBrandHeader.styles.ts`.
4. **Input radius 12 + button height 56** — shared components benefit all auth screens.
5. **Password eye icon swap + title/tagline spacing** — Login-specific polish.
6. **Footer link uniform styling + bottom padding 40** — minor fidelity pass.

---

## Files most likely to change (future work)

| Priority | File | Properties |
|----------|------|------------|
| P0 | `AuthScreenShell.component.tsx` | Remove/disable `atmosphere` SVG |
| P0 | `AuthScreenShell.styles.ts` | `paddingTop: 56`, `paddingBottom: 40` |
| P1 | `AuthBrandHeader.styles.ts` | Remove `textTransform`, `letterSpacing`; `fontSize: 28`; `accentBar.marginBottom: 8` |
| P1 | `FormTextField.styles.ts` | `borderRadius: 12`, optional `borderWidth: 1` |
| P1 | `PrimaryButton.styles.ts` | `minHeight: 56` |
| P2 | `Login.styles.ts` | `tagline.marginTop: 24`; flatten `linkEmphasis` |
| P2 | `PasswordVisibilityIcon.component.tsx` | Swap eye / eye-off states |

---

*End of audit report.*
