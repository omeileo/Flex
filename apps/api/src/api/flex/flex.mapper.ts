import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import type { fitness_profiles } from '@prisma/client'

export const mapFitnessProfileToResponse = (profile: fitness_profiles): FitnessProfile => ({
  id: profile.id,
  userId: profile.user_id,
  goal: profile.goal,
  experienceLevel: profile.experience_level as FitnessProfile['experienceLevel'],
  daysPerWeek: profile.days_per_week,
  sessionMinutes: profile.session_minutes,
  equipment: profile.equipment as string[],
  injuries: profile.injuries as string[],
  preferences: (profile.preferences as Record<string, unknown> | null) ?? undefined
})
