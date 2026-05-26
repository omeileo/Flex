import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createPhaseDetailStyles } from './PhaseDetail.styles'
import { PhaseDetailComponentProps } from './PhaseDetail.types'

const PhaseDetailComponent = ({
  phase,
  splitDays,
  runningCopy,
  isLoading,
  error,
  onViewWeekSchedule,
  onRetry
}: PhaseDetailComponentProps) => {
  const styles = useThemedStyles(createPhaseDetailStyles)
  const { t } = useTranslation()

  if (isLoading && !phase) {
    return <LoadingView message={t('phaseDetail.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  if (!phase) {
    return <ErrorView message={t('phaseDetail.empty')} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  const strengthDays = splitDays.filter((workout) => {
    const name = workout.name.toLowerCase()

    return !name.includes('run') && !name.includes('mobility') && !name.includes('rest')
  })

  const hasRunning = splitDays.some((workout) => workout.name.toLowerCase().includes('run'))

  return (
    <View style={styles.container} testID="phase-detail-screen">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>{t('phaseDetail.goalLabel')}</Text>
          <Text style={styles.goalText}>{phase.goal}</Text>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('phaseDetail.intensityLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.rpe}</Text>
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('phaseDetail.progressionLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.progression}</Text>
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('phaseDetail.restCompoundsLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.restCompounds}</Text>
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('phaseDetail.restAccessoriesLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.restAccessories}</Text>
        </View>

        <Text style={styles.sectionLabel}>{t('phaseDetail.splitLabel')}</Text>
        {strengthDays.map((workout, index) => (
          <Text key={workout.dayIndex} style={styles.splitItem} testID={`phase-detail-split-${index}`}>
            {t('phaseDetail.splitLine', { day: index + 1, title: workout.name })}
          </Text>
        ))}

        {hasRunning ? (
          <View style={styles.runCard}>
            <Text style={styles.runLabel}>{t('phaseDetail.runningLabel')}</Text>
            <Text style={styles.runCopy}>{runningCopy}</Text>
          </View>
        ) : null}

        <View style={styles.footer}>
          <PrimaryButton
            label={t('phaseDetail.viewWeekSchedule', { week: phase.weekStart })}
            onPress={onViewWeekSchedule}
            testID="phase-detail-view-week"
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhaseDetailComponent
