import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import styles from './ErrorView.styles'
import { ErrorViewProps } from './ErrorView.types'

const ErrorView = ({ message, onRetry, retryLabel = 'Retry' }: ErrorViewProps) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>

    {onRetry ? (
      <TouchableOpacity style={styles.retryButton} onPress={onRetry} accessibilityRole="button">
        <Text style={styles.retryLabel}>{retryLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
)

export default ErrorView
