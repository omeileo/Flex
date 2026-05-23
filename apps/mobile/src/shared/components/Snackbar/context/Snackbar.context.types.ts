import { SnackbarAction, SnackbarAutoHideDuration, SnackbarSeverity } from '../Snackbar.types'

export interface SnackbarContextProps {
  show: (props: ShowSnackbarProps) => void
}

export interface ShowSnackbarProps {
  message: string
  severity: SnackbarSeverity
  action?: SnackbarAction
  autoHideDuration?: SnackbarAutoHideDuration
}

export interface SnackbarState {
  message: string
  severity: SnackbarSeverity
  action?: SnackbarAction
  autoHideDuration: SnackbarAutoHideDuration
  open: boolean
}
