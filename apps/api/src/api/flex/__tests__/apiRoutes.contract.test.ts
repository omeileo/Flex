import { ApiRoutes } from '@flex/shared/dictionary/apiRoutes.dictionary'
import { describe, expect, it } from 'vitest'

import { TrainingPlansBasePath } from '../trainingPlans/trainingPlans.routes'

describe('Flex API route contract', () => {
  it('matches shared progression paths', () => {
    const planId = 'trn_pln_A1B2-C3D4-E5F6-G7H8'

    expect(ApiRoutes.applyWeeklyProgression(planId)).toBe(`${TrainingPlansBasePath}/${planId}/apply-weekly-progression`)
    expect(ApiRoutes.planChanges(planId)).toBe(`${TrainingPlansBasePath}/${planId}/changes`)
  })

  it('matches shared workout session progress path', () => {
    expect(ApiRoutes.workoutSessionProgress).toBe('/workout-sessions/progress')
  })
})
