import type { FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'

import { fitnessLevelKeys } from './ProfileOnboarding.dictionary'
import { ProfileOnboardingDraft } from './ProfileOnboarding.types'

export const mapOnboardingDraftToProfile = (draft: ProfileOnboardingDraft): FitnessProfileUpsert => {
  const defaultLocation =
    draft.locations.find((location) => location.id === draft.defaultLocationId) ?? draft.locations[0]
  const equipment =
    defaultLocation?.equipment.map((item) => item.predefinedId ?? item.customLabel ?? '').filter(Boolean) ?? []

  return {
    goal: draft.goals.join(', ') || 'General fitness',
    experienceLevel: fitnessLevelKeys[draft.fitnessLevel] ?? 'beginner',
    daysPerWeek: 3,
    sessionMinutes: 45,
    equipment,
    injuries: draft.injuries.filter((injury) => injury !== 'None'),
    preferences: {
      goals: draft.goals,
      injuryState: draft.injuryState,
      restrictions: draft.restrictions,
      diet: draft.diet,
      calorieTarget: draft.calorieTarget || undefined,
      ageBand: draft.ageBand,
      sexAtBirth: draft.sexAtBirth,
      locations: draft.locations,
      defaultLocationId: draft.defaultLocationId
    }
  }
}
