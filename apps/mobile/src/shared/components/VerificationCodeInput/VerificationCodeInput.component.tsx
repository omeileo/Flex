import React, { useCallback, useRef } from 'react'

import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputKeyPressEventData, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createVerificationCodeInputStyles } from './VerificationCodeInput.styles'
import { VerificationCodeInputProps } from './VerificationCodeInput.types'

const VerificationCodeInput = ({ value, onChange, length = 6, error }: VerificationCodeInputProps) => {
  const styles = useThemedStyles(createVerificationCodeInputStyles)
  const inputRef = useRef<TextInput>(null)
  const chars = value.toUpperCase().split('').slice(0, length)
  const boxes = Array.from({ length }, (_, index) => chars[index] ?? '')

  const handleChange = useCallback(
    (text: string) => {
      const sanitized = text
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase()
        .slice(0, length)
      onChange(sanitized)
    },
    [length, onChange]
  )

  const handleKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (event.nativeEvent.key === 'Backspace' && value.length === 0) {
        return
      }
    },
    [value.length]
  )

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <View style={styles.container}>
      <Pressable style={styles.row} onPress={focusInput} accessibilityRole="button">
        {boxes.map((char, index) => (
          <View key={`code-box-${index}`} style={[styles.box, char ? styles.boxFilled : null]}>
            <Text style={styles.boxText}>{char}</Text>
          </View>
        ))}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        onKeyPress={handleKeyPress}
        autoCapitalize="characters"
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        maxLength={length}
        style={styles.hiddenInput}
        caretHidden
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export default VerificationCodeInput
