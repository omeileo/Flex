import { FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'

export type ProfileOnboardingFormValues = FitnessProfileUpsert

export interface ProfileOnboardingComponentProps {
  isSubmitting: boolean
  error: string | null
  onSubmit: (values: ProfileOnboardingFormValues) => void
}
