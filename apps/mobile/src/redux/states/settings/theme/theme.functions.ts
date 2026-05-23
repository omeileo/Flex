import localStorage from '@shared/functions/LocalStorage/localStorage'
import { ThemeMode } from '@shared/styles/StyleConstants'

import { THEME_STORAGE_KEY } from './theme.dictionary'
import { isThemeMode } from './theme.initialState'

export const loadStoredThemeMode = (): ThemeMode | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)

    if (isThemeMode(stored)) {
      return stored
    }

    return null
  } catch (_error) {
    return null
  }
}

export const persistThemeMode = (mode: ThemeMode) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch (_error) {
    // Persistence failures should not block theme selection.
  }
}
