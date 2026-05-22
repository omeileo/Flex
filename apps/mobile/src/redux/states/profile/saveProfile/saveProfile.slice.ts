import type { FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions';
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions';
import { saveProfileApi } from './saveProfile.api';
import saveProfileInitialState from './saveProfile.initialState';

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (request: FitnessProfileUpsert, { rejectWithValue }) => {
    try {
      const response = await saveProfileApi(request);

      return response;
    } catch (error) {
      errorHandler.handleApiError(error as never);

      const serialized = serializeError(error) as { message?: string };

      return rejectWithValue({
        message: serialized.message ?? 'Request failed',
      });
    }
  },
);

const saveProfileSlice = createSlice({
  name: 'profile/saveProfile',
  initialState: saveProfileInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
        state.error = null;
      })
      .addCase(saveProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = null;
        state.error =
          (payload as { message?: string })?.message ?? 'Request failed';
      });
  },
});

export const { actions: saveProfileActions, reducer: saveProfileReducer } =
  saveProfileSlice;
export default saveProfileSlice.reducer;
