# Global architecture

- **Monorepo:** `apps/mobile`, `apps/api`, `shared` (`@flex/shared`)
- **Data:** Prisma → Postgres (`DATABASE_URL` + `certs/supabase-ca-dev.crt` when not local)
- **Auth:** Express JWT; mobile Keychain Bearer token
- **AI:** OpenAI via `ai.client` (swappable `AI_PROVIDER`)
- **Progression:** deterministic rules in `@flex/shared/functions/progression`
- **Deploy:** DigitalOcean App Platform (API container only)
