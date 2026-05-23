import { useContext } from 'react'

import { setThemeMode } from '@redux/states/settings/theme/theme.slice'
import { RootState } from '@redux/store/store.types'
import { ThemeContext } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { ThemeMode } from '@shared/styles/StyleConstants'
import { useDispatch, useSelector } from 'react-redux'

export const useThemeColors = () => {
  const context = useContext(ThemeContext)

  return context.colors
}

export const useThemeMode = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.theme.mode)

  const selectThemeMode = (nextMode: ThemeMode) => {
    dispatch(setThemeMode(nextMode))
  }

  return {
    mode,
    setThemeMode: selectThemeMode
  }
}
