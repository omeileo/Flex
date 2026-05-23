export type ChatBubbleRole = 'user' | 'coach'

export type ChatBubbleProps = {
  message: string
  role: ChatBubbleRole
  coachName?: string
}
