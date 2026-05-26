import localStorage from '@shared/functions/LocalStorage/localStorage'
import { WellnessCondition, WellnessState } from '@shared/types/wellness.types'

import { WELLNESS_STORAGE_KEY } from './wellness.dictionary'

export const persistWellness = (state: WellnessState) => {
  try {
    localStorage.setItem(WELLNESS_STORAGE_KEY, JSON.stringify(state))
  } catch (_error) {
    // Persistence failures should not block wellness updates.
  }
}

export const loadStoredWellness = (): WellnessState | null => {
  try {
    const stored = localStorage.getItem(WELLNESS_STORAGE_KEY)

    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored) as WellnessState

    if (!Array.isArray(parsed.conditions) || !Array.isArray(parsed.excludedExerciseIds)) {
      return null
    }

    return parsed
  } catch (_error) {
    return null
  }
}

export const buildWellnessPreview = (conditions: WellnessCondition[], emptyLabel: string): string => {
  const active = conditions.filter((condition) => condition.status !== 'recovered')

  if (active.length === 0) {
    return emptyLabel
  }

  const labels = active
    .map((condition) => condition.label ?? condition.bodyArea)
    .slice(0, 2)
    .join(', ')

  return `${active.length} active · ${labels}`
}

export const buildExcludedPreview = (count: number, emptyLabel: string): string => {
  if (count === 0) {
    return emptyLabel
  }

  return `${count} exercises`
}
