export type CyclePhase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal'

export type CycleEnergy = 'low' | 'normal' | 'high'

export type CycleFlow = 'spotting' | 'light' | 'medium' | 'heavy'

export type CycleProfile = {
  enabled: boolean
  lastPeriodStartAt?: string
  avgCycleLengthDays: number
  avgPeriodLengthDays: number
  trackedSymptoms: string[]
  dataSource: 'manual'
}

export type ComputedCycleState = {
  phase: CyclePhase
  cycleDay: number
  daysUntilPeriod?: number
}

export type CycleDailyLog = {
  date: string
  energy: CycleEnergy
  flow?: CycleFlow
  symptoms: string[]
}
