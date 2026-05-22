import { exercisesRepository } from './exercises.repository'

export const exercisesService = {
  listExercises: async () => {
    const exercises = await exercisesRepository.findAll()

    return exercises.map(exercisesRepository.mapExercise)
  }
}
