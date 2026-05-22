---
name: organize-design-frames
description: Auto-organize frames in a Flex design file using the strategy for that file type (flow, component, tokens).
---

# Organize Design Frames (Flex)

Apply spacing strategies from `design/docs/frameNaming.docs.md`:

| File type | Strategy |
|-----------|----------|
| tokens | Group by category, 100px between groups |
| component | States horizontal 200px, variants vertical 300px |
| flow | Steps horizontal 200px, branches below 150px |
| exploration | Directions separated 400px |

Use Pencil MCP `batch_get` + `batch_design` to reposition frames.
