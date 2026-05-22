import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { colors } from '@shared/styles/StyleConstants';

import styles from './FormTextField.styles';
import { FormTextFieldProps } from './FormTextField.types';

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
  inputStyle,
}: FormTextFieldProps) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        !editable && styles.inputReadOnly,
        error ? styles.inputError : null,
        inputStyle,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      secureTextEntry={secureTextEntry}
      editable={editable}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      autoComplete={autoComplete}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

export default FormTextField;
