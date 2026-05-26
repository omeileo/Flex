import { configureStore } from '@reduxjs/toolkit'

import getProfileReducer from '../getProfile.slice'

jest.mock('../getProfile.api', () => ({
  getProfileApi: jest.fn()
}))

jest.mock('../../../../../shared/functions/ErrorHandler/errorHandler.functions', () => ({
  __esModule: true,
  default: {
    handleApiError: jest.fn(),
    handleDefaultError: jest.fn(),
    isErrorCode: jest.fn()
  }
}))

const buildStore = () => configureStore({ reducer: { getProfile: getProfileReducer } })

describe('getProfile slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()
    expect(store.getState().getProfile.loading).toBe(false)
  })
})
