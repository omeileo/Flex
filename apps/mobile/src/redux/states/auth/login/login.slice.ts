import { resetFlexApiClient } from '@network/flexApi/flexApi.functions'
import { setFlexApiToken } from '@network/flexApi/flexApiToken.functions'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isAccountNotVerifiedError, setAuthenticationStatus } from '@shared/functions/Auth/auth.functions'
import errorHandler from '@shared/functions/ErrorHandler/errorHandler.functions'
import { serializeError } from '@shared/functions/Redux/serializeError.functions'
import { ApiErrorResponse } from '@shared/types/api.types'

import { loginApi } from './login.api'
import loginInitialState from './login.initialState'
import { LoginRequest } from './login.types'

export const login = createAsyncThunk('auth/login', async (request: LoginRequest, { rejectWithValue }) => {
  try {
    const response = await loginApi(request)

    await setFlexApiToken(response.data.token)
    resetFlexApiClient()
    setAuthenticationStatus(true)

    return response.data
  } catch (error) {
    errorHandler.handleApiError(error as never)

    const serialized = serializeError(error) as {
      userFriendlyMessage?: string
      message?: string
      details?: ApiErrorResponse['details']
    }

    const accountNotVerified = isAccountNotVerifiedError(serialized)

    return rejectWithValue({
      message: serialized.userFriendlyMessage ?? serialized.message ?? 'Login failed',
      accountNotVerified
    })
  }
})

const loginSlice = createSlice({
  name: 'auth/login',
  initialState: loginInitialState,
  reducers: {
    clearLoginError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false

        const rejected = payload as { message?: string; accountNotVerified?: boolean }

        if (rejected?.accountNotVerified) {
          state.error = null

          return
        }

        state.error = rejected?.message ?? 'Login failed'
      })
  }
})

export const { actions: loginActions, reducer: loginReducer } = loginSlice
export default loginSlice.reducer
