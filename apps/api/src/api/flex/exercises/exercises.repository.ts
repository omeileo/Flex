import prisma from '../../../../prisma/prisma.client'
import { ExerciseCategory } from '@flex/shared/enums/exerciseCategory.enum'
import type { exercises } from '@prisma/client'

import type { ExerciseListItem } from './exercises.types'

const mapExercise = (exercise: exercises): ExerciseListItem => ({
  id: exercise.id,
  name: exercise.name,
  category: exercise.category as ExerciseCategory,
  muscleGroups: exercise.muscle_groups as string[],
  equipment: exercise.equipment as string[],
  videoUrl: exercise.video_url ?? undefined,
  contraindications: exercise.contraindications as string[]
})

export const exercisesRepository = {
  findAll: async () => {
    return prisma.exercises.findMany({
      orderBy: { name: 'asc' }
    })
  },

  findByIds: async (ids: number[]) => {
    return prisma.exercises.findMany({
      where: {
        id: { in: ids }
      }
    })
  },

  mapExercise
}
