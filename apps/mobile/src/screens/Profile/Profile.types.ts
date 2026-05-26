import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '@router/navigators/ProfileStack.types'

export type ProfileNavigation = NativeStackNavigationProp<ProfileStackParamList>

export type ProfileComponentProps = {
  displayName: string
  initials: string
  memberSince: string
  goalsPreview: string
  gymPreview: string
  wellnessPreview: string
  cyclePreview: string
  excludedPreview: string
  dietPreview: string
  agePreview: string
  themePreview: string
  themeMode: 'light' | 'dark' | 'pink'
  isLoading: boolean
  error: string | null
  profile: FitnessProfile | null
  onRefresh: () => void
  onNavigateGoals: () => void
  onNavigateGymLocations: () => void
  onNavigateWellness: () => void
  onNavigateCycle: () => void
  onNavigateExcluded: () => void
  onNavigateAppearance: () => void
}
