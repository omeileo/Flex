import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions'
import { getPlanChangesApi } from './getPlanChanges.api'
import getPlanChangesInitialState from './getPlanChanges.initialState'

export const getPlanChanges = createAsyncThunk(
  'trainingPlan/getPlanChanges',
  async (planId: string, { rejectWithValue }) => {
    try {
      const response = await getPlanChangesApi(planId)

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

const getPlanChangesSlice = createSlice({
  name: 'trainingPlan/getPlanChanges',
  initialState: getPlanChangesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlanChanges.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPlanChanges.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        state.error = null
      })
      .addCase(getPlanChanges.rejected, (state, { payload }) => {
        state.loading = false
        state.success = null
        state.error = (payload as { message?: string })?.message ?? 'Request failed'
      })
  }
})

export const { actions: getPlanChangesActions, reducer: getPlanChangesReducer } = getPlanChangesSlice
export default getPlanChangesSlice.reducer
