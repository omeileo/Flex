# Flex — Architecture & Contribution Rules

This document tells AI assistants and human contributors how to add code to this app without breaking conventions. ESLint and git hooks enforce the most important rules; everything else is documented here.

## Architecture map

```
src/
  redux/
    store/                 store.ts (combineReducers + reset on logout) + store.types.ts
    states/<domain>/<action>/
      <action>.slice.ts        createAsyncThunk + createSlice
      <action>.api.ts          per-action endpoint function
      <action>.initialState.ts default slice state
      <action>.types.ts        request/response/state shapes
      __tests__/               jest tests for the slice
  networkRequests/
    apiClient/
      apiClient.functions.ts   configureRequest + executeRequest + replacePathVariables
      apiClient.types.ts       ApiClientRequestConfig
      endpoints.ts             all url paths, grouped by domain
      env.config.ts            typed accessor for env values
      setEnv.scripts.ts        node script to materialize env.json from <env>.json
    environmentVariables/      <env>.json files + materialized env.json
  screens/<Screen>/        feature view (container + component + styles + types + tests)
  shared/
    components/<Comp>/     reusable presentational primitives
    eslintCustomRules/     project-local ESLint rules (e.g. space-after-closing-tag)
    functions/<Util>/      one folder per utility (Auth, Clipboard, Date, ErrorHandler, ID,
                           LocalStorage, Logger, Redux, String, Styling, UserRole, ...)
    hooks/                 cross-feature hooks
    subjects/              RxJS Subjects for pub/sub (snackbar, popupModal, sessionTimeout, ...)
    styles/                StyleConstants + appDefault.styles
    dictionary/            constants/enums
    types/                 ambient + global types (api.types, slice.types, global.d.ts)
    localization/          i18next init + locale JSONs
    gitFiles/              source-of-truth git hooks (copied into .husky)
    scripts/
      build/               enableHermes, removeConsoleStatements, toggleFeatures, removeDemoCode
      dev/                 launchAndroidEmulator.sh
      git/                 updateGitHooks
      productFlows/        checkProductFlowDocsDrift
      react/               generateComponent, generateScreen
      redux/               generateApiReduxState
      SplashScreenGenerator/
  router/
    router.ts              wires the active routes
    router.types.ts        Route shape
    routes.dictionary.tsx  dictionary keyed by route name
    components/            AuthGate (auth + role guard)
    functions/             generateRoutes + custom navigate/route hooks
```

## Path aliases

| Alias | Resolves to |
|-------|-------------|
| `@/*` | `src/*` |
| `@shared/*` | `src/shared/*` |
| `@redux/*` | `src/redux/*` |
| `@screens/*` | `src/screens/*` |
| `@network/*` | `src/networkRequests/*` |
| `@router/*` | `src/router/*` |

## File-naming table

| Suffix | Used for | Example |
|--------|----------|---------|
| `.component.tsx` | Functional presentational component | `PostsList.component.tsx` |
| `.container.tsx` | Functional redux-connected wrapper | `PostsList.container.tsx` |
| `.styles.ts` | `StyleSheet.create` definitions | `PostsList.styles.ts` |
| `.types.ts` | Local TS interfaces | `PostsList.types.ts` |
| `.validation.ts` | yup schema + dictionary of error messages | `LoginForm.validation.ts` |
| `.tests.tsx` / `.tests.ts` | Jest / RNTL tests | `PostsList.tests.tsx` |
| `.slice.ts` | RTK slice (`createAsyncThunk` + `createSlice`) | `getPosts.slice.ts` |
| `.api.ts` | Per-action endpoint function | `getPosts.api.ts` |
| `.initialState.ts` | Default slice state | `getPosts.initialState.ts` |
| `.functions.ts` | Utility module inside `shared/functions/<Folder>/` | `string.functions.ts` |
| `.hooks.ts` | Custom React hook module | `useNetworkStatus.hooks.ts` |
| `.dictionary.ts` | Constants/enums | `strings.dictionary.ts` |
| `.scripts.ts` | Node CLI scripts (npm run targets) | `setEnv.scripts.ts` |

## Import order (Prettier + Trivago plugin)

Configured in `prettier.config.mjs`:

1. `react`
2. `react-native`
3. Third-party modules
4. `*.container` files
5. `*.component` files
6. Relative (`./`, `../`)

Each group separated by a blank line.

## Redux pattern

Every action lives in `src/redux/states/<domain>/<action>/`. Action names use camelCase (`login`, `getPosts`, `addBudgetCategory`), grouped by domain (`auth`, `posts`, `budgets`). The five files per action:

```
<action>.slice.ts        createAsyncThunk + createSlice (action.type = url path from endpoints)
<action>.api.ts          calls configureRequest with the matching url + method
<action>.initialState.ts { loading, error, success }
<action>.types.ts        Request, SuccessResponse, ErrorResponse, State, ActionTypes
__tests__/<action>.slice.tests.ts
```

The slice's `createAsyncThunk` first arg uses the endpoint string (e.g. `urls.auth.login`) as the action type. This makes redux DevTools traces line up with API paths and lets `store.ts` reset state on the logout fulfilled action.

Wire the new reducer into `src/redux/store/store.ts` under `combineReducers({ ... })`.

`src/shared/scripts/redux/generateApiReduxState.scripts.ts` scaffolds these files automatically:

```
npm run generate:slice -- login auth.login POST
```

## API pattern

`networkRequests/apiClient/apiClient.functions.ts` exports three functions and nothing else:

- `configureRequest(config)` — builds the request, prepends `env.API_BASE_URL`, returns parsed body
- `executeRequest(requestConfig)` — low-level axios wrapper used by configureRequest
- `replacePathVariables(path, params)` — substitute `:vars` in url paths

There is no monolithic API surface listing every endpoint. Each slice's `*.api.ts` calls `configureRequest`:

```ts
import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

export const loginApi = async (request: LoginRequest): Promise<LoginSuccessResponse> => {
  const response = await configureRequest({ url: urls.auth.login, method: 'POST', data: request })

  if (response.status >= 200 && response.status < 300) {
    return response as LoginSuccessResponse
  }

  throw response as LoginErrorResponse
}
```

ESLint forbids `axios` imports anywhere except `apiClient.functions.ts`.

## Components pattern

- **Functional only.** Class components are blocked.
- Container files (`*.container.tsx`) call `useSelector`/`useDispatch` and dispatch thunks. They render a presentational component.
- Presentational files (`*.component.tsx`) take props and render JSX.
- Styles always live in `*.styles.ts` (`StyleSheet.create`). Inline styles are blocked.
- Props shape always lives in `*.types.ts`.

## Forms pattern

[react-hook-form](https://react-hook-form.com/) + [yup](https://github.com/jquense/yup):

```ts
// LoginForm.validation.ts
import * as yup from 'yup'

export const dictionary = {
  emailRequired: 'Email is required',
  passwordRequired: 'Password is required'
}

export const schema = yup.object({
  email: yup.string().email().required(dictionary.emailRequired),
  password: yup.string().required(dictionary.passwordRequired)
})
```

`redux-form` is forbidden.

## i18n

All user-facing strings go through `useTranslation()`. Add keys to `src/shared/localization/locales/en.json`. Validation error strings remain in `*.validation.ts` dictionaries.

## Subjects (pub/sub)

`src/shared/subjects/` holds RxJS `Subject` instances:

| Subject | Purpose |
|---------|---------|
| `snackbar` | Toast notifications (`{ message, severity }`) |
| `popupModal` | Global modal triggers (`{ title, body, icon, ... }`) |
| `sessionTimeout` | Auth session expiry events |
| `inAppPushNotification` | In-app push display |
| `networkLogger` | Network event stream |

Producers call `.next(config)`. Consumers subscribe inside `useEffect` and unsubscribe in cleanup.

## Local storage (MMKV)

`shared/functions/LocalStorage/localStorage.ts` exports a synchronous wrapper around `react-native-mmkv`. Keys are namespaced with `env.PRODUCT_NAME` to avoid collisions. `Auth` and `UserRole` modules consume this.

## Logger

`shared/functions/Logger/logger.functions.ts` provides `logEvent` and `logError`. Wire it to `@react-native-firebase/analytics` and `@sentry/react-native` when those libraries are installed — the file has TODO markers showing where.

## Custom ESLint rules

`src/shared/eslintCustomRules/` hosts project-local lint rules. Currently:

- `space-after-closing-tag` — enforces a blank line after a JSX closing tag (currently set to `'off'`, flip to `'error'` when ready)

Wire new rules into the `customRules` map in `eslint.config.mjs`.

## Product-flow docs drift check

`src/shared/scripts/productFlows/checkProductFlowDocsDrift.scripts.ts` compares staged code changes against `docs/flows/<flowKey>/<flowKey>.flow.md` and fails if relevant docs weren't updated.

```
npm run check:product-flow-docs
npm run check:product-flow-docs -- --working-tree
```

Update `SCREEN_PREFIX_RULES` and `REDUX_SEGMENT_RULES` at the top of the script when adding new screens or redux domains.

Skill: `.claude/skills/checkProductFlowDocs/SKILL.md`.

## When to invoke generator skills

| Situation | Skill |
|-----------|-------|
| New redux state | `/generate-redux-slice` |
| New screen | `/generate-screen` |
| New shared component | `/generate-component` |
| Switch active environment | `/setup-env` |
| Update splash assets | `/splash-generate` |
| Toggle Hermes | `/enable-hermes` |
| Strip console statements before release | `/remove-console-statements` |
| Remove the JSONPlaceholder demo | `/remove-demo-code` |

## Commit message format

Hook-enforced regex:

```
(FLEX-[0-9]+)(\s&\sFLEX-[0-9]+)*:\s\((<tag>(,\s)*)+\)\s.+
```

Allowed tags: `bug-fix, config, design, feat, ios, misc, refactor, security-fix, style, test`.

Examples:

```
FLEX-1234: (feat) Add account opening flow
FLEX-1234 & FLEX-1235: (feat, design) Add login + branding
```

## Forbidden imports

ESLint blocks all of these with explanatory messages:

- `moment`, `date-fns` → use `luxon`
- `redux-form` → use `react-hook-form` + `yup`
- `react-native-router-flux` → use `@react-navigation/native`
- `axios` (outside `apiClient.functions.ts`) → use `configureRequest`
- `enzyme` → use `@testing-library/react-native`

## Testing

- Test runner: jest
- React assertions: `@testing-library/react-native` + `@testing-library/jest-native`
- Test files: `*.tests.{ts,tsx}` colocated with the file under test, OR under `__tests__/` for redux slices
- Mock APIs with `jest.mock('@network/...')` — never hit real endpoints from tests

## Don't

- Don't call `axios` directly outside `apiClient.functions.ts`.
- Don't write class components.
- Don't import across screen folders (`screens/A` cannot import from `screens/B`).
- Don't hardcode user-facing strings — use `useTranslation`.
- Don't write inline `style={{}}` — use `*.styles.ts`.
- Don't bypass the generator skills when adding new code.
