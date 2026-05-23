import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions'
import { ApiErrorResponse } from '../../../../shared/types/api.types'
import { getProfileApi } from './getProfile.api'
import getProfileInitialState from './getProfile.initialState'

export const getProfile = createAsyncThunk('profile/getProfile', async (_request: void, { rejectWithValue }) => {
  try {
    const response = await getProfileApi()

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
})

const getProfileSlice = createSlice({
  name: 'profile/getProfile',
  initialState: getProfileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true
        state.error = null
        state.notFound = false
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        state.error = null
        state.notFound = false
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.loading = false
        state.success = null
        state.error = (payload as { message?: string })?.message ?? 'Request failed'
        state.notFound = Boolean((payload as { notFound?: boolean })?.notFound)
      })
  }
})

export const { actions: getProfileActions, reducer: getProfileReducer } = getProfileSlice
export default getProfileSlice.reducer
