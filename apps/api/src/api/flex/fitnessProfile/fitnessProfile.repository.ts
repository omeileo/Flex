import { FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import { Prisma } from '@prisma/client'

import prisma from '../../../../prisma/prisma.client'
import { mapFitnessProfileToResponse } from '../flex.mapper'
import { UpsertFitnessProfileRequest } from './fitnessProfile.types'

export const fitnessProfileRepository = {
  findByUserId: async (userId: number) => {
    return prisma.fitness_profiles.findUnique({
      where: { user_id: userId }
    })
  },

  upsertByUserId: async (userId: number, payload: UpsertFitnessProfileRequest) => {
    const profile = await prisma.fitness_profiles.upsert({
      where: { user_id: userId },
      create: {
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
