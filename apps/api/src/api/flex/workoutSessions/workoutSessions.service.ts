import { getCurrentLoggedInUserOrThrow } from '@/shared/appContext.context'
import { globalErrors } from '@/shared/dictionary/errors.dictionary'
import { computeProgressMetrics } from '@flex/shared/functions/progress/progress.metrics'

import { trainingPlansRepository } from '../trainingPlans/trainingPlans.repository'
import { workoutSessionsRepository } from './workoutSessions.repository'
import type { CompleteWorkoutSessionRequest, CreateWorkoutSessionRequest } from './workoutSessions.types'

export const workoutSessionsService = {
  createWorkoutSession: async (payload: CreateWorkoutSessionRequest) => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const plan = await trainingPlansRepository.findByIdForUser(payload.trainingPlanId, currentUser.userId)

    if (!plan) {
      throw globalErrors.entityNotFound.build('Training Plan', payload.trainingPlanId)
    }

    const session = await workoutSessionsRepository.createSession({
      userId: currentUser.userId,
      trainingPlanId: payload.trainingPlanId,
      workoutDayIndex: payload.workoutDayIndex,
      startedAt: payload.startedAt,
      sessionJson: {
        exercises: payload.exercises,
        startedAt: payload.startedAt ?? new Date().toISOString()
      },
      exercises: payload.exercises
    })

    return {
      id: session.id,
      trainingPlanId: session.training_plan_id,
      workoutDayIndex: session.workout_day_index,
      startedAt: session.started_at.toISOString()
    }
  },

  completeWorkoutSession: async (sessionId: string, payload: CompleteWorkoutSessionRequest) => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    const session = await workoutSessionsRepository.completeSession({
      sessionId,
      userId: currentUser.userId,
      completedAt: payload.completedAt,
      exercises: payload.exercises
    })

    if (!session) {
      throw globalErrors.entityNotFound.build('Workout Session', sessionId)
    }

    return {
      id: session.id,
      trainingPlanId: session.training_plan_id,
      workoutDayIndex: session.workout_day_index,
      startedAt: session.started_at.toISOString(),
      completedAt: session.completed_at?.toISOString()
    }
  },

  getProgressMetrics: async () => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const sessions = await workoutSessionsRepository.findCompletedSessionsForUser(currentUser.userId)

    return computeProgressMetrics(
      sessions.map((session) => ({
        id: session.id,
        completedAt: session.completed_at?.toISOString() ?? session.started_at.toISOString(),
        sets: session.session_sets.map((set) => ({
          exerciseId: set.exercise_id,
          setNumber: set.set_number,
          repsCompleted: set.reps_completed,
          weightKg: set.weight_kg,
          completed: set.completed
        }))
      }))
    )
  }
}
