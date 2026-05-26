import React from 'react'

import { ActivityIndicator, Pressable, Text } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createPrimaryButtonStyles } from './PrimaryButton.styles'
import { PrimaryButtonProps } from './PrimaryButton.types'

const PrimaryButton = ({ label, onPress, disabled = false, loading = false, style, testID }: PrimaryButtonProps) => {
  const colors = useThemeColors()
  const styles = useThemedStyles(createPrimaryButtonStyles)
  const isDisabled = disabled || loading

  return (
    <Pressable
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      android_ripple={{ color: 'rgba(255,255,255,0.12)' }}
      testID={testID}
    >
      {loading ? <ActivityIndicator color={colors.textInverse} /> : <Text style={styles.label}>{label}</Text>}
    </Pressable>
  )
}

export default PrimaryButton
