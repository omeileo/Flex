import React, { useEffect, useRef } from 'react'

import { Animated, ScrollView, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createAuthScreenShellStyles } from './AuthScreenShell.styles'
import { AuthScreenShellProps } from './AuthScreenShell.types'

const AuthScreenShell = ({ children, testID, contentStyle, variant = 'form' }: AuthScreenShellProps) => {
  const styles = useThemedStyles(createAuthScreenShellStyles)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(18)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 18,
        stiffness: 140,
        mass: 0.9,
        useNativeDriver: true
      })
    ]).start()
  }, [fadeAnim, slideAnim])

  const scrollContentStyle = variant === 'hero' ? styles.heroScrollContent : styles.scrollContent

  return (
    <View style={styles.root} testID={testID}>
      <Animated.View
        style={[
          styles.content,
          contentStyle,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ScrollView contentContainerStyle={scrollContentStyle} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  )
}

export default AuthScreenShell
