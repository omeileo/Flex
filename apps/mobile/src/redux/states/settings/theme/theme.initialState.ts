import { ThemeMode } from '@shared/styles/StyleConstants'

import { ThemeState } from './theme.types'

const themeInitialState: ThemeState = {
  mode: 'light',
  hydrated: false
}

export const isThemeMode = (value: unknown): value is ThemeMode =>
  value === 'light' || value === 'dark' || value === 'pink'

export default themeInitialState
