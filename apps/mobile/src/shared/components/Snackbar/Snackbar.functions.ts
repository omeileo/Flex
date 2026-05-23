import { SnackbarAutoHideDuration } from './Snackbar.types'
import { ShowSnackbarProps, SnackbarContextProps } from './context/Snackbar.context.types'

let snackbarContext: SnackbarContextProps | null = null
const snackbarQueue: ShowSnackbarProps[] = []

export const setSnackbarContext = (context: SnackbarContextProps) => {
  snackbarContext = context

  if (snackbarQueue.length > 0) {
    snackbarQueue.forEach((props) => {
      context.show({
        ...props,
        autoHideDuration: props.autoHideDuration || SnackbarAutoHideDuration.MEDIUM
      })
    })

    snackbarQueue.length = 0
  }
}

export const show = (props: ShowSnackbarProps) => {
  if (snackbarContext) {
    snackbarContext.show({
      ...props,
      autoHideDuration: props.autoHideDuration || SnackbarAutoHideDuration.MEDIUM
    })
  } else {
    snackbarQueue.push(props)
  }
}

const Snackbar = {
  show
}

export default Snackbar
