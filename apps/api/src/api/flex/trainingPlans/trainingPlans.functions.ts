import { logger } from '@/app'
import { aiClient } from '@/shared/functions/ai/ai.client'
import { env } from '@/shared/functions/envConfig'
import { PlanStatus } from '@flex/shared/enums/planStatus.enum'
import { RepsScheme } from '@flex/shared/enums/repsScheme.enum'
import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import type {
  GeneratePlanRequest,
  PlannedExercise,
  PlannedWorkout,
  TrainingPlan
} from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

import type { ExerciseListItem } from '../exercises/exercises.types'

const WORKOUT_NAMES = [
  'Push Focus',
  'Pull Focus',
  'Legs Focus',
  'Full Body',
  'Upper Body',
  'Lower Body',
  'Conditioning'
]

export const hasConfiguredOpenAiKey = (): boolean => {
  const key = env.OPENAI_API_KEY?.trim()

  return Boolean(key)
}

const defaultSetsForExperience = (experienceLevel: FitnessProfile['experienceLevel']) => {
  if (experienceLevel === 'advanced') {
    return 4
  }

  if (experienceLevel === 'intermediate') {
    return 3
  }

  return 3
}

const defaultRepsForExperience = (experienceLevel: FitnessProfile['experienceLevel']) => {
  if (experienceLevel === 'advanced') {
    return 6
  }

  if (experienceLevel === 'intermediate') {
    return 8
  }

  return 10
}

const buildPlannedExercise = (
  exercise: ExerciseListItem,
  orderIndex: number,
  experienceLevel: FitnessProfile['experienceLevel']
): PlannedExercise => {
  const setCount = defaultSetsForExperience(experienceLevel)
  const targetReps = defaultRepsForExperience(experienceLevel)

  return {
    exerciseId: exercise.id,
    exerciseName: exercise.name,
    orderIndex,
    restSeconds: 90,
    sets: Array.from({ length: setCount }, (_, index) => ({
      setNumber: index + 1,
      targetReps,
      repsScheme: RepsScheme.STRAIGHT
    }))
  }
}

export const buildDeterministicTrainingPlan = (
  profile: FitnessProfile,
  exercises: ExerciseListItem[],
  request?: GeneratePlanRequest
): Omit<TrainingPlan, 'id' | 'userId'> => {
  const daysPerWeek = request?.profileOverride?.daysPerWeek ?? profile.daysPerWeek
  const selectedExercises = exercises.slice(0, Math.max(daysPerWeek * 4, 4))

  const workouts: PlannedWorkout[] = Array.from({ length: daysPerWeek }, (_, dayIndex) => {
    const sliceStart = (dayIndex * 4) % selectedExercises.length
    const workoutExercises = Array.from({ length: Math.min(4, selectedExercises.length) }, (_, offset) => {
      const exercise = selectedExercises[(sliceStart + offset) % selectedExercises.length]

      return buildPlannedExercise(exercise, offset, profile.experienceLevel)
    })

    return {
      dayIndex,
      name: WORKOUT_NAMES[dayIndex % WORKOUT_NAMES.length],
      exercises: workoutExercises
    }
  })

  return {
    status: PlanStatus.ACTIVE,
    weekNumber: 1,
    workouts,
    generatedAt: new Date().toISOString()
  }
}

export const generateTrainingPlanWithAi = async (
  profile: FitnessProfile,
  exercises: ExerciseListItem[],
  request?: GeneratePlanRequest
): Promise<Omit<TrainingPlan, 'id' | 'userId'>> => {
  try {
    const exerciseCatalog = exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      category: exercise.category,
      equipment: exercise.equipment
    }))

    const response = await aiClient.complete({
      responseFormat: 'json',
      temperature: 0.4,
      maxTokens: 4000,
      messages: [
        {
          role: 'system',
          content:
            'You are a strength coach. Return JSON only with shape {"status":"active","weekNumber":1,"workouts":[{"dayIndex":0,"name":"...","exercises":[{"exerciseId":"exr_XXXX-XXXX-XXXX-XXXX","exerciseName":"...","orderIndex":0,"restSeconds":90,"sets":[{"setNumber":1,"targetReps":8,"repsScheme":"straight"}]}]}],"generatedAt":"ISO-8601"}. Use only exercise ids from the catalog.'
        },
        {
          role: 'user',
          content: JSON.stringify({
            profile,
            profileOverride: request?.profileOverride,
            exerciseCatalog
          })
        }
      ]
    })

    const parsed = JSON.parse(response.content) as Omit<TrainingPlan, 'id' | 'userId'>

    return {
      status: PlanStatus.ACTIVE,
      weekNumber: parsed.weekNumber ?? 1,
      workouts: parsed.workouts,
      generatedAt: parsed.generatedAt ?? new Date().toISOString()
    }
  } catch (error) {
    logger.error('AI training plan generation failed, falling back to deterministic plan', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return buildDeterministicTrainingPlan(profile, exercises, request)
  }
}

export const generateTrainingPlanPayload = async (
  profile: FitnessProfile,
  exercises: ExerciseListItem[],
  request?: GeneratePlanRequest
): Promise<Omit<TrainingPlan, 'id' | 'userId'>> => {
  if (hasConfiguredOpenAiKey()) {
    return generateTrainingPlanWithAi(profile, exercises, request)
  }

  return buildDeterministicTrainingPlan(profile, exercises, request)
}
