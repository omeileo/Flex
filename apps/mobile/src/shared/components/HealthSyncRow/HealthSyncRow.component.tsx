import React from 'react'

import { Text, View } from 'react-native'

import { useTranslation } from 'react-i18next'

import styles from './HealthSyncRow.styles'
import { HealthSyncRowProps } from './HealthSyncRow.types'

const HealthSyncRow = ({ provider }: HealthSyncRowProps) => {
  const { t } = useTranslation()

  const titleKey =
    provider === 'appleHealth' ? 'components.healthSync.appleHealth' : 'components.healthSync.healthConnect'

  return (
    <View style={styles.row} accessibilityState={{ disabled: true }}>
      <View style={styles.content}>
        <Text style={styles.title}>{t(titleKey)}</Text>
        <Text style={styles.subtitle}>{t('components.healthSync.phaseTwo')}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{t('components.healthSync.comingSoon')}</Text>
      </View>
    </View>
  )
}

export default HealthSyncRow
