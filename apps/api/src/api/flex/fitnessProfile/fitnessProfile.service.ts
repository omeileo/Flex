import { getCurrentLoggedInUserOrThrow } from '@/shared/appContext.context'
import { globalErrors } from '@/shared/dictionary/errors.dictionary'

import { mapFitnessProfileToResponse } from '../flex.mapper'
import { fitnessProfileRepository } from './fitnessProfile.repository'
import { UpsertFitnessProfileRequest } from './fitnessProfile.types'

export const fitnessProfileService = {
  getFitnessProfile: async () => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const profile = await fitnessProfileRepository.findByUserId(currentUser.userId)

    if (!profile) {
      throw globalErrors.entityNotFound.build('Fitness Profile')
    }

    return mapFitnessProfileToResponse(profile)
  },

  upsertFitnessProfile: async (payload: UpsertFitnessProfileRequest) => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    return fitnessProfileRepository.upsertByUserId(currentUser.userId, payload)
  }
}
