import { useCallback, useEffect, useMemo } from 'react'

import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { buildPlanDetailHierarchy } from '@shared/functions/TrainingPlan/planDetailHierarchy.functions'
import { PlanPhaseDetail } from '@shared/functions/TrainingPlan/planDetailHierarchy.types'
import { buildTrainingPlanPresentation } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const TOTAL_WEEKS = 12

export const useActivePlanPresentation = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const { loading, success, error } = useSelector((state: RootState) => state.getActivePlan)

  const phaseDetails: PlanPhaseDetail[] = useMemo(
    () => [
      {
        id: 'foundation',
        name: t('planHome.phases.foundation'),
        weeksLabel: t('planHome.phases.foundationWeeks'),
        weekStart: 1,
        weekEnd: 4,
        rpe: t('programOverview.phases.foundationRpe'),
        goal: t('programOverview.phases.foundationGoal'),
        progression: t('programOverview.phases.foundationProgression'),
        restCompounds: t('programOverview.phases.foundationRestCompounds'),
        restAccessories: t('programOverview.phases.foundationRestAccessories')
      },
      {
        id: 'strength',
        name: t('planHome.phases.strength'),
        weeksLabel: t('planHome.phases.strengthWeeks'),
        weekStart: 5,
        weekEnd: 8,
        rpe: t('programOverview.phases.strengthRpe'),
        goal: t('programOverview.phases.strengthGoal'),
        progression: t('programOverview.phases.strengthProgression'),
        restCompounds: t('programOverview.phases.strengthRestCompounds'),
        restAccessories: t('programOverview.phases.strengthRestAccessories')
      },
      {
        id: 'peak',
        name: t('planHome.phases.peak'),
        weeksLabel: t('planHome.phases.peakWeeks'),
        weekStart: 9,
        weekEnd: 12,
        rpe: t('programOverview.phases.peakRpe'),
        goal: t('programOverview.phases.peakGoal'),
        progression: t('programOverview.phases.peakProgression'),
        restCompounds: t('programOverview.phases.peakRestCompounds'),
        restAccessories: t('programOverview.phases.peakRestAccessories')
      }
    ],
    [t]
  )

  const presentation = useMemo(() => {
    if (!success) {
      return null
    }

    return buildTrainingPlanPresentation(success, {
      programTitle: t('planHome.defaultProgramTitle'),
      blurb: t('planHome.defaultBlurb'),
      phases: phaseDetails.map((phase) => ({
        id: phase.id,
        name: phase.name,
        weeks: phase.weeksLabel
      })),
      dateRange: t('planHome.defaultDateRange')
    })
  }, [success, t, phaseDetails])

  const hierarchy = useMemo(() => {
    if (!success) {
      return null
    }

    return buildPlanDetailHierarchy(success, {
      programTitle: t('planHome.defaultProgramTitle'),
      blurb: t('planHome.defaultBlurb'),
      statsLabel: t('programOverview.statsLabel'),
      deloadNote: t('programOverview.deloadNote'),
      runningCopy: t('phaseDetail.runningCopy'),
      restDayLabel: t('weekSchedule.restDay'),
      phases: phaseDetails,
      totalWeeks: TOTAL_WEEKS
    })
  }, [success, t, phaseDetails])

  useEffect(() => {
    if (!success) {
      dispatch(getActivePlan())
    }
  }, [dispatch, success])

  const retry = useCallback(() => {
    dispatch(getActivePlan())
  }, [dispatch])

  return {
    loading,
    error,
    plan: success,
    presentation,
    hierarchy,
    retry
  }
}
