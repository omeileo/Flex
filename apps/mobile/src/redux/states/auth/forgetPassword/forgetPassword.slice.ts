import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import errorHandler from '@shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '@shared/functions/Redux/serializeError.functions'

import { forgetPasswordApi } from './forgetPassword.api'
import forgetPasswordInitialState from './forgetPassword.initialState'
import { ForgetPasswordRequest } from './forgetPassword.types'

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (request: ForgetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await forgetPasswordApi(request)

      return response.userFriendlyMessage
    } catch (error) {
      errorHandler.handleApiError(error as never)

      const serialized = serializeError(error) as {
        userFriendlyMessage?: string
        message?: string
      }

      return rejectWithValue({
        message: serialized.userFriendlyMessage ?? serialized.message ?? 'Could not send reset email'
      })
    }
  }
)

const forgetPasswordSlice = createSlice({
  name: 'auth/forgetPassword',
  initialState: forgetPasswordInitialState,
  reducers: {
    clearForgetPasswordState: (state) => {
      state.error = null
      state.successMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(forgetPassword.fulfilled, (state, { payload }) => {
        state.loading = false
        state.successMessage = payload
        state.error = null
      })
      .addCase(forgetPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = (payload as { message?: string })?.message ?? 'Could not send reset email'
      })
  }
})

export const { actions: forgetPasswordActions, reducer: forgetPasswordReducer } = forgetPasswordSlice
export default forgetPasswordSlice.reducer
