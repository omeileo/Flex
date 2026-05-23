import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ThemeMode } from '@shared/styles/StyleConstants'

import { loadStoredThemeMode, persistThemeMode } from './theme.functions'
import themeInitialState from './theme.initialState'

const themeSlice = createSlice({
  name: 'settings/theme',
  initialState: themeInitialState,
  reducers: {
    hydrateTheme: (state) => {
      const storedMode = loadStoredThemeMode()

      if (storedMode) {
        state.mode = storedMode
      }

      state.hydrated = true
    },
    setThemeMode: (state, { payload }: PayloadAction<ThemeMode>) => {
      state.mode = payload
      persistThemeMode(payload)
    }
  }
})

export const { hydrateTheme, setThemeMode } = themeSlice.actions
export default themeSlice.reducer
