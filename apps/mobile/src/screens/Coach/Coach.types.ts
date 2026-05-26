export type ChatMessage = {
  id: string
  role: 'coach' | 'user'
  text: string
}

export interface CoachComponentProps {
  title: string
  statusLabel: string
  messages: ChatMessage[]
  starterPrompts: string[]
  composerValue: string
  onComposerChange: (value: string) => void
  onSend: () => void
  onPromptPress: (prompt: string) => void
}
