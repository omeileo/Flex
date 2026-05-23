import type { ReactNode } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

export type ScreenHeaderProps = {
  title: string
  onBack?: () => void
  backLabel?: string
  rightAction?: ReactNode
  style?: StyleProp<ViewStyle>
}
