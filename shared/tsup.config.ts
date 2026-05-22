import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'enums/exerciseCategory.enum.ts',
    'enums/repsScheme.enum.ts',
    'enums/planStatus.enum.ts',
    'dictionary/apiRoutes.dictionary.ts',
    'types/fitnessProfile/fitnessProfile.schemas.ts',
    'types/trainingPlan/trainingPlan.schemas.ts',
    'types/workoutSession/workoutSession.schemas.ts',
    'functions/progression/progression.rules.ts',
    'functions/progression/progression.types.ts',
    'functions/http/flexApiClient/flexApiClient.types.ts',
    'functions/http/flexApiClient/flexApiClient.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  clean: true
})
