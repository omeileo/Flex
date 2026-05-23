export const formatCurrency = (value: number, currency = 'USD', locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)

export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

export const formatPercent = (value: number, fractionDigits = 0): string =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value)
