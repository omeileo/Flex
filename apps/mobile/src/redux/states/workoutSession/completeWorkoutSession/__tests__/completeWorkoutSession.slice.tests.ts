import { configureStore } from '@reduxjs/toolkit'

import { completeWorkoutSession } from '../completeWorkoutSession.slice'
import completeWorkoutSessionReducer from '../completeWorkoutSession.slice'

jest.mock('../completeWorkoutSession.api', () => ({
  completeWorkoutSessionApi: jest.fn()
}))

jest.mock('../../../../../shared/functions/ErrorHandler/errorHandler.functions', () => ({
  __esModule: true,
  default: { handleApiError: jest.fn(), handleDefaultError: jest.fn(), isErrorCode: jest.fn() }
}))

const { completeWorkoutSessionApi } = jest.requireMock('../completeWorkoutSession.api')

const buildStore = () => configureStore({ reducer: { completeWorkoutSession: completeWorkoutSessionReducer } })

describe('completeWorkoutSession slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()
    expect(store.getState().completeWorkoutSession.loading).toBe(false)
  })
})
