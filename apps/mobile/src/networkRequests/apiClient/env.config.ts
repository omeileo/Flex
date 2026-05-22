import { Platform } from 'react-native';

import envJson from '../environmentVariables/env.json';

type EnvJson = Record<string, string | number | boolean | undefined>;

const source = envJson as EnvJson;

const resolveApiBaseUrl = (baseUrl: string, environment: string): string => {
  if (
    environment === 'local' &&
    Platform.OS === 'android' &&
    baseUrl.includes('localhost')
  ) {
    return baseUrl.replace('localhost', '10.0.2.2');
  }

  return baseUrl;
};

/**
 * Utility function to safely access environment variables.
 * RN reads from `src/networkRequests/environmentVariables/env.json` (materialized
 * by `npm run setup-env -- <env>`), mirroring the web app's `import.meta.env` shape.
 */
const getEnvVar = (key: string, defaultValue = ''): string => {
  const value = source[key];

  return value === undefined || value === null ? defaultValue : String(value);
};

const env = {
  /**
   * The current environment mode.
   * Possible values: 'development', 'production', 'staging', 'local'.
   */
  NODE_ENV: getEnvVar('ENVIRONMENT', 'development'),

  /**
   * Use Mock Data — 'true' or 'false'.
   */
  USE_MOCK: getEnvVar('USE_MOCK', 'false'),

  /**
   * Product Name — used as a key prefix for local persistent storage.
   */
  PRODUCT_NAME: getEnvVar('PRODUCT_NAME', 'Flex'),

  /**
   * API Base URL — base endpoint for all API requests.
   */
  API_BASE_URL: resolveApiBaseUrl(
    getEnvVar('API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
    getEnvVar('ENVIRONMENT', 'development'),
  ),

  /**
   * API Timeout (milliseconds).
   */
  API_TIMEOUT: getEnvVar('API_TIMEOUT', '20000'),

  /**
   * Default page size for paginated requests.
   */
  DEFAULT_PAGE_SIZE: getEnvVar('DEFAULT_PAGE_SIZE', '10'),

  /**
   * Sentry DSN — leave blank to disable Sentry locally.
   */
  SENTRY_DSN: getEnvVar('SENTRY_DSN'),

  /**
   * Firebase config (optional — populate per-env when adding @react-native-firebase).
   */
  FIREBASE_API_KEY: getEnvVar('FIREBASE_API_KEY'),
  FIREBASE_PROJECT_ID: getEnvVar('FIREBASE_PROJECT_ID'),
  FIREBASE_APP_ID: getEnvVar('FIREBASE_APP_ID'),

  /**
   * Splash Screen Timeout (milliseconds).
   */
  SPLASH_SCREEN_TIMEOUT_MS: getEnvVar('SPLASH_SCREEN_TIMEOUT_MS', '5000'),
};

export default env;
