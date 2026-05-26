import React from 'react'

import { ActivityIndicator, Text, View } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createLoadingViewStyles } from './LoadingView.styles'
import { LoadingViewProps } from './LoadingView.types'

const LoadingView = ({ message }: LoadingViewProps) => {
  const colors = useThemeColors()
  const styles = useThemedStyles(createLoadingViewStyles)

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accent} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  )
}

export default LoadingView
