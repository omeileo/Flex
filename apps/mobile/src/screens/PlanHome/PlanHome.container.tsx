import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { getProfile } from '@redux/states/profile/getProfile/getProfile.slice'
import { generatePlan } from '@redux/states/trainingPlan/generatePlan/generatePlan.slice'
import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import router from '@router/functions/router.functions'
import { buildTrainingPlanPresentation } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import PlanHomeComponent from './PlanHome.component'

import { PlanHomeView } from './PlanHome.types'
import {
  generatingStatusKeys,
  planCreationStarterPromptKeys,
  planFocusOptions
} from './planCreation/planCreation.dictionary'
import {
  buildGeneratePlanRequest,
  buildPlanRecapItems,
  buildProgramTitle,
  defaultPlanCreationDraft
} from './planCreation/planCreation.functions'
import { PlanCreationDraft, PlanFocusId } from './planCreation/planCreation.types'

const PlanHomeContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation()
  const navigate = router.navigate()
  const { t } = useTranslation()
  const { loading, success, error, notFound } = useSelector((state: RootState) => state.getActivePlan)
  const { loading: generating, error: generateError } = useSelector((state: RootState) => state.generatePlan)
  const profile = useSelector((state: RootState) => state.getProfile.success)
  const [creationDraft, setCreationDraft] = useState<PlanCreationDraft>(defaultPlanCreationDraft)
  const [creationView, setCreationView] = useState<PlanHomeView | null>(null)
  const [weekSheetOpen, setWeekSheetOpen] = useState(false)
  const [adjustModalOpen, setAdjustModalOpen] = useState(false)
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(1)
  const [chatComposerValue, setChatComposerValue] = useState('')
  const [generatingStatusIndex, setGeneratingStatusIndex] = useState(0)

  const loadPlan = useCallback(() => {
    dispatch(getActivePlan())
  }, [dispatch])

  useEffect(() => {
    loadPlan()
    dispatch(getProfile())
  }, [dispatch, loadPlan])

  useEffect(() => {
    if (!generating) {
      return
    }

    const interval = setInterval(() => {
      setGeneratingStatusIndex((current) => (current + 1) % generatingStatusKeys.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [generating])

  const presentation = useMemo(() => {
    if (!success) {
      return null
    }

    return buildTrainingPlanPresentation(success, {
      programTitle: creationDraft.programTitle || t('planHome.defaultProgramTitle'),
      blurb: t('planHome.defaultBlurb'),
      phases: [
        { id: 'foundation', name: t('planHome.phases.foundation'), weeks: t('planHome.phases.foundationWeeks') },
        { id: 'strength', name: t('planHome.phases.strength'), weeks: t('planHome.phases.strengthWeeks') },
        { id: 'peak', name: t('planHome.phases.peak'), weeks: t('planHome.phases.peakWeeks') }
      ],
      dateRange: t('planHome.defaultDateRange')
    })
  }, [success, creationDraft.programTitle, t])

  const view: PlanHomeView = useMemo(() => {
    if (creationView) {
      return creationView
    }

    if (generating) {
      return 'generating'
    }

    if (notFound || (!loading && !success)) {
      return 'empty'
    }

    return 'overview'
  }, [creationView, generating, notFound, loading, success])

  const selectedWeek = useMemo(
    () =>
      presentation?.weekPlans.find((week) => week.weekNumber === selectedWeekNumber) ??
      presentation?.weekPlans[0] ??
      null,
    [presentation, selectedWeekNumber]
  )

  const chatStarterPrompts = useMemo(() => planCreationStarterPromptKeys.map((key) => t(key)), [t])

  const chatMessages = useMemo(() => {
    if (creationDraft.chatMessages.length > 0) {
      return creationDraft.chatMessages
    }

    return [
      {
        id: 'intro',
        role: 'coach' as const,
        text: t('planHome.chatIntro')
      }
    ]
  }, [creationDraft.chatMessages, t])

  const recapStats = useMemo(
    () =>
      t('planHome.recapStats', {
        weeks: 12,
        liftDays: profile?.daysPerWeek ?? 5,
        runDays: 2
      }),
    [profile?.daysPerWeek, t]
  )

  const generatingStatus = t(generatingStatusKeys[generatingStatusIndex])

  const weekPhaseLabel = t('planHome.weekPhaseLabel', {
    week: selectedWeekNumber,
    phase: t('planHome.phases.foundation')
  })

  const weekPhaseRules = t('planHome.weekPhaseRules')

  const appendChatMessage = useCallback((role: 'coach' | 'user', text: string) => {
    setCreationDraft((current) => ({
      ...current,
      chatMessages: [
        ...current.chatMessages,
        {
          id: `${role}-${Date.now()}`,
          role,
          text
        }
      ]
    }))
  }, [])

  const handleCreatePlan = useCallback(() => {
    setCreationView('focus')
  }, [])

  const handleSelectFocus = useCallback(
    (focusId: PlanFocusId) => {
      setCreationDraft((current) => ({
        ...current,
        focusId,
        programTitle: buildProgramTitle(focusId, t)
      }))
    },
    [t]
  )

  const handleContinueFromFocus = useCallback(() => {
    if (!creationDraft.focusId) {
      handleSelectFocus('hybrid')
    }

    setCreationView('chat')
  }, [creationDraft.focusId, handleSelectFocus])

  const handleChatSend = useCallback(() => {
    const trimmed = chatComposerValue.trim()

    if (!trimmed) {
      return
    }

    appendChatMessage('user', trimmed)
    appendChatMessage('coach', t('planHome.chatReply'))
    setChatComposerValue('')
  }, [appendChatMessage, chatComposerValue, t])

  const handleChatPromptPress = useCallback(
    (prompt: string) => {
      appendChatMessage('user', prompt)
      appendChatMessage('coach', t('planHome.chatReply'))
    },
    [appendChatMessage, t]
  )

  const handleReviewInputs = useCallback(() => {
    const focusId = creationDraft.focusId ?? 'hybrid'
    const recapItems = buildPlanRecapItems(profile, focusId, t)

    setCreationDraft((current) => ({
      ...current,
      focusId,
      programTitle: current.programTitle || buildProgramTitle(focusId, t),
      recapItems
    }))
    setCreationView('recap')
  }, [creationDraft.focusId, profile, t])

  const handleBackToChat = useCallback(() => {
    setCreationView('chat')
  }, [])

  const handleGeneratePlan = useCallback(async () => {
    const focusId = creationDraft.focusId ?? 'hybrid'
    const request = buildGeneratePlanRequest(focusId, profile)

    setCreationView('generating')

    try {
      await dispatch(generatePlan(request)).unwrap()
      await dispatch(getActivePlan()).unwrap()
      setCreationView('intro')
    } catch {
      setCreationView('recap')
    }
  }, [creationDraft.focusId, dispatch, profile])

  const handleViewFullPlan = useCallback(() => {
    setCreationView(null)
    navigate('ProgramOverview')
  }, [navigate])

  const handleViewProgram = useCallback(() => {
    navigate('ProgramOverview')
  }, [navigate])

  const handleWeekPress = useCallback((weekNumber: number) => {
    setSelectedWeekNumber(weekNumber)
    setWeekSheetOpen(true)
  }, [])

  const handleViewFullWeek = useCallback(() => {
    setWeekSheetOpen(false)
    setCreationView('weekly')
  }, [])

  const handleReadaptPlan = useCallback(async () => {
    setAdjustModalOpen(false)
    setCreationView('generating')

    try {
      await dispatch(generatePlan()).unwrap()
      await dispatch(getActivePlan()).unwrap()
      setCreationView(null)
    } catch {
      setCreationView('overview')
    }
  }, [dispatch])

  const handleTalkToCoach = useCallback(() => {
    setAdjustModalOpen(false)
    navigation.navigate('Coach' as never)
  }, [navigation])

  const handleWorkoutPress = useCallback(
    (dayIndex: number, workoutName: string) => {
      setWeekSheetOpen(false)
      navigate('PlanDetail', { params: { dayIndex, workoutName } })
    },
    [navigate]
  )

  const handlePreviousWeek = useCallback(() => {
    setSelectedWeekNumber((week) => Math.max(1, week - 1))
  }, [])

  const handleNextWeek = useCallback(() => {
    const maxWeek = presentation?.weekPlans.length ?? 1
    setSelectedWeekNumber((week) => Math.min(maxWeek, week + 1))
  }, [presentation?.weekPlans.length])

  const handleGoToCurrentWeek = useCallback(() => {
    setSelectedWeekNumber(presentation?.weekNumber ?? 1)
    setCreationView(null)
  }, [presentation?.weekNumber])

  return (
    <PlanHomeComponent
      view={view}
      programTitle={creationDraft.programTitle || presentation?.programTitle || t('planHome.defaultProgramTitle')}
      blurb={presentation?.blurb ?? t('planHome.defaultBlurb')}
      phases={presentation?.phases ?? []}
      weekPlans={presentation?.weekPlans ?? []}
      selectedWeek={selectedWeek}
      weekSheetOpen={weekSheetOpen}
      adjustModalOpen={adjustModalOpen}
      isLoading={loading}
      isGenerating={generating}
      generatingStatus={generatingStatus}
      error={error}
      generateError={generateError}
      focusOptions={planFocusOptions}
      selectedFocusId={creationDraft.focusId}
      chatMessages={chatMessages}
      chatComposerValue={chatComposerValue}
      chatStarterPrompts={chatStarterPrompts}
      recapItems={creationDraft.recapItems}
      recapStats={recapStats}
      weeklyCoachNote={t('planHome.weeklyCoachNote')}
      weekPhaseLabel={weekPhaseLabel}
      weekPhaseRules={weekPhaseRules}
      selectedWeekNumber={selectedWeekNumber}
      totalWeeks={Math.max(presentation?.weekPlans.length ?? 1, 12)}
      onRefresh={loadPlan}
      onCreatePlan={handleCreatePlan}
      onSelectFocus={handleSelectFocus}
      onContinueFromFocus={handleContinueFromFocus}
      onChatComposerChange={setChatComposerValue}
      onChatSend={handleChatSend}
      onChatPromptPress={handleChatPromptPress}
      onReviewInputs={handleReviewInputs}
      onBackToChat={handleBackToChat}
      onGeneratePlan={handleGeneratePlan}
      onViewFullPlan={handleViewFullPlan}
      onWeekPress={handleWeekPress}
      onCloseWeekSheet={() => setWeekSheetOpen(false)}
      onViewFullWeek={handleViewFullWeek}
      onViewProgram={handleViewProgram}
      onOpenAdjust={() => setAdjustModalOpen(true)}
      onCloseAdjust={() => setAdjustModalOpen(false)}
      onReadaptPlan={handleReadaptPlan}
      onTalkToCoach={handleTalkToCoach}
      onWorkoutPress={handleWorkoutPress}
      onPreviousWeek={handlePreviousWeek}
      onNextWeek={handleNextWeek}
      onGoToCurrentWeek={handleGoToCurrentWeek}
    />
  )
}

export default PlanHomeContainer
