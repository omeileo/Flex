# Flex API product-flow sync

Append-only log. When a commit changes user-facing Flex API behavior under `src/api/flex/**`, cross-cutting route wiring, or auth middleware used by Flex routes, stage an update to **this file** in the same commit so `npm run check:product-flow-api-docs` passes.

| Date | Ticket | Flow keys | Notes |
| --- | --- | --- | --- |
| 2026-05-21 | MVP | fitnessProfile, trainingPlans, exercises, workoutSessions, crossCutting | Initial Flex MVP routes: fitness profile, plan generation, progression, exercises, workout sessions |
