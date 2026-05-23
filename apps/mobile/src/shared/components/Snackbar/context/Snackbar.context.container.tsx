import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import CustomizedSnackbar from '../Snackbar.component'

import { setSnackbarContext } from '../Snackbar.functions'
import { SnackbarAction, SnackbarAutoHideDuration } from '../Snackbar.types'
import { ShowSnackbarProps, SnackbarContextProps, SnackbarState } from './Snackbar.context.types'

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    severity: 'info',
    autoHideDuration: SnackbarAutoHideDuration.MEDIUM,
    open: false,
    action: undefined
  })
  const [snackbarAction, setSnackbarAction] = useState<SnackbarAction | undefined>(undefined)

  const show = (props: ShowSnackbarProps) => {
    setSnackbarState({
      message: props.message,
      severity: props.severity,
      autoHideDuration: props.autoHideDuration ?? SnackbarAutoHideDuration.MEDIUM,
      open: true,
      action: props.action
    })
  }

  const handleClose = () => {
    setSnackbarState((prev) => ({ ...prev, open: false }))
  }

  useEffect(() => {
    setSnackbarContext({ show })
  }, [])

  useEffect(() => {
    if (snackbarState.action) {
      const { onPress, ...rest } = snackbarState.action

      const wrappedOnPress = () => {
        if (onPress) {
          onPress()
        }

        handleClose()
      }

      setSnackbarAction({ ...rest, onPress: wrappedOnPress })
    } else {
      setSnackbarAction(undefined)
    }
  }, [snackbarState.action])

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}

      <CustomizedSnackbar
        message={snackbarState.message}
        severity={snackbarState.severity}
        action={snackbarAction ? { label: snackbarAction.label, onPress: snackbarAction.onPress } : undefined}
        autoHideDuration={snackbarState.autoHideDuration}
        open={snackbarState.open}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext)

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }

  return context
}
