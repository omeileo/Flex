import { logger } from '@/app'

import { obfuscateSensitiveData } from '../security/security.functions'
import countryCallingCodes from './data/countryCallingCodes.data.json'
import { CaseType } from './string.types'

/**
 * Truncates a string to a maximum length.
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the string.
 * @returns The truncated string.
 * @example
 * truncateString('Hello, world!', 10) // "Hello, wo..."
 */
export function truncateString(str: string, maxLength: number = 50): string {
  if (!str) {
    return ''
  } else if (str.length <= maxLength) {
    return str
  } else {
    return str.slice(0, maxLength - 3) + '...'
  }
}

/**
 * Converts a string to sentence case.
 * @param str - The string to convert.
 * @returns The sentence case string.
 * @example
 * sentenceCase('hello world') // "Hello World"
 */
export function sentenceCase(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Changes the case of a string.
 * @param text - The string to change the case of.
 * @param caseType - The type of case to change the string to.
 * @example
 * changeCase('hello world', 'sentence') // "Hello World"
 * changeCase('hello world!', 'title') // "Hello world!"
 * changeCase('HELLO WORLD', 'lower') // "hello world"
 * changeCase('hello world', 'upper') // "HELLO WORLD"
 * changeCase('hello world', 'snake') // "hello_world"
 * changeCase('hello world', 'camel') // "helloWorld"
 * changeCase('hello world', 'kebab') // "hello-world"
 * @returns The string with the changed case.
 */
export function updateCase(text: string, caseType: CaseType, sanitize: boolean = true): string {
  const textToTransform = sanitize ? sanitizeString(text) : text
  let transformedText = text

  switch (caseType) {
    case 'sentence':
      // Capitalize the first letter of each word and lowercase the rest
      transformedText = sentenceCase(textToTransform)
      break

    case 'title':
      // Capitalize the first letter of the first word only
      transformedText = textToTransform
        .split(' ')
        .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()))
        .join(' ')
      break

    case 'lower':
      transformedText = textToTransform.toLowerCase()
      break

    case 'upper':
      transformedText = textToTransform.toUpperCase()
      break

    case 'snake':
      transformedText = textToTransform.replace(/\s+/g, '_').toLowerCase()
      break

    case 'camel':
      transformedText = textToTransform.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index === 0 ? letter.toLowerCase() : letter.toUpperCase()
      )
      break

    case 'kebab':
      transformedText = textToTransform.replace(/\s+/g, '-').toLowerCase()
      break
  }

  return transformedText
}

/**
 * Changes the case of a string.
 * @param text - The string to change the case of.
 * @param sanitize - Whether to sanitize the string.
 * @returns An object with the string in each case.
 */
export function changeCase(
  text: string,
  sanitize: boolean = true
): {
  sentence: string
  title: string
  lower: string
  upper: string
  snake: string
  camel: string
  kebab: string
} {
  return {
    /*
    Capitalize the first letter of each word and lowercase the rest
    */
    sentence: updateCase(text, 'sentence', sanitize),

    /*
    Capitalize the first letter of the first word only
    */
    title: updateCase(text, 'title', sanitize),

    /*
    Convert the string to lowercase
    */
    lower: updateCase(text, 'lower', sanitize),

    /*
    Convert the string to uppercase
    */
    upper: updateCase(text, 'upper', sanitize),

    /*
    Replace spaces with underscores and convert to lowercase
    */
    snake: updateCase(text, 'snake', sanitize),

    /*
    Convert the string to camel case
    */
    camel: updateCase(text, 'camel', sanitize),

    /*
    Replace spaces with dashes and convert to lowercase
    */
    kebab: updateCase(text, 'kebab', sanitize)
  }
}

/**
 * Sanitizes a string by replacing underscores and dashes with spaces.
 * @param text - The text to sanitize.
 * @returns The sanitized text.
 * @example
 * sanitizeString('hello_world') // "hello world"
 * sanitizeString('hello-world') // "hello world"
 */
export function sanitizeString(text: string): string {
  let sanitizedText = replaceUnderscoreWithSpace(text)
  sanitizedText = replaceDashWithSpace(sanitizedText)

  return sanitizedText
}

/**
 * Replaces underscores with spaces in a string.
 * @param text - The text to replace underscores in.
 * @returns The text with underscores replaced with spaces.
 * @example
 * replaceUnderscoreWithSpace('hello_world') // "hello world"
 */
export function replaceUnderscoreWithSpace(text: string): string {
  return text.replace(/_/g, ' ')
}

/**
 * Replaces dashes with spaces in a string.
 * @param text - The text to replace dashes in.
 * @returns The text with dashes replaced with spaces.
 * @example
 * replaceDashWithSpace('hello-world') // "hello world"
 */
export function replaceDashWithSpace(text: string): string {
  return text.replace(/-/g, ' ')
}

/**
 * Joins an array of strings with a bullet.
 * @param strings - The strings to join.
 * @returns The joined string.
 * @example
 * joinStringWithBullet(['Hello', 'World']) // "Hello • World"
 */
export function joinStringWithBullet(strings: string[]): string {
  if (!strings.length) return ''

  return strings.reduce((prev, curr) => `${prev}\u00A0 • \u00A0${curr}`)
}

/**
 * Joins an array of strings with a dash.
 * @param strings - The strings to join.
 * @returns The joined string.
 * @example
 * joinStringWithDash(['Hello', 'World']) // "Hello - World"
 */
export function joinStringWithDash(strings: string[]): string {
  return strings.reduce((prev, curr) => `${prev}\u00A0 - \u00A0${curr}`, '')
}

/**
 * Sanitizes a phone number by removing all non-numeric characters except for '+'.
 * @param phoneNumber - The phone number to sanitize.
 * @returns The sanitized phone number.
 * @example
 * sanitizePhoneNumber("+1 876 307 1239") // "+18763071239"
 */
export function sanitizePhoneNumber(phoneNumber: string | undefined): string | undefined {
  return phoneNumber ? phoneNumber.replace(/[^0-9+]/g, '') : undefined
}

/**
 * Validates and formats a phone number based on international standards.
 * @param phoneNumber - The phone number to validate
 * @param countryCode - Optional ISO country code to validate against (e.g., 'US', 'JM')
 * @returns Formatted E.164 phone number if valid, null otherwise
 * @example
 * validatePhoneNumber("8763071239", "JM") // "+18763071239"
 * validatePhoneNumber("+1 876 307 1239") // "+18763071239"
 * validatePhoneNumber("307 1239") // null (too short)
 */
export function validatePhoneNumber(phoneNumber?: string, countryCode?: string): string | null {
  logger.info(
    `Validating phone number: ${phoneNumber ? obfuscateSensitiveData(phoneNumber) : 'N/A'} with country code: ${countryCode ?? 'N/A'}`
  )

  try {
    // If no phone number provided
    if (!phoneNumber || phoneNumber.trim() === '' || phoneNumber === '') {
      return null
    }

    // Remove all non-digit characters except for leading +
    const cleanedNumber = sanitizePhoneNumber(phoneNumber) || ''

    // E.164 format validation (international numbers are typically 7-15 digits)
    if (cleanedNumber.startsWith('+')) {
      // Check if it's a reasonable length for an international number (7-15 digits after +)
      if (!/^\+\d{7,15}$/.test(cleanedNumber)) {
        logger.warn(`Invalid E.164 phone number format: ${obfuscateSensitiveData(phoneNumber)}`)

        return null
      }

      return cleanedNumber
    }

    // Handle numbers without country code
    // Remove leading zeros which are often used as national prefixes
    const nationalNumber = cleanedNumber.replace(/^0+/, '')

    // If we have a country code, prepend the international prefix
    if (countryCode) {
      const prefix = countryCallingCodes[countryCode.toUpperCase() as keyof typeof countryCallingCodes]

      if (!prefix) {
        logger.warn(`Unknown country code: ${countryCode}`)

        return null
      }

      // Basic length check for the local part (5-12 digits typically)
      if (nationalNumber.length < 5 || nationalNumber.length > 12) {
        logger.warn(`Phone number length invalid for country ${countryCode}: ${obfuscateSensitiveData(phoneNumber)}`)

        return null
      }

      return `+${prefix}${nationalNumber}`
    }

    // Without country code, we can only do basic validation
    if (nationalNumber.length < 7 || nationalNumber.length > 15) {
      logger.warn(`Phone number length outside reasonable range: ${obfuscateSensitiveData(phoneNumber)}`)

      return null
    }

    // If we can't format it properly, at least return the cleaned digits
    return cleanedNumber
  } catch (error) {
    logger.error(`Error validating phone number: ${error}`)

    return null
  }
}

/**
 * Formats a number to a string with currency code and symbol.
 * @param price - The number to format.
 * @param currencyCode - Optional currency code (defaults to USD)
 * @param signType - Optional sign type (defaults to '')
 * @returns The formatted string.
 * @example
 * formatMoney(200.234) // "USD 200.23"
 * formatMoney(200.234, 'USD') // "USD 200.23"
 * formatMoney(200.234, 'USD', '+') // "+ USD 200.23"
 * formatMoney(200.234, 'USD', '-') // "- USD 200.23"
 * formatMoney("abc", "USD") // "USD 0.00" (if price is not a number)
 */
export function formatMoney(price: number | string | undefined, currencyCode?: string, signType?: '+' | '-'): string {
  const code = currencyCode?.toUpperCase() || 'USD'

  if (!price || isNaN(Number(price))) {
    return `${code} 0.00`
  }

  return `${signType ? signType + ' ' : ''}${code} ${Number(price).toFixed(2)}`
}
