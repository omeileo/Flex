import React from 'react'

import { Modal, Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import ChatBubble from '@shared/components/ChatBubble/ChatBubble.component'
import ChatComposer from '@shared/components/ChatComposer/ChatComposer.component'
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
  generatingStatus,
  error,
  generateError,
  focusOptions,
  selectedFocusId,
  chatMessages,
  chatComposerValue,
  chatStarterPrompts,
  recapItems,
  recapStats,
  weeklyCoachNote,
  weekPhaseLabel,
  weekPhaseRules,
  selectedWeekNumber,
  totalWeeks,
  onRefresh,
  onCreatePlan,
  onSelectFocus,
  onContinueFromFocus,
  onChatComposerChange,
  onChatSend,
  onChatPromptPress,
  onReviewInputs,
  onBackToChat,
  onGeneratePlan,
  onViewFullPlan,
  onWeekPress,
  onCloseWeekSheet,
  onViewFullWeek,
  onViewProgram,
  onOpenAdjust,
  onCloseAdjust,
  onReadaptPlan,
  onTalkToCoach,
  onWorkoutPress,
  onPreviousWeek,
  onNextWeek,
  onGoToCurrentWeek
}: PlanHomeComponentProps) => {
  const styles = useThemedStyles(createPlanHomeStyles)
  const { t } = useTranslation()

  if (isLoading && view === 'overview' && weekPlans.length === 0) {
    return <LoadingView message={t('planHome.loading')} />
  }

  if (error && view === 'overview') {
    return <ErrorView message={error} onRetry={onRefresh} retryLabel={t('actions.retry')} />
  }

  if (view === 'generating' || isGenerating) {
    return (
      <View style={styles.generatingContainer} testID="plan-home-generating">
        <Text style={styles.generatingTitle}>{t('planHome.generatingTitle')}</Text>
        <Text style={styles.generatingCopy}>{generatingStatus || t('planHome.generatingCopy')}</Text>
        {generateError ? <Text style={styles.errorText}>{generateError}</Text> : null}
        {generateError ? (
          <PrimaryButton label={t('actions.retry')} onPress={onGeneratePlan} style={styles.footerButton} />
        ) : null}
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

  if (view === 'focus') {
    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        testID="plan-home-focus"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>{t('planHome.focusTitle')}</Text>
        {focusOptions.map((option) => {
          const isSelected = selectedFocusId === option.id

          return (
            <Pressable
              key={option.id}
              style={[styles.focusCard, isSelected && styles.focusCardActive]}
              onPress={() => onSelectFocus(option.id)}
              testID={`plan-focus-${option.id}`}
            >
              <Text style={styles.focusCardTitle}>{t(option.titleKey)}</Text>
              <Text style={styles.focusCardSubtitle}>{t(option.subtitleKey)}</Text>
            </Pressable>
          )
        })}
        <PrimaryButton label={t('planHome.continue')} onPress={onContinueFromFocus} style={styles.footerButton} />
      </ScrollView>
    )
  }

  if (view === 'chat') {
    return (
      <View style={styles.container} testID="plan-home-chat">
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.chatHeader}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>FC</Text>
            </View>
            <View>
              <Text style={styles.chatHeaderTitle}>{t('planHome.chatTitle')}</Text>
              <View style={styles.chatStatusPill}>
                <Text style={styles.chatStatusText}>{t('planHome.chatStatus')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.chatMessageList}>
            {chatMessages.map((message) => (
              <ChatBubble key={message.id} message={message.text} role={message.role} />
            ))}
          </View>

          <View style={styles.promptRow}>
            {chatStarterPrompts.map((prompt) => (
              <Pressable key={prompt} style={styles.promptChip} onPress={() => onChatPromptPress(prompt)}>
                <Text style={styles.promptChipText}>{prompt}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.content, styles.composerWrap]}>
          <ChatComposer value={chatComposerValue} onChangeText={onChatComposerChange} onSend={onChatSend} />
          <PrimaryButton label={t('planHome.reviewInputs')} onPress={onReviewInputs} style={styles.footerButton} />
        </View>
      </View>
    )
  }

  if (view === 'recap') {
    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        testID="plan-home-recap"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>{t('planHome.recapTitle')}</Text>
        <Text style={styles.headerTitle}>{programTitle}</Text>
        <Text style={styles.recapStats}>{recapStats}</Text>
        {recapItems.map((item) => (
          <Text key={item} style={styles.recapBullet}>
            • {item}
          </Text>
        ))}
        <PrimaryButton label={t('planHome.generatePlan')} onPress={onGeneratePlan} style={styles.footerButton} />
        <Pressable style={styles.secondaryLink} onPress={onBackToChat}>
          <Text style={styles.secondaryLinkText}>{t('planHome.backToChat')}</Text>
        </Pressable>
      </ScrollView>
    )
  }

  if (view === 'intro') {
    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        testID="plan-home-intro"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>{t('planHome.introTitle')}</Text>
        <CoachNote message={blurb} />
        <View style={styles.phaseRow}>
          {phases.map((phase) => (
            <View key={phase.id} style={styles.phaseChip}>
              <Text style={styles.phaseChipText}>{phase.name}</Text>
            </View>
          ))}
        </View>
        <PrimaryButton label={t('planHome.viewFullPlan')} onPress={onViewFullPlan} style={styles.footerButton} />
      </ScrollView>
    )
  }

  if (view === 'weekly') {
    const progressPercent = totalWeeks > 0 ? (selectedWeekNumber / totalWeeks) * 100 : 0

    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        testID="plan-home-weekly"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.weekNav}>
          <Pressable style={styles.weekNavButton} onPress={onPreviousWeek} testID="plan-weekly-prev">
            <Text style={styles.recapStats}>‹</Text>
          </Pressable>
          <Text style={styles.weekNavLabel}>
            {t('planHome.planOverview')} · {t('planHome.weekLabel', { week: selectedWeekNumber })}
          </Text>
          <Pressable style={styles.weekNavButton} onPress={onNextWeek} testID="plan-weekly-next">
            <Text style={styles.recapStats}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.recapStats}>{weekPhaseLabel}</Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        <CoachNote message={weeklyCoachNote} />

        {selectedWeek?.workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            title={workout.title}
            durationMinutes={workout.durationMinutes}
            dateLabel={selectedWeek.dateRange}
            subtitle={workout.exercisePreview}
            modality={workout.modality}
            onPress={() => onWorkoutPress(workout.dayIndex, workout.title)}
          />
        ))}

        <PrimaryButton label={t('planHome.goToCurrentWeek')} onPress={onGoToCurrentWeek} style={styles.footerButton} />
      </ScrollView>
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
        <Pressable onPress={onViewProgram} testID="plan-home-view-program">
          <Text style={styles.viewProgramLink}>{t('planHome.viewProgram')}</Text>
        </Pressable>

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
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()} testID="plan-week-sheet">
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>
              {t('planHome.weekSheetTitle', { week: selectedWeek?.weekNumber ?? 1 })}
            </Text>
            <Text style={styles.phaseRulesRow}>{weekPhaseRules}</Text>
            <Text style={styles.sheetStats}>
              {selectedWeek?.workoutCount ?? 0} {t('planHome.workoutsLabel')} · {selectedWeek?.totalVolume}
            </Text>

            {selectedWeek?.workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                title={workout.title}
                durationMinutes={workout.durationMinutes}
                subtitle={workout.exercisePreview}
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
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()} testID="plan-adjust-modal">
            <View style={styles.modalIcon}>
              <Text style={styles.modalIconText}>✨</Text>
            </View>
            <Text style={styles.modalHeadline}>{t('planHome.adjustTitle')}</Text>
            <Text style={styles.modalCopy}>{t('planHome.adjustCopy')}</Text>
            <PrimaryButton label={t('planHome.readaptPlan')} onPress={onReadaptPlan} />
            <Pressable style={styles.secondaryButton} onPress={onCloseAdjust}>
              <Text style={styles.secondaryButtonText}>{t('planHome.keepOriginal')}</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={onTalkToCoach}>
              <Text style={styles.secondaryButtonText}>{t('planHome.talkToCoach')}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

export default PlanHomeComponent
