import React from 'react'

import { Text, TextInput, View } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import PasswordTextInput from '@shared/components/PasswordTextInput/PasswordTextInput.component'

import { createFormTextFieldStyles } from './FormTextField.styles'
import { FormTextFieldProps } from './FormTextField.types'

const FormTextField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  editable = true,
  autoCapitalize = 'none',
  keyboardType = 'default',
  autoComplete,
  containerStyle,
  inputStyle
}: FormTextFieldProps) => {
  const colors = useThemeColors()
  const styles = useThemedStyles(createFormTextFieldStyles)

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      {secureTextEntry ? (
        <PasswordTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoComplete={autoComplete === 'new-password' ? 'new-password' : 'password'}
          editable={editable}
          style={[styles.input, !editable && styles.inputReadOnly, error ? styles.inputError : null, inputStyle]}
        />
      ) : (
        <TextInput
          style={[styles.input, !editable && styles.inputReadOnly, error ? styles.inputError : null, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          editable={editable}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export default FormTextField
