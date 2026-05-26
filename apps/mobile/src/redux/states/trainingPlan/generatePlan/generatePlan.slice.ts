import type { GeneratePlanRequest } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions'
import { generatePlanApi } from './generatePlan.api'
import generatePlanInitialState from './generatePlan.initialState'

export const generatePlan = createAsyncThunk(
  'trainingPlan/generatePlan',
  async (request: GeneratePlanRequest | void, { rejectWithValue }) => {
    try {
      const response = await generatePlanApi(request ?? undefined)

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

const generatePlanSlice = createSlice({
  name: 'trainingPlan/generatePlan',
  initialState: generatePlanInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generatePlan.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(generatePlan.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        state.error = null
      })
      .addCase(generatePlan.rejected, (state, { payload }) => {
        state.loading = false
        state.success = null
        state.error = (payload as { message?: string })?.message ?? 'Request failed'
      })
  }
})

export const { actions: generatePlanActions, reducer: generatePlanReducer } = generatePlanSlice
export default generatePlanSlice.reducer
