import { user_profiles } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { PrismaTransaction } from '../types/repository.types'

export const userProfileRepository = {
  /**
   * Creates a user profile entry for a user.
   *
   * @param userId - The ID of the user.
   * @param firstName - The first name of the user profile.
   * @param lastName - The last name of the user profile.
   * @param transaction - The Prisma transaction object (optional).
   * @returns A Promise that resolves to the created user profile.
   */
  create: async (
    firstName: user_profiles['first_name'],
    lastName: user_profiles['last_name'],
    transaction: PrismaTransaction = prisma
  ): Promise<user_profiles | null> => {
    return await transaction.user_profiles.create({
      data: {
        first_name: firstName,
        last_name: lastName
      }
    })
  }
}
