import type { WorkoutSessionCreate } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions'
import { createWorkoutSessionApi } from './createWorkoutSession.api'
import createWorkoutSessionInitialState from './createWorkoutSession.initialState'

export const createWorkoutSession = createAsyncThunk(
  'workoutSession/createWorkoutSession',
  async (request: WorkoutSessionCreate, { rejectWithValue }) => {
    try {
      const response = await createWorkoutSessionApi(request)

      return response.data
    } catch (error) {
      errorHandler.handleApiError(error as never)

      const serialized = serializeError(error) as { message?: string }

      return rejectWithValue({
        message: serialized.message ?? 'Request failed'
      })
    }
  }
)

const createWorkoutSessionSlice = createSlice({
  name: 'workoutSession/createWorkoutSession',
  initialState: createWorkoutSessionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWorkoutSession.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createWorkoutSession.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        state.error = null
      })
      .addCase(createWorkoutSession.rejected, (state, { payload }) => {
        state.loading = false
        state.success = null
        state.error = (payload as { message?: string })?.message ?? 'Request failed'
      })
  }
})

export const { actions: createWorkoutSessionActions, reducer: createWorkoutSessionReducer } = createWorkoutSessionSlice
export default createWorkoutSessionSlice.reducer
