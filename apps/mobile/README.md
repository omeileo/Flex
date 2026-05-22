# Flex

A React Native mobile app.

## Prerequisites

- Node `>=20`
- Watchman (`brew install watchman` on macOS)
- JDK 17 (`brew install --cask zulu@17` or equivalent)
- Android SDK + an emulator AVD (Android Studio > Virtual Device Manager)
- Xcode 15+ and CocoaPods (macOS only — for iOS builds)
- Ruby + Bundler (`gem install bundler`)

## First-time setup

```bash
npm install                       # postinstall runs patch-package + jetifier
bundle install                    # Ruby gems for iOS tooling
cd ios && bundle exec pod install # macOS only
```

The `prepare` script (run automatically by `npm install`) installs husky and wires up the commit-msg + pre-push hooks.

## Environment configuration

Per-environment config lives in `src/networkRequests/environmentVariables/`:

- `local.json` — points at a developer machine
- `development.json` — shared dev backend
- `staging.json` — staging backend
- `production.json` — production backend

The active config is `env.json`, regenerated whenever you switch envs:

```bash
npm run setup-env -- development   # or local, staging, production
```

`env.json` is gitignored — every developer regenerates their own. The script also copies `env.json` into `android/app/src/main/assets/` for native access.

| Variable | Meaning |
|----------|---------|
| `ENVIRONMENT` | one of `local`, `development`, `staging`, `production` |
| `MOBILE_API_URL` | base URL prepended to every `configureRequest` call |
| `API_KEY` | sent as the `X-API-KEY` header |

## Running the app

In one terminal:

```bash
npm start                         # Metro dev server
```

In another:

```bash
npm run android                   # development env
npm run android-local             # local env
npm run android-staging           # staging env
npm run ios                       # development env (macOS)
npm run ios-staging               # staging env
```

## Running on a real device

```bash
npm run android:device-list                  # list connected devices
npm run android:device --deviceId=<id>
npm run ios:device                            # macOS, with device plugged in
```

## Hermes, debugger, feature toggles

```bash
npm run enable-hermes             # flips Podfile + gradle.properties
npm run toggle-features cicdPipeline true  # CI build with debugger on
```

`featureToggle.json` controls `ENABLE_DEBUGGER`, `ENABLE_HERMES`, `REMOVE_CONSOLE_STATEMENTS`.

## Splash screens

1. Drop `splash_screen_portrait.jpg` (or `_landscape.png`) into `src/assets/images/`.
2. Run:

```bash
npm run splash-images-setup                  # regenerate iOS + Android assets
npm run splash-portrait-generate -- 200      # derive portrait from landscape (px offset)
npm run splash-landscape-generate -- 200     # derive landscape from portrait
npm run splash-change portrait               # one-shot orchestrator
```

## Email verification and deep links

After sign-up, the app navigates to **Verify email** where the user enters the 6-character code from their inbox.

| Deep link format | Example |
|------------------|---------|
| `flex://verify?code={CODE}&email={EMAIL}` | `flex://verify?code=XC2DAS&email=user@example.com` |

iOS registers the `flex` URL scheme in `ios/FlexMobile/Info.plist`. Android handles `flex://verify` via an intent filter in `android/app/src/main/AndroidManifest.xml`. React Navigation linking is configured in `src/router/linking.config.ts`.

Opening the deep link pre-fills the code and email, submits verification, then navigates to **Log in** with a success message.

### Local API testing

With the API on port **3005** and base path `/api`:

```bash
# Verify with code + email
curl -s -X POST http://localhost:3005/api/auth/verify-email \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","code":"XC2DAS"}'

# Resend verification email
curl -s -X POST http://localhost:3005/api/auth/verify-email/resend \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com"}'
```

If SMTP is not configured, verification emails are still built and may be logged to the console (see API email helpers). Apply the Prisma migration `20260522120000_email_verification_short_code` before testing sign-up.

### Simulator deep link

```bash
# iOS Simulator
xcrun simctl openurl booted "flex://verify?code=XC2DAS&email=user@example.com"

# Android emulator
adb shell am start -a android.intent.action.VIEW -d "flex://verify?code=XC2DAS&email=user@example.com"
```

## Demo data

The first build ships a working JSONPlaceholder Posts demo so you can see the full stack work end-to-end without writing code:

`router → redux thunk → posts.api.ts → configureRequest → JSONPlaceholder /posts → reducer → screen → i18n header`

When you're ready to remove it:

```bash
npm run remove-demo-code
```

…or invoke the `/remove-demo-code` skill from Claude Code.

## Scripts cheat sheet

| Command | What it does |
|---------|--------------|
| `npm start` | Start Metro |
| `npm run android` / `ios` | Build + launch (development env) |
| `npm run android-local` / `ios-local` | Local env build |
| `npm run android-staging` / `ios-staging` | Staging env build |
| `npm run android-production` / `ios-production` | Production env build |
| `npm run setup-env -- <env>` | Switch active env file |
| `npm run enable-hermes` | Turn on Hermes for both platforms |
| `npm run remove-console-statements` | Strip `console.*` calls from `src/` |
| `npm run toggle-features <env> <bool>` | Set feature flags for the next build |
| `npm run splash-images-setup` | Regenerate splash assets |
| `npm run splash-change <orientation>` | Convert portrait↔landscape splash |
| `npm run lint` / `lint-validate` | ESLint with autofix / quiet validation |
| `npm run tsc` | Type-check with no emit |
| `npm run test` / `test:watch` / `test:coverage` | Jest |
| `npm run clean` / `clean:install` | Wipe build caches / wipe + reinstall |
| `npm run remove-demo-code` | Delete the JSONPlaceholder Posts demo |
| `npm run create-patch <pkg>` | Create a patch-package patch |

## Architecture & contributing

This app uses a layered architecture: `redux/` for state, `networkRequests/` for I/O, `screens/` for feature views, `shared/` for cross-feature primitives, and `router/` for navigation. Every feature follows strict file-naming conventions enforced by ESLint.

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture spec, including:
- File-naming rules (`.component.tsx`, `.container.tsx`, `.actions.ts`, `.reducer.ts`, `.api.ts`, etc.)
- The redux seven-file slice pattern
- The per-feature `*.api.ts` API pattern
- Forms via react-hook-form + yup
- i18n usage (`useTranslation`, never hardcoded strings)
- When to invoke the generator skills

When adding new code from Claude Code, prefer the dedicated skills:

- `/generate-redux-slice` — scaffolds a new redux slice (actions, reducer, types, api, tests)
- `/generate-screen` — scaffolds a new screen (container, component, styles, types, validation, tests) and wires it into the router
- `/generate-component` — scaffolds a shared component

## Commit message format

Hook-enforced format:

```
FLEX-<number>: (<tag>, <tag>) <message>
```

Allowed tags: `bug-fix, config, design, feat, ios, misc, refactor, security-fix, style, test`.

Example:

```
FLEX-1234: (feat, design) Add account opening flow
```

## Troubleshooting

- **Pod install fails** — `cd ios && pod deintegrate && pod install --repo-update`
- **Metro stale cache** — `npm start -- --reset-cache`
- **Gradle errors** — `npm run clean-android`
- **Watchman acting up** — `watchman watch-del-all`
- **Everything broken** — `npm run clean:install`
