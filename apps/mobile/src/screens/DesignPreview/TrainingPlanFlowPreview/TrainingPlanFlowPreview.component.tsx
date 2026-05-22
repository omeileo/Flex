import React, { useCallback, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CoachNote from '@shared/components/CoachNote/CoachNote.component';
import PillTabBar from '@shared/components/PillTabBar/PillTabBar.component';
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component';
import WeekStrip from '@shared/components/WeekStrip/WeekStrip.component';
import WeekSummaryCard from '@shared/components/WeekSummaryCard/WeekSummaryCard.component';
import WorkoutCard from '@shared/components/WorkoutCard/WorkoutCard.component';
import { PillTabKey } from '@shared/components/PillTabBar/PillTabBar.types';
import { workoutModalityColors } from '@shared/types/workoutModality.types';

import { mockWeekPlans, pillTabs } from '../designPreviewMock.data';
import styles, {
  containerWithInset,
  floatingTabBar,
} from './TrainingPlanFlowPreview.styles';
import {
  TrainingPlanFlowPreviewComponentProps,
  TrainingPlanView,
} from './TrainingPlanFlowPreview.types';

const weekStripDays = [
  {
    key: 'mon',
    label: 'M',
    hasWorkout: true,
    workoutModalityColor: workoutModalityColors.strength,
  },
  { key: 'tue', label: 'T' },
  {
    key: 'wed',
    label: 'W',
    isToday: true,
    hasWorkout: true,
    workoutModalityColor: workoutModalityColors.energy,
  },
  { key: 'thu', label: 'T' },
  {
    key: 'fri',
    label: 'F',
    hasWorkout: true,
    workoutModalityColor: workoutModalityColors.mobility,
  },
  { key: 'sat', label: 'S' },
  { key: 'sun', label: 'S' },
];

const previewViews: Array<{ key: TrainingPlanView | 'adjust'; label: string }> =
  [
    { key: 'planOverview', label: 'Plan overview' },
    { key: 'today', label: 'Today' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'adjust', label: 'Adjust' },
  ];

const TrainingPlanFlowPreviewComponent = ({
  initialView = 'today',
}: TrainingPlanFlowPreviewComponentProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeView, setActiveView] = useState<TrainingPlanView>(initialView);
  const [activeTab, setActiveTab] = useState<PillTabKey>(
    initialView === 'planOverview' ? 'plan' : 'today',
  );
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weekSheetOpen, setWeekSheetOpen] = useState(false);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState<
    Record<string, boolean>
  >({});

  const currentWeek = useMemo(
    () =>
      mockWeekPlans.find(week => week.weekNumber === selectedWeek) ??
      mockWeekPlans[0],
    [selectedWeek],
  );

  const handleTabPress = useCallback((key: PillTabKey) => {
    setActiveTab(key);

    if (key === 'today') {
      setActiveView('today');
    }

    if (key === 'plan') {
      setActiveView('planOverview');
    }
  }, []);

  const handlePreviewChip = useCallback((key: TrainingPlanView | 'adjust') => {
    if (key === 'adjust') {
      setAdjustModalOpen(true);

      return;
    }

    setActiveView(key);
    setActiveTab(key === 'planOverview' ? 'plan' : 'today');
  }, []);

  const toggleWorkoutComplete = useCallback((id: string) => {
    setCompletedWorkouts(current => ({ ...current, [id]: !current[id] }));
  }, []);

  const renderPlanOverview = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('designPreview.trainingPlan.planTitle')}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </View>

      {mockWeekPlans.map(week => (
        <WeekSummaryCard
          key={week.weekNumber}
          weekNumber={week.weekNumber}
          dateRange={week.dateRange}
          workoutCount={week.workoutCount}
          totalVolume={week.totalVolume}
          workouts={week.workouts}
          isCurrent={week.isCurrent}
          onPress={() => {
            setSelectedWeek(week.weekNumber);
            setWeekSheetOpen(true);
          }}
        />
      ))}
    </>
  );

  const renderToday = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('designPreview.trainingPlan.weekProgress', {
            current: 2,
            total: 8,
          })}
        </Text>
        <Text style={styles.headerMeta}>○ 25%</Text>
      </View>

      <WeekStrip days={weekStripDays} />

      <Text style={styles.sectionTitle}>
        {t('designPreview.trainingPlan.todaysWorkouts')}
      </Text>

      {currentWeek.workouts.slice(0, 2).map(workout => (
        <WorkoutCard
          key={workout.id}
          title={workout.title}
          durationMinutes={workout.durationMinutes}
          modality={workout.modality}
          completed={completedWorkouts[workout.id]}
          onToggleComplete={() => toggleWorkoutComplete(workout.id)}
        />
      ))}

      <CoachNote message={t('designPreview.trainingPlan.todayCoach')} />
    </>
  );

  const renderWeekly = () => (
    <>
      <View style={styles.weekNav}>
        <Pressable
          style={styles.weekNavButton}
          onPress={() => setSelectedWeek(week => Math.max(1, week - 1))}
        >
          <Text style={styles.headerMeta}>‹</Text>
        </Pressable>
        <Text style={styles.weekNavLabel}>
          {t('designPreview.trainingPlan.planOverview')} · Week {selectedWeek}
        </Text>
        <Pressable
          style={styles.weekNavButton}
          onPress={() =>
            setSelectedWeek(week => Math.min(mockWeekPlans.length, week + 1))
          }
        >
          <Text style={styles.headerMeta}>›</Text>
        </Pressable>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${(selectedWeek / mockWeekPlans.length) * 100}%` },
          ]}
        />
      </View>

      <CoachNote message={t('designPreview.trainingPlan.weeklyCoach')} />

      {currentWeek.workouts.map(workout => (
        <WorkoutCard
          key={workout.id}
          title={workout.title}
          durationMinutes={workout.durationMinutes}
          dateLabel={currentWeek.dateRange}
          modality={workout.modality}
        />
      ))}

      <PrimaryButton
        label={t('designPreview.trainingPlan.goToCurrentWeek')}
        onPress={() => {
          setSelectedWeek(1);
          setActiveView('today');
          setActiveTab('today');
        }}
        style={styles.currentWeekButton}
      />
    </>
  );

  return (
    <View style={[styles.container, containerWithInset(insets.top)]}>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewSwitcher}>
            {previewViews.map(view => {
              const isActive =
                view.key === 'adjust'
                  ? adjustModalOpen
                  : activeView === view.key;

              return (
                <Pressable
                  key={view.key}
                  style={[styles.viewChip, isActive && styles.viewChipActive]}
                  onPress={() => handlePreviewChip(view.key)}
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

          {activeView === 'planOverview' ? renderPlanOverview() : null}
          {activeView === 'today' ? renderToday() : null}
          {activeView === 'weekly' ? renderWeekly() : null}
        </ScrollView>
      </View>

      {activeView === 'today' ? (
        <View style={styles.footerCta}>
          <PrimaryButton
            label={t('designPreview.trainingPlan.startWorkout')}
            onPress={() => undefined}
          />
        </View>
      ) : null}

      <View style={floatingTabBar(insets.bottom + 8)}>
        <PillTabBar
          tabs={pillTabs}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </View>

      <Modal
        visible={weekSheetOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setWeekSheetOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setWeekSheetOpen(false)}
        >
          <Pressable
            style={styles.sheet}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>
              {t('designPreview.trainingPlan.weekSheetTitle', {
                week: selectedWeek,
              })}
            </Text>
            <Text style={styles.sheetStats}>
              {currentWeek.workoutCount} workouts · {currentWeek.totalVolume}
            </Text>

            {currentWeek.workouts.map(workout => (
              <WorkoutCard
                key={workout.id}
                title={workout.title}
                durationMinutes={workout.durationMinutes}
                modality={workout.modality}
              />
            ))}

            <PrimaryButton
              label={t('designPreview.trainingPlan.viewFullWeek')}
              onPress={() => {
                setWeekSheetOpen(false);
                setActiveView('weekly');
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={adjustModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setAdjustModalOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setAdjustModalOpen(false)}
        >
          <Pressable
            style={styles.sheet}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.modalIcon}>
              <Text style={styles.modalIconText}>✨</Text>
            </View>
            <Text style={styles.modalHeadline}>
              {t('designPreview.trainingPlan.adjustTitle')}
            </Text>
            <Text style={styles.modalCopy}>
              {t('designPreview.trainingPlan.adjustCopy')}
            </Text>
            <PrimaryButton
              label={t('designPreview.trainingPlan.readaptPlan')}
              onPress={() => setAdjustModalOpen(false)}
            />
            <Pressable
              style={styles.secondaryButton}
              onPress={() => setAdjustModalOpen(false)}
            >
              <Text style={styles.secondaryButtonText}>
                {t('designPreview.trainingPlan.keepOriginal')}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default TrainingPlanFlowPreviewComponent;
