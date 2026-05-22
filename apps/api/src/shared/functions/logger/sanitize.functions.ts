/**
 * Utility functions for sanitizing sensitive information before logging
 */

/**
 * Sanitizes error objects to remove sensitive information before logging
 * @param error - The error object to sanitize
 * @returns A sanitized error object safe for logging
 */
export const sanitizeErrorForLogging = (error: unknown): Record<string, unknown> => {
  if (!error || typeof error !== 'object') return {}

  const sanitized = { ...error } as Record<string, unknown>

  // Remove sensitive auth information if present in the error
  if (sanitized.config && typeof sanitized.config === 'object') {
    const config = sanitized.config as Record<string, unknown>

    if (config.auth && typeof config.auth === 'object') {
      config.auth = {
        username: '***REDACTED***',
        password: '***REDACTED***'
      }
    }

    // Check for auth headers too
    if (config.headers && typeof config.headers === 'object') {
      const headers = config.headers as Record<string, unknown>
      if (headers.Authorization) {
        headers.Authorization = '***REDACTED***'
      }
    }
  }

  // Filter out any custom properties that might contain credentials
  if (sanitized.request) {
    delete sanitized.request
  }

  return sanitized
}

/**
 * Sanitizes a URL to remove any API keys, tokens, or sensitive query parameters
 * @param url - The URL to sanitize
 * @returns A sanitized URL safe for logging
 */
export const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)

    // List of query parameters that should be redacted
    const sensitiveParams = [
      'key',
      'api_key',
      'apikey',
      'secret',
      'password',
      'token',
      'access_token',
      'auth',
      'credentials',
      'private',
      'pwd',
      'Authorization'
    ]

    for (const param of sensitiveParams) {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.set(param, '***REDACTED***')
      }
    }

    // Also check for auth in the URL itself
    if (urlObj.username || urlObj.password) {
      urlObj.username = urlObj.username ? '***REDACTED***' : ''
      urlObj.password = urlObj.password ? '***REDACTED***' : ''
    }

    return urlObj.toString()
  } catch (error) {
    // If URL parsing fails, do basic regex replacement for common patterns
    let sanitizedUrl = url
    // Replace basic auth pattern
    sanitizedUrl = sanitizedUrl.replace(/\/\/([^:@/]+):([^@/]+)@/g, '//***REDACTED***:***REDACTED***@')
    // Replace common API key patterns
    sanitizedUrl = sanitizedUrl.replace(
      /(\?|&)(api_?key|token|secret|password|pwd|auth)=([^&]+)/gi,
      '$1$2=***REDACTED***'
    )

    return sanitizedUrl
  }
}

/**
 * Creates a safe version of an object for logging by removing sensitive fields
 * @param obj - The object to sanitize
 * @param sensitiveFields - Additional sensitive field names to redact
 * @returns A sanitized object safe for logging
 */
export const sanitizeObjectForLogging = (
  obj: Record<string, unknown>,
  sensitiveFields: string[] = []
): Record<string, unknown> => {
  if (!obj || typeof obj !== 'object') return {}

  const result: Record<string, unknown> = {}
  const defaultSensitiveFields = [
    'password',
    'secret',
    'token',
    'apiKey',
    'api_key',
    'key',
    'auth',
    'credentials',
    'pwd',
    'private',
    'Authorization',
    'accessToken',
    'access_token',
    'refreshToken',
    'refresh_token',
    'clientSecret',
    'client_secret'
  ]

  const allSensitiveFields = [...defaultSensitiveFields, ...sensitiveFields]

  for (const [key, value] of Object.entries(obj)) {
    if (allSensitiveFields.includes(key.toLowerCase())) {
      result[key] = typeof value === 'string' ? '***REDACTED***' : '[REDACTED]'
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      result[key] = sanitizeObjectForLogging(value as Record<string, unknown>, sensitiveFields)
    } else if (typeof value === 'string' && value.includes('://')) {
      // Check if string might be a URL and sanitize it
      result[key] = sanitizeUrl(value)
    } else {
      result[key] = value
    }
  }

  return result
}
