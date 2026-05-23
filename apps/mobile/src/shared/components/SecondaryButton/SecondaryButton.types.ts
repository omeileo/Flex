import { StyleProp, ViewStyle } from 'react-native'

export type SecondaryButtonVariant = 'secondary' | 'destructive'

export type SecondaryButtonProps = {
  label: string
  onPress: () => void
  disabled?: boolean
  variant?: SecondaryButtonVariant
  style?: StyleProp<ViewStyle>
}
