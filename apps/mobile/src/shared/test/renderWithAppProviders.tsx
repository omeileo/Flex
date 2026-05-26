import React, { PropsWithChildren } from 'react'

import themeReducer from '@redux/states/settings/theme/theme.slice'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'

import ThemeProvider from '@shared/context/ThemeProvider/ThemeProvider.component'

export const renderWithAppProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      theme: themeReducer
    }
  })

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  )

  return render(ui, { wrapper: Wrapper })
}
