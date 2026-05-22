---
name: checkProductFlowDocs
description: Run the productFlow drift check on the current changes; if it fails, update the matching docs/flows/{flowKey}/ files before committing.
---

# Check product flow docs

Use after touching screens (`src/screens/...`), redux states (`src/redux/states/...`), the router (`src/router/...`), or the API client.

## Steps

1. From the project root, run:
   - Staged changes: `npm run check:product-flow-docs` (default `--staged`)
   - Working tree: `npm run check:product-flow-docs -- --working-tree`
2. **Exit 0** — no flow-relevant paths changed, or staged docs already cover the affected flowKeys substantively. Nothing to do.
3. **Exit 1** — flowKeys are listed in stderr. Update `docs/flows/{flowKey}/{flowKey}.flow.md` (and `docs/productFlows.changelog.md` if user-visible). Stage those updates in the **same commit** as the code change, then re-run.
4. Escape hatch: `flexmobile_SKIP_FLOW_DOC_CHECK=1 git commit ...` — only when justified.

## Notes

- `crossCutting` keys are triggered by router, App.tsx, and apiClient endpoint changes — those touch every flow.
- A "substantive" doc change requires ≥ 3 changed non-whitespace lines and at least one line that isn't only a `lastReviewed:` bump.
- The mapping rules live at the top of `src/shared/scripts/productFlows/checkProductFlowDocsDrift.scripts.ts`. Edit there as new screens/states are added.
