import React from 'react'

import { ActivityIndicator, Pressable, Text } from 'react-native'

import { colors } from '@shared/styles/StyleConstants'

import styles from './PrimaryButton.styles'
import { PrimaryButtonProps } from './PrimaryButton.types'

const PrimaryButton = ({ label, onPress, disabled = false, loading = false, style }: PrimaryButtonProps) => {
  const isDisabled = disabled || loading

  return (
    <Pressable
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      android_ripple={{ color: 'rgba(255,255,255,0.12)' }}
    >
      {loading ? <ActivityIndicator color={colors.textInverse} /> : <Text style={styles.label}>{label}</Text>}
    </Pressable>
  )
}

export default PrimaryButton
