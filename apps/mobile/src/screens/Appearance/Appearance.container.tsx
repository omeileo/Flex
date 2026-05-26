import React, { useCallback, useMemo } from 'react'

import { Text, View } from 'react-native'

import { setThemeMode } from '@redux/states/settings/theme/theme.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { ThemeOption } from '@shared/components/ThemePicker/ThemePicker.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { ThemeMode, getThemeColors, themePalettes } from '@shared/styles/StyleConstants'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import ThemePicker from '@shared/components/ThemePicker/ThemePicker.component'

const buildThemeOption = (mode: ThemeMode, label: string): ThemeOption => {
  const palette = themePalettes[mode]
  const semantic = getThemeColors(mode)

  return {
    mode,
    label,
    previewBackground: palette.background,
    previewSurface: palette.surface,
    previewAccent: palette.accent,
    previewText: semantic.textPrimary
  }
}

const AppearanceContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const dispatch = useDispatch<AppDispatch>()
  const themeMode = useSelector((state: RootState) => state.theme.mode)

  const options = useMemo<ThemeOption[]>(
    () => [
      buildThemeOption('light', t('components.theme.light')),
      buildThemeOption('dark', t('components.theme.dark')),
      buildThemeOption('pink', t('components.theme.pink'))
    ],
    [t]
  )

  const handleSelect = useCallback(
    (mode: ThemeMode) => {
      dispatch(setThemeMode(mode))
    },
    [dispatch]
  )

  return (
    <FlowScreenScaffold
      title={t('profileSettings.appearanceTitle')}
      subtitle={t('profileSettings.appearanceSubtitle')}
      testID="appearance-screen"
    >
      <ThemePicker options={options} selectedMode={themeMode} onSelect={handleSelect} />
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>{t('profileSettings.appearanceDefaultTitle')}</Text>
        <Text style={styles.infoCardText}>{t('profileSettings.appearanceDefaultCopy')}</Text>
      </View>
    </FlowScreenScaffold>
  )
}

export default AppearanceContainer
