import React from 'react'

import { Pressable, Text } from 'react-native'

import styles from './SecondaryButton.styles'
import { SecondaryButtonProps } from './SecondaryButton.types'

const SecondaryButton = ({ label, onPress, disabled = false, variant = 'secondary', style }: SecondaryButtonProps) => {
  const isDestructive = variant === 'destructive'

  return (
    <Pressable
      style={[styles.button, isDestructive && styles.buttonDestructive, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.label, isDestructive && styles.labelDestructive]}>{label}</Text>
    </Pressable>
  )
}

export default SecondaryButton
