import { configureStore } from '@reduxjs/toolkit'

import { saveProfile } from '../saveProfile.slice'
import saveProfileReducer from '../saveProfile.slice'

jest.mock('../saveProfile.api', () => ({
  saveProfileApi: jest.fn()
}))

jest.mock('../../../../../shared/functions/ErrorHandler/errorHandler.functions', () => ({
  __esModule: true,
  default: { handleApiError: jest.fn(), handleDefaultError: jest.fn(), isErrorCode: jest.fn() }
}))

const { saveProfileApi } = jest.requireMock('../saveProfile.api')

const buildStore = () => configureStore({ reducer: { saveProfile: saveProfileReducer } })

describe('saveProfile slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()
    expect(store.getState().saveProfile.loading).toBe(false)
  })
})
