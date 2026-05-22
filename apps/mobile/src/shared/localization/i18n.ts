import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules, Platform } from 'react-native'

import en from './locales/en.json'

const detectDeviceLocale = (): string => {
  try {
    const deviceLocale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager?.settings?.AppleLocale ??
          NativeModules.SettingsManager?.settings?.AppleLanguages?.[0]
        : NativeModules.I18nManager?.localeIdentifier

    if (typeof deviceLocale === 'string') {
      return deviceLocale.split(/[_-]/)[0]
    }
  } catch {
    // Fall through to default
  }

  return 'en'
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: { en: { translation: en } },
    lng: detectDeviceLocale(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n
