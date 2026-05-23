import { FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import { Prisma } from '@prisma/client'

import prisma from '../../../../prisma/prisma.client'
import { createIdForTable } from '../../../shared/functions/id/createIdForTable.functions'
import { mapFitnessProfileToResponse } from '../flex.mapper'
import { UpsertFitnessProfileRequest } from './fitnessProfile.types'

export const fitnessProfileRepository = {
  findByUserId: async (userId: string) => {
    return prisma.fitness_profiles.findUnique({
      where: { user_id: userId }
    })
  },

  upsertByUserId: async (userId: string, payload: UpsertFitnessProfileRequest) => {
    const profile = await prisma.fitness_profiles.upsert({
      where: { user_id: userId },
      create: {
        id: createIdForTable('fitness_profiles'),
        user_id: userId,
        goal: payload.goal,
        experience_level: payload.experienceLevel,
        days_per_week: payload.daysPerWeek,
        session_minutes: payload.sessionMinutes,
        equipment: payload.equipment,
        injuries: payload.injuries,
        preferences: (payload.preferences ?? undefined) as Prisma.InputJsonValue | undefined
      },
      update: {
        goal: payload.goal,
        experience_level: payload.experienceLevel,
        days_per_week: payload.daysPerWeek,
        session_minutes: payload.sessionMinutes,
        equipment: payload.equipment,
        injuries: payload.injuries,
        preferences: (payload.preferences ?? undefined) as Prisma.InputJsonValue | undefined,
        updated_at: new Date()
      }
    })

    return mapFitnessProfileToResponse(profile)
  }
}
