import { ApiRoutes } from '@flex/shared/dictionary/apiRoutes.dictionary'
import { describe, expect, it } from 'vitest'

import { TrainingPlansBasePath } from '../trainingPlans/trainingPlans.routes'

describe('Flex API route contract', () => {
  it('matches shared progression paths', () => {
    const planId = 42

    expect(ApiRoutes.applyWeeklyProgression(planId)).toBe(
      `${TrainingPlansBasePath}/${planId}/apply-weekly-progression`
    )
    expect(ApiRoutes.planChanges(planId)).toBe(`${TrainingPlansBasePath}/${planId}/changes`)
  })
})
