export interface CustomizedSnackbarProps {
  message: string
  action?: SnackbarAction
  severity: SnackbarSeverity
  autoHideDuration: SnackbarAutoHideDuration
  open: boolean
  onClose: () => void
}

export interface SnackbarAction {
  label: string
  onPress: () => void
}

export type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success'

export enum SnackbarAutoHideDuration {
  SHORT = 3000,
  MEDIUM = 5000,
  LONG = 15000,
  EXTENDED = 60000
}
