import type { ReactNode } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

export type BottomSheetVariant = 'sheet' | 'centered'

export type BottomSheetProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
  variant?: BottomSheetVariant
  showHandle?: boolean
  contentStyle?: StyleProp<ViewStyle>
  testID?: string
}
