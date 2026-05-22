---
name: implement-design
description: Convert an approved Flex Pencil design to React Native components following mobile app conventions.
---

# Implement Design (Flex)

Convert `.pen` designs to React Native in `apps/mobile/`.

## File Structure

```
apps/mobile/src/shared/components/{Name}/
  {Name}.component.tsx
  {Name}.types.ts
  {Name}.styles.ts
```

Screens go under `apps/mobile/src/screens/{Screen}/`.

## Rules

- Functional components only
- Styles in `.styles.ts` using `StyleConstants`
- Types in `.types.ts`
- No semicolons
- No index files

## Token Usage

Import from `@shared/styles/StyleConstants`.
