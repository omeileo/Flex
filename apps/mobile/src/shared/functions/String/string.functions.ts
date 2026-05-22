import { ReactNode } from 'react'

import { CaseType, FormatMoneyOptions } from './string.types'

/**
 * Truncates a string to a specified maximum length.
 */
export function truncateString(str: string, maxLength: number = 50): string {
  if (!str) {
    return ''
  } else if (str.length <= maxLength) {
    return str
  }

  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Converts a string to sentence case (first letter of each word capitalized).
 */
export function sentenceCase(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Changes the case of a string.
 */
export function updateCase(text: string, caseType: CaseType, sanitize: boolean = true): string {
  const textToTransform = sanitize ? sanitizeString(text) : text
  let transformedText = text

  switch (caseType) {
    case 'sentence':
      transformedText = sentenceCase(textToTransform)
      break

    case 'title':
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
      transformedText = textToTransform?.replace(/\s+/g, '_').toLowerCase() ?? ''
      break

    case 'camel':
      transformedText =
        textToTransform
          ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
            index === 0 ? letter.toLowerCase() : letter.toUpperCase()
          )
          .replace(/\s+/g, '') ?? ''
      break

    case 'kebab':
      transformedText = textToTransform?.replace(/\s+/g, '-').toLowerCase() ?? ''
      break
  }

  return transformedText
}

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
    sentence: updateCase(text, 'sentence', sanitize),
    title: updateCase(text, 'title', sanitize),
    lower: updateCase(text, 'lower', sanitize),
    upper: updateCase(text, 'upper', sanitize),
    snake: updateCase(text, 'snake', sanitize),
    camel: updateCase(text, 'camel', sanitize),
    kebab: updateCase(text, 'kebab', sanitize)
  }
}

/**
 * Sanitizes a string by replacing underscores and dashes with spaces.
 */
export function sanitizeString(text: string): string {
  let sanitizedText = replaceUnderscoreWithSpace(text)
  sanitizedText = replaceDashWithSpace(sanitizedText)

  return sanitizedText
}

export function replaceUnderscoreWithSpace(text: string): string {
  return text?.replace(/_/g, ' ') ?? ''
}

export function replaceDashWithSpace(text: string): string {
  return text?.replace(/-/g, ' ') ?? ''
}

/**
 * Joins an array of strings with a bullet.
 */
export function joinStringsWithBullet(strings: string[], trailingBullet?: boolean): string {
  if (!strings.length) return ''

  const joinedStrings = strings.reduce((prev, curr) => {
    if (!curr) return prev

    return prev ? `${prev}  •  ${curr}` : curr
  }, '')

  return trailingBullet ? `${joinedStrings}  •  ` : joinedStrings
}

/**
 * Joins an array of strings or React nodes with a bullet.
 */
export function joinElementsWithBullet(
  elements: (string | ReactNode)[],
  trailingBullet?: boolean
): ReactNode | string {
  if (!elements.length) return ''

  const joinedElements = elements.reduce((prev, curr) => {
    if (!curr) return prev

    return prev ? [prev, '  •  ', curr] : curr
  })

  return trailingBullet ? [joinedElements, '  •  '] : joinedElements
}

export function joinStringWithDash(strings: (string | ReactNode)[]): ReactNode | string {
  if (!strings.length) return ''

  return strings.reduce((prev, curr) => [prev, '  -  ', curr])
}

export function sanitizePhoneNumber(phoneNumber: string | undefined): string | undefined {
  return phoneNumber ? phoneNumber.replace(/[^0-9+]/g, '') : undefined
}

export function formatMoney(options: FormatMoneyOptions): string {
  const { amount, currency, currencySymbol } = options
  const formattedAmount = amount
    ? Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00'

  if (currencySymbol) {
    return `${currencySymbol} ${formattedAmount}`
  } else if (currency) {
    return `${changeCase(currency).upper} ${formattedAmount}`
  }

  return formattedAmount
}

export function formatPhoneNumber(phoneNumber: string | undefined): string | undefined {
  if (!phoneNumber) return undefined

  const cleaned = phoneNumber.replace(/\D/g, '')

  if (cleaned.length < 10) return phoneNumber

  const countryCode = cleaned.length > 10 ? `+${cleaned.slice(0, 1)} ` : '+1 '
  const areaCode = cleaned.slice(-10, -7)
  const firstPart = cleaned.slice(-7, -4)
  const lastPart = cleaned.slice(-4)

  return `${countryCode}(${areaCode}) ${firstPart}-${lastPart}`
}

export function formatTruncatedCardNumber(cardNumber: string): string {
  if (!cardNumber) return ''

  const last4Digits = cardNumber.length > 4 ? cardNumber.slice(-4) : cardNumber

  return '•••' + last4Digits
}

export function extractBaseUrl(url: string): string | undefined {
  if (!url) return undefined

  try {
    const parsedUrl = new URL(url)

    return parsedUrl.origin
  } catch (_error) {
    return url
  }
}
