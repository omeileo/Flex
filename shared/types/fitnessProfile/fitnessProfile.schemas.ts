import { z } from 'zod'

export const fitnessProfileSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  userId: z.string().min(1).max(64).optional(),
  goal: z.string().min(1),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  daysPerWeek: z.number().int().min(1).max(7),
  sessionMinutes: z.number().int().min(15).max(180),
  equipment: z.array(z.string()).default([]),
  injuries: z.array(z.string()).default([]),
  preferences: z.record(z.unknown()).optional()
})

export const fitnessProfileUpsertSchema = fitnessProfileSchema.omit({
  id: true,
  userId: true
})

export type FitnessProfile = z.infer<typeof fitnessProfileSchema>
export type FitnessProfileUpsert = z.infer<typeof fitnessProfileUpsertSchema>
