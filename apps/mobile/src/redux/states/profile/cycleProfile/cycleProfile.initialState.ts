import { CycleProfile } from '@shared/types/cycleProfile.types'

import { DEFAULT_TRACKED_SYMPTOMS } from './cycleProfile.dictionary'

export type CycleProfileState = CycleProfile & {
  hydrated: boolean
}

const cycleProfileInitialState: CycleProfileState = {
  enabled: false,
  lastPeriodStartAt: undefined,
  avgCycleLengthDays: 28,
  avgPeriodLengthDays: 5,
  trackedSymptoms: DEFAULT_TRACKED_SYMPTOMS,
  dataSource: 'manual',
  hydrated: false
}

export default cycleProfileInitialState
