import { describe, expect, it } from 'vitest'

import { ApiRoutes } from './apiRoutes.dictionary'

describe('ApiRoutes dictionary', () => {
  it('exposes auth paths', () => {
    expect(ApiRoutes.authLogin).toBe('/auth/login')
    expect(ApiRoutes.authSignUp).toBe('/auth/sign-up')
    expect(ApiRoutes.authVerifyEmail).toBe('/auth/verify-email')
    expect(ApiRoutes.authVerifyEmailResend).toBe('/auth/verify-email/resend')
  })

  it('exposes stable flex paths', () => {
    expect(ApiRoutes.fitnessProfile).toBe('/fitness-profile')
    expect(ApiRoutes.trainingPlansGenerate).toBe('/training-plans/generate')
    expect(ApiRoutes.trainingPlansActive).toBe('/training-plans/active')
  })

  it('builds plan-scoped progression paths', () => {
    expect(ApiRoutes.applyWeeklyProgression(12)).toBe(
      '/training-plans/12/apply-weekly-progression'
    )
    expect(ApiRoutes.planChanges(12)).toBe('/training-plans/12/changes')
  })
})
