import { configureStore } from '@reduxjs/toolkit'

import { generatePlan } from '../generatePlan.slice'
import generatePlanReducer from '../generatePlan.slice'

jest.mock('../generatePlan.api', () => ({
  generatePlanApi: jest.fn()
}))

jest.mock('../../../../../shared/functions/ErrorHandler/errorHandler.functions', () => ({
  __esModule: true,
  default: { handleApiError: jest.fn(), handleDefaultError: jest.fn(), isErrorCode: jest.fn() }
}))

const { generatePlanApi } = jest.requireMock('../generatePlan.api')

const buildStore = () => configureStore({ reducer: { generatePlan: generatePlanReducer } })

describe('generatePlan slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()
    expect(store.getState().generatePlan.loading).toBe(false)
  })
})
