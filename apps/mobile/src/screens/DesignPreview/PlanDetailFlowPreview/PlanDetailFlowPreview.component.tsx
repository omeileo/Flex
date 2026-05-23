import React, { useCallback, useState } from 'react'

import { Pressable, ScrollView, Text, View } from 'react-native'

import { workoutModalityColors } from '@shared/types/workoutModality.types'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import CoachNote from '@shared/components/CoachNote/CoachNote.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import {
  planBlurb,
  planDayExercises,
  planDayWarmUp,
  planPhases,
  planProgramTitle,
  planWeekDays
} from '../designPreviewMock.data'
import styles from './PlanDetailFlowPreview.styles'
import { PlanDetailFlowPreviewComponentProps, PlanDetailView } from './PlanDetailFlowPreview.types'

const previewViews: Array<{ key: PlanDetailView; label: string }> = [
  { key: 'program', label: 'Program' },
  { key: 'phase', label: 'Phase' },
  { key: 'week', label: 'Week' },
  { key: 'day', label: 'Day' },
  { key: 'exercise', label: 'Exercise' }
]

const PlanDetailFlowPreviewComponent = ({ initialView = 'program' }: PlanDetailFlowPreviewComponentProps) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [activeView, setActiveView] = useState<PlanDetailView>(initialView)

  const handleViewChip = useCallback((key: PlanDetailView) => {
    setActiveView(key)
  }, [])

  const renderProgram = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerMeta}>←</Text>
        <Text style={styles.headerTitle}>{planProgramTitle}</Text>
        <Text style={styles.headerMeta}>⋯</Text>
      </View>

      <View style={styles.blurbCard}>
        <Text style={styles.blurbLabel}>{t('designPreview.planDetail.coachLabel')}</Text>
        <Text style={styles.blurbText}>{planBlurb}</Text>
      </View>

      <Text style={styles.metaRow}>{t('designPreview.planDetail.programMeta')}</Text>
      <Text style={styles.sectionLabel}>{t('designPreview.planDetail.phasesLabel')}</Text>

      {planPhases.map((phase, index) => (
        <View key={phase.id} style={[styles.phaseCard, index === 0 && styles.phaseCardActive]}>
          <Text style={styles.phaseTitle}>{phase.name}</Text>
          <Text style={styles.phaseSub}>
            {phase.weeks} · {phase.rpe}
          </Text>
        </View>
      ))}

      <Text style={styles.metaRow}>{t('designPreview.planDetail.deloadNote')}</Text>
      <PrimaryButton label={t('designPreview.planDetail.jumpToWeek')} onPress={() => undefined} />
    </>
  )

  const renderPhase = () => {
    const phase = planPhases[0]

    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerMeta}>←</Text>
          <Text style={styles.headerTitle}>{phase.name} Phase</Text>
          <Text style={styles.headerMeta}>W1–4</Text>
        </View>

        <View style={styles.blurbCard}>
          <Text style={styles.blurbLabel}>{t('designPreview.planDetail.goalLabel')}</Text>
          <Text style={styles.blurbText}>{phase.goal}</Text>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('designPreview.planDetail.intensityLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.rpe}</Text>
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('designPreview.planDetail.progressionLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.progression}</Text>
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('designPreview.planDetail.restCompoundsLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.restCompounds}</Text>
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleLabel}>{t('designPreview.planDetail.restAccessoriesLabel')}</Text>
          <Text style={styles.ruleValue}>{phase.restAccessories}</Text>
        </View>

        <Text style={styles.sectionLabel}>{t('designPreview.planDetail.splitLabel')}</Text>
        {planWeekDays
          .filter((day) => day.modality === 'strength')
          .map((day) => (
            <Text key={day.id} style={styles.warmUpItem}>
              {day.dayLabel} — {day.title}
            </Text>
          ))}

        <View style={styles.runCard}>
          <Text style={styles.runLabel}>{t('designPreview.planDetail.runningLabel')}</Text>
          <Text style={styles.blurbText}>{t('designPreview.planDetail.runningCopy')}</Text>
        </View>
      </>
    )
  }

  const renderWeek = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerMeta}>‹</Text>
        <Text style={styles.headerTitle}>{t('designPreview.planDetail.weekTitle', { week: 1 })}</Text>
        <Text style={styles.headerMeta}>›</Text>
      </View>

      <Text style={styles.phaseSub}>{t('designPreview.planDetail.weekPhaseTag')}</Text>

      {planWeekDays.map((day) => (
        <View key={day.id} style={styles.dayCard}>
          <View style={styles.dayTop}>
            <Text style={styles.dayLabel}>{day.dayLabel}</Text>
            <Text style={styles.headerMeta}>›</Text>
          </View>
          <Text style={styles.dayTitle}>{day.title}</Text>
          <Text style={styles.dayPreview}>{day.preview}</Text>
        </View>
      ))}
    </>
  )

  const renderDay = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerMeta}>←</Text>
        <Text style={styles.headerTitle}>{t('designPreview.planDetail.dayTitle')}</Text>
        <Text style={styles.headerMeta}>⋯</Text>
      </View>

      <Text style={styles.metaRow}>{t('designPreview.planDetail.dayMeta')}</Text>

      <Text style={styles.sectionLabel}>{t('designPreview.planDetail.warmUpLabel')}</Text>
      <View style={styles.warmUpSection}>
        {planDayWarmUp.map((item) => (
          <Text key={item} style={styles.warmUpItem}>
            {item}
          </Text>
        ))}
      </View>

      <Text style={styles.sectionLabel}>{t('designPreview.planDetail.mainWorkLabel')}</Text>
      {planDayExercises.map((exercise) => (
        <View key={exercise.id} style={styles.exerciseRow}>
          <View style={[styles.modalityBar, { backgroundColor: workoutModalityColors[exercise.modality] }]} />
          <View>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseRx}>{exercise.prescription}</Text>
          </View>
        </View>
      ))}

      <CoachNote message={t('designPreview.planDetail.dayCoach')} />

      <View style={styles.footer}>
        <PrimaryButton label={t('designPreview.trainingPlan.startWorkout')} onPress={() => undefined} />
      </View>
    </>
  )

  const renderExercise = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerMeta}>←</Text>
        <Text style={styles.headerTitle}>Standing Barbell OHP</Text>
        <Text style={styles.headerMeta}>⋯</Text>
      </View>

      <View style={styles.videoPlaceholder}>
        <Text style={styles.headerMeta}>▶</Text>
      </View>

      <Text style={styles.sectionLabel}>{t('designPreview.planDetail.prescriptionLabel')}</Text>
      <Text style={styles.prescription}>3×5–8 · RIR 2–3</Text>
      <Text style={styles.metaRow}>{t('designPreview.planDetail.lastSession')}</Text>

      <View style={styles.instructionCard}>
        <Text style={styles.sectionLabel}>{t('designPreview.planDetail.instructionsLabel')}</Text>
        <Text style={styles.blurbText}>{t('designPreview.planDetail.exerciseInstructions')}</Text>
      </View>

      <View style={[styles.blurbCard, styles.footer]}>
        <Text style={styles.blurbLabel}>{t('designPreview.planDetail.injuryNoteLabel')}</Text>
        <Text style={styles.blurbText}>{t('designPreview.planDetail.injuryNote')}</Text>
      </View>
    </>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.viewSwitcher}>
          {previewViews.map((view) => {
            const isActive = activeView === view.key

            return (
              <Pressable
                key={view.key}
                style={[styles.viewChip, isActive && styles.viewChipActive]}
                onPress={() => handleViewChip(view.key)}
              >
                <Text style={[styles.viewChipText, isActive && styles.viewChipTextActive]}>{view.label}</Text>
              </Pressable>
            )
          })}
        </View>

        {activeView === 'program' ? renderProgram() : null}
        {activeView === 'phase' ? renderPhase() : null}
        {activeView === 'week' ? renderWeek() : null}
        {activeView === 'day' ? renderDay() : null}
        {activeView === 'exercise' ? renderExercise() : null}
      </ScrollView>
    </View>
  )
}

export default PlanDetailFlowPreviewComponent
