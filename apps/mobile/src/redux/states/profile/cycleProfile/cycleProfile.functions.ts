import localStorage from '@shared/functions/LocalStorage/localStorage'
import { CycleProfile } from '@shared/types/cycleProfile.types'

import { CYCLE_PROFILE_STORAGE_KEY } from './cycleProfile.dictionary'

export const persistCycleProfile = (profile: CycleProfile) => {
  try {
    localStorage.setItem(CYCLE_PROFILE_STORAGE_KEY, JSON.stringify(profile))
  } catch (_error) {
    // Persistence failures should not block cycle updates.
  }
}

export const loadStoredCycleProfile = (): CycleProfile | null => {
  try {
    const stored = localStorage.getItem(CYCLE_PROFILE_STORAGE_KEY)

    if (!stored) {
      return null
    }

    return JSON.parse(stored) as CycleProfile
  } catch (_error) {
    return null
  }
}
