# Gym Locations & Equipment — Mobbin Research

Sources: Mobbin iOS deep search (May 2026). Apps: Fitbod, Centr, Future, Peloton Strength+, Tempo, Bevel.

## Search queries run

- gym profile equipment checklist fitness app onboarding
- home gym setup equipment selection workout location
- location switcher gym settings fitness app equipment

## Patterns to adopt for Flex

### 1. Location as first-class profile (Fitbod)

- **"Your Gym"** hub with title chevron = location switcher
- **NEW** pill creates additional profiles (home vs commercial)
- **Duplicate profile** in action sheet — fast way to clone equipment sets
- **Gym Profile** education modal on first visit — explain why equipment matters

**Flex:** Settings list + default star; onboarding Step 9 for multi-location.

### 2. Equipment count on hub row (Fitbod, Bevel)

- Settings shows **"64 Selected"** or **"7 hidden"** — summary without opening editor
- Reduces anxiety; user knows setup is complete

**Flex:** `LocationCard` shows `{n} items`; detail row matches.

### 3. Category-scoped checklist (Fitbod, Peloton Strength+)

- Horizontal category pills (Free weights, Racks, Machines…)
- 2-column grid with photo/icon + toggle
- **Select all** for commercial gym path (Peloton copy: "Most gyms will have it all!")
- **Bodyweight only** shortcut (Fitbod toggle)

**Flex:** `EquipmentPickerSheet` with pills + chip grid; quick actions on editor.

### 4. Custom / granular equipment (Fitbod, Tempo)

- **Common weights** vs **Custom weights** sub-cards for dumbbells/kettlebells
- Tempo: per-item quantity ("2") and max weight summary card
- Future: selected chips bucket + search at top

**Flex:** `CustomEquipmentInput` modal; optional quantity later.

### 5. Search-first long lists (Centr)

- Alphabetical sections with search filtering
- Checkbox rows in white cards on gray background
- Sticky **Save** CTA

**Flex:** Use search when catalog > ~20 items.

### 6. Onboarding progressive disclosure (Tempo, Aaptiv)

- Card paths: No equipment → Add dumbbells → All equipment
- Avoid 50 toggles on first screen

**Flex:** Onboarding Step 6 intro before Step 8 full grid; preset type on Step 7.

### 7. Active equipment vs saved profile (Peloton Strength+)

- Workout customize: **Your equipment** vs **All gym equipment** vs **None**
- Link **Edit your equipment** to settings

**Flex:** Today mismatch sheet + link to settings equipment editor.

## Easy-to-miss details

| Pattern | Why it matters |
|---------|----------------|
| Location name in equipment header | User confirms which gym they're editing (Fitbod "Large Gym") |
| Skip on long checklist | Fitbod "Skip" on step 4/8 — don't force completeness at onboarding |
| Default ≠ only location | Fitbod allows many profiles but one active for workout generation |
| Duplicate profile | Faster than re-tapping 64 items for "Work gym" vs "Home gym" |
| Education modal once | Reduces support tickets; link from Settings list |
| Equipment in plan gen loader | Show third bullet "Equipment" during generating (credibility) |
| Mismatch before start | Peloton-style preset picker at workout time — Flex should prompt switch |

## Mobbin reference links

- [Fitbod — Your Gym settings](https://mobbin.com/screens/5ca9653f-6cc9-4bf5-ad5f-f9d987b0481f)
- [Fitbod — Available Equipment checklist](https://mobbin.com/screens/966e9c14-e8c9-4d82-adb5-0b09b4b7b45c)
- [Centr — My Equipment search list](https://mobbin.com/screens/1718433a-0b54-488b-97f3-2c42bd8bb4f1)
- [Future — Home equipment chips](https://mobbin.com/screens/d0bb3c9e-10dd-4249-8227-abe87efa2535)
- [Peloton Strength+ — Equipment grid](https://mobbin.com/screens/3a07a7ca-7175-4c0c-a1b6-018617ee8631)
- [Tempo — Equipment settings cards](https://mobbin.com/screens/223fb09a-2ef8-4dd1-8dfe-cb8ada550f92)

## Flex-specific decisions

- Light neutral UI (match existing Flex tokens) vs Fitbod dark — keep Flex `StyleConstants`
- Multi-location in onboarding (Steps 6–9) **and** Settings — parity with Fitbod profiles
- `activeLocationId` for Today separate from `isDefault` for plan generation
- Custom equipment allowed in onboarding (not settings-only)
