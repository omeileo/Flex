import { PlanPhasePresentation, PresentedWeekPlan } from '@shared/functions/TrainingPlan/trainingPlanPresentation.types'

import { PlanCreationChatMessage, PlanFocusId, PlanFocusOption } from './planCreation/planCreation.types'

export type PlanHomeView = 'empty' | 'focus' | 'chat' | 'recap' | 'generating' | 'intro' | 'overview' | 'weekly'

export interface PlanHomeComponentProps {
  view: PlanHomeView
  programTitle: string
  blurb: string
  phases: PlanPhasePresentation[]
  weekPlans: PresentedWeekPlan[]
  selectedWeek: PresentedWeekPlan | null
  weekSheetOpen: boolean
  adjustModalOpen: boolean
  isLoading: boolean
  isGenerating: boolean
  generatingStatus: string
  error: string | null
  generateError: string | null
  focusOptions: PlanFocusOption[]
  selectedFocusId: PlanFocusId | null
  chatMessages: PlanCreationChatMessage[]
  chatComposerValue: string
  chatStarterPrompts: string[]
  recapItems: string[]
  recapStats: string
  weeklyCoachNote: string
  weekPhaseLabel: string
  weekPhaseRules: string
  selectedWeekNumber: number
  totalWeeks: number
  onRefresh: () => void
  onCreatePlan: () => void
  onSelectFocus: (focusId: PlanFocusId) => void
  onContinueFromFocus: () => void
  onChatComposerChange: (value: string) => void
  onChatSend: () => void
  onChatPromptPress: (prompt: string) => void
  onReviewInputs: () => void
  onBackToChat: () => void
  onGeneratePlan: () => void
  onViewFullPlan: () => void
  onWeekPress: (weekNumber: number) => void
  onCloseWeekSheet: () => void
  onViewFullWeek: () => void
  onViewProgram: () => void
  onOpenAdjust: () => void
  onCloseAdjust: () => void
  onReadaptPlan: () => void
  onTalkToCoach: () => void
  onWorkoutPress: (dayIndex: number, workoutName: string) => void
  onPreviousWeek: () => void
  onNextWeek: () => void
  onGoToCurrentWeek: () => void
}
