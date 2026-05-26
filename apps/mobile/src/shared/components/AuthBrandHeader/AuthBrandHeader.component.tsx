import React from 'react'

import { Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import { createAuthBrandHeaderStyles } from './AuthBrandHeader.styles'
import { AuthBrandHeaderProps } from './AuthBrandHeader.types'

const AuthBrandHeader = ({ tagline }: AuthBrandHeaderProps) => {
  const styles = useThemedStyles(createAuthBrandHeaderStyles)
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>{t('app.name')}</Text>
      <View style={styles.accentBar} />
      {tagline ? <Text style={styles.tagline}>{tagline}</Text> : null}
    </View>
  )
}

export default AuthBrandHeader
