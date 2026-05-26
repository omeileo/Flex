import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions'
import { getProgressMetricsApi } from './getProgressMetrics.api'
import getProgressMetricsInitialState from './getProgressMetrics.initialState'

export const getProgressMetrics = createAsyncThunk(
  'workoutSession/getProgressMetrics',
  async (_request: void, { rejectWithValue }) => {
    try {
      const response = await getProgressMetricsApi()

      return response.data
    } catch (error) {
      errorHandler.handleApiError(error as never)

      const serialized = serializeError(error) as { message?: string; userFriendlyMessage?: string }

      return rejectWithValue({
        message: serialized.userFriendlyMessage ?? serialized.message ?? 'Request failed'
      })
    }
  }
)

const getProgressMetricsSlice = createSlice({
  name: 'workoutSession/getProgressMetrics',
  initialState: getProgressMetricsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProgressMetrics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProgressMetrics.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        state.error = null
      })
      .addCase(getProgressMetrics.rejected, (state, { payload }) => {
        state.loading = false
        state.success = null
        state.error = (payload as { message?: string })?.message ?? 'Request failed'
      })
  }
})

export const { actions: getProgressMetricsActions, reducer: getProgressMetricsReducer } = getProgressMetricsSlice
export default getProgressMetricsSlice.reducer
