import { ThemeMode } from '@shared/styles/StyleConstants'

export type ThemeOption = {
  mode: ThemeMode
  label: string
  previewBackground: string
  previewSurface: string
  previewAccent: string
  previewText: string
}

export type ThemePickerProps = {
  options: ThemeOption[]
  selectedMode: ThemeMode
  onSelect: (mode: ThemeMode) => void
}
