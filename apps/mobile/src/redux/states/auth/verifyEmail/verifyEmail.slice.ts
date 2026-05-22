import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import errorHandler from '@shared/functions/ErrorHandler/errorHandler.functions';
import { serializeError } from '@shared/functions/Redux/serializeError.functions';

import { resendVerifyEmailApi, verifyEmailApi } from './verifyEmail.api';
import verifyEmailInitialState from './verifyEmail.initialState';
import {
  ResendVerifyEmailRequest,
  VerifyEmailWithCodeRequest,
} from './verifyEmail.types';

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (request: VerifyEmailWithCodeRequest, { rejectWithValue }) => {
    try {
      const response = await verifyEmailApi({
        ...request,
        code: request.code.trim().toUpperCase(),
      });

      return response.userFriendlyMessage;
    } catch (error) {
      errorHandler.handleApiError(error as never);

      const serialized = serializeError(error) as {
        userFriendlyMessage?: string;
        message?: string;
      };

      return rejectWithValue({
        message:
          serialized.userFriendlyMessage ??
          serialized.message ??
          'Verification failed',
      });
    }
  },
);

export const resendVerifyEmail = createAsyncThunk(
  'auth/verifyEmail/resend',
  async (request: ResendVerifyEmailRequest, { rejectWithValue }) => {
    try {
      const response = await resendVerifyEmailApi(request);

      return response.userFriendlyMessage;
    } catch (error) {
      errorHandler.handleApiError(error as never);

      const serialized = serializeError(error) as {
        userFriendlyMessage?: string;
        message?: string;
      };

      return rejectWithValue({
        message:
          serialized.userFriendlyMessage ??
          serialized.message ??
          'Could not resend code',
      });
    }
  },
);

const verifyEmailSlice = createSlice({
  name: 'auth/verifyEmail',
  initialState: verifyEmailInitialState,
  reducers: {
    clearVerifyEmailState: state => {
      state.error = null;
      state.resendMessage = null;
      state.verified = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verifyEmail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, state => {
        state.loading = false;
        state.verified = true;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          (payload as { message?: string })?.message ?? 'Verification failed';
      })
      .addCase(resendVerifyEmail.pending, state => {
        state.resendLoading = true;
        state.resendMessage = null;
      })
      .addCase(resendVerifyEmail.fulfilled, (state, { payload }) => {
        state.resendLoading = false;
        state.resendMessage = payload ?? null;
      })
      .addCase(resendVerifyEmail.rejected, (state, { payload }) => {
        state.resendLoading = false;
        state.error =
          (payload as { message?: string })?.message ?? 'Could not resend code';
      });
  },
});

export const { actions: verifyEmailActions, reducer: verifyEmailReducer } =
  verifyEmailSlice;
export default verifyEmailSlice.reducer;
