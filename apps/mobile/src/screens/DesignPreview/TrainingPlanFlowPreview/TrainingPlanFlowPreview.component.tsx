import React, { useCallback, useMemo, useState } from 'react'

import { Modal, Pressable, ScrollView, Text, View } from 'react-native'

import { PillTabKey } from '@shared/components/PillTabBar/PillTabBar.types'
import { workoutModalityColors } from '@shared/types/workoutModality.types'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import CoachNote from '@shared/components/CoachNote/CoachNote.component'
import PillTabBar from '@shared/components/PillTabBar/PillTabBar.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import WeekStrip from '@shared/components/WeekStrip/WeekStrip.component'
import WeekSummaryCard from '@shared/components/WeekSummaryCard/WeekSummaryCard.component'
import WorkoutCard from '@shared/components/WorkoutCard/WorkoutCard.component'

import {
  mockWeekPlans,
  pillTabs,
  planBlurb,
  planFocusOptions,
  planInputsRecap,
  planPhases,
  planProgramTitle
} from '../designPreviewMock.data'
import styles, { containerWithInset, floatingTabBar } from './TrainingPlanFlowPreview.styles'
import { TrainingPlanFlowPreviewComponentProps, TrainingPlanView } from './TrainingPlanFlowPreview.types'

const weekStripDays = [
  {
    key: 'mon',
    label: 'M',
    hasWorkout: true,
    workoutModalityColor: workoutModalityColors.strength
  },
  { key: 'tue', label: 'T' },
  {
    key: 'wed',
    label: 'W',
    isToday: true,
    hasWorkout: true,
    workoutModalityColor: workoutModalityColors.energy
  },
  { key: 'thu', label: 'T' },
  {
    key: 'fri',
    label: 'F',
    hasWorkout: true,
    workoutModalityColor: workoutModalityColors.mobility
  },
  { key: 'sat', label: 'S' },
  { key: 'sun', label: 'S' }
]

const previewViews: Array<{ key: TrainingPlanView | 'adjust'; label: string }> = [
  { key: 'empty', label: 'Empty' },
  { key: 'focus', label: 'Focus' },
  { key: 'chat', label: 'AI chat' },
  { key: 'recap', label: 'Recap' },
  { key: 'intro', label: 'Intro' },
  { key: 'planOverview', label: 'Plan overview' },
  { key: 'today', label: 'Today' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'adjust', label: 'Adjust' }
]

const TrainingPlanFlowPreviewComponent = ({ initialView = 'today' }: TrainingPlanFlowPreviewComponentProps) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const [activeView, setActiveView] = useState<TrainingPlanView>(initialView)
  const [activeTab, setActiveTab] = useState<PillTabKey>(initialView === 'planOverview' ? 'plan' : 'today')
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [weekSheetOpen, setWeekSheetOpen] = useState(false)
  const [adjustModalOpen, setAdjustModalOpen] = useState(false)
  const [completedWorkouts, setCompletedWorkouts] = useState<Record<string, boolean>>({})

  const currentWeek = useMemo(
    () => mockWeekPlans.find((week) => week.weekNumber === selectedWeek) ?? mockWeekPlans[0],
    [selectedWeek]
  )

  const handleTabPress = useCallback((key: PillTabKey) => {
    setActiveTab(key)

    if (key === 'today') {
      setActiveView('today')
    }

    if (key === 'plan') {
      setActiveView('planOverview')
    }
  }, [])

  const handlePreviewChip = useCallback((key: TrainingPlanView | 'adjust') => {
    if (key === 'adjust') {
      setAdjustModalOpen(true)

      return
    }

    setActiveView(key)

    if (key === 'planOverview' || key === 'intro') {
      setActiveTab('plan')

      return
    }

    if (key === 'today' || key === 'weekly') {
      setActiveTab('today')
    }
  }, [])

  const toggleWorkoutComplete = useCallback((id: string) => {
    setCompletedWorkouts((current) => ({ ...current, [id]: !current[id] }))
  }, [])

  const renderEmpty = () => (
    <>
      <Text style={styles.modalIconText}>📅</Text>
      <Text style={styles.modalHeadline}>{t('designPreview.trainingPlan.emptyTitle')}</Text>
      <Text style={styles.modalCopy}>{t('designPreview.trainingPlan.emptyCopy')}</Text>
      <PrimaryButton label={t('designPreview.trainingPlan.createPlan')} onPress={() => setActiveView('focus')} />
    </>
  )

  const renderFocus = () => (
    <>
      <Text style={styles.sectionTitle}>{t('designPreview.trainingPlan.focusTitle')}</Text>
      {planFocusOptions.map((option) => (
        <Pressable
          key={option.id}
          style={[styles.viewChip, option.id === 'hybrid' && styles.viewChipActive, styles.focusCard]}
        >
          <Text style={styles.sectionTitle}>{option.title}</Text>
          <Text style={styles.headerMeta}>{option.subtitle}</Text>
        </Pressable>
      ))}
      <PrimaryButton
        label={t('designPreview.trainingPlan.continue')}
        onPress={() => setActiveView('chat')}
        style={styles.currentWeekButton}
      />
    </>
  )

  const renderChat = () => (
    <>
      <Text style={styles.sectionTitle}>{t('designPreview.trainingPlan.chatTitle')}</Text>
      <CoachNote message={t('designPreview.trainingPlan.chatAgent')} />
      <View style={[styles.viewChip, styles.chatUserBubble]}>
        <Text style={styles.viewChipText}>{t('designPreview.trainingPlan.chatUser')}</Text>
      </View>
      <CoachNote message={t('designPreview.trainingPlan.chatReply')} />
      <PrimaryButton
        label={t('designPreview.trainingPlan.reviewInputs')}
        onPress={() => setActiveView('recap')}
        style={styles.currentWeekButton}
      />
    </>
  )

  const renderRecap = () => (
    <>
      <Text style={styles.sectionTitle}>{t('designPreview.trainingPlan.recapTitle')}</Text>
      <Text style={styles.headerTitle}>{planProgramTitle}</Text>
      <Text style={styles.headerMeta}>{t('designPreview.trainingPlan.recapStats')}</Text>
      {planInputsRecap.map((item) => (
        <Text key={item} style={[styles.headerMeta, styles.recapBullet]}>
          • {item}
        </Text>
      ))}
      <PrimaryButton
        label={t('designPreview.trainingPlan.generatePlan')}
        onPress={() => setActiveView('intro')}
        style={styles.currentWeekButton}
      />
    </>
  )

  const renderIntro = () => (
    <>
      <Text style={styles.sectionTitle}>{t('designPreview.trainingPlan.introTitle')}</Text>
      <CoachNote message={planBlurb} />
      <View style={styles.viewSwitcher}>
        {planPhases.map((phase) => (
          <View key={phase.id} style={styles.viewChip}>
            <Text style={styles.viewChipText}>{phase.name}</Text>
          </View>
        ))}
      </View>
      <PrimaryButton
        label={t('designPreview.trainingPlan.viewFullPlan')}
        onPress={() => setActiveView('planOverview')}
        style={styles.currentWeekButton}
      />
    </>
  )

  const renderPlanOverview = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('designPreview.trainingPlan.planTitle')}</Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </View>

      <CoachNote message={planBlurb} />

      <View style={styles.viewSwitcher}>
        {planPhases.map((phase, index) => (
          <View key={phase.id} style={[styles.viewChip, index === 0 && styles.viewChipActive]}>
            <Text style={[styles.viewChipText, index === 0 && styles.viewChipTextActive]}>{phase.name}</Text>
          </View>
        ))}
      </View>

      {mockWeekPlans.map((week) => (
        <WeekSummaryCard
          key={week.weekNumber}
          weekNumber={week.weekNumber}
          dateRange={week.dateRange}
          workoutCount={week.workoutCount}
          totalVolume={week.totalVolume}
          workouts={week.workouts}
          isCurrent={week.isCurrent}
          onPress={() => {
            setSelectedWeek(week.weekNumber)
            setWeekSheetOpen(true)
          }}
        />
      ))}
    </>
  )

  const renderToday = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('designPreview.trainingPlan.weekProgress', {
            current: 1,
            total: 12
          })}
        </Text>
        <Text style={styles.headerMeta}>○ 25%</Text>
      </View>

      <WeekStrip days={weekStripDays} />

      <Text style={styles.sectionTitle}>{t('designPreview.trainingPlan.todaysWorkouts')}</Text>

      {currentWeek.workouts.slice(0, 2).map((workout) => (
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
  )

  const renderWeekly = () => (
    <>
      <View style={styles.weekNav}>
        <Pressable style={styles.weekNavButton} onPress={() => setSelectedWeek((week) => Math.max(1, week - 1))}>
          <Text style={styles.headerMeta}>‹</Text>
        </Pressable>
        <Text style={styles.weekNavLabel}>
          {t('designPreview.trainingPlan.planOverview')} · Week {selectedWeek}
        </Text>
        <Pressable
          style={styles.weekNavButton}
          onPress={() => setSelectedWeek((week) => Math.min(mockWeekPlans.length, week + 1))}
        >
          <Text style={styles.headerMeta}>›</Text>
        </Pressable>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(selectedWeek / mockWeekPlans.length) * 100}%` }]} />
      </View>

      <CoachNote message={t('designPreview.trainingPlan.weeklyCoach')} />

      {currentWeek.workouts.map((workout) => (
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
          setSelectedWeek(1)
          setActiveView('today')
          setActiveTab('today')
        }}
        style={styles.currentWeekButton}
      />
    </>
  )

  return (
    <View style={[styles.container, containerWithInset(insets.top)]}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.viewSwitcher}>
            {previewViews.map((view) => {
              const isActive = view.key === 'adjust' ? adjustModalOpen : activeView === view.key

              return (
                <Pressable
                  key={view.key}
                  style={[styles.viewChip, isActive && styles.viewChipActive]}
                  onPress={() => handlePreviewChip(view.key)}
                >
                  <Text style={[styles.viewChipText, isActive && styles.viewChipTextActive]}>{view.label}</Text>
                </Pressable>
              )
            })}
          </View>

          {activeView === 'empty' ? renderEmpty() : null}
          {activeView === 'focus' ? renderFocus() : null}
          {activeView === 'chat' ? renderChat() : null}
          {activeView === 'recap' ? renderRecap() : null}
          {activeView === 'intro' ? renderIntro() : null}
          {activeView === 'planOverview' ? renderPlanOverview() : null}
          {activeView === 'today' ? renderToday() : null}
          {activeView === 'weekly' ? renderWeekly() : null}
        </ScrollView>
      </View>

      {activeView === 'today' ? (
        <View style={styles.footerCta}>
          <PrimaryButton label={t('designPreview.trainingPlan.startWorkout')} onPress={() => undefined} />
        </View>
      ) : null}

      {activeView !== 'empty' &&
      activeView !== 'focus' &&
      activeView !== 'chat' &&
      activeView !== 'recap' &&
      activeView !== 'generating' ? (
        <View style={floatingTabBar(insets.bottom + 8)}>
          <PillTabBar tabs={pillTabs} activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
      ) : null}

      <Modal visible={weekSheetOpen} transparent animationType="slide" onRequestClose={() => setWeekSheetOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setWeekSheetOpen(false)}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>
              {t('designPreview.trainingPlan.weekSheetTitle', {
                week: selectedWeek
              })}
            </Text>
            <Text style={styles.sheetStats}>
              {currentWeek.workoutCount} workouts · {currentWeek.totalVolume}
            </Text>

            {currentWeek.workouts.map((workout) => (
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
                setWeekSheetOpen(false)
                setActiveView('weekly')
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
        <Pressable style={styles.overlay} onPress={() => setAdjustModalOpen(false)}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <View style={styles.modalIcon}>
              <Text style={styles.modalIconText}>✨</Text>
            </View>
            <Text style={styles.modalHeadline}>{t('designPreview.trainingPlan.adjustTitle')}</Text>
            <Text style={styles.modalCopy}>{t('designPreview.trainingPlan.adjustCopy')}</Text>
            <PrimaryButton
              label={t('designPreview.trainingPlan.readaptPlan')}
              onPress={() => setAdjustModalOpen(false)}
            />
            <Pressable style={styles.secondaryButton} onPress={() => setAdjustModalOpen(false)}>
              <Text style={styles.secondaryButtonText}>{t('designPreview.trainingPlan.keepOriginal')}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

export default TrainingPlanFlowPreviewComponent
