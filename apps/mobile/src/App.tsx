import React, { useEffect } from 'react'

import { StatusBar, View } from 'react-native'

import { hydrateTheme } from '@redux/states/settings/theme/theme.slice'
import store from '@redux/store/store'
import ROUTES from '@router/router'
import ErrorBoundary from '@shared/context/ErrorBoundary/ErrorBoundary.class'
import i18n from '@shared/localization/i18n'
import { I18nextProvider } from 'react-i18next'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider, useDispatch } from 'react-redux'

import { SnackbarProvider } from '@shared/components/Snackbar/context/Snackbar.context.container'

import ThemeProvider from '@shared/context/ThemeProvider/ThemeProvider.component'

const AppBootstrap = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hydrateTheme())
  }, [dispatch])

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SnackbarProvider>{ROUTES}</SnackbarProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

const App = () => (
  <View style={styles.root}>
    <StatusBar backgroundColor="transparent" translucent />

    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <AppBootstrap />
        </ErrorBoundary>
      </I18nextProvider>
    </Provider>
  </View>
)

const styles = { root: { flex: 1 } }

export default App
