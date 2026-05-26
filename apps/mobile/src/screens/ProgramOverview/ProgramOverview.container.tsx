import React, { useCallback } from 'react'

import router from '@router/functions/router.functions'
import { useActivePlanPresentation } from '@shared/hooks/useActivePlanPresentation/useActivePlanPresentation.hooks'

import ProgramOverviewComponent from './ProgramOverview.component'

const ProgramOverviewContainer = () => {
  const navigate = router.navigate()
  const { loading, error, hierarchy, retry } = useActivePlanPresentation()

  const handlePhasePress = useCallback(
    (phaseId: string) => {
      navigate('PhaseDetail', { params: { phaseId } })
    },
    [navigate]
  )

  const handleJumpToCurrentWeek = useCallback(() => {
    const weekNumber = hierarchy?.program.currentWeekNumber ?? 1

    navigate('WeekSchedule', { params: { weekNumber } })
  }, [navigate, hierarchy])

  return (
    <ProgramOverviewComponent
      program={hierarchy?.program ?? null}
      isLoading={loading}
      error={error}
      onPhasePress={handlePhasePress}
      onJumpToCurrentWeek={handleJumpToCurrentWeek}
      onRetry={retry}
    />
  )
}

export default ProgramOverviewContainer
