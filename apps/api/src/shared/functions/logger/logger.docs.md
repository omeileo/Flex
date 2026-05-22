# Secure Logging Guidelines

## Overview

This document outlines best practices for logging in the API to ensure that sensitive information such as API keys, passwords, authentication tokens, and other credentials are never exposed in logs.

## Why Secure Logging Matters

When developing APIs that interact with third-party services, it's important to ensure that:

1. Authentication credentials are never logged in plain text
2. Error objects that might contain sensitive information are sanitized before logging
3. URLs with API keys or credentials in query parameters or user/password segments are sanitized

Exposing such information in logs can lead to security vulnerabilities if logs are accessed by unauthorized parties or if logs are shared for debugging purposes.

## Automatic Sanitization

The application uses a secure logger wrapper (`SecureLogger` in `src/shared/functions/logger/logger.functions.ts`) that automatically sanitizes sensitive information. This means you can use the logger as normal without manually sanitizing variables:

```typescript
import { logger } from '@/app'

// These log statements will automatically have sensitive data sanitized
logger.info('Making request with configuration', config)
logger.error('Failed to process request', error)
```

You generally don't need to manually sanitize data before logging as the secure logger handles this automatically. However, it's still a good practice to be mindful of what you're logging.

## Avoiding Common Pitfalls

### Don't Use JSON.stringify in Template Literals

❌ **INCORRECT** - This bypasses automatic sanitization:
```typescript
// BAD - sensitive data might be exposed
logger.error(`Error fetching data: ${JSON.stringify(error, null, 2)}`)
```

✅ **CORRECT** - Pass objects as separate arguments:
```typescript
// GOOD - error will be automatically sanitized
logger.error('Error fetching data:', error)
```

The secure logger will properly serialize error objects while sanitizing sensitive information.

### Use Object Arguments for Structured Logging

❌ **INCORRECT** - Embedding sensitive data in strings:
```typescript
// BAD - credentials might be exposed
logger.info(`Created API client with credentials ${username}:${password}`)
```

✅ **CORRECT** - Pass objects that will be sanitized:
```typescript
// GOOD - sensitive fields will be automatically redacted
logger.info('Created API client', { username, password })
```

## Sanitization Utilities

For cases where you need to manually sanitize data, utility functions are available in `src/shared/functions/logger/sanitize.functions.ts`:

### 1. `sanitizeErrorForLogging`

Use this function when you need to manually sanitize error objects:

```typescript
import { sanitizeErrorForLogging } from '@/shared/functions/logger/sanitize.functions'

try {
  // Your code here
} catch (error) {
  const sanitizedError = sanitizeErrorForLogging(error)
  // Use the sanitized error for something other than logging
  // (For regular logging, the SecureLogger handles this automatically)
}
```

### 2. `sanitizeUrl`

Use this function when you need to manually sanitize URLs:

```typescript
import { sanitizeUrl } from '@/shared/functions/logger/sanitize.functions'

const url = 'https://api.example.com/data?api_key=SECRET_KEY&query=search'
const sanitizedUrl = sanitizeUrl(url)
// Use the sanitized URL for something other than logging
```

### 3. `sanitizeObjectForLogging`

Use this function when you need to manually sanitize objects:

```typescript
import { sanitizeObjectForLogging } from '@/shared/functions/logger/sanitize.functions'

const config = {
  apiKey: 'very-secret-key',
  endpoint: 'https://api.example.com',
  timeout: 5000
}

const sanitizedConfig = sanitizeObjectForLogging(config)
// Use the sanitized config for something other than logging
```

## Best Practices

1. **Use the standard logger from app.ts**:
   ```typescript
   import { logger } from '@/app'
   
   // The logger automatically sanitizes sensitive data
   logger.info('Processing request', request)
   logger.error('Error handling request', error)
   ```

2. **Never log sensitive information directly**:
   - API keys
   - Passwords
   - Authentication tokens
   - Private keys
   - Personal Identifiable Information (PII)

3. **Be cautious with third-party libraries**:
   - Some libraries might include credentials in error objects
   - The secure logger will sanitize most cases, but be aware of any edge cases

4. **Avoid interpolating sensitive values directly**:
   ```typescript
   // BAD
   logger.info(`Using API key ${apiKey}`)
   
   // GOOD - The logger will sanitize the object containing the API key
   logger.info('Using configuration', { apiKey })
   ```

5. **When in doubt, redact**:
   - If you're unsure if information is sensitive, err on the side of caution

## Handling Error Objects Properly

The enhanced logger now properly serializes Error objects by:
1. Capturing non-enumerable properties like stack traces
2. Handling nested causes
3. Sanitizing any sensitive information in the error

This means you can log errors directly:

```typescript
try {
  // Your code here
} catch (error) {
  // The error will be properly serialized and sanitized
  logger.error('Operation failed', error)
}
```

## Examples of Sensitive Information

- API keys and secrets
- OAuth tokens
- Database credentials
- Encryption keys
- Payment information
- Personal information (names, emails, addresses)
- Authentication credentials

## Implementation Guidelines

When implementing new integrations with third-party services:

1. Store credentials in environment variables
2. Use the standard logger from app.ts which automatically sanitizes sensitive information
3. Pass objects as separate arguments to logger methods, don't stringify them inline
4. Be mindful of edge cases where sensitive information might not be properly sanitized
5. Review logs regularly to ensure no sensitive information is being exposed

By following these practices, we can ensure our logs remain useful for debugging while also keeping sensitive information secure. 