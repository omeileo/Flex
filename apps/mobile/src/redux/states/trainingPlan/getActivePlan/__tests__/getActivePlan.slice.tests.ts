import { configureStore } from '@reduxjs/toolkit'

import getActivePlanReducer from '../getActivePlan.slice'

jest.mock('../getActivePlan.api', () => ({
  getActivePlanApi: jest.fn()
}))

jest.mock('../../../../../shared/functions/ErrorHandler/errorHandler.functions', () => ({
  __esModule: true,
  default: {
    handleApiError: jest.fn(),
    handleDefaultError: jest.fn(),
    isErrorCode: jest.fn()
  }
}))

const buildStore = () => configureStore({ reducer: { getActivePlan: getActivePlanReducer } })

describe('getActivePlan slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()
    expect(store.getState().getActivePlan.loading).toBe(false)
  })
})
