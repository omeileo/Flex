import React, { ReactElement } from 'react'

import themeReducer from '@redux/states/settings/theme/theme.slice'
import { configureStore } from '@reduxjs/toolkit'
import { RenderOptions, render } from '@testing-library/react-native'
import { Provider } from 'react-redux'

import ThemeProvider from '@shared/context/ThemeProvider/ThemeProvider.component'

export const renderWithTheme = (ui: ReactElement, options?: RenderOptions) => {
  const store = configureStore({
    reducer: {
      theme: themeReducer
    },
    preloadedState: {
      theme: {
        mode: 'light' as const,
        hydrated: true
      }
    }
  })

  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>,
    options
  )
}
