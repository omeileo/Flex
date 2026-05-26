import React, { useEffect, useState } from 'react'

import { StatusBar, View } from 'react-native'

import { hydrateCycleProfile } from '@redux/states/profile/cycleProfile/cycleProfile.slice'
import { hydrateWellness } from '@redux/states/profile/wellness/wellness.slice'
import { hydrateWorkoutLocations } from '@redux/states/profile/workoutLocations/workoutLocations.slice'
import { hydrateTheme } from '@redux/states/settings/theme/theme.slice'
import store from '@redux/store/store'
import { createAppRoutes } from '@router/router'
import routes from '@router/routes.dictionary'
import ErrorBoundary from '@shared/context/ErrorBoundary/ErrorBoundary.class'
import { isAuthenticated } from '@shared/functions/Auth/auth.functions'
import { validateStoredSession } from '@shared/functions/Auth/session.functions'
import i18n from '@shared/localization/i18n'
import { I18nextProvider } from 'react-i18next'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider, useDispatch } from 'react-redux'

import { SnackbarProvider } from '@shared/components/Snackbar/context/Snackbar.context.container'

import ThemeProvider from '@shared/context/ThemeProvider/ThemeProvider.component'

const AppBootstrap = () => {
  const dispatch = useDispatch()
  const [appRoutes, setAppRoutes] = useState<React.ReactElement | null>(null)

  useEffect(() => {
    dispatch(hydrateTheme())
    dispatch(hydrateWorkoutLocations())
    dispatch(hydrateWellness())
    dispatch(hydrateCycleProfile())
  }, [dispatch])

  useEffect(() => {
    let cancelled = false

    const bootstrapSession = async () => {
      await validateStoredSession()

      if (cancelled) {
        return
      }

      const initialRouteName = isAuthenticated() ? routes.flexBootstrap.path : routes.landing.path

      setAppRoutes(createAppRoutes(initialRouteName))
    }

    bootstrapSession()

    return () => {
      cancelled = true
    }
  }, [])

  if (!appRoutes) {
    return null
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SnackbarProvider>{appRoutes}</SnackbarProvider>
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
