import { configureStore } from '@reduxjs/toolkit'

import themeReducer, { hydrateTheme, setThemeMode } from '../theme.slice'

jest.mock('@shared/functions/LocalStorage/localStorage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  }
}))

const localStorage = jest.requireMock('@shared/functions/LocalStorage/localStorage').default

const buildStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer
    }
  })

describe('theme slice', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns initial state by default', () => {
    const store = buildStore()

    expect(store.getState().theme.mode).toBe('light')
    expect(store.getState().theme.hydrated).toBe(false)
  })

  it('hydrates from local storage when a valid mode is stored', () => {
    localStorage.getItem.mockReturnValue('dark')
    const store = buildStore()

    store.dispatch(hydrateTheme())

    expect(store.getState().theme.mode).toBe('dark')
    expect(store.getState().theme.hydrated).toBe(true)
  })

  it('persists theme mode when updated', () => {
    const store = buildStore()

    store.dispatch(setThemeMode('pink'))

    expect(store.getState().theme.mode).toBe('pink')
    expect(localStorage.setItem).toHaveBeenCalledWith('themeMode', 'pink')
  })
})
