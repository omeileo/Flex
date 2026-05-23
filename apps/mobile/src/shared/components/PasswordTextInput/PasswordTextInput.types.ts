import { StyleProp, TextStyle } from 'react-native'

export type PasswordTextInputProps = {
  value: string
  onChangeText: (value: string) => void
  placeholder?: string
  style?: StyleProp<TextStyle>
  autoComplete?: 'password' | 'new-password'
  editable?: boolean
}
