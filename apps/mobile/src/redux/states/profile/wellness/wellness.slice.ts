import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { WellnessCondition } from '@shared/types/wellness.types'

import { loadStoredWellness, persistWellness } from './wellness.functions'
import wellnessInitialState from './wellness.initialState'

const wellnessSlice = createSlice({
  name: 'profile/wellness',
  initialState: wellnessInitialState,
  reducers: {
    hydrateWellness: (state) => {
      const stored = loadStoredWellness()

      if (stored) {
        state.conditions = stored.conditions
        state.excludedExerciseIds = stored.excludedExerciseIds
      }

      state.hydrated = true
    },
    upsertCondition: (state, { payload }: PayloadAction<WellnessCondition>) => {
      const existingIndex = state.conditions.findIndex((condition) => condition.id === payload.id)

      if (existingIndex >= 0) {
        state.conditions[existingIndex] = payload
      } else {
        state.conditions.push(payload)
      }

      persistWellness(state)
    },
    removeCondition: (state, { payload }: PayloadAction<string>) => {
      state.conditions = state.conditions.filter((condition) => condition.id !== payload)
      persistWellness(state)
    },
    setExcludedExerciseIds: (state, { payload }: PayloadAction<string[]>) => {
      state.excludedExerciseIds = payload
      persistWellness(state)
    },
    toggleExcludedExercise: (state, { payload }: PayloadAction<string>) => {
      if (state.excludedExerciseIds.includes(payload)) {
        state.excludedExerciseIds = state.excludedExerciseIds.filter((id) => id !== payload)
      } else {
        state.excludedExerciseIds = [...state.excludedExerciseIds, payload]
      }

      persistWellness(state)
    }
  }
})

export const { hydrateWellness, upsertCondition, removeCondition, setExcludedExerciseIds, toggleExcludedExercise } =
  wellnessSlice.actions

export default wellnessSlice.reducer
