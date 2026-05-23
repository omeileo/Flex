import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import errorHandler from '@shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '@shared/functions/Redux/serializeError.functions'

import { signUpApi } from './signUp.api'
import signUpInitialState from './signUp.initialState'
import { SignUpRequest } from './signUp.types'

export const signUp = createAsyncThunk('auth/signUp', async (request: SignUpRequest, { rejectWithValue }) => {
  try {
    const response = await signUpApi(request)

    return response.userFriendlyMessage
  } catch (error) {
    errorHandler.handleApiError(error as never)

    const serialized = serializeError(error) as {
      userFriendlyMessage?: string
      message?: string
    }

    return rejectWithValue({
      message: serialized.userFriendlyMessage ?? serialized.message ?? 'Sign up failed'
    })
  }
})

const signUpSlice = createSlice({
  name: 'auth/signUp',
  initialState: signUpInitialState,
  reducers: {
    clearSignUpState: (state) => {
      state.error = null
      state.successMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false
        state.successMessage = payload
        state.error = null
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false
        state.error = (payload as { message?: string })?.message ?? 'Sign up failed'
      })
  }
})

export const { actions: signUpActions, reducer: signUpReducer } = signUpSlice
export default signUpSlice.reducer
