import React from 'react'

import { Pressable, Text, TextInput, View } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import { createChatComposerStyles } from './ChatComposer.styles'
import { ChatComposerProps } from './ChatComposer.types'

const ChatComposer = ({
  value,
  onChangeText,
  onSend,
  onAttachPress,
  placeholder,
  attachLabel,
  sendLabel,
  disabled = false
}: ChatComposerProps) => {
  const colors = useThemeColors()
  const styles = useThemedStyles(createChatComposerStyles)
  const { t } = useTranslation()
  const canSend = !disabled && value.trim().length > 0

  return (
    <View style={styles.container}>
      {onAttachPress ? (
        <Pressable style={styles.attachButton} onPress={onAttachPress} accessibilityRole="button">
          <Text style={styles.attachLabel}>{attachLabel ?? t('components.chat.attachProfile')}</Text>
        </Pressable>
      ) : null}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ?? t('components.chat.placeholder')}
          placeholderTextColor={colors.textSecondary}
          multiline
          editable={!disabled}
        />

        <Pressable
          style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
          onPress={onSend}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSend }}
        >
          <Text style={styles.sendLabel}>{sendLabel ?? t('components.chat.send')}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ChatComposer
