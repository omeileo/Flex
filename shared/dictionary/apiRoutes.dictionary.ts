export const ApiRoutes = {
  authLogin: '/auth/login',
  authSignUp: '/auth/sign-up',
  authVerifyEmail: '/auth/verify-email',
  authVerifyEmailResend: '/auth/verify-email/resend',
  authForgetPassword: '/auth/forget-password',
  fitnessProfile: '/fitness-profile',
  trainingPlansGenerate: '/training-plans/generate',
  trainingPlansActive: '/training-plans/active',
  applyWeeklyProgression: (planId: string) =>
    `/training-plans/${planId}/apply-weekly-progression`,
  planChanges: (planId: string) => `/training-plans/${planId}/changes`,
  exercises: '/exercises',
  workoutSessions: '/workout-sessions'
} as const
