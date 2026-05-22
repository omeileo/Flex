export const ApiRoutes = {
  authLogin: '/auth/login',
  authSignUp: '/auth/sign-up',
  authVerifyEmail: '/auth/verify-email',
  authVerifyEmailResend: '/auth/verify-email/resend',
  fitnessProfile: '/fitness-profile',
  trainingPlansGenerate: '/training-plans/generate',
  trainingPlansActive: '/training-plans/active',
  applyWeeklyProgression: (planId: number) =>
    `/training-plans/${planId}/apply-weekly-progression`,
  planChanges: (planId: number) => `/training-plans/${planId}/changes`,
  exercises: '/exercises',
  workoutSessions: '/workout-sessions'
} as const
