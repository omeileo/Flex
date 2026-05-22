---
name: create-flow-design
description: Scaffold a new flow design folder with proper structure, flow file, and documentation ready for design work in Pencil. Use when creating a multi-screen user flow for Flex mobile.
---

# Create New Flow Design (Flex)

Scaffold a new flow under `/design/flows/{flowName}/` following Flex conventions.

## Folder Structure

```
/design/flows/{flowName}/
  ├── {flowName}.flow.design.pen
  └── {flowName}.docs.md
```

- Folder name: camelCase (e.g. `trainingPlan`)
- Frame naming: `"{FlowName} Flow Step {N}: {Description}"`

## Frame Organization

- Happy path: left → right, 200px apart
- Error/branch states: 150px below related step
- Mobile frames: 390×844 (iPhone)

## Documentation

Update `design/flows/flows.docs.md` with the new flow entry.

## Related

- `organize-design-frames`
- `update-design-docs`
