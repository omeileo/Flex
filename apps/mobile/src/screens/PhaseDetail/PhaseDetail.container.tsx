import React, { useCallback, useMemo } from 'react'

import router from '@router/functions/router.functions'
import { useActivePlanPresentation } from '@shared/hooks/useActivePlanPresentation/useActivePlanPresentation.hooks'

import PhaseDetailComponent from './PhaseDetail.component'

const PhaseDetailContainer = () => {
  const navigate = router.navigate()
  const phaseId = router.getUrlParam<string>('phaseId')
  const { loading, error, plan, hierarchy, retry } = useActivePlanPresentation()

  const phase = useMemo(() => {
    if (!hierarchy || !phaseId) {
      return null
    }

    return hierarchy.phasesById.get(phaseId) ?? null
  }, [hierarchy, phaseId])

  const handleViewWeekSchedule = useCallback(() => {
    if (!phase) {
      return
    }

    navigate('WeekSchedule', { params: { weekNumber: phase.weekStart, phaseId: phase.id } })
  }, [navigate, phase])

  return (
    <PhaseDetailComponent
      phase={phase}
      splitDays={plan?.workouts ?? []}
      runningCopy={hierarchy?.runningCopy ?? ''}
      isLoading={loading}
      error={error}
      onViewWeekSchedule={handleViewWeekSchedule}
      onRetry={retry}
    />
  )
}

export default PhaseDetailContainer
