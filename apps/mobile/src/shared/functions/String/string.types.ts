export type CaseType = 'sentence' | 'title' | 'lower' | 'upper' | 'snake' | 'camel' | 'kebab'

export type FormatMoneyOptions = {
  amount: number | string | undefined | null
  currency?: string
  currencySymbol?: string
}
