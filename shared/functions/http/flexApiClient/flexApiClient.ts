import { ApiRoutes } from '../../../dictionary/apiRoutes.dictionary'
import type { FitnessProfileUpsert } from '../../../types/fitnessProfile/fitnessProfile.schemas'
import type { GeneratePlanRequest } from '../../../types/trainingPlan/trainingPlan.schemas'
import type { WorkoutSessionCreate } from '../../../types/workoutSession/workoutSession.schemas'
import type { z } from 'zod'
import { workoutSessionCompleteSchema } from '../../../types/workoutSession/workoutSession.schemas'

type WorkoutSessionComplete = z.infer<typeof workoutSessionCompleteSchema>

import type { FlexApiClientConfig, FlexApiRequestOptions } from './flexApiClient.types'

export const createFlexApiClient = (config: FlexApiClientConfig) => {
  const request = async <T>(path: string, options: FlexApiRequestOptions = {}): Promise<T> => {
    const token = config.getToken ? await config.getToken() : null
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${config.baseUrl}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    })

    if (response.status === 401 && config.onUnauthorized) {
      config.onUnauthorized()
    }

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Flex API ${response.status}: ${errorBody}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json() as Promise<T>
  }

  return {
    getFitnessProfile: () => request(ApiRoutes.fitnessProfile),
    upsertFitnessProfile: (body: FitnessProfileUpsert) =>
      request(ApiRoutes.fitnessProfile, { method: 'PUT', body }),
    generateTrainingPlan: (body?: GeneratePlanRequest) =>
      request(ApiRoutes.trainingPlansGenerate, { method: 'POST', body: body ?? {} }),
    getActiveTrainingPlan: () => request(ApiRoutes.trainingPlansActive),
    applyWeeklyProgression: () =>
      request(ApiRoutes.applyWeeklyProgression, { method: 'POST' }),
    getPlanChanges: () => request(ApiRoutes.planChanges),
    listExercises: () => request(ApiRoutes.exercises),
    createWorkoutSession: (body: WorkoutSessionCreate) =>
      request(ApiRoutes.workoutSessions, { method: 'POST', body }),
    completeWorkoutSession: (id: number, body: WorkoutSessionComplete) =>
      request(`${ApiRoutes.workoutSessions}/${id}/complete`, { method: 'POST', body })
  }
}

export type FlexApiClient = ReturnType<typeof createFlexApiClient>
