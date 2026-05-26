const urls = {
  auth: {
    login: 'auth/login',
    signUp: 'auth/sign-up',
    verifyEmail: 'auth/verify-email',
    verifyEmailResend: 'auth/verify-email/resend',
    forgetPassword: 'auth/forget-password'
  },
  fitnessProfile: {
    getProfile: 'fitness-profile',
    upsertProfile: 'fitness-profile'
  },
  trainingPlan: {
    generate: 'training-plans/generate',
    active: 'training-plans/active',
    planChanges: 'training-plans/:planId/changes'
  },
  workoutSession: {
    create: 'workout-sessions',
    complete: 'workout-sessions/:sessionId/complete',
    progress: 'workout-sessions/progress'
  }
}

export default urls
