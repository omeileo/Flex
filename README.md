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
- Ruby + Bundler for iOS CocoaPods (`bundle install` in `apps/mobile`; gems install to `apps/mobile/vendor/bundle`, which is gitignored)

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
npm run dev:api      # Express on :3005 (see apps/api/.env PORT)
npm run dev:mobile   # Metro
```

Mobile env:

```bash
cd apps/mobile && npm run setup-env -- local
```

Android builds use monorepo-hoisted `node_modules` at the repo root (see `apps/mobile/android/settings.gradle` and `app/build.gradle`). Set `JAVA_HOME` to Android Studio’s JBR if `java` is not on your PATH:

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
cd apps/mobile/android && ./gradlew assembleDebug
```

Set `API_BASE_URL` in `apps/mobile/src/networkRequests/environmentVariables/local.json` to match `PORT` in `apps/api/.env` (default `http://localhost:3005/api`).

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
