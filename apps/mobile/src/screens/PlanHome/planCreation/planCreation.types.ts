export type PlanFocusId = 'strength' | 'running' | 'hybrid' | 'injury'

export type PlanFocusOption = {
  id: PlanFocusId
  titleKey: string
  subtitleKey: string
}

export type PlanCreationChatMessage = {
  id: string
  role: 'coach' | 'user'
  text: string
}

export type PlanCreationDraft = {
  focusId: PlanFocusId | null
  programTitle: string
  chatMessages: PlanCreationChatMessage[]
  recapItems: string[]
}
