# Flex

Strength training MVP — React Native mobile + Express API monorepo.

## Layout

| Path | Package |
|------|---------|
| `apps/mobile` | `@flex/mobile` |
| `apps/api` | `@flex/api` |
| `shared` | `@flex/shared` |

## Prerequisites

- Node 20+
- Docker (local Postgres)
- Xcode / Android Studio (mobile)

## Setup

```bash
npm ci
npm run build:shared
cp apps/api/.env.example apps/api/.env   # if present; configure DATABASE_URL
docker compose up -d
cd apps/api && npx prisma migrate dev && npm run seed-database
```

## Development

```bash
npm run dev:api      # Express on :3000
npm run dev:mobile   # Metro
```

Mobile env:

```bash
cd apps/mobile && npm run setup-env -- local
```

Set `API_BASE_URL` in `apps/mobile/src/networkRequests/environmentVariables/local.json` (e.g. `http://localhost:3000/api`).

## AI provider

`apps/api` uses Budgy-style `ai.client`. Default provider: OpenAI.

| Variable | Purpose |
|----------|---------|
| `AI_PROVIDER` | `openai` (default) |
| `OPENAI_API_KEY` | API key |
| `OPENAI_MODEL` | e.g. `gpt-4o-mini` |
| `OPENAI_BASE_URL` | optional override |

Without `OPENAI_API_KEY`, plan generation uses a deterministic fallback.

## Database

- **Local:** docker Postgres via root `docker-compose.yml`
- **Staging/prod:** Supabase Postgres `DATABASE_URL` + `apps/api/certs/supabase-ca-dev.crt` (no `SUPABASE_*` client env vars)

Exercise `video_url` values are public Supabase Storage HTTPS URLs in seed data.

## Product flow docs

- `docs/flows/` — per-screen flows
- `npm run check:product-flow-docs` — drift check (root)

## Release

See [docs/RELEASE.md](docs/RELEASE.md) for manual TestFlight / Play internal track steps.

## Commits

`FLEX-##: (feat) Description`
