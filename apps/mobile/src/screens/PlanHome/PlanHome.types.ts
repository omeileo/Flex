import { PlanPhasePresentation, PresentedWeekPlan } from '@shared/functions/TrainingPlan/trainingPlanPresentation.types'

export type PlanHomeView = 'overview' | 'empty' | 'generating'

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
  error: string | null
  generateError: string | null
  onRefresh: () => void
  onCreatePlan: () => void
  onWeekPress: (weekNumber: number) => void
  onCloseWeekSheet: () => void
  onViewFullWeek: () => void
  onOpenAdjust: () => void
  onCloseAdjust: () => void
  onWorkoutPress: (dayIndex: number, workoutName: string) => void
}
