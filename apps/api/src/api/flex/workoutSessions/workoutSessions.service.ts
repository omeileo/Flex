import { getCurrentLoggedInUserOrThrow } from '@/shared/appContext.context'
import { globalErrors } from '@/shared/dictionary/errors.dictionary'

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
  }
}
