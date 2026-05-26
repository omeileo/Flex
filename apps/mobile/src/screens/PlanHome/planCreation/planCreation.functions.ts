import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import type { GeneratePlanRequest, PlannedWorkout } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

import { PlanCreationDraft, PlanFocusId } from './planCreation.types'

type Translate = (key: string, params?: Record<string, unknown>) => string

const focusGoalLabels: Record<PlanFocusId, string> = {
  strength: 'Strength block',
  running: 'Running goal',
  hybrid: 'Hybrid strength and running',
  injury: 'Return from injury'
}

export const defaultPlanCreationDraft = (): PlanCreationDraft => ({
  focusId: null,
  programTitle: '',
  chatMessages: [],
  recapItems: []
})

export const buildGeneratePlanRequest = (
  focusId: PlanFocusId,
  profile: FitnessProfile | null
): GeneratePlanRequest => ({
  profileOverride: {
    goal: focusGoalLabels[focusId] ?? profile?.goal,
    daysPerWeek: profile?.daysPerWeek
  }
})

export const buildPlanRecapItems = (profile: FitnessProfile | null, focusId: PlanFocusId, t: Translate): string[] => {
  const items: string[] = []

  items.push(
    t('planHome.recap.goal', {
      focus: t(`planHome.focus.${focusId}Recap`)
    })
  )

  if (profile?.injuries?.length) {
    items.push(
      t('planHome.recap.injuries', {
        injuries: profile.injuries.join(', ')
      })
    )
  } else {
    items.push(t('planHome.recap.noInjuries'))
  }

  if (profile?.equipment?.length) {
    items.push(
      t('planHome.recap.equipment', {
        equipment: profile.equipment.join(', ')
      })
    )
  } else {
    items.push(t('planHome.recap.defaultEquipment'))
  }

  items.push(t('planHome.recap.running'))
  items.push(
    t('planHome.recap.schedule', {
      days: profile?.daysPerWeek ?? 5
    })
  )

  return items
}

export const buildExercisePreview = (workout: PlannedWorkout): string => {
  const names = workout.exercises.slice(0, 3).map((exercise) => exercise.exerciseName)
  const remainder = workout.exercises.length - names.length

  if (remainder > 0) {
    return `${names.join(' · ')} +${remainder}`
  }

  return names.join(' · ')
}

export const buildProgramTitle = (focusId: PlanFocusId, t: Translate): string =>
  t('planHome.recap.defaultProgramTitle', {
    focus: t(`planHome.focus.${focusId}Recap`)
  })
