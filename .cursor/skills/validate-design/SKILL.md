---
name: validate-design
description: Compare React Native implementation against Pencil design using screenshots and design file review.
---

# Validate Design (Flex)

Compare implementation vs design for Flex mobile.

For a **full, reproducible audit** (dated folder, Maestro capture, detailed report), use **audit-design-implementation** (`.cursor/skills/audit-design-implementation/SKILL.md`). To **fix drift and iterate to parity**, use **reconcile-design-implementation**.

## Quick compare (lightweight)

1. Read design frames via Pencil MCP + screenshots
2. Run app in simulator or use validate-ui skill
3. Compare states, spacing, typography, colors
4. Note gaps; escalate to full audit if many discrepancies

## Full audit

See `design/implementationValidation/README.md`, **audit-design-implementation**, and **reconcile-design-implementation** (session `initialAudit` / `finalAudit` folders).

## Focus Areas

- All frames/states from `.pen` file
- Token usage matches StyleConstants
- Touch targets and mobile layout
- iOS vs Android parity
