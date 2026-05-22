import { z } from 'zod'

export const loggedSetSchema = z.object({
  setNumber: z.number().int().positive(),
  repsCompleted: z.number().int().nonnegative().optional(),
  weightKg: z.number().nonnegative().optional(),
  rpe: z.number().min(1).max(10).optional(),
  completed: z.boolean().default(true)
})

export const loggedExerciseSchema = z.object({
  exerciseId: z.number().int().positive(),
  sets: z.array(loggedSetSchema).min(1)
})

export const workoutSessionCreateSchema = z.object({
  trainingPlanId: z.number().int().positive(),
  workoutDayIndex: z.number().int().nonnegative(),
  startedAt: z.string().datetime().optional(),
  exercises: z.array(loggedExerciseSchema).min(1)
})

export const workoutSessionCompleteSchema = z.object({
  completedAt: z.string().datetime().optional(),
  exercises: z.array(loggedExerciseSchema).min(1)
})

export type LoggedSet = z.infer<typeof loggedSetSchema>
export type WorkoutSessionCreate = z.infer<typeof workoutSessionCreateSchema>
