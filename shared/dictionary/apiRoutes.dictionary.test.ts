import { describe, expect, it } from 'vitest'

import { ApiRoutes } from './apiRoutes.dictionary'

describe('ApiRoutes dictionary', () => {
  it('exposes stable flex paths', () => {
    expect(ApiRoutes.fitnessProfile).toBe('/fitness-profile')
    expect(ApiRoutes.trainingPlansGenerate).toBe('/training-plans/generate')
    expect(ApiRoutes.trainingPlansActive).toBe('/training-plans/active')
  })
})
