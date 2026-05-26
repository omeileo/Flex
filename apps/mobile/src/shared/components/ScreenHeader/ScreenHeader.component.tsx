import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createScreenHeaderStyles } from './ScreenHeader.styles'
import { ScreenHeaderProps } from './ScreenHeader.types'

const ScreenHeader = ({ title, onBack, backLabel = '‹', rightAction, style }: ScreenHeaderProps) => {
  const styles = useThemedStyles(createScreenHeaderStyles)

  return (
    <View style={[styles.container, style]}>
      {onBack ? (
        <Pressable style={styles.backButton} onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          <Text style={styles.backLabel}>{backLabel}</Text>
        </Pressable>
      ) : (
        <View style={styles.backButton} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightSlot}>{rightAction ?? null}</View>
    </View>
  )
}

export default ScreenHeader
