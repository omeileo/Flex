import { Express } from 'express'

import { exercisesRouter } from '../flex/exercises/exercises.controller'
import { ExercisesBasePath } from '../flex/exercises/exercises.routes'
import { fitnessProfileRouter } from '../flex/fitnessProfile/fitnessProfile.controller'
import { FitnessProfileBasePath } from '../flex/fitnessProfile/fitnessProfile.routes'
import { trainingPlansRouter } from '../flex/trainingPlans/trainingPlans.controller'
import { TrainingPlansBasePath } from '../flex/trainingPlans/trainingPlans.routes'
import { workoutSessionsRouter } from '../flex/workoutSessions/workoutSessions.controller'
import { WorkoutSessionsBasePath } from '../flex/workoutSessions/workoutSessions.routes'
import { withBasePath } from './registerRoutes.functions'

export const registerFlexRoutes = (app: Express): void => {
  app.use(withBasePath(FitnessProfileBasePath), fitnessProfileRouter)
  app.use(withBasePath(TrainingPlansBasePath), trainingPlansRouter)
  app.use(withBasePath(ExercisesBasePath), exercisesRouter)
  app.use(withBasePath(WorkoutSessionsBasePath), workoutSessionsRouter)
}
