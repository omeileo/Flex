import { getCurrentLoggedInUserOrThrow } from '@/shared/appContext.context'
import { globalErrors } from '@/shared/dictionary/errors.dictionary'
import { applyWeeklyProgression } from '@flex/shared/functions/progression/progression.rules'
import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import type { GeneratePlanRequest, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import type { plan_change_log } from '@prisma/client'

import { exercisesRepository } from '../exercises/exercises.repository'
import { fitnessProfileRepository } from '../fitnessProfile/fitnessProfile.repository'
import { generateTrainingPlanPayload } from './trainingPlans.functions'
import { trainingPlansRepository } from './trainingPlans.repository'
import type { PlanChangeLogEntry } from './trainingPlans.types'
import { validateGeneratedTrainingPlan } from './trainingPlans.validation'

export const trainingPlansService = {
  generateTrainingPlan: async (request?: GeneratePlanRequest): Promise<TrainingPlan> => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const profileRecord = await fitnessProfileRepository.findByUserId(currentUser.userId)

    if (!profileRecord) {
      throw globalErrors.entityNotFound.build('Fitness Profile')
    }

    const profile: FitnessProfile = {
      id: profileRecord.id,
      userId: profileRecord.user_id,
      goal: profileRecord.goal,
      experienceLevel: profileRecord.experience_level as FitnessProfile['experienceLevel'],
      daysPerWeek: profileRecord.days_per_week,
      sessionMinutes: profileRecord.session_minutes,
      equipment: profileRecord.equipment as string[],
      injuries: profileRecord.injuries as string[],
      preferences: (profileRecord.preferences as Record<string, unknown> | null) ?? undefined
    }

    const exercises = (await exercisesRepository.findAll()).map(exercisesRepository.mapExercise)

    if (exercises.length === 0) {
      throw globalErrors.entityNotFound.build('Exercises')
    }

    const generatedPlan = await generateTrainingPlanPayload(profile, exercises, request)
    const validExerciseIds = new Set(exercises.map((exercise) => exercise.id))
    const validatedPlan = validateGeneratedTrainingPlan(generatedPlan, validExerciseIds)

    return trainingPlansRepository.createPlan({
      userId: currentUser.userId,
      fitnessProfileId: profileRecord.id,
      plan: validatedPlan
    })
  },

  getActiveTrainingPlan: async (): Promise<TrainingPlan> => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const activePlan = await trainingPlansRepository.findActiveByUserId(currentUser.userId)

    if (!activePlan) {
      throw globalErrors.entityNotFound.build('Training Plan')
    }

    const planJson = activePlan.plan_json as TrainingPlan

    return {
      id: activePlan.id,
      userId: activePlan.user_id,
      status: activePlan.status as TrainingPlan['status'],
      weekNumber: activePlan.week_number,
      workouts: planJson.workouts,
      generatedAt: planJson.generatedAt
    }
  },

  applyWeeklyProgression: async (planId: string): Promise<TrainingPlan> => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const planRecord = await trainingPlansRepository.findByIdForUser(planId, currentUser.userId)

    if (!planRecord) {
      throw globalErrors.entityNotFound.build('Training Plan', planId)
    }

    const planJson = planRecord.plan_json as TrainingPlan
    const performances = await trainingPlansRepository.getRecentSessionPerformances(planId, currentUser.userId)

    const allExercises = planJson.workouts.flatMap((workout) => workout.exercises)
    const progressionResult = applyWeeklyProgression(
      {
        weekNumber: planRecord.week_number,
        exercises: allExercises
      },
      performances
    )

    const exercisesById = new Map(progressionResult.exercises.map((exercise) => [exercise.exerciseId, exercise]))

    const updatedWorkouts = planJson.workouts.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) => exercisesById.get(exercise.exerciseId) ?? exercise)
    }))

    const nextWeekNumber = planRecord.week_number + 1
    const updatedPlan: TrainingPlan = {
      id: planRecord.id,
      userId: planRecord.user_id,
      status: planRecord.status as TrainingPlan['status'],
      weekNumber: nextWeekNumber,
      workouts: updatedWorkouts,
      generatedAt: planJson.generatedAt
    }

    await trainingPlansRepository.updatePlanProgression({
      planId,
      weekNumber: nextWeekNumber,
      planJson: updatedPlan,
      changes: progressionResult.changes
    })

    return updatedPlan
  },

  getPlanChanges: async (planId: string): Promise<PlanChangeLogEntry[]> => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const planRecord = await trainingPlansRepository.findByIdForUser(planId, currentUser.userId)

    if (!planRecord) {
      throw globalErrors.entityNotFound.build('Training Plan', planId)
    }

    const changes = await trainingPlansRepository.getPlanChanges(planId)

    return changes.map((change: plan_change_log) => ({
      id: change.id,
      exerciseId: change.exercise_id ?? '',
      exerciseName: '',
      field: change.field as PlanChangeLogEntry['field'],
      previousValue: Number(change.previous_value),
      nextValue: Number(change.next_value),
      reason: change.reason,
      createdAt: change.created_at.toISOString()
    }))
  }
}
