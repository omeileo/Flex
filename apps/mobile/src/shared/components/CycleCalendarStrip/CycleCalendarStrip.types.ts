export type CycleCalendarDay = {
  key: string
  label: string
  isPeriodDay?: boolean
  isSelected?: boolean
}

export type CycleCalendarStripProps = {
  days: CycleCalendarDay[]
  onDayPress?: (key: string) => void
}
