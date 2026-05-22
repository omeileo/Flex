import { z } from 'zod'

import { PlanStatus } from '../../enums/planStatus.enum'
import { RepsScheme } from '../../enums/repsScheme.enum'

export const plannedSetSchema = z.object({
  setNumber: z.number().int().positive(),
  targetReps: z.number().int().positive().optional(),
  targetWeightKg: z.number().positive().optional(),
  targetRpe: z.number().min(1).max(10).optional(),
  targetSeconds: z.number().int().positive().optional(),
  repsScheme: z.nativeEnum(RepsScheme).default(RepsScheme.STRAIGHT)
})

export const plannedExerciseSchema = z.object({
  exerciseId: z.number().int().positive(),
  exerciseName: z.string(),
  orderIndex: z.number().int().nonnegative(),
  sets: z.array(plannedSetSchema).min(1),
  restSeconds: z.number().int().nonnegative().default(90),
  notes: z.string().optional()
})

export const plannedWorkoutSchema = z.object({
  dayIndex: z.number().int().nonnegative(),
  name: z.string(),
  exercises: z.array(plannedExerciseSchema).min(1)
})

export const trainingPlanSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  status: z.nativeEnum(PlanStatus),
  weekNumber: z.number().int().positive().default(1),
  workouts: z.array(plannedWorkoutSchema).min(1),
  generatedAt: z.string().datetime().optional()
})

export const generatePlanRequestSchema = z.object({
  profileOverride: z
    .object({
      goal: z.string().optional(),
      daysPerWeek: z.number().int().min(1).max(7).optional()
    })
    .optional()
})

export type PlannedSet = z.infer<typeof plannedSetSchema>
export type PlannedExercise = z.infer<typeof plannedExerciseSchema>
export type PlannedWorkout = z.infer<typeof plannedWorkoutSchema>
export type TrainingPlan = z.infer<typeof trainingPlanSchema>
export type GeneratePlanRequest = z.infer<typeof generatePlanRequestSchema>
