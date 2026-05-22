# Design Workflow for AI Agents

## When to Design First

- New onboarding or plan presentation flows
- Major UX changes to Today/Plan screens
- New component primitives (workout card variants)

## Implementation Path

1. Review `.pen` flow and component files
2. Map frames to `apps/mobile/src/screens/` or `shared/components/`
3. Use token names from `StyleConstants.ts` in styles files
4. Validate with `validate-design` skill when implementation exists

## Cursor Skills

| Skill | Use when |
|-------|----------|
| `create-flow-design` | New multi-screen flow |
| `create-component-design` | New reusable component |
| `organize-design-frames` | Re-layout frames in a .pen file |
| `validate-design-tokens` | Check design ↔ StyleConstants parity |
| `sync-theme-from-design` | Promote new tokens to code |
| `implement-design` | Convert approved design to React Native |
| `update-design-docs` | Sync markdown after design changes |

## Pencil MCP Rules

- Never Read/Grep `.pen` files directly
- Use `get_editor_state`, `batch_design`, `get_screenshot` for edits
- Set `placeholder: true` while building frames, remove when done
