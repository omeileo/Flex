import * as yup from 'yup'

export const profileOnboardingSchema = yup.object({
  goal: yup.string().required('profileOnboarding.validation.goalRequired'),
  experienceLevel: yup
    .mixed<'beginner' | 'intermediate' | 'advanced'>()
    .oneOf(['beginner', 'intermediate', 'advanced'])
    .required('profileOnboarding.validation.experienceRequired'),
  daysPerWeek: yup.number().min(1).max(7).required('profileOnboarding.validation.daysRequired'),
  sessionMinutes: yup.number().min(15).max(180).required('profileOnboarding.validation.minutesRequired'),
  equipment: yup.array().of(yup.string()).default([]),
  injuries: yup.array().of(yup.string()).default([])
})
