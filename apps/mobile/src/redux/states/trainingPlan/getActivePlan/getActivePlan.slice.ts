import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions';
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions';
import { getActivePlanApi } from './getActivePlan.api';
import getActivePlanInitialState from './getActivePlan.initialState';

export const getActivePlan = createAsyncThunk(
  'trainingPlan/getActivePlan',
  async (_request: void, { rejectWithValue }) => {
    try {
      const response = await getActivePlanApi();

      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return rejectWithValue({ notFound: true, message: error.message });
      }
      errorHandler.handleApiError(error as never);

      const serialized = serializeError(error) as { message?: string };

      return rejectWithValue({
        message: serialized.message ?? 'Request failed',
      });
    }
  },
);

const getActivePlanSlice = createSlice({
  name: 'trainingPlan/getActivePlan',
  initialState: getActivePlanInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getActivePlan.pending, state => {
        state.loading = true;
        state.error = null;
        state.notFound = false;
      })
      .addCase(getActivePlan.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
        state.error = null;
        state.notFound = false;
      })
      .addCase(getActivePlan.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = null;
        state.error =
          (payload as { message?: string })?.message ?? 'Request failed';
        state.notFound = Boolean((payload as { notFound?: boolean })?.notFound);
      });
  },
});

export const { actions: getActivePlanActions, reducer: getActivePlanReducer } =
  getActivePlanSlice;
export default getActivePlanSlice.reducer;
