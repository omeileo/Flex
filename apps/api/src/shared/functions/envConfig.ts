import dotenv from 'dotenv'
import { bool, cleanEnv, host, num, port, str, testOnly } from 'envalid'

// Load base .env file
dotenv.config({ path: '.env' })

/**
 * Represents the environment configuration object.
 */
export const env = cleanEnv(process.env, {
  // General Configuration
  /**
   * The current environment mode.
   * @remarks
   * Possible values are 'development', 'production', or 'test'.
   */
  NODE_ENV: str({
    devDefault: testOnly('local'),
    choices: ['development', 'production', 'test', 'local']
  }),

  /**
   * The log level.
   * @remarks
   * Possible values are 'info', 'debug', 'error', 'warn'.
   */
  LOG_LEVEL: str({
    devDefault: testOnly('info'),
    choices: ['info', 'debug', 'error', 'warn']
  }),

  /**
   * The host address for the application.
   * @remarks
   * Defaults to 'localhost' in development mode.
   */
  HOST: host({ devDefault: testOnly('localhost') }),

  /**
   * The port number for the application.
   * @remarks
   * Defaults to 3000 in development mode.
   */
  PORT: port({ devDefault: testOnly(3000) }),

  /**
   * The base path for the application.
   * @remarks
   * Defaults to '/api' in development mode.
   */
  APP_BASE_PATH: str({ devDefault: testOnly('/api') }),

  /**
   * The allowed origin for Cross-Origin Resource Sharing (CORS).
   * @remarks
   * Defaults to 'http://localhost:3000' in development mode.
   */
  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  // Rate Limiting Configuration
  /**
   * The maximum number of requests allowed within a rate limit window.
   * @remarks
   * Defaults to 1000 in development mode.
   */
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),

  /**
   * The duration of the rate limit window in milliseconds.
   * @remarks
   * Defaults to 1000 milliseconds in development mode.
   */
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(60000) }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  // Token Expiry Configuration
  /**
   * The expiry time for the verify email token in milliseconds.
   * @remarks
   * Defaults to 86400000 milliseconds (24 hours).
   */
  VERIFY_EMAIL_TOKEN_EXPIRY: num({ devDefault: testOnly(86400000) }),

  /**
   * The expiry time for the password reset token in milliseconds.
   * @remarks
   * Defaults to 1 hour in development mode. (3600000 milliseconds)
   */
  PASSWORD_RESET_TOKEN_EXPIRY: num({ devDefault: testOnly(3600000) }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  // Database Configuration
  /**
   * The database connection URL.
   * @remarks
   * Defaults to 'postgres://template-project:template-project@localhost:3006/db?schema=public' in development mode.
   */
  DATABASE_URL: str({
    devDefault: testOnly('postgres://template-project:template-project@localhost:3006/db?schema=public')
  }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  // SMTP Configuration
  /**
   * SMTP host for email sending.
   * @remarks
   * This is the server used to send emails. In development, it defaults to 'sunfire.mxrouting.net'.
   */
  SMTP_HOST: str({ devDefault: testOnly('sunfire.mxrouting.net') }),

  /**
   * SMTP port number.
   * @remarks
   * The port on the SMTP server to connect to. Uses port 465 by default, which is common for SMTPS (SMTP over SSL).
   */
  SMTP_PORT: port({ devDefault: testOnly(465) }),

  /**
   * SMTP secure connection flag.
   * @remarks
   * Specifies if the connection should use SSL/TLS. 'true' indicates that SSL is used. Defaults to 'true' in development.
   */
  SMTP_SECURE: str({
    devDefault: testOnly('true'),
    choices: ['true', 'false']
  }),

  /**
   * SMTP authentication user.
   * @remarks
   * The username for authenticating with the SMTP server. In development, defaults to 'no-reply@appshop.biz'.
   */
  SMTP_AUTH_USER: str({ devDefault: testOnly('no-reply@appshop.biz') }),

  /**
   * SMTP authentication password.
   * @remarks
   * The password for authenticating with the SMTP server. In development, it defaults to 'passwrd'.
   */
  SMTP_AUTH_PASS: str({ devDefault: testOnly('qs5MtTNYqcPv9zP4Bgzx') }),

  /**
   * The email address to send emails from.
   * @remarks
   * This is the email address that will appear in the 'from' field of the email. it defaults to 'Hourrier <no-reply@appshop.biz>'
   */
  SMTP_FROM_ADDRESS: str({
    devDefault: testOnly('Hurrier <no-reply@appshop.biz>')
  }),

  /**
   * The support email address.
   * @remarks
   * This is the email address of the support user. it defaults to 'support@appshop.biz'
   */
  SUPPORT_EMAIL_ADDRESS: str({
    devDefault: testOnly('support@appshop.biz')
  }),

  /**
   * The admin email address.
   * @remarks
   * This is the email address of the admin user. it defaults to 'admin@appshop.biz'
   */
  ADMIN_EMAIL_ADDRESS: str({
    devDefault: testOnly('admin@appshop.biz')
  }),

  /**
   * The development support email address.
   * @remarks
   * This is the email address of the development support user. it defaults to 'support@appshop.biz'
   */
  DEV_SUPPORT_EMAIL_ADDRESS: str({
    devDefault: testOnly('support@appshop.biz')
  }),

  /**
   * The business name.
   * @remarks
   * This is the name that will appear in the footer of some emails. it defaults to 'Hourrier'
   */
  BUSINESS_NAME: str({
    devDefault: testOnly('App Shop')
  }),

  /**
   * The product name.
   * @remarks
   * This is the name that will appear in the footer of some emails. it defaults to 'Template Project'
   */
  PRODUCT_NAME: str({
    devDefault: testOnly('Flex')
  }),

  /**
   * The business address.
   * @remarks
   * This is the address that will appear in the footer of some emails. it defaults to 'Miami, FL 33130'
   */
  BUSINESS_ADDRESS: str({
    devDefault: testOnly('Miami, FL 33130')
  }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  // Web Application Configuration
  /**
   * The base URL for the web application.
   * @remarks
   * This is the URL where the web application is hosted. Defaults to 'http://localhost:3000' in development
   */
  WEB_APP_BASE_URL: str({
    devDefault: testOnly('http://localhost:3000')
  }),

  /**
   * Path to redirect to after user click verify email link.
   * @remarks
   * This is the path to redirect to after the user clicks the verify email link. Defaults to '/verify' in development.
   */
  VERIFY_EMAIL_REDIRECT_PATH: str({
    devDefault: testOnly('/verify?emailToken=')
  }),

  /**
   * Path to redirect to after user click forgot password link.
   * @remarks
   * This is the path to redirect to after the user clicks the forgot password link. Defaults to '/forgot' in development.
   */
  FORGET_PASSWORD_REDIRECT_PATH: str({
    devDefault: testOnly('/reset-forgotten-password?resetToken')
  }),

  /**
   * Path to forget password page.
   * @remarks
   * This is the path to the forget password page. Defaults to '/forget-password' in development.
   */
  FORGET_PASSWORD_PATH: str({
    devDefault: testOnly('/forget-password')
  }),

  /**
   * Path to profile page.
   * @remarks
   * This is the path to the profile page. Defaults to '/profile' in development.
   */
  PROFILE_PATH: str({
    devDefault: testOnly('/profile')
  }),

  /**
   * Path to update payment info page.
   * @remarks
   * This is the path to the update payment info page. Defaults to '/profile?payment=true' in development.
   */
  UPDATE_PAYMENT_INFO_PATH: str({
    devDefault: testOnly('/profile?selectedSection=payment')
  }),

  /**
   * Path to email templates.
   * @remarks
   * This is the path to the email templates. Defaults to 'src/shared/email/templates' in development.
   */
  EMAIL_TEMPLATES_PATH: str({
    devDefault: testOnly('src/shared/email/templates')
  }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  // Security Configuration
  /**
   * The secret key for the JWT token.
   * @remarks
   * This is the secret key used to sign the JWT token. Defaults to 'your-secret-key'.
   */
  JWT_SECRET_KEY: str({
    devDefault: testOnly(
      'J07YXlBLh+RBfz83S1oEP+/7yOC8JJkE3JZpOLWyMnwYLvaP6HdvYy6cOXo3jdb6qS9Lao8hAHwXOX4RAa9CPFb8lm+5TOTiz5PScN3VSNAupLBQzaOUYcIKLwAVyl203INRXEXsj4z1DDBCd168DoMTutApUgrZsN4x4fVkVi2kTqw5bDix0uIYMCxPU+EcpCZC5LJVdESl5wGztXm0p1U9UzZFn/uERxR02KZDP9GTI/j9/G/XpYA5GHum3+zYuzBN77+UvWrbAxtrCeYQLzQecxDix0uIYMCxPU+EcpCZC5LJVdESl5wGztXm0p1U9UzZFn/uERxR02KZDP9GTI/j9/G/XpYA5GHum3+zYuzBN77+UvWrbAxtrCeYQLzQecxFeq4bP1vXYNcH0zcW/NXcHW5AmercAPC+8wHJihqxlb+0sqLYHaiKDJJPjQw=='
    )
  }),

  /**
   * The expiration time for the JWT token.
   * @remarks
   * This is the duration for which the JWT token is valid. Defaults to '2w' (2 weeks).
   */
  JWT_TOKEN_EXPIRATION: str({
    devDefault: testOnly('2w')
  }),

  /**
   * The number of days the JWT cookie is valid.
   * @remarks
   * Defaults to 14 in development mode.
   */
  JWT_COOKIE_EXPIRATION_DAYS: num({
    devDefault: testOnly(14)
  }),

  /**
   * The maximum number of login attempts allowed.
   * @remarks
   * Defaults to 3 in development mode.
   */
  AUTH_LOGIN_MAX_ATTEMPTS: num({
    devDefault: testOnly(3)
  }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  /**
   * The number of records per page.
   * @remarks
   * Defaults to 20 in development mode.
   */
  PAGINATED_PAGE_SIZE: num({
    devDefault: testOnly(20)
  }),

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  /**
   * Enable template Stripe payment routes.
   * @remarks
   * Defaults to false so Flex MVP routes stay focused on training flows.
   */
  ENABLE_TEMPLATE_PAYMENTS: bool({
    devDefault: testOnly(false)
  }),

  /**
   * The AI provider to use for training plan generation.
   * @remarks
   * Supported values: openai, anthropic, google
   */
  AI_PROVIDER: str({
    devDefault: testOnly('openai'),
    choices: ['openai', 'anthropic', 'google']
  }),

  /**
   * OpenAI API key for AI-assisted plan generation.
   */
  OPENAI_API_KEY: str({
    devDefault: testOnly('')
  }),

  /**
   * OpenAI model identifier.
   */
  OPENAI_MODEL: str({
    devDefault: testOnly('gpt-4o-mini')
  }),

  /**
   * OpenAI API base URL override.
   */
  OPENAI_BASE_URL: str({
    devDefault: testOnly('https://api.openai.com/v1')
  }),

  /**
   * The Stripe API version.
   * @remarks
   * This is the version of the Stripe API to use. Defaults to '2024-06-20' in development.
   */
  STRIPE_API_VERSION: str({
    devDefault: testOnly('2024-06-20')
  }),

  /**
   * The Stripe secret key.
   * @remarks
   * This is the secret key for the Stripe API. Defaults to a placeholder in development.
   */
  STRIPE_SECRET_KEY: str({
    devDefault: testOnly('sk_test_your_stripe_secret_key_here')
  }),

  /**
   * The Stripe webhook secret.
   * @remarks
   * This is the secret for the Stripe webhook. Defaults to 'whsec_1234567890' in development.
   */
  STRIPE_WEBHOOK_SECRET: str({
    devDefault: testOnly('whsec_1234567890')
  }),

  /**
   * The Stripe percentage fee for domestic card charges.
   * @remarks
   * Defaults to 4.9% (0.049) in development mode.
   */
  STRIPE_FEE_PERCENTAGE: num({
    devDefault: testOnly(0.049)
  }),

  /**
   * The Stripe fixed fee for domestic card charges in cents.
   * @remarks
   * Defaults to 30 cents in development mode.
   */
  STRIPE_FIXED_FEE_CENTS: num({
    devDefault: testOnly(0.3)
  }),

  /**
   * The Stripe fee currency.
   * @remarks
   * This is the currency for the Stripe API. Defaults to 'USD' in development.
   */
  STRIPE_MAIN_CURRENCY: str({
    devDefault: testOnly('USD')
  }),

  /**
   * The Stripe account countries.
   * @remarks
   * This is the countries for Hourrier's Stripe connect accounts. Defaults to 'US' in development.
   * Multiple countries should be separated by commas.
   * Example: 'US,CA'
   */
  STRIPE_CONNECT_ACCOUNT_COUNTRIES: str({
    devDefault: testOnly('US')
  }),

  /**
   * The Stripe connect account URL.
   * @remarks
   * This is the URL for the Stripe connect account. Defaults to 'https://connect.stripe.com/express' in development.
   */
  STRIPE_CONNECT_ACCOUNT_URL: str({
    devDefault: testOnly('https://connect.stripe.com/express')
  }),

  /**
   * The Stripe transfers URL.
   * @remarks
   * This is the URL for the Stripe transfers. Defaults to 'https://dashboard.stripe.com/connect/transfers' in development.
   */
  STRIPE_TRANSFERS_URL: str({
    devDefault: testOnly('https://dashboard.stripe.com/connect/transfers')
  }),

  /**
   * The Stripe payments URL.
   * @remarks
   * This is the URL for the Stripe payments. Defaults to 'https://dashboard.stripe.com/payments' in development.
   */
  STRIPE_PAYMENTS_URL: str({
    devDefault: testOnly('https://dashboard.stripe.com/payments')
  }),

  /**
   * ---------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * The interval for the flight monitoring scheduler.
   * @remarks
   * This is the interval for the flight monitoring scheduler. Defaults to '1h' in development mode.
   */
  USER_ACTIVITY_MONITORING_SCHEDULER_INTERVAL: str({
    devDefault: testOnly('1h')
  }),

  /**
   * ---------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * The interval for the item system cache.
   * @remarks
   * This is the interval for the item system cache. Defaults to '48h' in development mode.
   */
  ITEM_SYSTEM_CACHE_INTERVAL: str({
    devDefault: testOnly('48h')
  }),

  /**
   * The interval for the util cache.
   * @remarks
   * This is the interval for the util cache. Defaults to '48h' in development mode.
   */
  UTIL_CACHE_INTERVAL: str({
    devDefault: testOnly('48h')
  }),

  /**
   * ---------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * The timeframe for refund.
   * @remarks
   * This is the timeframe for refund. Defaults to '5-7 business days' in development mode.
   */
  REFUND_TIMEFRAME: str({
    devDefault: testOnly('5-7 business days')
  }),

  /**
   * ---------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * ---------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * The maximum length for a search term.
   * @remarks
   * This is the maximum length for a search term. Defaults to 100 in development mode.
   */
  MAX_SEARCH_TERM_LENGTH: num({
    devDefault: testOnly(100)
  }),

  /**
   * The blacklist for search terms.
   * @remarks
   * This is the blacklist for search terms. Defaults to 'blacklisted_term1,blacklisted_term2' in development mode.
   */
  SEARCH_TERM_BLACKLIST: str({
    devDefault: testOnly('blacklisted_term1,blacklisted_term2')
  })
})
