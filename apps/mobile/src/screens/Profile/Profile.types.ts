import { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'

export interface ProfileComponentProps {
  profile: FitnessProfile | null
  isLoading: boolean
  error: string | null
  onRefresh: () => void
}
