import { StyleProp, ViewStyle } from 'react-native'

export type ProgressBarChartDatum = {
  id?: string
  label: string
  value: number
}

export type ProgressBarChartProps = {
  data: ProgressBarChartDatum[]
  maxValue?: number
  footnote?: string
  style?: StyleProp<ViewStyle>
  testID?: string
}
