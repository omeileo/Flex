import React, { useCallback, useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import CoachComponent from './Coach.component'

import { ChatMessage } from './Coach.types'

const CoachContainer = () => {
  const { t } = useTranslation()
  const [composerValue, setComposerValue] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'intro',
      role: 'coach',
      text: t('coach.introMessage')
    }
  ])

  const starterPrompts = useMemo(
    () => [t('coach.prompts.split'), t('coach.prompts.runs'), t('coach.prompts.shoulder')],
    [t]
  )

  const appendMessage = useCallback((role: ChatMessage['role'], text: string) => {
    setMessages((current) => [
      ...current,
      {
        id: `${role}-${Date.now()}`,
        role,
        text
      }
    ])
  }, [])

  const handleSend = useCallback(() => {
    const trimmed = composerValue.trim()

    if (!trimmed) {
      return
    }

    appendMessage('user', trimmed)
    appendMessage('coach', t('coach.replyStub'))
    setComposerValue('')
  }, [appendMessage, composerValue, t])

  const handlePromptPress = useCallback(
    (prompt: string) => {
      appendMessage('user', prompt)
      appendMessage('coach', t('coach.replyStub'))
    },
    [appendMessage, t]
  )

  return (
    <CoachComponent
      title={t('coach.title')}
      statusLabel={t('coach.statusActive')}
      messages={messages}
      starterPrompts={starterPrompts}
      composerValue={composerValue}
      onComposerChange={setComposerValue}
      onSend={handleSend}
      onPromptPress={handlePromptPress}
    />
  )
}

export default CoachContainer
