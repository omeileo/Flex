# Flex — App Store / Play release checklist (MVP manual)

## Identifiers

- Bundle ID / applicationId: `com.flex.app`
- Enable push capability if using Notifee for rest timer

## iOS

1. Apple Developer account; App ID + capabilities
2. Distribution cert + profile
3. `npm run setup-env -- production` in `apps/mobile`
4. Archive in Xcode → TestFlight internal group
5. App Privacy: health/fitness data, AI-generated plans disclosure

## Android

1. Upload keystore (secure); configure release signing in `android/app/build.gradle`
2. `npm run setup-env -- production`
3. `./gradlew bundleRelease` in `apps/mobile/android`
4. Play Console internal testing track
5. Data safety form; justify Notifee / exact alarm for rest timer if used

## API (DigitalOcean)

1. App Platform component `apps/api`
2. Secrets: `DATABASE_URL`, `JWT_SECRET_KEY`, `OPENAI_*`, `CORS_ORIGIN`
3. Pre-deploy: `npx prisma migrate deploy`
4. Health check on `/api/health-check`
