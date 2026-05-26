import React from 'react'

import { Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createErrorFallbackStyles } from './ErrorFallback.styles'
import { ErrorFallbackProps } from './ErrorFallback.types'

const ErrorFallback = ({ onRetry }: ErrorFallbackProps) => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createErrorFallbackStyles)

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.title}>{t('errorBoundary.title')}</Text>
      <Text style={styles.message}>{t('errorBoundary.message')}</Text>
      <PrimaryButton label={t('errorBoundary.retry')} onPress={onRetry} style={styles.button} />
    </View>
  )
}

export default ErrorFallback
