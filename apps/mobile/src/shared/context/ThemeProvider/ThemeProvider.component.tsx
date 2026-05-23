import React, { useEffect, useMemo } from 'react'

import { StatusBar } from 'react-native'

import { RootState } from '@redux/store/store.types'
import { getThemeColors } from '@shared/styles/StyleConstants'
import { useSelector } from 'react-redux'

import { ThemeProviderProps } from './ThemeProvider.component.types'
import { ThemeContext } from './ThemeProvider.types'

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const mode = useSelector((state: RootState) => state.theme.mode)

  const value = useMemo(
    () => ({
      mode,
      colors: getThemeColors(mode)
    }),
    [mode]
  )

  useEffect(() => {
    StatusBar.setBarStyle(mode === 'dark' ? 'light-content' : 'dark-content')
  }, [mode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
