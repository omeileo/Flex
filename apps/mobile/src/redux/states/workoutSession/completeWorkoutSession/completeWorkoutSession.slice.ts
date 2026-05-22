import { z } from 'zod';
import { workoutSessionCompleteSchema } from '@flex/shared/types/workoutSession/workoutSession.schemas';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import errorHandler from '../../../../shared/functions/ErrorHandler/errorHandler.functions';
import { serializeError } from '../../../../shared/functions/Redux/serializeError.functions';
import { completeWorkoutSessionApi } from './completeWorkoutSession.api';
import completeWorkoutSessionInitialState from './completeWorkoutSession.initialState';

type WorkoutSessionComplete = z.infer<typeof workoutSessionCompleteSchema>;

export const completeWorkoutSession = createAsyncThunk(
  'workoutSession/completeWorkoutSession',
  async (
    request: { sessionId: number; body: WorkoutSessionComplete },
    { rejectWithValue },
  ) => {
    try {
      const response = await completeWorkoutSessionApi(request);

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

const completeWorkoutSessionSlice = createSlice({
  name: 'workoutSession/completeWorkoutSession',
  initialState: completeWorkoutSessionInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(completeWorkoutSession.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeWorkoutSession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
        state.error = null;
      })
      .addCase(completeWorkoutSession.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = null;
        state.error =
          (payload as { message?: string })?.message ?? 'Request failed';
      });
  },
});

export const {
  actions: completeWorkoutSessionActions,
  reducer: completeWorkoutSessionReducer,
} = completeWorkoutSessionSlice;
export default completeWorkoutSessionSlice.reducer;
