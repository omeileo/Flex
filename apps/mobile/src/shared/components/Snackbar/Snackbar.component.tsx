import React, { useEffect, useMemo, useRef } from 'react'

import { Animated, Pressable, Text, View } from 'react-native'

import { ThemeContext } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { createSnackbarStyles } from './Snackbar.styles'
import { CustomizedSnackbarProps } from './Snackbar.types'

const CustomizedSnackbar = ({
  message,
  action,
  severity,
  autoHideDuration,
  open,
  onClose
}: CustomizedSnackbarProps) => {
  const { colors } = React.useContext(ThemeContext)
  const insets = useSafeAreaInsets()
  const opacity = useRef(new Animated.Value(0)).current
  const styles = useMemo(() => createSnackbarStyles(colors), [colors])
  const isInfo = severity === 'info'

  useEffect(() => {
    if (!open) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true
      }).start()

      return
    }

    Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true
    }).start()

    const timer = setTimeout(onClose, autoHideDuration)

    return () => clearTimeout(timer)
  }, [autoHideDuration, onClose, open, opacity])

  if (!open) {
    return null
  }

  const alertStyle = [
    styles.alert,
    severity === 'error' && styles.alertError,
    severity === 'warning' && styles.alertWarning,
    severity === 'success' && styles.alertSuccess,
    isInfo && styles.alertInfo
  ]

  return (
    <Animated.View pointerEvents="box-none" style={[styles.host, { bottom: insets.bottom + 16, opacity }]}>
      <View style={alertStyle}>
        <View style={styles.content}>
          <Text style={[styles.message, isInfo && styles.messageInfo]} accessibilityRole="alert">
            {message}
          </Text>
        </View>

        {action ? (
          <Pressable
            style={styles.actionButton}
            onPress={action.onPress}
            accessibilityRole="button"
            accessibilityLabel={action.label}
          >
            <Text style={[styles.actionLabel, isInfo && styles.actionLabelInfo]}>{action.label.toUpperCase()}</Text>
          </Pressable>
        ) : null}

        <Pressable style={styles.closeButton} onPress={onClose} accessibilityRole="button" accessibilityLabel="Dismiss">
          <Text style={[styles.closeLabel, isInfo && styles.closeLabelInfo]}>✕</Text>
        </Pressable>
      </View>
    </Animated.View>
  )
}

export default CustomizedSnackbar
