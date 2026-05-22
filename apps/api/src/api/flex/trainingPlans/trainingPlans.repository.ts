import { PlanStatus } from '@flex/shared/enums/planStatus.enum'
import type { ProgressionChange } from '@flex/shared/functions/progression/progression.types'
import type { TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { Prisma, type plan_change_log, type session_sets } from '@prisma/client'

import prisma from '../../../../prisma/prisma.client'

const mapPlanRecordToTrainingPlan = (
  plan: {
    id: number
    user_id: number
    status: string
    week_number: number
    plan_json: Prisma.JsonValue
  }
): TrainingPlan => {
  const planJson = plan.plan_json as TrainingPlan

  return {
    id: plan.id,
    userId: plan.user_id,
    status: plan.status as TrainingPlan['status'],
    weekNumber: plan.week_number,
    workouts: planJson.workouts,
    generatedAt: planJson.generatedAt
  }
}

export const trainingPlansRepository = {
  findActiveByUserId: async (userId: number) => {
    return prisma.training_plans.findFirst({
      where: {
        user_id: userId,
        status: PlanStatus.ACTIVE
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  },

  findByIdForUser: async (planId: number, userId: number) => {
    return prisma.training_plans.findFirst({
      where: {
        id: planId,
        user_id: userId
      }
    })
  },

  createPlan: async (input: {
    userId: number
    fitnessProfileId: number
    plan: Omit<TrainingPlan, 'id' | 'userId'>
  }) => {
    return prisma.$transaction(async (tx) => {
      const createdPlan = await tx.training_plans.create({
        data: {
          user_id: input.userId,
          fitness_profile_id: input.fitnessProfileId,
          status: input.plan.status,
          week_number: input.plan.weekNumber,
          plan_json: input.plan as unknown as Prisma.InputJsonValue,
          generation_changelog: {
            source: 'flex-api-mvp',
            generatedAt: input.plan.generatedAt ?? new Date().toISOString()
          }
        }
      })

      const phase = await tx.plan_phases.create({
        data: {
          training_plan_id: createdPlan.id,
          name: 'Foundation Phase',
          week_start: 1,
          week_end: 4,
          goals: ['Build consistency', 'Learn movement patterns'],
          rpe_range: '6-8',
          rest_defaults: { defaultRestSeconds: 90 }
        }
      })

      const week = await tx.plan_weeks.create({
        data: {
          plan_phase_id: phase.id,
          week_number: input.plan.weekNumber
        }
      })

      for (const workout of input.plan.workouts) {
        const plannedWorkout = await tx.planned_workouts.create({
          data: {
            training_plan_id: createdPlan.id,
            plan_week_id: week.id,
            day_index: workout.dayIndex,
            name: workout.name,
            warmup_notes: ['5 minutes light cardio', 'Dynamic mobility']
          }
        })

        const mainSection = await tx.workout_sections.create({
          data: {
            planned_workout_id: plannedWorkout.id,
            name: 'Main',
            order_index: 0
          }
        })

        for (const exercise of workout.exercises) {
          await tx.planned_exercises.create({
            data: {
              planned_workout_id: plannedWorkout.id,
              workout_section_id: mainSection.id,
              exercise_id: exercise.exerciseId,
              order_index: exercise.orderIndex,
              sets_json: exercise.sets,
              rest_seconds: exercise.restSeconds,
              notes: exercise.notes
            }
          })
        }
      }

      await tx.training_plans.updateMany({
        where: {
          user_id: input.userId,
          status: PlanStatus.ACTIVE,
          id: { not: createdPlan.id }
        },
        data: {
          status: PlanStatus.ARCHIVED,
          updated_at: new Date()
        }
      })

      return mapPlanRecordToTrainingPlan({
        ...createdPlan,
        plan_json: input.plan as unknown as Prisma.JsonValue
      })
    })
  },

  updatePlanProgression: async (input: {
    planId: number
    weekNumber: number
    planJson: TrainingPlan
    changes: ProgressionChange[]
  }) => {
    return prisma.$transaction(async (tx) => {
      await tx.training_plans.update({
        where: { id: input.planId },
        data: {
          week_number: input.weekNumber,
          plan_json: input.planJson as unknown as Prisma.InputJsonValue,
          updated_at: new Date()
        }
      })

      const plannedExercises = await tx.planned_exercises.findMany({
        where: {
          planned_workout: {
            training_plan_id: input.planId
          }
        },
        include: {
          planned_workout: true
        }
      })

      for (const plannedExercise of plannedExercises) {
        const workout = input.planJson.workouts.find(
          (item) => item.dayIndex === plannedExercise.planned_workout.day_index
        )
        const updatedExercise = workout?.exercises.find(
          (item) => item.exerciseId === plannedExercise.exercise_id
        )

        if (!updatedExercise) {
          continue
        }

        await tx.planned_exercises.update({
          where: { id: plannedExercise.id },
          data: {
            sets_json: updatedExercise.sets
          }
        })
      }

      if (input.changes.length > 0) {
        await tx.plan_change_log.createMany({
          data: input.changes.map((change) => ({
            training_plan_id: input.planId,
            exercise_id: change.exerciseId,
            field: change.field,
            previous_value: String(change.previousValue),
            next_value: String(change.nextValue),
            reason: change.reason
          }))
        })
      }
    })
  },

  getPlanChanges: async (planId: number) => {
    return prisma.plan_change_log.findMany({
      where: { training_plan_id: planId },
      orderBy: { created_at: 'desc' }
    })
  },

  getRecentSessionPerformances: async (planId: number, userId: number) => {
    const latestSession = await prisma.workout_sessions.findFirst({
      where: {
        training_plan_id: planId,
        user_id: userId,
        completed_at: { not: null }
      },
      orderBy: { completed_at: 'desc' },
      include: {
        session_sets: true
      }
    })

    if (!latestSession) {
      return []
    }

    return latestSession.session_sets.map((set: session_sets) => ({
      exerciseId: set.exercise_id,
      setNumber: set.set_number,
      repsCompleted: set.reps_completed ?? undefined,
      weightKg: set.weight_kg ?? undefined,
      rpe: set.rpe ?? undefined,
      completed: set.completed
    }))
  }
}
