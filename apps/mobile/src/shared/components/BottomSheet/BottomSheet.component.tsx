import React from 'react'

import { Modal, Pressable, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createBottomSheetStyles } from './BottomSheet.styles'
import { BottomSheetProps } from './BottomSheet.types'

const BottomSheet = ({
  visible,
  onClose,
  children,
  variant = 'sheet',
  showHandle = true,
  contentStyle,
  testID
}: BottomSheetProps) => {
  const styles = useThemedStyles(createBottomSheetStyles)
  const isSheet = variant === 'sheet'

  return (
    <Modal
      visible={visible}
      transparent
      animationType={isSheet ? 'slide' : 'fade'}
      onRequestClose={onClose}
      testID={testID}
    >
      <Pressable
        style={[styles.overlay, !isSheet && styles.overlayCentered]}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Pressable
          style={[isSheet ? styles.sheet : styles.centeredPanel, contentStyle]}
          onPress={(event) => event.stopPropagation()}
        >
          {isSheet && showHandle ? <View style={styles.handle} /> : null}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default BottomSheet
