import React from 'react'

import { Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createProgramOverviewStyles } from './ProgramOverview.styles'
import { ProgramOverviewComponentProps } from './ProgramOverview.types'

const ProgramOverviewComponent = ({
  program,
  isLoading,
  error,
  onPhasePress,
  onJumpToCurrentWeek,
  onRetry
}: ProgramOverviewComponentProps) => {
  const styles = useThemedStyles(createProgramOverviewStyles)
  const { t } = useTranslation()

  if (isLoading && !program) {
    return <LoadingView message={t('programOverview.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  if (!program) {
    return <ErrorView message={t('programOverview.empty')} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  const activePhaseIndex = program.phases.findIndex(
    (phase) => program.currentWeekNumber >= phase.weekStart && program.currentWeekNumber <= phase.weekEnd
  )

  return (
    <View style={styles.container} testID="program-overview-screen">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.blurbCard}>
          <Text style={styles.blurbLabel}>{t('programOverview.coachLabel')}</Text>
          <Text style={styles.blurbText}>{program.blurb}</Text>
        </View>

        <Text style={styles.metaRow}>{program.statsLabel}</Text>
        <Text style={styles.sectionLabel}>{t('programOverview.phasesLabel')}</Text>

        {program.phases.map((phase, index) => (
          <Pressable
            key={phase.id}
            style={[styles.phaseCard, index === activePhaseIndex && styles.phaseCardActive]}
            onPress={() => onPhasePress(phase.id)}
            testID={`program-overview-phase-${phase.id}`}
          >
            <Text style={styles.phaseTitle}>{phase.name}</Text>
            <Text style={styles.phaseSub}>
              {phase.weeksLabel} · {phase.rpe}
            </Text>
          </Pressable>
        ))}

        <Text style={styles.deloadNote}>{program.deloadNote}</Text>

        <View style={styles.footer}>
          <PrimaryButton
            label={t('programOverview.jumpToWeek')}
            onPress={onJumpToCurrentWeek}
            testID="program-overview-jump-week"
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default ProgramOverviewComponent
