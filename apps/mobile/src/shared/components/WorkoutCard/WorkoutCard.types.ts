import { StyleProp, ViewStyle } from 'react-native'

import { WorkoutModality } from '@shared/types/workoutModality.types'

export type WorkoutCardProps = {
  title: string
  durationMinutes?: number
  dateLabel?: string
  modality: WorkoutModality
  completed?: boolean
  onPress?: () => void
  onToggleComplete?: () => void
  style?: StyleProp<ViewStyle>
}
