import { StyleProp, ViewStyle } from 'react-native'

export type StatCardProps = {
  label: string
  value: string
  hint?: string
  style?: StyleProp<ViewStyle>
  testID?: string
}
