import { WeekScheduleData } from '@shared/functions/TrainingPlan/planDetailHierarchy.types'

export interface WeekScheduleRouteParams {
  weekNumber: number
  phaseId?: string
}

export interface WeekScheduleComponentProps {
  schedule: WeekScheduleData | null
  isLoading: boolean
  error: string | null
  onPreviousWeek: () => void
  onNextWeek: () => void
  onDayPress: (dayIndex: number, title: string) => void
  onRetry: () => void
}
