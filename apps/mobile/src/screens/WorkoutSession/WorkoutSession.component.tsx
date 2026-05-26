import React from 'react'

import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import ExerciseSwapSheet from '@shared/components/ExerciseSwapSheet/ExerciseSwapSheet.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import RestTimerBar from '@shared/components/RestTimerBar/RestTimerBar.component'
import SetRow from '@shared/components/SetRow/SetRow.component'

import { exerciseMenuActions } from './WorkoutSession.dictionary'
import { formatExerciseLogSummary } from './WorkoutSession.functions'
import { createWorkoutSessionStyles } from './WorkoutSession.styles'
import { WorkoutSessionComponentProps } from './WorkoutSession.types'

const WorkoutSessionComponent = ({
  workoutName,
  editableWorkoutName,
  privateNotes,
  exercises,
  phase,
  activeExerciseIndex,
  elapsedLabel,
  restSeconds,
  volumeLabel,
  completedSets,
  swapOptions,
  swapFilterChips,
  discardConfirmOpen,
  isSubmitting,
  error,
  onWorkoutNameChange,
  onPrivateNotesChange,
  onBegin,
  onNotNow,
  onPause,
  onResume,
  onOpenExerciseMenu,
  onExerciseMenuAction,
  onSwapSelect,
  onSwapCancel,
  onLogSet,
  onSkipRest,
  onAdjustRest,
  onPreviousExercise,
  onNextExercise,
  onFinish,
  onReviewSave,
  onSave,
  onDiscardRequest,
  onDiscardConfirm,
  onDiscardCancel,
  onDone,
  onBackToToday
}: WorkoutSessionComponentProps) => {
  const styles = useThemedStyles(createWorkoutSessionStyles)
  const { t } = useTranslation()
  const activeExercise = exercises[activeExerciseIndex]
  const activeSetIndex = activeExercise?.sets.findIndex((set) => set.status === 'active') ?? -1
  const showActiveUnderlay = phase === 'active' || phase === 'rest' || phase === 'paused' || phase === 'finishSheet'

  const renderPreStart = () => (
    <View testID="workout-session-prestart">
      <View style={styles.heroBand}>
        <Text style={styles.heroTitle}>{workoutName}</Text>
        <Text style={styles.heroMeta}>
          {t('workoutSession.preStartMeta', { count: exercises.length, minutes: exercises.length * 12 })}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {exercises.map((exercise) => (
          <View key={exercise.exerciseId} style={styles.exerciseRow}>
            <View style={styles.modalityBar} />
            <View>
              <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
              <Text style={styles.exerciseRx}>{exercise.prescription}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton
          label={isSubmitting ? t('workoutSession.starting') : t('workoutSession.beginWorkout')}
          onPress={onBegin}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
        <Pressable onPress={onNotNow}>
          <Text style={[styles.prescription, styles.notNow]}>{t('workoutSession.notNow')}</Text>
        </Pressable>
      </View>
    </View>
  )

  const renderActive = () => (
    <View testID="workout-session-active">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <Text style={styles.timer}>{elapsedLabel}</Text>
          <View style={styles.headerActionsRow}>
            <Pressable style={styles.headerPill} onPress={onPause} testID="workout-session-pause">
              <Text style={styles.headerPillText}>{t('workoutSession.pause')}</Text>
            </Pressable>
            <Pressable
              style={[styles.headerPill, styles.headerPillDark]}
              onPress={onFinish}
              testID="workout-session-finish"
            >
              <Text style={[styles.headerPillText, styles.headerPillTextLight]}>{t('workoutSession.finish')}</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.progressLabel}>
          {t('workoutSession.exerciseProgress', {
            current: activeExerciseIndex + 1,
            total: exercises.length
          })}
        </Text>

        <View style={styles.progressTrack}>
          {exercises.map((_, index) => (
            <View
              key={`segment-${index}`}
              style={[
                styles.progressSegment,
                index < activeExerciseIndex && styles.progressDone,
                index === activeExerciseIndex && styles.progressCurrent
              ]}
            />
          ))}
        </View>

        {activeExercise ? (
          <>
            <View style={styles.menuHeader}>
              <Text style={styles.sectionTitle}>{activeExercise.exerciseName}</Text>
              <Pressable
                style={styles.exerciseMenuButton}
                onPress={onOpenExerciseMenu}
                testID="workout-session-exercise-menu"
              >
                <Text style={styles.headerMeta}>⋯</Text>
              </Pressable>
            </View>
            <Text style={styles.prescription}>{activeExercise.prescription}</Text>

            <View style={styles.videoPlaceholder}>
              <Text style={styles.headerMeta}>▶ {t('workoutSession.video')}</Text>
            </View>

            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell} />
              <Text style={styles.tableHeaderCell}>Set</Text>
              <Text style={styles.tableHeaderCell}>Prev</Text>
              <Text style={styles.tableHeaderCell}>Reps</Text>
              <Text style={styles.tableHeaderCell}>kg</Text>
            </View>

            {activeExercise.sets.map((set, setIndex) => (
              <SetRow
                key={`${activeExercise.exerciseId}-${set.setNumber}`}
                setNumber={set.setNumber}
                previousLabel={set.previousLabel}
                reps={set.reps}
                weightKg={set.weightKg}
                status={set.status}
                onPress={set.status === 'active' ? () => onLogSet(activeExerciseIndex, setIndex) : undefined}
              />
            ))}

            {activeSetIndex >= 0 ? (
              <PrimaryButton
                label={t('workoutSession.logSet', { set: activeExercise.sets[activeSetIndex]?.setNumber ?? 1 })}
                onPress={() => onLogSet(activeExerciseIndex, activeSetIndex)}
                style={styles.logSetButton}
              />
            ) : null}
          </>
        ) : null}

        <View style={styles.navRow}>
          <Pressable onPress={onPreviousExercise} disabled={activeExerciseIndex === 0}>
            <Text style={styles.headerMeta}>{t('workoutSession.prevExercise')}</Text>
          </Pressable>
          <PrimaryButton label={t('workoutSession.nextExercise')} onPress={onNextExercise} />
        </View>
      </ScrollView>
    </View>
  )

  const renderExerciseMenu = () => (
    <View testID="workout-session-exercise-menu-screen">
      <View style={styles.menuHeader}>
        <Pressable onPress={() => onExerciseMenuAction('done')}>
          <Text style={styles.headerMeta}>←</Text>
        </Pressable>
        <Text style={styles.saveHeaderTitle}>{activeExercise?.exerciseName ?? workoutName}</Text>
        <View style={styles.exerciseMenuButton} />
      </View>

      {exerciseMenuActions.map((action) => (
        <Pressable
          key={action}
          style={styles.menuItem}
          onPress={() => onExerciseMenuAction(action)}
          testID={`workout-session-menu-${action}`}
        >
          <Text style={styles.menuItemText}>{t(`workoutSession.menu.${action}`)}</Text>
        </Pressable>
      ))}

      <Text style={[styles.headerMeta, styles.menuNoteHint]}>{t('workoutSession.addNote')}</Text>
      <PrimaryButton label={t('workoutSession.done')} onPress={() => onExerciseMenuAction('done')} />
    </View>
  )

  const renderSave = () => (
    <View testID="workout-session-save">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.saveHeader}>
          <Pressable onPress={onResume}>
            <Text style={styles.headerMeta}>{t('workoutSession.resume')}</Text>
          </Pressable>
          <Text style={styles.saveHeaderTitle}>{t('workoutSession.saveTitle')}</Text>
          <View style={styles.headerPill} />
        </View>

        <TextInput
          style={styles.workoutNameInput}
          value={editableWorkoutName}
          onChangeText={onWorkoutNameChange}
          testID="workout-session-name-input"
        />

        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>{t('workoutSession.duration')}</Text>
            <Text style={styles.statValue}>{elapsedLabel}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>{t('workoutSession.volume')}</Text>
            <Text style={styles.statValue}>{volumeLabel}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>{t('workoutSession.sets')}</Text>
            <Text style={styles.statValue}>{completedSets}</Text>
          </View>
        </View>

        <Text style={[styles.statLabel, styles.statLabelSpaced]}>{t('workoutSession.exercisesLabel')}</Text>
        {exercises.map((exercise) => {
          const summary = formatExerciseLogSummary(exercise)

          if (!summary) {
            return null
          }

          return (
            <View key={exercise.exerciseId}>
              <Text style={styles.saveExerciseName}>{exercise.exerciseName}</Text>
              <Text style={styles.saveExerciseData}>{summary}</Text>
            </View>
          )
        })}

        <View style={styles.notesBox}>
          <TextInput
            style={styles.notesInput}
            value={privateNotes}
            onChangeText={onPrivateNotesChange}
            placeholder={t('workoutSession.privateNotes')}
            placeholderTextColor={styles.notesPlaceholder.color}
            multiline
            testID="workout-session-notes-input"
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.secondaryOutline} onPress={onDiscardRequest} testID="workout-session-discard">
          <Text style={styles.secondaryOutlineLabel}>{t('workoutSession.discardWorkout')}</Text>
        </Pressable>
        <PrimaryButton
          label={isSubmitting ? t('workoutSession.completing') : t('workoutSession.saveWorkout')}
          onPress={onSave}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </View>
    </View>
  )

  const renderSaved = () => (
    <View style={styles.successWrap} testID="workout-session-saved">
      <View style={styles.successIcon}>
        <Text style={styles.successCheck}>✓</Text>
      </View>
      <Text style={styles.successTitle}>{t('workoutSession.savedTitle')}</Text>
      <Text style={styles.successMeta}>
        {t('workoutSession.savedMeta', { duration: elapsedLabel, volume: volumeLabel, sets: completedSets })}
      </Text>
      <PrimaryButton label={t('workoutSession.done')} onPress={onDone} />
    </View>
  )

  const renderDiscarded = () => (
    <View style={styles.outcomeLayout} testID="workout-session-discarded">
      <View style={[styles.outcomeContent, styles.discardedContentTop]}>
        <Text style={styles.successTitle}>{t('workoutSession.discardedTitle')}</Text>
        <Text style={styles.successMeta}>{t('workoutSession.discardedMeta')}</Text>
      </View>
      <PrimaryButton label={t('workoutSession.backToToday')} onPress={onBackToToday} />
    </View>
  )

  const renderBody = () => {
    if (phase === 'preStart') {
      return renderPreStart()
    }

    if (phase === 'exerciseMenu') {
      return renderExerciseMenu()
    }

    if (phase === 'swap') {
      return (
        <ExerciseSwapSheet
          options={swapOptions}
          filterChips={swapFilterChips}
          onSelect={onSwapSelect}
          onCancel={onSwapCancel}
        />
      )
    }

    if (phase === 'save') {
      return renderSave()
    }

    if (phase === 'saved') {
      return renderSaved()
    }

    if (phase === 'discarded') {
      return renderDiscarded()
    }

    if (showActiveUnderlay) {
      return renderActive()
    }

    return renderActive()
  }

  return (
    <View style={styles.container}>
      {renderBody()}

      <Modal visible={phase === 'rest'} transparent animationType="fade">
        <View style={styles.overlay} testID="workout-session-rest">
          <RestTimerBar
            secondsRemaining={restSeconds}
            nextSetLabel={t('workoutSession.nextSetPreview')}
            onSkip={onSkipRest}
            onAdjust={onAdjustRest}
          />
        </View>
      </Modal>

      <Modal visible={phase === 'paused'} transparent animationType="fade" onRequestClose={onResume}>
        <Pressable style={styles.overlayCenter} onPress={onResume}>
          <Pressable style={styles.pauseCard} onPress={() => undefined} testID="workout-session-paused">
            <Text style={styles.pauseTitle}>{t('workoutSession.pausedTitle')}</Text>
            <Text style={styles.pauseMeta}>{t('workoutSession.pausedMeta', { elapsed: elapsedLabel })}</Text>
            <PrimaryButton label={t('workoutSession.resume')} onPress={onResume} />
            <PrimaryButton label={t('workoutSession.finishWorkout')} onPress={onFinish} />
            <Pressable onPress={onDiscardRequest}>
              <Text style={styles.destructiveText}>{t('workoutSession.cancelWorkout')}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={phase === 'finishSheet'} transparent animationType="slide" onRequestClose={onResume}>
        <Pressable style={styles.overlay} onPress={onResume}>
          <View style={styles.sheet} testID="workout-session-finish-sheet">
            <Text style={styles.sheetTitle}>{t('workoutSession.finishTitle')}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>{t('workoutSession.duration')}</Text>
                <Text style={styles.statValue}>{elapsedLabel}</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>{t('workoutSession.volume')}</Text>
                <Text style={styles.statValue}>{volumeLabel}</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>{t('workoutSession.sets')}</Text>
                <Text style={styles.statValue}>{completedSets}</Text>
              </View>
            </View>
            <View style={styles.headerPillRow}>
              <Pressable style={[styles.headerPill, styles.headerPillFlex]} onPress={onResume}>
                <Text style={[styles.headerPillText, styles.headerPillTextCenter]}>{t('workoutSession.resume')}</Text>
              </Pressable>
              <View style={styles.flexOne}>
                <PrimaryButton label={t('workoutSession.reviewSave')} onPress={onReviewSave} />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={discardConfirmOpen} transparent animationType="fade" onRequestClose={onDiscardCancel}>
        <Pressable style={styles.overlayCenter} onPress={onDiscardCancel}>
          <View style={styles.alertCard} testID="workout-session-discard-confirm">
            <View style={styles.alertBody}>
              <Text style={styles.alertTitle}>{t('workoutSession.discardTitle')}</Text>
              <Text style={styles.alertCopy}>{t('workoutSession.discardCopy')}</Text>
            </View>
            <View style={styles.alertActions}>
              <Pressable style={styles.alertAction} onPress={onDiscardCancel}>
                <Text style={styles.alertActionText}>{t('workoutSession.keepGoing')}</Text>
              </Pressable>
              <Pressable style={[styles.alertAction, styles.alertActionLast]} onPress={onDiscardConfirm}>
                <Text style={[styles.alertActionText, styles.alertDestructive]}>{t('workoutSession.discard')}</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default WorkoutSessionComponent
