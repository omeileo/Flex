import { useMemo } from 'react'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'

import { ThemedStylesFactory } from './useThemedStyles.types'

export const useThemedStyles = <T>(factory: ThemedStylesFactory<T>): T => {
  const colors = useThemeColors()

  return useMemo(() => factory(colors), [colors, factory])
}
