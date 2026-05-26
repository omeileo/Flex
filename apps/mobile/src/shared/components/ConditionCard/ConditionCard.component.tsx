import React, { useMemo } from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import { createConditionCardStyles, getAccentBarByStatus } from './ConditionCard.styles'
import { ConditionCardProps } from './ConditionCard.types'

const ConditionCard = ({ title, status, subtitle, onPress }: ConditionCardProps) => {
  const colors = useThemeColors()
  const styles = useThemedStyles(createConditionCardStyles)
  const { t } = useTranslation()
  const accentColor = useMemo(() => getAccentBarByStatus(colors)[status], [colors, status])

  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="button">
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t(`designPreview.profileSettings.status.${status}`)}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  )
}

export default ConditionCard
