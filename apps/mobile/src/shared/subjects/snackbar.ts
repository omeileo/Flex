import { Subject } from 'rxjs'

export type SnackbarSeverity = 'info' | 'success' | 'warning' | 'error'

export interface SnackbarConfig {
  message: string
  severity?: SnackbarSeverity
  duration?: number
  actionButton?: { label: string; onPress: () => void }
  hide?: boolean
}

export const snackbar = new Subject<SnackbarConfig>()

export default snackbar
