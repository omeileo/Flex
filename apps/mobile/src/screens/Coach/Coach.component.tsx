import React from 'react'

import { Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import ChatBubble from '@shared/components/ChatBubble/ChatBubble.component'
import ChatComposer from '@shared/components/ChatComposer/ChatComposer.component'

import { createCoachStyles } from './Coach.styles'
import { CoachComponentProps } from './Coach.types'

const CoachComponent = ({
  title,
  statusLabel,
  messages,
  starterPrompts,
  composerValue,
  onComposerChange,
  onSend,
  onPromptPress
}: CoachComponentProps) => {
  const styles = useThemedStyles(createCoachStyles)

  return (
    <View style={styles.container} testID="coach-screen">
      <View style={styles.headerBand}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>FC</Text>
          </View>
          <View style={styles.headerCopy}>
            <Text style={styles.title} testID="coach-title">
              {title}
            </Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{statusLabel}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.messageList} contentContainerStyle={styles.messageListContent}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message.text} role={message.role} />
        ))}
      </ScrollView>

      <View style={styles.promptRow}>
        {starterPrompts.map((prompt) => (
          <Pressable key={prompt} style={styles.promptChip} onPress={() => onPromptPress(prompt)}>
            <Text style={styles.promptText}>{prompt}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.composerWrap}>
        <ChatComposer value={composerValue} onChangeText={onComposerChange} onSend={onSend} />
      </View>
    </View>
  )
}

export default CoachComponent
