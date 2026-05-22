import { logger } from '@/app'
import { User } from '@/shared/email/email.types'

import { emailRegex, phoneRegex } from './security.regex'

/**
 * Obfuscates sensitive data like email addresses for logging purposes.
 * @example 'user@appshop.biz' becomes `u***r@a***p.biz`
 * @example '+1 (123) 456-7890' becomes `+1 (123) ***-7890`
 *
 * @param text - The sensitive text to obfuscate
 * @returns The obfuscated text
 */
export const obfuscateSensitiveData = (text: string): string => {
  if (!text) return text

  let obfuscatedText = text

  if (isValidEmail(text)) {
    obfuscatedText = obfuscateEmailAddress(text)
  } else if (isValidPhone(text)) {
    obfuscatedText = obfuscatePhoneNumber(text)
  } else if (isStripeSensitiveData(text)) {
    obfuscatedText = obfuscateStripeData(text)
  } else {
    // Generic obfuscation for other sensitive data
    if (text.length <= 4) {
      obfuscatedText = '****'
    } else {
      const visibleStart = text.slice(0, 2)
      const visibleEnd = text.slice(-2)
      const middleLength = text.length - 4
      const stars = '*'.repeat(middleLength)

      obfuscatedText = `${visibleStart}${stars}${visibleEnd}`
    }
  }

  return obfuscatedText
}

/**
 * Obfuscates an email address for logging purposes.
 * @example 'user@appshop.biz' becomes `u***r@a***p.biz`
 *
 * @param email - The email address to obfuscate
 * @returns The obfuscated email address
 */
export const obfuscateEmailAddress = (email: string): string => {
  let obfuscatedEmail = email

  if (isValidEmail(email)) {
    const [localPart, domain] = email.split('@')
    const [domainName, tld] = domain.split('.')

    const obfuscatedLocal = localPart.length > 2 ? `${localPart[0]}***${localPart[localPart.length - 1]}` : '***'

    const obfuscatedDomain = domainName.length > 2 ? `${domainName[0]}***${domainName[domainName.length - 1]}` : '***'

    obfuscatedEmail = `${obfuscatedLocal}@${obfuscatedDomain}.${tld}`
  } else {
    logger.warn(`Could not obfuscate email address. Invalid email provided: ${email}`)
  }

  return obfuscatedEmail
}

/**
 * Obfuscates a phone number for logging purposes.
 * @example '+1 (123) 456-7890' becomes `+1 (123) ***-7890`
 *
 * @param phone - The phone number to obfuscate
 * @returns The obfuscated phone number
 */
export const obfuscatePhoneNumber = (phone: string): string => {
  let obfuscatedPhone = phone

  if (isValidPhone(phone)) {
    const matches = phone.match(phoneRegex)

    if (!matches) return phone

    const [, areaCode, , lineNumber] = matches

    obfuscatedPhone = `+1 (${areaCode}) ***-${lineNumber}`
  } else {
    logger.warn(`Could not obfuscate phone number. Invalid phone number provided: ${phone}`)
  }

  return obfuscatedPhone
}

/**
 * Obfuscates sensitive Stripe data for logging purposes.
 * @example
 * - Payment Intent: 'pi_3R5fUxRg9fEnHjZL0fxA4eMr' becomes 'pi_***A4eMr'
 * - Payment Intent Secret: 'pi_3R5fUxRg9fEnHjZL0fxA4eMr_secret_A9tRV3orOoVFk9916O0LvUdz7' becomes 'pi_***_secret_***z7'
 * - Customer Secret: 'cuss_secret_Rzeo7Fb6wXyPqTa99bsqSmP1f5VdhedST4qbScLYQobO9Aj' becomes 'cuss_secret_***9Aj'
 *
 * @param stripeData - The Stripe data to obfuscate
 * @returns The obfuscated Stripe data
 */
export const obfuscateStripeData = (stripeData: string): string => {
  if (!stripeData) return stripeData

  // Payment intent with secret
  if (stripeData.includes('_secret_')) {
    const parts = stripeData.split('_secret_')
    const prefix = parts[0].substring(0, 3)
    const secretSuffix = parts[1].slice(-2)

    return `${prefix}_***_secret_***${secretSuffix}`
  }

  // Payment intent
  if (stripeData.startsWith('pi_')) {
    return `pi_***${stripeData.slice(-4)}`
  }

  // Customer secret
  if (stripeData.includes('cuss_secret_')) {
    return `cuss_secret_***${stripeData.slice(-3)}`
  }

  // Generic fallback for other Stripe data
  if (stripeData.length > 8) {
    return `${stripeData.substring(0, 4)}***${stripeData.slice(-4)}`
  }

  return '***'
}

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns Whether the email address is valid
 */
export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email)
}

/**
 * Validates a phone number
 * @param phone - The phone number to validate
 * @returns Whether the phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  return phoneRegex.test(phone)
}

/**
 * Checks if a string is a valid Stripe payment intent ID
 * @param paymentIntentId - The payment intent ID to check
 * @returns Whether the payment intent ID is valid
 */
export const isStripeSensitiveData = (data: string): boolean => {
  return data.includes('_secret_') || data.startsWith('pi_') || data.includes('cuss_secret_')
}

/**
 * Obfuscates a name for emails
 * @param user - The user to obfuscate the name for
 * @returns The obfuscated name
 */
export const obfuscateNameForEmails = (user: User): string => {
  const firstName = user.user_profile.first_name
  const lastName = user.user_profile.last_name
  const lastInitial = lastName ? lastName[0] : ''

  return `${firstName} ${lastInitial}.`
}
