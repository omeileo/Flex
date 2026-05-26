import React from 'react'

import themeReducer, { setThemeMode } from '@redux/states/settings/theme/theme.slice'
import { configureStore } from '@reduxjs/toolkit'
import { createStatCardStyles } from '@shared/components/StatCard/StatCard.styles'
import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { getThemeColors } from '@shared/styles/StyleConstants'
import { renderHook } from '@testing-library/react-native'
import { Provider } from 'react-redux'

import ThemeProvider from '@shared/context/ThemeProvider/ThemeProvider.component'

import { useThemedStyles } from './useThemedStyles.hooks'

const buildStore = (mode: 'light' | 'dark' | 'pink' = 'light') =>
  configureStore({
    reducer: {
      theme: themeReducer
    },
    preloadedState: {
      theme: {
        mode,
        hydrated: true
      }
    }
  })

const wrapper =
  (store: ReturnType<typeof buildStore>) =>
  ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  )

describe('useThemedStyles', () => {
  it('returns styles derived from the active theme mode', () => {
    const store = buildStore('dark')
    const { result } = renderHook(
      () => {
        const colors = useThemeColors()
        const styles = useThemedStyles(createStatCardStyles)

        return { colors, styles }
      },
      { wrapper: wrapper(store) }
    )

    expect(result.current.colors.background).toBe(getThemeColors('dark').background)
    expect(result.current.styles.card.backgroundColor).toBe(getThemeColors('dark').surface)
  })

  it('updates styles when theme mode changes', () => {
    const store = buildStore('light')
    const { result, rerender } = renderHook(
      () => {
        const colors = useThemeColors()
        const styles = useThemedStyles(createStatCardStyles)

        return { colors, styles }
      },
      { wrapper: wrapper(store) }
    )

    expect(result.current.colors.accent).toBe(getThemeColors('light').accent)

    store.dispatch(setThemeMode('pink'))
    rerender({})

    expect(result.current.colors.accent).toBe(getThemeColors('pink').accent)
    expect(result.current.styles.card.backgroundColor).toBe(getThemeColors('pink').surface)
  })
})

describe('useThemeColors', () => {
  it('exposes semantic tokens alongside palette values', () => {
    const store = buildStore('light')
    const { result } = renderHook(() => useThemeColors(), { wrapper: wrapper(store) })

    expect(result.current.accentEnergy).toBe('#22C55E')
    expect(result.current.successSoft).toBe('#F0FDF4')
  })
})
