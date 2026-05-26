import { PlannedWorkout } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { PlanPhaseDetail } from '@shared/functions/TrainingPlan/planDetailHierarchy.types'

export interface PhaseDetailRouteParams {
  phaseId: string
}

export interface PhaseDetailComponentProps {
  phase: PlanPhaseDetail | null
  splitDays: PlannedWorkout[]
  runningCopy: string
  isLoading: boolean
  error: string | null
  onViewWeekSchedule: () => void
  onRetry: () => void
}
