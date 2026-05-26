import { WorkoutModality } from '@shared/types/workoutModality.types'

export type PlanPhaseDetail = {
  id: string
  name: string
  weeksLabel: string
  weekStart: number
  weekEnd: number
  rpe: string
  goal: string
  progression: string
  restCompounds: string
  restAccessories: string
}

export type ProgramOverviewData = {
  programTitle: string
  blurb: string
  statsLabel: string
  deloadNote: string
  phases: PlanPhaseDetail[]
  currentWeekNumber: number
  totalWeeks: number
}

export type WeekDayScheduleItem = {
  dayIndex: number
  dayLabel: string
  title: string
  preview: string
  modality: WorkoutModality
  hasWorkout: boolean
}

export type WeekScheduleData = {
  weekNumber: number
  phaseTag: string
  totalWeeks: number
  days: WeekDayScheduleItem[]
  footerStats: string
}

export type PlanDetailHierarchyCopy = {
  programTitle: string
  blurb: string
  statsLabel: string
  deloadNote: string
  runningCopy: string
  restDayLabel: string
  phases: PlanPhaseDetail[]
  totalWeeks: number
}

export type PlanDetailHierarchy = {
  program: ProgramOverviewData
  phasesById: Map<string, PlanPhaseDetail>
  getWeekSchedule: (weekNumber: number) => WeekScheduleData
  resolvePhaseForWeek: (weekNumber: number) => PlanPhaseDetail
  runningCopy: string
}
