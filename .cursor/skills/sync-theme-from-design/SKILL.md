---
name: sync-theme-from-design
description: Promote new design tokens from approved .pen files into apps/mobile/src/shared/styles/StyleConstants.ts.
---

# Sync Theme from Design (Flex)

Extract new tokens from approved designs and update `StyleConstants.ts`.

## Target File

`apps/mobile/src/shared/styles/StyleConstants.ts`

## Process

1. Parse token annotations from design file (Pencil MCP)
2. Add new entries to appropriate export (`colors`, `spacing`, etc.)
3. Update `design/docs/themeTokens.docs.md`
4. Update token `.pen` file if needed

## Note

Flex currently uses a single light theme in StyleConstants. Document any future dark mode values in design docs.
