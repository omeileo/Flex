import { createContext } from 'react'

import { ThemeMode, getThemeColors } from '@shared/styles/StyleConstants'

export type ThemeColors = ReturnType<typeof getThemeColors>

export type ThemeContextValue = {
  mode: ThemeMode
  colors: ThemeColors
}

export const defaultThemeContextValue: ThemeContextValue = {
  mode: 'light',
  colors: getThemeColors('light')
}

export const ThemeContext = createContext<ThemeContextValue>(defaultThemeContextValue)
