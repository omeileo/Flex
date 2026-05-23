import { Prisma } from '@prisma/client'

import prisma from '../../../../prisma/prisma.client'
import { createIdForTable } from '../../../shared/functions/id/createIdForTable.functions'

export const workoutSessionsRepository = {
  createSession: async (input: {
    userId: string
    trainingPlanId: string
    workoutDayIndex: number
    startedAt?: string
    sessionJson: Record<string, unknown>
    exercises: {
      exerciseId: string
      sets: {
        setNumber: number
        repsCompleted?: number
        weightKg?: number
        rpe?: number
        completed: boolean
      }[]
    }[]
  }) => {
    return prisma.$transaction(async (tx) => {
      const session = await tx.workout_sessions.create({
        data: {
          id: createIdForTable('workout_sessions'),
          user_id: input.userId,
          training_plan_id: input.trainingPlanId,
          workout_day_index: input.workoutDayIndex,
          started_at: input.startedAt ? new Date(input.startedAt) : new Date(),
          session_json: input.sessionJson as Prisma.InputJsonValue
        }
      })

      const setRows = input.exercises.flatMap((exercise) =>
        exercise.sets.map((set) => ({
          id: createIdForTable('session_sets'),
          workout_session_id: session.id,
          exercise_id: exercise.exerciseId,
          set_number: set.setNumber,
          reps_completed: set.repsCompleted,
          weight_kg: set.weightKg,
          rpe: set.rpe,
          completed: set.completed
        }))
      )

      if (setRows.length > 0) {
        await tx.session_sets.createMany({ data: setRows })
      }

      return session
    })
  },

  completeSession: async (input: {
    sessionId: string
    userId: string
    completedAt?: string
    exercises: {
      exerciseId: string
      sets: {
        setNumber: number
        repsCompleted?: number
        weightKg?: number
        rpe?: number
        completed: boolean
      }[]
    }[]
  }) => {
    return prisma.$transaction(async (tx) => {
      const session = await tx.workout_sessions.updateMany({
        where: {
          id: input.sessionId,
          user_id: input.userId
        },
        data: {
          completed_at: input.completedAt ? new Date(input.completedAt) : new Date(),
          session_json: {
            exercises: input.exercises,
            completedAt: input.completedAt ?? new Date().toISOString()
          } as Prisma.InputJsonValue
        }
      })

      if (session.count === 0) {
        return null
      }

      await tx.session_sets.deleteMany({
        where: { workout_session_id: input.sessionId }
      })

      const setRows = input.exercises.flatMap((exercise) =>
        exercise.sets.map((set) => ({
          id: createIdForTable('session_sets'),
          workout_session_id: input.sessionId,
          exercise_id: exercise.exerciseId,
          set_number: set.setNumber,
          reps_completed: set.repsCompleted,
          weight_kg: set.weightKg,
          rpe: set.rpe,
          completed: set.completed
        }))
      )

      if (setRows.length > 0) {
        await tx.session_sets.createMany({ data: setRows })
      }

      return tx.workout_sessions.findUnique({
        where: { id: input.sessionId }
      })
    })
  }
}
