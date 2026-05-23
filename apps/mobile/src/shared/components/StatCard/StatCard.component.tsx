import React from 'react'

import { Text, View } from 'react-native'

import styles from './StatCard.styles'
import { StatCardProps } from './StatCard.types'

const StatCard = ({ label, value, style }: StatCardProps) => (
  <View style={[styles.card, style]}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
)

export default StatCard
