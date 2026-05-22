import fs from 'fs';
import path from 'path';

/**
 * Scaffolds a redux slice in the createAsyncThunk + createSlice format.
 * Mirrors Budgy-Web-App's generateApiReduxState script, adapted for the RN layout.
 *
 * Usage:
 *   node ./src/shared/scripts/redux/generateApiReduxState.scripts.ts <stateName> <apiPath> <method>
 *
 * Example:
 *   node ./src/shared/scripts/redux/generateApiReduxState.scripts.ts login auth.login POST
 */

const args = process.argv.slice(2);
const [stateName, apiPath, methodArg] = args;

if (!stateName || !apiPath || !methodArg) {
  console.error(
    'Usage: generateApiReduxState <stateName> <apiPath e.g. auth.login> <method GET|POST|PUT|PATCH|DELETE>',
  );
  process.exit(1);
}

const method = methodArg.toUpperCase();
if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
  console.error(
    `Invalid method ${method}. Use one of GET, POST, PUT, PATCH, DELETE.`,
  );
  process.exit(1);
}

const [label, endpointKey] = apiPath.split('.');
if (!label || !endpointKey) {
  console.error(
    `apiPath must be in the form '<label>.<endpoint>' (e.g. 'auth.login'). Got: ${apiPath}`,
  );
  process.exit(1);
}

const capitalizedStateName =
  stateName.charAt(0).toUpperCase() + stateName.slice(1);

const projectRoot = process.cwd();
const sliceDir = path.join(projectRoot, 'src/redux/states', label, stateName);
const testsDir = path.join(sliceDir, '__tests__');
const importPrefix = '../../../../';

const createFile = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (fs.existsSync(filePath)) {
    console.log(`skip (exists) ${path.relative(projectRoot, filePath)}`);

    return;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`create ${path.relative(projectRoot, filePath)}`);
};

const updateEndpoints = () => {
  const endpointsPath = path.join(
    projectRoot,
    'src/networkRequests/apiClient/endpoints.ts',
  );
  const sanitizedEndpoint = endpointKey.replace(/-([a-z])/g, (_match, letter) =>
    letter.toUpperCase(),
  );
  const content = fs.readFileSync(endpointsPath, 'utf8');
  const labelBlockRegex = new RegExp(`(${label}:\\s*\\{)([^}]*)(\\})`, 'm');

  if (labelBlockRegex.test(content)) {
    if (content.includes(`${sanitizedEndpoint}:`)) {
      console.log(`endpoints.ts already has ${label}.${sanitizedEndpoint}`);

      return;
    }
    const updated = content.replace(
      labelBlockRegex,
      (_full, open, body, close) => {
        const trimmed = body.replace(/\s+$/, '');
        const insert = `${trimmed.endsWith(',') || trimmed === '' ? '' : ','}\n    ${sanitizedEndpoint}: '${label}/${endpointKey}'\n  `;

        return `${open}${trimmed}${insert}${close}`;
      },
    );
    fs.writeFileSync(endpointsPath, updated, 'utf8');
    console.log(`endpoints.ts updated with ${label}.${sanitizedEndpoint}`);
  } else {
    const updated = content.replace(
      /const urls = \{/,
      `const urls = {\n  ${label}: {\n    ${sanitizedEndpoint}: '${label}/${endpointKey}'\n  },`,
    );
    fs.writeFileSync(endpointsPath, updated, 'utf8');
    console.log(`endpoints.ts received new label ${label}`);
  }
};

const updateStore = () => {
  const storePath = path.join(projectRoot, 'src/redux/store/store.ts');
  const content = fs.readFileSync(storePath, 'utf8');
  const importStatement = `import ${stateName}Reducer from '../states/${label}/${stateName}/${stateName}.slice'`;
  const reducerLine = `  ${stateName}: ${stateName}Reducer,`;

  let updated = content;
  if (!content.includes(importStatement)) {
    updated = updated.replace(
      /((?:import .* from '.*'\n)+)/,
      `$1${importStatement}\n`,
    );
  }
  if (!content.includes(`${stateName}: ${stateName}Reducer`)) {
    updated = updated.replace(/(combineReducers\(\{\n)/, `$1${reducerLine}\n`);
  }
  fs.writeFileSync(storePath, updated, 'utf8');
  console.log(`store.ts wired with ${stateName}`);
};

updateEndpoints();
updateStore();

createFile(
  path.join(sliceDir, `${stateName}.types.ts`),
  `import { ApiErrorResponse, ApiSuccessResponse } from '${importPrefix}shared/types/api.types'
import { SliceActions } from '${importPrefix}shared/types/slice.types'
import { ${stateName}Actions } from './${stateName}.slice'

export interface ${capitalizedStateName}Request {
  // TODO: define request properties
}

export interface ${capitalizedStateName}Data {
  // TODO: define response data shape
}

export interface ${capitalizedStateName}SuccessResponse extends ApiSuccessResponse<${capitalizedStateName}Data> {}

export interface ${capitalizedStateName}ErrorResponse extends ApiErrorResponse {}

export interface ${capitalizedStateName}State {
  loading: boolean
  error: ${capitalizedStateName}ErrorResponse | null
  success: ${capitalizedStateName}SuccessResponse | null
}

export type ${capitalizedStateName}ActionTypes = SliceActions<typeof ${stateName}Actions>
`,
);

createFile(
  path.join(sliceDir, `${stateName}.initialState.ts`),
  `import { ${capitalizedStateName}State } from './${stateName}.types'

const initialState: ${capitalizedStateName}State = {
  loading: false,
  error: null,
  success: null
}

export default initialState
`,
);

createFile(
  path.join(sliceDir, `${stateName}.api.ts`),
  `import { configureRequest } from '${importPrefix}networkRequests/apiClient/apiClient.functions'
import urls from '${importPrefix}networkRequests/apiClient/endpoints'
import { ${capitalizedStateName}ErrorResponse, ${capitalizedStateName}Request, ${capitalizedStateName}SuccessResponse } from './${stateName}.types'

export const ${stateName}Api = async (request: ${capitalizedStateName}Request): Promise<${capitalizedStateName}SuccessResponse> => {
  const response = await configureRequest({
    url: urls.${label}.${endpointKey.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase())},
    method: '${method}'${
      method === 'GET'
        ? ''
        : `,
    data: request as unknown as object`
    }
  })

  if (response.status >= 200 && response.status < 300) {
    return response as ${capitalizedStateName}SuccessResponse
  } else {
    throw response as ${capitalizedStateName}ErrorResponse
  }
}

export default ${stateName}Api
`,
);

createFile(
  path.join(sliceDir, `${stateName}.slice.ts`),
  `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import urls from '${importPrefix}networkRequests/apiClient/endpoints'
import errorHandler from '${importPrefix}shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '${importPrefix}shared/functions/Redux/serializeError.functions'
import { ApiErrorResponse } from '${importPrefix}shared/types/api.types'
import { ${stateName}Api } from './${stateName}.api'
import ${stateName}InitialState from './${stateName}.initialState'
import { ${capitalizedStateName}ErrorResponse, ${capitalizedStateName}Request } from './${stateName}.types'

export const ${stateName} = createAsyncThunk(
  urls.${label}.${endpointKey.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase())},
  async (request: ${capitalizedStateName}Request, { rejectWithValue }) => {
    try {
      const response = await ${stateName}Api(request)

      return response
    } catch (error) {
      errorHandler.handleApiError(error as ApiErrorResponse)

      return rejectWithValue(serializeError(error))
    }
  }
)

const ${stateName}Slice = createSlice({
  name: urls.${label}.${endpointKey.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase())},
  initialState: ${stateName}InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(${stateName}.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(${stateName}.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        state.error = null
      })
      .addCase(${stateName}.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as ${capitalizedStateName}ErrorResponse
        state.success = null
      })
  }
})

export const { actions: ${stateName}Actions, reducer: ${stateName}Reducer } = ${stateName}Slice
export default ${stateName}Slice.reducer
`,
);

createFile(
  path.join(testsDir, `${stateName}.slice.tests.ts`),
  `import ${stateName}Reducer from '../${stateName}.slice'
import ${stateName}InitialState from '../${stateName}.initialState'

describe('${stateName} slice', () => {
  it('returns the initial state', () => {
    expect(${stateName}Reducer(undefined, { type: '@@INIT' } as never)).toEqual(${stateName}InitialState)
  })
})
`,
);

console.log(
  `\n${capitalizedStateName} slice scaffolded under src/redux/states/${label}/${stateName}/`,
);
