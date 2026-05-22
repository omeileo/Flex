# Flex API — Deploy (DigitalOcean + Supabase Postgres)

## Environment variables

| Variable | Notes |
|----------|-------|
| `DATABASE_URL` | Supabase Postgres pooler URI (not `SUPABASE_*` keys) |
| `JWT_SECRET_KEY` | Auth signing |
| `OPENAI_API_KEY` | Plan generation (optional — fallback if unset) |
| `OPENAI_MODEL` | e.g. `gpt-4o-mini` |
| `AI_PROVIDER` | `openai` |
| `CORS_ORIGIN` | Mobile / web origins |
| `PRODUCT_NAME` | `Flex` |
| `ENABLE_TEMPLATE_PAYMENTS` | `false` for Flex MVP |

## SSL

Place `certs/supabase-ca-dev.crt` in the api component. Prisma uses `@prisma/adapter-pg` with SSL when host is not localhost.

## Pre-deploy

```bash
npx prisma migrate deploy
npm run seed-database
```

## App Platform

- Source: `apps/api`
- Build: `npm run build`
- Run: `npm run start`
- Health: `GET /api/health-check`

## Exercise media

Upload videos to Supabase Storage (public bucket). Put HTTPS URLs in seed / DB — no Storage SDK in api.
