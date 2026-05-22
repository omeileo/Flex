import React, { useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { I18nextProvider } from 'react-i18next'

import store from '@redux/store/store'
import i18n from '@shared/localization/i18n'
import ROUTES from '@router/router'

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <View style={ styles.root }>
      <StatusBar backgroundColor='transparent' translucent />

      <Provider store={ store }>
        <I18nextProvider i18n={ i18n }>
          <SafeAreaProvider>
            { ROUTES }
          </SafeAreaProvider>
        </I18nextProvider>
      </Provider>
    </View>
  )
}

const styles = { root: { flex: 1 } }

export default App
