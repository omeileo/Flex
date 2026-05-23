import { describe, expect, it } from 'vitest'

import { ApiRoutes } from './apiRoutes.dictionary'

describe('ApiRoutes dictionary', () => {
  it('exposes auth paths', () => {
    expect(ApiRoutes.authLogin).toBe('/auth/login')
    expect(ApiRoutes.authSignUp).toBe('/auth/sign-up')
    expect(ApiRoutes.authVerifyEmail).toBe('/auth/verify-email')
    expect(ApiRoutes.authVerifyEmailResend).toBe('/auth/verify-email/resend')
    expect(ApiRoutes.authForgetPassword).toBe('/auth/forget-password')
  })

  it('exposes stable flex paths', () => {
    expect(ApiRoutes.fitnessProfile).toBe('/fitness-profile')
    expect(ApiRoutes.trainingPlansGenerate).toBe('/training-plans/generate')
    expect(ApiRoutes.trainingPlansActive).toBe('/training-plans/active')
  })

  it('builds plan-scoped progression paths', () => {
    const planId = 'trn_pln_A1B2-C3D4-E5F6-G7H8'

    expect(ApiRoutes.applyWeeklyProgression(planId)).toBe(
      '/training-plans/trn_pln_A1B2-C3D4-E5F6-G7H8/apply-weekly-progression'
    )
    expect(ApiRoutes.planChanges(planId)).toBe('/training-plans/trn_pln_A1B2-C3D4-E5F6-G7H8/changes')
  })
})
