import { ReactNode } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

export interface AuthScreenShellProps {
  children: ReactNode
  testID?: string
  contentStyle?: StyleProp<ViewStyle>
  variant?: 'form' | 'hero'
}
