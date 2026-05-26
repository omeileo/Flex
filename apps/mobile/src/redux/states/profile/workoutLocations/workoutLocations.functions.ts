import localStorage from '@shared/functions/LocalStorage/localStorage'
import { WorkoutLocation } from '@shared/types/workoutEquipment.types'

import { WORKOUT_LOCATIONS_STORAGE_KEY } from './workoutLocations.dictionary'
import { WorkoutLocationsState } from './workoutLocations.types'

export const persistWorkoutLocations = (state: Pick<WorkoutLocationsState, 'locations' | 'activeLocationId'>) => {
  try {
    localStorage.setItem(WORKOUT_LOCATIONS_STORAGE_KEY, JSON.stringify(state))
  } catch (_error) {
    // Persistence failures should not block location updates.
  }
}

export const loadStoredWorkoutLocations = (): Pick<WorkoutLocationsState, 'locations' | 'activeLocationId'> | null => {
  try {
    const stored = localStorage.getItem(WORKOUT_LOCATIONS_STORAGE_KEY)

    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored) as Pick<WorkoutLocationsState, 'locations' | 'activeLocationId'>

    if (!Array.isArray(parsed.locations)) {
      return null
    }

    return parsed
  } catch (_error) {
    return null
  }
}

export const sortLocations = (locations: WorkoutLocation[]): WorkoutLocation[] =>
  [...locations].sort((left, right) => {
    if (left.isDefault !== right.isDefault) {
      return left.isDefault ? -1 : 1
    }

    return left.name.localeCompare(right.name)
  })

export const buildLocationPreview = (locations: WorkoutLocation[], fallback: string): string => {
  if (locations.length === 0) {
    return fallback
  }

  const defaultLocation = locations.find((location) => location.isDefault) ?? locations[0]
  const defaultLabel = defaultLocation.isDefault ? `${defaultLocation.name} (default)` : defaultLocation.name

  return `${defaultLabel} · ${locations.length} locations`
}
