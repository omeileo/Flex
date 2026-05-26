import { PlannedWorkout, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

import {
  PlanDetailHierarchy,
  PlanDetailHierarchyCopy,
  PlanPhaseDetail,
  WeekDayScheduleItem,
  WeekScheduleData
} from './planDetailHierarchy.types'
import { formatExercisePrescription, inferWorkoutModality } from './trainingPlanPresentation.functions'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const clampWeekNumber = (weekNumber: number, totalWeeks: number): number =>
  Math.max(1, Math.min(totalWeeks, weekNumber))

export const resolvePhaseForWeek = (phases: PlanPhaseDetail[], weekNumber: number): PlanPhaseDetail => {
  const match = phases.find((phase) => weekNumber >= phase.weekStart && weekNumber <= phase.weekEnd)

  return match ?? phases[0]
}

const buildExercisePreview = (workout: PlannedWorkout): string => {
  const previews = workout.exercises.slice(0, 3).map((exercise) => {
    const prescriptionShort = formatExercisePrescription(exercise.sets)
    const shortName = exercise.exerciseName.split(' ').slice(-2).join(' ')

    return prescriptionShort ? `${shortName} ${prescriptionShort}` : exercise.exerciseName
  })

  if (workout.exercises.length > 3) {
    return `${previews.join(' · ')}…`
  }

  return previews.join(' · ')
}

const buildWeekDays = (plan: TrainingPlan, restDayLabel: string): WeekDayScheduleItem[] => {
  const workoutsByDay = new Map(plan.workouts.map((workout) => [workout.dayIndex % 7, workout]))

  return DAY_LABELS.map((dayLabel, index) => {
    const workout = workoutsByDay.get(index)

    if (!workout) {
      return {
        dayIndex: index,
        dayLabel,
        title: restDayLabel,
        preview: '—',
        modality: 'mobility' as const,
        hasWorkout: false
      }
    }

    return {
      dayIndex: workout.dayIndex,
      dayLabel,
      title: workout.name,
      preview: buildExercisePreview(workout),
      modality: inferWorkoutModality(workout),
      hasWorkout: true
    }
  })
}

const buildWeekSchedule = (plan: TrainingPlan, copy: PlanDetailHierarchyCopy, weekNumber: number): WeekScheduleData => {
  const normalizedWeek = clampWeekNumber(weekNumber, copy.totalWeeks)
  const phase = resolvePhaseForWeek(copy.phases, normalizedWeek)
  const workoutCount = plan.workouts.length
  const setCount = plan.workouts.reduce(
    (total, workout) => total + workout.exercises.reduce((inner, exercise) => inner + exercise.sets.length, 0),
    0
  )

  return {
    weekNumber: normalizedWeek,
    phaseTag: `${phase.name} · ${phase.rpe}`,
    totalWeeks: copy.totalWeeks,
    days: buildWeekDays(plan, copy.restDayLabel),
    footerStats: `${workoutCount} workouts · ${(setCount * 320).toLocaleString()} kg volume`
  }
}

export const buildPlanDetailHierarchy = (plan: TrainingPlan, copy: PlanDetailHierarchyCopy): PlanDetailHierarchy => {
  const phasesById = new Map(copy.phases.map((phase) => [phase.id, phase]))
  const currentWeekNumber = plan.weekNumber ?? 1

  return {
    program: {
      programTitle: copy.programTitle,
      blurb: copy.blurb,
      statsLabel: copy.statsLabel,
      deloadNote: copy.deloadNote,
      phases: copy.phases,
      currentWeekNumber,
      totalWeeks: copy.totalWeeks
    },
    phasesById,
    runningCopy: copy.runningCopy,
    resolvePhaseForWeek: (weekNumber: number) => resolvePhaseForWeek(copy.phases, weekNumber),
    getWeekSchedule: (weekNumber: number) => buildWeekSchedule(plan, copy, weekNumber)
  }
}
