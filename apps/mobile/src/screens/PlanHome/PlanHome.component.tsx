import React from 'react'

import { Modal, Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import CoachNote from '@shared/components/CoachNote/CoachNote.component'
import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import WeekSummaryCard from '@shared/components/WeekSummaryCard/WeekSummaryCard.component'
import WorkoutCard from '@shared/components/WorkoutCard/WorkoutCard.component'

import { createPlanHomeStyles } from './PlanHome.styles'
import { PlanHomeComponentProps } from './PlanHome.types'

const PlanHomeComponent = ({
  view,
  programTitle,
  blurb,
  phases,
  weekPlans,
  selectedWeek,
  weekSheetOpen,
  adjustModalOpen,
  isLoading,
  isGenerating,
  error,
  generateError,
  onRefresh,
  onCreatePlan,
  onWeekPress,
  onCloseWeekSheet,
  onViewFullWeek,
  onOpenAdjust,
  onCloseAdjust,
  onWorkoutPress
}: PlanHomeComponentProps) => {
  const styles = useThemedStyles(createPlanHomeStyles)
  const { t } = useTranslation()

  if (isLoading && view === 'overview' && weekPlans.length === 0) {
    return <LoadingView message={t('planHome.loading')} />
  }

  if (error && view !== 'empty') {
    return <ErrorView message={error} onRetry={onRefresh} retryLabel={t('actions.retry')} />
  }

  if (view === 'generating' || isGenerating) {
    return (
      <View style={styles.generatingContainer} testID="plan-home-generating">
        <Text style={styles.generatingTitle}>{t('planHome.generatingTitle')}</Text>
        <Text style={styles.generatingCopy}>{t('planHome.generatingCopy')}</Text>
      </View>
    )
  }

  if (view === 'empty') {
    return (
      <View style={styles.emptyContainer} testID="plan-home-empty">
        <Text style={styles.emptyIcon}>📅</Text>
        <Text style={styles.emptyTitle}>{t('planHome.emptyTitle')}</Text>
        <Text style={styles.emptyCopy}>{t('planHome.emptyCopy')}</Text>
        <PrimaryButton label={t('planHome.createPlan')} onPress={onCreatePlan} />
        {generateError ? <Text style={styles.errorText}>{generateError}</Text> : null}
      </View>
    )
  }

  return (
    <View style={styles.container} testID="plan-home-screen">
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('planHome.title')}</Text>
          <Pressable onPress={onOpenAdjust} accessibilityRole="button" testID="plan-home-adjust">
            <Text style={styles.calendarIcon}>📅</Text>
          </Pressable>
        </View>

        <View style={styles.coachNoteSpacing}>
          <CoachNote message={blurb || t('planHome.defaultBlurb')} />
        </View>

        <View style={styles.phaseRow}>
          {phases.map((phase, index) => (
            <View key={phase.id} style={[styles.phaseChip, index === 0 && styles.phaseChipActive]}>
              <Text style={[styles.phaseChipText, index === 0 && styles.phaseChipTextActive]}>{phase.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{programTitle}</Text>

        {weekPlans.map((week) => (
          <WeekSummaryCard
            key={week.weekNumber}
            weekNumber={week.weekNumber}
            dateRange={week.dateRange}
            workoutCount={week.workoutCount}
            totalVolume={week.totalVolume}
            workouts={week.workouts}
            isCurrent={week.isCurrent}
            onPress={() => onWeekPress(week.weekNumber)}
          />
        ))}
      </ScrollView>

      <Modal visible={weekSheetOpen} transparent animationType="slide" onRequestClose={onCloseWeekSheet}>
        <Pressable style={styles.overlay} onPress={onCloseWeekSheet}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>
              {t('planHome.weekSheetTitle', { week: selectedWeek?.weekNumber ?? 1 })}
            </Text>
            <Text style={styles.sheetStats}>
              {selectedWeek?.workoutCount ?? 0} {t('planHome.workoutsLabel')} · {selectedWeek?.totalVolume}
            </Text>

            {selectedWeek?.workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                title={workout.title}
                durationMinutes={workout.durationMinutes}
                modality={workout.modality}
                onPress={() => onWorkoutPress(workout.dayIndex, workout.title)}
              />
            ))}

            <PrimaryButton label={t('planHome.viewFullWeek')} onPress={onViewFullWeek} />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={adjustModalOpen} transparent animationType="fade" onRequestClose={onCloseAdjust}>
        <Pressable style={styles.overlay} onPress={onCloseAdjust}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <View style={styles.modalIcon}>
              <Text style={styles.modalIconText}>✨</Text>
            </View>
            <Text style={styles.modalHeadline}>{t('planHome.adjustTitle')}</Text>
            <Text style={styles.modalCopy}>{t('planHome.adjustCopy')}</Text>
            <PrimaryButton label={t('planHome.readaptPlan')} onPress={onCloseAdjust} />
            <Pressable style={styles.secondaryButton} onPress={onCloseAdjust}>
              <Text style={styles.secondaryButtonText}>{t('planHome.keepOriginal')}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

export default PlanHomeComponent
