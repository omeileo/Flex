import { configureStore } from '@reduxjs/toolkit'

import getProgressMetricsReducer from '../getProgressMetrics.slice'

jest.mock('../getProgressMetrics.api', () => ({
  getProgressMetricsApi: jest.fn()
}))

jest.mock('../../../../../shared/functions/ErrorHandler/errorHandler.functions', () => ({
  __esModule: true,
  default: {
    handleApiError: jest.fn(),
    handleDefaultError: jest.fn(),
    isErrorCode: jest.fn()
  }
}))

const buildStore = () => configureStore({ reducer: { getProgressMetrics: getProgressMetricsReducer } })

describe('getProgressMetrics slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()

    expect(store.getState().getProgressMetrics.loading).toBe(false)
    expect(store.getState().getProgressMetrics.success).toBeNull()
  })
})
