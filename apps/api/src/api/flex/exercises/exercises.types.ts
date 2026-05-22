import { ExerciseCategory } from '@flex/shared/enums/exerciseCategory.enum'

export type ExerciseListItem = {
  id: number
  name: string
  category: ExerciseCategory
  muscleGroups: string[]
  equipment: string[]
  videoUrl?: string
  contraindications: string[]
}
