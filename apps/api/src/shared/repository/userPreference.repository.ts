import { user_preferences, users } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { globalErrors } from '../dictionary/errors.dictionary'
import { Preferences } from '../enums/preferences.enum'
import { PrismaTransaction } from '../types/repository.types'

export const userPreferenceRepository = {
  /**
   * Creates a user preference entry for a user.
   *
   * @param userId - The ID of the user.
   * @param preference - The preference to be created.
   * @param transaction - The Prisma transaction (optional, defaults to prisma).
   * @returns A promise that resolves to the created user preference.
   * @throws {globalErrors.criticalSystemEntryNotFound} If the preference item is not found.
   * @throws {globalErrors.entityNotCreated} If the user preference is not created.
   */
  createUserPreference: async (
    userId: users['id'],
    preference: Preferences,
    transaction: PrismaTransaction = prisma
  ): Promise<user_preferences> => {
    const preferenceItem = await transaction.preferences.findFirst({
      where: { name: preference }
    })

    if (!preferenceItem) {
      throw globalErrors.criticalSystemEntryNotFound.build('Preference', preference)
    }

    const userPreference = await transaction.user_preferences.create({
      data: {
        user_id: userId,
        preference_id: preferenceItem.id
      }
    })

    if (!userPreference) {
      throw globalErrors.entityNotCreated.build('User preference', userId)
    }

    return userPreference
  }
}
