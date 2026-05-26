import React, { useCallback } from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import { createStatusSegmentStyles } from './StatusSegment.styles'
import { StatusSegmentProps, WellnessStatus } from './StatusSegment.types'

const statusOptions: WellnessStatus[] = ['recovered', 'managing', 'flareUp']

const StatusSegment = ({ value, onChange }: StatusSegmentProps) => {
  const styles = useThemedStyles(createStatusSegmentStyles)
  const { t } = useTranslation()

  const renderSegment = useCallback(
    (status: WellnessStatus) => {
      const isActive = value === status

      return (
        <Pressable
          key={status}
          style={[styles.segment, isActive && styles.segmentActive]}
          onPress={() => onChange(status)}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
        >
          <Text style={[styles.label, isActive && styles.labelActive]}>
            {t(`designPreview.profileSettings.status.${status}`)}
          </Text>
        </Pressable>
      )
    },
    [onChange, t, value]
  )

  return <View style={styles.row}>{statusOptions.map(renderSegment)}</View>
}

export default StatusSegment
