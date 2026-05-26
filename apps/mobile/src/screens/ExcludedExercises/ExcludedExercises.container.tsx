import React from 'react'

import { Text, View } from 'react-native'

import { RootState } from '@redux/store/store.types'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'

const excludedLabels: Record<string, string> = {
  'upright-row': 'Upright row',
  'box-jumps': 'Box jumps',
  'barbell-back-squat': 'Barbell back squat'
}

const ExcludedExercisesContainer = () => {
  const { t } = useTranslation()
  const styles = useThemedStyles(createProfileFlowStyles)
  const excludedExerciseIds = useSelector((state: RootState) => state.wellness.excludedExerciseIds)

  return (
    <FlowScreenScaffold
      title={t('profileSettings.excludedTitle')}
      subtitle={t('profileSettings.excludedSubtitle')}
      testID="excluded-exercises-screen"
    >
      {excludedExerciseIds.map((exerciseId) => (
        <View key={exerciseId} style={styles.exerciseRow}>
          <Text style={styles.exerciseName}>{excludedLabels[exerciseId] ?? exerciseId}</Text>
          <Text style={styles.rowAction}>✓</Text>
        </View>
      ))}
      <Text style={styles.footerNote}>{t('profileSettings.excludedLink')}</Text>
    </FlowScreenScaffold>
  )
}

export default ExcludedExercisesContainer
