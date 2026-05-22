import { globalErrors } from '@/shared/dictionary/errors.dictionary'
import { PlanStatus } from '@flex/shared/enums/planStatus.enum'
import { type TrainingPlan, trainingPlanSchema } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { z } from 'zod'

const generatedTrainingPlanSchema = trainingPlanSchema.omit({ id: true, userId: true }).extend({
  status: z.nativeEnum(PlanStatus).default(PlanStatus.ACTIVE)
})

export const validateGeneratedTrainingPlan = (
  plan: Omit<TrainingPlan, 'id' | 'userId'>,
  validExerciseIds: Set<number>
): Omit<TrainingPlan, 'id' | 'userId'> => {
  const parsed = generatedTrainingPlanSchema.safeParse(plan)

  if (!parsed.success) {
    throw globalErrors.entityNotCreated.build('Training Plan')
  }

  for (const workout of parsed.data.workouts) {
    for (const exercise of workout.exercises) {
      if (!validExerciseIds.has(exercise.exerciseId)) {
        throw globalErrors.entityNotCreated.build('Training Plan')
      }
    }
  }

  return parsed.data
}
