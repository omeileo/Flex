/* eslint-disable no-console */
import { logEventNameVerificationRegex } from './logger.regex'
import { LogSystem } from './logger.types'

/**
 * Logs an event in your analytics provider.
 * @param eventName Max length 40, alphanumeric + underscores.
 * @example logEvent('Login_Button_Pressed')
 * @example logEvent('User_Created', { date: '12/12/2023' })
 *
 * TODO: Wire `LogSystem.firebase` to `@react-native-firebase/analytics` and
 * `LogSystem.sentry` to `@sentry/react-native` when those libraries are installed.
 */
export const logEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>,
  systems: LogSystem[] = [LogSystem.console]
) => {
  try {
    const sanitizedEventName = sanitizeEventName(eventName)

    systems?.forEach((system) => {
      switch (system) {
        case LogSystem.firebase:
          // analytics().logEvent(sanitizedEventName, parameters)
          if (__DEV__) console.log(`[firebase] ${sanitizedEventName}`, parameters ?? {})
          break

        case LogSystem.sentry:
          // Sentry.addBreadcrumb({ message: eventName, data: parameters })
          if (__DEV__) console.log(`[sentry] ${eventName}`, parameters ?? {})
          break

        default:
          if (__DEV__) console.log(`[event] ${eventName}`, parameters ?? {})
          break
      }
    })
  } catch (error) {
    if (__DEV__) console.log('[logEvent error]', error, eventName, parameters)
  }
}

const logDevError = (
  error: Error | unknown,
  errorMessage: string,
  functionName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  // console.error triggers React Native LogBox overlays in dev; keep diagnostics in the console only.
  console.log('[error]', error, errorMessage, functionName, parameters)
}

/**
 * Logs an error in Sentry / console.
 */
export const logError = (
  error: Error | unknown,
  errorMessage: string,
  functionName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  // Sentry.captureException(error || new Error(errorMessage), { extra: { errorMessage, functionName, parameters } })
  if (__DEV__) logDevError(error, errorMessage, functionName, parameters)
}

const sanitizeEventName = (eventName: string): string => {
  let sanitized = eventName
  const invalid = logEventNameVerificationRegex.regex.test(sanitized)

  if (invalid) {
    sanitized = eventName.replace(logEventNameVerificationRegex.regex, '_')
  }

  if (sanitized.length > 40) {
    sanitized = sanitized.slice(0, 40)
  }

  return sanitized
}

const logger = { logEvent, logError }

export default logger
