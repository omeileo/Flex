import React, { useCallback, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CoachNote from '@shared/components/CoachNote/CoachNote.component';
import ExerciseSwapSheet from '@shared/components/ExerciseSwapSheet/ExerciseSwapSheet.component';
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component';
import RestTimerBar from '@shared/components/RestTimerBar/RestTimerBar.component';
import SetRow from '@shared/components/SetRow/SetRow.component';
import { SetRowStatus } from '@shared/components/SetRow/SetRow.types';

import {
  activeWorkoutExerciseMenu,
  activeWorkoutPreviewExercises,
  activeWorkoutSwapChips,
  activeWorkoutSwapOptions,
} from '../designPreviewMock.data';
import styles, {
  containerWithInset,
  outcomeLayoutWithInset,
} from './ActiveWorkoutFlowPreview.styles';
import {
  ActiveWorkoutFlowPreviewComponentProps,
  ActiveWorkoutView,
} from './ActiveWorkoutFlowPreview.types';

const previewViews: Array<{
  key: ActiveWorkoutView | 'cancel';
  label: string;
}> = [
  { key: 'preStart', label: 'Pre-start' },
  { key: 'active', label: 'Active' },
  { key: 'rest', label: 'Rest' },
  { key: 'paused', label: 'Paused' },
  { key: 'exerciseMenu', label: 'Menu' },
  { key: 'swap', label: 'Swap' },
  { key: 'finishSheet', label: 'Finish' },
  { key: 'save', label: 'Save' },
  { key: 'saved', label: 'Saved' },
  { key: 'cancel', label: 'Cancel' },
];

const defaultSets: Array<{
  setNumber: number;
  reps: number;
  weightKg: number;
  status: SetRowStatus;
  previousLabel: string;
}> = [
  {
    setNumber: 1,
    reps: 8,
    weightKg: 40,
    status: 'completed',
    previousLabel: '8×38',
  },
  {
    setNumber: 2,
    reps: 8,
    weightKg: 40,
    status: 'active',
    previousLabel: '8×38',
  },
  {
    setNumber: 3,
    reps: 8,
    weightKg: 40,
    status: 'pending',
    previousLabel: '8×38',
  },
];

const ActiveWorkoutFlowPreviewComponent = ({
  initialView = 'active',
}: ActiveWorkoutFlowPreviewComponentProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeView, setActiveView] = useState<ActiveWorkoutView>(initialView);
  const [restSeconds, setRestSeconds] = useState(88);
  const [cancelOpen, setCancelOpen] = useState(false);

  const showRestOverlay = activeView === 'rest';
  const showPausedOverlay = activeView === 'paused';
  const showFinishSheet = activeView === 'finishSheet';
  const showCancelOverlay = activeView === 'cancel' || cancelOpen;

  const handleViewChip = useCallback((key: ActiveWorkoutView | 'cancel') => {
    if (key === 'cancel') {
      setCancelOpen(true);

      return;
    }

    setCancelOpen(false);
    setActiveView(key);
  }, []);

  const handleRestAdjust = useCallback((delta: number) => {
    setRestSeconds(current => Math.max(0, current + delta));
  }, []);

  const renderPreStart = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerMeta}>←</Text>
        <Text style={styles.headerTitle}>
          {t('designPreview.activeWorkout.workoutTitle')}
        </Text>
        <Text style={styles.headerMeta}>⋯</Text>
      </View>

      <Text style={styles.metaRow}>
        {t('designPreview.activeWorkout.preStartMeta')}
      </Text>
      <CoachNote message={t('designPreview.activeWorkout.preStartCoach')} />

      {activeWorkoutPreviewExercises.map(exercise => (
        <View key={exercise.id} style={styles.exerciseRow}>
          <View style={styles.modalityBar} />
          <View>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseRx}>{exercise.prescription}</Text>
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <PrimaryButton
          label={t('designPreview.activeWorkout.beginWorkout')}
          onPress={() => setActiveView('active')}
        />
        <Pressable onPress={() => undefined}>
          <Text style={[styles.headerMeta, styles.headerMetaCenter]}>
            {t('designPreview.activeWorkout.notNow')}
          </Text>
        </Pressable>
      </View>
    </>
  );

  const renderActive = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>18:42</Text>
        <View style={styles.headerActionsRow}>
          <Pressable
            style={styles.headerPill}
            onPress={() => setActiveView('paused')}
          >
            <Text style={styles.headerPillText}>
              {t('designPreview.activeWorkout.pause')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.headerPill, styles.headerPillDark]}
            onPress={() => setActiveView('finishSheet')}
          >
            <Text style={[styles.headerPillText, styles.headerPillTextLight]}>
              {t('designPreview.activeWorkout.finish')}
            </Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.progressLabel}>
        {t('designPreview.activeWorkout.exerciseProgress', {
          current: 2,
          total: 6,
        })}
      </Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressSegment, styles.progressDone]} />
        <View style={[styles.progressSegment, styles.progressCurrent]} />
        <View style={styles.progressSegment} />
        <View style={styles.progressSegment} />
      </View>

      <Text style={styles.sectionTitle}>Barbell Squat</Text>
      <Text style={styles.prescription}>3 × 8–10 @ 40 kg</Text>

      <View style={styles.videoPlaceholder}>
        <Text style={styles.headerMeta}>
          ▶ {t('designPreview.activeWorkout.video')}
        </Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell} />
        <Text style={styles.tableHeaderCell}>Set</Text>
        <Text style={styles.tableHeaderCell}>Prev</Text>
        <Text style={styles.tableHeaderCell}>Reps</Text>
        <Text style={styles.tableHeaderCell}>kg</Text>
      </View>

      {defaultSets.map(set => (
        <SetRow
          key={set.setNumber}
          setNumber={set.setNumber}
          previousLabel={set.previousLabel}
          reps={set.reps}
          weightKg={set.weightKg}
          status={set.status}
          onPress={
            set.status === 'active' ? () => setActiveView('rest') : undefined
          }
        />
      ))}

      <PrimaryButton
        label={t('designPreview.activeWorkout.logSet', { set: 2 })}
        onPress={() => setActiveView('rest')}
        style={styles.logSetButton}
      />

      <View style={styles.navRow}>
        <Text style={styles.headerMeta}>
          {t('designPreview.activeWorkout.prevExercise')}
        </Text>
        <PrimaryButton
          label={t('designPreview.activeWorkout.nextExercise')}
          onPress={() => undefined}
        />
      </View>
    </>
  );

  const renderExerciseMenu = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerMeta}>←</Text>
        <Text style={styles.headerTitle}>Barbell Squat</Text>
        <Pressable onPress={() => setActiveView('swap')}>
          <Text style={styles.headerMeta}>⋯</Text>
        </Pressable>
      </View>

      {activeWorkoutExerciseMenu.map(item => (
        <Pressable
          key={item}
          style={styles.menuItem}
          onPress={
            item.includes('Replace') ? () => setActiveView('swap') : undefined
          }
        >
          <Text style={styles.menuItemText}>{item}</Text>
        </Pressable>
      ))}

      <Text style={[styles.headerMeta, styles.headerMetaSpaced]}>
        {t('designPreview.activeWorkout.addNote')}
      </Text>
      <PrimaryButton
        label={t('designPreview.activeWorkout.done')}
        onPress={() => setActiveView('active')}
      />
    </>
  );

  const renderSave = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerMeta}>
          {t('designPreview.activeWorkout.resume')}
        </Text>
        <Text style={styles.headerTitle}>
          {t('designPreview.activeWorkout.saveTitle')}
        </Text>
        <View style={[styles.headerPill, styles.headerPillDark]}>
          <Text style={[styles.headerPillText, styles.headerPillTextLight]}>
            {t('designPreview.activeWorkout.save')}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        {t('designPreview.activeWorkout.workoutTitle')}
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>
            {t('designPreview.activeWorkout.duration')}
          </Text>
          <Text style={styles.statValue}>42:18</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>
            {t('designPreview.activeWorkout.volume')}
          </Text>
          <Text style={styles.statValue}>4,280 kg</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>
            {t('designPreview.activeWorkout.sets')}
          </Text>
          <Text style={styles.statValue}>14</Text>
        </View>
      </View>

      <Text style={[styles.statLabel, styles.statLabelSpaced]}>
        {t('designPreview.activeWorkout.exercisesLabel')}
      </Text>
      <Text style={styles.saveExerciseName}>Barbell Squat</Text>
      <Text style={styles.saveExerciseData}>8×40 kg, 8×42 kg, 8×42 kg</Text>
      <Text style={styles.saveExerciseName}>Romanian Deadlift</Text>
      <Text style={styles.saveExerciseData}>10×60 kg, 10×60 kg</Text>

      <View style={styles.notesBox}>
        <Text style={styles.notesPlaceholder}>
          {t('designPreview.activeWorkout.privateNotes')}
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.secondaryOutline}
          onPress={() => setActiveView('discarded')}
        >
          <Text style={styles.secondaryOutlineLabel}>
            {t('designPreview.activeWorkout.discardWorkout')}
          </Text>
        </Pressable>
        <PrimaryButton
          label={t('designPreview.activeWorkout.saveWorkout')}
          onPress={() => setActiveView('saved')}
        />
      </View>
    </>
  );

  const renderSaved = () => (
    <View style={outcomeLayoutWithInset(spacingBottom(insets.bottom))}>
      <View>
        <View style={styles.successIcon}>
          <Text style={styles.successCheck}>✓</Text>
        </View>
        <Text style={styles.centeredTitle}>
          {t('designPreview.activeWorkout.savedTitle')}
        </Text>
        <Text style={styles.centeredMeta}>
          {t('designPreview.activeWorkout.savedMeta')}
        </Text>
      </View>
      <PrimaryButton
        label={t('designPreview.activeWorkout.done')}
        onPress={() => setActiveView('preStart')}
      />
    </View>
  );

  const renderDiscarded = () => (
    <View style={outcomeLayoutWithInset(spacingBottom(insets.bottom))}>
      <View style={styles.discardedContentTop}>
        <Text style={styles.centeredTitle}>
          {t('designPreview.activeWorkout.discardedTitle')}
        </Text>
        <Text style={styles.centeredMeta}>
          {t('designPreview.activeWorkout.discardedMeta')}
        </Text>
      </View>
      <PrimaryButton
        label={t('designPreview.activeWorkout.backToToday')}
        onPress={() => setActiveView('preStart')}
      />
    </View>
  );

  const body = useMemo(() => {
    if (activeView === 'preStart') {
      return renderPreStart();
    }

    if (activeView === 'active' || activeView === 'rest') {
      return renderActive();
    }

    if (activeView === 'exerciseMenu') {
      return renderExerciseMenu();
    }

    if (activeView === 'swap') {
      return (
        <ExerciseSwapSheet
          options={activeWorkoutSwapOptions}
          filterChips={activeWorkoutSwapChips}
          onSelect={() => setActiveView('active')}
          onCancel={() => setActiveView('active')}
        />
      );
    }

    if (activeView === 'save') {
      return renderSave();
    }

    if (activeView === 'saved') {
      return renderSaved();
    }

    if (activeView === 'discarded') {
      return renderDiscarded();
    }

    return renderActive();
  }, [activeView, restSeconds, t]);

  return (
    <View style={[styles.container, containerWithInset(insets.top)]}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.viewSwitcher}>
          {previewViews.map(view => {
            const isActive =
              view.key === 'cancel'
                ? showCancelOverlay
                : activeView === view.key;

            return (
              <Pressable
                key={view.key}
                style={[styles.viewChip, isActive && styles.viewChipActive]}
                onPress={() => handleViewChip(view.key)}
              >
                <Text
                  style={[
                    styles.viewChipText,
                    isActive && styles.viewChipTextActive,
                  ]}
                >
                  {view.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {body}
      </ScrollView>

      {showRestOverlay ? (
        <View style={styles.overlay}>
          <RestTimerBar
            secondsRemaining={restSeconds}
            nextSetLabel={t('designPreview.activeWorkout.nextSetPreview')}
            onSkip={() => setActiveView('active')}
            onAdjust={handleRestAdjust}
          />
        </View>
      ) : null}

      <Modal
        visible={showPausedOverlay}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveView('active')}
      >
        <Pressable
          style={styles.overlayCenter}
          onPress={() => setActiveView('active')}
        >
          <Pressable
            style={styles.pauseCard}
            onPress={event => event.stopPropagation()}
          >
            <Text style={styles.pauseTitle}>
              {t('designPreview.activeWorkout.pausedTitle')}
            </Text>
            <Text style={styles.pauseMeta}>
              {t('designPreview.activeWorkout.pausedMeta')}
            </Text>
            <PrimaryButton
              label={t('designPreview.activeWorkout.resume')}
              onPress={() => setActiveView('active')}
            />
            <PrimaryButton
              label={t('designPreview.activeWorkout.finishWorkout')}
              onPress={() => setActiveView('finishSheet')}
            />
            <Pressable onPress={() => setCancelOpen(true)}>
              <Text style={styles.destructiveText}>
                {t('designPreview.activeWorkout.cancelWorkout')}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showFinishSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveView('active')}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setActiveView('active')}
        >
          <Pressable
            style={styles.sheet}
            onPress={event => event.stopPropagation()}
          >
            <Text style={styles.sheetTitle}>
              {t('designPreview.activeWorkout.finishTitle')}
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>
                  {t('designPreview.activeWorkout.duration')}
                </Text>
                <Text style={styles.statValue}>42:18</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>
                  {t('designPreview.activeWorkout.volume')}
                </Text>
                <Text style={styles.statValue}>4,280 kg</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>
                  {t('designPreview.activeWorkout.sets')}
                </Text>
                <Text style={styles.statValue}>14</Text>
              </View>
            </View>
            <View style={styles.headerPillRow}>
              <Pressable
                style={[styles.headerPill, styles.headerPillFlex]}
                onPress={() => setActiveView('active')}
              >
                <Text
                  style={[styles.headerPillText, styles.headerPillTextCenter]}
                >
                  {t('designPreview.activeWorkout.resume')}
                </Text>
              </Pressable>
              <View style={styles.flexOne}>
                <PrimaryButton
                  label={t('designPreview.activeWorkout.reviewSave')}
                  onPress={() => setActiveView('save')}
                />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showCancelOverlay}
        transparent
        animationType="fade"
        onRequestClose={() => setCancelOpen(false)}
      >
        <Pressable
          style={styles.overlayCenter}
          onPress={() => setCancelOpen(false)}
        >
          <Pressable
            style={styles.alertCard}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.alertBody}>
              <Text style={styles.alertTitle}>
                {t('designPreview.activeWorkout.discardTitle')}
              </Text>
              <Text style={styles.alertCopy}>
                {t('designPreview.activeWorkout.discardCopy')}
              </Text>
            </View>
            <View style={styles.alertActions}>
              <Pressable
                style={styles.alertAction}
                onPress={() => setCancelOpen(false)}
              >
                <Text style={styles.alertActionText}>
                  {t('designPreview.activeWorkout.keepGoing')}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.alertAction, styles.alertActionLast]}
                onPress={() => {
                  setCancelOpen(false);
                  setActiveView('discarded');
                }}
              >
                <Text style={[styles.alertActionText, styles.alertDestructive]}>
                  {t('designPreview.activeWorkout.discard')}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const spacingBottom = (inset: number) => Math.max(inset, 24);

export default ActiveWorkoutFlowPreviewComponent;
