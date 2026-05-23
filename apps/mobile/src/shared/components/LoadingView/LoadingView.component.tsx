import React from 'react'

import { ActivityIndicator, Text, View } from 'react-native'

import { colors } from '@shared/styles/StyleConstants'

import styles from './LoadingView.styles'
import { LoadingViewProps } from './LoadingView.types'

const LoadingView = ({ message }: LoadingViewProps) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.accent} />
    {message ? <Text style={styles.message}>{message}</Text> : null}
  </View>
)

export default LoadingView
