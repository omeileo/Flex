import { configureStore } from '@reduxjs/toolkit';

import { createWorkoutSession } from '../createWorkoutSession.slice';
import createWorkoutSessionReducer from '../createWorkoutSession.slice';

jest.mock('../createWorkoutSession.api', () => ({
  createWorkoutSessionApi: jest.fn(),
}));

jest.mock(
  '../../../../../shared/functions/ErrorHandler/errorHandler.functions',
  () => ({
    __esModule: true,
    default: {
      handleApiError: jest.fn(),
      handleDefaultError: jest.fn(),
      isErrorCode: jest.fn(),
    },
  }),
);

const { createWorkoutSessionApi } = jest.requireMock(
  '../createWorkoutSession.api',
);

const buildStore = () =>
  configureStore({
    reducer: { createWorkoutSession: createWorkoutSessionReducer },
  });

describe('createWorkoutSession slice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns initial state by default', () => {
    const store = buildStore();
    expect(store.getState().createWorkoutSession.loading).toBe(false);
  });
});
