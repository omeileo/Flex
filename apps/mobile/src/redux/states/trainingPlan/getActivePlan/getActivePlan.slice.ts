import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions'
import { ApiErrorResponse } from '../../../../shared/types/api.types'
import { getActivePlanApi } from './getActivePlan.api'
import getActivePlanInitialState from './getActivePlan.initialState'

export const getActivePlan = createAsyncThunk(
  'trainingPlan/getActivePlan',
  async (_request: void, { rejectWithValue }) => {
    try {
      const response = await getActivePlanApi()

      return response.data
    } catch (error) {
      if ((error as ApiErrorResponse)?.status === 404) {
        return rejectWithValue({ notFound: true, message: (error as ApiErrorResponse).userFriendlyMessage })
      }

      errorHandler.handleApiError(error as ApiErrorResponse)

      const serialized = serializeError(error) as { message?: string; userFriendlyMessage?: string }

      return rejectWithValue({
        message: serialized.userFriendlyMessage ?? serialized.message ?? 'Request failed'
      })
    }
  }
)

const getActivePlanSlice = createSlice({
  name: 'trainingPlan/getActivePlan',
  initialState: getActivePlanInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActivePlan.pending, (state) => {
        state.loading = true
        state.error = null
        state.notFound = false
      })
      .addCase(getActivePlan.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        state.error = null
        state.notFound = false
      })
      .addCase(getActivePlan.rejected, (state, { payload }) => {
        state.loading = false
        state.success = null
        state.error = (payload as { message?: string })?.message ?? 'Request failed'
        state.notFound = Boolean((payload as { notFound?: boolean })?.notFound)
      })
  }
})

export const { actions: getActivePlanActions, reducer: getActivePlanReducer } = getActivePlanSlice
export default getActivePlanSlice.reducer
