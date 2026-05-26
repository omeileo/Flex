import React from 'react'

import { Pressable, Text } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import BottomSheet from '@shared/components/BottomSheet/BottomSheet.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createPlanReadaptSheetStyles } from './PlanReadaptSheet.styles'
import { PlanReadaptSheetProps } from './PlanReadaptSheet.types'

const PlanReadaptSheet = ({
  visible,
  title,
  subtitle,
  readaptLabel,
  skipLabel,
  onReadapt,
  onSkip,
  testID
}: PlanReadaptSheetProps) => {
  const styles = useThemedStyles(createPlanReadaptSheetStyles)

  return (
    <BottomSheet visible={visible} onClose={onSkip} testID={testID}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <PrimaryButton label={readaptLabel} onPress={onReadapt} />
      <Pressable onPress={onSkip} accessibilityRole="button">
        <Text style={styles.linkText}>{skipLabel}</Text>
      </Pressable>
    </BottomSheet>
  )
}

export default PlanReadaptSheet
