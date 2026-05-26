import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { generatePlan } from '@redux/states/trainingPlan/generatePlan/generatePlan.slice'
import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import router from '@router/functions/router.functions'
import { buildTrainingPlanPresentation } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import PlanHomeComponent from './PlanHome.component'

import { PlanHomeView } from './PlanHome.types'

const PlanHomeContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = router.navigate()
  const { t } = useTranslation()
  const { loading, success, error, notFound } = useSelector((state: RootState) => state.getActivePlan)
  const { loading: generating, error: generateError } = useSelector((state: RootState) => state.generatePlan)
  const [weekSheetOpen, setWeekSheetOpen] = useState(false)
  const [adjustModalOpen, setAdjustModalOpen] = useState(false)
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(1)

  const loadPlan = useCallback(() => {
    dispatch(getActivePlan())
  }, [dispatch])

  useEffect(() => {
    loadPlan()
  }, [loadPlan])

  const presentation = useMemo(() => {
    if (!success) {
      return null
    }

    return buildTrainingPlanPresentation(success, {
      programTitle: t('planHome.defaultProgramTitle'),
      blurb: t('planHome.defaultBlurb'),
      phases: [
        { id: 'foundation', name: t('planHome.phases.foundation'), weeks: t('planHome.phases.foundationWeeks') },
        { id: 'strength', name: t('planHome.phases.strength'), weeks: t('planHome.phases.strengthWeeks') },
        { id: 'peak', name: t('planHome.phases.peak'), weeks: t('planHome.phases.peakWeeks') }
      ],
      dateRange: t('planHome.defaultDateRange')
    })
  }, [success, t])

  const view: PlanHomeView = useMemo(() => {
    if (generating) {
      return 'generating'
    }

    if (notFound || (!loading && !success)) {
      return 'empty'
    }

    return 'overview'
  }, [generating, notFound, loading, success])

  const selectedWeek = useMemo(
    () =>
      presentation?.weekPlans.find((week) => week.weekNumber === selectedWeekNumber) ??
      presentation?.weekPlans[0] ??
      null,
    [presentation, selectedWeekNumber]
  )

  const handleCreatePlan = useCallback(async () => {
    try {
      await dispatch(generatePlan()).unwrap()
      await dispatch(getActivePlan()).unwrap()
    } catch {
      // errors handled in selectors
    }
  }, [dispatch])

  const handleWeekPress = useCallback((weekNumber: number) => {
    setSelectedWeekNumber(weekNumber)
    setWeekSheetOpen(true)
  }, [])

  const handleWorkoutPress = useCallback(
    (dayIndex: number, workoutName: string) => {
      setWeekSheetOpen(false)
      navigate('PlanDetail', { params: { dayIndex, workoutName } })
    },
    [navigate]
  )

  const handleViewFullWeek = useCallback(() => {
    setWeekSheetOpen(false)

    const firstWorkout = selectedWeek?.workouts[0]

    if (firstWorkout) {
      handleWorkoutPress(firstWorkout.dayIndex, firstWorkout.title)
    }
  }, [handleWorkoutPress, selectedWeek])

  return (
    <PlanHomeComponent
      view={view}
      programTitle={presentation?.programTitle ?? t('planHome.defaultProgramTitle')}
      blurb={presentation?.blurb ?? t('planHome.defaultBlurb')}
      phases={presentation?.phases ?? []}
      weekPlans={presentation?.weekPlans ?? []}
      selectedWeek={selectedWeek}
      weekSheetOpen={weekSheetOpen}
      adjustModalOpen={adjustModalOpen}
      isLoading={loading}
      isGenerating={generating}
      error={error}
      generateError={generateError}
      onRefresh={loadPlan}
      onCreatePlan={handleCreatePlan}
      onWeekPress={handleWeekPress}
      onCloseWeekSheet={() => setWeekSheetOpen(false)}
      onViewFullWeek={handleViewFullWeek}
      onOpenAdjust={() => setAdjustModalOpen(true)}
      onCloseAdjust={() => setAdjustModalOpen(false)}
      onWorkoutPress={handleWorkoutPress}
    />
  )
}

export default PlanHomeContainer
