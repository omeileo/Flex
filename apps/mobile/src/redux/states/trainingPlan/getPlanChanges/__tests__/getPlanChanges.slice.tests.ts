import { configureStore } from '@reduxjs/toolkit'

import getPlanChangesReducer from '../getPlanChanges.slice'

jest.mock('../getPlanChanges.api', () => ({
  getPlanChangesApi: jest.fn()
}))

jest.mock('../../../../../shared/functions/ErrorHandler/errorHandler.functions', () => ({
  __esModule: true,
  default: {
    handleApiError: jest.fn(),
    handleDefaultError: jest.fn(),
    isErrorCode: jest.fn()
  }
}))

const buildStore = () => configureStore({ reducer: { getPlanChanges: getPlanChangesReducer } })

describe('getPlanChanges slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()
    expect(store.getState().getPlanChanges.loading).toBe(false)
  })
})
