import React from 'react'

import { Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createStatCardStyles } from './StatCard.styles'
import { StatCardProps } from './StatCard.types'

const StatCard = ({ label, value, hint, style, testID }: StatCardProps) => {
  const styles = useThemedStyles(createStatCardStyles)

  return (
    <View style={[styles.card, style]} testID={testID}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  )
}

export default StatCard
