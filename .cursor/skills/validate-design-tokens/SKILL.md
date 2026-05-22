---
name: validate-design-tokens
description: Check if design file token annotations match StyleConstants.ts in the Flex mobile app.
---

# Validate Design Tokens (Flex)

Compare design annotations against `apps/mobile/src/shared/styles/StyleConstants.ts`.

## Process

1. Extract token references from `.pen` file via Pencil MCP
2. Parse `StyleConstants.ts` for `colors`, `spacing`, `typography`, `radii`
3. Report valid, mismatched, and missing tokens

## Token Prefixes

- `colors.*`
- `spacing.*`
- `typography.*`
- `radii.*`

## Actions

- Missing tokens → use `sync-theme-from-design`
- Mismatches → update design or code intentionally
