import React from 'react'

import { Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createChatBubbleStyles } from './ChatBubble.styles'
import { ChatBubbleProps } from './ChatBubble.types'

const ChatBubble = ({ message, role, coachName = 'Flex Coach' }: ChatBubbleProps) => {
  const styles = useThemedStyles(createChatBubbleStyles)
  if (role === 'user') {
    return (
      <View style={styles.userBubble}>
        <Text style={styles.message}>{message}</Text>
      </View>
    )
  }

  const initials = coachName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <View style={styles.coachRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.coachBubble}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  )
}

export default ChatBubble
