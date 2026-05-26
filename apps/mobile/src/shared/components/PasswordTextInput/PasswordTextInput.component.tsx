import React, { useState } from 'react'

import { Pressable, TextInput, View } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import PasswordVisibilityIcon from './PasswordVisibilityIcon.component'

import { createPasswordTextInputStyles } from './PasswordTextInput.styles'
import { PasswordTextInputProps } from './PasswordTextInput.types'

const PasswordTextInput = ({
  value,
  onChangeText,
  placeholder,
  style,
  autoComplete = 'password',
  editable = true
}: PasswordTextInputProps) => {
  const colors = useThemeColors()
  const styles = useThemedStyles(createPasswordTextInputStyles)
  const { t } = useTranslation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={!isPasswordVisible}
        editable={editable}
        autoCapitalize="none"
        autoComplete={autoComplete}
        autoCorrect={false}
      />
      <Pressable
        style={styles.toggleButton}
        onPress={() => setIsPasswordVisible((current) => !current)}
        accessibilityRole="button"
        accessibilityLabel={isPasswordVisible ? t('components.form.hidePassword') : t('components.form.showPassword')}
        hitSlop={8}
      >
        <PasswordVisibilityIcon visible={isPasswordVisible} />
      </Pressable>
    </View>
  )
}

export default PasswordTextInput
