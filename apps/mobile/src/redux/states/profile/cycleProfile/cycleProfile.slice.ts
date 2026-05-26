import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CycleProfile } from '@shared/types/cycleProfile.types'

import { loadStoredCycleProfile, persistCycleProfile } from './cycleProfile.functions'
import cycleProfileInitialState from './cycleProfile.initialState'

const cycleProfileSlice = createSlice({
  name: 'profile/cycleProfile',
  initialState: cycleProfileInitialState,
  reducers: {
    hydrateCycleProfile: (state) => {
      const stored = loadStoredCycleProfile()

      if (stored) {
        state.enabled = stored.enabled
        state.lastPeriodStartAt = stored.lastPeriodStartAt
        state.avgCycleLengthDays = stored.avgCycleLengthDays
        state.avgPeriodLengthDays = stored.avgPeriodLengthDays
        state.trackedSymptoms = stored.trackedSymptoms
        state.dataSource = stored.dataSource
      }

      state.hydrated = true
    },
    setCycleEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.enabled = payload
      persistCycleProfile(state)
    },
    updateCycleProfile: (state, { payload }: PayloadAction<Partial<CycleProfile>>) => {
      Object.assign(state, payload)
      persistCycleProfile(state)
    },
    resetCycleData: (state) => {
      state.enabled = false
      state.lastPeriodStartAt = undefined
      state.avgCycleLengthDays = 28
      state.avgPeriodLengthDays = 5
      persistCycleProfile(state)
    },
    setTrackedSymptoms: (state, { payload }: PayloadAction<string[]>) => {
      state.trackedSymptoms = payload
      persistCycleProfile(state)
    }
  }
})

export const { hydrateCycleProfile, setCycleEnabled, updateCycleProfile, resetCycleData, setTrackedSymptoms } =
  cycleProfileSlice.actions

export default cycleProfileSlice.reducer
