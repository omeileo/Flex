import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EquipmentItem } from '@shared/types/workoutEquipment.types'

import { loadStoredWorkoutLocations, persistWorkoutLocations, sortLocations } from './workoutLocations.functions'
import workoutLocationsInitialState from './workoutLocations.initialState'
import { UpsertLocationPayload } from './workoutLocations.types'

const workoutLocationsSlice = createSlice({
  name: 'profile/workoutLocations',
  initialState: workoutLocationsInitialState,
  reducers: {
    hydrateWorkoutLocations: (state) => {
      const stored = loadStoredWorkoutLocations()

      if (stored) {
        state.locations = sortLocations(stored.locations)
        state.activeLocationId = stored.activeLocationId
      }

      state.hydrated = true
    },
    addLocation: (state, { payload }: PayloadAction<UpsertLocationPayload>) => {
      const id = payload.id ?? `loc-${Date.now()}`
      const isFirst = state.locations.length === 0

      state.locations = sortLocations([
        ...state.locations,
        {
          id,
          name: payload.name,
          notes: payload.notes,
          presetType: payload.presetType,
          isDefault: payload.isDefault ?? isFirst,
          equipment: payload.equipment ?? []
        }
      ])
      state.activeLocationId = id
      persistWorkoutLocations(state)
    },
    updateLocation: (
      state,
      {
        payload
      }: PayloadAction<{ id: string; name?: string; notes?: string; presetType?: UpsertLocationPayload['presetType'] }>
    ) => {
      state.locations = sortLocations(
        state.locations.map((location) =>
          location.id === payload.id
            ? {
                ...location,
                name: payload.name ?? location.name,
                notes: payload.notes ?? location.notes,
                presetType: payload.presetType ?? location.presetType
              }
            : location
        )
      )
      persistWorkoutLocations(state)
    },
    setLocationEquipment: (state, { payload }: PayloadAction<{ id: string; equipment: EquipmentItem[] }>) => {
      state.locations = sortLocations(
        state.locations.map((location) =>
          location.id === payload.id ? { ...location, equipment: payload.equipment } : location
        )
      )
      persistWorkoutLocations(state)
    },
    setDefaultLocation: (state, { payload }: PayloadAction<string>) => {
      state.locations = sortLocations(
        state.locations.map((location) => ({
          ...location,
          isDefault: location.id === payload
        }))
      )
      state.activeLocationId = payload
      persistWorkoutLocations(state)
    },
    deleteLocation: (state, { payload }: PayloadAction<string>) => {
      if (state.locations.length <= 1) {
        return
      }

      const target = state.locations.find((location) => location.id === payload)

      if (!target) {
        return
      }

      const remaining = state.locations.filter((location) => location.id !== payload)

      if (target.isDefault && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isDefault: true }
      }

      state.locations = sortLocations(remaining)
      state.activeLocationId = state.locations.find((location) => location.isDefault)?.id ?? remaining[0]?.id ?? null
      persistWorkoutLocations(state)
    },
    setActiveLocationId: (state, { payload }: PayloadAction<string>) => {
      state.activeLocationId = payload
      persistWorkoutLocations(state)
    }
  }
})

export const {
  hydrateWorkoutLocations,
  addLocation,
  updateLocation,
  setLocationEquipment,
  setDefaultLocation,
  deleteLocation,
  setActiveLocationId
} = workoutLocationsSlice.actions

export default workoutLocationsSlice.reducer
