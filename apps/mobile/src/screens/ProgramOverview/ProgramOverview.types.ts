import { ProgramOverviewData } from '@shared/functions/TrainingPlan/planDetailHierarchy.types'

export interface ProgramOverviewRouteParams {
  weekNumber?: number
}

export interface ProgramOverviewComponentProps {
  program: ProgramOverviewData | null
  isLoading: boolean
  error: string | null
  onPhasePress: (phaseId: string) => void
  onJumpToCurrentWeek: () => void
  onRetry: () => void
}
