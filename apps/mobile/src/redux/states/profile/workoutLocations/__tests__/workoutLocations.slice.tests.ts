import { configureStore } from '@reduxjs/toolkit'

import workoutLocationsReducer, { addLocation, setDefaultLocation } from '../workoutLocations.slice'

jest.mock('@shared/functions/LocalStorage/localStorage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  }
}))

const buildStore = () =>
  configureStore({
    reducer: {
      workoutLocations: workoutLocationsReducer
    }
  })

describe('workoutLocations slice', () => {
  it('adds a location and marks first as default', () => {
    const store = buildStore()
    const initialCount = store.getState().workoutLocations.locations.length

    store.dispatch(
      addLocation({
        name: 'Travel Kit',
        presetType: 'travel',
        equipment: []
      })
    )

    expect(store.getState().workoutLocations.locations).toHaveLength(initialCount + 1)
  })

  it('updates default location', () => {
    const store = buildStore()
    const target = store.getState().workoutLocations.locations.find((location) => !location.isDefault)

    if (!target) {
      throw new Error('Expected non-default location in seed data')
    }

    store.dispatch(setDefaultLocation(target.id))

    expect(store.getState().workoutLocations.locations.find((location) => location.id === target.id)?.isDefault).toBe(
      true
    )
  })
})
