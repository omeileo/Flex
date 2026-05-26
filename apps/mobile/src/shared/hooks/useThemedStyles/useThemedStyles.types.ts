import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'

export type ThemedStylesFactory<T> = (colors: ThemeColors) => T
